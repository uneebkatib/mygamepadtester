<?php
// MyGamepadTester Telemetry Backend - api.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db_host = '127.0.0.1';
$db_name = 'uneeb';
$db_user = 'uneeb';
$db_pass = 'EGeRbjWyhNzhxw42';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Auto-create generic v2 table
    $pdo->exec("CREATE TABLE IF NOT EXISTS controller_telemetry_v2 (
        id INT AUTO_INCREMENT PRIMARY KEY,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        vendor_id VARCHAR(10), product_id VARCHAR(10), controller_name_clean TEXT,
        drift_left_mag FLOAT, drift_right_mag FLOAT, latency_ms FLOAT,
        buttons_total INT, buttons_pressed_count INT, health_score_calc INT,
        flags JSON, raw_data JSON
    )");

    // Auto-create tool-specific tables
    $pdo->exec("CREATE TABLE IF NOT EXISTS telemetry_stick_drift (
        id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        controller_name TEXT, max_drift_left FLOAT, max_drift_right FLOAT, resting_left FLOAT, resting_right FLOAT
    )");
    
    $pdo->exec("CREATE TABLE IF NOT EXISTS telemetry_trigger (
        id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        controller_name TEXT, max_lt FLOAT, max_rt FLOAT
    )");
    
    $pdo->exec("CREATE TABLE IF NOT EXISTS telemetry_mouse (
        id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        device_name TEXT, health_score INT, chatter_events INT, fastest_gap INT, total_clicks INT, scroll_steps INT
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS telemetry_keyboard (
        id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        device_name TEXT, health_score INT, max_nkro INT, avg_response_ms INT, chatter_events INT, ghosting_errors INT
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS telemetry_button (
        id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        controller_name TEXT, buttons_tested INT, failed_buttons INT
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS telemetry_input_lag (
        id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        controller_name TEXT, avg_latency FLOAT, polling_rate INT
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS telemetry_deadzone (
        id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        controller_name TEXT, inner_deadzone FLOAT, outer_deadzone FLOAT
    )");
    
    $pdo->exec("CREATE TABLE IF NOT EXISTS telemetry_sens_converter (
        id INT AUTO_INCREMENT PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        from_game VARCHAR(100), to_game VARCHAR(100), from_sens FLOAT, to_sens FLOAT
    )");

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "DB connection failed."]);
    exit();
}

// ------------------------------------------------------------------
// GET REQUESTS: Fetch Live Analytics for Dashboard (No cron needed!)
// ------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'global_stats') {
    try {
        $stats = [
            'all_time' => getStatsByTimeframe($pdo, "1=1"),
            'last_30_days' => getStatsByTimeframe($pdo, "timestamp >= DATE_SUB(NOW(), INTERVAL 30 DAY)"),
            'last_7_days' => getStatsByTimeframe($pdo, "timestamp >= DATE_SUB(NOW(), INTERVAL 7 DAY)"),
            'last_24_hours' => getStatsByTimeframe($pdo, "timestamp >= DATE_SUB(NOW(), INTERVAL 1 DAY)")
        ];
        
        echo json_encode(["success" => true, "data" => $stats]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Failed to fetch stats: " . $e->getMessage()]);
    }
    exit();
}

function getStatsByTimeframe($pdo, $timeClause) {
    // 1. Core stats (v2 table)
    $totalQuery = $pdo->query("SELECT COUNT(*) FROM controller_telemetry_v2 WHERE $timeClause");
    $totalTests = $totalQuery->fetchColumn() ?: 0;
    $healthQuery = $pdo->query("SELECT AVG(health_score_calc) FROM controller_telemetry_v2 WHERE $timeClause AND health_score_calc > 0");
    $avgHealth = round($healthQuery->fetchColumn() ?: 0, 1);
    $topQuery = $pdo->query("SELECT controller_name_clean, COUNT(*) as count FROM controller_telemetry_v2 WHERE controller_name_clean != 'Unknown Controller' AND $timeClause GROUP BY controller_name_clean ORDER BY count DESC LIMIT 5");
    $topControllers = $topQuery->fetchAll(PDO::FETCH_ASSOC);
    $failureQuery = $pdo->query("SELECT 
        SUM(flags LIKE '%\"drift_left\":true%') as drift_l,
        SUM(flags LIKE '%\"drift_right\":true%') as drift_r,
        SUM(flags LIKE '%\"latency_high\":true%') as `lag`,
        SUM(flags LIKE '%\"unresponsive_buttons\":true%') as bad_buttons
        FROM controller_telemetry_v2 WHERE $timeClause");
    $failures = $failureQuery->fetch(PDO::FETCH_ASSOC);

    // 2. Tool breakdowns
    $tools = [
        'stick_drift' => $pdo->query("SELECT COUNT(*) as samples, AVG(drift_left_mag) as avg_l, AVG(drift_right_mag) as avg_r FROM controller_telemetry_v2 WHERE $timeClause AND (drift_left_mag > 0 OR drift_right_mag > 0)")->fetch(PDO::FETCH_ASSOC),
        'trigger' => $pdo->query("SELECT COUNT(*) as samples, AVG(max_lt) as avg_lt, AVG(max_rt) as avg_rt FROM telemetry_trigger WHERE $timeClause")->fetch(PDO::FETCH_ASSOC),
        'button' => $pdo->query("SELECT COUNT(*) as samples, SUM(buttons_total - buttons_pressed_count) as total_fails FROM controller_telemetry_v2 WHERE $timeClause AND buttons_total > 0")->fetch(PDO::FETCH_ASSOC),
        'input_lag' => $pdo->query("SELECT COUNT(*) as samples, AVG(latency_ms) as avg_lag, AVG(IF(latency_ms > 0, 1000/latency_ms, 0)) as avg_polling FROM controller_telemetry_v2 WHERE $timeClause AND latency_ms > 0")->fetch(PDO::FETCH_ASSOC),
        'deadzone' => $pdo->query("SELECT COUNT(*) as samples, AVG(inner_deadzone) as avg_inner, AVG(outer_deadzone) as avg_outer FROM telemetry_deadzone WHERE $timeClause")->fetch(PDO::FETCH_ASSOC),
        'mouse' => array_merge(
            $pdo->query("SELECT COUNT(*) as samples, SUM(chatter_events) as total_chatter FROM telemetry_mouse WHERE $timeClause")->fetch(PDO::FETCH_ASSOC),
            ['top_devices' => $pdo->query("SELECT device_name, COUNT(*) as count FROM telemetry_mouse WHERE $timeClause GROUP BY device_name ORDER BY count DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC)]
        ),
        'keyboard' => array_merge(
            $pdo->query("SELECT COUNT(*) as samples, AVG(avg_response_ms) as avg_ms FROM telemetry_keyboard WHERE $timeClause")->fetch(PDO::FETCH_ASSOC),
            ['top_devices' => $pdo->query("SELECT device_name, COUNT(*) as count FROM telemetry_keyboard WHERE $timeClause GROUP BY device_name ORDER BY count DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC)]
        ),
        'sens_converter' => array_merge(
            $pdo->query("SELECT COUNT(*) as samples FROM telemetry_sens_converter WHERE $timeClause")->fetch(PDO::FETCH_ASSOC),
            ['top_from' => $pdo->query("SELECT from_game, COUNT(*) as count FROM telemetry_sens_converter WHERE $timeClause GROUP BY from_game ORDER BY count DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC)],
            ['top_to' => $pdo->query("SELECT to_game, COUNT(*) as count FROM telemetry_sens_converter WHERE $timeClause GROUP BY to_game ORDER BY count DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC)],
            ['recent' => $pdo->query("SELECT from_game, to_game, timestamp FROM telemetry_sens_converter WHERE $timeClause ORDER BY timestamp DESC LIMIT 10")->fetchAll(PDO::FETCH_ASSOC)]
        )
    ];

    return [
        'total_tests' => (int)$totalTests,
        'average_health' => (float)$avgHealth,
        'top_controllers' => $topControllers ?: [],
        'failure_counts' => [
            'drift_l' => (int)($failures['drift_l'] ?? 0),
            'drift_r' => (int)($failures['drift_r'] ?? 0),
            'lag' => (int)($failures['lag'] ?? 0),
            'bad_buttons' => (int)($failures['bad_buttons'] ?? 0)
        ],
        'tools' => $tools
    ];
}

// END OF GET REQUESTS

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        http_response_code(400); echo json_encode(["success" => false, "error" => "Invalid JSON payload"]); exit();
    }

    $tool_type = $data['tool_type'] ?? 'generic';

    try {
        if ($tool_type === 'stick_drift') {
            $stmt = $pdo->prepare("INSERT INTO telemetry_stick_drift (controller_name, max_drift_left, max_drift_right, resting_left, resting_right) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([ $data['controller_name'] ?? 'Unknown', $data['max_drift_left'] ?? 0, $data['max_drift_right'] ?? 0, $data['resting_left'] ?? 0, $data['resting_right'] ?? 0 ]);
        } 
        elseif ($tool_type === 'trigger') {
            $stmt = $pdo->prepare("INSERT INTO telemetry_trigger (controller_name, max_lt, max_rt) VALUES (?, ?, ?)");
            $stmt->execute([ $data['controller_name'] ?? 'Unknown', $data['max_lt'] ?? 0, $data['max_rt'] ?? 0 ]);
        } 
        elseif ($tool_type === 'mouse') {
            $stmt = $pdo->prepare("INSERT INTO telemetry_mouse (device_name, health_score, chatter_events, fastest_gap, total_clicks, scroll_steps) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([ $data['device_name'] ?? 'Unknown Mouse', $data['health_score'] ?? 100, $data['chatter_events'] ?? 0, $data['fastest_gap'] ?? 0, $data['total_clicks'] ?? 0, $data['scroll_steps'] ?? 0 ]);
        } 
        elseif ($tool_type === 'keyboard') {
            $stmt = $pdo->prepare("INSERT INTO telemetry_keyboard (device_name, health_score, max_nkro, avg_response_ms, chatter_events, ghosting_errors) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([ $data['device_name'] ?? 'Unknown Keyboard', $data['health_score'] ?? 100, $data['max_nkro'] ?? 0, $data['avg_response_ms'] ?? 0, $data['chatter_events'] ?? 0, $data['ghosting_errors'] ?? 0 ]);
        } 
        elseif ($tool_type === 'button') {
            $stmt = $pdo->prepare("INSERT INTO telemetry_button (controller_name, buttons_tested, failed_buttons) VALUES (?, ?, ?)");
            $stmt->execute([ $data['controller_name'] ?? 'Unknown', $data['buttons_tested'] ?? 0, $data['failed_buttons'] ?? 0 ]);
        } 
        elseif ($tool_type === 'input_lag') {
            $stmt = $pdo->prepare("INSERT INTO telemetry_input_lag (controller_name, avg_latency, polling_rate) VALUES (?, ?, ?)");
            $stmt->execute([ $data['controller_name'] ?? 'Unknown', $data['avg_latency'] ?? 0, $data['polling_rate'] ?? 0 ]);
        } 
        elseif ($tool_type === 'deadzone') {
            $stmt = $pdo->prepare("INSERT INTO telemetry_deadzone (controller_name, inner_deadzone, outer_deadzone) VALUES (?, ?, ?)");
            $stmt->execute([ $data['controller_name'] ?? 'Unknown', $data['inner_deadzone'] ?? 0, $data['outer_deadzone'] ?? 0 ]);
        } 
        elseif ($tool_type === 'sens_converter') {
            $stmt = $pdo->prepare("INSERT INTO telemetry_sens_converter (from_game, to_game, from_sens, to_sens) VALUES (?, ?, ?, ?)");
            $stmt->execute([ $data['from_game'] ?? 'Unknown', $data['to_game'] ?? 'Unknown', $data['from_sens'] ?? 0, $data['to_sens'] ?? 0 ]);
        }
        else {
            // Generic tool_type or old format
            $drift_left = (float)($data['drift_left'] ?? 0);
            $drift_right = (float)($data['drift_right'] ?? 0);
            $latency = (float)($data['latency'] ?? 0);
            $buttons_working = (int)($data['buttons_working'] ?? 0);
            $buttons_total = (int)($data['buttons_total'] ?? 0);

            $health = 100.0;
            $health -= min(40, $drift_left * 2);
            $health -= min(40, $drift_right * 2);
            if ($latency > 8) $health -= min(20, ($latency - 8) * 2);
            if ($buttons_total > 0) $health = min($health, ($buttons_working / $buttons_total) * 100);
            $health = max(0, round($health));

            $flags = [ "drift_left" => $drift_left > 5.0, "drift_right" => $drift_right > 5.0, "latency_high" => $latency > 20.0, "unresponsive_buttons" => ($buttons_total > 0 && $buttons_working < $buttons_total) ];
            $raw_data = json_encode([ "raw_axes" => $data['raw_axes'] ?? [], "raw_buttons" => $data['raw_buttons'] ?? [], "user_agent" => $_SERVER['HTTP_USER_AGENT'] ?? '', "language" => $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '' ]);
            $clean_name = preg_replace('/[\x{200B}-\x{200D}\x{FEFF}]/u', '', $data['controller_name'] ?? 'Unknown Controller');

            $stmt = $pdo->prepare("INSERT INTO controller_telemetry_v2 (vendor_id, product_id, controller_name_clean, drift_left_mag, drift_right_mag, latency_ms, buttons_total, buttons_pressed_count, health_score_calc, flags, raw_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([ $data['vendor_id'] ?? null, $data['product_id'] ?? null, $clean_name, $drift_left, $drift_right, $latency, $buttons_total, $buttons_working, (int)$health, json_encode($flags), $raw_data ]);
        }
        echo json_encode(["success" => true, "message" => "Data saved to $tool_type telemetry!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
?>
