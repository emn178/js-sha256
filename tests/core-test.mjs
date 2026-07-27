import assert from 'node:assert/strict';
import { sha224, sha256 } from '../src/core.mjs';

globalThis.assert = assert;
globalThis.sha256 = sha256;
globalThis.sha224 = sha224;
globalThis.TEST_INTERNALS = true;

await import('./test.js');
await import('./hmac-test.js');
