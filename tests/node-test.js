// Node.js env
expect = require('expect.js');
sha256 = require('../src/sha256.js').sha256;
sha224 = require('../src/sha256.js').sha224;
require('./test.js');

delete require.cache[require.resolve('../src/sha256.js')]
delete require.cache[require.resolve('./test.js')]
sha256 = null;
sha224 = null;

// Webpack browser env
JS_SHA256_NO_NODE_JS = true;
window = global;
sha256 = require('../src/sha256.js').sha256;
sha224 = require('../src/sha256.js').sha224;
require('./test.js');

delete require.cache[require.resolve('../src/sha256.js')]
delete require.cache[require.resolve('./test.js')]
sha256 = null;
sha224 = null;

// browser env
JS_SHA256_NO_NODE_JS = true;
JS_SHA256_NO_COMMON_JS = true;
window = global;
require('../src/sha256.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha256.js')]
delete require.cache[require.resolve('./test.js')]
sha256 = null;
sha224 = null;

// browser AMD
JS_SHA256_NO_NODE_JS = true;
JS_SHA256_NO_COMMON_JS = true;
window = global;
define = function (func) {
  sha256 = func();
  sha224 = sha256.sha224;
  require('./test.js');
};
define.amd = true;

require('../src/sha256.js');
