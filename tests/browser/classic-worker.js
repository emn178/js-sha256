importScripts('/build/sha256.min.js');

self.onmessage = function (event) {
  self.postMessage(sha256(event.data));
};
