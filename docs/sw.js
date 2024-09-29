const CACHE = "sw-cache";
var fileList = [
  "./assets/index-BmRG5oYe.js",
  "./assets/index-CIPfjss3.css",
  "./assets/manifest-BnUWcwAj.json",
  "./favicon.ico",
  "./images/logo-192.png",
  "./images/logo-512.png",
  "./images/logo.svg",
  "./index.html",
  "./sw.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(fileList);
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      return fetch(e.request).catch(async () => await caches.match(e.request));
    })()
  );
});
