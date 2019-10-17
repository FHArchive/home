const cacheVersion = "fredhappyface";
const urlsToPrefetch = [
  "/PWA.Home/",
  "/PWA.Home/info.html",
  "/PWA.Home/settings.html",

  "/PWA.Home/images/page/android.png",
  "/PWA.Home/images/page/blackc4t.png",
  "/PWA.Home/images/page/brainf.png",
  "/PWA.Home/images/page/happyshibe.png",

  "/PWA.Home/images/page/browsers/browser.png",
  "/PWA.Home/images/page/browsers/chrome.png",
  "/PWA.Home/images/page/browsers/chromium.png",
  "/PWA.Home/images/page/browsers/firefox.png",
  "/PWA.Home/images/page/browsers/ie.png",
  "/PWA.Home/images/page/browsers/ms-edge.png",
  "/PWA.Home/images/page/browsers/safari.png",
  "/PWA.Home/images/page/browsers/tor.png",

  "/css/theme/auto.css",
  "/css/theme/black.css",
  "/css/theme/dark.css",
  "/css/theme/light.css",
  "/css/main.css",
  "/css/settings.css",
  "/scripts/navbar.js",
  "/scripts/script.js",
  "/scripts/settings.js",
  "/images/pageicons/info.svg",
  "/images/pageicons/settings.svg",
  "/images/pageicons/keyboard_backspace.svg",
  "/images/appicons/squircle-256.png"
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