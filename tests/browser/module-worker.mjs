import { sha256 } from '../../src/index.mjs';

self.onmessage = function (event) {
  self.postMessage(sha256(event.data));
};
