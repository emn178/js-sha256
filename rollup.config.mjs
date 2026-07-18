import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const disableNodeJs = {
  name: 'disable-node-js',
  transform(code, id) {
    if (id.endsWith('/src/sha256.js')) {
      const nodeJsDeclaration = /^\s*var NODE_JS = .*;$/m;
      if (!nodeJsDeclaration.test(code)) {
        this.error('Could not find the NODE_JS declaration');
      }
      return code.replace(nodeJsDeclaration, '  var NODE_JS = false;');
    }
  }
};

export default [
  {
    input: 'src/sha256.mjs',
    external: ['crypto', 'buffer'],
    output: {
      file: 'build/sha256.node.mjs',
      format: 'es'
    },
    plugins: [commonjs({
      strictRequires: false
    })]
  },
  {
    input: 'src/sha256.mjs',
    output: {
      file: 'build/sha256.mjs',
      format: 'es'
    },
    plugins: [disableNodeJs, commonjs({
      strictRequires: false,
      ignore: ['crypto', 'buffer']
    })]
  },
  {
    input: 'build/sha256.mjs',
    output: {
      file: 'build/sha256.min.mjs',
      format: 'es'
    },
    plugins: [terser()]
  }
];
