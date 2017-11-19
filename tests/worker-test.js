(function (Worker, WORKER, SOURCE) {
  var cases = {
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855': '',
    'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592': 'The quick brown fox jumps over the lazy dog',
    'ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c': 'The quick brown fox jumps over the lazy dog.'
  };

  describe('#sha256', function () {
    Object.keys(cases).forEach(function (hash) {
      it('should be equal', function (done) {
        var worker = new Worker(WORKER);
        worker.onmessage = function(event) {
          expect(event.data).to.be(hash);
          done();
        };
        worker.postMessage(SOURCE);
        worker.postMessage(cases[hash]);
      });
    });
  });
})(Worker, WORKER, SOURCE);
