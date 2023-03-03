/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._headers=e.headers}var r,n;return r=t,(n=[{key:"getProfileInfo",value:function(){return fetch("https://nomoreparties.co/v1/cohort-60/users/me",{headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"changeProfileInfo",value:function(t){return fetch("https://nomoreparties.co/v1/cohort-60/users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t.name,about:t.link}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))})}},{key:"pushCardToServer",value:function(t,e,r){return fetch("https://mesto.nomoreparties.co/v1/cohort-60/cards",{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:e,like:r})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"removeCardFromServer",value:function(t){return fetch("https://mesto.nomoreparties.co/v1/cohort-60/cards/".concat(t),{method:"DELETE",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"addLike",value:function(t){return fetch("https://mesto.nomoreparties.co/v1/cohort-60/cards/".concat(t,"/likes"),{method:"PUT",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"removeLike",value:function(t){return fetch("https://mesto.nomoreparties.co/v1/cohort-60/cards/".concat(t,"/likes"),{method:"DELETE",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"changeAvatar",value:function(t){return fetch("https://mesto.nomoreparties.co/v1/cohort-60/users/me/avatar",{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}},{key:"getInitialCards",value:function(){return fetch("https://mesto.nomoreparties.co/v1/cohort-60/cards",{headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){var e=[];return t.forEach((function(t){var r={name:t.name,link:t.link,id:t._id,likesArr:t.likes,likes:t.likes.length,owner:t.owner._id};e.push(r)})),console.log(e),e}))}}])&&e(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),t}();function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==n(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===n(i)?i:String(i)),o)}var i}var i=function(){function t(e,r,n,o,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._imageLink=e.link,this._likesNumber=e.likes,this._templateSelector=r,this._handleCardClick=n,this._trasherCallback=o,this._likeButtonCallback=i}var e,r;return e=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector("".concat(this._templateSelector)).content.querySelector(".card").cloneNode(!0)}},{key:"_clickLike",value:function(){this._likeButton.classList.toggle("like_active")}},{key:"_deleteCard",value:function(){this._cardElement.remove()}},{key:"_addLikeListener",value:function(){var t=this;this._likeButton=this._cardElement.querySelector(".card__like"),this._likesNumberElement=this._cardElement.querySelector(".card__like-number"),this._likeButton.addEventListener("click",(function(e){t._likeButtonCallback(e),e.target.classList.contains("like_active")?t._likesNumberElement.textContent=Number(t._likesNumberElement.textContent)-1:t._likesNumberElement.textContent=Number(t._likesNumberElement.textContent)+1,t._clickLike()}))}},{key:"_addTrashListener",value:function(){var t=this;this._trashButton=this._cardElement.querySelector(".card__trash-button"),this._trashButton.addEventListener("click",(function(e){t._trasherCallback(e)}))}},{key:"_showHowManyLikes",value:function(){this._likesNumberElement=this._cardElement.querySelector(".card__like-number"),this._likesNumber?this._likesNumberElement.textContent=this._likesNumber:this._likesNumberElement.textContent="0"}},{key:"_addOpenImagePopupListener",value:function(){var t=this;this._cardImage.addEventListener("click",(function(){t._handleCardClick(t._name,t._imageLink)}))}},{key:"generateCard",value:function(){return this._cardElement=this._getTemplate(),this._cardTitle=this._cardElement.querySelector(".card__name"),this._cardImage=this._cardElement.querySelector(".card__image"),this._addLikeListener(),this._addTrashListener(),this._showHowManyLikes(),this._addOpenImagePopupListener(),this._cardTitle.textContent=this._name,this._cardImage.alt=this._name,this._cardImage.src=this._imageLink,this._cardElement}}])&&o(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function c(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===u(o)?o:String(o)),n)}var o}var a=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._settings=e,this._formElement=r,this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._formButton=this._formElement.querySelector(this._settings.submitButtonSelector)}var e,r;return e=t,(r=[{key:"_showInputError",value:function(t,e){var r=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.add(this._settings.inputErrorClass),r.textContent=e,r.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._settings.inputErrorClass),e.textContent="",e.classList.remove(this._settings.errorClass)}},{key:"disableSubmitButton",value:function(){this._formButton.classList.add(this._settings.inactiveButtonClass),this._formButton.setAttribute("disabled",!0)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?this.disableSubmitButton():(this._formButton.classList.remove(this._settings.inactiveButtonClass),this._formButton.removeAttribute("disabled",!0))}},{key:"_isValid",value:function(t){t.validity.valid?this._hideInputError(t,this._settings):this._showInputError(t,t.validationMessage,this._settings)}},{key:"_setEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._isValid(e),t._toggleButtonState(t._inputList,t._buttonElement)}))}))}},{key:"enableValidation",value:function(){this._setEventListeners(this._formElement)}}])&&c(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===s(o)?o:String(o)),n)}var o}var f=function(){function t(e,r){var n=e.items,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._data=n,this.renderer=o,this._containerNode=document.querySelector(r)}var e,r;return e=t,(r=[{key:"addItem",value:function(t){this._containerNode.append(t)}},{key:"addItemReverse",value:function(t){this._containerNode.prepend(t)}},{key:"renderItems",value:function(){var t=this;this._data.forEach((function(e){t.renderer(e)}))}}])&&l(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function y(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==p(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==p(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===p(o)?o:String(o)),n)}var o}var h=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._closeButton=this._popup.querySelector(".popup__close-button"),this._handleEscCloseBound=this._handleEscClose.bind(this)}var e,r;return e=t,(r=[{key:"_handleEscClose",value:function(t){"Escape"==t.key&&this.close()}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscCloseBound)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscCloseBound)}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&t.close()})),this._closeButton.addEventListener("click",(function(){t.close()}))}}])&&y(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function v(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==m(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==m(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===m(o)?o:String(o)),n)}var o}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=_(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},d.apply(this,arguments)}function b(t,e){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},b(t,e)}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&b(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=_(n);if(o){var r=_(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._popupPicture=e._popup.querySelector(".popup-image__image"),e._popupCaption=e._popup.querySelector(".popup-image__caption"),e}return e=u,(r=[{key:"open",value:function(t,e){this._popupPicture.src=e,this._popupPicture.alt=t,this._popupCaption.textContent=t,d(_(u.prototype),"open",this).call(this)}},{key:"close",value:function(){d(_(u.prototype),"close",this).call(this),this._popupPicture.src=""}}])&&v(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function w(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==k(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==k(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===k(o)?o:String(o)),n)}var o}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=j(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},S.apply(this,arguments)}function E(t,e){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},E(t,e)}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}var L=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&E(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(n);if(o){var r=j(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===k(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e,r=t.popupSelector,n=t.submitCallBack;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,r))._submitCallBack=n,e._popupForm=e._popup.querySelector(".popup__form"),e._inputList=Array.from(e._popupForm.querySelectorAll(".popup__input")),e._cardName=e._popupForm.querySelector(".popup__input_type_name"),e._cardLink=e._popupForm.querySelector(".popup__input_type_description"),e._closeButton=e._popup.querySelector(".popup__close-button"),e}return e=u,(r=[{key:"close",value:function(){S(j(u.prototype),"close",this).call(this),this._popupForm.reset(),this._popupForm.removeEventListener("submit",this._submitCallBack)}},{key:"_getInputValues",value:function(){var t=this;return this._formValues={},this._inputList.forEach((function(e){t._formValues[e.name]=e.value,console.log(t._formValues)})),this._formValues}},{key:"setInputValue",value:function(t,e){this._cardName.value=t.textContent,this._cardLink.value=e.textContent}},{key:"setEventListeners",value:function(){var t=this;S(j(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(e){e.preventDefault(),t._submitCallBack(t._getInputValues()),t.close()}))}}])&&w(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function O(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==P(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==P(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===P(o)?o:String(o)),n)}var o}function C(){return C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=T(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},C.apply(this,arguments)}function x(t,e){return x=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},x(t,e)}function T(t){return T=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},T(t)}var B=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&x(t,e)}(u,t);var e,r,n,o,i=(n=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=T(n);if(o){var r=T(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===P(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e,r){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._buttonClickCallback=e,n._button=n._popup.querySelector(".popup-delete__submit"),n._card=r,n}return e=u,(r=[{key:"open",value:function(t,e){this._id=t,this._card=e,C(T(u.prototype),"open",this).call(this)}},{key:"removeCard",value:function(t){t.remove()}},{key:"setEventListeners",value:function(){var t=this;C(T(u.prototype),"setEventListeners",this).call(this),this._button.addEventListener("click",(function(){t._buttonClickCallback(t._id),t.removeCard(t._card),t.close()}))}}])&&O(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function I(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==q(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==q(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===q(o)?o:String(o)),n)}var o}var N=function(){function t(e){var r=e.userNameSelector,n=e.userDescriptionSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userNameElement=document.querySelector(r),this._userDescriptionElement=document.querySelector(n)}var e,r;return e=t,(r=[{key:"getUserInfo",value:function(){return{userName:this._userNameElement.textContent,userDescription:this._userDescriptionElement.textContent}}},{key:"setUserInfo",value:function(t){this._userNameElement.textContent=t.name,this._userDescriptionElement.textContent=t.link}}])&&I(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function R(t){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},R(t)}function A(){A=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",u=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function a(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(t){a=function(t,e,r){return t[e]=r}}function s(t,e,r,o){var i=e&&e.prototype instanceof p?e:p,u=Object.create(i.prototype),c=new j(o||[]);return n(u,"_invoke",{value:k(t,r,c)}),u}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function p(){}function y(){}function h(){}var m={};a(m,i,(function(){return this}));var v=Object.getPrototypeOf,d=v&&v(v(L([])));d&&d!==e&&r.call(d,i)&&(m=d);var b=h.prototype=p.prototype=Object.create(m);function _(t){["next","throw","return"].forEach((function(e){a(t,e,(function(t){return this._invoke(e,t)}))}))}function g(t,e){function o(n,i,u,c){var a=l(t[n],t,i);if("throw"!==a.type){var s=a.arg,f=s.value;return f&&"object"==R(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,u,c)}),(function(t){o("throw",t,u,c)})):e.resolve(f).then((function(t){s.value=t,u(s)}),(function(t){return o("throw",t,u,c)}))}c(a.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function k(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var u=r.delegate;if(u){var c=w(u,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var a=l(t,e,r);if("normal"===a.type){if(n=r.done?"completed":"suspendedYield",a.arg===f)continue;return{value:a.arg,done:r.done}}"throw"===a.type&&(n="completed",r.method="throw",r.arg=a.arg)}}}function w(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function L(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:P}}function P(){return{value:void 0,done:!0}}return y.prototype=h,n(b,"constructor",{value:h,configurable:!0}),n(h,"constructor",{value:y,configurable:!0}),y.displayName=a(h,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,a(t,c,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},_(g.prototype),a(g.prototype,u,(function(){return this})),t.AsyncIterator=g,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var u=new g(s(e,r,n,o),i);return t.isGeneratorFunction(r)?u:u.next().then((function(t){return t.done?t.value:u.next()}))},_(b),a(b,c,"Generator"),a(b,i,(function(){return this})),a(b,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=L,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return u.type="throw",u.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],u=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),a=r.call(i,"finallyLoc");if(c&&a){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!a)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var u=i?i.completion:{};return u.type=t,u.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(u)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:L(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function D(t,e,r,n,o,i,u){try{var c=t[i](u),a=c.value}catch(t){return void r(t)}c.done?e(a):Promise.resolve(a).then(n,o)}var F={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"profile-name-error_active"},V=document.querySelector(".profile__edit-button"),G=document.querySelector("#popup-profile"),U=document.querySelector(".profile__name"),H=document.querySelector(".profile__description"),M=G.querySelector(".popup__input_type_name"),J=G.querySelector(".popup__input_type_description"),Y=document.querySelector("#popup-new-card"),z=document.querySelector(".profile__add-button"),K=document.querySelector(".profile__avatar-edit"),Q=document.querySelector(".profile__avatar"),W=new r({headers:{authorization:"a85e5fd1-766e-427c-ac2c-de92362af89e","Content-type":"application/json"}});function X(){var t;return t=A().mark((function t(){var e,r,n;return A().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,W.getInitialCards();case 3:return e=t.sent,t.next=6,W.getProfileInfo();case 6:r=t.sent,n=r._id,e.forEach((function(t){var e=$(t),r=e.querySelector(".card__trash-button"),o=e.querySelector(".card__like");t.owner!==n&&r.remove(),t.likesArr.forEach((function(t){t._id===n&&o.classList.add("like_active")})),tt.addItem(e)})),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error(error);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})),X=function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function u(t){D(i,n,o,u,c,"next",t)}function c(t){D(i,n,o,u,c,"throw",t)}u(void 0)}))},X.apply(this,arguments)}W.getProfileInfo().then((function(t){console.log(t),U.textContent=t.name,H.textContent=t.about,Q.src=t.avatar})).catch((function(t){return console.log(t)}));var Z=function(t,e){it.open(t,e)};function $(t){return new i(t,".template",Z,(function(e){!function(t,e){var r=e.target.closest(".card");et.open(t,r)}(t.id,e)}),(function(e){!function(t,e){t.target.classList.contains("like_active")?(console.log("delete like"),W.removeLike(e)):(console.log("add like"),W.addLike(e))}(e,t.id)})).generateCard()}var tt=new f({items:[],renderer:function(t){tt.addItem(t)}},".cards__list"),et=new B("#popup-delete",(function(t){W.removeCardFromServer(t)})),rt=new L({popupSelector:"#popup-edit-avatar",submitCallBack:function(t){W.changeAvatar(t.link),Q.src=t.link}}),nt=new L({popupSelector:"#popup-new-card",submitCallBack:function(t){W.pushCardToServer(t.name,t.link,t.likes).then((function(e){var r=$(t);tt.addItemReverse(r),window.location.reload()})).catch((function(t){return console.log(t)}))}}),ot=new L({popupSelector:"#popup-profile",submitCallBack:function(t){W.changeProfileInfo(t).then((function(e){ut.setUserInfo(t)})).catch((function(t){return console.log(t)}))}}),it=new g(".popup-image"),ut=new N({userNameSelector:".profile__name",userDescriptionSelector:".profile__description"}),ct=new a(F,Y);V.addEventListener("click",(function(){var t=ut.getUserInfo();M.value=t.userName,J.value=t.userDescription,ot.open()})),z.addEventListener("click",(function(){ct.disableSubmitButton(),nt.open()})),K.addEventListener("click",(function(){ct.disableSubmitButton(),rt.open()}));var at=new Map;Array.from(document.querySelectorAll(".popup__form")).forEach((function(t){var e=new a(F,t);at.set(t.name,e),e.enableValidation()})),it.setEventListeners(),nt.setEventListeners(),ot.setEventListeners(),et.setEventListeners(),rt.setEventListeners(),function(){X.apply(this,arguments)}()})();