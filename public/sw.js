/* PlasmoidX static-export service worker — shell + locks + key assets. */
const CACHE = "plasmoidx-shell-v13";

const PRECACHE = [
  "/",
  "/study/",
  "/device/",
  "/services/",
  "/connect/",
  "/sources/",
  "/study-pack/",
  "/glossary/",
  "/faq/",
  "/updates/",
  "/data/locks.json",
  "/logo.webp",
  "/logo.avif",
  "/logo.png",
  "/favicon.svg",
  "/favicon.png",
  "/og.png",
  "/visuals/home-problem-solution.png",
  "/visuals/device-system-accurate.png",
  "/visuals/device-nested-spheres.png",
  "/visuals/device-vajra-gun.png",
  "/visuals/services-install.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
