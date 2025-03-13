console.log("Hey, I am a service worker.");

const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
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
            "/star-wars-logo.jpg",
            "/gallery/bountyHunters.jpg",
            "/gallery/myLittleVader.jpg",
            "/gallery/snowTroopers.jpg",
        ])
    );
});

self.addEventListener("fetch", (event) => {
    // event.respondWith(/* custom content goes here */);
    console.log("SW got fetch event:" + JSON.stringify(event));
});
