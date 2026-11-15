/* Chaturanga service worker: cache the site's own files so the installed
   app opens fast and works offline. Only same-origin files listed below are
   cached; Lichess/Stockfish requests always go to the network. */
var CACHE = 'chaturanga-v5';
var FILES = [
  "index.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "apple-touch-icon.png",
  "favicon.png",
  "assets/pieces/bB.svg",
  "assets/pieces/bK.svg",
  "assets/pieces/bN.svg",
  "assets/pieces/bP.svg",
  "assets/pieces/bQ.svg",
  "assets/pieces/bR.svg",
  "assets/pieces/wB.svg",
  "assets/pieces/wK.svg",
  "assets/pieces/wN.svg",
  "assets/pieces/wP.svg",
  "assets/pieces/wQ.svg",
  "assets/pieces/wR.svg",
  "assets/pieces-modern/bB.svg",
  "assets/pieces-modern/bK.svg",
  "assets/pieces-modern/bN.svg",
  "assets/pieces-modern/bP.svg",
  "assets/pieces-modern/bQ.svg",
  "assets/pieces-modern/bR.svg",
  "assets/pieces-modern/wB.svg",
  "assets/pieces-modern/wK.svg",
  "assets/pieces-modern/wN.svg",
  "assets/pieces-modern/wP.svg",
  "assets/pieces-modern/wQ.svg",
  "assets/pieces-modern/wR.svg",
  "assets/pieces-simple/bB.svg",
  "assets/pieces-simple/bK.svg",
  "assets/pieces-simple/bN.svg",
  "assets/pieces-simple/bP.svg",
  "assets/pieces-simple/bQ.svg",
  "assets/pieces-simple/bR.svg",
  "assets/pieces-simple/wB.svg",
  "assets/pieces-simple/wK.svg",
  "assets/pieces-simple/wN.svg",
  "assets/pieces-simple/wP.svg",
  "assets/pieces-simple/wQ.svg",
  "assets/pieces-simple/wR.svg",
  "assets/pieces-pixel/bB.png",
  "assets/pieces-pixel/bK.png",
  "assets/pieces-pixel/bN.png",
  "assets/pieces-pixel/bP.png",
  "assets/pieces-pixel/bQ.png",
  "assets/pieces-pixel/bR.png",
  "assets/pieces-pixel/wB.png",
  "assets/pieces-pixel/wK.png",
  "assets/pieces-pixel/wN.png",
  "assets/pieces-pixel/wP.png",
  "assets/pieces-pixel/wQ.png",
  "assets/pieces-pixel/wR.png",
  "assets/sounds/chesscom-move.mp3",
  "assets/sounds/chesscom-capture.mp3",
  "assets/sounds/chesscom-check.mp3",
  "assets/sounds/chesscom-castle.mp3",
  "assets/sounds/chesscom-wrong.mp3",
  "assets/sounds/chesscom-start.mp3",
  "assets/sounds/chesscom-end.mp3",
  "assets/sounds/chesscom-success.mp3",
  "assets/sounds/chesscom-promote.mp3",
  "assets/sounds/chesscom-select.mp3"
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); })
    .then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(function (hit) {
    if (hit) return hit;
    return fetch(e.request);
  }).catch(function () { return fetch(e.request); }));
});
