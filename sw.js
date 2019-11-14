const cacheVersion = "Home-2019.11.3";
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
	"/fonts/FiraSansNF.woff2",
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(cacheVersion).then(function (cache) {
			return cache.addAll(urlsToPrefetch);
		})
	);
});

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== cacheVersion) {
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
	event.respondWith(fromNetwork(event.request, 400).catch(function () {
		return fromCache(event.request);
	}));
});

function fromNetwork(request, timeout) {
	return new Promise(function (fulfill, reject) {
		var timeoutId = setTimeout(reject, timeout);
		fetch(request).then(function (response) {
			clearTimeout(timeoutId);
			fulfill(response);
		}, reject);
	});
}

function fromCache(request) {
	return caches.open(cacheVersion).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject('no-match');
		});
	});
}
