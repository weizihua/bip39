/**
 * IOS Bridge
 * 2018-09-27
 */

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
     return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
     return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
     document.documentElement.removeChild(WVJBIframe)
  }, 0)
};

setupWebViewJavascriptBridge(function (bridge) {
  bridge.registerHandler('generateMnemonic', function (data, responseCallback) {
    //  responseCallback(window.hdWallet.generateMnemonic(data));
     responseCallback(window.hdWallet.generateMnemonic(data));
  })
});