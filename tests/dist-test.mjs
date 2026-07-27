import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import packageSha256, {
  sha224 as packageSha224,
  sha256 as namedPackageSha256
} from 'js-sha256';
import browserSha256, {
  sha224 as browserSha224
} from '../src/index.mjs';

const require = createRequire(import.meta.url);
const commonJs = require('../build/sha256.cjs');
const nodeCommonJs = require('js-sha256');

const SHA256_ABC = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
const SHA224_ABC = '23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7';
const HMAC_ABC = '9c196e32dc0175f86f4b1cb89289d6619de6bee699e4c378e68309ed97a1a6ab';

function testContract(name, sha256, sha224) {
  assert.equal(sha256('abc'), SHA256_ABC, `${name}: SHA-256`);
  assert.equal(sha224('abc'), SHA224_ABC, `${name}: SHA-224`);
  assert.equal(sha256.hmac('key', 'abc'), HMAC_ABC, `${name}: HMAC`);
  assert.equal(sha256.update('a').update('bc').hex(), SHA256_ABC, `${name}: streaming`);
  assert.equal(sha256([97, 98, 99]), SHA256_ABC, `${name}: array`);
  assert.equal(sha256(new Uint8Array([97, 98, 99])), SHA256_ABC, `${name}: typed array`);
  assert.equal(sha256.sha256, sha256, `${name}: sha256 property`);
  assert.equal(sha256.sha224, sha224, `${name}: sha224 property`);
}

function testStreamingOutputs(name, algorithm, expected) {
  const hasher = algorithm.create().update('a').update('bc');
  assert.equal(hasher.hex(), expected, `${name}: hex`);
  assert.equal(hasher.toString(), expected, `${name}: toString`);
  assert.deepEqual(hasher.array(), Array.from(Buffer.from(expected, 'hex')), `${name}: array`);
  assert.deepEqual(hasher.digest(), hasher.array(), `${name}: digest`);
  assert.equal(
    Buffer.from(hasher.arrayBuffer()).toString('hex'),
    expected,
    `${name}: arrayBuffer`
  );
  assert.equal(hasher.hex(), expected, `${name}: repeated output`);
}

function testHmacStreamingOutputs(name, hmac) {
  const hasher = hmac.create('key').update('a').update('bc');
  assert.equal(hasher.hex(), HMAC_ABC, `${name}: hex`);
  assert.equal(hasher.toString(), HMAC_ABC, `${name}: toString`);
  assert.deepEqual(hasher.array(), Array.from(Buffer.from(HMAC_ABC, 'hex')), `${name}: array`);
  assert.deepEqual(hasher.digest(), hasher.array(), `${name}: digest`);
  assert.equal(
    Buffer.from(hasher.arrayBuffer()).toString('hex'),
    HMAC_ABC,
    `${name}: arrayBuffer`
  );
  assert.equal(hasher.hex(), HMAC_ABC, `${name}: repeated output`);
}

testContract('package ESM', packageSha256, packageSha224);
assert.equal(namedPackageSha256, packageSha256);
testStreamingOutputs('package ESM SHA-256 streaming', packageSha256, SHA256_ABC);
testStreamingOutputs('package ESM SHA-224 streaming', packageSha224, SHA224_ABC);
testHmacStreamingOutputs('package ESM HMAC streaming', packageSha256.hmac);
testContract('browser ESM', browserSha256, browserSha224);
testContract('generic CommonJS', commonJs, commonJs.sha224);
testContract('package CommonJS', nodeCommonJs, nodeCommonJs.sha224);
testStreamingOutputs('package CommonJS SHA-256 streaming', nodeCommonJs, SHA256_ABC);
testStreamingOutputs('package CommonJS SHA-224 streaming', nodeCommonJs.sha224, SHA224_ABC);
testHmacStreamingOutputs('package CommonJS HMAC streaming', nodeCommonJs.hmac);

const umdCode = await readFile(new URL('../build/sha256.min.js', import.meta.url), 'utf8');
const browserContext = vm.createContext({});
vm.runInContext(umdCode, browserContext);
testContract('browser UMD', browserContext.sha256, browserContext.sha224);

let amdSha256;
const amdContext = vm.createContext({
  define(factory) {
    amdSha256 = factory();
  }
});
amdContext.define.amd = true;
vm.runInContext(umdCode, amdContext);
testContract('AMD', amdSha256, amdSha256.sha224);

console.log('Distribution contracts: PASS');
