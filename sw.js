const cacheVersion = "fredhappyface";
const urlsToPrefetch = [
  "/PWA.Home/",
  "/PWA.Home/info.html",
  "/PWA.Home/settings.html",


  "/css/theme/auto.css",
  "/css/theme/black.css",
  "/css/theme/dark.css",
  "/css/theme/light.css",
  "/css/main.css",
  "/css/settings.css",
  "/scripts/navbar.js",
  "/scripts/script.js",
  "/scripts/settings.js"
];



this.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
      return cache.addAll(urlsToPrefetch);
    })
  );
});


this.addEventListener("fetch", (event) => {
  let responsePromise = caches.match(event.request).then((response) => {
    return response || fetch(event.request);
  });

  event.respondWith(responsePromise);
});