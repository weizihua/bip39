var bip39 = require('bip39')

class HdWallet {
   constructor() {}

   generateMnemonic(numWords) {
      numWords = (numWords || 15);
      if (numWords < 12)
         throw "numWords should >= 12 length";
      var strength = numWords / 3 * 32;
      return bip39.generateMnemonic(strength);
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