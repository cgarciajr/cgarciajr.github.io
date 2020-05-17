const version = 1;
const cacheName = `stale- ${version}`;

self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  if(self.clients && clients.claim)
    clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(response => { caches.open(cacheName).then(cache => {
      if(response.status >= 500) {
        cache.match(event.request).then(res => { return res; }).catch(() => { return response; });
      } else {
        cache.put(event.request, response.clone());
        return response;
      }
    });
  })
  );
});

