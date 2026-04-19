// Auto-submit hook - automatically sends controller data to your MySQL database
// Use this in your gamepad testing components

import { useEffect, useRef } from 'react';

export function useAutoSubmitControllerData(gamepadData) {
    const hasSubmitted = useRef(false);
    const submissionTimeout = useRef(null);
    const sessionStats = useRef({
        buttonsPressed: new Set(),
        maxLeftDrift: 0,
        maxRightDrift: 0,
        totalButtonsCount: 0,
        latencySum: 0,
        latencySamples: 0,
        lastTimestamp: 0
    });

    useEffect(() => {
        // Only collect and submit if we have valid gamepad data and haven't submitted yet
        if (!gamepadData || hasSubmitted.current) return;

        // --- Accumulate Session Data ---
        // 1. Accumulate pressed buttons
        if (gamepadData.buttons?.length > 0) {
            sessionStats.current.totalButtonsCount = gamepadData.buttons.length;
            gamepadData.buttons.forEach((b, i) => {
                if (b.pressed || b.value > 0.05) {
                    sessionStats.current.buttonsPressed.add(i);
                }
            });
        }

        // 2. Track maximum drift seen
        const leftDrift = parseFloat(calculateDrift(gamepadData.axes?.[0], gamepadData.axes?.[1])) || 0;
        const rightDrift = parseFloat(calculateDrift(gamepadData.axes?.[2], gamepadData.axes?.[3])) || 0;
        if (leftDrift > sessionStats.current.maxLeftDrift) sessionStats.current.maxLeftDrift = leftDrift;
        if (rightDrift > sessionStats.current.maxRightDrift) sessionStats.current.maxRightDrift = rightDrift;

        // 3. Approximate latency (delta time between timestamp updates)
        if (gamepadData.timestamp && sessionStats.current.lastTimestamp > 0) {
            const diff = gamepadData.timestamp - sessionStats.current.lastTimestamp;
            // Typical polling is ~4ms to 16ms. Only count reasonable framerate diffs.
            if (diff > 0 && diff < 100) {
                sessionStats.current.latencySum += diff;
                sessionStats.current.latencySamples++;
            }
        }
        sessionStats.current.lastTimestamp = gamepadData.timestamp || performance.now();

        // Wait for user to finish testing (5 seconds of inactivity)
        if (submissionTimeout.current) {
            clearTimeout(submissionTimeout.current);
        }

        submissionTimeout.current = setTimeout(async () => {
            // Check if we have enough accumulated data to submit
            const hasEnoughData = gamepadData.id && (sessionStats.current.totalButtonsCount > 0 || gamepadData.axes?.length > 0);
            if (!hasEnoughData) return;

            // Final latency average calculation
            const averageLatency = sessionStats.current.latencySamples > 0
                ? (sessionStats.current.latencySum / sessionStats.current.latencySamples)
                : 0;

            // 1. Clean Controller Name
            let rawName = gamepadData.id || "Unknown Controller";
            let cleanName = rawName.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').trim();

            // 2. Extract Vendor/Product IDs
            const idMatch = cleanName.match(/Vendor:\s*([0-9a-fA-F]+)\s*Product:\s*([0-9a-fA-F]+)/i) ||
                rawName.match(/^([0-9a-fA-F]{4})-([0-9a-fA-F]{4})/);

            const vendorId = idMatch ? idMatch[1] : null;
            const productId = idMatch ? idMatch[2] : null;

            // Prepare data for submission (Backend calculates Health & Issues)
            const testData = {
                controller_name: cleanName,
                vendor_id: vendorId,
                product_id: productId,
                drift_left: sessionStats.current.maxLeftDrift,
                drift_right: sessionStats.current.maxRightDrift,
                latency: parseFloat(averageLatency.toFixed(2)),
                buttons_working: sessionStats.current.buttonsPressed.size,
                buttons_total: sessionStats.current.totalButtonsCount,
                raw_axes: gamepadData.axes || [],
                raw_buttons: (gamepadData.buttons || []).map(b => b.value || (b.pressed ? 1 : 0))
            };

            // Submit to your personal database /api.php automatically
            try {
                const response = await fetch('/api.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(testData)
                });

                const result = await response.json();
                if (result.success) {
                    console.log('Controller telemetry successfully saved to personal database:', testData);
                    hasSubmitted.current = true;
                } else {
                    console.warn('Telemetry API warning:', result.error);
                }
            } catch (error) {
                console.error('Auto-submit failed (Is api.php configured?):', error);
            }
        }, 5000); // Wait 5 seconds after last activity

        return () => {
            if (submissionTimeout.current) {
                clearTimeout(submissionTimeout.current);
            }
        };
    }, [gamepadData]);
}

// Helper function to calculate drift from axis values
function calculateDrift(axisX, axisY) {
    if (axisX === undefined || axisY === undefined) return 0;
    const drift = Math.sqrt(axisX * axisX + axisY * axisY);
    return (drift * 100).toFixed(2);
}

// End of file
