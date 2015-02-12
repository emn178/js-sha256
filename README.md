# js-sha256
[![Build Status](https://travis-ci.org/emn178/js-sha256.svg?branch=master)](https://travis-ci.org/emn178/js-sha256)
[![Coverage Status](https://coveralls.io/repos/emn178/js-sha256/badge.svg?branch=master)](https://coveralls.io/r/emn178/js-sha256?branch=master)  
[![NPM](https://nodei.co/npm/js-sha256.png?stars&downloads)](https://nodei.co/npm/js-sha256/)  
A simple SHA-256 / SHA-224 hash function for JavaScript supports UTF-8 encoding.

## Demo
[SHA256 Online](http://emn178.github.io/online-tools/sha256.html)  
[SHA224 Online](http://emn178.github.io/online-tools/sha224.html)  

## Download
[Compress](https://raw.github.com/emn178/js-sha256/master/build/sha256.min.js)  
[Uncompress](https://raw.github.com/emn178/js-sha256/master/src/sha256.js)

## Installation
You can also install js-sha256 by using Bower.

    bower install js-sha256

For node.js, you can use this command to install:

    npm install js-sha256

## Usage
You could use like this:
```JavaScript
sha256('Message to hash');
sha224('Message to hash');
```
If you use node.js, you should require the module first:
```JavaScript
sha256 = require('js-sha256');
```
or 
```JavaScript
sha256 = require('js-sha256').sha256;
sha224 = require('js-sha256').sha224;
```

## Example
Code
```JavaScript
sha256('');
sha256('The quick brown fox jumps over the lazy dog');
sha256('The quick brown fox jumps over the lazy dog.');
sha224('');
sha224('The quick brown fox jumps over the lazy dog');
sha224('The quick brown fox jumps over the lazy dog.');
```
Output

    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
    d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592
    ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c
    d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f
    730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525
    619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c

It also supports UTF-8 encoding:

Code
```JavaScript
sha256('中文');
sha224('中文');
```
Output

    72726d8818f693066ceb69afa364218b692e62ea92b385782363780f47529c21
    dfbab71afdf54388af4d55f8bd3de8c9b15e0eb916bf9125f4a959d4

It also supports byte Array or Uint8Array input:

Code
```JavaScript
sha256([]);
sha256(new Uint8Array([211, 212]));
```
Output

    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
    182889f925ae4e5cc37118ded6ed87f7bdc7cab5ec5e78faef2e50048999473f

## Benchmark
[UTF8](http://jsperf.com/sha256/66)  
[ASCII](http://jsperf.com/sha256/65)

## Extensions
### jQuery
If you prefer jQuery style, you can add following code to add a jQuery extension.

Code
```JavaScript
jQuery.sha256 = sha256
jQuery.sha224 = sha224
```
And then you could use like this:
```JavaScript
$.sha256('message');
$.sha224('message');
```
### Prototype
If you prefer prototype style, you can add following code to add a prototype extension.

Code
```JavaScript
String.prototype.sha256 = function() {
  return sha256(this);
};
String.prototype.sha224 = function() {
  return sha224(this);
};
```
And then you could use like this:
```JavaScript
'message'.sha256();
'message'.sha224();
```
## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/js-sha256  
Author: emn178@gmail.com
