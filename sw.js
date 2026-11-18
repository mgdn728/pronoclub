// Ancienne adresse de PronoClub : ce service worker remplace l'ancien, efface ses copies de l'appli
// et laisse passer le réseau, pour que la page « PronoClub a déménagé » s'affiche.
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.map(function (n) { return caches.delete(n); })); })
    .then(function () { return self.clients.claim(); })
    .then(function () { return self.clients.matchAll({ type: 'window' }); })
    .then(function (L) { L.forEach(function (c) { try { c.navigate(c.url); } catch (_) {} }); }));
});
