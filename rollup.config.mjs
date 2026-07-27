import { readFileSync } from 'fs';
import terser from '@rollup/plugin-terser';

const { version } = JSON.parse(
  readFileSync(new URL('package.json', import.meta.url), 'utf8')
);

const banner = `/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version ${version}
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2026
 * @license MIT
 */`;

export default [
  {
    input: 'src/cjs.mjs',
    output: {
      banner,
      exports: 'default',
      file: 'build/sha256.cjs',
      format: 'cjs'
    }
  },
  {
    input: 'src/umd.mjs',
    output: {
      banner,
      exports: 'default',
      file: 'build/sha256.js',
      format: 'umd',
      name: 'sha256'
    }
  },
  {
    external: ['crypto'],
    input: 'src/node-cjs.mjs',
    output: {
      banner,
      exports: 'default',
      file: 'build/sha256.node.cjs',
      format: 'cjs'
    }
  },
  {
    input: 'src/umd.mjs',
    output: [
      {
        banner,
        exports: 'default',
        file: 'build/sha256.min.js',
        format: 'umd',
        name: 'sha256',
        plugins: [terser()]
      }
    ]
  },
  {
    input: 'src/index.mjs',
    output: {
      banner,
      file: 'build/sha256.min.mjs',
      format: 'es',
      plugins: [terser()]
    }
  }
];
