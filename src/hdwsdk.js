var bip39 = require('bip39')

class HdWallet {
   constructor() {}

   result(status, data, code) {
      return {
         status: status, //bool
         data: data, //any
         code: code //int
      };
   }

   generateMnemonic(numWords) {
      numWords = (numWords || 15);
      if (numWords < 12)
         return this.result(false, null, 2000);
      //throw "numWords should >= 12 length";
      var strength = numWords / 3 * 32;
      return this.result(true, bip39.generateMnemonic(strength), 0);
   }
}

class Holder {
   constructor(_hdWallet) {
      this.hdWallet = _hdWallet;
   }
}

let holder = new Holder(new HdWallet());
if (typeof window !== 'undefined') {
   window.hdWallet = holder.hdWallet;
}
module.exports = holder;