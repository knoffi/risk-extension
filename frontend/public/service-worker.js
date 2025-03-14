const cacheName = "v0.3";

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);

    console.log("#### CACHE ####");
    console.log(await cache.keys().length);
};

self.addEventListener("install", (event) => {
    console.log("SW installed");
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/style.css",
            "/app.js",
            "/image-list.js",
        ])
    );
});

self.addEventListener("activate", (event) => {
    console.log("SW active");

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    console.log(`SW fetching: ${event.request.url}`);

    event.respondWith(
        (async () => {
            const responseFromCache = await caches.match(event.request);
            if (responseFromCache) {
                return responseFromCache;
            }

            const response = await fetch(event.request);
            const cache = await caches.open(cacheName);
            console.log(`SW caching new resource: ${event.request.url}`);
            cache.put(event.request, response.clone());
            return response;
        })()
    );
});
