describe('sha256', function() {
  describe('ascii', function() {
    describe('less than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha256('')).to.be('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
        expect(sha256('The quick brown fox jumps over the lazy dog')).to.be('d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592');
        expect(sha256('The quick brown fox jumps over the lazy dog.')).to.be('ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c');
      });
    });

    describe('more than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha256('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('54e73d89e1924fdcd056390266a983924b6d6d461e9470b6cd50bbaf69b5c54c');
      });
    });
  });

  describe('UTF8', function() {
    describe('less than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha256('中文')).to.be('72726d8818f693066ceb69afa364218b692e62ea92b385782363780f47529c21');
        expect(sha256('aécio')).to.be('53196d1acfce0c4b264e01e8018c989d571351f59e33f055f76ff15b4f0516c6');
        expect(sha256('𠜎')).to.be('8d10a48685dbc34484696de7ea7434d80a54c1d60100530faccf697463ef19c9');
      });
    });

    describe('more than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha256('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('d691014feebf35b3500ef6f6738d0094cac63628a7a018a980a40292a77703d1');
        expect(sha256('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('81a1472ebdeb09406a783d607ff49ee2fde3e9f44ac1cd158ad8d6ad3c4e69fa');
      });
    });
  });
  
  describe('special length', function() {
    it('should be successful', function() {
      expect(sha256('0123456780123456780123456780123456780123456780123456780')).to.be('5e6b963e2b6444dab8544beab8532850cef2a9d143872a6a5384abe37e61b3db');
      expect(sha256('01234567801234567801234567801234567801234567801234567801')).to.be('85d240a4a03a0710423fc4f701da51e8785c9eaa96d718ab1c7991d6afd60d62');
      expect(sha256('0123456780123456780123456780123456780123456780123456780123456780')).to.be('c3ee464d5620eb2dde3dfda4c7955dbd9e9e2e9b113c13983fc67b0dfd892a53');
      expect(sha256('01234567801234567801234567801234567801234567801234567801234567801234567')).to.be('74b51c6911f9a8b5e7c499effe7604e43b672166818873c27752c248de434841');
      expect(sha256('012345678012345678012345678012345678012345678012345678012345678012345678')).to.be('6fba9e623ae6abf028a1b195748814aa95eebfb22e3ec5e15d2444cd6c48186a');
    });
  });

  describe('Array', function() {
    describe('Array', function() {
      it('should be successful', function() {
        expect(sha256([])).to.be('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
        expect(sha256([211, 212])).to.be('182889f925ae4e5cc37118ded6ed87f7bdc7cab5ec5e78faef2e50048999473f');
        expect(sha256([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])).to.be('d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592');
        expect(sha256([48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55, 56, 48, 49, 50, 51, 52, 53, 54, 55])).to.be('74b51c6911f9a8b5e7c499effe7604e43b672166818873c27752c248de434841');
      });
    });

    describe('Uint8Array', function() {
      it('should be successful', function() {
        expect(sha256(new Uint8Array([]))).to.be('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
        expect(sha256(new Uint8Array([211, 212]))).to.be('182889f925ae4e5cc37118ded6ed87f7bdc7cab5ec5e78faef2e50048999473f');
      });
    });
  });
});

describe('sha224', function() {
  describe('ascii', function() {
    describe('less than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha224('')).to.be('d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f');
        expect(sha224('The quick brown fox jumps over the lazy dog')).to.be('730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525');
        expect(sha224('The quick brown fox jumps over the lazy dog.')).to.be('619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c');
      });
    });

    describe('more than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha224('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('4d97e15967391d2e846ea7d21bb480efadbae5868b731e7cc6267006');
      });
    });
  });

  describe('UTF8', function() {
    describe('less than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha224('中文')).to.be('dfbab71afdf54388af4d55f8bd3de8c9b15e0eb916bf9125f4a959d4');
        expect(sha224('aécio')).to.be('d12841cafd89c534924a839e62bf35a2b5f3717b7802eb19bd8d8e15');
        expect(sha224('𠜎')).to.be('eaa0129b5509f5701db218fb7076b282e4409da52d06363aa3bdd63d');
      });
    });

    describe('more than 64 bytes', function() {
      it('should be successful', function() {
        expect(sha224('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('0dda421f3f81272418e1313673e9d74b7f2d04efc9c52c69458e12c3');
        expect(sha224('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('a8cb74a54e6dc6ab6110db3915ba08ffe5e1abafaea78538fa12a626');
      });
    });
  });
  
  describe('special length', function() {
    it('should be successful', function() {
      expect(sha224('0123456780123456780123456780123456780123456780123456780')).to.be('bc4a354d66f3cff4bc6dd6a88fbb0435cede7fd5fe94da0760cb1924');
      expect(sha224('01234567801234567801234567801234567801234567801234567801')).to.be('2f148f757d1295784a7c69bf328b8bf827a536669e132234cd6f50e7');
      expect(sha224('0123456780123456780123456780123456780123456780123456780123456780')).to.be('496275a96bf41aa27ce89c3ae0fc63c3a3eab063887a8ea075bd091b');
      expect(sha224('01234567801234567801234567801234567801234567801234567801234567801234567')).to.be('16ee1b101fe0e0d8dd156d598931ec19d75b0f8dc0a0455733c168c8');
      expect(sha224('012345678012345678012345678012345678012345678012345678012345678012345678')).to.be('04c7a30079c640e440d884cdf0d7ab04fd05501d4498cb21be29ca1f');
    });
  });
});
