const CACHE_VERSION = 'leader-v1';
const CACHE_ASSETS = CACHE_VERSION + '-assets';
const CACHE_DATA = CACHE_VERSION + '-data';

const urlsToCache = [
  '/mobile-ready-web-app/',
  '/mobile-ready-web-app/index.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_ASSETS).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.warn('Cache addAll error (expected for offline-first):', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_ASSETS && cacheName !== CACHE_DATA) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request).then(response => {
      if (response) return response;

      return fetch(request)
        .then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_DATA).then(cache => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          return caches.match(request);
        });
    })
  );
});
