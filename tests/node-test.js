expect = require('expect.js');
Worker = require('webworker-threads').Worker;

function unset() {
  delete require.cache[require.resolve('../src/sha256.js')];
  delete require.cache[require.resolve('./test.js')];
  delete require.cache[require.resolve('./hmac-test.js')];
  sha256 = null;
  sha224 = null;
  BUFFER = undefined;
  JS_SHA256_NO_WINDOW = undefined;
  JS_SHA256_NO_NODE_JS = undefined;
  JS_SHA256_NO_COMMON_JS = undefined;
  JS_SHA256_NO_ARRAY_BUFFER = undefined;
  JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW = undefined;
  window = undefined;
}

function requireToGlobal() {
  sha256 = require('../src/sha256.js').sha256;
  sha224 = require('../src/sha256.js').sha224;
}

function runCommonJsTest() {
  requireToGlobal();
  require('./test.js');
  require('./hmac-test.js');
  unset();
}

function runWindowTest() {
  window = global;
  require('../src/sha256.js');
  require('./test.js');
  require('./hmac-test.js');
  unset();
}

// Node.js env
BUFFER = true;
runCommonJsTest();

// Webpack browser env
JS_SHA256_NO_NODE_JS = true;
window = global;
runCommonJsTest();

// browser env
JS_SHA256_NO_NODE_JS = true;
JS_SHA256_NO_COMMON_JS = true;
runWindowTest();

// browser env and no array buffer
JS_SHA256_NO_NODE_JS = true;
JS_SHA256_NO_COMMON_JS = true;
JS_SHA256_NO_ARRAY_BUFFER = true;
runWindowTest();

// browser env and no isView
JS_SHA256_NO_NODE_JS = true;
JS_SHA256_NO_COMMON_JS = true;
JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW = true;
runWindowTest();

// browser AMD
JS_SHA256_NO_NODE_JS = true;
JS_SHA256_NO_COMMON_JS = true;
JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW = false;
window = global;
define = function (func) {
  sha256 = func();
  sha224 = sha256.sha224;
  require('./test.js');
  require('./hmac-test.js');
};
define.amd = true;

require('../src/sha256.js');
unset();

// webworker
WORKER = 'tests/worker.js';
SOURCE = 'src/sha256.js';

require('./worker-test.js');

delete require.cache[require.resolve('./worker-test.js')];

// cover webworker
JS_SHA256_NO_WINDOW = true;
JS_SHA256_NO_NODE_JS = true;
WORKER = './worker.js';
SOURCE = '../src/sha256.js';
window = global;
self = global;

Worker = function (file) {
  require(file);
  currentWorker = this;

  this.postMessage = function (data) {
    onmessage({data: data});
  };
}

postMessage = function (data) {
  currentWorker.onmessage({data: data});
}

importScripts = function () {};

requireToGlobal();
require('./worker-test.js');
