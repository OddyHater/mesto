// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"vendor/normalize.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendor/fonts.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./fonts\\Inter-Regular.woff2":[["Inter-Regular.d97139a6.woff2","vendor/fonts/Inter-Regular.woff2"],"vendor/fonts/Inter-Regular.woff2"],"./fonts\\Inter-Regular.woff":[["Inter-Regular.e65fa1e2.woff","vendor/fonts/Inter-Regular.woff"],"vendor/fonts/Inter-Regular.woff"],"./fonts\\Inter-Medium.woff2":[["Inter-Medium.f25de2c6.woff2","vendor/fonts/Inter-Medium.woff2"],"vendor/fonts/Inter-Medium.woff2"],"./fonts\\Inter-Medium.woff":[["Inter-Medium.2f4e1d80.woff","vendor/fonts/Inter-Medium.woff"],"vendor/fonts/Inter-Medium.woff"],"./fonts\\Inter-Black.woff2":[["Inter-Black.8f193d17.woff2","vendor/fonts/Inter-Black.woff2"],"vendor/fonts/Inter-Black.woff2"],"./fonts\\Inter-Black.woff":[["Inter-Black.50228dbf.woff","vendor/fonts/Inter-Black.woff"],"vendor/fonts/Inter-Black.woff"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/page/page.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/content/content.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/clickable/clickable.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/header/header.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/header/__link/header__link.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/header/__logo/header__logo.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile/profile.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile/__edit/profile__edit.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile/__avatar/profile__avatar.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile/__info/profile__info.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile/__name/profile__name.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile/__description/profile__description.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile/__edit-button/profile__edit-button.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\images\\svg\\edit.svg":[["edit.67327ecd.svg","images/svg/edit.svg"],"images/svg/edit.svg"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile/__add-button/profile__add-button.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\images\\svg\\add.svg":[["add.c590b256.svg","images/svg/add.svg"],"images/svg/add.svg"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/cards/cards.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/cards/__list/cards__list.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card/card.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card/__image/card__image.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card/__info/card__info.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card/__trash-button/card__trash-button.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\images\\svg\\trash.svg":[["trash.78924b66.svg","images/svg/trash.svg"],"images/svg/trash.svg"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card/__name/card__name.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card/__like/card__like.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\images\\svg\\like.svg":[["like.651e6aa6.svg","images/svg/like.svg"],"images/svg/like.svg"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/footer/footer.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/footer/__copyright/footer__copyright.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/popup.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/__container/popup__container.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/__title/popup__title.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/__form/popup__form.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/__submit/popup__submit.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/__input/popup__input.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/__input/_type_error/popup__input_type_error.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile-name-error/profile-name-error.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile-email-error/profile-email-error.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card-name-error/card-name-error.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card-url-error/card-url-error.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/profile-name-error/_active/profile-name-error_active.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/__submit/_inactive/popup__submit_inactive.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/__close-button/popup__close-button.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\images\\svg\\close.svg":[["close.3b196ab5.svg","images/svg/close.svg"],"images/svg/close.svg"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup-image/popup-image.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup-image/__container/popup-image__container.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup-image/__close-button/popup-image__close-button.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\images\\svg\\close.svg":[["close.3b196ab5.svg","images/svg/close.svg"],"images/svg/close.svg"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup-image/__close-button/_inactive/popup-image__close-button-inactive.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup-image/__image/popup-image__image.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup-image/__picture-set/popup-image__picture-set.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup-image/__caption/popup-image__caption.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup-image/_opened/popup-image_opened.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/card/__like/_ative/like_active.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\..\\..\\images\\svg\\like_active.svg":[["like_active.818169ce.svg","images/svg/like_active.svg"],"images/svg/like_active.svg"],"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"blocks/popup/_opened/popup_opened.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"pages/index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"../vendor/normalize.css":"vendor/normalize.css","../vendor/fonts.css":"vendor/fonts.css","../blocks/page/page.css":"blocks/page/page.css","../blocks/content/content.css":"blocks/content/content.css","../blocks/clickable/clickable.css":"blocks/clickable/clickable.css","../blocks/header/header.css":"blocks/header/header.css","../blocks/header/__link/header__link.css":"blocks/header/__link/header__link.css","../blocks/header/__logo/header__logo.css":"blocks/header/__logo/header__logo.css","../blocks/profile/profile.css":"blocks/profile/profile.css","../blocks/profile/__edit/profile__edit.css":"blocks/profile/__edit/profile__edit.css","../blocks/profile/__avatar/profile__avatar.css":"blocks/profile/__avatar/profile__avatar.css","../blocks/profile/__info/profile__info.css":"blocks/profile/__info/profile__info.css","../blocks/profile/__name/profile__name.css":"blocks/profile/__name/profile__name.css","../blocks/profile/__description/profile__description.css":"blocks/profile/__description/profile__description.css","../blocks/profile/__edit-button/profile__edit-button.css":"blocks/profile/__edit-button/profile__edit-button.css","../blocks/profile/__add-button/profile__add-button.css":"blocks/profile/__add-button/profile__add-button.css","../blocks/cards/cards.css":"blocks/cards/cards.css","../blocks/cards/__list/cards__list.css":"blocks/cards/__list/cards__list.css","../blocks/card/card.css":"blocks/card/card.css","../blocks/card/__image/card__image.css":"blocks/card/__image/card__image.css","../blocks/card/__info/card__info.css":"blocks/card/__info/card__info.css","../blocks/card/__trash-button/card__trash-button.css":"blocks/card/__trash-button/card__trash-button.css","../blocks/card/__name/card__name.css":"blocks/card/__name/card__name.css","../blocks/card/__like/card__like.css":"blocks/card/__like/card__like.css","../blocks/footer/footer.css":"blocks/footer/footer.css","../blocks/footer/__copyright/footer__copyright.css":"blocks/footer/__copyright/footer__copyright.css","../blocks/popup/popup.css":"blocks/popup/popup.css","../blocks/popup/__container/popup__container.css":"blocks/popup/__container/popup__container.css","../blocks/popup/__title/popup__title.css":"blocks/popup/__title/popup__title.css","../blocks/popup/__form/popup__form.css":"blocks/popup/__form/popup__form.css","../blocks/popup/__submit/popup__submit.css":"blocks/popup/__submit/popup__submit.css","../blocks/popup/__input/popup__input.css":"blocks/popup/__input/popup__input.css","../blocks/popup/__input/_type_error/popup__input_type_error.css":"blocks/popup/__input/_type_error/popup__input_type_error.css","../blocks/profile-name-error/profile-name-error.css":"blocks/profile-name-error/profile-name-error.css","../blocks/profile-email-error/profile-email-error.css":"blocks/profile-email-error/profile-email-error.css","../blocks/card-name-error/card-name-error.css":"blocks/card-name-error/card-name-error.css","../blocks/card-url-error/card-url-error.css":"blocks/card-url-error/card-url-error.css","../blocks/profile-name-error/_active/profile-name-error_active.css":"blocks/profile-name-error/_active/profile-name-error_active.css","../blocks/popup/__submit/_inactive/popup__submit_inactive.css":"blocks/popup/__submit/_inactive/popup__submit_inactive.css","../blocks/popup/__close-button/popup__close-button.css":"blocks/popup/__close-button/popup__close-button.css","../blocks/popup-image/popup-image.css":"blocks/popup-image/popup-image.css","../blocks/popup-image/__container/popup-image__container.css":"blocks/popup-image/__container/popup-image__container.css","../blocks/popup-image/__close-button/popup-image__close-button.css":"blocks/popup-image/__close-button/popup-image__close-button.css","../blocks/popup-image/__close-button/_inactive/popup-image__close-button-inactive.css":"blocks/popup-image/__close-button/_inactive/popup-image__close-button-inactive.css","../blocks/popup-image/__image/popup-image__image.css":"blocks/popup-image/__image/popup-image__image.css","../blocks/popup-image/__picture-set/popup-image__picture-set.css":"blocks/popup-image/__picture-set/popup-image__picture-set.css","../blocks/popup-image/__caption/popup-image__caption.css":"blocks/popup-image/__caption/popup-image__caption.css","../blocks/popup-image/_opened/popup-image_opened.css":"blocks/popup-image/_opened/popup-image_opened.css","../blocks/card/__like/_ative/like_active.css":"blocks/card/__like/_ative/like_active.css","../blocks/popup/_opened/popup_opened.css":"blocks/popup/_opened/popup_opened.css","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49376" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/pages.16a54860.js.map