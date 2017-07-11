(function (sha256, sha224) {
  Array.prototype.toHexString = ArrayBuffer.prototype.toHexString = function () {
    var array = new Uint8Array(this);
    var hex = '';
    for (var i = 0; i < array.length; ++i) {
      var c = array[i].toString('16');
      hex += c.length === 1 ? '0' + c : c;
    }
    return hex;
  };

  var testCases = {
    sha256: {
      'ascii': {
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': '',
        'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592': 'The quick brown fox jumps over the lazy dog',
        'ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c': 'The quick brown fox jumps over the lazy dog.'
      },
      'ascii more than 64 bytes': {
        '54e73d89e1924fdcd056390266a983924b6d6d461e9470b6cd50bbaf69b5c54c': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
      },
      'UTF8': {
        '72726d8818f693066ceb69afa364218b692e62ea92b385782363780f47529c21': '中文',
        '53196d1acfce0c4b264e01e8018c989d571351f59e33f055f76ff15b4f0516c6': 'aécio',
        '8d10a48685dbc34484696de7ea7434d80a54c1d60100530faccf697463ef19c9': '𠜎'
      },
      'UTF8 more than 64 bytes': {
        'd691014feebf35b3500ef6f6738d0094cac63628a7a018a980a40292a77703d1': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
        '81a1472ebdeb09406a783d607ff49ee2fde3e9f44ac1cd158ad8d6ad3c4e69fa': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
      },
      'special length': {
        '5e6b963e2b6444dab8544beab8532850cef2a9d143872a6a5384abe37e61b3db': '0123456780123456780123456780123456780123456780123456780',
        '85d240a4a03a0710423fc4f701da51e8785c9eaa96d718ab1c7991d6afd60d62': '01234567801234567801234567801234567801234567801234567801',
        'c3ee464d5620eb2dde3dfda4c7955dbd9e9e2e9b113c13983fc67b0dfd892a53': '0123456780123456780123456780123456780123456780123456780123456780',
        '74b51c6911f9a8b5e7c499effe7604e43b672166818873c27752c248de434841': '01234567801234567801234567801234567801234567801234567801234567801234567',
        '6fba9e623ae6abf028a1b195748814aa95eebfb22e3ec5e15d2444cd6c48186a': '012345678012345678012345678012345678012345678012345678012345678012345678'
      },
      'Array': {
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': [],
        '182889f925ae4e5cc37118ded6ed87f7bdc7cab5ec5e78faef2e50048999473f': [211, 212],
        'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103],
        '74b51c6911f9a8b5e7c499effe7604e43b672166818873c27752c248de434841': [48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55]
      },

      'Uint8Array': {
        '182889f925ae4e5cc37118ded6ed87f7bdc7cab5ec5e78faef2e50048999473f': new Uint8Array([211, 212]),
        'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
      },
      'Int8Array': {
        'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
      },
      'ArrayBuffer': {
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': new ArrayBuffer(0),
        '6e340b9cffb37a989ca544e6bb780a2c78901d3fb33738768511a30617afa01d': new ArrayBuffer(1),
      }
    },
    sha224: {
      'ascii': {
        'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f': '',
        '730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525': 'The quick brown fox jumps over the lazy dog',
        '619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c': 'The quick brown fox jumps over the lazy dog.'
      },
      'ascii more than 64 bytes': {
        '4d97e15967391d2e846ea7d21bb480efadbae5868b731e7cc6267006': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
      },
      'UTF8': {
        'dfbab71afdf54388af4d55f8bd3de8c9b15e0eb916bf9125f4a959d4': '中文',
        'd12841cafd89c534924a839e62bf35a2b5f3717b7802eb19bd8d8e15': 'aécio',
        'eaa0129b5509f5701db218fb7076b282e4409da52d06363aa3bdd63d': '𠜎'
      },
      'UTF8 more than 64 bytes': {
        '0dda421f3f81272418e1313673e9d74b7f2d04efc9c52c69458e12c3': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
        'a8cb74a54e6dc6ab6110db3915ba08ffe5e1abafaea78538fa12a626': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
      },
      'special length': {
        'bc4a354d66f3cff4bc6dd6a88fbb0435cede7fd5fe94da0760cb1924': '0123456780123456780123456780123456780123456780123456780',
        '2f148f757d1295784a7c69bf328b8bf827a536669e132234cd6f50e7': '01234567801234567801234567801234567801234567801234567801',
        '496275a96bf41aa27ce89c3ae0fc63c3a3eab063887a8ea075bd091b': '0123456780123456780123456780123456780123456780123456780123456780',
        '16ee1b101fe0e0d8dd156d598931ec19d75b0f8dc0a0455733c168c8': '01234567801234567801234567801234567801234567801234567801234567801234567',
        '04c7a30079c640e440d884cdf0d7ab04fd05501d4498cb21be29ca1f': '012345678012345678012345678012345678012345678012345678012345678012345678'
      },
      'Array': {
        'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f': [],
        '730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103],
        '16ee1b101fe0e0d8dd156d598931ec19d75b0f8dc0a0455733c168c8': [48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55]
      },
      'Uint8Array': {
        'e17541396a3ecd1cd5a2b968b84e597e8eae3b0ea3127963bf48dd3b': new Uint8Array([211, 212]),
        '730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
      },
      'Int8Array': {
        '730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
      },
      'ArrayBuffer': {
        'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f': new ArrayBuffer(0),
        'fff9292b4201617bdc4d3053fce02734166a683d7d858a7f5f59b073': new ArrayBuffer(1),
      }
    }
  };

  var errorTestCases = [null, undefined, { length: 0 }, 0, 1, false, true, NaN, Infinity, function () {}];

  if (typeof process == 'object') {
    testCases.sha256['Buffer'] = {
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': new Buffer(0),
      'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592': new Buffer(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
    testCases.sha224['Buffer'] = {
      'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f': new Buffer(0),
      '730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525': new Buffer(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
  }

  function runTestCases(name, algorithm) {
    var methods = [
      {
        name: name,
        call: algorithm,
      },
      {
        name: name + '.hex',
        call: algorithm.hex
      },
      {
        name: name + '.array',
        call: function (message) {
          return algorithm.array(message).toHexString();
        }
      },
      {
        name: name + '.digest',
        call: function (message) {
          return algorithm.digest(message).toHexString();
        }
      },
      {
        name: name + '.arrayBuffer',
        call: function (message) {
          return algorithm.arrayBuffer(message).toHexString();
        }
      }
    ];

    var classMethods = [
      {
        name: 'create',
        call: function (message) {
          return algorithm.create().update(message).toString();
        }
      },
      {
        name: 'update',
        call: function (message) {
          return algorithm.update(message).toString();
        }
      },
      {
        name: 'hex',
        call: function (message) {
          return algorithm.update(message).hex();
        }
      },
      {
        name: 'array',
        call: function (message) {
          return algorithm.update(message).array().toHexString();
        }
      },
      {
        name: 'digest',
        call: function (message) {
          return algorithm.update(message).digest().toHexString();
        }
      },
      {
        name: 'arrayBuffer',
        call: function (message) {
          return algorithm.update(message).arrayBuffer().toHexString();
        }
      },
      {
        name: 'finalize',
        call: function (message) {
          var hash = algorithm.update(message);
          hash.hex();
          hash.update(message);
          return hash.hex();
        }
      }
    ];

    var subTestCases = testCases[name];

    describe(name, function () {
      methods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message)).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      classMethods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message)).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      describe('#' + name, function () {
        errorTestCases.forEach(function (testCase) {
          context('when ' + testCase, function () {
            it('should throw error', function () {
              expect(function () {
                algorithm(testCase);
              }).to.throwError(/input is invalid type/);
            });
          });
        });
      });
    });
  }

  runTestCases('sha256', sha256);
  runTestCases('sha224', sha224);
})(sha256, sha224);
