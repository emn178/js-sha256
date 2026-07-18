import sha256, { sha224, sha256 as namedSha256 } from 'js-sha256';
import browserSha256, { sha224 as browserSha224 } from 'js-sha256/build/sha256.mjs';

const SHA256_ABC = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
const SHA224_ABC = '23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7';

if (sha256('abc') !== SHA256_ABC || namedSha256('abc') !== SHA256_ABC) {
  throw new Error('ESM SHA-256 import failed');
}
if (sha224('abc') !== SHA224_ABC) {
  throw new Error('ESM SHA-224 import failed');
}
if (typeof sha256.hmac !== 'function' || typeof sha224.hmac !== 'function') {
  throw new Error('ESM HMAC API is missing');
}
if (browserSha256('abc') !== SHA256_ABC || browserSha224('abc') !== SHA224_ABC) {
  throw new Error('Browser ESM import failed');
}

console.log('ESM imports: PASS');
