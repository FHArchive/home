const cacheVersion = "Home-2019.11.1";
const urlsToPrefetch = [
	"/PWA.Home/",
	"/PWA.Home/index.html",
	"/PWA.Home/info.html",
	"/PWA.Home/settings.html",

	"/PWA.Home/images/appicons/squircle-256.png",

	"/PWA.Home/images/page/android.png",
	"/PWA.Home/images/page/blackc4t.png",
	"/PWA.Home/images/page/brainf.png",
	"/PWA.Home/images/page/happyshibe.png",
	"/PWA.Home/images/page/passwordgen.png",

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


self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(cacheVersion).then(function (cache) {
			return cache.addAll(urlsToPrefetch);
		})
	);
});

self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all(keyList.map(function(key){
				if (key !== cacheVersion){
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  let responsePromise = caches.match(event.request).then((response) => {
    return response || fetch(event.request);
  });

  event.respondWith(responsePromise);
});
