const CACHE_NAME = "v0.17";

// STALE_WHILE_REVALIDATE: images which are fine being served slightly outdated, f.e. avaters chosen by players or other things that barely change between deployments
// networkOnly: resources where returning a response from cache would be misleading: f.e. POST requests, health-checks against backend, maybe even bank account balance
// netWorkFirst: everything that should be up to date if there is a network connection, but can be served from cache if offline and is still useful (not the health check!)
// cacheFirst: non-precached resources which do not change between deployments, f.e. javascript, css, html (<--------- How to update them after the deployment? The service worker needs to update increase the cache version I guess. Is there a good "how to" provided by MDN or google chrome?)
// cachekOnly: static resources for precachingw

// TODO: What happens, when a user logs in with a different profile. Will the service worker return cached results from the previous profile? This seems like a security risk, if two different people use the same device
function isDevMode() {
    return self.location.origin.match(/^http:\/\/localhost:5173/);
}

function isCacheFirstNetworkSecond(event) {
    return isPreCacheable(event);
}

function isNetworkFirstCacheSecond(event) {
    return event.request.method === "GET";
}

function isNetworkOnlyNoCache(event) {
    const { url, method } = event.request;

    if (method !== "GET") return true;

    const isHealthCheck = url.match(/\/api\/health-check/);
    const isSocketPolling = url.match(
        /\/socket\.io\/\?EIO=4&transport=polling/
    );
    return isHealthCheck || isSocketPolling;
}

function isLoginRequest(request) {
    const { url, method } = request;

    return url.endsWith("/api/authentication/login") && method === "POST";
}

function isStaleWhileRevalidate() {
    throw new Error("Not implemented yet!");
}

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
};

let LOGIN_URL;

const modifiedRequest = async (request, cache) => {
    if (isLoginRequest(request)) return request;

    const userNeverLoggedIn = !LOGIN_URL;
    if (userNeverLoggedIn) {
        return request;
    }

    const apiBaseUrl = LOGIN_URL.replace("authentication/login", "");
    const socketHandshakeUrl = LOGIN_URL.replace(
        "api/authentication/login",
        "socket.io/?EIO="
    );
    const needsApiToken =
        request.url.startsWith(apiBaseUrl) ||
        request.url.startsWith(socketHandshakeUrl);
    if (!needsApiToken) {
        return request;
    }

    const cachedLogins = await cache.matchAll(
        "http://localhost:3001/api/authentication/login"
    );

    if (cachedLogins.length === 0) {
        return request;
    }

    if (cachedLogins.length > 1) {
        throw new Error("Multiple logins cached");
    }

    const token = (await cachedLogins[0].json()).token;
    // TODO: Can't I also define 'const newHeaders = {...request.headers, Authentication: "..."}'
    const newHeaders = new Headers(request.headers);
    newHeaders.set("Authorization", `Bearer ${token}`);

    return new Request(request, {
        // Learn more here https://stackoverflow.com/questions/49503836/serviceworker-is-it-possible-to-add-headers-to-url-request
        // and here https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses
        mode: "cors",
        headers: newHeaders,
    });
};

const PRE_CACHE = [
    // NOTE: Path for "/" is needed for PWA precache only
    "/",
    "/index.html",
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
    if (!isDevMode()) event.waitUntil(addResourcesToCache(PRE_CACHE));
});

self.addEventListener("activate", () => {
    console.debug("SW active");

    self.clients.claim();
});

self.addEventListener("fetch", async (event) => {
    if (isLoginRequest(event.request)) {
        return event.respondWith(
            (async () => {
                const loginRes = await fetch(event.request);
                if (loginRes.status <= 299) {
                    const clonedRes = loginRes.clone();

                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(event.request.url, clonedRes);

                    LOGIN_URL = event.request.url;
                }
                return loginRes;
            })()
        );
    }

    if (isNetworkOnlyNoCache(event) || isDevMode()) {
        console.debug(
            "NWO : " + event.request.destination + " :: " + event.request.url
        );
        return event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME);
                const request = await modifiedRequest(event.request, cache);

                return fetch(request);
            })()
        );
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

                const request = await modifiedRequest(event.request, cache);
                const fetchedResponse = await fetch(request);
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
                    const request = await modifiedRequest(event.request, cache);
                    const fetchedResponse = await fetch(request);
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
