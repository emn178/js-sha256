import { createHash, createHmac } from 'crypto';
import { FINALIZE_ERROR, formatMessage } from './shared.mjs';

function toNodeInput(message) {
  const [ msg, isString ] = formatMessage(message);
  return isString ? Buffer.from(msg, 'utf8') : Buffer.from(msg);
}

class NodeHasher {
  constructor(hash) {
    this.hash = hash;
    this.result = undefined;
  }

  update(message) {
    if (this.result) {
      throw new Error(FINALIZE_ERROR);
    }
    this.hash.update(toNodeInput(message));
    return this;
  }

  finalize() {
    if (!this.result) {
      this.result = this.hash.digest();
      this.hash = undefined;
    }
  }

  hex() {
    this.finalize();
    return this.result.toString('hex');
  }

  toString() {
    return this.hex();
  }

  array() {
    this.finalize();
    return Array.from(this.result);
  }

  digest() {
    return this.array();
  }

  arrayBuffer() {
    return Uint8Array.from(this.array()).buffer;
  }
}

function addOutputMethods(method, createHasher) {
  method.hex = method;
  method.array = function (...args) {
    return createHasher(...args.slice(0, -1)).update(args[args.length - 1]).array();
  };
  method.digest = method.array;
  method.arrayBuffer = function (...args) {
    return createHasher(...args.slice(0, -1)).update(args[args.length - 1]).arrayBuffer();
  };
  return method;
}

function createNodeMethod(algorithm) {
  const createHasher = () => new NodeHasher(createHash(algorithm));
  const method = function (message) {
    return createHasher().update(message).hex();
  };
  addOutputMethods(method, createHasher);
  method.create = createHasher;
  method.update = function (message) {
    return method.create().update(message);
  };
  return method;
}

function createNodeHmacMethod(algorithm) {
  const createHasher = key => new NodeHasher(createHmac(algorithm, toNodeInput(key)));
  const method = function (key, message) {
    return createHasher(key).update(message).hex();
  };
  addOutputMethods(method, createHasher);
  method.create = createHasher;
  method.update = function (key, message) {
    return method.create(key).update(message);
  };
  return method;
}

const sha256 = createNodeMethod('sha256');
const sha224 = createNodeMethod('sha224');

sha256.sha256 = sha256;
sha256.sha224 = sha224;
sha256.hmac = createNodeHmacMethod('sha256');
sha224.hmac = createNodeHmacMethod('sha224');

export { sha256, sha224 };
export default sha256;
