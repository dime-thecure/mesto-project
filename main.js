(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var n=function(){function n(e,r){var o=e.inputSelector,i=e.submitButtonSelector,a=e.inactiveButtonClass,u=e.inputErrorClass,s=e.errorClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t(this,"_formSelector",void 0),t(this,"_inputSelector",void 0),t(this,"_submitButtonSelector",void 0),t(this,"_inactiveButtonClass",void 0),t(this,"_inputErrorClass",void 0),t(this,"_errorClass",void 0),this._formSelector=r,this._inputSelector=o,this._submitButtonSelector=i,this._inactiveButtonClass=a,this._inputErrorClass=u,this._errorClass=s}var r,o;return r=n,(o=[{key:"_showInputError",value:function(e,t){var n=this._formSelector.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formSelector.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(e,t){this._hasInvalidInput(e)?(t.classList.add(this._inactiveButtonClass),t.disabled=!0):(t.classList.remove(this._inactiveButtonClass),t.disabled=!1)}},{key:"_isValid",value:function(e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_setEventListeners",value:function(){var e=this,t=Array.from(this._formSelector.querySelectorAll(this._inputSelector)),n=this._formSelector.querySelector(this._submitButtonSelector);this._toggleButtonState(t,n),this._formSelector.addEventListener("reset",(function(){setTimeout((function(){e._toggleButtonState(t,n)}),0)})),t.forEach((function(r){r.addEventListener("input",(function(){e._isValid(r),e._toggleButtonState(t,n)}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&e(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),n}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._link=t.link,this._title=t.name,this._likes=t.likes.length,this._isMyCard=t.owner._id===t.myId,this._hasMyLike=t.likes.some((function(e){return e._id===t.myId})),this._id=t._id,this._selector=n}var t,n;return t=e,(n=[{key:"_getElement",value:function(){return document.querySelector("#element").content.querySelector(this._selector).cloneNode(!0)}},{key:"generate",value:function(){this._element=this._getElement(),this._element.querySelector(".elements__title").textContent=this._title,this._element.querySelector(".elements__photo").src=this._link,this._element.querySelector(".elements__photo").alt=this._title,this._element.querySelector(".elements__like").dataset.count=this._likes;var e=this._element.querySelector(".elements__like");return this._hasMyLike&&e.classList.add("elements__like_active"),this._addEventListeners(),this._element}},{key:"_addEventListeners",value:function(){var e=this,t=this._element.querySelector(".elements__thrash");this._isMyCard?(t.dataset.id=this._isMyCard,this._element.querySelector(".elements__thrash").addEventListener("click",(function(){return t=e._id,n=e._element,void K.deleteCardFromServer(t).then((function(e){n.remove()})).catch((function(e){console.log(e)}));var t,n}))):t.remove(),this._element.querySelector(".elements__photo").addEventListener("click",(function(){Q.open(e._link,e._title)})),this._element.querySelector(".elements__like").addEventListener("click",(function(t){e._hasMyLike?K.setLikeToServer(e._id,e._hasMyLike).then((function(n){t.target.classList.remove("elements__like_active"),t.target.dataset.count=n.likes.length,e._hasMyLike=!1})):K.setLikeToServer(e._id,e._hasMyLike).then((function(n){t.target.classList.add("elements__like_active"),t.target.dataset.count=n.likes.length,e._hasMyLike=!0}))}))}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),i={formSelector:".form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__input-error_active"};function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u(this,"_baseURL",void 0),u(this,"_group",void 0),u(this,"_token",void 0),u(this,"_userURL",void 0),this._baseURL=t,this._group=n,this._token=r}var t,n;return t=e,(n=[{key:"_getResponseData",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: `${res.status}`")}},{key:"getUserInfoFromServer",value:function(){var e=this,t=this._baseURL+this._group+"/users/me";return fetch(t,{method:"GET",headers:{authorization:"".concat(this._token)}}).then((function(t){return e._getResponseData(t)}))}},{key:"getInitialCardsFromServer",value:function(){var e=this,t=this._baseURL+this._group+"/cards";return fetch(t,{method:"GET",headers:{authorization:"".concat(this._token)}}).then((function(t){return e._getResponseData(t)}))}},{key:"setUserInfoToServer",value:function(e,t){var n=this,r=this._baseURL+this._group+"/users/me";return fetch(r,{method:"PATCH",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(e),about:"".concat(t)})}).then((function(e){return n._getResponseData(e)}))}},{key:"addNewCardToServer",value:function(e,t){var n=this,r=this._baseURL+this._group+"/cards";return fetch(r,{method:"POST",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(t),link:"".concat(e)})}).then((function(e){return n._getResponseData(e)}))}},{key:"deleteCardFromServer",value:function(e){var t=this,n=this._baseURL+this._group+"/cards/"+e;return fetch(n,{method:"DELETE",headers:{authorization:"".concat(this._token)}}).then((function(e){return t._getResponseData(e)}))}},{key:"changeAvatarToServer",value:function(e){var t=this,n=this._baseURL+this._group+"/users/me/avatar";return fetch(n,{method:"PATCH",headers:{authorization:"".concat(this._token),"Content-Type":"application/json"},body:JSON.stringify({avatar:"".concat(e)})}).then((function(e){return t._getResponseData(e)}))}},{key:"setLikeToServer",value:function(e,t){var n=this,r=this._baseURL+this._group+"/cards/likes/"+e;return fetch(r,{method:"".concat(t?"DELETE":"PUT"),headers:{authorization:"".concat(this._token)}}).then((function(e){return n._getResponseData(e)}))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=new(function(){function e(t){var n=t.selectorName,r=t.selectorAbout,o=t.selectorAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"_name",void 0),l(this,"_about",void 0),l(this,"_avatar",void 0),this._name=document.querySelector("".concat(n)),this._about=document.querySelector("".concat(r)),this._avatar=document.querySelector("".concat(o))}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,about:this._about.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about;this._name.textContent=t,this._about.textContent=n}},{key:"setUserAvatar",value:function(e){var t=e.avatar;this._avatar.src=t}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({selectorName:".profile__title",selectorAbout:".profile__subtitle",selectorAvatar:".profile__avatar"});function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),h(this,"_popupInstance",void 0),h(this,"_closeButton",void 0),this._popupInstance=document.querySelector(t),this._closeButton=this._popupInstance.querySelector(".popup__close-button")}var t,n;return t=e,(n=[{key:"setEventListeners",value:function(){var e=this;this._closeButton.addEventListener("click",(function(){e.close()}))}},{key:"_getElement",value:function(){return this._popupInstance}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlay",value:function(e){e.target.classList.contains("popup_opened")&&this.close()}},{key:"open",value:function(){this._popupInstance.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose.bind(this)),this._popupInstance.addEventListener("mousedown",this._handleOverlay.bind(this))}},{key:"close",value:function(){this._popupInstance.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose.bind(this)),this._popupInstance.removeEventListener("mousedown",this._handleOverlay.bind(this))}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,t){return y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},y(e,t)}function b(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return m(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=S(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},g.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&y(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function a(e){var t,n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),w(m(n=i.call(this,e)),"_instance",void 0),w(m(n),"_popupImagePicture",void 0),w(m(n),"_popupImageTitle",void 0),n._instance=g((t=m(n),k(a.prototype)),"_getElement",t).call(t),n._popupImagePicture=n._instance.querySelector(".popup__image"),n._popupImageTitle=n._instance.querySelector(".popup__title"),n}return t=a,(n=[{key:"open",value:function(e,t){this._popupImagePicture.src=e,this._popupImageTitle.textContent=t,this._popupImagePicture.alt="Фото "+t,g(k(a.prototype),"open",this).call(this)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(_);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function C(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return L(e)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(){return I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=q(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},I.apply(this,arguments)}function q(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=R(e)););return e}function R(e){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},R(e)}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=R(r);if(o){var n=R(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function a(e){var t,n,r=e.selector,o=e.handlePopupSubmitButton;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),T(L(n=i.call(this,r)),"_instance",void 0),T(L(n),"_handlePopupSubmitButton",void 0),n._instance=I((t=L(n),R(a.prototype)),"_getElement",t).call(t),n._handlePopupSubmitButton=o,n}return t=a,(n=[{key:"setEventListeners",value:function(){this._instance.addEventListener("submit",this._handlePopupSubmitButton),I(R(a.prototype),"setEventListeners",this).call(this)}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(_);function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.map((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){M(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function M(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var N=document.querySelector("#profile"),z=N.querySelector("#profile-name"),F=N.querySelector("#profile-about"),V=document.querySelector("#newItem"),J=V.querySelector("#newItem-about"),G=V.querySelector("#newItem-name"),H=document.querySelector("#changeAvatar"),$="",K=new s("https://nomoreparties.co/v1/","plus-cohort-16","450ae940-2b7e-4477-a632-282343b7d2dc"),Q=new O("#popupImage");Q.setEventListeners();var W=new B({selector:"#newItem",handlePopupSubmitButton:function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...",K.addNewCardToServer(J.value,G.value).then((function(e){var t=new x({items:[e],renderer:function(e){var n=new o(A(A({},e),{},{myId:$}),".elements__element").generate();t.addItem(n)}},".elements");t.renderItems()})).catch((function(e){console.log(e)})).finally((function(){e.target.reset(),t.textContent=t.dataset.text,W.close()}))}});W.setEventListeners();var X=new B({selector:"#profile",handlePopupSubmitButton:function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...",K.setUserInfoToServer(z.value,F.value).then((function(e){f.setUserInfo(e),X.close()})).catch((function(e){console.log(e)})).finally((function(){t.textContent=t.dataset.text}))}});X.setEventListeners();var Y=new B({selector:"#changeAvatar",handlePopupSubmitButton:function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...";var n=H.querySelector("#changeAvatar-about").value;K.changeAvatarToServer(n).then((function(t){f.setUserAvatar({avatar:n}),Y.close(),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){t.textContent=t.dataset.text}))}});Y.setEventListeners(),K.getUserInfoFromServer().then((function(e){f.setUserInfo(e),f.setUserAvatar(e),$=e._id})).catch((function(e){console.log(e)})),K.getInitialCardsFromServer().then((function(e){var t=e.reverse(),n=new x({items:t,renderer:function(e){var t=new o(A(A({},e),{},{myId:$}),".elements__element").generate();n.addItem(t)}},".elements");n.renderItems()})).catch((function(e){console.log(e)})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){var e=f.getUserInfo(),t=e.name,n=e.about;z.value=t,F.value=n,X.open()})),document.querySelector(".profile__add-button").addEventListener("click",(function(){W.open()})),document.querySelector(".profile__image-block").addEventListener("click",(function(){Y.open()})),Array.from(document.querySelectorAll(".form")).forEach((function(e){new n(i,e).enableValidation()}))})();