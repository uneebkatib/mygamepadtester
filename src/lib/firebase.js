// Firebase configuration for global controller database
// This allows you to collect data from ALL users worldwide

// Firebase configuration
// IMPORTANT: Replace these with your own Firebase project credentials
// Get them from: https://console.firebase.google.com/
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Lazy initialization helpers
let app;
let db;

async function getDb() {
    if (typeof window === 'undefined') return null;

    if (!db) {
        try {
            const { initializeApp } = await import('firebase/app');
            const { getFirestore } = await import('firebase/firestore');

            if (!app) {
                app = initializeApp(firebaseConfig);
            }
            db = getFirestore(app);
        } catch (error) {
            console.error('Firebase initialization error:', error);
            return null;
        }
    }
    return db;
}

// Submit test data to global database
export async function submitTestData(testData) {
    const firestoreDb = await getDb();
    if (!firestoreDb) {
        console.error('Firebase not initialized');
        return { success: false, error: 'Database not available' };
    }

    try {
        const { collection, addDoc } = await import('firebase/firestore');

        const dataToSubmit = {
            controllerName: testData.controllerName || 'Unknown Controller',
            timestamp: new Date().toISOString(),
            driftLeft: testData.driftLeft || 0,
            driftRight: testData.driftRight || 0,
            latency: testData.latency || 0,
            buttonsWorking: testData.buttonsWorking || 0,
            buttonsTotal: testData.buttonsTotal || 0,
            healthScore: testData.healthScore || 0,
            issues: testData.issues || [],
            // Optional: Add user's country/region (from IP or browser)
            userAgent: navigator.userAgent,
            language: navigator.language
        };

        const docRef = await addDoc(collection(firestoreDb, 'controller_tests'), dataToSubmit);

        return {
            success: true,
            id: docRef.id,
            message: 'Test data submitted successfully!'
        };
    } catch (error) {
        console.error('Error submitting test data:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Get aggregated statistics from global database
export async function getGlobalStats() {
    const firestoreDb = await getDb();
    if (!firestoreDb) {
        console.error('Firebase not initialized');
        return { success: false, data: [] };
    }

    try {
        const { collection, getDocs, query, orderBy, limit } = await import('firebase/firestore');

        const testsRef = collection(firestoreDb, 'controller_tests');
        const q = query(testsRef, orderBy('timestamp', 'desc'), limit(10000));
        const querySnapshot = await getDocs(q);

        const allTests = [];
        querySnapshot.forEach((doc) => {
            allTests.push({ id: doc.id, ...doc.data() });
        });

        // Aggregate data by controller name
        const stats = {};

        allTests.forEach(test => {
            const name = test.controllerName;
            if (!stats[name]) {
                stats[name] = {
                    controllerName: name,
                    totalTests: 0,
                    totalDrift: 0,
                    totalLatency: 0,
                    issues: {},
                    lastTested: test.timestamp
                };
            }

            stats[name].totalTests++;
            stats[name].totalDrift += (test.driftLeft || 0) + (test.driftRight || 0);
            stats[name].totalLatency += test.latency || 0;

            if (test.issues && Array.isArray(test.issues)) {
                test.issues.forEach(issue => {
                    stats[name].issues[issue] = (stats[name].issues[issue] || 0) + 1;
                });
            }

            if (new Date(test.timestamp) > new Date(stats[name].lastTested)) {
                stats[name].lastTested = test.timestamp;
            }
        });

        // Calculate averages
        const aggregatedStats = Object.values(stats).map(stat => ({
            controllerName: stat.controllerName,
            totalTests: stat.totalTests,
            avgDrift: (stat.totalDrift / (stat.totalTests * 2)).toFixed(2),
            avgLatency: (stat.totalLatency / stat.totalTests).toFixed(2),
            commonIssues: Object.entries(stat.issues)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([issue, count]) => ({ issue, count })),
            lastTested: stat.lastTested
        }));

        // Sort by total tests (most tested first)
        aggregatedStats.sort((a, b) => b.totalTests - a.totalTests);

        return {
            success: true,
            data: aggregatedStats,
            totalEntries: allTests.length
        };
    } catch (error) {
        console.error('Error fetching global stats:', error);
        return {
            success: false,
            error: error.message,
            data: []
        };
    }
}

// Get recent test submissions (for admin view)
export async function getRecentTests(limitCount = 50) {
    const firestoreDb = await getDb();
    if (!firestoreDb) {
        return { success: false, data: [] };
    }

    try {
        const { collection, getDocs, query, orderBy, limit } = await import('firebase/firestore');

        const testsRef = collection(firestoreDb, 'controller_tests');
        const q = query(testsRef, orderBy('timestamp', 'desc'), limit(limitCount));
        const querySnapshot = await getDocs(q);

        const tests = [];
        querySnapshot.forEach((doc) => {
            tests.push({ id: doc.id, ...doc.data() });
        });

        return {
            success: true,
            data: tests
        };
    } catch (error) {
        console.error('Error fetching recent tests:', error);
        return {
            success: false,
            error: error.message,
            data: []
        };
    }
}
