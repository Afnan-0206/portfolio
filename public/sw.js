// Minimal service worker — prevents 404 noise in dev logs.
// This portfolio does not use offline caching.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
