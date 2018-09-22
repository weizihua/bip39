var assert = require('assert');
var HDWJS = require('../');

describe('Mnemonic', function () {
   describe('#generateMnemonic()', function () {
      it('should generate mnemonic with 15 words default', function () {
         var mnemonic = HDWJS.hdWallet.generateMnemonic();
         var words = mnemonic.split(' ');
         assert.equal(words.length, 15);
      });

      it('should generate mnemonic with 12 words default', function () {
         var mnemonic = HDWJS.hdWallet.generateMnemonic(12);
         var words = mnemonic.split(' ');
         assert.equal(words.length, 12);
      });
   });
});