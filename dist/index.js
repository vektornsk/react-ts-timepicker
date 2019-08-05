!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define("react-ts-timepicker",["React","ReactDOM"],t):"object"==typeof exports?exports["react-ts-timepicker"]=t(require("react"),require("react-dom")):e["react-ts-timepicker"]=t(e.React,e.ReactDOM)}(window,function(e,t){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=3)}([function(e,t,n){e.exports=n(4)()},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";var o,r=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),s=n(11);n(6);var a=86400,u=function(e){function t(t){var n=e.call(this,t)||this;n.onChange=function(e){var t=n.props.onChange;if(t)if(n.props.value instanceof Date){var o=n.convertSecondsToDate(e);t(new Date(n.props.value.getFullYear(),n.props.value.getMonth(),n.props.value.getDate(),o.getHours(),o.getMinutes(),o.getSeconds()))}else{var r=n.state,i=r.value,s=r.inputValue;t(i?n.convertSecondsToFormattedString(e):s)}},n.onInputChange=function(e){var t=n.convertTimeToSeconds(e.target.value);n.setState({inputValue:e.target.value,value:t},function(){n.state.showSuggestions?n.scrollSuggestionList(t):n.showSuggestions(),n.onChange(t)})},n.onInputBlur=function(){null!==n.state.value&&n.setState({inputValue:n.convertSecondsToFormattedString(n.state.value)})},n.onInputFocus=function(){n.showSuggestions()},n.onInputClick=function(){n.state.showSuggestions||n.showSuggestions()},n.onSuggestionSelect=function(e){var t=parseInt(e.target.value,10);n.setState({inputValue:n.convertSecondsToFormattedString(t),value:t},function(){n.hideSuggestions(),n.onChange(t)})},n.onArrowUpDown=function(e){var t=n.state,o=t.value,r=t.suggestions,i=t.highlightedSuggestionIndex,s=0;if(null===i)if(o){var a=r.findIndex(function(e){return n.isNearestSuggestion(o,e)});s="down"===e?a+1:a-1}else s=0;else s="down"===e?i+1:i-1;s<0&&(s=0),s===r.length&&(s=r.length-1),s!==i&&n.setState({highlightedSuggestionIndex:s},function(){n.scrollSuggestionList(n.state.suggestions[s])})},n.onKeyDown=function(e){if(n.inputEl===document.activeElement)switch(e.key){case"Escape":n.hideSuggestions();break;case"Enter":var t=n.state,o=t.highlightedSuggestionIndex,r=t.value,i=t.suggestions;if(o){var s=i[o];n.setState({inputValue:n.convertSecondsToFormattedString(s),value:s}),n.onChange(s)}else n.setState({inputValue:n.convertSecondsToFormattedString(r)});n.hideSuggestions();break;case"ArrowUp":n.onArrowUpDown("up");break;case"ArrowDown":n.state.showSuggestions?n.onArrowUpDown("down"):n.showSuggestions();break;case"Tab":n.state.showSuggestions&&n.hideSuggestions()}},n.prependZero=function(e){return e<10?"0"+e:e.toString()},n.convertSecondsToDate=function(e){return new Date(1970,0,2,e/3600%24,e/60%60,e%60,0)},n.convertSecondsToFormattedString=function(e){var t=n.props.timeFormat,o=n.convertSecondsToDate(e);return t.split("").reduce(function(e,t,r,i){if(r>0&&i[r-1]===t)return e;switch(t){case"a":return e+(o.getHours()>11?"pm":"am");case"h":var s=o.getHours()%12;return 0===s?e+"12":e+n.prependZero(s);case"H":return e+n.prependZero(o.getHours());case"m":return e+n.prependZero(o.getMinutes());case"s":return e+n.prependZero(o.getSeconds());default:return e+t}},"")},n.convertTimeToSeconds=function(e){if(""===e||null===e)return null;if(e instanceof Date)return 3600*e.getHours()+60*e.getMinutes()+e.getSeconds();var t=e.toLowerCase().replace(/[\s]/g,"");"a"!==t.slice(-1)&&"p"!==t.slice(-1)||(t+="m");var o=new RegExp("^(am|pm|AM|PM)?([0-9]?[0-9])\\W?([0-5][0-9])?\\W?([0-5][0-9])?(am|pm|AM|PM)?$"),r=t.match(o);if(!r)return null;var i=parseInt(r[2],10),s=parseInt(r[3],10)||0,u=parseInt(r[4],10)||0,c=r[1]||r[5],l=i;if(i<=12&&c){var p="pm"===c||"PM"===c;l=12===i?p?12:0:i+(p?12:0)}var f=3600*l+60*s+u;if(f>a){if(!n.props.normalizeTime)return null;f=i%24*3600+60*s+u}return n.props.allowOnlySuggestions?n.roundTime(f):f},n.hideSuggestionsOnOutsideClick=function(e){e.target!==n.inputEl&&n.suggestionsWrapperEl&&!n.suggestionsWrapperEl.contains(e.target)&&n.hideSuggestions()},n.hideSuggestionsOnScroll=function(){n.state.showSuggestions&&n.hideSuggestions()},n.showSuggestions=function(){n.setState({showSuggestions:!0},function(){n.positionSuggestions(),n.scrollSuggestionList(n.state.value),document.addEventListener("click",n.hideSuggestionsOnOutsideClick),n.props.hideOnScroll&&window.addEventListener("scroll",n.hideSuggestionsOnScroll)})},n.hideSuggestions=function(){n.setState({highlightedSuggestionIndex:null,showSuggestions:!1,suggestionsPosition:null},function(){document.removeEventListener("click",n.hideSuggestionsOnOutsideClick),n.props.hideOnScroll&&window.removeEventListener("scroll",n.hideSuggestionsOnScroll)})},n.positionSuggestions=function(){var e,t,o=n.inputEl.getBoundingClientRect(),r=document.documentElement,i=(window.pageYOffset||r.scrollTop)-(r.clientTop||0),s=!!n.suggestionsWrapperEl&&n.suggestionsWrapperEl.getBoundingClientRect(),a=s?s.height:0,u=window.innerHeight||r.clientHeight||document.body.clientHeight;null===n.props.appendTo?(e=0,t=o.height):(e=o.left,t=o.top+o.height+i),u-(o.top+o.height)<a&&(t=o.top-a+i),n.setState({suggestionsPosition:{left:e,top:t}})},n.scrollSuggestionList=function(e){var t=n.state,o=t.suggestions,r=t.showSuggestions;if(n.suggestionsWrapperEl&&r){var i=n.suggestionEl?n.suggestionEl.offsetHeight:0;if(e){for(var s=0;s<o.length;s++)if(Math.abs(e-o[s])<=30*n.props.step){n.suggestionsWrapperEl.scrollTop=i*s-i;break}}else n.suggestionsWrapperEl.scrollTop=0}},n.createSuggestions=function(e,t,o){for(var r=60*e,i=n.convertTimeToSeconds(t)||0,s=n.convertTimeToSeconds(o)||a,u=[];n.props.includeMax&&s<a?i<=s:i<s;)u.push(i),i+=r;return u},n.roundTime=function(e){var t=60*n.props.step,o=e%t;return o>=t/2?e+(t-o):e-o},n.isNearestSuggestion=function(e,t){return Math.abs(e-t)<30*n.props.step/2},n.renderSuggestions=function(){var e=n.state,t=e.highlightedSuggestionIndex,o=e.showSuggestions,r=e.suggestionsPosition,a=e.suggestions,u=e.value,c=n.props.appendTo,l=i.createElement("div",{className:"time-picker__suggestion-list",ref:function(e){n.suggestionsWrapperEl=e},style:{display:o?"block":"none",left:r?r.left:-9999,top:r?r.top:-9999,zIndex:999999}},a.map(function(e,o){return i.createElement("button",{value:e,key:name+"-"+e,type:"button",className:"time-picker__suggestion "+(null!==t&&t===o||null===t&&u&&n.isNearestSuggestion(u,e)?"time-picker__suggestion_selected":""),onClick:n.onSuggestionSelect,tabIndex:-1,ref:function(e){0===o&&(n.suggestionEl=e)}},n.convertSecondsToFormattedString(e))}));return null===c?l:i.createElement(s.Portal,{node:"body"!==c&&document&&document.querySelector(c)},l)};var o=t.value,r=t.step,u=t.minTime,c=t.maxTime,l=n.convertTimeToSeconds(o);return n.state={highlightedSuggestionIndex:null,inputValue:l?n.convertSecondsToFormattedString(l):"",showSuggestions:!1,suggestions:n.createSuggestions(r,u,c),suggestionsPosition:null,value:l},n}return r(t,e),t.prototype.componentDidMount=function(){document.addEventListener("keydown",this.onKeyDown)},t.prototype.componentDidUpdate=function(e){var t=this.props.value,n=!1;if(!e.value&&t||e.value&&!t?n=!0:t instanceof Date&&e.value instanceof Date?n=e.value.getTime()!==t.getTime():"string"==typeof t&&"string"==typeof e.value&&(n=e.value!==t),n){var o=this.convertTimeToSeconds(t);this.setState({inputValue:o?this.convertSecondsToFormattedString(o):"",value:o})}},t.prototype.componentWillUnmount=function(){document.removeEventListener("keydown",this.onKeyDown)},t.prototype.render=function(){var e=this,t=this.props,n=t.className,o=t.inputClass,r=this.state,s=r.suggestions,a=r.showSuggestions;return i.createElement("div",{className:"time-picker "+(n||"")},i.createElement("label",null,i.createElement("input",{type:"time",className:"time-picker__input "+o,value:this.state.inputValue,onChange:this.onInputChange,onBlur:this.onInputBlur,onFocus:this.onInputFocus,onClick:this.onInputClick,ref:function(t){e.inputEl=t}})),(a&&s.length>0||this.suggestionsWrapperEl)&&this.renderSuggestions())},t.defaultProps={allowOnlySuggestions:!1,appendTo:"body",hideOnScroll:!1,includeMax:!0,inputClass:"",maxTime:null,minTime:null,name:"",normalizeTime:!0,step:30,timeFormat:"hh:mma",value:null},t}(i.Component);t.default=u},function(e,t,n){"use strict";var o=n(5);function r(){}function i(){}i.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,i,s){if(s!==o){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:r};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){var o=n(7);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(9)(o,r);o.locals&&(e.exports=o.locals)},function(e,t,n){(e.exports=n(8)(!1)).push([e.i,"",""])},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var r=(s=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[n].concat(i).concat([r]).join("\n")}var s;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<e.length;r++){var s=e[r];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t,n){var o,r,i={},s=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),a=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var o=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(e){o=null}t[e]=o}return t[e]}}(),u=null,c=0,l=[],p=n(10);function f(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=i[o.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](o.parts[s]);for(;s<o.parts.length;s++)r.parts.push(y(o.parts[s],t))}else{var a=[];for(s=0;s<o.parts.length;s++)a.push(y(o.parts[s],t));i[o.id]={id:o.id,refs:1,parts:a}}}}function d(e,t){for(var n=[],o={},r=0;r<e.length;r++){var i=e[r],s=t.base?i[0]+t.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};o[s]?o[s].parts.push(a):n.push(o[s]={id:s,parts:[a]})}return n}function h(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=l[l.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),l.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=a(e.insertAt.before,n);n.insertBefore(t,r)}}function g(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function v(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var o=function(){0;return n.nc}();o&&(e.attrs.nonce=o)}return m(t,e.attrs),h(e,t),t}function m(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function y(e,t){var n,o,r,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var s=c++;n=u||(u=v(t)),o=w.bind(null,n,s,!1),r=w.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",m(t,e.attrs),h(e,t),t}(t),o=function(e,t,n){var o=n.css,r=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||i)&&(o=p(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([o],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,t),r=function(){g(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),o=function(e,t){var n=t.css,o=t.media;o&&e.setAttribute("media",o);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){g(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=d(e,t);return f(n,t),function(e){for(var o=[],r=0;r<n.length;r++){var s=n[r];(a=i[s.id]).refs--,o.push(a)}e&&f(d(e,t),t);for(r=0;r<o.length;r++){var a;if(0===(a=o[r]).refs){for(var u=0;u<a.parts.length;u++)a.parts[u]();delete i[a.id]}}}};var b,S=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function w(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=S(t,r);else{var i=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(e,t,n){"use strict";n.r(t);var o=n(2),r=n.n(o),i=n(1),s=n.n(i),a=n(0),u=n.n(a),c=!("undefined"==typeof window||!window.document||!window.document.createElement),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.a.Component),l(t,[{key:"componentWillUnmount",value:function(){this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null}},{key:"render",value:function(){return c?(this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode)),r.a.createPortal(this.props.children,this.props.node||this.defaultNode)):null}}]),t}();p.propTypes={children:u.a.node.isRequired,node:u.a.any};var f=p,d=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var h=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.a.Component),d(t,[{key:"componentDidMount",value:function(){this.renderPortal()}},{key:"componentDidUpdate",value:function(e){this.renderPortal()}},{key:"componentWillUnmount",value:function(){r.a.unmountComponentAtNode(this.defaultNode||this.props.node),this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null,this.portal=null}},{key:"renderPortal",value:function(e){this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode));var t=this.props.children;"function"==typeof this.props.children.type&&(t=s.a.cloneElement(this.props.children)),this.portal=r.a.unstable_renderSubtreeIntoContainer(this,t,this.props.node||this.defaultNode)}},{key:"render",value:function(){return null}}]),t}(),g=h;h.propTypes={children:u.a.node.isRequired,node:u.a.any};var v=r.a.createPortal?f:g,m=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var y=27,b=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.portalNode=null,n.state={active:!!e.defaultOpen},n.openPortal=n.openPortal.bind(n),n.closePortal=n.closePortal.bind(n),n.wrapWithPortal=n.wrapWithPortal.bind(n),n.handleOutsideMouseClick=n.handleOutsideMouseClick.bind(n),n.handleKeydown=n.handleKeydown.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.a.Component),m(t,[{key:"componentDidMount",value:function(){this.props.closeOnEsc&&document.addEventListener("keydown",this.handleKeydown),this.props.closeOnOutsideClick&&document.addEventListener("click",this.handleOutsideMouseClick)}},{key:"componentWillUnmount",value:function(){this.props.closeOnEsc&&document.removeEventListener("keydown",this.handleKeydown),this.props.closeOnOutsideClick&&document.removeEventListener("click",this.handleOutsideMouseClick)}},{key:"openPortal",value:function(e){this.state.active||(e&&e.nativeEvent&&e.nativeEvent.stopImmediatePropagation(),this.setState({active:!0},this.props.onOpen))}},{key:"closePortal",value:function(){this.state.active&&this.setState({active:!1},this.props.onClose)}},{key:"wrapWithPortal",value:function(e){var t=this;return this.state.active?s.a.createElement(v,{node:this.props.node,key:"react-portal",ref:function(e){return t.portalNode=e}},e):null}},{key:"handleOutsideMouseClick",value:function(e){if(this.state.active){var t=this.portalNode.props.node||this.portalNode.defaultNode;!t||t.contains(e.target)||e.button&&0!==e.button||this.closePortal()}}},{key:"handleKeydown",value:function(e){e.keyCode===y&&this.state.active&&this.closePortal()}},{key:"render",value:function(){return this.props.children({openPortal:this.openPortal,closePortal:this.closePortal,portal:this.wrapWithPortal,isOpen:this.state.active})}}]),t}();b.propTypes={children:u.a.func.isRequired,defaultOpen:u.a.bool,node:u.a.any,closeOnEsc:u.a.bool,closeOnOutsideClick:u.a.bool,onOpen:u.a.func,onClose:u.a.func},b.defaultProps={onOpen:function(){},onClose:function(){}};var S=b;n.d(t,"Portal",function(){return v}),n.d(t,"PortalWithState",function(){return S})}])});