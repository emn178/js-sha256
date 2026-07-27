import sha256, { sha224 } from './core.mjs';

const root =
  typeof globalThis === 'object' ? globalThis :
  typeof self === 'object' ? self :
  typeof window === 'object' ? window :
  typeof global === 'object' ? global :
  undefined;

if (root) {
  root.sha224 = sha224;
}

export default sha256;
