// Service Worker — cache-first for static assets, network-first for HTML
// Version bump to force cache refresh when this file changes
const CACHE_NAME = 'mgt-static-v3';
const FONT_CACHE = 'mgt-fonts-v2';
const IMAGE_CACHE = 'mgt-images-v2';

// Core shell resources to precache on install
const PRECACHE_URLS = [
  '/',
  '/offline.html',
];

// ─── Install ────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache the app shell (best-effort; failures are non-fatal)
      return cache.addAll(PRECACHE_URLS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// ─── Activate ───────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  const validCaches = new Set([CACHE_NAME, FONT_CACHE, IMAGE_CACHE]);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => !validCaches.has(k)).map((k) => caches.delete(k))
      )
    )
  );
  return self.clients.claim();
});

// ─── Fetch ───────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  const path = url.pathname;

  // ── Fonts: cache-first, long-lived ─────────────────────────────────────
  if (path.startsWith('/_next/static/') && /\.(woff2?|ttf|otf)/.test(path)) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // ── Next.js immutable static chunks: cache-first ───────────────────────
  if (path.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }

  // ── Images (WebP / PNG / JPG / SVG): cache-first ───────────────────────
  if (/\.(webp|png|jpe?g|svg|gif|ico)$/i.test(path)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // ── HTML pages: network-first (keep content fresh) ─────────────────────
  if (request.mode === 'navigate' || request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request, CACHE_NAME));
    return;
  }

  // Everything else: network only
});

// ─── Strategies ──────────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    return cached ?? new Response('', { status: 503 });
  }
}
