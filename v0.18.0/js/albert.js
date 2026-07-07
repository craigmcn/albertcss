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
const initAccordion = () => {
  // Exclusive open: closing sibling items when one opens
  document.querySelectorAll('.accordion').forEach(accordion => {
    if (accordion.dataset.accordionInitialized) return;
    accordion.dataset.accordionInitialized = 'true';
    const items = accordion.querySelectorAll(':scope > .accordion__item');
    items.forEach(item => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        items.forEach(sibling => {
          if (sibling !== item && sibling.open) sibling.open = false;
        });
      });
    });
  });
};
exports.initAccordion = initAccordion;
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAlertClose = void 0;
const initAlertClose = () => {
  document.querySelectorAll('.alert__close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const alertBlock = closeBtn.parentNode;
      alertBlock.classList.add('d-none');
      if (alertBlock.classList.contains('alert--removable')) alertBlock.remove();
    });
  });
};
exports.initAlertClose = initAlertClose;
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDarkMode = initDarkMode;
function initDarkMode() {
  const html = document.documentElement;
  const buttons = document.querySelectorAll('[data-toggle-dark-mode]');
  if (!buttons.length) return;
  function applyMode(dark) {
    html.dataset.mode = dark ? 'dark' : 'light';
    document.querySelectorAll('[data-color="light"]').forEach(el => {
      el.classList.toggle('d-none', dark);
    });
    document.querySelectorAll('[data-color="dark"]').forEach(el => {
      el.classList.toggle('d-none', !dark);
    });
    buttons.forEach(btn => {
      btn.dataset.mode = dark ? 'light' : 'dark';
    });
  }
  const existingMode = html.dataset.mode;
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
  applyMode(existingMode ? existingMode === 'dark' : prefersDark);
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyMode(html.dataset.mode !== 'dark');
    });
  });
}
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDropdown = void 0;
const initDropdown = () => {
  const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
  if (!dropdowns.length) return;
  const getMenu = dropdown => dropdown.querySelector('.dropdown__menu');
  const getTrigger = dropdown => dropdown.querySelector('.dropdown__trigger');
  const getItems = dropdown => Array.from(dropdown.querySelectorAll('[role="menuitem"]:not([disabled]):not([aria-disabled="true"])'));
  const isOpen = dropdown => getTrigger(dropdown)?.getAttribute('aria-expanded') === 'true';
  const close = dropdown => {
    getTrigger(dropdown)?.setAttribute('aria-expanded', 'false');
    const menu = getMenu(dropdown);
    if (menu) menu.hidden = true;
  };
  const open = dropdown => {
    // Close any other open dropdowns first
    dropdowns.forEach(d => {
      if (d !== dropdown) close(d);
    });
    getTrigger(dropdown)?.setAttribute('aria-expanded', 'true');
    const menu = getMenu(dropdown);
    if (menu) menu.hidden = false;
    // Move focus to the first menu item
    getItems(dropdown)[0]?.focus();
  };

  // Create the controller before attaching listeners so all of them — both
  // per-element and the global outside-click — can be removed with one abort.
  const controller = new AbortController();
  const {
    signal
  } = controller;
  dropdowns.forEach(dropdown => {
    const trigger = getTrigger(dropdown);
    const menu = getMenu(dropdown);
    if (!trigger || !menu) return;
    trigger.addEventListener('click', () => {
      isOpen(dropdown) ? close(dropdown) : open(dropdown);
    }, {
      signal
    });
    menu.addEventListener('keydown', e => {
      const items = getItems(dropdown);
      const index = items.indexOf(document.activeElement);
      if (e.key === 'Escape') {
        close(dropdown);
        trigger.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(index + 1) % items.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(index - 1 + items.length) % items.length]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      } else if (e.key === 'Tab') {
        close(dropdown);
      }
    }, {
      signal
    });
  });

  // Close on outside click — all listeners share the same AbortController so
  // callers that re-initialize can abort the prior one for full cleanup.
  document.addEventListener('click', e => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) close(dropdown);
    });
  }, {
    signal
  });
  return controller;
};
exports.initDropdown = initDropdown;
},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMenuToggle = void 0;
const initMenuToggle = () => {
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const targets = [document.getElementById('navigation'), document.getElementById('toolbar')];
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
      targets.forEach(target => {
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
exports.initMenuToggle = initMenuToggle;
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initModal = void 0;
const initModal = () => {
  // Open modals via data-modal-target triggers
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    const modal = document.getElementById(trigger.dataset.modalTarget);
    if (!modal || modal.tagName !== 'DIALOG' || typeof modal.showModal !== 'function') return;
    trigger.addEventListener('click', () => {
      modal.showModal();
    });
  });

  // Close on backdrop click (click lands on dialog element itself, outside content box)
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', e => {
      const rect = dialog.getBoundingClientRect();
      const isOutside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      if (isOutside) dialog.close();
    });
  });
};
exports.initModal = initModal;
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPopover = void 0;
const initPopover = () => {
  const popovers = Array.from(document.querySelectorAll('.popover'));
  if (!popovers.length) return;
  const getPanel = popover => popover.querySelector('.popover__panel');
  const getTrigger = popover => popover.querySelector('.popover__trigger');
  const isOpen = popover => getTrigger(popover)?.getAttribute('aria-expanded') === 'true';
  const EDGE = 8; // minimum px clearance from viewport edge

  const getPlacement = panel => {
    if (panel.classList.contains('popover__panel--top')) return 'top';
    if (panel.classList.contains('popover__panel--left')) return 'left';
    if (panel.classList.contains('popover__panel--right')) return 'right';
    return 'bottom';
  };
  const opposite = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };

  // Called after the panel is shown so getBoundingClientRect() returns real dimensions.
  const applyFlip = panel => {
    const placement = getPlacement(panel);
    const rect = panel.getBoundingClientRect();
    let overflows;
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
  const close = popover => {
    getTrigger(popover)?.setAttribute('aria-expanded', 'false');
    const panel = getPanel(popover);
    if (panel) {
      panel.hidden = true;
      delete panel.dataset.popoverFlip;
    }
  };
  const open = popover => {
    // Close any other open popovers first
    popovers.forEach(other => {
      if (other !== popover) close(other);
    });
    getTrigger(popover)?.setAttribute('aria-expanded', 'true');
    const panel = getPanel(popover);
    if (panel) {
      panel.hidden = false;
      applyFlip(panel);
    }
  };

  // Create the controller before attaching listeners so all of them — both
  // per-element and the global outside-click — can be removed with one abort.
  const controller = new AbortController();
  const {
    signal
  } = controller;
  popovers.forEach(popover => {
    const trigger = getTrigger(popover);
    const panel = getPanel(popover);
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      isOpen(popover) ? close(popover) : open(popover);
    }, {
      signal
    });

    // Escape closes from anywhere within the popover wrapper (trigger or panel)
    popover.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen(popover)) {
        close(popover);
        trigger.focus();
      }
    }, {
      signal
    });
  });

  // Close on outside click — all listeners share the same AbortController so
  // callers that re-initialize can abort the prior one for full cleanup.
  document.addEventListener('click', e => {
    popovers.forEach(popover => {
      if (!popover.contains(e.target)) close(popover);
    });
  }, {
    signal
  });
  return controller;
};
exports.initPopover = initPopover;
},{}],9:[function(require,module,exports){
"use strict";

var _formbouncerjs = _interopRequireDefault(require("formbouncerjs"));
var _accordion = require("./accordion");
var _darkMode = require("./darkMode");
var _dropdown = require("./dropdown");
var _popover = require("./popover");
var _tabs = require("./tabs");
var _alerts = require("./alerts");
var _menuToggle = require("./menuToggle");
var _modal = require("./modal");
var _tooltip = require("./tooltip");
var _scrollHeader = _interopRequireDefault(require("./scrollHeader"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
window.addEventListener('load', function () {
  // eslint-disable-next-line no-unused-vars
  const validate = new _formbouncerjs.default('form', {
    messageAfterField: false,
    fieldClass: 'form__control--hasError',
    errorClass: 'form__control-error'
  });
  (0, _accordion.initAccordion)();
  (0, _darkMode.initDarkMode)();
  // Both return an AbortController for cleanup if the component is ever re-initialized.
  // Not needed here — the page has a single load lifetime.
  (0, _dropdown.initDropdown)();
  (0, _popover.initPopover)();
  (0, _tabs.initTabs)();
  (0, _alerts.initAlertClose)();
  (0, _menuToggle.initMenuToggle)();
  (0, _modal.initModal)();
  (0, _tooltip.initTooltip)();
  (0, _scrollHeader.default)();
});
},{"./accordion":2,"./alerts":3,"./darkMode":4,"./dropdown":5,"./menuToggle":6,"./modal":7,"./popover":8,"./scrollHeader":10,"./tabs":11,"./tooltip":13,"formbouncerjs":1}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollHeader;
var _throttle = _interopRequireDefault(require("./throttle"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// https://codingreflections.com/hide-header-on-scroll-down/

const setBodyProperties = height => {
  const body = document.querySelector('body');
  body.style.setProperty('--headerHeight', height + 'px');
  body.style.paddingTop = height + 'px';
};
function scrollHeader() {
  const header = document.querySelector('header.header--scroll');
  if (!header || header.dataset.scrollInitialized) return;
  header.dataset.scrollInitialized = 'true';
  const doc = document.documentElement;
  const w = window;
  let prevScroll = w.scrollY ?? doc.scrollTop;
  let curScroll;
  let direction = 0;
  let prevDirection = 0;

  // headerHeight is kept in sync by the ResizeObserver so checkScroll
  // always uses the current measured height.
  let headerHeight = header.offsetHeight;
  setBodyProperties(headerHeight);
  const observer = new ResizeObserver(entries => {
    headerHeight = entries[0].target.offsetHeight;
    setBodyProperties(headerHeight);
  });
  observer.observe(header);
  const checkScroll = () => {
    curScroll = w.scrollY ?? doc.scrollTop;
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
  const toggleHeader = () => {
    if (direction) {
      header.classList.toggle('hidden', direction === 2 && curScroll > headerHeight);
      prevDirection = direction;
    }
  };
  window.addEventListener('scroll', (0, _throttle.default)(checkScroll, 100));
}
},{"./throttle":12}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTabs = void 0;
const initTabs = () => {
  document.querySelectorAll('[role="tablist"]').forEach(tablist => {
    if (tablist.dataset.tabsInitialized) return;
    tablist.dataset.tabsInitialized = 'true';
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const activate = tab => {
      // Deactivate all tabs and hide all panels
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        const id = t.getAttribute('aria-controls');
        const panel = id ? document.getElementById(id) : null;
        if (panel) panel.hidden = true;
      });

      // Activate selected tab and show its panel
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      const id = tab.getAttribute('aria-controls');
      const panel = id ? document.getElementById(id) : null;
      if (panel) panel.hidden = false;
      tab.focus();
    };
    tabs.forEach(tab => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', e => {
        const index = tabs.indexOf(tab);
        let next;
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
exports.initTabs = initTabs;
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;
function throttle(fn, wait) {
  let time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}
},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTooltip = void 0;
const initTooltip = () => {
  const tooltips = Array.from(document.querySelectorAll('.tooltip[data-tooltip]'));
  if (!tooltips.length) return;
  const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const TOTAL = 0.66 * rootPx; // $_total: $_gap + $_arrow converted to px
  const EDGE = 8; // minimum px clearance from viewport edge

  const getPlacement = el => {
    if (el.classList.contains('tooltip--bottom')) return 'bottom';
    if (el.classList.contains('tooltip--left')) return 'left';
    if (el.classList.contains('tooltip--right')) return 'right';
    return 'top';
  };
  const opposite = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };

  // Measure the bubble text at the same font/padding as the CSS ::before pseudo-element.
  const measureBubble = text => {
    const probe = document.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;' + 'white-space:nowrap;font-size:0.875rem;line-height:1.5;padding:0.25rem 0.5rem;';
    probe.textContent = text;
    document.body.appendChild(probe);
    const {
      width,
      height
    } = probe.getBoundingClientRect();
    probe.remove();
    return {
      width,
      height
    };
  };
  const needsFlip = (el, rect, placement) => {
    const {
      width: bw,
      height: bh
    } = measureBubble(el.dataset.tooltip);
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
  tooltips.forEach(el => {
    const show = () => {
      const placement = getPlacement(el);
      if (needsFlip(el, el.getBoundingClientRect(), placement)) {
        el.dataset.tooltipFlip = opposite[placement];
      }
    };
    const hide = () => delete el.dataset.tooltipFlip;
    el.addEventListener('mouseenter', show);
    el.addEventListener('focusin', show);
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focusout', hide);
  });
};
exports.initTooltip = initTooltip;
},{}]},{},[9]);
