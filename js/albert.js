(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
/*! formbouncerjs v1.4.6 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/bouncer */
"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||(function(e){"use strict";if("Element"in e){var t="classList",r="prototype",n=e.Element[r],a=Object,i=String[r].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[r].indexOf||function(e){for(var t=0,r=this.length;t<r;t++)if(t in this&&this[t]===e)return t;return-1},l=function(e,t){this.name=e,this.code=DOMException[e],this.message=t},u=function(e,t){if(""===t)throw new l("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(t))throw new l("INVALID_CHARACTER_ERR","String contains an invalid character");return o.call(e,t)},s=function(e){for(var t=i.call(e.getAttribute("class")||""),r=t?t.split(/\s+/):[],n=0,a=r.length;n<a;n++)this.push(r[n]);this._updateClassName=function(){e.setAttribute("class",this.toString())}},c=s[r]=[],f=function(){return new s(this)};if(l[r]=Error[r],c.item=function(e){return this[e]||null},c.contains=function(e){return-1!==u(this,e+="")},c.add=function(){for(var e,t=arguments,r=0,n=t.length,a=!1;e=t[r]+"",-1===u(this,e)&&(this.push(e),a=!0),++r<n;);a&&this._updateClassName()},c.remove=function(){var e,t,r=arguments,n=0,a=r.length,i=!1;do{for(e=r[n]+"",t=u(this,e);-1!==t;)this.splice(t,1),i=!0,t=u(this,e)}while(++n<a);i&&this._updateClassName()},c.toggle=function(e,t){e+="";var r=this.contains(e),n=r?!0!==t&&"remove":!1!==t&&"add";return n&&this[n](e),!0===t||!1===t?t:!r},c.toString=function(){return this.join(" ")},a.defineProperty){var d={get:f,enumerable:!0,configurable:!0};try{a.defineProperty(n,t,d)}catch(e){void 0!==e.number&&-2146823252!==e.number||(d.enumerable=!1,a.defineProperty(n,t,d))}}else a[r].__defineGetter__&&n.__defineGetter__(t,f)}})(self),(function(){"use strict";var e=document.createElement("_");if(e.classList.add("c1","c2"),!e.classList.contains("c2")){var t=function(e){var n=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(e){var t,r=arguments.length;for(t=0;t<r;t++)e=arguments[t],n.call(this,e)}};t("add"),t("remove")}if(e.classList.toggle("c3",!1),e.classList.contains("c3")){var r=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(e,t){return 1 in arguments&&!this.contains(e)==!t?t:r.call(this,e)}}e=null})()),Element.prototype.closest||(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest=function(e){var t=this;if(!document.documentElement.contains(this))return null;do{if(t.matches(e))return t;t=t.parentElement}while(null!==t);return null}),(function(){if("function"==typeof window.CustomEvent)return;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var r=document.createEvent("CustomEvent");return r.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),r}e.prototype=window.Event.prototype,window.CustomEvent=e})(),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.Bouncer=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(a){"use strict";var u={fieldClass:"error",errorClass:"error-message",fieldPrefix:"bouncer-field_",errorPrefix:"bouncer-error_",patterns:{email:/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,url:/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/,number:/^(?:[-+]?[0-9]*[.,]?[0-9]+)$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,time:/^(?:(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]))$/,month:/^(?:(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])))$/},customValidations:{},messageAfterField:!0,messageCustom:"data-bouncer-message",messageTarget:"data-bouncer-target",messages:{missingValue:{checkbox:"This field is required.",radio:"Please select a value.",select:"Please select a value.","select-multiple":"Please select at least one value.",default:"Please fill out this field."},patternMismatch:{email:"Please enter a valid email address.",url:"Please enter a URL.",number:"Please enter a number",color:"Please match the following format: #rrggbb",date:"Please use the YYYY-MM-DD format",time:"Please use the 24-hour time format. Ex. 23:00",month:"Please use the YYYY-MM format",default:"Please match the requested format."},outOfRange:{over:"Please select a value that is no more than {max}.",under:"Please select a value that is no less than {min}."},wrongLength:{over:"Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.",under:"Please lengthen this text to {minLength} characters or more. You are currently using {length} characters."},fallback:"There was an error with this field."},disableSubmit:!1,emitEvents:!0},s=function(e,t){Array.prototype.forEach.call(e,t)},c=function(){var r={};return s(arguments,(function(e){for(var t in e){if(!e.hasOwnProperty(t))return;"[object Object]"===Object.prototype.toString.call(e[t])?r[t]=c(r[t],e[t]):r[t]=e[t]}})),r},f=function(e,t,r){if("function"==typeof a.CustomEvent){var n=new CustomEvent(t,{bubbles:!0,detail:r||{}});e.dispatchEvent(n)}},d=function(e,t){return{missingValue:(function(e){if(!e.hasAttribute("required"))return!1;if("checkbox"===e.type)return!e.checked;var t=e.value.length;return"radio"===e.type&&(t=Array.prototype.filter.call(e.form.querySelectorAll('[name="'+m(e.name)+'"]'),(function(e){return e.checked})).length),t<1})(e),patternMismatch:(r=e,n=t,a=r.getAttribute("pattern"),!(!(a=a?new RegExp("^(?:"+a+")$"):n.patterns[r.type])||!r.value||r.value.length<1||r.value.match(a))),outOfRange:(function(e){if(!e.value||e.value.length<1)return!1;var t=e.getAttribute("max"),r=e.getAttribute("min"),n=parseFloat(e.value);return t&&t<n?"over":!!(r&&n<r)&&"under"})(e),wrongLength:(function(e){if(!e.value||e.value.length<1)return!1;var t=e.getAttribute("maxlength"),r=e.getAttribute("minlength"),n=e.value.length;return t&&t<n?"over":!!(r&&n<r)&&"under"})(e)};var r,n,a},m=function(e){for(var t,r=String(e),n=r.length,a=-1,i="",o=r.charCodeAt(0);++a<n;){if(0===(t=r.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===o?i+="\\"+t.toString(16)+" ":i+=128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?r.charAt(a):"\\"+r.charAt(a)}return i},h=function(e,t,r){var n=e.name?e.name:e.id;return!n&&r&&(n=t.fieldPrefix+Math.floor(999*Math.random()),e.id=n),"checkbox"===e.type&&(n+="_"+(e.value||e.id)),n},x=function(e,t){var r=document.createElement("div");r.className=t.errorClass,r.id=t.errorPrefix+h(e,t,!0);var n=(function(e,t,r){var n=e.getAttribute(r.messageTarget);if(n){var a=e.form.querySelector(n);if(a)return a.firstChild||a.appendChild(document.createTextNode(""))}return r.messageAfterField?(t.nextSibling||t.parentNode.appendChild(document.createTextNode("")),t.nextSibling):t})(e,(function(e){if("radio"===e.type&&e.name){var t=e.form.querySelectorAll('[name="'+m(e.name)+'"]');e=t[t.length-1]}"radio"!==e.type&&"checkbox"!==e.type||(e=e.closest("label")||e.form.querySelector('[for="'+e.id+'"]')||e);return e})(e),t);return n.parentNode.insertBefore(r,n),r},v=function(e,t,r){e.classList.add(r.fieldClass),e.setAttribute("aria-describedby",t.id),e.setAttribute("aria-invalid",!0)},g=function(e,t,r){var n,a,i,o=e.form.querySelector("#"+m(r.errorPrefix+h(e,r)))||x(e,r),l=(function(e,t,r){var n=r.messages;if(t.missingValue)return n.missingValue[e.type]||n.missingValue.default;if(t.outOfRange)return n.outOfRange[t.outOfRange].replace("{max}",e.getAttribute("max")).replace("{min}",e.getAttribute("min")).replace("{length}",e.value.length);if(t.wrongLength)return n.wrongLength[t.wrongLength].replace("{maxLength}",e.getAttribute("maxlength")).replace("{minLength}",e.getAttribute("minlength")).replace("{length}",e.value.length);if(t.patternMismatch){var a=e.getAttribute(r.messageCustom);return a||n.patternMismatch[e.type]||n.patternMismatch.default}for(var i in r.customValidations)if(r.customValidations.hasOwnProperty(i)&&t[i]&&n[i])return n[i];return n.fallback})(e,t,r);o.textContent="function"==typeof l?l(e,r):l,a=o,i=r,"radio"===(n=e).type&&n.name&&Array.prototype.forEach.call(document.querySelectorAll('[name="'+n.name+'"]'),(function(e){v(e,a,i)})),v(n,a,i),r.emitEvents&&f(e,"bouncerShowError",{errors:t})},i=function(e,t){e.classList.remove(t.fieldClass),e.removeAttribute("aria-describedby"),e.removeAttribute("aria-invalid")},p=function(e,t){var r,n,a=e.form.querySelector("#"+m(t.errorPrefix+h(e,t)));a&&(a.parentNode.removeChild(a),n=t,"radio"===(r=e).type&&r.name?Array.prototype.forEach.call(document.querySelectorAll('[name="'+r.name+'"]'),(function(e){i(e,n)})):i(r,n),t.emitEvents&&f(e,"bouncerRemoveError"))};return function(n,e){var l,r={};r.validate=function(e,t){if(!e.disabled&&!e.readOnly&&"reset"!==e.type&&"submit"!==e.type&&"button"!==e.type){var r,n,a,i=c(l,t||{}),o=(a=d(r=e,n=i),{valid:!(function(e){for(var t in e)if(e[t])return!0;return!1})(a=(function(e,t,r,n){for(var a in r)r.hasOwnProperty(a)&&(t[a]=r[a](e,n));return t})(r,a,n.customValidations,n)),errors:a});if(!o.valid)return g(e,o.errors,i),o;p(e,i)}},r.validateAll=function(e){return Array.prototype.filter.call(e.querySelectorAll("input, select, textarea"),(function(e){var t=r.validate(e);return t&&!t.valid}))};var a=function(e){e.target.form&&e.target.form.matches(n)&&r.validate(e.target)},i=function(e){e.target.form&&e.target.form.matches(n)&&e.target.classList.contains(l.fieldClass)&&r.validate(e.target)},o=function(e){if(e.target.matches(n)){e.preventDefault();var t=r.validateAll(e.target);if(0<t.length)return t[0].focus(),void f(e.target,"bouncerFormInvalid",{errors:t});l.disableSubmit||e.target.submit(),l.emitEvents&&f(e.target,"bouncerFormValid")}};r.destroy=function(){var e,t,r;document.removeEventListener("blur",a,!0),document.removeEventListener("input",i,!1),document.removeEventListener("click",i,!1),document.removeEventListener("submit",o,!1),e=n,t=l,s(document.querySelectorAll(e),(function(e){s(e.querySelectorAll("input, select, textarea"),(function(e){p(e,t)}))})),r=n,s(document.querySelectorAll(r),(function(e){e.removeAttribute("novalidate")})),l.emitEvents&&f(document,"bouncerDestroyed",{settings:l}),l=null};var t;return l=c(u,e||{}),t=n,s(document.querySelectorAll(t),(function(e){e.setAttribute("novalidate",!0)})),document.addEventListener("blur",a,!0),document.addEventListener("input",i,!1),document.addEventListener("click",i,!1),document.addEventListener("submit",o,!1),l.emitEvents&&f(document,"bouncerInitialized",{settings:l}),r}}));
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAccordion = void 0;
var initAccordion = exports.initAccordion = function initAccordion() {
  // Exclusive open: closing sibling items when one opens
  document.querySelectorAll('.accordion').forEach(function (accordion) {
    if (accordion.dataset.accordionInitialized) return;
    accordion.dataset.accordionInitialized = 'true';
    var items = accordion.querySelectorAll(':scope > .accordion__item');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (sibling) {
          if (sibling !== item && sibling.open) sibling.open = false;
        });
      });
    });
  });
};
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAlertClose = void 0;
var initAlertClose = exports.initAlertClose = function initAlertClose() {
  document.querySelectorAll('.alert__close').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
      var alertBlock = closeBtn.parentNode;
      alertBlock.classList.add('d-none');
      if (alertBlock.classList.contains('alert--removable')) alertBlock.remove();
    });
  });
};
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDropdown = void 0;
var initDropdown = exports.initDropdown = function initDropdown() {
  var dropdowns = Array.from(document.querySelectorAll('.dropdown'));
  if (!dropdowns.length) return;
  var getMenu = function getMenu(dropdown) {
    return dropdown.querySelector('.dropdown__menu');
  };
  var getTrigger = function getTrigger(dropdown) {
    return dropdown.querySelector('.dropdown__trigger');
  };
  var getItems = function getItems(dropdown) {
    return Array.from(dropdown.querySelectorAll('[role="menuitem"]:not([disabled]):not([aria-disabled="true"])'));
  };
  var isOpen = function isOpen(dropdown) {
    var _getTrigger;
    return ((_getTrigger = getTrigger(dropdown)) === null || _getTrigger === void 0 ? void 0 : _getTrigger.getAttribute('aria-expanded')) === 'true';
  };
  var close = function close(dropdown) {
    var _getTrigger2;
    (_getTrigger2 = getTrigger(dropdown)) === null || _getTrigger2 === void 0 || _getTrigger2.setAttribute('aria-expanded', 'false');
    var menu = getMenu(dropdown);
    if (menu) menu.hidden = true;
  };
  var open = function open(dropdown) {
    var _getTrigger3, _getItems$;
    // Close any other open dropdowns first
    dropdowns.forEach(function (d) {
      if (d !== dropdown) close(d);
    });
    (_getTrigger3 = getTrigger(dropdown)) === null || _getTrigger3 === void 0 || _getTrigger3.setAttribute('aria-expanded', 'true');
    var menu = getMenu(dropdown);
    if (menu) menu.hidden = false;
    // Move focus to the first menu item
    (_getItems$ = getItems(dropdown)[0]) === null || _getItems$ === void 0 || _getItems$.focus();
  };

  // Create the controller before attaching listeners so all of them — both
  // per-element and the global outside-click — can be removed with one abort.
  var controller = new AbortController();
  var signal = controller.signal;
  dropdowns.forEach(function (dropdown) {
    var trigger = getTrigger(dropdown);
    var menu = getMenu(dropdown);
    if (!trigger || !menu) return;
    trigger.addEventListener('click', function () {
      isOpen(dropdown) ? close(dropdown) : open(dropdown);
    }, {
      signal: signal
    });
    menu.addEventListener('keydown', function (e) {
      var items = getItems(dropdown);
      var index = items.indexOf(document.activeElement);
      if (e.key === 'Escape') {
        close(dropdown);
        trigger.focus();
      } else if (e.key === 'ArrowDown') {
        var _items;
        e.preventDefault();
        (_items = items[(index + 1) % items.length]) === null || _items === void 0 || _items.focus();
      } else if (e.key === 'ArrowUp') {
        var _items2;
        e.preventDefault();
        (_items2 = items[(index - 1 + items.length) % items.length]) === null || _items2 === void 0 || _items2.focus();
      } else if (e.key === 'Home') {
        var _items$;
        e.preventDefault();
        (_items$ = items[0]) === null || _items$ === void 0 || _items$.focus();
      } else if (e.key === 'End') {
        var _items3;
        e.preventDefault();
        (_items3 = items[items.length - 1]) === null || _items3 === void 0 || _items3.focus();
      } else if (e.key === 'Tab') {
        close(dropdown);
      }
    }, {
      signal: signal
    });
  });

  // Close on outside click — all listeners share the same AbortController so
  // callers that re-initialize can abort the prior one for full cleanup.
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) close(dropdown);
    });
  }, {
    signal: signal
  });
  return controller;
};
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMenuToggle = void 0;
var initMenuToggle = exports.initMenuToggle = function initMenuToggle() {
  var menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var targets = [document.getElementById('navigation'), document.getElementById('toolbar')];
      var expanded = menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
      targets.forEach(function (target) {
        if (target) {
          if (target.classList.contains('expanded')) {
            target.classList.add('collapsed');
            target.classList.remove('expanded');
          } else {
            target.classList.add('expanded');
            target.classList.remove('collapsed');
          }
        }
      });
      menuToggle.setAttribute('aria-expanded', expanded);
    });
  }
};
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initModal = void 0;
var initModal = exports.initModal = function initModal() {
  // Open modals via data-modal-target triggers
  document.querySelectorAll('[data-modal-target]').forEach(function (trigger) {
    var modal = document.getElementById(trigger.dataset.modalTarget);
    if (!modal || modal.tagName !== 'DIALOG' || typeof modal.showModal !== 'function') return;
    trigger.addEventListener('click', function () {
      modal.showModal();
    });
  });

  // Close on backdrop click (click lands on dialog element itself, outside content box)
  document.querySelectorAll('dialog').forEach(function (dialog) {
    dialog.addEventListener('click', function (e) {
      var rect = dialog.getBoundingClientRect();
      var isOutside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      if (isOutside) dialog.close();
    });
  });
};
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPopover = void 0;
var initPopover = exports.initPopover = function initPopover() {
  var popovers = Array.from(document.querySelectorAll('.popover'));
  if (!popovers.length) return;
  var getPanel = function getPanel(popover) {
    return popover.querySelector('.popover__panel');
  };
  var getTrigger = function getTrigger(popover) {
    return popover.querySelector('.popover__trigger');
  };
  var isOpen = function isOpen(popover) {
    var _getTrigger;
    return ((_getTrigger = getTrigger(popover)) === null || _getTrigger === void 0 ? void 0 : _getTrigger.getAttribute('aria-expanded')) === 'true';
  };
  var EDGE = 8; // minimum px clearance from viewport edge

  var getPlacement = function getPlacement(panel) {
    if (panel.classList.contains('popover__panel--top')) return 'top';
    if (panel.classList.contains('popover__panel--left')) return 'left';
    if (panel.classList.contains('popover__panel--right')) return 'right';
    return 'bottom';
  };
  var opposite = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };

  // Called after the panel is shown so getBoundingClientRect() returns real dimensions.
  var applyFlip = function applyFlip(panel) {
    var placement = getPlacement(panel);
    var rect = panel.getBoundingClientRect();
    var overflows;
    switch (placement) {
      case 'bottom':
        overflows = rect.bottom > window.innerHeight - EDGE;
        break;
      case 'top':
        overflows = rect.top < EDGE;
        break;
      case 'left':
        overflows = rect.left < EDGE;
        break;
      case 'right':
        overflows = rect.right > window.innerWidth - EDGE;
        break;
      default:
        overflows = false;
    }
    if (overflows) {
      panel.dataset.popoverFlip = opposite[placement];
    }
  };
  var close = function close(popover) {
    var _getTrigger2;
    (_getTrigger2 = getTrigger(popover)) === null || _getTrigger2 === void 0 || _getTrigger2.setAttribute('aria-expanded', 'false');
    var panel = getPanel(popover);
    if (panel) {
      panel.hidden = true;
      delete panel.dataset.popoverFlip;
    }
  };
  var open = function open(popover) {
    var _getTrigger3;
    // Close any other open popovers first
    popovers.forEach(function (other) {
      if (other !== popover) close(other);
    });
    (_getTrigger3 = getTrigger(popover)) === null || _getTrigger3 === void 0 || _getTrigger3.setAttribute('aria-expanded', 'true');
    var panel = getPanel(popover);
    if (panel) {
      panel.hidden = false;
      applyFlip(panel);
    }
  };

  // Create the controller before attaching listeners so all of them — both
  // per-element and the global outside-click — can be removed with one abort.
  var controller = new AbortController();
  var signal = controller.signal;
  popovers.forEach(function (popover) {
    var trigger = getTrigger(popover);
    var panel = getPanel(popover);
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      isOpen(popover) ? close(popover) : open(popover);
    }, {
      signal: signal
    });

    // Escape closes from anywhere within the popover wrapper (trigger or panel)
    popover.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen(popover)) {
        close(popover);
        trigger.focus();
      }
    }, {
      signal: signal
    });
  });

  // Close on outside click — all listeners share the same AbortController so
  // callers that re-initialize can abort the prior one for full cleanup.
  document.addEventListener('click', function (e) {
    popovers.forEach(function (popover) {
      if (!popover.contains(e.target)) close(popover);
    });
  }, {
    signal: signal
  });
  return controller;
};
},{}],8:[function(require,module,exports){
"use strict";

var _formbouncerjs = _interopRequireDefault(require("formbouncerjs"));
var _accordion = require("./accordion");
var _dropdown = require("./dropdown");
var _popover = require("./popover");
var _tabs = require("./tabs");
var _alerts = require("./alerts");
var _menuToggle = require("./menuToggle");
var _modal = require("./modal");
var _tooltip = require("./tooltip");
var _scrollHeader = _interopRequireDefault(require("./scrollHeader"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
window.addEventListener('load', function () {
  var validate = new _formbouncerjs["default"]('form', {
    // eslint-disable-line no-unused-vars
    messageAfterField: false,
    fieldClass: 'form__control--hasError',
    errorClass: 'form__control-error'
  });
  (0, _accordion.initAccordion)();
  // Both return an AbortController for cleanup if the component is ever re-initialized.
  // Not needed here — the page has a single load lifetime.
  (0, _dropdown.initDropdown)();
  (0, _popover.initPopover)();
  (0, _tabs.initTabs)();
  (0, _alerts.initAlertClose)();
  (0, _menuToggle.initMenuToggle)();
  (0, _modal.initModal)();
  (0, _tooltip.initTooltip)();
  (0, _scrollHeader["default"])();
});
},{"./accordion":2,"./alerts":3,"./dropdown":4,"./menuToggle":5,"./modal":6,"./popover":7,"./scrollHeader":9,"./tabs":10,"./tooltip":12,"formbouncerjs":1}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = scrollHeader;
var _throttle = _interopRequireDefault(require("./throttle"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// https://codingreflections.com/hide-header-on-scroll-down/

var setBodyProperties = function setBodyProperties(height) {
  var body = document.querySelector('body');
  body.style.setProperty('--headerHeight', height + 'px');
  body.style.paddingTop = height + 'px';
};
function scrollHeader() {
  var _w$scrollY;
  var header = document.querySelector('header.header--scroll');
  if (!header || header.dataset.scrollInitialized) return;
  header.dataset.scrollInitialized = 'true';
  var doc = document.documentElement;
  var w = window;
  var prevScroll = (_w$scrollY = w.scrollY) !== null && _w$scrollY !== void 0 ? _w$scrollY : doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  // headerHeight is kept in sync by the ResizeObserver so checkScroll
  // always uses the current measured height.
  var headerHeight = header.offsetHeight;
  setBodyProperties(headerHeight);
  var observer = new ResizeObserver(function (entries) {
    headerHeight = entries[0].target.offsetHeight;
    setBodyProperties(headerHeight);
  });
  observer.observe(header);
  var checkScroll = function checkScroll() {
    var _w$scrollY2;
    curScroll = (_w$scrollY2 = w.scrollY) !== null && _w$scrollY2 !== void 0 ? _w$scrollY2 : doc.scrollTop;
    if (curScroll > headerHeight) {
      direction = curScroll > prevScroll ? 2 : curScroll < prevScroll ? 1 : 0;
      direction !== prevDirection && toggleHeader();
    }
    if (curScroll <= headerHeight) {
      direction = 1;
      toggleHeader();
    }
    prevScroll = curScroll;
  };
  var toggleHeader = function toggleHeader() {
    if (direction) {
      header.classList.toggle('hidden', direction === 2 && curScroll > headerHeight);
      prevDirection = direction;
    }
  };
  window.addEventListener('scroll', (0, _throttle["default"])(checkScroll, 100));
}
},{"./throttle":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTabs = void 0;
var initTabs = exports.initTabs = function initTabs() {
  document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
    if (tablist.dataset.tabsInitialized) return;
    tablist.dataset.tabsInitialized = 'true';
    var tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    var activate = function activate(tab) {
      // Deactivate all tabs and hide all panels
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        var id = t.getAttribute('aria-controls');
        var panel = id ? document.getElementById(id) : null;
        if (panel) panel.hidden = true;
      });

      // Activate selected tab and show its panel
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      var id = tab.getAttribute('aria-controls');
      var panel = id ? document.getElementById(id) : null;
      if (panel) panel.hidden = false;
      tab.focus();
    };
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        return activate(tab);
      });
      tab.addEventListener('keydown', function (e) {
        var index = tabs.indexOf(tab);
        var next;
        if (e.key === 'ArrowRight') {
          next = tabs[(index + 1) % tabs.length];
        } else if (e.key === 'ArrowLeft') {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (e.key === 'Home') {
          next = tabs[0];
        } else if (e.key === 'End') {
          next = tabs[tabs.length - 1];
        }
        if (next) {
          e.preventDefault();
          activate(next);
        }
      });
    });
  });
};
},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = throttle;
function throttle(fn, wait) {
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTooltip = void 0;
var initTooltip = exports.initTooltip = function initTooltip() {
  var tooltips = Array.from(document.querySelectorAll('.tooltip[data-tooltip]'));
  if (!tooltips.length) return;
  var rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  var TOTAL = 0.66 * rootPx; // $_total: $_gap + $_arrow converted to px
  var EDGE = 8; // minimum px clearance from viewport edge

  var getPlacement = function getPlacement(el) {
    if (el.classList.contains('tooltip--bottom')) return 'bottom';
    if (el.classList.contains('tooltip--left')) return 'left';
    if (el.classList.contains('tooltip--right')) return 'right';
    return 'top';
  };
  var opposite = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };

  // Measure the bubble text at the same font/padding as the CSS ::before pseudo-element.
  var measureBubble = function measureBubble(text) {
    var probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;' + 'white-space:nowrap;font-size:0.875rem;line-height:1.5;padding:0.25rem 0.5rem;';
    probe.textContent = text;
    document.body.appendChild(probe);
    var _probe$getBoundingCli = probe.getBoundingClientRect(),
      width = _probe$getBoundingCli.width,
      height = _probe$getBoundingCli.height;
    probe.remove();
    return {
      width: width,
      height: height
    };
  };
  var needsFlip = function needsFlip(el, rect, placement) {
    var _measureBubble = measureBubble(el.dataset.tooltip),
      bw = _measureBubble.width,
      bh = _measureBubble.height;
    switch (placement) {
      case 'top':
        return rect.top - bh - TOTAL < EDGE;
      case 'bottom':
        return rect.bottom + bh + TOTAL > window.innerHeight - EDGE;
      case 'left':
        return rect.left - bw - TOTAL < EDGE;
      case 'right':
        return rect.right + bw + TOTAL > window.innerWidth - EDGE;
      default:
        return false;
    }
  };
  tooltips.forEach(function (el) {
    var show = function show() {
      var placement = getPlacement(el);
      if (needsFlip(el, el.getBoundingClientRect(), placement)) {
        el.dataset.tooltipFlip = opposite[placement];
      }
    };
    var hide = function hide() {
      return delete el.dataset.tooltipFlip;
    };
    el.addEventListener('mouseenter', show);
    el.addEventListener('focusin', show);
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focusout', hide);
  });
};
},{}]},{},[8]);
