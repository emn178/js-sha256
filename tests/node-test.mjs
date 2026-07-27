import assert from 'node:assert/strict';
import { sha224, sha256 } from 'js-sha256';

globalThis.assert = assert;
globalThis.sha256 = sha256;
globalThis.sha224 = sha224;
globalThis.TEST_INTERNALS = false;

await import('./test.js');
await import('./hmac-test.js');
