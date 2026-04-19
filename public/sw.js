// Empty Service Worker to satisfy browser requests and prevent 404/500 errors falling through to Next.js router
self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    return self.clients.claim();
});
