(()=>{"use strict";function e(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function t(e){("Escape"===e.key||e.target.classList.contains("popup_opened"))&&r(document.querySelector(".popup_opened"))}function n(e){e.target.classList.contains("popup_opened")&&r(document.querySelector(".popup_opened"))}function o(e){e.classList.add("popup_opened"),document.addEventListener("keydown",t),e.addEventListener("mousedown",n)}function r(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",t),e.removeEventListener("mousedown",n)}var c="https://nomoreparties.co/v1/",a="450ae940-2b7e-4477-a632-282343b7d2dc",u="plus-cohort-16";function i(e){return e.ok?e.json():Promise.reject("Ошибка: ${res.status}")}var l=document.querySelector("#element").content.querySelector(".elements__element"),s=popupImage.querySelector(".popup__image"),d=popupImage.querySelector(".popup__title"),p="";function f(e){(function(e){var t=e.target.dataset.id;return fetch(c+u+"/cards/"+t,{method:"DELETE",headers:{authorization:"".concat(a)}}).then((function(e){return i(e)}))})(e).then((function(t){e.target.closest(".elements__element").remove(),console.log(t)})).catch((function(e){console.log(e)}))}function m(e){(function(e){var t,n=e.target.dataset.imageid,o=c+u+"/cards/likes/"+n;return t=e.target.classList.contains("elements__like_active")?"DELETE":"PUT",fetch(o,{method:"".concat(t),headers:{authorization:"".concat(a)}}).then((function(e){return i(e)}))})(e).then((function(t){e.target.dataset.count=t.likes.length,e.target.classList.toggle("elements__like_active"),console.log(t)})).catch((function(e){console.log(e)}))}function v(e,t,n,r,c){var a=l.cloneNode(!0),u=a.querySelector(".elements__photo"),i=a.querySelector(".elements__like");u.src=e,u.alt="Фото "+t,a.querySelector(".elements__title").textContent=t,i.dataset.count=n,i.dataset.imageid=c,i.addEventListener("click",m);var p=a.querySelector(".elements__thrash");return r?(p.dataset.id=r,p.addEventListener("click",f)):p.remove(),u.addEventListener("click",(function(n){s.src=e,d.textContent=t,s.alt="Фото "+t,o(popupImage)})),a}var _,h=document.querySelector("#profile"),y=h.querySelector("#profile-name"),S=h.querySelector("#profile-about"),g=document.querySelector(".profile__title"),q=document.querySelector(".profile__subtitle"),E=document.querySelector("#newItem"),L=E.querySelector("#newItem-about"),b=E.querySelector("#newItem-name"),C=document.querySelector("#popupImage"),k=document.querySelector("#changeAvatar");fetch("https://nomoreparties.co/v1/plus-cohort-16/users/me",{method:"GET",headers:{authorization:"".concat(a)}}).then((function(e){return i(e)})).then((function(e){var t=document.querySelector(".profile__title"),n=document.querySelector(".profile__subtitle"),o=document.querySelector(".profile__avatar");t.textContent=e.name,n.textContent=e.about,o.src=e.avatar,p=e._id})).catch((function(e){console.log(e)})),fetch("https://nomoreparties.co/v1/plus-cohort-16/cards",{method:"GET",headers:{authorization:"".concat(a)}}).then((function(e){return i(e)})).then((function(e){var t=document.querySelector(".elements");console.log(e);var n="";e.forEach((function(e){n=e.owner._id===p?e._id:"";var o=v(e.link,e.name,e.likes.length,n,e._id);e.likes.some((function(e){return e._id===p}))&&o.querySelector(".elements__like").classList.toggle("elements__like_active"),t.append(o)}))})).catch((function(e){console.log(e)})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){y.value=g.textContent,S.value=q.textContent,o(h)})),h.querySelector(".popup__close-button").addEventListener("click",(function(){r(h)})),h.querySelector("#form-profile").addEventListener("submit",(function(e){e.preventDefault();var t,n,o=e.target.querySelector(".popup__button");o.textContent="Сохранение...",(t=y.value,n=S.value,fetch("https://nomoreparties.co/v1/plus-cohort-16/users/me",{method:"PATCH",headers:{authorization:"".concat(a),"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(t),about:"".concat(n)})}).then((function(e){return i(e)}))).then((function(e){g.textContent=y.value,q.textContent=S.value,console.log(e),r(h)})).catch((function(e){console.log(e)})).finally((function(){o.textContent=o.dataset.text}))})),document.querySelector(".profile__add-button").addEventListener("click",(function(){o(E)})),E.querySelector(".popup__close-button").addEventListener("click",(function(){r(E)})),document.querySelector(".profile__image-block").addEventListener("click",(function(){o(k)})),k.querySelector(".popup__close-button").addEventListener("click",(function(){r(k)})),k.querySelector("#form-changeAvatar").addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...";var n=k.querySelector("#changeAvatar-about").value;(function(e){return fetch("https://nomoreparties.co/v1/plus-cohort-16/users/me/avatar",{method:"PATCH",headers:{authorization:"".concat(a),"Content-Type":"application/json"},body:JSON.stringify({avatar:"".concat(e)})}).then((function(e){return i(e)}))})(n).then((function(t){document.querySelector(".profile__avatar").src=n,console.log(t),r(k),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){t.textContent=t.dataset.text}))})),E.querySelector("#form-newItem").addEventListener("submit",(function(e){e.preventDefault();var t,n,o=e.target.querySelector(".popup__button");o.textContent="Сохранение...",(t=L.value,n=b.value,fetch("https://nomoreparties.co/v1/plus-cohort-16/cards",{method:"POST",headers:{authorization:"".concat(a),"Content-Type":"application/json"},body:JSON.stringify({name:"".concat(n),link:"".concat(t)})}).then((function(e){return i(e)}))).then((function(t){var n=t._id,o=document.querySelector(".elements"),c=v(t.link,t.name,"0",n,n);o.prepend(c),console.log(t),r(E),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){o.textContent=o.dataset.text}))})),C.querySelector(".popup__close-button").addEventListener("click",(function(){r(C)})),_={formSelector:".form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(_.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(t,n){var o=Array.from(t.querySelectorAll(n.inputSelector)),r=t.querySelector(n.submitButtonSelector);e(o,r,n),t.addEventListener("reset",(function(){setTimeout((function(){e(o,r,n)}),0)})),o.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(t,c,n),e(o,r,n)}))}))}(t,_)}))})();