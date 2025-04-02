const CACHE_NAME = "v0.17";

// STALE_WHILE_REVALIDATE: images which are fine being served slightly outdated, f.e. avaters chosen by players or other things that barely change between deployments
// networkOnly: resources where returning a response from cache would be misleading: f.e. POST requests, health-checks against backend, maybe even bank account balance
// netWorkFirst: everything that should be up to date if there is a network connection, but can be served from cache if offline and is still useful (not the health check!)
// cacheFirst: non-precached resources which do not change between deployments, f.e. javascript, css, html (<--------- How to update them after the deployment? The service worker needs to update increase the cache version I guess. Is there a good "how to" provided by MDN or google chrome?)
// cachekOnly: static resources for precachingw

// TODO: What happens, when a user logs in with a different profile. Will the service worker return cached results from the previous profile? This seems like a security risk, if two different people use the same device
function isCacheFirstNetworkSecond(event) {
    return isPreCacheable(event);
}

function isNetworkFirstCacheSecond(event) {
    return event.request.method === "GET";
}

function isNetworkOnlyNoCache(event) {
    const { url, method } = event.request;

    const isHealthCheck = url.match(/\/api\/health-check/);
    const isSocketPolling = url.match(
        /\/socket\.io\/\?EIO=4&transport=polling/
    );
    return method !== "GET" || isHealthCheck || isSocketPolling;
}

function isStaleWhileRevalidate() {
    throw new Error("Not implemented yet!");
}

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
};

const PRE_CACHE = [
    // Path for "/" is needed for PWA precache only
    "/",
    "/index.html",
    "/Login",
    "/login",
    "/manifest.json",
    "/bundle.js",
    "/risk.svg",
    "/favicon.ico",
];

function isPreCacheable(event) {
    const { url, method } = event.request;

    return (
        method === "GET" &&
        PRE_CACHE.some((path) => self.location.origin + path === url)
    );
}

self.addEventListener("install", (event) => {
    console.debug("SW installed");
    event.waitUntil(addResourcesToCache(PRE_CACHE));
});

self.addEventListener("activate", () => {
    console.debug("SW active");

    self.clients.claim();
});

self.addEventListener("fetch", async (event) => {
    if (isNetworkOnlyNoCache(event)) {
        console.debug(
            "NWO : " + event.request.destination + " :: " + event.request.url
        );
        // Returning without overriding event.respondWith
        console.debug("NWO :: " + event.request.url);
        return;
    }

    if (isCacheFirstNetworkSecond(event)) {
        console.debug(
            "CF : " + event.request.destination + " :: " + event.request.url
        );
        return event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(event.request.url);
                if (cachedResponse) {
                    console.debug(
                        "CF from cache served :: " + event.request.url
                    );
                    return cachedResponse;
                }

                const fetchedResponse = await fetch(event.request);
                console.debug("CF from network served :: " + event.request.url);
                await cache.put(event.request.url, fetchedResponse.clone());
                console.debug("CF from network cached :: " + event.request.url);
                return fetchedResponse.clone();
            })()
        );
    }

    if (isNetworkFirstCacheSecond(event)) {
        console.debug(
            "NF : " + event.request.destination + " :: " + event.request.url
        );
        return event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME);
                try {
                    const fetchedResponse = await fetch(event.request);
                    console.debug(
                        "NF from network served :: " + event.request.url
                    );
                    await cache.put(event.request.url, fetchedResponse.clone());
                    console.debug(
                        "NF from network cached:: " + event.request.url
                    );
                    return fetchedResponse;
                } catch (e) {
                    const cachedResponse = await cache.match(event.request.url);
                    if (cachedResponse) {
                        console.debug(
                            "NF from cache served :: " + event.request.url
                        );
                        return cachedResponse;
                    }

                    // Throw in response if fetch fails and there was no matching entry in cache (instead of resolving the fetch with undefined)
                    throw new Error(
                        "NF: Failed to get resource :: " + event.request.url
                    );
                }
            })()
        );
    }
});
