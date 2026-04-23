const CACHE_NAME    = 'devlinks-v2';
const API_CACHE     = 'devlinks-api-v2';
const API_BASE      = 'https://backend-devlinks.onrender.com/api';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
];

// ── INSTALL: cache static assets ─────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ── ACTIVATE: clean old caches ───────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== API_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH ─────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = request.url;

  // Solo GET
  if (request.method !== 'GET') return;

  // ── API calls: network-first, fallback to cache ──
  if (url.startsWith(API_BASE)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Guarda la respuesta fresca en el cache de API
          const clone = response.clone();
          caches.open(API_CACHE).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Sin internet → devuelve la última respuesta cacheada
          return caches.match(request).then(cached => {
            if (cached) return cached;
            // Si no hay cache, devuelve array vacío para no romper la app
            return new Response(JSON.stringify([]), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // ── CDN assets: cache-first ──
  if (url.includes('cdn.jsdelivr.net') || url.includes('fonts.googleapis')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // ── App shell: cache-first ──
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).catch(() => {
        if (request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
