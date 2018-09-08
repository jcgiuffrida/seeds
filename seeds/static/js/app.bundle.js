/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/home/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/home/app.js":
/*!************************!*\
  !*** ./js/home/app.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));

__webpack_require__(/*! select2 */ "./node_modules/select2/dist/js/select2.js");

var _utilities = _interopRequireDefault(__webpack_require__(/*! ./utilities.js */ "./js/home/utilities.js"));

var _chart = _interopRequireDefault(__webpack_require__(/*! ./chart.js */ "./js/home/chart.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var home = function (_) {
  function init() {
    _utilities.default.init();

    initSearchBar();

    if (_utilities.default.isPath('dashboard')) {
      var chartPeriod = (0, _jquery.default)('.chart').data('period');
      fetch("/api/trend/?period=".concat(chartPeriod)).then(function (data) {
        return data.json();
      }).then(function (data) {
        return _chart.default.makeChart((0, _jquery.default)('.chart'), data, chartPeriod[0].toUpperCase() + chartPeriod.slice(1));
      });
    }

    if (_utilities.default.isPath('personEdit')) {
      (0, _jquery.default)(function () {
        initSelect2();
      });
    } else if (_utilities.default.isPath('conversationEdit')) {
      (0, _jquery.default)(function () {
        initSelect2();
        var $select = (0, _jquery.default)('select[name="people"]');

        if (_utilities.default.isPath('conversationCreate') && !(0, _jquery.default)('select[name="people"]').val().length) {
          console.log('create');
          (0, _jquery.default)('select[name="people"]').select2('open').select2('focus');
        } else {
          (0, _jquery.default)('input[name="summary"]').select().focus();
        }

        if (['one on one', 'in group'].indexOf((0, _jquery.default)('select[name="mode"]').val()) !== -1) {
          (0, _jquery.default)('input[name="location"]').attr('type', 'text').addClass('form-control');
        }

        (0, _jquery.default)('select[name="mode"]').on('change', function () {
          if (['one on one', 'in group'].indexOf((0, _jquery.default)(this).val()) !== -1) {
            (0, _jquery.default)('input[name="location"]').attr('type', 'text').addClass('form-control');
          } else {
            (0, _jquery.default)('input[name="location"]').attr('type', 'hidden').val('');
          }
        });
      });
    } else if (_utilities.default.isPath('personList') || _utilities.default.isPath('conversationList')) {
      initSelect2();
      (0, _jquery.default)('button.btn-input').on('click', function () {
        var $div = (0, _jquery.default)(this).closest('div'); // Translate buttons into form inputs

        $div.find('button.btn-input').removeClass('btn-secondary').addClass('btn-outline-info');
        (0, _jquery.default)(this).removeClass('btn-outline-info').addClass('btn-secondary');
        $div.find('input').val((0, _jquery.default)(this).data('value'));
        $div.find('button[type="submit"]').removeClass('btn-outline-info').addClass('btn-info');
      });
    }
  }

  function initSelect2() {
    (0, _jquery.default)('select.select2-enable').select2({
      width: '100%'
    });
    (0, _jquery.default)('select.select2-enable').each(function (i, e) {
      var element = (0, _jquery.default)(e);
      var options = {};
      var control = element.select2(options);

      if (control.first().prop("multiple")) {
        control.next().keyup(function (e) {
          if (e.keyCode === 13) // enter
            control.select2("open");
        });
      }
    });
  }

  function initSearchBar() {
    (0, _jquery.default)(".navbar-form .api-search").select2({
      ajax: {
        dataType: 'json',
        delay: 150,
        url: "/api/people/",
        minimumInputLength: 1,
        data: function data(params) {
          params.term = params.term || '';
          return {
            q: params.term.trim(),
            page: params.page || 1
          };
        },
        processResults: function processResults(data, params) {
          params.page = params.page || 1; // add links

          var people = data.people.map(function (p) {
            p.url = '/people/' + p.id;
            p.text = p.name;
            return p;
          });
          return {
            results: people,
            pagination: {
              more: data.more_results
            }
          };
        }
      },
      placeholder: '<i class="fas fa-user"></i> Type to find people',
      escapeMarkup: function escapeMarkup(markup) {
        return markup;
      },
      templateResult: function templateResult(d) {
        if (d.loading) return 'Loading...';
        return d.name;
      },
      language: {
        errorLoading: function errorLoading() {
          return "Loading...";
        },
        noResults: function noResults() {
          return "No results found.";
        }
      }
    });
    (0, _jquery.default)('.navbar-form .api-search').on('change', function (e) {
      // Try to handle CTRL+click or middle mouse click (or apple ⌘)
      // from https://stackoverflow.com/questions/16190455/how-to-detect-controlclick-in-javascript-from-an-onclick-div-attribute
      try {
        if (window.event.ctrlKey || window.event.button == 1 || window.event.metaKey) {
          // Go to link in new tab
          window.open((0, _jquery.default)(this).select2('data')[0].url);
        } else {
          // Disable select2
          (0, _jquery.default)(this).prop('disabled', true); // Go to link

          window.location.href = (0, _jquery.default)(this).select2('data')[0].url;
        }
      } catch (err) {
        (0, _jquery.default)(this).prop('disabled', true);
        window.location.href = (0, _jquery.default)(this).select2('data')[0].url;
      }
    });
  }

  return {
    init: init
  };
}();

home.init();

/***/ }),

/***/ "./js/home/chart.js":
/*!**************************!*\
  !*** ./js/home/chart.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _highcharts = _interopRequireDefault(__webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_) {
  function makeChart($el, data, period) {
    return new _highcharts.default.Chart({
      chart: {
        renderTo: $el[0],
        type: 'area',
        height: 400
      },
      title: {
        text: "Conversations by ".concat(period)
      },
      xAxis: {
        categories: data.dates,
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: 'Conversations'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        area: {
          stacking: 'normal'
        }
      },
      tooltip: {
        split: true
      },
      series: [{
        name: 'Conversations',
        data: data.conversations
      }, {
        name: 'Seeds',
        data: data.seeds
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }

  return {
    makeChart: makeChart
  };
}();

/***/ }),

/***/ "./js/home/utilities.js":
/*!******************************!*\
  !*** ./js/home/utilities.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

module.exports = function (_) {
  function renderActiveTab() {
    if (isPath('people')) {
      $('.navbar-nav .people').addClass('active');
    } else if (isPath('conversations')) {
      $('.navbar-nav .conversations').addClass('active');
    }
  }

  var regex = {
    dashboard: /^\/dashboard\//,
    people: /^\/people\//,
    personList: /^\/people\/$/,
    conversations: /^\/conversations\//,
    conversationList: /^\/conversations\/$/,
    personDetail: /^\/people\/[\w-]+\//,
    personEdit: /^\/people\/([\w-]+\/)?(edit|add)\//,
    conversationEdit: /^\/conversations\/(\w{3,}\/)?(edit|add)\//,
    conversationCreate: /^\/conversations\/add\//
  };

  function isPath(page) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.pathname;
    return regex[page].test(path);
  }

  function init() {
    renderActiveTab();
  }

  return {
    init: init,
    isPath: isPath
  };
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/highcharts/highcharts.js":
/*!***********************************************!*\
  !*** ./node_modules/highcharts/highcharts.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 Highcharts JS v6.1.2 (2018-08-31)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(T,K){"object"===typeof module&&module.exports?module.exports=T.document?K(T):K: true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return K(T)}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined})("undefined"!==typeof window?window:this,function(T){var K=function(){var a="undefined"===typeof T?window:T,C=a.document,D=a.navigator&&a.navigator.userAgent||"",E=C&&C.createElementNS&&!!C.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,m=/(edge|msie|trident)/i.test(D)&&!a.opera,h=-1!==D.indexOf("Firefox"),
f=-1!==D.indexOf("Chrome"),r=h&&4>parseInt(D.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",version:"6.1.2",deg2rad:2*Math.PI/360,doc:C,hasBidiBug:r,hasTouch:C&&void 0!==C.documentElement.ontouchstart,isMS:m,isWebKit:-1!==D.indexOf("AppleWebKit"),isFirefox:h,isChrome:f,isSafari:!f&&-1!==D.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(D),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:E,win:a,marginNames:["plotTop",
"marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){a.timers=[];var C=a.charts,D=a.doc,E=a.win;a.error=function(m,h){m=a.isNumber(m)?"Highcharts error #"+m+": www.highcharts.com/errors/"+m:m;if(h)throw Error(m);E.console&&console.log(m)};a.Fx=function(a,h,f){this.options=h;this.elem=a;this.prop=f};a.Fx.prototype={dSetter:function(){var a=this.paths[0],h=this.paths[1],f=[],r=this.now,y=a.length,q;if(1===r)f=this.toD;else if(y===h.length&&1>r)for(;y--;)q=parseFloat(a[y]),
f[y]=isNaN(q)?h[y]:r*parseFloat(h[y]-q)+q;else f=h;this.elem.attr("d",f,null,!0)},update:function(){var a=this.elem,h=this.prop,f=this.now,r=this.options.step;if(this[h+"Setter"])this[h+"Setter"]();else a.attr?a.element&&a.attr(h,f,null,!0):a.style[h]=f+this.unit;r&&r.call(a,f,this)},run:function(m,h,f){var r=this,y=r.options,q=function(a){return q.stopped?!1:r.step(a)},w=E.requestAnimationFrame||function(a){setTimeout(a,13)},e=function(){for(var c=0;c<a.timers.length;c++)a.timers[c]()||a.timers.splice(c--,
1);a.timers.length&&w(e)};m!==h||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=m,this.end=h,this.unit=f,this.now=this.start,this.pos=0,q.elem=this.elem,q.prop=this.prop,q()&&1===a.timers.push(q)&&w(e)):(delete y.curAnim[this.prop],y.complete&&0===a.keys(y.curAnim).length&&y.complete.call(this.elem))},step:function(m){var h=+new Date,f,r=this.options,y=this.elem,q=r.complete,w=r.duration,e=r.curAnim;y.attr&&!y.element?m=!1:m||h>=w+this.startTime?(this.now=this.end,this.pos=
1,this.update(),f=e[this.prop]=!0,a.objectEach(e,function(a){!0!==a&&(f=!1)}),f&&q&&q.call(y),m=!1):(this.pos=r.easing((h-this.startTime)/w),this.now=this.start+(this.end-this.start)*this.pos,this.update(),m=!0);return m},initPath:function(m,h,f){function r(a){var d,k;for(b=a.length;b--;)d="M"===a[b]||"L"===a[b],k=/[a-zA-Z]/.test(a[b+3]),d&&k&&a.splice(b+1,0,a[b+1],a[b+2],a[b+1],a[b+2])}function y(a,d){for(;a.length<k;){a[0]=d[k-a.length];var c=a.slice(0,z);[].splice.apply(a,[0,0].concat(c));u&&(c=
a.slice(a.length-z),[].splice.apply(a,[a.length,0].concat(c)),b--)}a[0]="M"}function q(a,b){for(var c=(k-a.length)/z;0<c&&c--;)d=a.slice().splice(a.length/p-z,z*p),d[0]=b[k-z-c*z],l&&(d[z-6]=d[z-2],d[z-5]=d[z-1]),[].splice.apply(a,[a.length/p,0].concat(d)),u&&c--}h=h||"";var w,e=m.startX,c=m.endX,l=-1<h.indexOf("C"),z=l?7:3,k,d,b;h=h.split(" ");f=f.slice();var u=m.isArea,p=u?2:1,H;l&&(r(h),r(f));if(e&&c){for(b=0;b<e.length;b++)if(e[b]===c[0]){w=b;break}else if(e[0]===c[c.length-e.length+b]){w=b;H=
!0;break}void 0===w&&(h=[])}h.length&&a.isNumber(w)&&(k=f.length+w*p*z,H?(y(h,f),q(f,h)):(y(f,h),q(h,f)));return[h,f]},fillSetter:function(){a.Fx.prototype.strokeSetter.apply(this,arguments)},strokeSetter:function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)}};a.merge=function(){var m,h=arguments,f,r={},y=function(f,m){"object"!==typeof f&&(f={});a.objectEach(m,function(e,c){!a.isObject(e,!0)||a.isClass(e)||a.isDOMElement(e)?f[c]=m[c]:f[c]=y(f[c]||{},
e)});return f};!0===h[0]&&(r=h[1],h=Array.prototype.slice.call(h,2));f=h.length;for(m=0;m<f;m++)r=y(r,h[m]);return r};a.pInt=function(a,h){return parseInt(a,h||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(m,h){return!!m&&"object"===typeof m&&(!h||!a.isArray(m))};a.isDOMElement=function(m){return a.isObject(m)&&"number"===typeof m.nodeType};a.isClass=function(m){var h=
m&&m.constructor;return!(!a.isObject(m,!0)||a.isDOMElement(m)||!h||!h.name||"Object"===h.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a};a.erase=function(a,h){for(var f=a.length;f--;)if(a[f]===h){a.splice(f,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(m,h,f){var r;a.isString(h)?a.defined(f)?m.setAttribute(h,f):m&&m.getAttribute&&((r=m.getAttribute(h))||"class"!==h||(r=m.getAttribute(h+"Name"))):a.defined(h)&&a.isObject(h)&&
a.objectEach(h,function(a,f){m.setAttribute(f,a)});return r};a.splat=function(m){return a.isArray(m)?m:[m]};a.syncTimeout=function(a,h,f){if(h)return setTimeout(a,h,f);a.call(0,f)};a.clearTimeout=function(m){a.defined(m)&&clearTimeout(m)};a.extend=function(a,h){var f;a||(a={});for(f in h)a[f]=h[f];return a};a.pick=function(){var a=arguments,h,f,r=a.length;for(h=0;h<r;h++)if(f=a[h],void 0!==f&&null!==f)return f};a.css=function(m,h){a.isMS&&!a.svg&&h&&void 0!==h.opacity&&(h.filter="alpha(opacity\x3d"+
100*h.opacity+")");a.extend(m.style,h)};a.createElement=function(m,h,f,r,y){m=D.createElement(m);var q=a.css;h&&a.extend(m,h);y&&q(m,{padding:0,border:"none",margin:0});f&&q(m,f);r&&r.appendChild(m);return m};a.extendClass=function(m,h){var f=function(){};f.prototype=new m;a.extend(f.prototype,h);return f};a.pad=function(a,h,f){return Array((h||2)+1-String(a).replace("-","").length).join(f||0)+a};a.relativeLength=function(a,h,f){return/%$/.test(a)?h*parseFloat(a)/100+(f||0):parseFloat(a)};a.wrap=
function(a,h,f){var m=a[h];a[h]=function(){var a=Array.prototype.slice.call(arguments),q=arguments,w=this;w.proceed=function(){m.apply(w,arguments.length?arguments:q)};a.unshift(m);a=f.apply(this,a);w.proceed=null;return a}};a.formatSingle=function(m,h,f){var r=/\.([0-9])/,y=a.defaultOptions.lang;/f$/.test(m)?(f=(f=m.match(r))?f[1]:-1,null!==h&&(h=a.numberFormat(h,f,y.decimalPoint,-1<m.indexOf(",")?y.thousandsSep:""))):h=(f||a.time).dateFormat(m,h);return h};a.format=function(m,h,f){for(var r="{",
y=!1,q,w,e,c,l=[],z;m;){r=m.indexOf(r);if(-1===r)break;q=m.slice(0,r);if(y){q=q.split(":");w=q.shift().split(".");c=w.length;z=h;for(e=0;e<c;e++)z&&(z=z[w[e]]);q.length&&(z=a.formatSingle(q.join(":"),z,f));l.push(z)}else l.push(q);m=m.slice(r+1);r=(y=!y)?"}":"{"}l.push(m);return l.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(m,h,f,r,y){var q,w=m;f=a.pick(f,1);q=m/f;h||(h=y?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],
!1===r&&(1===f?h=a.grep(h,function(a){return 0===a%1}):.1>=f&&(h=[1/f])));for(r=0;r<h.length&&!(w=h[r],y&&w*f>=m||!y&&q<=(h[r]+(h[r+1]||h[r]))/2);r++);return w=a.correctFloat(w*f,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,h){var f=a.length,m,y;for(y=0;y<f;y++)a[y].safeI=y;a.sort(function(a,f){m=h(a,f);return 0===m?a.safeI-f.safeI:m});for(y=0;y<f;y++)delete a[y].safeI};a.arrayMin=function(a){for(var h=a.length,f=a[0];h--;)a[h]<f&&(f=a[h]);return f};a.arrayMax=function(a){for(var h=
a.length,f=a[0];h--;)a[h]>f&&(f=a[h]);return f};a.destroyObjectProperties=function(m,h){a.objectEach(m,function(a,r){a&&a!==h&&a.destroy&&a.destroy();delete m[r]})};a.discardElement=function(m){var h=a.garbageBin;h||(h=a.createElement("div"));m&&h.appendChild(m);h.innerHTML=""};a.correctFloat=function(a,h){return parseFloat(a.toPrecision(h||14))};a.setAnimation=function(m,h){h.renderer.globalAnimation=a.pick(m,h.options.chart.animation,!0)};a.animObject=function(m){return a.isObject(m)?a.merge(m):
{duration:m?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(m,h,f,r){m=+m||0;h=+h;var y=a.defaultOptions.lang,q=(m.toString().split(".")[1]||"").split("e")[0].length,w,e,c=m.toString().split("e");-1===h?h=Math.min(q,20):a.isNumber(h)?h&&c[1]&&0>c[1]&&(w=h+ +c[1],0<=w?(c[0]=(+c[0]).toExponential(w).split("e")[0],h=w):(c[0]=c[0].split(".")[0]||0,m=20>h?(c[0]*Math.pow(10,c[1])).toFixed(h):0,c[1]=0)):h=2;e=(Math.abs(c[1]?
c[0]:m)+Math.pow(10,-Math.max(h,q)-1)).toFixed(h);q=String(a.pInt(e));w=3<q.length?q.length%3:0;f=a.pick(f,y.decimalPoint);r=a.pick(r,y.thousandsSep);m=(0>m?"-":"")+(w?q.substr(0,w)+r:"");m+=q.substr(w).replace(/(\d{3})(?=\d)/g,"$1"+r);h&&(m+=f+e.slice(-h));c[1]&&0!==+m&&(m+="e"+c[1]);return m};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(m,h,f){if("width"===h)return Math.max(0,Math.min(m.offsetWidth,m.scrollWidth)-a.getStyle(m,"padding-left")-a.getStyle(m,
"padding-right"));if("height"===h)return Math.max(0,Math.min(m.offsetHeight,m.scrollHeight)-a.getStyle(m,"padding-top")-a.getStyle(m,"padding-bottom"));E.getComputedStyle||a.error(27,!0);if(m=E.getComputedStyle(m,void 0))m=m.getPropertyValue(h),a.pick(f,"opacity"!==h)&&(m=a.pInt(m));return m};a.inArray=function(m,h,f){return(a.indexOfPolyfill||Array.prototype.indexOf).call(h,m,f)};a.grep=function(m,h){return(a.filterPolyfill||Array.prototype.filter).call(m,h)};a.find=Array.prototype.find?function(a,
h){return a.find(h)}:function(a,h){var f,r=a.length;for(f=0;f<r;f++)if(h(a[f],f))return a[f]};a.some=function(m,h,f){return(a.somePolyfill||Array.prototype.some).call(m,h,f)};a.map=function(a,h){for(var f=[],r=0,y=a.length;r<y;r++)f[r]=h.call(a[r],a[r],r,a);return f};a.keys=function(m){return(a.keysPolyfill||Object.keys).call(void 0,m)};a.reduce=function(m,h,f){return(a.reducePolyfill||Array.prototype.reduce).apply(m,2<arguments.length?[h,f]:[h])};a.offset=function(a){var h=D.documentElement;a=a.parentElement||
a.parentNode?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(E.pageYOffset||h.scrollTop)-(h.clientTop||0),left:a.left+(E.pageXOffset||h.scrollLeft)-(h.clientLeft||0)}};a.stop=function(m,h){for(var f=a.timers.length;f--;)a.timers[f].elem!==m||h&&h!==a.timers[f].prop||(a.timers[f].stopped=!0)};a.each=function(m,h,f){return(a.forEachPolyfill||Array.prototype.forEach).call(m,h,f)};a.objectEach=function(a,h,f){for(var r in a)a.hasOwnProperty(r)&&h.call(f||a[r],a[r],r,a)};a.addEvent=function(m,
h,f,r){var y,q=m.addEventListener||a.addEventListenerPolyfill;y="function"===typeof m&&m.prototype?m.prototype.protoEvents=m.prototype.protoEvents||{}:m.hcEvents=m.hcEvents||{};a.Point&&m instanceof a.Point&&m.series&&m.series.chart&&(m.series.chart.runTrackerClick=!0);q&&q.call(m,h,f,!1);y[h]||(y[h]=[]);y[h].push(f);r&&a.isNumber(r.order)&&(f.order=r.order,y[h].sort(function(a,e){return a.order-e.order}));return function(){a.removeEvent(m,h,f)}};a.removeEvent=function(m,h,f){function r(e,c){var l=
m.removeEventListener||a.removeEventListenerPolyfill;l&&l.call(m,e,c,!1)}function y(e){var c,l;m.nodeName&&(h?(c={},c[h]=!0):c=e,a.objectEach(c,function(a,k){if(e[k])for(l=e[k].length;l--;)r(k,e[k][l])}))}var q,w;a.each(["protoEvents","hcEvents"],function(e){var c=m[e];c&&(h?(q=c[h]||[],f?(w=a.inArray(f,q),-1<w&&(q.splice(w,1),c[h]=q),r(h,f)):(y(c),c[h]=[])):(y(c),m[e]={}))})};a.fireEvent=function(m,h,f,r){var y,q,w,e,c;f=f||{};D.createEvent&&(m.dispatchEvent||m.fireEvent)?(y=D.createEvent("Events"),
y.initEvent(h,!0,!0),a.extend(y,f),m.dispatchEvent?m.dispatchEvent(y):m.fireEvent(h,y)):a.each(["protoEvents","hcEvents"],function(l){if(m[l])for(q=m[l][h]||[],w=q.length,f.target||a.extend(f,{preventDefault:function(){f.defaultPrevented=!0},target:m,type:h}),e=0;e<w;e++)(c=q[e])&&!1===c.call(m,f)&&f.preventDefault()});r&&!f.defaultPrevented&&r.call(m,f)};a.animate=function(m,h,f){var r,y="",q,w,e;a.isObject(f)||(e=arguments,f={duration:e[2],easing:e[3],complete:e[4]});a.isNumber(f.duration)||(f.duration=
400);f.easing="function"===typeof f.easing?f.easing:Math[f.easing]||Math.easeInOutSine;f.curAnim=a.merge(h);a.objectEach(h,function(c,e){a.stop(m,e);w=new a.Fx(m,f,e);q=null;"d"===e?(w.paths=w.initPath(m,m.d,h.d),w.toD=h.d,r=0,q=1):m.attr?r=m.attr(e):(r=parseFloat(a.getStyle(m,e))||0,"opacity"!==e&&(y="px"));q||(q=c);q&&q.match&&q.match("px")&&(q=q.replace(/px/g,""));w.run(r,q,y)})};a.seriesType=function(m,h,f,r,y){var q=a.getOptions(),w=a.seriesTypes;q.plotOptions[m]=a.merge(q.plotOptions[h],f);
w[m]=a.extendClass(w[h]||function(){},r);w[m].prototype.type=m;y&&(w[m].prototype.pointClass=a.extendClass(a.Point,y));return w[m]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),h=0;return function(){return"highcharts-"+a+"-"+h++}}();E.jQuery&&(E.jQuery.fn.highcharts=function(){var m=[].slice.call(arguments);if(this[0])return m[0]?(new (a[a.isString(m[0])?m.shift():"Chart"])(this[0],m[0],m[1]),this):C[a.attr(this[0],"data-highcharts-chart")]})})(K);(function(a){var C=a.each,
D=a.isNumber,E=a.map,m=a.merge,h=a.pInt;a.Color=function(f){if(!(this instanceof a.Color))return new a.Color(f);this.init(f)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[h(a[1]),h(a[2]),h(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[h(a[1]),h(a[2]),h(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(f){var h,
y,q,w;if((this.input=f=this.names[f&&f.toLowerCase?f.toLowerCase():""]||f)&&f.stops)this.stops=E(f.stops,function(e){return new a.Color(e[1])});else if(f&&f.charAt&&"#"===f.charAt()&&(h=f.length,f=parseInt(f.substr(1),16),7===h?y=[(f&16711680)>>16,(f&65280)>>8,f&255,1]:4===h&&(y=[(f&3840)>>4|(f&3840)>>8,(f&240)>>4|f&240,(f&15)<<4|f&15,1])),!y)for(q=this.parsers.length;q--&&!y;)w=this.parsers[q],(h=w.regex.exec(f))&&(y=w.parse(h));this.rgba=y||[]},get:function(a){var f=this.input,h=this.rgba,q;this.stops?
(q=m(f),q.stops=[].concat(q.stops),C(this.stops,function(f,e){q.stops[e]=[q.stops[e][0],f.get(a)]})):q=h&&D(h[0])?"rgb"===a||!a&&1===h[3]?"rgb("+h[0]+","+h[1]+","+h[2]+")":"a"===a?h[3]:"rgba("+h.join(",")+")":f;return q},brighten:function(a){var f,y=this.rgba;if(this.stops)C(this.stops,function(f){f.brighten(a)});else if(D(a)&&0!==a)for(f=0;3>f;f++)y[f]+=h(255*a),0>y[f]&&(y[f]=0),255<y[f]&&(y[f]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,h){var f=this.rgba,
q=a.rgba;q.length&&f&&f.length?(a=1!==q[3]||1!==f[3],h=(a?"rgba(":"rgb(")+Math.round(q[0]+(f[0]-q[0])*(1-h))+","+Math.round(q[1]+(f[1]-q[1])*(1-h))+","+Math.round(q[2]+(f[2]-q[2])*(1-h))+(a?","+(q[3]+(f[3]-q[3])*(1-h)):"")+")"):h=a.input||"none";return h}};a.color=function(f){return new a.Color(f)}})(K);(function(a){var C,D,E=a.addEvent,m=a.animate,h=a.attr,f=a.charts,r=a.color,y=a.css,q=a.createElement,w=a.defined,e=a.deg2rad,c=a.destroyObjectProperties,l=a.doc,z=a.each,k=a.extend,d=a.erase,b=a.grep,
u=a.hasTouch,p=a.inArray,H=a.isArray,t=a.isFirefox,L=a.isMS,x=a.isObject,I=a.isString,n=a.isWebKit,G=a.merge,B=a.noop,M=a.objectEach,F=a.pick,g=a.pInt,v=a.removeEvent,P=a.stop,Q=a.svg,J=a.SVG_NS,O=a.symbolSizes,N=a.win;C=a.SVGElement=function(){return this};k(C.prototype,{opacity:1,SVG_NS:J,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),init:function(a,g){this.element="span"===g?q(g):l.createElementNS(this.SVG_NS,
g);this.renderer=a},animate:function(A,g,b){g=a.animObject(F(g,this.renderer.globalAnimation,!0));0!==g.duration?(b&&(g.complete=b),m(this,A,g)):(this.attr(A,null,b),g.step&&g.step.call(this));return this},complexColor:function(A,g,b){var d=this.renderer,v,k,c,n,e,J,l,B,u,R,p,t=[],x;a.fireEvent(this.renderer,"complexColor",{args:arguments},function(){A.radialGradient?k="radialGradient":A.linearGradient&&(k="linearGradient");k&&(c=A[k],e=d.gradients,l=A.stops,R=b.radialReference,H(c)&&(A[k]=c={x1:c[0],
y1:c[1],x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===k&&R&&!w(c.gradientUnits)&&(n=c,c=G(c,d.getRadialAttr(R,n),{gradientUnits:"userSpaceOnUse"})),M(c,function(a,A){"id"!==A&&t.push(A,a)}),M(l,function(a){t.push(a)}),t=t.join(","),e[t]?p=e[t].attr("id"):(c.id=p=a.uniqueKey(),e[t]=J=d.createElement(k).attr(c).add(d.defs),J.radAttr=n,J.stops=[],z(l,function(A){0===A[1].indexOf("rgba")?(v=a.color(A[1]),B=v.get("rgb"),u=v.get("a")):(B=A[1],u=1);A=d.createElement("stop").attr({offset:A[0],
"stop-color":B,"stop-opacity":u}).add(J);J.stops.push(A)})),x="url("+d.url+"#"+p+")",b.setAttribute(g,x),b.gradient=t,A.toString=function(){return x})})},applyTextOutline:function(A){var g=this.element,b,v,k,c,n;-1!==A.indexOf("contrast")&&(A=A.replace(/contrast/g,this.renderer.getContrast(g.style.fill)));A=A.split(" ");v=A[A.length-1];if((k=A[0])&&"none"!==k&&a.svg){this.fakeTS=!0;A=[].slice.call(g.getElementsByTagName("tspan"));this.ySetter=this.xSetter;k=k.replace(/(^[\d\.]+)(.*?)$/g,function(a,
A,g){return 2*A+g});for(n=A.length;n--;)b=A[n],"highcharts-text-outline"===b.getAttribute("class")&&d(A,g.removeChild(b));c=g.firstChild;z(A,function(a,A){0===A&&(a.setAttribute("x",g.getAttribute("x")),A=g.getAttribute("y"),a.setAttribute("y",A||0),null===A&&g.setAttribute("y",0));a=a.cloneNode(1);h(a,{"class":"highcharts-text-outline",fill:v,stroke:v,"stroke-width":k,"stroke-linejoin":"round"});g.insertBefore(a,c)})}},attr:function(a,g,b,d){var A,v=this.element,k,c=this,n,J;"string"===typeof a&&
void 0!==g&&(A=a,a={},a[A]=g);"string"===typeof a?c=(this[a+"Getter"]||this._defaultGetter).call(this,a,v):(M(a,function(A,g){n=!1;d||P(this,g);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(g)&&(k||(this.symbolAttr(a),k=!0),n=!0);!this.rotation||"x"!==g&&"y"!==g||(this.doTransform=!0);n||(J=this[g+"Setter"]||this._defaultSetter,J.call(this,A,g,v),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(g)&&this.updateShadows(g,A,J))},this),this.afterSetters());
b&&b.call(this);return c},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,g,b){for(var A=this.shadows,d=A.length;d--;)b.call(A[d],"height"===a?Math.max(g-(A[d].cutHeight||0),0):"d"===a?this.d:g,a,A[d])},addClass:function(a,g){var A=this.attr("class")||"";-1===A.indexOf(a)&&(g||(a=(A+(A?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==p(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",
(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var A=this;z("x y r start end width height innerR anchorX anchorY".split(" "),function(g){A[g]=F(a[g],A[g])});A.attr({d:A.renderer.symbols[A.symbolName](A.x,A.y,A.width,A.height,A)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,g){var A;g=g||a.strokeWidth||0;A=Math.round(g)%2/2;a.x=Math.floor(a.x||this.x||0)+A;a.y=Math.floor(a.y||this.y||0)+A;a.width=Math.floor((a.width||
this.width||0)-2*A);a.height=Math.floor((a.height||this.height||0)-2*A);w(a.strokeWidth)&&(a.strokeWidth=g);return a},css:function(a){var A=this.styles,b={},d=this.element,v,c="",n,J=!A,e=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);A&&M(a,function(a,g){a!==A[g]&&(b[g]=a,J=!0)});J&&(A&&(a=k(A,b)),a&&(null===a.width||"auto"===a.width?delete this.textWidth:"text"===d.nodeName.toLowerCase()&&a.width&&(v=this.textWidth=g(a.width))),this.styles=a,v&&!Q&&this.renderer.forExport&&
delete a.width,d.namespaceURI===this.SVG_NS?(n=function(a,A){return"-"+A.toLowerCase()},M(a,function(a,A){-1===p(A,e)&&(c+=A.replace(/([A-Z])/g,n)+":"+a+";")}),c&&h(d,"style",c)):y(d,a),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,g){var A=this,b=A.element;u&&"click"===a?(b.ontouchstart=function(a){A.touchEventFired=Date.now();a.preventDefault();
g.call(b,a)},b.onclick=function(a){(-1===N.navigator.userAgent.indexOf("Android")||1100<Date.now()-(A.touchEventFired||0))&&g.call(b,a)}):b["on"+a]=g;return this},setRadialReference:function(a){var A=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;A&&A.radAttr&&A.animate(this.renderer.getRadialAttr(a,A.radAttr));return this},translate:function(a,g){return this.attr({translateX:a,translateY:g})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=
this.translateX||0,g=this.translateY||0,b=this.scaleX,d=this.scaleY,v=this.inverted,c=this.rotation,k=this.matrix,n=this.element;v&&(a+=this.width,g+=this.height);a=["translate("+a+","+g+")"];w(k)&&a.push("matrix("+k.join(",")+")");v?a.push("rotate(90) scale(-1,1)"):c&&a.push("rotate("+c+" "+F(this.rotationOriginX,n.getAttribute("x"),0)+" "+F(this.rotationOriginY,n.getAttribute("y")||0)+")");(w(b)||w(d))&&a.push("scale("+F(b,1)+" "+F(d,1)+")");a.length&&n.setAttribute("transform",a.join(" "))},toFront:function(){var a=
this.element;a.parentNode.appendChild(a);return this},align:function(a,g,b){var A,v,c,k,n={};v=this.renderer;c=v.alignedObjects;var J,e;if(a){if(this.alignOptions=a,this.alignByTranslate=g,!b||I(b))this.alignTo=A=b||"renderer",d(c,this),c.push(this),b=null}else a=this.alignOptions,g=this.alignByTranslate,A=this.alignTo;b=F(b,v[A],v);A=a.align;v=a.verticalAlign;c=(b.x||0)+(a.x||0);k=(b.y||0)+(a.y||0);"right"===A?J=1:"center"===A&&(J=2);J&&(c+=(b.width-(a.width||0))/J);n[g?"translateX":"x"]=Math.round(c);
"bottom"===v?e=1:"middle"===v&&(e=2);e&&(k+=(b.height-(a.height||0))/e);n[g?"translateY":"y"]=Math.round(k);this[this.placed?"animate":"attr"](n);this.placed=!0;this.alignAttr=n;return this},getBBox:function(a,g){var A,b=this.renderer,d,v=this.element,c=this.styles,n,J=this.textStr,l,B=b.cache,u=b.cacheKeys,p;g=F(g,this.rotation);d=g*e;n=c&&c.fontSize;w(J)&&(p=J.toString(),-1===p.indexOf("\x3c")&&(p=p.replace(/[0-9]/g,"0")),p+=["",g||0,n,this.textWidth,c&&c.textOverflow].join());p&&!a&&(A=B[p]);if(!A){if(v.namespaceURI===
this.SVG_NS||b.forExport){try{(l=this.fakeTS&&function(a){z(v.querySelectorAll(".highcharts-text-outline"),function(A){A.style.display=a})})&&l("none"),A=v.getBBox?k({},v.getBBox()):{width:v.offsetWidth,height:v.offsetHeight},l&&l("")}catch(W){}if(!A||0>A.width)A={width:0,height:0}}else A=this.htmlGetBBox();b.isSVG&&(a=A.width,b=A.height,c&&"11px"===c.fontSize&&17===Math.round(b)&&(A.height=b=14),g&&(A.width=Math.abs(b*Math.sin(d))+Math.abs(a*Math.cos(d)),A.height=Math.abs(b*Math.cos(d))+Math.abs(a*
Math.sin(d))));if(p&&0<A.height){for(;250<u.length;)delete B[u.shift()];B[p]||u.push(p);B[p]=A}}return A},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var A=this;A.animate({opacity:0},{duration:a||150,complete:function(){A.attr({y:-9999})}})},add:function(a){var A=this.renderer,g=this.element,b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&A.buildText(this);this.added=
!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:A.box).appendChild(g);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var A=a.parentNode;A&&A.removeChild(a)},destroy:function(){var a=this,g=a.element||{},b=a.renderer.isSVG&&"SPAN"===g.nodeName&&a.parentGroup,v=g.ownerSVGElement,c=a.clipPath;g.onclick=g.onmouseout=g.onmouseover=g.onmousemove=g.point=null;P(a);c&&v&&(z(v.querySelectorAll("[clip-path],[CLIP-PATH]"),function(a){var g=a.getAttribute("clip-path"),
A=c.element.id;(-1<g.indexOf("(#"+A+")")||-1<g.indexOf('("#'+A+'")'))&&a.removeAttribute("clip-path")}),a.clipPath=c.destroy());if(a.stops){for(v=0;v<a.stops.length;v++)a.stops[v]=a.stops[v].destroy();a.stops=null}a.safeRemoveChild(g);for(a.destroyShadows();b&&b.div&&0===b.div.childNodes.length;)g=b.parentGroup,a.safeRemoveChild(b.div),delete b.div,b=g;a.alignTo&&d(a.renderer.alignedObjects,a);M(a,function(g,A){delete a[A]});return null},shadow:function(a,g,b){var A=[],d,v,c=this.element,k,n,J,e;
if(!a)this.destroyShadows();else if(!this.shadows){n=F(a.width,3);J=(a.opacity||.15)/n;e=this.parentInverted?"(-1,-1)":"("+F(a.offsetX,1)+", "+F(a.offsetY,1)+")";for(d=1;d<=n;d++)v=c.cloneNode(0),k=2*n+1-2*d,h(v,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":J*d,"stroke-width":k,transform:"translate"+e,fill:"none"}),b&&(h(v,"height",Math.max(h(v,"height")-k,0)),v.cutHeight=k),g?g.element.appendChild(v):c.parentNode&&c.parentNode.insertBefore(v,c),A.push(v);this.shadows=A}return this},
destroyShadows:function(){z(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=F(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,g,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[g]!==a&&(b.setAttribute(g,
a),this[g]=a)},dashstyleSetter:function(a){var b,A=this["stroke-width"];"inherit"===A&&(A=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=g(a[b])*A;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.alignValue=
a;this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,g,b){this[g]=a;b.setAttribute(g,a)},titleSetter:function(a){var g=this.element.getElementsByTagName("title")[0];g||(g=l.createElementNS(this.SVG_NS,"title"),this.element.appendChild(g));g.firstChild&&g.removeChild(g.firstChild);g.appendChild(l.createTextNode(String(F(a),"").replace(/<[^>]*>/g,"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))},textSetter:function(a){a!==this.textStr&&
(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,g,b){"string"===typeof a?b.setAttribute(g,a):a&&this.complexColor(a,g,b)},visibilitySetter:function(a,g,b){"inherit"===a?b.removeAttribute(g):this[g]!==a&&b.setAttribute(g,a);this[g]=a},zIndexSetter:function(a,b){var d=this.renderer,v=this.parentGroup,A=(v||d).element||d.box,c,k=this.element,n,J,d=A===d.box;c=this.added;var e;w(a)?(k.setAttribute("data-z-index",a),a=+a,this[b]===a&&(c=!1)):w(this[b])&&
k.removeAttribute("data-z-index");this[b]=a;if(c){(a=this.zIndex)&&v&&(v.handleZ=!0);b=A.childNodes;for(e=b.length-1;0<=e&&!n;e--)if(v=b[e],c=v.getAttribute("data-z-index"),J=!w(c),v!==k)if(0>a&&J&&!d&&!e)A.insertBefore(k,b[e]),n=!0;else if(g(c)<=a||J&&(!w(a)||0<=a))A.insertBefore(k,b[e+1]||null),n=!0;n||(A.insertBefore(k,b[d?3:0]||null),n=!0)}return n},_defaultSetter:function(a,g,b){b.setAttribute(g,a)}});C.prototype.yGetter=C.prototype.xGetter;C.prototype.translateXSetter=C.prototype.translateYSetter=
C.prototype.rotationSetter=C.prototype.verticalAlignSetter=C.prototype.rotationOriginXSetter=C.prototype.rotationOriginYSetter=C.prototype.scaleXSetter=C.prototype.scaleYSetter=C.prototype.matrixSetter=function(a,g){this[g]=a;this.doTransform=!0};C.prototype["stroke-widthSetter"]=C.prototype.strokeSetter=function(a,g,b){this[g]=a;this.stroke&&this["stroke-width"]?(C.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===
g&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),this.hasStroke=!1)};D=a.SVGRenderer=function(){this.init.apply(this,arguments)};k(D.prototype,{Element:C,SVG_NS:J,init:function(a,g,b,d,v,c){var A;d=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(d));A=d.element;a.appendChild(A);h(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&h(A,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=A;this.boxWrapper=d;this.alignedObjects=[];this.url=(t||n)&&l.getElementsByTagName("base").length?
N.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highcharts 6.1.2"));this.defs=this.createElement("defs").add();this.allowHTML=c;this.forExport=v;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(g,b,!1);var k;t&&a.getBoundingClientRect&&(g=function(){y(a,{left:0,top:0});k=a.getBoundingClientRect();y(a,{left:Math.ceil(k.left)-k.left+
"px",top:Math.ceil(k.top)-k.top+"px"})},g(),this.unSubPixelFix=E(N,"resize",g))},getStyle:function(a){return this.style=k({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();c(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());
this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var g=new this.Element;g.init(this,a);return g},draw:B,getRadialAttr:function(a,g){return{cx:a[0]-a[2]/2+g.cx*a[2],cy:a[1]-a[2]/2+g.cy*a[2],r:g.r*a[2]}},getSpanWidth:function(a){return a.getBBox(!0).width},applyEllipsis:function(a,g,b,d){var v=a.rotation,c=b,k,A=0,n=b.length,J=function(a){g.removeChild(g.firstChild);a&&g.appendChild(l.createTextNode(a))},e;a.rotation=0;c=this.getSpanWidth(a,g);if(e=
c>d){for(;A<=n;)k=Math.ceil((A+n)/2),c=b.substring(0,k)+"\u2026",J(c),c=this.getSpanWidth(a,g),A===n?A=n+1:c>d?n=k-1:A=k;0===n&&J("")}a.rotation=v;return e},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var d=a.element,v=this,c=v.forExport,k=F(a.textStr,"").toString(),A=-1!==k.indexOf("\x3c"),n=d.childNodes,e,B=h(d,"x"),u=a.styles,t=a.textWidth,G=u&&u.lineHeight,x=u&&u.textOutline,f=u&&"ellipsis"===u.textOverflow,P=u&&"nowrap"===
u.whiteSpace,O=u&&u.fontSize,w,q,H=n.length,u=t&&!a.added&&this.box,I=function(a){var b;b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:O||v.style.fontSize||12;return G?g(G):v.fontMetrics(b,a.getAttribute("style")?a:d).h},N=function(a,g){M(v.escapes,function(b,d){g&&-1!==p(b,g)||(a=a.toString().replace(new RegExp(b,"g"),d))});return a},m=function(a,g){var b;b=a.indexOf("\x3c");a=a.substring(b,a.indexOf("\x3e")-b);b=a.indexOf(g+"\x3d");if(-1!==b&&(b=b+g.length+1,g=a.charAt(b),'"'===g||"'"===
g))return a=a.substring(b+1),a.substring(0,a.indexOf(g))};w=[k,f,P,G,x,O,t].join();if(w!==a.textCache){for(a.textCache=w;H--;)d.removeChild(n[H]);A||x||f||t||-1!==k.indexOf(" ")?(u&&u.appendChild(d),k=A?k.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[k],k=b(k,function(a){return""!==a}),z(k,function(g,b){var k,A=0;g=g.replace(/^\s+|\s+$/g,
"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");k=g.split("|||");z(k,function(g){if(""!==g||1===k.length){var n={},u=l.createElementNS(v.SVG_NS,"tspan"),p,G;(p=m(g,"class"))&&h(u,"class",p);if(p=m(g,"style"))p=p.replace(/(;| |^)color([ :])/,"$1fill$2"),h(u,"style",p);(G=m(g,"href"))&&!c&&(h(u,"onclick",'location.href\x3d"'+G+'"'),h(u,"class","highcharts-anchor"),y(u,{cursor:"pointer"}));g=N(g.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==g){u.appendChild(l.createTextNode(g));
A?n.dx=0:b&&null!==B&&(n.x=B);h(u,n);d.appendChild(u);!A&&q&&(!Q&&c&&y(u,{display:"block"}),h(u,"dy",I(u)));if(t){n=g.replace(/([^\^])-/g,"$1- ").split(" ");G=1<k.length||b||1<n.length&&!P;var x=[],z,O=I(u),w=a.rotation;for(f&&(e=v.applyEllipsis(a,u,g,t));!f&&G&&(n.length||x.length);)a.rotation=0,z=v.getSpanWidth(a,u),g=z>t,void 0===e&&(e=g),g&&1!==n.length?(u.removeChild(u.firstChild),x.unshift(n.pop())):(n=x,x=[],n.length&&!P&&(u=l.createElementNS(J,"tspan"),h(u,{dy:O,x:B}),p&&h(u,"style",p),d.appendChild(u)),
z>t&&(t=z+1)),n.length&&u.appendChild(l.createTextNode(n.join(" ").replace(/- /g,"-")));a.rotation=w}A++}}});q=q||d.childNodes.length}),f&&e&&a.attr("title",N(a.textStr,["\x26lt;","\x26gt;"])),u&&u.removeChild(d),x&&a.applyTextOutline&&a.applyTextOutline(x)):d.appendChild(l.createTextNode(N(k)))}},getContrast:function(a){a=r(a).rgba;a[0]*=1;a[1]*=1.2;a[2]*=.5;return 459<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,g,b,d,v,c,n,e,J){var A=this.label(a,g,b,J,null,null,null,null,"button"),u=
0;A.attr(G({padding:8,r:2},v));var l,B,p,t;v=G({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},v);l=v.style;delete v.style;c=G(v,{fill:"#e6e6e6"},c);B=c.style;delete c.style;n=G(v,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},n);p=n.style;delete n.style;e=G(v,{style:{color:"#cccccc"}},e);t=e.style;delete e.style;E(A.element,L?"mouseover":"mouseenter",function(){3!==u&&A.setState(1)});E(A.element,L?"mouseout":"mouseleave",
function(){3!==u&&A.setState(u)});A.setState=function(a){1!==a&&(A.state=u=a);A.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);A.attr([v,c,n,e][a||0]).css([l,B,p,t][a||0])};A.attr(v).css(k({cursor:"default"},l));return A.on("click",function(a){3!==u&&d.call(A,a)})},crispLine:function(a,g){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-g%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+g%2/2);return a},path:function(a){var g=
{fill:"none"};H(a)?g.d=a:x(a)&&k(g,a);return this.createElement("path").attr(g)},circle:function(a,g,b){a=x(a)?a:{x:a,y:g,r:b};g=this.createElement("circle");g.xSetter=g.ySetter=function(a,g,b){b.setAttribute("c"+g,a)};return g.attr(a)},arc:function(a,g,b,d,v,c){x(a)?(d=a,g=d.y,b=d.r,a=d.x):d={innerR:d,start:v,end:c};a=this.symbol("arc",a,g,b,b,d);a.r=b;return a},rect:function(a,g,b,d,v,c){v=x(a)?a.r:v;var k=this.createElement("rect");a=x(a)?a:void 0===a?{}:{x:a,y:g,width:Math.max(b,0),height:Math.max(d,
0)};void 0!==c&&(a.strokeWidth=c,a=k.crisp(a));a.fill="none";v&&(a.r=v);k.rSetter=function(a,g,b){h(b,{rx:a,ry:a})};return k.attr(a)},setSize:function(a,g,b){var d=this.alignedObjects,v=d.length;this.width=a;this.height=g;for(this.boxWrapper.animate({width:a,height:g},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:F(b,!0)?void 0:0});v--;)d[v].align()},g:function(a){var g=this.createElement("g");return a?g.attr({"class":"highcharts-"+a}):g},image:function(a,
g,b,d,v,c){var n={preserveAspectRatio:"none"},e,J=function(a,g){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink","href",g):a.setAttribute("hc-svg-href",g)},A=function(g){J(e.element,a);c.call(e,g)};1<arguments.length&&k(n,{x:g,y:b,width:d,height:v});e=this.createElement("image").attr(n);c?(J(e.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),n=new N.Image,E(n,"load",A),n.src=a,n.complete&&A({})):J(e.element,a);return e},symbol:function(a,
g,b,d,v,c){var n=this,e,J=/^url\((.*?)\)$/,A=J.test(a),u=!A&&(this.symbols[a]?a:"circle"),B=u&&this.symbols[u],p=w(g)&&B&&B.call(this.symbols,Math.round(g),Math.round(b),d,v,c),t,G;B?(e=this.path(p),e.attr("fill","none"),k(e,{symbolName:u,x:g,y:b,width:d,height:v}),c&&k(e,c)):A&&(t=a.match(J)[1],e=this.image(t),e.imgwidth=F(O[t]&&O[t].width,c&&c.width),e.imgheight=F(O[t]&&O[t].height,c&&c.height),G=function(){e.attr({width:e.width,height:e.height})},z(["width","height"],function(a){e[a+"Setter"]=
function(a,g){var b={},d=this["img"+g],v="width"===g?"translateX":"translateY";this[g]=a;w(d)&&(this.element&&this.element.setAttribute(g,d),this.alignByTranslate||(b[v]=((this[g]||0)-d)/2,this.attr(b)))}}),w(g)&&e.attr({x:g,y:b}),e.isImg=!0,w(e.imgwidth)&&w(e.imgheight)?G():(e.attr({width:0,height:0}),q("img",{onload:function(){var a=f[n.chartIndex];0===this.width&&(y(this,{position:"absolute",top:"-999em"}),l.body.appendChild(this));O[t]={width:this.width,height:this.height};e.imgwidth=this.width;
e.imgheight=this.height;e.element&&G();this.parentNode&&this.parentNode.removeChild(this);n.imgCount--;if(!n.imgCount&&a&&a.onload)a.onload()},src:t}),this.imgCount++));return e},symbols:{circle:function(a,g,b,d){return this.arc(a+b/2,g+d/2,b/2,d/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,g,b,d){return["M",a,g,"L",a+b,g,a+b,g+d,a,g+d,"Z"]},triangle:function(a,g,b,d){return["M",a+b/2,g,"L",a+b,g+d,a,g+d,"Z"]},"triangle-down":function(a,g,b,d){return["M",a,g,"L",a+b,g,a+b/2,g+d,"Z"]},diamond:function(a,
g,b,d){return["M",a+b/2,g,"L",a+b,g+d/2,a+b/2,g+d,a,g+d/2,"Z"]},arc:function(a,g,b,d,v){var c=v.start,k=v.r||b,n=v.r||d||b,e=v.end-.001;b=v.innerR;d=F(v.open,.001>Math.abs(v.end-v.start-2*Math.PI));var J=Math.cos(c),u=Math.sin(c),A=Math.cos(e),e=Math.sin(e);v=.001>v.end-c-Math.PI?0:1;k=["M",a+k*J,g+n*u,"A",k,n,0,v,1,a+k*A,g+n*e];w(b)&&k.push(d?"M":"L",a+b*A,g+b*e,"A",b,b,0,v,0,a+b*J,g+b*u);k.push(d?"":"Z");return k},callout:function(a,g,b,d,v){var c=Math.min(v&&v.r||0,b,d),k=c+6,n=v&&v.anchorX;v=
v&&v.anchorY;var e;e=["M",a+c,g,"L",a+b-c,g,"C",a+b,g,a+b,g,a+b,g+c,"L",a+b,g+d-c,"C",a+b,g+d,a+b,g+d,a+b-c,g+d,"L",a+c,g+d,"C",a,g+d,a,g+d,a,g+d-c,"L",a,g+c,"C",a,g,a,g,a+c,g];n&&n>b?v>g+k&&v<g+d-k?e.splice(13,3,"L",a+b,v-6,a+b+6,v,a+b,v+6,a+b,g+d-c):e.splice(13,3,"L",a+b,d/2,n,v,a+b,d/2,a+b,g+d-c):n&&0>n?v>g+k&&v<g+d-k?e.splice(33,3,"L",a,v+6,a-6,v,a,v-6,a,g+c):e.splice(33,3,"L",a,d/2,n,v,a,d/2,a,g+c):v&&v>d&&n>a+k&&n<a+b-k?e.splice(23,3,"L",n+6,g+d,n,g+d+6,n-6,g+d,a+c,g+d):v&&0>v&&n>a+k&&n<a+b-
k&&e.splice(3,3,"L",n-6,g,n,g-6,n+6,g,b-c,g);return e}},clipRect:function(g,b,d,v){var c=a.uniqueKey(),k=this.createElement("clipPath").attr({id:c}).add(this.defs);g=this.rect(g,b,d,v,0).add(k);g.id=c;g.clipPath=k;g.count=0;return g},text:function(a,g,b,d){var v={};if(d&&(this.allowHTML||!this.forExport))return this.html(a,g,b);v.x=Math.round(g||0);b&&(v.y=Math.round(b));if(a||0===a)v.text=a;a=this.createElement("text").attr(v);d||(a.xSetter=function(a,g,b){var d=b.getElementsByTagName("tspan"),v,
c=b.getAttribute(g),k;for(k=0;k<d.length;k++)v=d[k],v.getAttribute(g)===c&&v.setAttribute(g,a);b.setAttribute(g,a)});return a},fontMetrics:function(a,b){a=a||b&&b.style&&b.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?g(a):/em/.test(a)?parseFloat(a)*(b?this.fontMetrics(null,b.parentNode).f:16):12;b=24>a?a+3:Math.round(1.2*a);return{h:b,b:Math.round(.8*b),f:a}},rotCorr:function(a,g,b){var d=a;g&&b&&(d=Math.max(d*Math.cos(g*e),4));return{x:-a/3*Math.sin(g*e),y:d}},label:function(g,
b,d,c,n,e,J,u,l){var B=this,p=B.g("button"!==l&&"label"),t=p.text=B.text("",0,0,J).attr({zIndex:1}),A,x,Q=0,f=3,P=0,h,O,q,F,H,I={},N,y,M=/^url\((.*?)\)$/.test(c),m=M,L,r,R,U;l&&p.addClass("highcharts-"+l);m=M;L=function(){return(N||0)%2/2};r=function(){var a=t.element.style,g={};x=(void 0===h||void 0===O||H)&&w(t.textStr)&&t.getBBox();p.width=(h||x.width||0)+2*f+P;p.height=(O||x.height||0)+2*f;y=f+B.fontMetrics(a&&a.fontSize,t).b;m&&(A||(p.box=A=B.symbols[c]||M?B.symbol(c):B.rect(),A.addClass(("button"===
l?"":"highcharts-label-box")+(l?" highcharts-"+l+"-box":"")),A.add(p),a=L(),g.x=a,g.y=(u?-y:0)+a),g.width=Math.round(p.width),g.height=Math.round(p.height),A.attr(k(g,I)),I={})};R=function(){var a=P+f,g;g=u?0:y;w(h)&&x&&("center"===H||"right"===H)&&(a+={center:.5,right:1}[H]*(h-x.width));if(a!==t.x||g!==t.y)t.attr("x",a),t.hasBoxWidthChanged&&(x=t.getBBox(!0),r()),void 0!==g&&t.attr("y",g);t.x=a;t.y=g};U=function(a,g){A?A.attr(a,g):I[a]=g};p.onAdd=function(){t.add(p);p.attr({text:g||0===g?g:"",x:b,
y:d});A&&w(n)&&p.attr({anchorX:n,anchorY:e})};p.widthSetter=function(g){h=a.isNumber(g)?g:null};p.heightSetter=function(a){O=a};p["text-alignSetter"]=function(a){H=a};p.paddingSetter=function(a){w(a)&&a!==f&&(f=p.padding=a,R())};p.paddingLeftSetter=function(a){w(a)&&a!==P&&(P=a,R())};p.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==Q&&(Q=a,x&&p.attr({x:q}))};p.textSetter=function(a){void 0!==a&&t.textSetter(a);r();R()};p["stroke-widthSetter"]=function(a,g){a&&(m=!0);N=this["stroke-width"]=
a;U(g,a)};p.strokeSetter=p.fillSetter=p.rSetter=function(a,g){"r"!==g&&("fill"===g&&a&&(m=!0),p[g]=a);U(g,a)};p.anchorXSetter=function(a,g){n=p.anchorX=a;U(g,Math.round(a)-L()-q)};p.anchorYSetter=function(a,g){e=p.anchorY=a;U(g,a-F)};p.xSetter=function(a){p.x=a;Q&&(a-=Q*((h||x.width)+2*f),p["forceAnimate:x"]=!0);q=Math.round(a);p.attr("translateX",q)};p.ySetter=function(a){F=p.y=Math.round(a);p.attr("translateY",F)};var S=p.css;return k(p,{css:function(a){if(a){var g={};a=G(a);z(p.textProps,function(b){void 0!==
a[b]&&(g[b]=a[b],delete a[b])});t.css(g);"width"in g&&r()}return S.call(p,a)},getBBox:function(){return{width:x.width+2*f,height:x.height+2*f,x:x.x-f,y:x.y-f}},shadow:function(a){a&&(r(),A&&A.shadow(a));return p},destroy:function(){v(p.element,"mouseenter");v(p.element,"mouseleave");t&&(t=t.destroy());A&&(A=A.destroy());C.prototype.destroy.call(p);p=B=r=R=U=null}})}});a.Renderer=D})(K);(function(a){var C=a.attr,D=a.createElement,E=a.css,m=a.defined,h=a.each,f=a.extend,r=a.isFirefox,y=a.isMS,q=a.isWebKit,
w=a.pick,e=a.pInt,c=a.SVGRenderer,l=a.win,z=a.wrap;f(a.SVGElement.prototype,{htmlCss:function(a){var d=this.element;if((d=a&&"SPAN"===d.tagName&&a.width)||this.textWidth&&!d)delete a.width,this.textWidth=d,this.htmlUpdateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=f(this.styles,a);E(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=
this.renderer,d=this.element,b=this.translateX||0,c=this.translateY||0,p=this.x||0,l=this.y||0,t=this.textAlign||"left",f={left:0,center:.5,right:1}[t],x=this.styles,z=x&&x.whiteSpace;E(d,{marginLeft:b,marginTop:c});this.shadows&&h(this.shadows,function(a){E(a,{marginLeft:b+1,marginTop:c+1})});this.inverted&&h(d.childNodes,function(b){a.invertChild(b,d)});if("SPAN"===d.tagName){var x=this.rotation,n=this.textWidth&&e(this.textWidth),G=[x,t,d.innerHTML,this.textWidth,this.textAlign].join(),B;(B=n!==
this.oldTextWidth)&&!(B=n>this.oldTextWidth)&&((B=this.textPxLength)||(E(d,{width:"",whiteSpace:z||"nowrap"}),B=d.offsetWidth),B=B>n);B&&/[ \-]/.test(d.textContent||d.innerText)?(E(d,{width:n+"px",display:"block",whiteSpace:z||"normal"}),this.oldTextWidth=n,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;G!==this.cTT&&(z=a.fontMetrics(d.style.fontSize).b,!m(x)||x===(this.oldRotation||0)&&t===this.oldAlign||this.setSpanRotation(x,f,z),this.getSpanCorrection(!m(x)&&this.textPxLength||d.offsetWidth,
z,f,x,t));E(d,{left:p+(this.xCorr||0)+"px",top:l+(this.yCorr||0)+"px"});this.cTT=G;this.oldRotation=x;this.oldAlign=t}}else this.alignOnAdd=!0},setSpanRotation:function(a,d,b){var c={},k=this.renderer.getTransformKey();c[k]=c.transform="rotate("+a+"deg)";c[k+(r?"Origin":"-origin")]=c.transformOrigin=100*d+"% "+b+"px";E(this.element,c)},getSpanCorrection:function(a,d,b){this.xCorr=-a*b;this.yCorr=-d}});f(c.prototype,{getTransformKey:function(){return y&&!/Edge/.test(l.navigator.userAgent)?"-ms-transform":
q?"-webkit-transform":r?"MozTransform":l.opera?"-o-transform":""},html:function(a,d,b){var c=this.createElement("span"),k=c.element,e=c.renderer,l=e.isSVG,q=function(a,b){h(["opacity","visibility"],function(d){z(a,d+"Setter",function(a,d,c,k){a.call(this,d,c,k);b[c]=d})});a.addedSetters=!0};c.textSetter=function(a){a!==k.innerHTML&&delete this.bBox;this.textStr=a;k.innerHTML=w(a,"");c.doTransform=!0};l&&q(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,b){"align"===
b&&(b="textAlign");c[b]=a;c.doTransform=!0};c.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};c.attr({text:a,x:Math.round(d),y:Math.round(b)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});k.style.whiteSpace="nowrap";c.css=c.htmlCss;l&&(c.add=function(a){var b,d=e.box.parentNode,p=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)p.push(a),a=a.parentGroup;h(p.reverse(),function(a){function k(g,b){a[b]=g;"translateX"===
b?n.left=g+"px":n.top=g+"px";a.doTransform=!0}var n,g=C(a.element,"class");g&&(g={className:g});b=a.div=a.div||D("div",g,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||d);n=b.style;f(a,{classSetter:function(a){return function(g){this.element.setAttribute("class",g);a.className=g}}(b),on:function(){p[0].div&&c.on.apply({element:p[0].div},arguments);return a},translateXSetter:k,translateYSetter:k});
a.addedSetters||q(a,n)})}}else b=d;b.appendChild(k);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})})(K);(function(a){var C=a.defined,D=a.each,E=a.extend,m=a.merge,h=a.pick,f=a.timeUnits,r=a.win;a.Time=function(a){this.update(a,!1)};a.Time.prototype={defaultOptions:{},update:function(a){var f=h(a&&a.useUTC,!0),w=this;this.options=a=m(!0,this.options||{},a);this.Date=a.Date||r.Date;this.timezoneOffset=(this.useUTC=f)&&a.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();
(this.variableTimezone=!(f&&!a.getTimezoneOffset&&!a.timezone))||this.timezoneOffset?(this.get=function(a,c){var e=c.getTime(),f=e-w.getTimezoneOffset(c);c.setTime(f);a=c["getUTC"+a]();c.setTime(e);return a},this.set=function(a,c,l){var e;if("Milliseconds"===a||"Seconds"===a||"Minutes"===a&&0===c.getTimezoneOffset()%60)c["set"+a](l);else e=w.getTimezoneOffset(c),e=c.getTime()-e,c.setTime(e),c["setUTC"+a](l),a=w.getTimezoneOffset(c),e=c.getTime()+a,c.setTime(e)}):f?(this.get=function(a,c){return c["getUTC"+
a]()},this.set=function(a,c,l){return c["setUTC"+a](l)}):(this.get=function(a,c){return c["get"+a]()},this.set=function(a,c,l){return c["set"+a](l)})},makeTime:function(f,q,w,e,c,l){var z,k,d;this.useUTC?(z=this.Date.UTC.apply(0,arguments),k=this.getTimezoneOffset(z),z+=k,d=this.getTimezoneOffset(z),k!==d?z+=d-k:k-36E5!==this.getTimezoneOffset(z-36E5)||a.isSafari||(z-=36E5)):z=(new this.Date(f,q,h(w,1),h(e,0),h(c,0),h(l,0))).getTime();return z},timezoneOffsetFunction:function(){var f=this,h=this.options,
w=r.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(h.timezone){if(w)return function(a){return 6E4*-w.tz(a,h.timezone).utcOffset()};a.error(25)}return this.useUTC&&h.getTimezoneOffset?function(a){return 6E4*h.getTimezoneOffset(a)}:function(){return 6E4*(f.timezoneOffset||0)}},dateFormat:function(f,h,w){if(!a.defined(h)||isNaN(h))return a.defaultOptions.lang.invalidDate||"";f=a.pick(f,"%Y-%m-%d %H:%M:%S");var e=this,c=new this.Date(h),l=this.get("Hours",c),
z=this.get("Day",c),k=this.get("Date",c),d=this.get("Month",c),b=this.get("FullYear",c),u=a.defaultOptions.lang,p=u.weekdays,H=u.shortWeekdays,t=a.pad,c=a.extend({a:H?H[z]:p[z].substr(0,3),A:p[z],d:t(k),e:t(k,2," "),w:z,b:u.shortMonths[d],B:u.months[d],m:t(d+1),o:d+1,y:b.toString().substr(2,2),Y:b,H:t(l),k:l,I:t(l%12||12),l:l%12||12,M:t(e.get("Minutes",c)),p:12>l?"AM":"PM",P:12>l?"am":"pm",S:t(c.getSeconds()),L:t(Math.round(h%1E3),3)},a.dateFormats);a.objectEach(c,function(a,b){for(;-1!==f.indexOf("%"+
b);)f=f.replace("%"+b,"function"===typeof a?a.call(e,h):a)});return w?f.substr(0,1).toUpperCase()+f.substr(1):f},getTimeTicks:function(a,q,w,e){var c=this,l=[],z={},k,d=new c.Date(q),b=a.unitRange,u=a.count||1,p;if(C(q)){c.set("Milliseconds",d,b>=f.second?0:u*Math.floor(c.get("Milliseconds",d)/u));b>=f.second&&c.set("Seconds",d,b>=f.minute?0:u*Math.floor(c.get("Seconds",d)/u));b>=f.minute&&c.set("Minutes",d,b>=f.hour?0:u*Math.floor(c.get("Minutes",d)/u));b>=f.hour&&c.set("Hours",d,b>=f.day?0:u*Math.floor(c.get("Hours",
d)/u));b>=f.day&&c.set("Date",d,b>=f.month?1:u*Math.floor(c.get("Date",d)/u));b>=f.month&&(c.set("Month",d,b>=f.year?0:u*Math.floor(c.get("Month",d)/u)),k=c.get("FullYear",d));b>=f.year&&c.set("FullYear",d,k-k%u);b===f.week&&c.set("Date",d,c.get("Date",d)-c.get("Day",d)+h(e,1));k=c.get("FullYear",d);e=c.get("Month",d);var H=c.get("Date",d),t=c.get("Hours",d);q=d.getTime();c.variableTimezone&&(p=w-q>4*f.month||c.getTimezoneOffset(q)!==c.getTimezoneOffset(w));d=d.getTime();for(q=1;d<w;)l.push(d),d=
b===f.year?c.makeTime(k+q*u,0):b===f.month?c.makeTime(k,e+q*u):!p||b!==f.day&&b!==f.week?p&&b===f.hour&&1<u?c.makeTime(k,e,H,t+q*u):d+b*u:c.makeTime(k,e,H+q*u*(b===f.day?1:7)),q++;l.push(d);b<=f.hour&&1E4>l.length&&D(l,function(a){0===a%18E5&&"000000000"===c.dateFormat("%H%M%S%L",a)&&(z[a]="day")})}l.info=E(a,{higherRanks:z,totalRange:b*u});return l}}})(K);(function(a){var C=a.color,D=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,
chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",
labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",
position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:C("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(C){a.defaultOptions=D(!0,a.defaultOptions,C);
a.time.update(D(a.defaultOptions.global,a.defaultOptions.time),!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;a.time=new a.Time(D(a.defaultOptions.global,a.defaultOptions.time));a.dateFormat=function(C,m,h){return a.time.dateFormat(C,m,h)}})(K);(function(a){var C=a.correctFloat,D=a.defined,E=a.destroyObjectProperties,m=a.fireEvent,h=a.isNumber,f=a.merge,r=a.pick,y=a.deg2rad;a.Tick=function(a,f,e,c){this.axis=a;this.pos=
f;this.type=e||"";this.isNewLabel=this.isNew=!0;e||c||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,h=a.options,e=a.chart,c=a.categories,l=a.names,z=this.pos,k=h.labels,d=a.tickPositions,b=z===d[0],u=z===d[d.length-1],l=c?r(c[z],l[z],z):z,c=this.label,d=d.info,p;a.isDatetimeAxis&&d&&(p=h.dateTimeLabelFormats[d.higherRanks[z]||d.unitName]);this.isFirst=b;this.isLast=u;h={axis:a,chart:e,isFirst:b,isLast:u,dateTimeLabelFormat:p,value:a.isLog?C(a.lin2log(l)):l,pos:z};h=a.labelFormatter.call(h,
h);if(D(c))c&&c.attr({text:h});else{if(this.label=c=D(h)&&k.enabled?e.renderer.text(h,0,0,k.useHTML).css(f(k.style)).add(a.labelGroup):null)c.textPxLength=c.getBBox().width;this.rotation=0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var f=this.axis,e=f.options.labels,c=a.x,l=f.chart.chartWidth,z=f.chart.spacing,k=r(f.labelLeft,Math.min(f.pos,z[3])),z=r(f.labelRight,Math.max(f.isRadial?0:f.pos+f.len,l-z[1])),d=this.label,
b=this.rotation,u={left:0,center:.5,right:1}[f.labelAlign||d.attr("align")],p=d.getBBox().width,h=f.getSlotWidth(this),t=h,q=1,x,I={};if(b||!1===e.overflow)0>b&&c-u*p<k?x=Math.round(c/Math.cos(b*y)-k):0<b&&c+u*p>z&&(x=Math.round((l-c)/Math.cos(b*y)));else if(l=c+(1-u)*p,c-u*p<k?t=a.x+t*(1-u)-k:l>z&&(t=z-a.x+t*u,q=-1),t=Math.min(h,t),t<h&&"center"===f.labelAlign&&(a.x+=q*(h-t-u*(h-Math.min(p,t)))),p>t||f.autoRotation&&(d.styles||{}).width)x=t;x&&(I.width=x,(e.style||{}).textOverflow||(I.textOverflow=
"ellipsis"),d.css(I))},getPosition:function(f,h,e,c){var l=this.axis,z=l.chart,k=c&&z.oldChartHeight||z.chartHeight;f={x:f?a.correctFloat(l.translate(h+e,null,null,c)+l.transB):l.left+l.offset+(l.opposite?(c&&z.oldChartWidth||z.chartWidth)-l.right-l.left:0),y:f?k-l.bottom+l.offset-(l.opposite?l.height:0):a.correctFloat(k-l.translate(h+e,null,null,c)-l.transB)};m(this,"afterGetPosition",{pos:f});return f},getLabelPosition:function(a,f,e,c,l,h,k,d){var b=this.axis,u=b.transA,p=b.reversed,z=b.staggerLines,
t=b.tickRotCorr||{x:0,y:0},w=l.y,x=c||b.reserveSpaceDefault?0:-b.labelOffset*("center"===b.labelAlign?.5:1),q={};D(w)||(w=0===b.side?e.rotation?-8:-e.getBBox().height:2===b.side?t.y+8:Math.cos(e.rotation*y)*(t.y-e.getBBox(!1,0).height/2));a=a+l.x+x+t.x-(h&&c?h*u*(p?-1:1):0);f=f+w-(h&&!c?h*u*(p?1:-1):0);z&&(e=k/(d||1)%z,b.opposite&&(e=z-e-1),f+=b.labelOffset/z*e);q.x=a;q.y=Math.round(f);m(this,"afterGetLabelPosition",{pos:q});return q},getMarkPath:function(a,f,e,c,l,h){return h.crispLine(["M",a,f,
"L",a+(l?0:-e),f+(l?e:0)],c)},renderGridLine:function(a,f,e){var c=this.axis,l=c.options,h=this.gridLine,k={},d=this.pos,b=this.type,u=c.tickmarkOffset,p=c.chart.renderer,H=b?b+"Grid":"grid",t=l[H+"LineWidth"],w=l[H+"LineColor"],l=l[H+"LineDashStyle"];h||(k.stroke=w,k["stroke-width"]=t,l&&(k.dashstyle=l),b||(k.zIndex=1),a&&(k.opacity=0),this.gridLine=h=p.path().attr(k).addClass("highcharts-"+(b?b+"-":"")+"grid-line").add(c.gridGroup));if(!a&&h&&(a=c.getPlotLinePath(d+u,h.strokeWidth()*e,a,!0)))h[this.isNew?
"attr":"animate"]({d:a,opacity:f})},renderMark:function(a,f,e){var c=this.axis,l=c.options,h=c.chart.renderer,k=this.type,d=k?k+"Tick":"tick",b=c.tickSize(d),u=this.mark,p=!u,H=a.x;a=a.y;var t=r(l[d+"Width"],!k&&c.isXAxis?1:0),l=l[d+"Color"];b&&(c.opposite&&(b[0]=-b[0]),p&&(this.mark=u=h.path().addClass("highcharts-"+(k?k+"-":"")+"tick").add(c.axisGroup),u.attr({stroke:l,"stroke-width":t})),u[p?"attr":"animate"]({d:this.getMarkPath(H,a,b[0],u.strokeWidth()*e,c.horiz,h),opacity:f}))},renderLabel:function(a,
f,e,c){var l=this.axis,z=l.horiz,k=l.options,d=this.label,b=k.labels,u=b.step,l=l.tickmarkOffset,p=!0,H=a.x;a=a.y;d&&h(H)&&(d.xy=a=this.getLabelPosition(H,a,d,z,b,l,c,u),this.isFirst&&!this.isLast&&!r(k.showFirstLabel,1)||this.isLast&&!this.isFirst&&!r(k.showLastLabel,1)?p=!1:!z||b.step||b.rotation||f||0===e||this.handleOverflow(a),u&&c%u&&(p=!1),p&&h(a.y)?(a.opacity=e,d[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(d.attr("y",-9999),this.isNewLabel=!0))},render:function(f,h,e){var c=
this.axis,l=c.horiz,z=this.getPosition(l,this.pos,c.tickmarkOffset,h),k=z.x,d=z.y,c=l&&k===c.pos+c.len||!l&&d===c.pos?-1:1;e=r(e,1);this.isActive=!0;this.renderGridLine(h,e,c);this.renderMark(z,e,c);this.renderLabel(z,h,e,f);this.isNew=!1;a.fireEvent(this,"afterRender")},destroy:function(){E(this,this.axis)}}})(K);var V=function(a){var C=a.addEvent,D=a.animObject,E=a.arrayMax,m=a.arrayMin,h=a.color,f=a.correctFloat,r=a.defaultOptions,y=a.defined,q=a.deg2rad,w=a.destroyObjectProperties,e=a.each,c=
a.extend,l=a.fireEvent,z=a.format,k=a.getMagnitude,d=a.grep,b=a.inArray,u=a.isArray,p=a.isNumber,H=a.isString,t=a.merge,L=a.normalizeTickInterval,x=a.objectEach,I=a.pick,n=a.removeEvent,G=a.splat,B=a.syncTimeout,M=a.Tick,F=function(){this.init.apply(this,arguments)};a.extend(F.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,x:0,style:{color:"#666666",
cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,
tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},
defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,d){var g=d.isX,v=this;v.chart=a;v.horiz=a.inverted&&!v.isZAxis?!g:g;v.isXAxis=g;v.coll=v.coll||(g?"xAxis":"yAxis");l(this,"init",{userOptions:d});v.opposite=d.opposite;v.side=d.side||(v.horiz?v.opposite?0:2:v.opposite?1:3);v.setOptions(d);var c=this.options,k=c.type;v.labelFormatter=c.labels.formatter||v.defaultLabelFormatter;v.userOptions=d;v.minPixelPadding=0;v.reversed=c.reversed;v.visible=!1!==c.visible;
v.zoomEnabled=!1!==c.zoomEnabled;v.hasNames="category"===k||!0===c.categories;v.categories=c.categories||v.hasNames;v.names||(v.names=[],v.names.keys={});v.plotLinesAndBandsGroups={};v.isLog="logarithmic"===k;v.isDatetimeAxis="datetime"===k;v.positiveValuesOnly=v.isLog&&!v.allowNegativeLog;v.isLinked=y(c.linkedTo);v.ticks={};v.labelEdge=[];v.minorTicks={};v.plotLinesAndBands=[];v.alternateBands={};v.len=0;v.minRange=v.userMinRange=c.minRange||c.maxZoom;v.range=c.range;v.offset=c.offset||0;v.stacks=
{};v.oldStacks={};v.stacksTouched=0;v.max=null;v.min=null;v.crosshair=I(c.crosshair,G(a.options.tooltip.crosshairs)[g?0:1],!1);d=v.options.events;-1===b(v,a.axes)&&(g?a.axes.splice(a.xAxis.length,0,v):a.axes.push(v),a[v.coll].push(v));v.series=v.series||[];a.inverted&&!v.isZAxis&&g&&void 0===v.reversed&&(v.reversed=!0);x(d,function(a,g){C(v,g,a)});v.lin2log=c.linearToLogConverter||v.lin2log;v.isLog&&(v.val2lin=v.log2lin,v.lin2val=v.lin2log);l(this,"afterInit")},setOptions:function(a){this.options=
t(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],t(r[this.coll],a));l(this,"afterSetOptions",{userOptions:a})},defaultLabelFormatter:function(){var g=this.axis,b=this.value,d=g.chart.time,c=g.categories,k=this.dateTimeLabelFormat,n=r.lang,e=n.numericSymbols,n=n.numericSymbolMagnitude||1E3,p=e&&e.length,l,u=g.options.labels.format,g=g.isLog?Math.abs(b):g.tickInterval;
if(u)l=z(u,this,d);else if(c)l=b;else if(k)l=d.dateFormat(k,b);else if(p&&1E3<=g)for(;p--&&void 0===l;)d=Math.pow(n,p+1),g>=d&&0===10*b%d&&null!==e[p]&&0!==b&&(l=a.numberFormat(b/d,-1)+e[p]);void 0===l&&(l=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return l},getSeriesExtremes:function(){var a=this,b=a.chart;l(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();e(a.series,
function(g){if(g.visible||!b.options.chart.ignoreHiddenSeries){var v=g.options,c=v.threshold,k;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=c&&(c=null);if(a.isXAxis)v=g.xData,v.length&&(g=m(v),k=E(v),p(g)||g instanceof Date||(v=d(v,p),g=m(v),k=E(v)),v.length&&(a.dataMin=Math.min(I(a.dataMin,v[0],g),g),a.dataMax=Math.max(I(a.dataMax,v[0],k),k)));else if(g.getExtremes(),k=g.dataMax,g=g.dataMin,y(g)&&y(k)&&(a.dataMin=Math.min(I(a.dataMin,g),g),a.dataMax=Math.max(I(a.dataMax,k),k)),y(c)&&(a.threshold=
c),!v.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});l(this,"afterGetSeriesExtremes")},translate:function(a,b,d,c,k,n){var g=this.linkedParent||this,v=1,e=0,J=c?g.oldTransA:g.transA;c=c?g.oldMin:g.min;var l=g.minPixelPadding;k=(g.isOrdinal||g.isBroken||g.isLog&&k)&&g.lin2val;J||(J=g.transA);d&&(v*=-1,e=g.len);g.reversed&&(v*=-1,e-=v*(g.sector||g.len));b?(a=(a*v+e-l)/J+c,k&&(a=g.lin2val(a))):(k&&(a=g.val2lin(a)),a=p(c)?v*(a-c)*J+e+v*l+(p(n)?J*n:0):void 0);return a},toPixels:function(a,
b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,d,c,k){var g=this.chart,v=this.left,n=this.top,e,J,l=d&&g.oldChartHeight||g.chartHeight,u=d&&g.oldChartWidth||g.chartWidth,B;e=this.transB;var f=function(a,g,b){if(a<g||a>b)c?a=Math.min(Math.max(g,a),b):B=!0;return a};k=I(k,this.translate(a,null,null,d));k=Math.min(Math.max(-1E5,k),1E5);a=d=Math.round(k+e);e=J=Math.round(l-
k-e);p(k)?this.horiz?(e=n,J=l-this.bottom,a=d=f(a,v,v+this.width)):(a=v,d=u-this.right,e=J=f(e,n,n+this.height)):(B=!0,c=!1);return B&&!c?null:g.renderer.crispLine(["M",a,e,"L",d,J],b||1)},getLinearTickPositions:function(a,b,d){var g,v=f(Math.floor(b/a)*a);d=f(Math.ceil(d/a)*a);var c=[],k;f(v+a)===v&&(k=20);if(this.single)return[b];for(b=v;b<=d;){c.push(b);b=f(b+a,k);if(b===g)break;g=b}return c},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?I(a.minorTickInterval,"auto"):
!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,b=a.options,d=a.tickPositions,c=a.minorTickInterval,k=[],n=a.pointRangePadding||0,p=a.min-n,n=a.max+n,l=n-p;if(l&&l/c<a.len/3)if(a.isLog)e(this.paddedTicks,function(g,b,d){b&&k.push.apply(k,a.getLogTickPositions(c,d[b-1],d[b],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())k=k.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c),p,n,b.startOfWeek));else for(b=p+(d[0]-p)%c;b<=n&&b!==k[0];b+=
c)k.push(b);0!==k.length&&a.trimTicks(k);return k},adjustForMinRange:function(){var a=this.options,b=this.min,d=this.max,c,k,n,p,l,u,B,f;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(y(a.min)||y(a.max)?this.minRange=null:(e(this.series,function(a){u=a.xData;for(p=B=a.xIncrement?1:u.length-1;0<p;p--)if(l=u[p]-u[p-1],void 0===n||l<n)n=l}),this.minRange=Math.min(5*n,this.dataMax-this.dataMin)));d-b<this.minRange&&(k=this.dataMax-this.dataMin>=this.minRange,f=this.minRange,c=(f-d+b)/2,c=[b-c,I(a.min,
b-c)],k&&(c[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=E(c),d=[b+f,I(a.max,b+f)],k&&(d[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),d=m(d),d-b<f&&(c[0]=d-f,c[1]=I(a.min,d-f),b=E(c)));this.min=b;this.max=d},getClosest:function(){var a;this.categories?a=1:e(this.series,function(g){var b=g.closestPointRange,d=g.visible||!g.chart.options.chart.ignoreHiddenSeries;!g.noSharedTooltip&&y(b)&&d&&(a=y(a)?Math.min(a,b):b)});return a},nameToX:function(a){var g=u(this.categories),d=g?this.categories:
this.names,c=a.options.x,k;a.series.requireSorting=!1;y(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():g?b(a.name,d):I(d.keys[a.name],-1));-1===c?g||(k=d.length):k=c;void 0!==k&&(this.names[k]=a.name,this.names.keys[a.name]=k);return k},updateNames:function(){var b=this,d=this.names;0<d.length&&(e(a.keys(d.keys),function(a){delete d.keys[a]}),d.length=0,this.minRange=this.userMinRange,e(this.series||[],function(a){a.xIncrement=null;if(!a.points||a.isDirtyData)a.processData(),a.generatePoints();
e(a.points,function(g,d){var c;g.options&&(c=b.nameToX(g),void 0!==c&&c!==g.x&&(g.x=c,a.xData[d]=c))})}))},setAxisTranslation:function(a){var b=this,g=b.max-b.min,d=b.axisPointRange||0,c,k=0,n=0,p=b.linkedParent,u=!!b.categories,f=b.transA,B=b.isXAxis;if(B||u||d)c=b.getClosest(),p?(k=p.minPointOffset,n=p.pointRangePadding):e(b.series,function(a){var g=u?1:B?I(a.options.pointRange,c,0):b.axisPointRange||0;a=a.options.pointPlacement;d=Math.max(d,g);b.single||(k=Math.max(k,H(a)?0:g/2),n=Math.max(n,"on"===
a?0:g))}),p=b.ordinalSlope&&c?b.ordinalSlope/c:1,b.minPointOffset=k*=p,b.pointRangePadding=n*=p,b.pointRange=Math.min(d,g),B&&(b.closestPointRange=c);a&&(b.oldTransA=f);b.translationSlope=b.transA=f=b.options.staticScale||b.len/(g+n||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=f*k;l(this,"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(b){var g=this,d=g.chart,c=g.options,n=g.isLog,u=g.isDatetimeAxis,B=g.isXAxis,t=g.isLinked,h=c.maxPadding,
G=c.minPadding,x=c.tickInterval,z=c.tickPixelInterval,F=g.categories,H=p(g.threshold)?g.threshold:null,w=g.softThreshold,q,M,m,r;u||F||t||this.getTickAmount();m=I(g.userMin,c.min);r=I(g.userMax,c.max);t?(g.linkedParent=d[g.coll][c.linkedTo],d=g.linkedParent.getExtremes(),g.min=I(d.min,d.dataMin),g.max=I(d.max,d.dataMax),c.type!==g.linkedParent.options.type&&a.error(11,1)):(!w&&y(H)&&(g.dataMin>=H?(q=H,G=0):g.dataMax<=H&&(M=H,h=0)),g.min=I(m,q,g.dataMin),g.max=I(r,M,g.dataMax));n&&(g.positiveValuesOnly&&
!b&&0>=Math.min(g.min,I(g.dataMin,g.min))&&a.error(10,1),g.min=f(g.log2lin(g.min),15),g.max=f(g.log2lin(g.max),15));g.range&&y(g.max)&&(g.userMin=g.min=m=Math.max(g.dataMin,g.minFromRange()),g.userMax=r=g.max,g.range=null);l(g,"foundExtremes");g.beforePadding&&g.beforePadding();g.adjustForMinRange();!(F||g.axisPointRange||g.usePercentage||t)&&y(g.min)&&y(g.max)&&(d=g.max-g.min)&&(!y(m)&&G&&(g.min-=d*G),!y(r)&&h&&(g.max+=d*h));p(c.softMin)&&!p(g.userMin)&&(g.min=Math.min(g.min,c.softMin));p(c.softMax)&&
!p(g.userMax)&&(g.max=Math.max(g.max,c.softMax));p(c.floor)&&(g.min=Math.max(g.min,c.floor));p(c.ceiling)&&(g.max=Math.min(g.max,c.ceiling));w&&y(g.dataMin)&&(H=H||0,!y(m)&&g.min<H&&g.dataMin>=H?g.min=H:!y(r)&&g.max>H&&g.dataMax<=H&&(g.max=H));g.tickInterval=g.min===g.max||void 0===g.min||void 0===g.max?1:t&&!x&&z===g.linkedParent.options.tickPixelInterval?x=g.linkedParent.tickInterval:I(x,this.tickAmount?(g.max-g.min)/Math.max(this.tickAmount-1,1):void 0,F?1:(g.max-g.min)*z/Math.max(g.len,z));B&&
!b&&e(g.series,function(a){a.processData(g.min!==g.oldMin||g.max!==g.oldMax)});g.setAxisTranslation(!0);g.beforeSetTickPositions&&g.beforeSetTickPositions();g.postProcessTickInterval&&(g.tickInterval=g.postProcessTickInterval(g.tickInterval));g.pointRange&&!x&&(g.tickInterval=Math.max(g.pointRange,g.tickInterval));b=I(c.minTickInterval,g.isDatetimeAxis&&g.closestPointRange);!x&&g.tickInterval<b&&(g.tickInterval=b);u||n||x||(g.tickInterval=L(g.tickInterval,null,k(g.tickInterval),I(c.allowDecimals,
!(.5<g.tickInterval&&5>g.tickInterval&&1E3<g.max&&9999>g.max)),!!this.tickAmount));this.tickAmount||(g.tickInterval=g.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,d=a.tickPositions;b=this.getMinorTickInterval();var c=a.tickPositioner,k=a.startOnTick,n=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===b&&this.tickInterval?this.tickInterval/5:b;this.single=this.min===this.max&&
y(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=d&&d.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()],b[0]===b[1]&&(b.length=
1)),this.tickPositions=b,c&&(c=c.apply(this,[this.min,this.max])))&&(this.tickPositions=b=c);this.paddedTicks=b.slice(0);this.trimTicks(b,k,n);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),d||c||this.adjustTickAmount());l(this,"afterSetTickPositions")},trimTicks:function(a,b,d){var g=a[0],c=a[a.length-1],k=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==g)this.min=g;else for(;this.min-k>a[0];)a.shift();if(d)this.max=c;else for(;this.max+k<a[a.length-1];)a.pop();
0===a.length&&y(g)&&!this.options.tickPositions&&a.push((c+g)/2)}},alignToOthers:function(){var a={},b,d=this.options;!1===this.chart.options.chart.alignTicks||!1===d.alignTicks||!1===d.startOnTick||!1===d.endOnTick||this.isLog||e(this.chart[this.coll],function(g){var d=g.options,d=[g.horiz?d.left:d.top,d.width,d.height,d.pane].join();g.series.length&&(a[d]?b=!0:a[d]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,d=a.tickPixelInterval;!y(a.tickInterval)&&this.len<d&&!this.isRadial&&
!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/d)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,d=this.tickAmount,c=this.finalTickAmt,k=b&&b.length,n=I(this.threshold,this.softThreshold?0:null);if(this.hasData()){if(k<d){for(;b.length<d;)b.length%2||this.min===n?b.push(f(b[b.length-1]+a)):b.unshift(f(b[0]-a));this.transA*=(k-1)/(d-1);this.min=b[0];this.max=b[b.length-1]}else k>
d&&(this.tickInterval*=2,this.setTickPositions());if(y(c)){for(a=d=b.length;a--;)(3===c&&1===a%2||2>=c&&0<a&&a<d-1)&&b.splice(a,1);this.finalTickAmt=void 0}}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;e(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?
(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();l(this,"afterSetScale")},setExtremes:function(a,b,d,k,n){var g=this,p=g.chart;d=I(d,!0);e(g.series,function(a){delete a.kdTree});n=c(n,{min:a,max:b});l(g,"setExtremes",n,function(){g.userMin=a;g.userMax=b;g.eventArgs=n;d&&
p.redraw(k)})},zoom:function(a,b){var g=this.dataMin,d=this.dataMax,c=this.options,k=Math.min(g,I(c.min,g)),c=Math.max(d,I(c.max,d));if(a!==this.min||b!==this.max)this.allowZoomOutside||(y(g)&&(a<k&&(a=k),a>c&&(a=c)),y(d)&&(b<k&&(b=k),b>c&&(b=c))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,d=this.options,c=d.offsets||[0,0,0,0],k=this.horiz,n=this.width=Math.round(a.relativeLength(I(d.width,b.plotWidth-c[3]+
c[1]),b.plotWidth)),e=this.height=Math.round(a.relativeLength(I(d.height,b.plotHeight-c[0]+c[2]),b.plotHeight)),p=this.top=Math.round(a.relativeLength(I(d.top,b.plotTop+c[0]),b.plotHeight,b.plotTop)),d=this.left=Math.round(a.relativeLength(I(d.left,b.plotLeft+c[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-e-p;this.right=b.chartWidth-n-d;this.len=Math.max(k?n:e,0);this.pos=k?d:p},getExtremes:function(){var a=this.isLog;return{min:a?f(this.lin2log(this.min)):this.min,max:a?f(this.lin2log(this.max)):
this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,g=b?this.lin2log(this.min):this.min,b=b?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=g:Infinity===a?a=b:g>a?a=g:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(I(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,g=b[a+"Length"],d=I(b[a+"Width"],"tick"===
a&&this.isXAxis?1:0);if(d&&g)return"inside"===b[a+"Position"]&&(g=-g),[g,d]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,d=this.tickInterval,c=d,k=this.len/(((this.categories?1:0)+this.max-this.min)/d),n,p=a.rotation,l=this.labelMetrics(),u,B=Number.MAX_VALUE,t,h=function(a){a/=
k||1;a=1<a?Math.ceil(a):1;return f(a*d)};b?(t=!a.staggerLines&&!a.step&&(y(p)?[p]:k<I(a.autoRotationLimit,80)&&a.autoRotation))&&e(t,function(a){var b;if(a===p||a&&-90<=a&&90>=a)u=h(Math.abs(l.h/Math.sin(q*a))),b=u+Math.abs(a/360),b<B&&(B=b,n=a,c=u)}):a.step||(c=h(l.h));this.autoRotation=t;this.labelRotation=I(n,p);return c},getSlotWidth:function(){var a=this.chart,b=this.horiz,d=this.options.labels,c=Math.max(this.tickPositions.length-(this.categories?0:1),1),k=a.margin[3];return b&&2>(d.step||0)&&
!d.rotation&&(this.staggerLines||1)*this.len/c||!b&&(d.style&&parseInt(d.style.width,10)||k&&k-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,d=this.tickPositions,c=this.ticks,k=this.options.labels,n=k&&k.style||{},p=this.horiz,l=this.getSlotWidth(),u=Math.max(1,Math.round(l-2*(k.padding||5))),B={},f=this.labelMetrics(),t=k.style&&k.style.textOverflow,h,G,x=0,z;H(k.rotation)||(B.rotation=k.rotation||0);e(d,function(a){(a=c[a])&&a.label&&a.label.textPxLength>
x&&(x=a.label.textPxLength)});this.maxLabelLength=x;if(this.autoRotation)x>u&&x>f.h?B.rotation=this.labelRotation:this.labelRotation=0;else if(l&&(h=u,!t))for(G="clip",u=d.length;!p&&u--;)if(z=d[u],z=c[z].label)z.styles&&"ellipsis"===z.styles.textOverflow?z.css({textOverflow:"clip"}):z.textPxLength>l&&z.css({width:l+"px"}),z.getBBox().height>this.len/d.length-(f.h-f.f)&&(z.specificTextOverflow="ellipsis");B.rotation&&(h=x>.5*a.chartHeight?.33*a.chartHeight:x,t||(G="ellipsis"));if(this.labelAlign=
k.align||this.autoLabelAlign(this.labelRotation))B.align=this.labelAlign;e(d,function(a){var b=(a=c[a])&&a.label,g=n.width,d={};b&&(b.attr(B),h&&!g&&"nowrap"!==n.whiteSpace&&(h<b.textPxLength||"SPAN"===b.element.tagName)?(d.width=h,t||(d.textOverflow=b.specificTextOverflow||G),b.css(d)):b.styles&&b.styles.width&&!d.width&&!g&&b.css({width:null}),delete b.specificTextOverflow,a.rotation=B.rotation)});this.tickRotCorr=b.rotCorr(f.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||
y(this.min)&&y(this.max)&&this.tickPositions&&0<this.tickPositions.length},addTitle:function(a){var b=this.chart.renderer,g=this.horiz,d=this.opposite,c=this.options.title,k;this.axisTitle||((k=c.textAlign)||(k=(g?{low:"left",middle:"center",high:"right"}:{low:d?"right":"left",middle:"center",high:d?"left":"right"})[c.align]),this.axisTitle=b.text(c.text,0,0,c.useHTML).attr({zIndex:7,rotation:c.rotation||0,align:k}).addClass("highcharts-axis-title").css(t(c.style)).add(this.axisGroup),this.axisTitle.isNew=
!0);c.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new M(this,a)},getOffset:function(){var a=this,b=a.chart,d=b.renderer,c=a.options,k=a.tickPositions,n=a.ticks,p=a.horiz,u=a.side,B=b.inverted&&!a.isZAxis?[1,0,3,2][u]:u,f,t,h=0,G,z=0,H=c.title,F=c.labels,w=0,q=b.axisOffset,b=b.clipOffset,m=[-1,1,1,-1][u],M=c.className,r=a.axisParent,L=this.tickSize("tick");f=a.hasData();a.showAxis=
t=f||I(c.showEmpty,!0);a.staggerLines=a.horiz&&F.staggerLines;a.axisGroup||(a.gridGroup=d.g("grid").attr({zIndex:c.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(M||"")).add(r),a.axisGroup=d.g("axis").attr({zIndex:c.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(M||"")).add(r),a.labelGroup=d.g("axis-labels").attr({zIndex:F.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(M||"")).add(r));f||a.isLinked?(e(k,function(b,g){a.generateTick(b,
g)}),a.renderUnsquish(),a.reserveSpaceDefault=0===u||2===u||{1:"left",3:"right"}[u]===a.labelAlign,I(F.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&e(k,function(a){w=Math.max(n[a].getLabelSize(),w)}),a.staggerLines&&(w*=a.staggerLines),a.labelOffset=w*(a.opposite?-1:1)):x(n,function(a,b){a.destroy();delete n[b]});H&&H.text&&!1!==H.enabled&&(a.addTitle(t),t&&!1!==H.reserveSpace&&(a.titleOffset=h=a.axisTitle.getBBox()[p?"height":"width"],G=H.offset,z=y(G)?0:I(H.margin,p?5:10)));
a.renderLine();a.offset=m*I(c.offset,q[u]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};d=0===u?-a.labelMetrics().h:2===u?a.tickRotCorr.y:0;z=Math.abs(w)+z;w&&(z=z-d+m*(p?I(F.y,a.tickRotCorr.y+8*m):F.x));a.axisTitleMargin=I(G,z);q[u]=Math.max(q[u],a.axisTitleMargin+h+m*a.offset,z,f&&k.length&&L?L[0]+m*a.offset:0);c=c.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[B]=Math.max(b[B],c);l(this,"afterGetOffset")},getLinePath:function(a){var b=this.chart,g=this.opposite,d=this.offset,c=this.horiz,k=this.left+
(g?this.width:0)+d,d=b.chartHeight-this.bottom-(g?this.height:0)+d;g&&(a*=-1);return b.renderer.crispLine(["M",c?this.left:k,c?d:this.top,"L",c?b.chartWidth-this.right:k,c?d:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,d=this.top,
c=this.len,k=this.options.title,n=a?b:d,e=this.opposite,p=this.offset,l=k.x||0,u=k.y||0,B=this.axisTitle,f=this.chart.renderer.fontMetrics(k.style&&k.style.fontSize,B),B=Math.max(B.getBBox(null,0).height-f.h-1,0),c={low:n+(a?0:c),middle:n+c/2,high:n+(a?c:0)}[k.align],b=(a?d+this.height:b)+(a?1:-1)*(e?-1:1)*this.axisTitleMargin+[-B,B,f.f,-B][this.side];return{x:a?c+l:b+(e?this.width:0)+p+l,y:a?b+u-(e?this.height:0)+p:c+u}},renderMinorTick:function(a){var b=this.chart.hasRendered&&p(this.oldMin),d=
this.minorTicks;d[a]||(d[a]=new M(this,a,"minor"));b&&d[a].isNew&&d[a].render(null,!0);d[a].render(null,!1,1)},renderTick:function(a,b){var d=this.isLinked,g=this.ticks,c=this.chart.hasRendered&&p(this.oldMin);if(!d||a>=this.min&&a<=this.max)g[a]||(g[a]=new M(this,a)),c&&g[a].isNew&&g[a].render(b,!0,.1),g[a].render(b)},render:function(){var b=this,d=b.chart,c=b.options,k=b.isLog,n=b.isLinked,u=b.tickPositions,f=b.axisTitle,t=b.ticks,h=b.minorTicks,G=b.alternateBands,z=c.stackLabels,H=c.alternateGridColor,
F=b.tickmarkOffset,w=b.axisLine,I=b.showAxis,m=D(d.renderer.globalAnimation),q,r;b.labelEdge.length=0;b.overlap=!1;e([t,h,G],function(a){x(a,function(a){a.isActive=!1})});if(b.hasData()||n)b.minorTickInterval&&!b.categories&&e(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),u.length&&(e(u,function(a,d){b.renderTick(a,d)}),F&&(0===b.min||b.single)&&(t[-1]||(t[-1]=new M(b,-1,null,!0)),t[-1].render(-1))),H&&e(u,function(c,g){r=void 0!==u[g+1]?u[g+1]+F:b.max-F;0===g%2&&c<b.max&&r<=b.max+
(d.polar?-F:F)&&(G[c]||(G[c]=new a.PlotLineOrBand(b)),q=c+F,G[c].options={from:k?b.lin2log(q):q,to:k?b.lin2log(r):r,color:H},G[c].render(),G[c].isActive=!0)}),b._addedPlotLB||(e((c.plotLines||[]).concat(c.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);e([t,h,G],function(a){var b,c=[],g=m.duration;x(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,c.push(b))});B(function(){for(b=c.length;b--;)a[c[b]]&&!a[c[b]].isActive&&(a[c[b]].destroy(),delete a[c[b]])},a!==G&&
d.hasRendered&&g?g:0)});w&&(w[w.isPlaced?"animate":"attr"]({d:this.getLinePath(w.strokeWidth())}),w.isPlaced=!0,w[I?"show":"hide"](!0));f&&I&&(c=b.getTitlePosition(),p(c.y)?(f[f.isNew?"attr":"animate"](c),f.isNew=!1):(f.attr("y",-9999),f.isNew=!0));z&&z.enabled&&b.renderStackTotals();b.isDirty=!1;l(this,"afterRender")},redraw:function(){this.visible&&(this.render(),e(this.plotLinesAndBands,function(a){a.render()}));e(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),
destroy:function(a){var d=this,c=d.stacks,g=d.plotLinesAndBands,k;l(this,"destroy",{keepEvents:a});a||n(d);x(c,function(a,b){w(a);c[b]=null});e([d.ticks,d.minorTicks,d.alternateBands],function(a){w(a)});if(g)for(a=g.length;a--;)g[a].destroy();e("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" "),function(a){d[a]&&(d[a]=d[a].destroy())});for(k in d.plotLinesAndBandsGroups)d.plotLinesAndBandsGroups[k]=d.plotLinesAndBandsGroups[k].destroy();x(d,function(a,c){-1===
b(c,d.keepProps)&&delete d[c]})},drawCrosshair:function(a,b){var d,c=this.crosshair,g=I(c.snap,!0),k,n=this.cross;l(this,"drawCrosshair",{e:a,point:b});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(y(b)||!g)){g?y(b)&&(k=I(b.crosshairPos,this.isXAxis?b.plotX:this.len-b.plotY)):k=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos);y(k)&&(d=this.getPlotLinePath(b&&(this.isXAxis?b.x:I(b.stackY,b.y)),null,null,null,k)||null);if(!y(d)){this.hideCrosshair();return}g=this.categories&&
!this.isRadial;n||(this.cross=n=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(g?"category ":"thin ")+c.className).attr({zIndex:I(c.zIndex,2)}).add(),n.attr({stroke:c.color||(g?h("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":I(c.width,1)}).css({"pointer-events":"none"}),c.dashStyle&&n.attr({dashstyle:c.dashStyle}));n.show().attr({d:d});g&&!c.width&&n.attr({"stroke-width":this.transA});this.cross.e=a}else this.hideCrosshair();l(this,"afterDrawCrosshair",
{e:a,point:b})},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=F}(K);(function(a){var C=a.Axis,D=a.getMagnitude,E=a.normalizeTickInterval,m=a.timeUnits;C.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};C.prototype.normalizeTimeTickInterval=function(a,f){var h=f||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],
["month",[1,2,3,4,6]],["year",null]];f=h[h.length-1];var y=m[f[0]],q=f[1],w;for(w=0;w<h.length&&!(f=h[w],y=m[f[0]],q=f[1],h[w+1]&&a<=(y*q[q.length-1]+m[h[w+1][0]])/2);w++);y===m.year&&a<5*y&&(q=[1,2,5]);a=E(a/y,q,"year"===f[0]?Math.max(D(a/y),1):1);return{unitRange:y,count:a,unitName:f[0]}}})(K);(function(a){var C=a.Axis,D=a.getMagnitude,E=a.map,m=a.normalizeTickInterval,h=a.pick;C.prototype.getLogTickPositions=function(a,r,y,q){var f=this.options,e=this.len,c=[];q||(this._minorAutoInterval=null);
if(.5<=a)a=Math.round(a),c=this.getLinearTickPositions(a,r,y);else if(.08<=a)for(var e=Math.floor(r),l,z,k,d,b,f=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];e<y+1&&!b;e++)for(z=f.length,l=0;l<z&&!b;l++)k=this.log2lin(this.lin2log(e)*f[l]),k>r&&(!q||d<=y)&&void 0!==d&&c.push(d),d>y&&(b=!0),d=k;else r=this.lin2log(r),y=this.lin2log(y),a=q?this.getMinorTickInterval():f.tickInterval,a=h("auto"===a?null:a,this._minorAutoInterval,f.tickPixelInterval/(q?5:1)*(y-r)/((q?e/this.tickPositions.length:
e)||1)),a=m(a,null,D(a)),c=E(this.getLinearTickPositions(a,r,y),this.log2lin),q||(this._minorAutoInterval=a/5);q||(this.tickInterval=a);return c};C.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};C.prototype.lin2log=function(a){return Math.pow(10,a)}})(K);(function(a,C){var D=a.arrayMax,E=a.arrayMin,m=a.defined,h=a.destroyObjectProperties,f=a.each,r=a.erase,y=a.merge,q=a.pick;a.PlotLineOrBand=function(a,e){this.axis=a;e&&(this.options=e,this.id=e.id)};a.PlotLineOrBand.prototype={render:function(){var f=
this,e=f.axis,c=e.horiz,l=f.options,h=l.label,k=f.label,d=l.to,b=l.from,u=l.value,p=m(b)&&m(d),H=m(u),t=f.svgElem,r=!t,x=[],I=l.color,n=q(l.zIndex,0),G=l.events,x={"class":"highcharts-plot-"+(p?"band ":"line ")+(l.className||"")},B={},M=e.chart.renderer,F=p?"bands":"lines";e.isLog&&(b=e.log2lin(b),d=e.log2lin(d),u=e.log2lin(u));H?(x.stroke=I,x["stroke-width"]=l.width,l.dashStyle&&(x.dashstyle=l.dashStyle)):p&&(I&&(x.fill=I),l.borderWidth&&(x.stroke=l.borderColor,x["stroke-width"]=l.borderWidth));
B.zIndex=n;F+="-"+n;(I=e.plotLinesAndBandsGroups[F])||(e.plotLinesAndBandsGroups[F]=I=M.g("plot-"+F).attr(B).add());r&&(f.svgElem=t=M.path().attr(x).add(I));if(H)x=e.getPlotLinePath(u,t.strokeWidth());else if(p)x=e.getPlotBandPath(b,d,l);else return;r&&x&&x.length?(t.attr({d:x}),G&&a.objectEach(G,function(a,b){t.on(b,function(a){G[b].apply(f,[a])})})):t&&(x?(t.show(),t.animate({d:x})):(t.hide(),k&&(f.label=k=k.destroy())));h&&m(h.text)&&x&&x.length&&0<e.width&&0<e.height&&!x.isFlat?(h=y({align:c&&
p&&"center",x:c?!p&&4:10,verticalAlign:!c&&p&&"middle",y:c?p?16:10:p?6:-4,rotation:c&&!p&&90},h),this.renderLabel(h,x,p,n)):k&&k.hide();return f},renderLabel:function(a,e,c,l){var f=this.label,k=this.axis.chart.renderer;f||(f={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(c?"band":"line")+"-label "+(a.className||"")},f.zIndex=l,this.label=f=k.text(a.text,0,0,a.useHTML).attr(f).add(),f.css(a.style));l=e.xBounds||[e[1],e[4],c?e[6]:e[1]];e=e.yBounds||[e[2],e[5],c?e[7]:e[2]];
c=E(l);k=E(e);f.align(a,!1,{x:c,y:k,width:D(l)-c,height:D(e)-k});f.show()},destroy:function(){r(this.axis.plotLinesAndBands,this);delete this.axis;h(this)}};a.extend(C.prototype,{getPlotBandPath:function(a,e){var c=this.getPlotLinePath(e,null,null,!0),l=this.getPlotLinePath(a,null,null,!0),f=[],k=this.horiz,d=1,b;a=a<this.min&&e<this.min||a>this.max&&e>this.max;if(l&&c)for(a&&(b=l.toString()===c.toString(),d=0),a=0;a<l.length;a+=6)k&&c[a+1]===l[a+1]?(c[a+1]+=d,c[a+4]+=d):k||c[a+2]!==l[a+2]||(c[a+
2]+=d,c[a+5]+=d),f.push("M",l[a+1],l[a+2],"L",l[a+4],l[a+5],c[a+4],c[a+5],c[a+1],c[a+2],"z"),f.isFlat=b;return f},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(f,e){var c=(new a.PlotLineOrBand(this,f)).render(),l=this.userOptions;c&&(e&&(l[e]=l[e]||[],l[e].push(f)),this.plotLinesAndBands.push(c));return c},removePlotBandOrLine:function(a){for(var e=this.plotLinesAndBands,c=this.options,
l=this.userOptions,h=e.length;h--;)e[h].id===a&&e[h].destroy();f([c.plotLines||[],l.plotLines||[],c.plotBands||[],l.plotBands||[]],function(c){for(h=c.length;h--;)c[h].id===a&&r(c,c[h])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(K,V);(function(a){var C=a.doc,D=a.each,E=a.extend,m=a.format,h=a.isNumber,f=a.map,r=a.merge,y=a.pick,q=a.splat,w=a.syncTimeout,e=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};
a.Tooltip.prototype={init:function(a,e){this.chart=a;this.options=e;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=e.split&&!a.inverted;this.shared=e.shared||this.split;this.outside=e.outside&&!this.split},cleanSplit:function(a){D(this.chart.series,function(c){var e=c&&c.tt;e&&(!e.isActive||a?c.tt=e.destroy():e.isActive=!1)})},getLabel:function(){var c=this.chart.renderer,e=this.options,f;this.label||(this.outside&&(this.container=f=a.doc.createElement("div"),f.className="highcharts-tooltip-container",
a.css(f,{position:"absolute",top:"1px",pointerEvents:e.style&&e.style.pointerEvents}),a.doc.body.appendChild(f),this.renderer=c=new a.Renderer(f,0,0)),this.split?this.label=c.g("tooltip"):(this.label=c.label("",0,0,e.shape||"callout",null,null,e.useHTML,null,"tooltip").attr({padding:e.padding,r:e.borderRadius}),this.label.attr({fill:e.backgroundColor,"stroke-width":e.borderWidth}).css(e.style).shadow(e.shadow)),this.outside&&(this.label.attr({x:this.distance,y:this.distance}),this.label.xSetter=function(a){f.style.left=
a+"px"},this.label.ySetter=function(a){f.style.top=a+"px"}),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();r(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,r(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),a.discardElement(this.container));a.clearTimeout(this.hideTimer);
a.clearTimeout(this.tooltipTimeout)},move:function(c,e,f,k){var d=this,b=d.now,u=!1!==d.options.animation&&!d.isHidden&&(1<Math.abs(c-b.x)||1<Math.abs(e-b.y)),p=d.followPointer||1<d.len;E(b,{x:u?(2*b.x+c)/3:c,y:u?(b.y+e)/2:e,anchorX:p?void 0:u?(2*b.anchorX+f)/3:f,anchorY:p?void 0:u?(b.anchorY+k)/2:k});d.getLabel().attr(b);u&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){d&&d.move(c,e,f,k)},32))},hide:function(c){var e=this;a.clearTimeout(this.hideTimer);c=y(c,this.options.hideDelay,
500);this.isHidden||(this.hideTimer=w(function(){e.getLabel()[c?"fadeOut":"hide"]();e.isHidden=!0},c))},getAnchor:function(a,e){var c=this.chart,k=c.pointer,d=c.inverted,b=c.plotTop,u=c.plotLeft,p=0,l=0,t,h;a=q(a);this.followPointer&&e||k.followTouchMove&&e&&"touchmove"===e.type?(void 0===e.chartX&&(e=k.normalize(e)),a=[e.chartX-c.plotLeft,e.chartY-b]):a[0].tooltipPos?a=a[0].tooltipPos:(D(a,function(a){t=a.series.yAxis;h=a.series.xAxis;p+=a.plotX+(!d&&h?h.left-u:0);l+=(a.plotLow?(a.plotLow+a.plotHigh)/
2:a.plotY)+(!d&&t?t.top-b:0)}),p/=a.length,l/=a.length,a=[d?c.plotWidth-l:p,this.shared&&!d&&1<a.length&&e?e.chartY-b:d?c.plotHeight-p:l]);return f(a,Math.round)},getPosition:function(a,e,f){var c=this.chart,d=this.distance,b={},u=c.inverted&&f.h||0,p,l=this.outside,t=l?C.documentElement.clientWidth-2*d:c.chartWidth,h=l?Math.max(C.body.scrollHeight,C.documentElement.scrollHeight,C.body.offsetHeight,C.documentElement.offsetHeight,C.documentElement.clientHeight):c.chartHeight,x=c.pointer.chartPosition,
z=["y",h,e,(l?x.top-d:0)+f.plotY+c.plotTop,l?0:c.plotTop,l?h:c.plotTop+c.plotHeight],n=["x",t,a,(l?x.left-d:0)+f.plotX+c.plotLeft,l?0:c.plotLeft,l?t:c.plotLeft+c.plotWidth],G=!this.followPointer&&y(f.ttBelow,!c.inverted===!!f.negative),B=function(a,c,g,k,n,e){var p=g<k-d,f=k+d+g<c,B=k-d-g;k+=d;if(G&&f)b[a]=k;else if(!G&&p)b[a]=B;else if(p)b[a]=Math.min(e-g,0>B-u?B:B-u);else if(f)b[a]=Math.max(n,k+u+g>c?k:k+u);else return!1},q=function(a,c,g,k){var n;k<d||k>c-d?n=!1:b[a]=k<g/2?1:k>c-g/2?c-g-2:k-g/
2;return n},F=function(a){var b=z;z=n;n=b;p=a},g=function(){!1!==B.apply(0,z)?!1!==q.apply(0,n)||p||(F(!0),g()):p?b.x=b.y=0:(F(!0),g())};(c.inverted||1<this.len)&&F();g();return b},defaultFormatter:function(a){var c=this.points||q(this),e;e=[a.tooltipFooterHeaderFormatter(c[0])];e=e.concat(a.bodyFormatter(c));e.push(a.tooltipFooterHeaderFormatter(c[0],!0));return e},refresh:function(c,e){var f,k=this.options,d,b=c,u,p={},l=[];f=k.formatter||this.defaultFormatter;var p=this.shared,t;k.enabled&&(a.clearTimeout(this.hideTimer),
this.followPointer=q(b)[0].series.tooltipOptions.followPointer,u=this.getAnchor(b,e),e=u[0],d=u[1],!p||b.series&&b.series.noSharedTooltip?p=b.getLabelConfig():(D(b,function(a){a.setState("hover");l.push(a.getLabelConfig())}),p={x:b[0].category,y:b[0].y},p.points=l,b=b[0]),this.len=l.length,p=f.call(p,this),t=b.series,this.distance=y(t.tooltipOptions.distance,16),!1===p?this.hide():(f=this.getLabel(),this.isHidden&&f.attr({opacity:1}).show(),this.split?this.renderSplit(p,q(c)):(k.style.width||f.css({width:this.chart.spacingBox.width}),
f.attr({text:p&&p.join?p.join(""):p}),f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+y(b.colorIndex,t.colorIndex)),f.attr({stroke:k.borderColor||b.color||t.color||"#666666"}),this.updatePosition({plotX:e,plotY:d,negative:b.negative,ttBelow:b.ttBelow,h:u[2]||0})),this.isHidden=!1))},renderSplit:function(c,e){var f=this,k=[],d=this.chart,b=d.renderer,u=!0,p=this.options,l=0,t=this.getLabel();a.isString(c)&&(c=[!1,c]);D(c.slice(0,e.length+1),function(a,c){if(!1!==a){c=e[c-1]||
{isHeader:!0,plotX:e[0].plotX};var h=c.series||f,n=h.tt,G=c.series||{},B="highcharts-color-"+y(c.colorIndex,G.colorIndex,"none");n||(h.tt=n=b.label(null,null,null,"callout",null,null,p.useHTML).addClass("highcharts-tooltip-box "+B).attr({padding:p.padding,r:p.borderRadius,fill:p.backgroundColor,stroke:p.borderColor||c.color||G.color||"#333333","stroke-width":p.borderWidth}).add(t));n.isActive=!0;n.attr({text:a});n.css(p.style).shadow(p.shadow);a=n.getBBox();G=a.width+n.strokeWidth();c.isHeader?(l=
a.height,G=Math.max(0,Math.min(c.plotX+d.plotLeft-G/2,d.chartWidth-G))):G=c.plotX+d.plotLeft-y(p.distance,16)-G;0>G&&(u=!1);a=(c.series&&c.series.yAxis&&c.series.yAxis.pos)+(c.plotY||0);a-=d.plotTop;k.push({target:c.isHeader?d.plotHeight+l:a,rank:c.isHeader?1:0,size:h.tt.getBBox().height+1,point:c,x:G,tt:n})}});this.cleanSplit();a.distribute(k,d.plotHeight+l);D(k,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:u||b.isHeader?a.x:b.plotX+d.plotLeft+y(p.distance,
16),y:a.pos+d.plotTop,anchorX:b.isHeader?b.plotX+d.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+d.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var c=this.chart,e=this.getLabel(),k=(this.options.positioner||this.getPosition).call(this,e.width,e.height,a),d=a.plotX+c.plotLeft;a=a.plotY+c.plotTop;var b;this.outside&&(b=(this.options.borderWidth||0)+2*this.distance,this.renderer.setSize(e.width+b,e.height+b,!1),d+=c.pointer.chartPosition.left-k.x,a+=c.pointer.chartPosition.top-
k.y);this.move(Math.round(k.x),Math.round(k.y||0),d,a)},getDateFormat:function(a,f,h,k){var d=this.chart.time,b=d.dateFormat("%m-%d %H:%M:%S.%L",f),c,p,l={millisecond:15,second:12,minute:9,hour:6,day:3},t="millisecond";for(p in e){if(a===e.week&&+d.dateFormat("%w",f)===h&&"00:00:00.000"===b.substr(6)){p="week";break}if(e[p]>a){p=t;break}if(l[p]&&b.substr(l[p])!=="01-01 00:00:00.000".substr(l[p]))break;"week"!==p&&(t=p)}p&&(c=k[p]);return c},getXDateFormat:function(a,e,f){e=e.dateTimeLabelFormats;
var c=f&&f.closestPointRange;return(c?this.getDateFormat(c,a.x,f.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(a,e){e=e?"footer":"header";var c=a.series,k=c.tooltipOptions,d=k.xDateFormat,b=c.xAxis,f=b&&"datetime"===b.options.type&&h(a.key),p=k[e+"Format"];f&&!d&&(d=this.getXDateFormat(a,k,b));f&&d&&D(a.point&&a.point.tooltipDateKeys||["key"],function(a){p=p.replace("{point."+a+"}","{point."+a+":"+d+"}")});return m(p,{point:a,series:c},this.chart.time)},bodyFormatter:function(a){return f(a,
function(a){var c=a.series.tooltipOptions;return(c[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,c[(a.point.formatPrefix||"point")+"Format"])})}}})(K);(function(a){var C=a.addEvent,D=a.attr,E=a.charts,m=a.color,h=a.css,f=a.defined,r=a.each,y=a.extend,q=a.find,w=a.fireEvent,e=a.isNumber,c=a.isObject,l=a.offset,z=a.pick,k=a.splat,d=a.Tooltip;a.Pointer=function(a,d){this.init(a,d)};a.Pointer.prototype={init:function(a,c){this.options=c;this.chart=a;this.runChartClick=
c.chart.events&&!!c.chart.events.click;this.pinchDown=[];this.lastValidTouch={};d&&(a.tooltip=new d(a,c.tooltip),this.followTouchMove=z(c.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,d=b.options.chart,c=d.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(c=z(d.pinchType,c));this.zoomX=a=/x/.test(c);this.zoomY=c=/y/.test(c);this.zoomHor=a&&!b||c&&b;this.zoomVert=c&&!b||a&&b;this.hasZoom=a||c},normalize:function(a,d){var b;b=a.touches?a.touches.length?a.touches.item(0):
a.changedTouches[0]:a;d||(this.chartPosition=d=l(this.chart.container));return y(a,{chartX:Math.round(b.pageX-d.left),chartY:Math.round(b.pageY-d.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};r(this.chart.axes,function(d){b[d.isXAxis?"xAxis":"yAxis"].push({axis:d,value:d.toValue(a[d.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,d,k){var b;r(a,function(a){var e=!(a.noSharedTooltip&&d)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(k,e);if((e=c(a,
!0))&&!(e=!c(b,!0)))var e=b.distX-a.distX,f=b.dist-a.dist,p=(a.series.group&&a.series.group.zIndex)-(b.series.group&&b.series.group.zIndex),e=0<(0!==e&&d?e:0!==f?f:0!==p?p:b.series.index>a.series.index?-1:1);e&&(b=a)});return b},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,d){var b=a.series,c=b.xAxis,b=b.yAxis,k=z(a.clientX,a.plotX),e=a.shapeArgs;if(c&&b)return d?{chartX:c.len+c.pos-k,chartY:b.len+b.pos-a.plotY}:
{chartX:k+c.pos,chartY:a.plotY+b.pos};if(e&&e.x&&e.y)return{chartX:e.x,chartY:e.y}},getHoverData:function(b,d,k,e,f,h,l){var p,n=[],u=l&&l.isBoosting;e=!(!e||!b);l=d&&!d.stickyTracking?[d]:a.grep(k,function(a){return a.visible&&!(!f&&a.directTouch)&&z(a.options.enableMouseTracking,!0)&&a.stickyTracking});d=(p=e?b:this.findNearestKDPoint(l,f,h))&&p.series;p&&(f&&!d.noSharedTooltip?(l=a.grep(k,function(a){return a.visible&&!(!f&&a.directTouch)&&z(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),
r(l,function(a){var b=q(a.points,function(a){return a.x===p.x&&!a.isNull});c(b)&&(u&&(b=a.getPoint(b)),n.push(b))})):n.push(p));return{hoverPoint:p,hoverSeries:d,hoverPoints:n}},runPointActions:function(b,d){var c=this.chart,k=c.tooltip&&c.tooltip.options.enabled?c.tooltip:void 0,e=k?k.shared:!1,f=d||c.hoverPoint,l=f&&f.series||c.hoverSeries,l=this.getHoverData(f,l,c.series,!!d||l&&l.directTouch&&this.isDirectTouch,e,b,{isBoosting:c.isBoosting}),u,f=l.hoverPoint;u=l.hoverPoints;l=l.hoverSeries;d=
b&&"touchmove"===b.type?!0===this.followTouchMove:l&&l.tooltipOptions.followPointer;e=e&&l&&!l.noSharedTooltip;if(f&&(f!==c.hoverPoint||k&&k.isHidden)){r(c.hoverPoints||[],function(b){-1===a.inArray(b,u)&&b.setState()});r(u||[],function(a){a.setState("hover")});if(c.hoverSeries!==l)l.onMouseOver();c.hoverPoint&&c.hoverPoint.firePointEvent("mouseOut");if(!f.series)return;f.firePointEvent("mouseOver");c.hoverPoints=u;c.hoverPoint=f;k&&k.refresh(e?u:f,b)}else d&&k&&!k.isHidden&&(f=k.getAnchor([{}],b),
k.updatePosition({plotX:f[0],plotY:f[1]}));this.unDocMouseMove||(this.unDocMouseMove=C(c.container.ownerDocument,"mousemove",function(b){var d=E[a.hoverChartIndex];if(d)d.pointer.onDocumentMouseMove(b)}));r(c.axes,function(d){var c=z(d.crosshair.snap,!0),k=c?a.find(u,function(a){return a.series[d.coll]===d}):void 0;k||!c?d.drawCrosshair(b,k):d.hideCrosshair()})},reset:function(a,d){var b=this.chart,c=b.hoverSeries,e=b.hoverPoint,f=b.hoverPoints,l=b.tooltip,u=l&&l.shared?f:e;a&&u&&r(k(u),function(b){b.series.isCartesian&&
void 0===b.plotX&&(a=!1)});if(a)l&&u&&(l.refresh(u),l.shared&&f?r(f,function(a){a.setState(a.state,!0);a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,a);a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a)}):e&&(e.setState(e.state,!0),r(b.axes,function(a){a.crosshair&&a.drawCrosshair(null,e)})));else{if(e)e.onMouseOut();f&&r(f,function(a){a.setState()});if(c)c.onMouseOut();l&&l.hide(d);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());r(b.axes,function(a){a.hideCrosshair()});
this.hoverX=b.hoverPoints=b.hoverPoint=null}},scaleGroups:function(a,d){var b=this.chart,c;r(b.series,function(k){c=a||k.getPlotBox();k.xAxis&&k.xAxis.zoomEnabled&&k.group&&(k.group.attr(c),k.markerGroup&&(k.markerGroup.attr(c),k.markerGroup.clip(d?b.clipRect:null)),k.dataLabelsGroup&&k.dataLabelsGroup.attr(c))});b.clipRect.attr(d||b.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=
this.chart,d=b.options.chart,c=a.chartX,k=a.chartY,e=this.zoomHor,f=this.zoomVert,l=b.plotLeft,n=b.plotTop,h=b.plotWidth,B=b.plotHeight,z,F=this.selectionMarker,g=this.mouseDownX,v=this.mouseDownY,q=d.panKey&&a[d.panKey+"Key"];F&&F.touch||(c<l?c=l:c>l+h&&(c=l+h),k<n?k=n:k>n+B&&(k=n+B),this.hasDragged=Math.sqrt(Math.pow(g-c,2)+Math.pow(v-k,2)),10<this.hasDragged&&(z=b.isInsidePlot(g-l,v-n),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&z&&!q&&!F&&(this.selectionMarker=F=b.renderer.rect(l,n,e?1:h,
f?1:B,0).attr({fill:d.selectionMarkerFill||m("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),F&&e&&(c-=g,F.attr({width:Math.abs(c),x:(0<c?0:c)+g})),F&&f&&(c=k-v,F.attr({height:Math.abs(c),y:(0<c?0:c)+v})),z&&!F&&d.panning&&b.pan(a,d.panning)))},drop:function(a){var b=this,d=this.chart,c=this.hasPinched;if(this.selectionMarker){var k={originalEvent:a,xAxis:[],yAxis:[]},l=this.selectionMarker,x=l.attr?l.attr("x"):l.x,z=l.attr?l.attr("y"):l.y,n=l.attr?l.attr("width"):
l.width,G=l.attr?l.attr("height"):l.height,B;if(this.hasDragged||c)r(d.axes,function(d){if(d.zoomEnabled&&f(d.min)&&(c||b[{xAxis:"zoomX",yAxis:"zoomY"}[d.coll]])){var e=d.horiz,g="touchend"===a.type?d.minPixelPadding:0,l=d.toValue((e?x:z)+g),e=d.toValue((e?x+n:z+G)-g);k[d.coll].push({axis:d,min:Math.min(l,e),max:Math.max(l,e)});B=!0}}),B&&w(d,"selection",k,function(a){d.zoom(y(a,c?{animation:!1}:null))});e(d.index)&&(this.selectionMarker=this.selectionMarker.destroy());c&&this.scaleGroups()}d&&e(d.index)&&
(h(d.container,{cursor:d._cursor}),d.cancelClick=10<this.hasDragged,d.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(b){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,d=this.chartPosition;a=this.normalize(a,d);!d||this.inClass(a.target,"highcharts-tracker")||
b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var d=E[a.hoverChartIndex];d&&(b.relatedTarget||b.toElement)&&(d.pointer.reset(),d.pointer.chartPosition=null)},onContainerMouseMove:function(b){var d=this.chart;f(a.hoverChartIndex)&&E[a.hoverChartIndex]&&E[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=d.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===d.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!d.isInsidePlot(b.chartX-
d.plotLeft,b.chartY-d.plotTop)||d.openMenu||this.runPointActions(b)},inClass:function(a,d){for(var b;a;){if(b=D(a,"class")){if(-1!==b.indexOf(d))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},
onContainerClick:function(a){var b=this.chart,d=b.hoverPoint,c=b.plotLeft,k=b.plotTop;a=this.normalize(a);b.cancelClick||(d&&this.inClass(a.target,"highcharts-tracker")?(w(d.series,"click",y(a,{point:d})),b.hoverPoint&&d.firePointEvent("click",a)):(y(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-c,a.chartY-k)&&w(b,"click",a)))},setDOMEvents:function(){var b=this,d=b.chart.container,c=d.ownerDocument;d.onmousedown=function(a){b.onContainerMouseDown(a)};d.onmousemove=function(a){b.onContainerMouseMove(a)};
d.onclick=function(a){b.onContainerClick(a)};this.unbindContainerMouseLeave=C(d,"mouseleave",b.onContainerMouseLeave);a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=C(c,"mouseup",b.onDocumentMouseUp));a.hasTouch&&(d.ontouchstart=function(a){b.onContainerTouchStart(a)},d.ontouchmove=function(a){b.onContainerTouchMove(a)},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=C(c,"touchend",b.onDocumentTouchEnd)))},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();
a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,d){b[d]=null})}}})(K);(function(a){var C=a.charts,D=a.each,E=a.extend,m=a.map,h=a.noop,f=a.pick;E(a.Pointer.prototype,{pinchTranslate:function(a,f,h,m,e,c){this.zoomHor&&this.pinchTranslateDirection(!0,a,f,h,m,e,c);this.zoomVert&&this.pinchTranslateDirection(!1,a,f,h,m,
e,c)},pinchTranslateDirection:function(a,f,h,m,e,c,l,z){var k=this.chart,d=a?"x":"y",b=a?"X":"Y",u="chart"+b,p=a?"width":"height",q=k["plot"+(a?"Left":"Top")],t,r,x=z||1,y=k.inverted,n=k.bounds[a?"h":"v"],G=1===f.length,B=f[0][u],M=h[0][u],F=!G&&f[1][u],g=!G&&h[1][u],v;h=function(){!G&&20<Math.abs(B-F)&&(x=z||Math.abs(M-g)/Math.abs(B-F));r=(q-M)/x+B;t=k["plot"+(a?"Width":"Height")]/x};h();f=r;f<n.min?(f=n.min,v=!0):f+t>n.max&&(f=n.max-t,v=!0);v?(M-=.8*(M-l[d][0]),G||(g-=.8*(g-l[d][1])),h()):l[d]=
[M,g];y||(c[d]=r-q,c[p]=t);c=y?1/x:x;e[p]=t;e[d]=f;m[y?a?"scaleY":"scaleX":"scale"+b]=x;m["translate"+b]=c*q+(M-c*B)},pinch:function(a){var r=this,q=r.chart,w=r.pinchDown,e=a.touches,c=e.length,l=r.lastValidTouch,z=r.hasZoom,k=r.selectionMarker,d={},b=1===c&&(r.inClass(a.target,"highcharts-tracker")&&q.runTrackerClick||r.runChartClick),u={};1<c&&(r.initiated=!0);z&&r.initiated&&!b&&a.preventDefault();m(e,function(a){return r.normalize(a)});"touchstart"===a.type?(D(e,function(a,b){w[b]={chartX:a.chartX,
chartY:a.chartY}}),l.x=[w[0].chartX,w[1]&&w[1].chartX],l.y=[w[0].chartY,w[1]&&w[1].chartY],D(q.axes,function(a){if(a.zoomEnabled){var b=q.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,c=a.toPixels(f(a.options.min,a.dataMin)),k=a.toPixels(f(a.options.max,a.dataMax)),e=Math.max(c,k);b.min=Math.min(a.pos,Math.min(c,k)-d);b.max=Math.max(a.pos+a.len,e+d)}}),r.res=!0):r.followTouchMove&&1===c?this.runPointActions(r.normalize(a)):w.length&&(k||(r.selectionMarker=k=E({destroy:h,touch:!0},q.plotBox)),r.pinchTranslate(w,
e,d,k,u,l),r.hasPinched=z,r.scaleGroups(d,u),r.res&&(r.res=!1,this.reset(!1,0)))},touch:function(h,m){var q=this.chart,r,e;if(q.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=q.index;1===h.touches.length?(h=this.normalize(h),(e=q.isInsidePlot(h.chartX-q.plotLeft,h.chartY-q.plotTop))&&!q.openMenu?(m&&this.runPointActions(h),"touchmove"===h.type&&(m=this.pinchDown,r=m[0]?4<=Math.sqrt(Math.pow(m[0].chartX-h.chartX,2)+Math.pow(m[0].chartY-h.chartY,2)):!1),f(r,
!0)&&this.pinch(h)):m&&this.reset()):2===h.touches.length&&this.pinch(h)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){C[a.hoverChartIndex]&&C[a.hoverChartIndex].pointer.drop(f)}})})(K);(function(a){var C=a.addEvent,D=a.charts,E=a.css,m=a.doc,h=a.extend,f=a.noop,r=a.Pointer,y=a.removeEvent,q=a.win,w=a.wrap;if(!a.hasTouch&&(q.PointerEvent||q.MSPointerEvent)){var e={},c=!!q.PointerEvent,l=function(){var c=
[];c.item=function(a){return this[a]};a.objectEach(e,function(a){c.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return c},z=function(c,d,b,e){"touch"!==c.pointerType&&c.pointerType!==c.MSPOINTER_TYPE_TOUCH||!D[a.hoverChartIndex]||(e(c),e=D[a.hoverChartIndex].pointer,e[d]({type:b,target:c.currentTarget,preventDefault:f,touches:l()}))};h(r.prototype,{onContainerPointerDown:function(a){z(a,"onContainerTouchStart","touchstart",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},
onContainerPointerMove:function(a){z(a,"onContainerTouchMove","touchmove",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY};e[a.pointerId].target||(e[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){z(a,"onDocumentTouchEnd","touchend",function(a){delete e[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,c?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,c?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(m,c?
"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});w(r.prototype,"init",function(a,d,b){a.call(this,d,b);this.hasZoom&&E(d.container,{"-ms-touch-action":"none","touch-action":"none"})});w(r.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(C)});w(r.prototype,"destroy",function(a){this.batchMSEvents(y);a.call(this)})}})(K);(function(a){var C=a.addEvent,D=a.css,E=a.discardElement,m=a.defined,h=a.each,f=a.fireEvent,r=a.isFirefox,y=a.marginNames,
q=a.merge,w=a.pick,e=a.setAnimation,c=a.stableSort,l=a.win,z=a.wrap;a.Legend=function(a,d){this.init(a,d)};a.Legend.prototype={init:function(a,d){this.chart=a;this.setOptions(d);d.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=C(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())},setOptions:function(a){var d=w(a.padding,8);this.options=
a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=q(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=d;this.initialItemY=d-5;this.symbolWidth=w(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&!this.chart.inverted},update:function(a,d){var b=this.chart;this.setOptions(q(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;w(d,!0)&&b.redraw();f(this,"afterUpdate")},colorizeItem:function(a,d){a.legendGroup[d?"removeClass":"addClass"]("highcharts-legend-item-hidden");
var b=this.options,c=a.legendItem,k=a.legendLine,e=a.legendSymbol,l=this.itemHiddenStyle.color,b=d?b.itemStyle.color:l,h=d?a.color||l:l,x=a.options&&a.options.marker,z={fill:h};c&&c.css({fill:b,color:b});k&&k.attr({stroke:h});e&&(x&&e.isMarker&&(z=a.pointAttribs(),d||(z.stroke=z.fill=l)),e.attr(z));f(this,"afterColorizeItem",{item:a,visible:d})},positionItems:function(){h(this.allItems,this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()},positionItem:function(a){var d=this.options,
b=d.symbolPadding,d=!d.rtl,c=a._legendItemPos,k=c[0],c=c[1],e=a.checkbox;if((a=a.legendGroup)&&a.element)a[m(a.translateY)?"animate":"attr"]({translateX:d?k:this.legendWidth-k-2*b-4,translateY:c});e&&(e.x=k,e.y=c)},destroyItem:function(a){var d=a.checkbox;h(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});d&&E(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}h(this.getAllItems(),function(c){h(["legendItem","legendGroup"],
a,c)});h("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,c,b=this.clipHeight||this.legendHeight,e=this.titleHeight;a&&(c=a.translateY,h(this.allItems,function(d){var k=d.checkbox,f;k&&(f=c+e+k.y+(this.scrollOffset||0)+3,D(k,{left:a.translateX+d.checkboxOffset+k.x-20+"px",top:f+"px",display:f>c-6&&f<c+b-6?"":"none"}))},this))},renderTitle:function(){var a=this.options,c=this.padding,b=a.title,e=
0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,c-3,c-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group)),a=this.title.getBBox(),e=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:e}));this.titleHeight=e},setText:function(c){var d=this.options;c.legendItem.attr({text:d.labelFormat?a.format(d.labelFormat,c,this.chart.time):d.labelFormatter.call(c)})},renderItem:function(a){var c=this.chart,b=c.renderer,e=this.options,
k=this.symbolWidth,f=e.symbolPadding,l=this.itemStyle,h=this.itemHiddenStyle,x="horizontal"===e.layout?w(e.itemDistance,20):0,z=!e.rtl,n=a.legendItem,G=!a.series,B=!G&&a.series.drawLegendSymbol?a.series:a,m=B.options,m=this.createCheckboxForItem&&m&&m.showCheckbox,x=k+f+x+(m?20:0),F=e.useHTML,g=a.options.className;n||(a.legendGroup=b.g("legend-item").addClass("highcharts-"+B.type+"-series highcharts-color-"+a.colorIndex+(g?" "+g:"")+(G?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),
a.legendItem=n=b.text("",z?k+f:-f,this.baseline||0,F).css(q(a.visible?l:h)).attr({align:z?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(k=l.fontSize,this.fontMetrics=b.fontMetrics(k,n),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,n.attr("y",this.baseline)),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,B.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,n,F),m&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);l.width||n.css({width:(e.itemWidth||
e.width||c.spacingBox.width)-x});this.setText(a);c=n.getBBox();a.itemWidth=a.checkboxOffset=e.itemWidth||a.legendItemWidth||c.width+x;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||c.height||this.symbolHeight)},layoutItem:function(a){var c=this.options,b=this.padding,e="horizontal"===c.layout,k=a.itemHeight,f=c.itemMarginBottom||0,l=this.itemMarginTop,h=e?w(c.itemDistance,20):0,x=c.width,z=x||this.chart.spacingBox.width-
2*b-c.x,c=c.alignColumns&&this.totalItemWidth>z?this.maxItemWidth:a.itemWidth;e&&this.itemX-b+c>z&&(this.itemX=b,this.itemY+=l+this.lastLineHeight+f,this.lastLineHeight=0);this.lastItemY=l+this.itemY+f;this.lastLineHeight=Math.max(k,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=c:(this.itemY+=l+k+f,this.lastLineHeight=k);this.offsetWidth=x||Math.max((e?this.itemX-b-(a.checkbox?0:h):c)+b,this.offsetWidth)},getAllItems:function(){var a=[];h(this.chart.series,function(c){var b=
c&&c.options;c&&w(b.showInLegend,m(b.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===b.legendType?c.data:c)))});f(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,c){var b=this.chart,d=this.options,e=this.getAlignment();e&&h([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(k,
f){k.test(e)&&!m(a[f])&&(b[y[f]]=Math.max(b[y[f]],b.legend[(f+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][f]*d[f%2?"x":"y"]+w(d.margin,12)+c[f]+(0===f&&void 0!==b.options.title.margin?b.titleOffset+b.options.title.margin:0)))})},proximatePositions:function(){var c=this.chart,d=[],b="left"===this.options.align;h(this.allItems,function(e){var k,f;k=b;e.xAxis&&e.points&&(e.xAxis.options.reversed&&(k=!k),k=a.find(k?e.points:e.points.slice(0).reverse(),function(b){return a.isNumber(b.plotY)}),f=e.legendGroup.getBBox().height,
d.push({target:e.visible?(k?k.plotY:e.xAxis.height)-.3*f:c.plotHeight,size:f,item:e}))},this);a.distribute(d,c.plotHeight);h(d,function(a){a.item._legendItemPos[1]=c.plotTop-c.spacing[0]+a.pos})},render:function(){var a=this.chart,d=a.renderer,b=this.group,e,f,l,t=this.box,z=this.options,x=this.padding;this.itemX=x;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;b||(this.group=b=d.g("legend").attr({zIndex:7}).add(),this.contentGroup=d.g().attr({zIndex:1}).add(b),this.scrollGroup=d.g().add(this.contentGroup));
this.renderTitle();e=this.getAllItems();c(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});z.reversed&&e.reverse();this.allItems=e;this.display=f=!!e.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;h(e,this.renderItem,this);h(e,this.layoutItem,this);e=(z.width||this.offsetWidth)+x;l=this.lastItemY+this.lastLineHeight+this.titleHeight;l=this.handleOverflow(l);l+=x;t||(this.box=t=d.rect().addClass("highcharts-legend-box").attr({r:z.borderRadius}).add(b),
t.isNew=!0);t.attr({stroke:z.borderColor,"stroke-width":z.borderWidth||0,fill:z.backgroundColor||"none"}).shadow(z.shadow);0<e&&0<l&&(t[t.isNew?"attr":"animate"](t.crisp.call({},{x:0,y:0,width:e,height:l},t.strokeWidth())),t.isNew=!1);t[f?"show":"hide"]();this.legendWidth=e;this.legendHeight=l;f&&(d=a.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(d=q(d,{y:d.y+a.titleOffset+a.options.title.margin})),b.align(q(z,{width:e,height:l,verticalAlign:this.proximate?"top":z.verticalAlign}),!0,d));this.proximate||
this.positionItems()},handleOverflow:function(a){var c=this,b=this.chart,e=b.renderer,k=this.options,f=k.y,l=this.padding,b=b.spacingBox.height+("top"===k.verticalAlign?-f:f)-l,f=k.maxHeight,z,x=this.clipRect,m=k.navigation,n=w(m.animation,!0),G=m.arrowSize||12,B=this.nav,q=this.pages,F,g=this.allItems,v=function(a){"number"===typeof a?x.attr({height:a}):x&&(c.clipRect=x.destroy(),c.contentGroup.clip());c.contentGroup.div&&(c.contentGroup.div.style.clip=a?"rect("+l+"px,9999px,"+(l+a)+"px,0)":"auto")};
"horizontal"!==k.layout||"middle"===k.verticalAlign||k.floating||(b/=2);f&&(b=Math.min(b,f));q.length=0;a>b&&!1!==m.enabled?(this.clipHeight=z=Math.max(b-20-this.titleHeight-l,0),this.currentPage=w(this.currentPage,1),this.fullHeight=a,h(g,function(a,b){var c=a._legendItemPos[1],d=Math.round(a.legendItem.getBBox().height),e=q.length;if(!e||c-q[e-1]>z&&(F||c)!==q[e-1])q.push(F||c),e++;a.pageIx=e-1;F&&(g[b-1].pageIx=e-1);b===g.length-1&&c+d-q[e-1]>z&&(q.push(c),a.pageIx=e);c!==F&&(F=c)}),x||(x=c.clipRect=
e.clipRect(0,l,9999,0),c.contentGroup.clip(x)),v(z),B||(this.nav=B=e.g().attr({zIndex:1}).add(this.group),this.up=e.symbol("triangle",0,0,G,G).on("click",function(){c.scroll(-1,n)}).add(B),this.pager=e.text("",15,10).addClass("highcharts-legend-navigation").css(m.style).add(B),this.down=e.symbol("triangle-down",0,0,G,G).on("click",function(){c.scroll(1,n)}).add(B)),c.scroll(0),a=b):B&&(v(),this.nav=B.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var b=
this.pages,d=b.length;a=this.currentPage+a;var k=this.clipHeight,f=this.options.navigation,l=this.pager,h=this.padding;a>d&&(a=d);0<a&&(void 0!==c&&e(c,this.chart),this.nav.attr({translateX:h,translateY:k+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),l.attr({text:a+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===d?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),
this.up.attr({fill:1===a?f.inactiveColor:f.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===d?f.inactiveColor:f.activeColor}).css({cursor:a===d?"default":"pointer"}),this.scrollOffset=-b[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=a,this.positionCheckboxes())}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.symbolHeight,d=a.options.squareSymbol;c.legendSymbol=this.chart.renderer.rect(d?(a.symbolWidth-b)/2:
0,a.baseline-b+1,d?b:a.symbolWidth,b,w(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var c=this.options,b=c.marker,e=a.symbolWidth,k=a.symbolHeight,f=k/2,l=this.chart.renderer,h=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var z;z={"stroke-width":c.lineWidth||0};c.dashStyle&&(z.dashstyle=c.dashStyle);this.legendLine=l.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr(z).add(h);b&&!1!==b.enabled&&e&&
(c=Math.min(w(b.radius,f),f),0===this.symbol.indexOf("url")&&(b=q(b,{width:k,height:k}),c=0),this.legendSymbol=b=l.symbol(this.symbol,e/2-c,a-c,2*c,2*c,b).addClass("highcharts-point").add(h),b.isMarker=!0)}};(/Trident\/7\.0/.test(l.navigator.userAgent)||r)&&z(a.Legend.prototype,"positionItem",function(a,c){var b=this,d=function(){c._legendItemPos&&a.call(b,c)};d();setTimeout(d)})})(K);(function(a){var C=a.addEvent,D=a.animate,E=a.animObject,m=a.attr,h=a.doc,f=a.Axis,r=a.createElement,y=a.defaultOptions,
q=a.discardElement,w=a.charts,e=a.css,c=a.defined,l=a.each,z=a.extend,k=a.find,d=a.fireEvent,b=a.grep,u=a.isNumber,p=a.isObject,H=a.isString,t=a.Legend,L=a.marginNames,x=a.merge,I=a.objectEach,n=a.Pointer,G=a.pick,B=a.pInt,M=a.removeEvent,F=a.seriesTypes,g=a.splat,v=a.syncTimeout,P=a.win,Q=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new Q(a,b,c)};z(Q.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(H(a[0])||a[0].nodeName)this.renderTo=
a.shift();this.init(a[0],a[1])},init:function(b,c){var g,e,k=b.series,f=b.plotOptions||{};d(this,"init",{args:arguments},function(){b.series=null;g=x(y,b);for(e in g.plotOptions)g.plotOptions[e].tooltip=f[e]&&x(f[e].tooltip)||void 0;g.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;g.series=b.series=k;this.userOptions=b;var n=g.chart,l=n.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=c;this.isResizing=0;this.options=
g;this.axes=[];this.series=[];this.time=b.time&&a.keys(b.time).length?new a.Time(b.time):a.time;this.hasCartesianSeries=n.showAxes;var h=this;h.index=w.length;w.push(h);a.chartCount++;l&&I(l,function(a,b){C(h,b,a)});h.xAxis=[];h.yAxis=[];h.pointCount=h.colorCounter=h.symbolCounter=0;d(h,"afterInit");h.firstRender()})},initSeries:function(b){var c=this.options.chart;(c=F[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;
for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())},isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){d(this,"beforeRedraw");var c=this.axes,g=this.series,e=this.pointer,f=this.legend,k=this.isDirtyLegend,n,h,B=this.hasCartesianSeries,G=this.isDirtyBox,v,p=this.renderer,t=p.isHidden(),x=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);t&&this.temporaryDisplay();this.layOutTitles();
for(b=g.length;b--;)if(v=g[b],v.options.stacking&&(n=!0,v.isDirty)){h=!0;break}if(h)for(b=g.length;b--;)v=g[b],v.options.stacking&&(v.isDirty=!0);l(g,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),k=!0);a.isDirtyData&&d(a,"updatedData")});k&&f.options.enabled&&(f.render(),this.isDirtyLegend=!1);n&&this.getStacks();B&&l(c,function(a){a.updateNames();a.setScale()});this.getMargins();B&&(l(c,function(a){a.isDirty&&(G=!0)}),l(c,function(a){var b=a.min+","+a.max;
a.extKey!==b&&(a.extKey=b,x.push(function(){d(a,"afterSetExtremes",z(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(G||n)&&a.redraw()}));G&&this.drawChartBox();d(this,"predraw");l(g,function(a){(G||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});e&&e.reset(!0);p.draw();d(this,"redraw");d(this,"render");t&&this.temporaryDisplay(!0);l(x,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,d=this.series,g;c=k(this.axes,b)||k(this.series,
b);for(g=0;!c&&g<d.length;g++)c=k(d[g].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=g(b.xAxis||{}),b=b.yAxis=g(b.yAxis||{});d(this,"getAxes");l(c,function(a,b){a.index=b;a.isX=!0});l(b,function(a,b){a.index=b});c=c.concat(b);l(c,function(b){new f(a,b)});d(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];l(this.series,function(c){a=a.concat(b(c.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return b(this.series,function(a){return a.selected})},
setTitle:function(a,b,c){var d=this,g=d.options,e;e=g.title=x({style:{color:"#333333",fontSize:g.isStock?"16px":"18px"}},g.title,a);g=g.subtitle=x({style:{color:"#666666"}},g.subtitle,b);l([["title",a,e],["subtitle",b,g]],function(a,b){var c=a[0],g=d[c],e=a[1];a=a[2];g&&e&&(d[c]=g=g.destroy());a&&!g&&(d[c]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&a,b&&a)},d[c].css(a.style))});d.layOutTitles(c)},
layOutTitles:function(a){var b=0,c,d=this.renderer,g=this.spacingBox;l(["title","subtitle"],function(a){var c=this[a],e=this.options[a];a="title"===a?-3:e.verticalAlign?0:b+2;var n;c&&(n=e.style.fontSize,n=d.fontMetrics(n,c).b,c.css({width:(e.width||g.width+e.widthAdjust)+"px"}).align(z({y:a+n},e),!1,"spacingBox"),e.floating||e.verticalAlign||(b=Math.ceil(b+c.getBBox(e.useHTML).height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=this.isDirtyLegend=c,this.hasRendered&&
G(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,d=b.width,b=b.height,g=this.renderTo;c(d)||(this.containerWidth=a.getStyle(g,"width"));c(b)||(this.containerHeight=a.getStyle(g,"height"));this.chartWidth=Math.max(0,d||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),
delete c.hcOrigStyle),c.hcOrigDetached&&(h.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){h.body.contains(c)||c.parentNode||(c.hcOrigDetached=!0,h.body.appendChild(c));if("none"===a.getStyle(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display","block","important");c=c.parentNode;
if(c===h.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,g=c.chart,e,n;b=this.renderTo;var f=a.uniqueKey(),k;b||(this.renderTo=b=g.renderTo);H(b)&&(this.renderTo=b=h.getElementById(b));b||a.error(13,!0);e=B(m(b,"data-highcharts-chart"));u(e)&&w[e]&&w[e].hasRendered&&w[e].destroy();m(b,"data-highcharts-chart",this.index);b.innerHTML="";g.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();
e=this.chartWidth;n=this.chartHeight;k=z({position:"relative",overflow:"hidden",width:e+"px",height:n+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},g.style);this.container=b=r("div",{id:f},k,b);this._cursor=b.style.cursor;this.renderer=new (a[g.renderer]||a.Renderer)(b,e,n,null,g.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(g.className);this.renderer.setStyle(g.style);this.renderer.chartIndex=this.index;d(this,"afterGetContainer")},
getMargins:function(a){var b=this.spacing,g=this.margin,e=this.titleOffset;this.resetMargins();e&&!c(g[0])&&(this.plotTop=Math.max(this.plotTop,e+this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(g,b);d(this,"getMargins");a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],d=a.margin;a.hasCartesianSeries&&l(a.axes,function(a){a.visible&&a.getOffset()});l(L,function(g,e){c(d[e])||(a[g]+=b[e])});a.setChartSize()},reflow:function(b){var d=
this,g=d.options.chart,e=d.renderTo,n=c(g.width)&&c(g.height),k=g.width||a.getStyle(e,"width"),g=g.height||a.getStyle(e,"height"),e=b?b.target:P;if(!n&&!d.isPrinting&&k&&g&&(e===P||e===h)){if(k!==d.containerWidth||g!==d.containerHeight)a.clearTimeout(d.reflowTimeout),d.reflowTimeout=v(function(){d.container&&d.setSize(void 0,void 0,!1)},b?100:0);d.containerWidth=k;d.containerHeight=g}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):
(this.unbindReflow=C(P,"resize",function(a){b.reflow(a)}),C(this,"destroy",this.unbindReflow))},setSize:function(b,c,g){var n=this,k=n.renderer;n.isResizing+=1;a.setAnimation(g,n);n.oldChartHeight=n.chartHeight;n.oldChartWidth=n.chartWidth;void 0!==b&&(n.options.chart.width=b);void 0!==c&&(n.options.chart.height=c);n.getChartSize();b=k.globalAnimation;(b?D:e)(n.container,{width:n.chartWidth+"px",height:n.chartHeight+"px"},b);n.setChartSize(!0);k.setSize(n.chartWidth,n.chartHeight,g);l(n.axes,function(a){a.isDirty=
!0;a.setScale()});n.isDirtyLegend=!0;n.isDirtyBox=!0;n.layOutTitles();n.getMargins();n.redraw(g);n.oldChartHeight=null;d(n,"resize");v(function(){n&&d(n,"endResize",null,function(){--n.isResizing})},E(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,g=this.chartWidth,e=this.chartHeight,n=this.options.chart,k=this.spacing,f=this.clipOffset,h,B,G,v;this.plotLeft=h=Math.round(this.plotLeft);this.plotTop=B=Math.round(this.plotTop);this.plotWidth=G=Math.max(0,Math.round(g-h-this.marginRight));
this.plotHeight=v=Math.max(0,Math.round(e-B-this.marginBottom));this.plotSizeX=b?v:G;this.plotSizeY=b?G:v;this.plotBorderWidth=n.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:k[3],y:k[0],width:g-k[3]-k[1],height:e-k[0]-k[2]};this.plotBox=c.plotBox={x:h,y:B,width:G,height:v};g=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(g,f[3])/2);c=Math.ceil(Math.max(g,f[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(g,f[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-
Math.max(g,f[2])/2-c))};a||l(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()});d(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){var a=this,b=a.options.chart;l(["margin","spacing"],function(c){var d=b[c],g=p(d)?d:[d,d,d,d];l(["Top","Right","Bottom","Left"],function(d,e){a[c][e]=G(b[c+d],g[e])})});l(L,function(b,c){a[b]=G(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,
g=this.chartHeight,e=this.chartBackground,n=this.plotBackground,k=this.plotBorder,f,l=this.plotBGImage,h=a.backgroundColor,B=a.plotBackgroundColor,G=a.plotBackgroundImage,v,p=this.plotLeft,t=this.plotTop,z=this.plotWidth,x=this.plotHeight,F=this.plotBox,u=this.clipRect,m=this.clipBox,q="animate";e||(this.chartBackground=e=b.rect().addClass("highcharts-background").add(),q="attr");f=a.borderWidth||0;v=f+(a.shadow?8:0);h={fill:h||"none"};if(f||e["stroke-width"])h.stroke=a.borderColor,h["stroke-width"]=
f;e.attr(h).shadow(a.shadow);e[q]({x:v/2,y:v/2,width:c-v-f%2,height:g-v-f%2,r:a.borderRadius});q="animate";n||(q="attr",this.plotBackground=n=b.rect().addClass("highcharts-plot-background").add());n[q](F);n.attr({fill:B||"none"}).shadow(a.plotShadow);G&&(l?l.animate(F):this.plotBGImage=b.image(G,p,t,z,x).add());u?u.animate({width:m.width,height:m.height}):this.clipRect=b.clipRect(m);q="animate";k||(q="attr",this.plotBorder=k=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());k.attr({stroke:a.plotBorderColor,
"stroke-width":a.plotBorderWidth||0,fill:"none"});k[q](k.crisp({x:p,y:t,width:z,height:x},-k.strokeWidth()));this.isDirtyBox=!1;d(this,"afterDrawChartBox")},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,g,e;l(["inverted","angular","polar"],function(n){c=F[b.type||b.defaultSeriesType];e=b[n]||c&&c.prototype[n];for(g=d&&d.length;!e&&g--;)(c=F[d[g].type])&&c.prototype[n]&&(e=!0);a[n]=e})},linkSeries:function(){var a=this,b=a.series;l(b,function(a){a.linkedSeries.length=
0});l(b,function(b){var c=b.options.linkedTo;H(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=G(b.options.visible,c.options.visible,b.visible))});d(this,"afterLinkSeries")},renderSeries:function(){l(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&l(b.items,function(c){var d=z(b.style,c.style),g=B(d.left)+a.plotLeft,e=B(d.top)+a.plotTop+12;delete d.left;delete d.top;
a.renderer.text(c.html,g,e).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,d,g,e;this.setTitle();this.legend=new t(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;d=this.plotHeight=Math.max(this.plotHeight-21,0);l(a,function(a){a.setScale()});this.getAxisMargins();g=1.1<c/this.plotWidth;e=1.05<d/this.plotHeight;if(g||e)l(a,function(a){(a.horiz&&g||!a.horiz&&e)&&a.setTickInterval(!0)}),this.getMargins();
this.drawChartBox();this.hasCartesianSeries&&l(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=x(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&
(P.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,g=b.series,e=b.container,n,k=e&&e.parentNode;d(b,"destroy");b.renderer.forExport?a.erase(w,b):w[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");M(b);for(n=c.length;n--;)c[n]=c[n].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();
for(n=g.length;n--;)g[n]=g[n].destroy();l("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});e&&(e.innerHTML="",M(e),k&&q(e));I(b,function(a,c){delete b[c]})},firstRender:function(){var a=this,b=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();
l(b.series||[],function(b){a.initSeries(b)});a.linkSeries();d(a,"beforeRender");n&&(a.pointer=new n(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){l([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);d(this,"load");d(this,"render");c(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})})(K);(function(a){var C=a.addEvent,D=a.Chart,E=a.each;C(D,"afterSetChartSize",function(m){var h=
this.options.chart.scrollablePlotArea;(h=h&&h.minWidth)&&!this.renderer.forExport&&(this.scrollablePixels=h=Math.max(0,h-this.chartWidth))&&(this.plotWidth+=h,this.clipBox.width+=h,m.skipAxes||E(this.axes,function(f){1===f.side?f.getPlotLinePath=function(){var h=this.right,m;this.right=h-f.chart.scrollablePixels;m=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this.right=h;return m}:(f.setAxisSize(),f.setAxisTranslation())}))});C(D,"render",function(){this.scrollablePixels?(this.setUpScrolling&&
this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});D.prototype.setUpScrolling=function(){this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},{overflowX:"auto",WebkitOverflowScrolling:"touch"},this.renderTo);this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};D.prototype.applyFixed=function(){var m=this.container,
h,f,r=!this.fixedDiv;r&&(this.fixedDiv=a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.fixedRenderer=h=new a.Renderer(this.fixedDiv,0,0),this.scrollableMask=h.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(.85).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),a.each([this.inverted?".highcharts-xaxis":
".highcharts-yaxis",this.inverted?".highcharts-xaxis-labels":".highcharts-yaxis-labels",".highcharts-contextbutton",".highcharts-credits",".highcharts-legend",".highcharts-subtitle",".highcharts-title",".highcharts-legend-checkbox"],function(f){a.each(m.querySelectorAll(f),function(a){(a.namespaceURI===h.SVG_NS?h.box:h.box.parentNode).appendChild(a);a.style.pointerEvents="auto"})}));this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);f=this.chartWidth+this.scrollablePixels;a.stop(this.container);
this.container.style.width=f+"px";this.renderer.boxWrapper.attr({width:f,height:this.chartHeight,viewBox:[0,0,f,this.chartHeight].join(" ")});this.chartBackground.attr({width:f});r&&(f=this.options.chart.scrollablePlotArea,f.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixels*f.scrollPositionX));r=this.axisOffset;f=this.plotTop-r[0]-1;var r=this.plotTop+this.plotHeight+r[2],y=this.plotLeft+this.plotWidth-this.scrollablePixels;this.scrollableMask.attr({d:this.scrollablePixels?
["M",0,f,"L",this.plotLeft-1,f,"L",this.plotLeft-1,r,"L",0,r,"Z","M",y,f,"L",this.chartWidth,f,"L",this.chartWidth,r,"L",y,r,"Z"]:["M",0,0]})}})(K);(function(a){var C,D=a.each,E=a.extend,m=a.erase,h=a.fireEvent,f=a.format,r=a.isArray,y=a.isNumber,q=a.pick,w=a.removeEvent;a.Point=C=function(){};a.Point.prototype={init:function(a,c,f){this.series=a;this.color=a.color;this.applyOptions(c,f);a.options.colorByPoint?(c=a.options.colors||a.chart.options.colors,this.color=this.color||c[a.colorCounter],c=
c.length,f=a.colorCounter,a.colorCounter++,a.colorCounter===c&&(a.colorCounter=0)):f=a.colorIndex;this.colorIndex=q(this.colorIndex,f);a.chart.pointCount++;h(this,"afterInit");return this},applyOptions:function(a,c){var e=this.series,f=e.options.pointValKey||e.pointValKey;a=C.prototype.optionsToObject.call(this,a);E(this,a);this.options=this.options?E(this.options,a):a;a.group&&delete this.group;f&&(this.y=this[f]);this.isNull=q(this.isValid&&!this.isValid(),null===this.x||!y(this.y,!0));this.selected&&
(this.state="select");"name"in this&&void 0===c&&e.xAxis&&e.xAxis.hasNames&&(this.x=e.xAxis.nameToX(this));void 0===this.x&&e&&(this.x=void 0===c?e.autoIncrement(this):c);return this},setNestedProperty:function(e,c,f){f=f.split(".");a.reduce(f,function(e,f,d,b){e[f]=b.length-1===d?c:a.isObject(e[f],!0)?e[f]:{};return e[f]},e);return e},optionsToObject:function(e){var c={},f=this.series,h=f.options.keys,k=h||f.pointArrayMap||["y"],d=k.length,b=0,u=0;if(y(e)||null===e)c[k[0]]=e;else if(r(e))for(!h&&
e.length>d&&(f=typeof e[0],"string"===f?c.name=e[0]:"number"===f&&(c.x=e[0]),b++);u<d;)h&&void 0===e[b]||(0<k[u].indexOf(".")?a.Point.prototype.setNestedProperty(c,e[b],k[u]):c[k[u]]=e[b]),b++,u++;else"object"===typeof e&&(c=e,e.dataLabels&&(f._hasPointLabels=!0),e.marker&&(f._hasPointMarkers=!0));return c},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?
" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,c=a.zones,a=a.zoneAxis||"y",f=0,h;for(h=c[f];this[a]>=h.value;)h=c[++f];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=h&&h.color&&!this.options.color?h.color:this.nonZonedColor;return h},destroy:function(){var a=this.series.chart,c=a.hoverPoints,f;a.pointCount--;
c&&(this.setState(),m(c,this),c.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)w(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(f in this)this[f]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],c,f=6;f--;)c=a[f],this[c]&&(this[c]=this[c].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||
this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var c=this.series,e=c.tooltipOptions,h=q(e.valueDecimals,""),k=e.valuePrefix||"",d=e.valueSuffix||"";D(c.pointArrayMap||["y"],function(b){b="{point."+b;if(k||d)a=a.replace(RegExp(b+"}","g"),k+b+"}"+d);a=a.replace(RegExp(b+"}","g"),b+":,."+h+"f}")});return f(a,{point:this,series:this.series},c.chart.time)},firePointEvent:function(a,c,f){var e=this,k=this.series.options;
(k.point.events[a]||e.options&&e.options.events&&e.options.events[a])&&this.importEvents();"click"===a&&k.allowPointSelect&&(f=function(a){e.select&&e.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});h(this,a,c,f)},visible:!0}})(K);(function(a){var C=a.addEvent,D=a.animObject,E=a.arrayMax,m=a.arrayMin,h=a.correctFloat,f=a.defaultOptions,r=a.defaultPlotOptions,y=a.defined,q=a.each,w=a.erase,e=a.extend,c=a.fireEvent,l=a.grep,z=a.isArray,k=a.isNumber,d=a.isString,b=a.merge,u=a.objectEach,p=a.pick,H=a.removeEvent,
t=a.splat,L=a.SVGElement,x=a.syncTimeout,I=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,
-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x",
"y"],coll:"series",init:function(a,b){var d=this,n,f=a.series,g;d.chart=a;d.options=b=d.setOptions(b);d.linkedSeries=[];d.bindAxes();e(d,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});n=b.events;u(n,function(a,b){C(d,b,a)});if(n&&n.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;d.getColor();d.getSymbol();q(d.parallelArrays,function(a){d[a+"Data"]=[]});d.setData(b.data,!1);d.isCartesian&&(a.hasCartesianSeries=!0);f.length&&(g=
f[f.length-1]);d._i=p(g&&g._i,-1)+1;a.orderSeries(this.insert(f));c(this,"afterInit")},insert:function(a){var b=this.options.index,c;if(k(b)){for(c=a.length;c--;)if(b>=p(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return p(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,e;q(b.axisTypes||[],function(f){q(d[f],function(a){e=a.options;if(c[f]===e.index||void 0!==c[f]&&c[f]===e.id||void 0===c[f]&&0===e.index)b.insert(a.series),
b[f]=a,a.isDirty=!0});b[f]||b.optionalAxis===f||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,e=k(b)?function(d){var g="y"===d&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=g}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};q(c.parallelArrays,e)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,e=this.chart.time,b=p(b,a.pointStart,0);this.pointInterval=c=p(this.pointInterval,a.pointInterval,1);
d&&(a=new e.Date(b),"day"===d?e.set("Date",a,e.get("Date",a)+c):"month"===d?e.set("Month",a,e.get("Month",a)+c):"year"===d&&e.set("FullYear",a,e.get("FullYear",a)+c),c=a.getTime()-b);this.xIncrement=b+c;return b},setOptions:function(a){var d=this.chart,e=d.options,k=e.plotOptions,n=(d.userOptions||{}).plotOptions||{},g=k[this.type];this.userOptions=a;d=b(g,k.series,a);this.tooltipOptions=b(f.tooltip,f.plotOptions.series&&f.plotOptions.series.tooltip,f.plotOptions[this.type].tooltip,e.tooltip.userOptions,
k.series&&k.series.tooltip,k[this.type].tooltip,a.tooltip);this.stickyTracking=p(a.stickyTracking,n[this.type]&&n[this.type].stickyTracking,n.series&&n.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:d.stickyTracking);null===g.marker&&delete d.marker;this.zoneAxis=d.zoneAxis;a=this.zones=(d.zones||[]).slice();!d.negativeColor&&!d.negativeFillColor||d.zones||a.push({value:d[this.zoneAxis+"Threshold"]||d.threshold||0,className:"highcharts-negative",color:d.negativeColor,fillColor:d.negativeFillColor});
a.length&&y(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});c(this,"afterSetOptions",{options:d});return d},getName:function(){return this.name||"Series "+(this.index+1)},getCyclic:function(a,b,c){var d,e=this.chart,g=this.userOptions,f=a+"Index",k=a+"Counter",n=c?c.length:p(e.options.chart[a+"Count"],e[a+"Count"]);b||(d=p(g[f],g["_"+f]),y(d)||(e.series.length||(e[k]=0),g["_"+f]=d=e[k]%n,e[k]+=1),c&&(b=c[d]));void 0!==d&&(this[f]=d);this[a]=b},getColor:function(){this.options.colorByPoint?
this.options.color=null:this.getCyclic("color",this.options.color||r[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(b){var c=this.options,d=this.points,e=[],f,g,n,h=this.requireSorting;q(b,function(b){var g;g=a.defined(b)&&this.pointClass.prototype.optionsToObject.call({series:this},b).x;k(g)&&(g=a.inArray(g,this.xData,n),-1===g?
e.push(b):b!==c.data[g]?(d[g].update(b,!1,null,!1),d[g].touched=!0,h&&(n=g)):d[g]&&(d[g].touched=!0),f=!0)},this);if(f)for(b=d.length;b--;)g=d[b],g.touched||g.remove(!1),g.touched=!1;else if(b.length===d.length)q(b,function(a,b){d[b].update&&a!==c.data[b]&&d[b].update(a,!1,null,!1)});else return!1;q(e,function(a){this.addPoint(a,!1)},this);return!0},setData:function(b,c,e,f){var n=this,g=n.points,h=g&&g.length||0,l,B=n.options,G=n.chart,t=null,x=n.xAxis,u=B.turboThreshold,m=this.xData,r=this.yData,
w=(l=n.pointArrayMap)&&l.length,y;b=b||[];l=b.length;c=p(c,!0);!1!==f&&l&&h&&!n.cropped&&!n.hasGroupedData&&n.visible&&!n.isSeriesBoosting&&(y=this.updateData(b));if(!y){n.xIncrement=null;n.colorCounter=0;q(this.parallelArrays,function(a){n[a+"Data"].length=0});if(u&&l>u){for(e=0;null===t&&e<l;)t=b[e],e++;if(k(t))for(e=0;e<l;e++)m[e]=this.autoIncrement(),r[e]=b[e];else if(z(t))if(w)for(e=0;e<l;e++)t=b[e],m[e]=t[0],r[e]=t.slice(1,w+1);else for(e=0;e<l;e++)t=b[e],m[e]=t[0],r[e]=t[1];else a.error(12)}else for(e=
0;e<l;e++)void 0!==b[e]&&(t={series:n},n.pointClass.prototype.applyOptions.apply(t,[b[e]]),n.updateParallelArrays(t,e));r&&d(r[0])&&a.error(14,!0);n.data=[];n.options.data=n.userOptions.data=b;for(e=h;e--;)g[e]&&g[e].destroy&&g[e].destroy();x&&(x.minRange=x.userMinRange);n.isDirty=G.isDirtyBox=!0;n.isDirtyData=!!g;e=!1}"point"===B.legendType&&(this.processData(),this.generatePoints());c&&G.redraw(e)},processData:function(b){var c=this.xData,d=this.yData,e=c.length,f;f=0;var g,k,n=this.xAxis,h,l=this.options;
h=l.cropThreshold;var p=this.getExtremesFromAll||l.getExtremesFromAll,t=this.isCartesian,l=n&&n.val2lin,x=n&&n.isLog,u=this.requireSorting,m,z;if(t&&!this.isDirty&&!n.isDirty&&!this.yAxis.isDirty&&!b)return!1;n&&(b=n.getExtremes(),m=b.min,z=b.max);t&&this.sorted&&!p&&(!h||e>h||this.forceCrop)&&(c[e-1]<m||c[0]>z?(c=[],d=[]):this.yData&&(c[0]<m||c[e-1]>z)&&(f=this.cropData(this.xData,this.yData,m,z),c=f.xData,d=f.yData,f=f.start,g=!0));for(h=c.length||1;--h;)e=x?l(c[h])-l(c[h-1]):c[h]-c[h-1],0<e&&(void 0===
k||e<k)?k=e:0>e&&u&&(a.error(15),u=!1);this.cropped=g;this.cropStart=f;this.processedXData=c;this.processedYData=d;this.closestPointRange=k},cropData:function(a,b,c,d,e){var g=a.length,f=0,k=g,n;e=p(e,this.cropShoulder,1);for(n=0;n<g;n++)if(a[n]>=c){f=Math.max(0,n-e);break}for(c=n;c<g;c++)if(a[c]>d){k=c+e;break}return{xData:a.slice(f,k),yData:b.slice(f,k),start:f,end:k}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,d,e=this.processedXData,g=this.processedYData,f=this.pointClass,
k=e.length,h=this.cropStart||0,l,p=this.hasGroupedData,a=a.keys,x,u=[],m;c||p||(c=[],c.length=b.length,c=this.data=c);a&&p&&(this.options.keys=!1);for(m=0;m<k;m++)l=h+m,p?(x=(new f).init(this,[e[m]].concat(t(g[m]))),x.dataGroup=this.groupMap[m]):(x=c[l])||void 0===b[l]||(c[l]=x=(new f).init(this,b[l],e[m])),x&&(x.index=l,u[m]=x);this.options.keys=a;if(c&&(k!==(d=c.length)||p))for(m=0;m<d;m++)m!==h||p||(m+=k),c[m]&&(c[m].destroyElements(),c[m].plotX=void 0);this.data=c;this.points=u},getExtremes:function(a){var b=
this.yAxis,c=this.processedXData,d,e=[],g=0;d=this.xAxis.getExtremes();var f=d.min,n=d.max,h,l,p=this.requireSorting?1:0,t,x;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(x=0;x<d;x++)if(l=c[x],t=a[x],h=(k(t,!0)||z(t))&&(!b.positiveValuesOnly||t.length||0<t),l=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[x+p]||l)>=f&&(c[x-p]||l)<=n,h&&l)if(h=t.length)for(;h--;)"number"===typeof t[h]&&(e[g++]=t[h]);else e[g++]=t;this.dataMin=m(e);this.dataMax=E(e)},translate:function(){this.processedXData||
this.processData();this.generatePoints();var a=this.options,b=a.stacking,d=this.xAxis,e=d.categories,f=this.yAxis,g=this.points,l=g.length,t=!!this.modifyValue,x=a.pointPlacement,m="between"===x||k(x),u=a.threshold,z=a.startFromThreshold?u:0,q,r,w,I,H=Number.MAX_VALUE;"between"===x&&(x=.5);k(x)&&(x*=p(a.pointRange||d.pointRange));for(a=0;a<l;a++){var L=g[a],C=L.x,D=L.y;r=L.low;var E=b&&f.stacks[(this.negStacks&&D<(z?0:u)?"-":"")+this.stackKey],K;f.positiveValuesOnly&&null!==D&&0>=D&&(L.isNull=!0);
L.plotX=q=h(Math.min(Math.max(-1E5,d.translate(C,0,0,0,1,x,"flags"===this.type)),1E5));b&&this.visible&&!L.isNull&&E&&E[C]&&(I=this.getStackIndicator(I,C,this.index),K=E[C],D=K.points[I.key],r=D[0],D=D[1],r===z&&I.key===E[C].base&&(r=p(k(u)&&u,f.min)),f.positiveValuesOnly&&0>=r&&(r=null),L.total=L.stackTotal=K.total,L.percentage=K.total&&L.y/K.total*100,L.stackY=D,K.setOffset(this.pointXOffset||0,this.barW||0));L.yBottom=y(r)?Math.min(Math.max(-1E5,f.translate(r,0,1,0,1)),1E5):null;t&&(D=this.modifyValue(D,
L));L.plotY=r="number"===typeof D&&Infinity!==D?Math.min(Math.max(-1E5,f.translate(D,0,1,0,1)),1E5):void 0;L.isInside=void 0!==r&&0<=r&&r<=f.len&&0<=q&&q<=d.len;L.clientX=m?h(d.translate(C,0,0,0,1,x)):q;L.negative=L.y<(u||0);L.category=e&&void 0!==e[L.x]?e[L.x]:L.x;L.isNull||(void 0!==w&&(H=Math.min(H,Math.abs(q-w))),w=q);L.zone=this.zones.length&&L.getZone()}this.closestPointRangePx=H;c(this,"afterTranslate")},getValidPoints:function(a,b){var c=this.chart;return l(a||this.points||[],function(a){return b&&
!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,g=this.clipBox,f=g||b.clipBox,k=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,f.height,c.xAxis,c.yAxis].join(),n=b[k],h=b[k+"m"];n||(a&&(f.width=0,e&&(f.x=b.plotSizeX),b[k+"m"]=h=d.clipRect(e?b.plotSizeX+99:-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight)),b[k]=n=d.clipRect(f),n.count={length:0});a&&!n.count[this.index]&&(n.count[this.index]=
!0,n.count.length+=1);!1!==c.clip&&(this.group.clip(a||g?n:b.clipRect),this.markerGroup.clip(h),this.sharedClipKey=k);a||(n.count[this.index]&&(delete n.count[this.index],--n.count.length),0===n.count.length&&k&&b[k]&&(g||(b[k]=b[k].destroy()),b[k+"m"]&&(b[k+"m"]=b[k+"m"].destroy())))},animate:function(a){var b=this.chart,c=D(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX,x:0},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99,x:0},c),this.animate=
null)},afterAnimate:function(){this.setClip();c(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,d,e,g,f=this.options.marker,k,h,l,t=this[this.specialGroup]||this.markerGroup,x,m=p(f.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=f.enabledThreshold*f.radius);if(!1!==f.enabled||this._hasPointMarkers)for(c=0;c<a.length;c++)d=a[c],g=d.graphic,k=d.marker||{},h=!!d.marker,e=m&&void 0===k.enabled||k.enabled,l=d.isInside,e&&!d.isNull?(e=
p(k.symbol,this.symbol),x=this.markerAttribs(d,d.selected&&"select"),g?g[l?"show":"hide"](!0).animate(x):l&&(0<x.width||d.hasImage)&&(d.graphic=g=b.renderer.symbol(e,x.x,x.y,x.width,x.height,h?k:f).add(t)),g&&g.attr(this.pointAttribs(d,d.selected&&"select")),g&&g.addClass(d.getClassName(),!0)):g&&(d.graphic=g.destroy())},markerAttribs:function(a,b){var c=this.options.marker,d=a.marker||{},e=d.symbol||c.symbol,g=p(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],g=p(b&&b.radius,c&&c.radius,
g+(c&&c.radiusPlus||0)));a.hasImage=e&&0===e.indexOf("url");a.hasImage&&(g=0);a={x:Math.floor(a.plotX)-g,y:a.plotY-g};g&&(a.width=a.height=2*g);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,e=d&&d.marker||{},g=this.color,f=d&&d.color,k=a&&a.color,d=p(e.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;g=f||a||k||g;a=e.fillColor||c.fillColor||g;g=e.lineColor||c.lineColor||g;b&&(c=c.states[b],b=e.states&&e.states[b]||{},d=p(b.lineWidth,c.lineWidth,d+p(b.lineWidthPlus,
c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,g=b.lineColor||c.lineColor||g);return{stroke:g,"stroke-width":d,fill:a}},destroy:function(){var b=this,d=b.chart,e=/AppleWebKit\/533/.test(I.navigator.userAgent),f,k,g=b.data||[],h,l;c(b,"destroy");H(b);q(b.axisTypes||[],function(a){(l=b[a])&&l.series&&(w(l.series,b),l.isDirty=l.forceRedraw=!0)});b.legendItem&&b.chart.legend.destroyItem(b);for(k=g.length;k--;)(h=g[k])&&h.destroy&&h.destroy();b.points=null;a.clearTimeout(b.animationTimeout);u(b,function(a,
b){a instanceof L&&!a.survive&&(f=e&&"group"===b?"hide":"destroy",a[f]())});d.hoverSeries===b&&(d.hoverSeries=null);w(d.series,b);d.orderSeries();u(b,function(a,c){delete b[c]})},getGraphPath:function(a,b,c){var d=this,e=d.options,g=e.step,f,k=[],n=[],h;a=a||d.points;(f=a.reversed)&&a.reverse();(g={right:1,center:2}[g]||g&&3)&&f&&(g=4-g);!e.connectNulls||b||c||(a=this.getValidPoints(a));q(a,function(f,l){var p=f.plotX,t=f.plotY,x=a[l-1];(f.leftCliff||x&&x.rightCliff)&&!c&&(h=!0);f.isNull&&!y(b)&&
0<l?h=!e.connectNulls:f.isNull&&!b?h=!0:(0===l||h?l=["M",f.plotX,f.plotY]:d.getPointSpline?l=d.getPointSpline(a,f,l):g?(l=1===g?["L",x.plotX,t]:2===g?["L",(x.plotX+p)/2,x.plotY,"L",(x.plotX+p)/2,t]:["L",p,x.plotY],l.push("L",p,t)):l=["L",p,t],n.push(f.x),g&&(n.push(f.x),2===g&&n.push(f.x)),k.push.apply(k,l),h=!1)});k.xMap=n;return d.graphPath=k},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]],
d=a.getZonesGraphs(d);q(d,function(d,e){var g=d[0],f=a[g];f?(f.endX=a.preventGraphAnimation?null:c.xMap,f.animate({d:c})):c.length&&(a[g]=a.chart.renderer.path(c).addClass(d[1]).attr({zIndex:1}).add(a.group),f={stroke:d[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},d[3]?f.dashstyle=d[3]:"square"!==b.linecap&&(f["stroke-linecap"]=f["stroke-linejoin"]="round"),f=a[g].attr(f).shadow(2>e&&b.shadow));f&&(f.startX=c.xMap,f.isArea=c.isArea)})},getZonesGraphs:function(a){q(this.zones,function(b,
c){a.push(["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+c+" "+(b.className||""),b.color||this.color,b.dashStyle||this.options.dashStyle])},this);return a},applyZones:function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e,g,f=this.clips||[],k,h=this.graph,l=this.area,t=Math.max(b.chartWidth,b.chartHeight),x=this[(this.zoneAxis||"y")+"Axis"],m,u,z=b.inverted,r,w,y,I,H=!1;d.length&&(h||l)&&x&&void 0!==x.min&&(u=x.reversed,r=x.horiz,h&&!this.showLine&&h.hide(),l&&l.hide(),m=x.getExtremes(),
q(d,function(d,n){e=u?r?b.plotWidth:0:r?0:x.toPixels(m.min);e=Math.min(Math.max(p(g,e),0),t);g=Math.min(Math.max(Math.round(x.toPixels(p(d.value,m.max),!0)),0),t);H&&(e=g=x.toPixels(m.max));w=Math.abs(e-g);y=Math.min(e,g);I=Math.max(e,g);x.isXAxis?(k={x:z?I:y,y:0,width:w,height:t},r||(k.x=b.plotHeight-k.x)):(k={x:0,y:z?I:y,width:t,height:w},r&&(k.y=b.plotWidth-k.y));z&&c.isVML&&(k=x.isXAxis?{x:0,y:u?y:I,height:k.width,width:b.chartWidth}:{x:k.y-b.plotLeft-b.spacingBox.x,y:0,width:k.height,height:b.chartHeight});
f[n]?f[n].animate(k):(f[n]=c.clipRect(k),h&&a["zone-graph-"+n].clip(f[n]),l&&a["zone-area-"+n].clip(f[n]));H=d.value>m.max;a.resetZones&&0===g&&(g=void 0)}),this.clips=f)},invertGroups:function(a){function b(){q(["group","markerGroup"],function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,e;c.xAxis&&(e=C(d,"resize",b),C(c,"destroy",e),b(a),c.invertGroups=b)},plotGroup:function(a,
b,c,d,e){var g=this[a],f=!g;f&&(this[a]=g=this.chart.renderer.g().attr({zIndex:d||.1}).add(e));g.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(y(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(g.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);g.attr({visibility:c})[f?"attr":"animate"](this.getPlotBox());return g},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,
c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,d,e=a.options,f=!!a.animate&&b.renderer.isSVG&&D(e.animation).duration,g=a.visible?"inherit":"hidden",k=e.zIndex,h=a.hasRendered,l=b.seriesGroup,p=b.inverted;d=a.plotGroup("group","series",g,k,l);a.markerGroup=a.plotGroup("markerGroup","markers",g,k,l);f&&a.animate(!0);d.inverted=a.isCartesian?p:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&
a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(p);!1===e.clip||a.sharedClipKey||h||d.clip(b.clipRect);f&&a.animate();h||(a.animationTimeout=x(function(){a.afterAnimate()},f));a.isDirty=!1;a.hasRendered=!0;c(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:p(d&&
d.left,a.plotLeft),translateY:p(e&&e.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,d,e){var g,f;if(f=c&&c.length)return g=b.kdAxisArray[d%e],c.sort(function(a,b){return a[g]-b[g]}),f=Math.floor(f/2),{point:c[f],
left:a(c.slice(0,f),d+1,e),right:a(c.slice(f+1),d+1,e)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;x(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,k,h){var l=b.point,n=d.kdAxisArray[k%h],p,t,x=l;t=y(a[e])&&y(l[e])?Math.pow(a[e]-l[e],2):null;p=y(a[g])&&y(l[g])?Math.pow(a[g]-l[g],2):null;p=(t||0)+(p||0);l.dist=y(p)?Math.sqrt(p):Number.MAX_VALUE;
l.distX=y(t)?Math.sqrt(t):Number.MAX_VALUE;n=a[n]-l[n];p=0>n?"left":"right";t=0>n?"right":"left";b[p]&&(p=c(a,b[p],k+1,h),x=p[f]<x[f]?p:l);b[t]&&Math.sqrt(n*n)<x[f]&&(a=c(a,b[t],k+1,h),x=a[f]<x[f]?a:x);return x}var d=this,e=this.kdAxisArray[0],g=this.kdAxisArray[1],f=b?"distX":"dist";b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(K);(function(a){var C=a.Axis,D=a.Chart,E=a.correctFloat,m=a.defined,
h=a.destroyObjectProperties,f=a.each,r=a.format,y=a.objectEach,q=a.pick,w=a.Series;a.StackItem=function(a,c,f,h,k){var d=a.chart.inverted;this.axis=a;this.isNegative=f;this.options=c;this.x=h;this.total=null;this.points={};this.stack=k;this.rightCliff=this.leftCliff=0;this.alignOptions={align:c.align||(d?f?"left":"right":"center"),verticalAlign:c.verticalAlign||(d?"middle":f?"bottom":"top"),y:q(c.y,d?4:f?14:-6),x:q(c.x,d?f?-6:6:0)};this.textAlign=c.textAlign||(d?f?"right":"left":"center")};a.StackItem.prototype=
{destroy:function(){h(this,this.axis)},render:function(a){var c=this.axis.chart,e=this.options,f=e.format,f=f?r(f,this,c.time):e.formatter.call(this);this.label?this.label.attr({text:f,visibility:"hidden"}):this.label=c.renderer.text(f,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,rotation:e.rotation,visibility:"hidden"}).add(a);this.label.labelrank=c.plotHeight},setOffset:function(a,c){var e=this.axis,f=e.chart,k=e.translate(e.usePercentage?100:this.total,0,0,0,1),d=e.translate(0),
d=m(k)&&Math.abs(k-d);a=f.xAxis[0].translate(this.x)+a;e=m(k)&&this.getStackBox(f,this,a,k,c,d,e);(c=this.label)&&e&&(c.align(this.alignOptions,null,e),e=c.alignAttr,c[!1===this.options.crop||f.isInsidePlot(e.x,e.y)?"show":"hide"](!0))},getStackBox:function(a,c,f,h,k,d,b){var e=c.axis.reversed,l=a.inverted;a=b.height+b.pos-(l?a.plotLeft:a.plotTop);c=c.isNegative&&!e||!c.isNegative&&e;return{x:l?c?h:h-d:f,y:l?a-f-k:c?a-h-d:a-h,width:l?d:k,height:l?k:d}}};D.prototype.getStacks=function(){var a=this;
f(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});f(a.series,function(c){!c.options.stacking||!0!==c.visible&&!1!==a.options.chart.ignoreHiddenSeries||(c.stackKey=c.type+q(c.options.stack,""))})};C.prototype.buildStacks=function(){var a=this.series,c=q(this.options.reversedStacks,!0),f=a.length,h;if(!this.isXAxis){this.usePercentage=!1;for(h=f;h--;)a[c?h:f-h-1].setStackedPoints();for(h=0;h<f;h++)a[h].modifyStacks()}};C.prototype.renderStackTotals=function(){var a=this.chart,
c=a.renderer,f=this.stacks,h=this.stackTotalGroup;h||(this.stackTotalGroup=h=c.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());h.translate(a.plotLeft,a.plotTop);y(f,function(a){y(a,function(a){a.render(h)})})};C.prototype.resetStacks=function(){var a=this,c=a.stacks;a.isXAxis||y(c,function(c){y(c,function(e,f){e.touched<a.stacksTouched?(e.destroy(),delete c[f]):(e.total=null,e.cumulative=null)})})};C.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=
this.oldStacks),y(a,function(a){y(a,function(a){a.cumulative=a.total})}))};w.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var e=this.processedXData,c=this.processedYData,f=[],h=c.length,k=this.options,d=k.threshold,b=q(k.startFromThreshold&&d,0),u=k.stack,k=k.stacking,p=this.stackKey,r="-"+p,t=this.negStacks,w=this.yAxis,x=w.stacks,y=w.oldStacks,n,G,B,M,F,g,v;w.stacksTouched+=1;for(F=0;F<h;F++)g=e[F],v=c[F],
n=this.getStackIndicator(n,g,this.index),M=n.key,B=(G=t&&v<(b?0:d))?r:p,x[B]||(x[B]={}),x[B][g]||(y[B]&&y[B][g]?(x[B][g]=y[B][g],x[B][g].total=null):x[B][g]=new a.StackItem(w,w.options.stackLabels,G,g,u)),B=x[B][g],null!==v?(B.points[M]=B.points[this.index]=[q(B.cumulative,b)],m(B.cumulative)||(B.base=M),B.touched=w.stacksTouched,0<n.index&&!1===this.singleStacks&&(B.points[M][0]=B.points[this.index+","+g+",0"][0])):B.points[M]=B.points[this.index]=null,"percent"===k?(G=G?p:r,t&&x[G]&&x[G][g]?(G=
x[G][g],B.total=G.total=Math.max(G.total,B.total)+Math.abs(v)||0):B.total=E(B.total+(Math.abs(v)||0))):B.total=E(B.total+(v||0)),B.cumulative=q(B.cumulative,b)+(v||0),null!==v&&(B.points[M].push(B.cumulative),f[F]=B.cumulative);"percent"===k&&(w.usePercentage=!0);this.stackedYData=f;w.oldStacks={}}};w.prototype.modifyStacks=function(){var a=this,c=a.stackKey,h=a.yAxis.stacks,m=a.processedXData,k,d=a.options.stacking;a[d+"Stacker"]&&f([c,"-"+c],function(b){for(var c=m.length,e,f;c--;)if(e=m[c],k=a.getStackIndicator(k,
e,a.index,b),f=(e=h[b]&&h[b][e])&&e.points[k.key])a[d+"Stacker"](f,e,c)})};w.prototype.percentStacker=function(a,c,f){c=c.total?100/c.total:0;a[0]=E(a[0]*c);a[1]=E(a[1]*c);this.stackedYData[f]=a[1]};w.prototype.getStackIndicator=function(a,c,f,h){!m(a)||a.x!==c||h&&a.key!==h?a={x:c,index:0,key:h}:a.index++;a.key=[f,c,a.index].join();return a}})(K);(function(a){var C=a.addEvent,D=a.animate,E=a.Axis,m=a.createElement,h=a.css,f=a.defined,r=a.each,y=a.erase,q=a.extend,w=a.fireEvent,e=a.inArray,c=a.isNumber,
l=a.isObject,z=a.isArray,k=a.merge,d=a.objectEach,b=a.pick,u=a.Point,p=a.Series,H=a.seriesTypes,t=a.setAnimation,L=a.splat;q(a.Chart.prototype,{addSeries:function(a,c,d){var e,f=this;a&&(c=b(c,!0),w(f,"addSeries",{options:a},function(){e=f.initSeries(a);f.isDirtyLegend=!0;f.linkSeries();w(f,"afterAddSeries");c&&f.redraw(d)}));return e},addAxis:function(a,c,d,e){var f=c?"xAxis":"yAxis",h=this.options;a=k(a,{index:this[f].length,isX:c});c=new E(this,a);h[f]=L(h[f]||{});h[f].push(a);b(d,!0)&&this.redraw(e);
return c},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function(){d&&h(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};d||(b.loadingDiv=d=m("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=m("span",{className:"highcharts-loading-inner"},null,d),C(b,"redraw",f));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;h(d,q(e.style,{zIndex:10}));h(b.loadingSpan,
e.labelStyle);b.loadingShown||(h(d,{opacity:0,display:""}),D(d,{opacity:e.style.opacity||.5},{duration:e.showDuration||0}));b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",D(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){h(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),update:function(a,h,l,p){var n=this,t={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},x=a.chart,g,m,u=[];w(n,"update",{options:a});if(x){k(!0,n.options.chart,x);"className"in x&&n.setClassName(x.className);"reflow"in x&&n.setReflow(x.reflow);if("inverted"in x||"polar"in x||"type"in x)n.propFromSeries(),g=!0;"alignTicks"in x&&(g=!0);d(x,function(a,b){-1!==
e("chart."+b,n.propsRequireUpdateSeries)&&(m=!0);-1!==e(b,n.propsRequireDirtyBox)&&(n.isDirtyBox=!0)});"style"in x&&n.renderer.setStyle(x.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&k(!0,this.options.plotOptions,a.plotOptions);d(a,function(a,b){if(n[b]&&"function"===typeof n[b].update)n[b].update(a,!1);else if("function"===typeof n[t[b]])n[t[b]](a);"chart"!==b&&-1!==e(b,n.propsRequireUpdateSeries)&&(m=!0)});r("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){var c;
a[b]&&("series"===b&&(c=[],r(n[b],function(a,b){a.options.isInternal||c.push(b)})),r(L(a[b]),function(a,d){(d=f(a.id)&&n.get(a.id)||n[b][c?c[d]:d])&&d.coll===b&&(d.update(a,!1),l&&(d.touched=!0));if(!d&&l)if("series"===b)n.addSeries(a,!1).touched=!0;else if("xAxis"===b||"yAxis"===b)n.addAxis(a,"xAxis"===b,!1).touched=!0}),l&&r(n[b],function(a){a.touched||a.options.isInternal?delete a.touched:u.push(a)}))});r(u,function(a){a.remove(!1)});g&&r(n.axes,function(a){a.update({},!1)});m&&r(n.series,function(a){a.update({},
!1)});a.loading&&k(!0,n.options.loading,a.loading);g=x&&x.width;x=x&&x.height;c(g)&&g!==n.chartWidth||c(x)&&x!==n.chartHeight?n.setSize(g,x,p):b(h,!0)&&n.redraw(p);w(n,"afterUpdate",{options:a})},setSubtitle:function(a){this.setTitle(void 0,a)}});q(u.prototype,{update:function(a,c,d,e){function f(){k.applyOptions(a);null===k.y&&g&&(k.graphic=g.destroy());l(a,!0)&&(g&&g.element&&a&&a.marker&&void 0!==a.marker.symbol&&(k.graphic=g.destroy()),a&&a.dataLabels&&k.dataLabel&&(k.dataLabel=k.dataLabel.destroy()),
k.connector&&(k.connector=k.connector.destroy()));n=k.index;h.updateParallelArrays(k,n);t.data[n]=l(t.data[n],!0)||l(a,!0)?k.options:b(a,t.data[n]);h.isDirty=h.isDirtyData=!0;!h.fixedBox&&h.hasCartesianSeries&&(p.isDirtyBox=!0);"point"===t.legendType&&(p.isDirtyLegend=!0);c&&p.redraw(d)}var k=this,h=k.series,g=k.graphic,n,p=h.chart,t=h.options;c=b(c,!0);!1===e?f():k.firePointEvent("update",{options:a},f)},remove:function(a,b){this.series.removePoint(e(this,this.series.data),a,b)}});q(p.prototype,
{addPoint:function(a,c,d,e){var f=this.options,k=this.data,h=this.chart,g=this.xAxis,g=g&&g.hasNames&&g.names,n=f.data,l,p,t=this.xData,x,m;c=b(c,!0);l={series:this};this.pointClass.prototype.applyOptions.apply(l,[a]);m=l.x;x=t.length;if(this.requireSorting&&m<t[x-1])for(p=!0;x&&t[x-1]>m;)x--;this.updateParallelArrays(l,"splice",x,0,0);this.updateParallelArrays(l,x);g&&l.name&&(g[m]=l.name);n.splice(x,0,a);p&&(this.data.splice(x,0,null),this.processData());"point"===f.legendType&&this.generatePoints();
d&&(k[0]&&k[0].remove?k[0].remove(!1):(k.shift(),this.updateParallelArrays(l,"shift"),n.shift()));this.isDirtyData=this.isDirty=!0;c&&h.redraw(e)},removePoint:function(a,c,d){var e=this,f=e.data,k=f[a],h=e.points,g=e.chart,n=function(){h&&h.length===f.length&&h.splice(a,1);f.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(k||{series:e},"splice",a,1);k&&k.destroy();e.isDirty=!0;e.isDirtyData=!0;c&&g.redraw()};t(d,g);c=b(c,!0);k?k.firePointEvent("remove",null,n):n()},remove:function(a,
c,d){function e(){f.destroy();k.isDirtyLegend=k.isDirtyBox=!0;k.linkSeries();b(a,!0)&&k.redraw(c)}var f=this,k=f.chart;!1!==d?w(f,"remove",null,e):e()},update:function(c,d){var f=this,h=f.chart,l=f.userOptions,p=f.oldType||f.type,t=c.type||l.type||h.options.chart.type,g=H[p].prototype,x,m=["group","markerGroup","dataLabelsGroup"],u=["navigatorSeries","baseSeries"],z=f.finishedAnimating&&{animation:!1},y=["data","name","turboThreshold"],I=a.keys(c),A=0<I.length;r(I,function(a){-1===e(a,y)&&(A=!1)});
if(A)c.data&&this.setData(c.data,!1),c.name&&this.setName(c.name,!1);else{u=m.concat(u);r(u,function(a){u[a]=f[a];delete f[a]});c=k(l,z,{index:f.index,pointStart:b(l.pointStart,f.xData[0])},{data:f.options.data},c);f.remove(!1,null,!1);for(x in g)f[x]=void 0;H[t||p]?q(f,H[t||p].prototype):a.error(17,!0);r(u,function(a){f[a]=u[a]});f.init(h,c);c.zIndex!==l.zIndex&&r(m,function(a){f[a]&&f[a].attr({zIndex:c.zIndex})});f.oldType=p;h.linkSeries()}w(this,"afterUpdate");b(d,!0)&&h.redraw(!1)},setName:function(a){this.name=
this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});q(E.prototype,{update:function(a,c){var e=this.chart,f=a&&a.events||{};a=k(this.userOptions,a);e.options[this.coll].indexOf&&(e.options[this.coll][e.options[this.coll].indexOf(this.userOptions)]=a);d(e.options[this.coll].events,function(a,b){"undefined"===typeof f[b]&&(f[b]=void 0)});this.destroy(!0);this.init(e,q(a,{events:f}));e.isDirtyBox=!0;b(c,!0)&&e.redraw()},remove:function(a){for(var c=this.chart,d=this.coll,e=this.series,
f=e.length;f--;)e[f]&&e[f].remove(!1);y(c.axes,this);y(c[d],this);z(c.options[d])?c.options[d].splice(this.options.index,1):delete c.options[d];r(c[d],function(a,b){a.options.index=a.userOptions.index=b});this.destroy();c.isDirtyBox=!0;b(a,!0)&&c.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(K);(function(a){var C=a.color,D=a.each,E=a.map,m=a.pick,h=a.Series,f=a.seriesType;f("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,
getStackPoints:function(f){var h=[],q=[],r=this.xAxis,e=this.yAxis,c=e.stacks[this.stackKey],l={},z=this.index,k=e.series,d=k.length,b,u=m(e.options.reversedStacks,!0)?1:-1,p;f=f||this.points;if(this.options.stacking){for(p=0;p<f.length;p++)f[p].leftNull=f[p].rightNull=null,l[f[p].x]=f[p];a.objectEach(c,function(a,b){null!==a.total&&q.push(b)});q.sort(function(a,b){return a-b});b=E(k,function(){return this.visible});D(q,function(a,f){var k=0,t,m;if(l[a]&&!l[a].isNull)h.push(l[a]),D([-1,1],function(e){var k=
1===e?"rightNull":"leftNull",h=0,n=c[q[f+e]];if(n)for(p=z;0<=p&&p<d;)t=n.points[p],t||(p===z?l[a][k]=!0:b[p]&&(m=c[a].points[p])&&(h-=m[1]-m[0])),p+=u;l[a][1===e?"rightCliff":"leftCliff"]=h});else{for(p=z;0<=p&&p<d;){if(t=c[a].points[p]){k=t[1];break}p+=u}k=e.translate(k,0,1,0,1);h.push({isNull:!0,plotX:r.translate(a,0,0,0,1),x:a,plotY:k,yBottom:k})}})}return h},getGraphPath:function(a){var f=h.prototype.getGraphPath,q=this.options,r=q.stacking,e=this.yAxis,c,l,z=[],k=[],d=this.index,b,u=e.stacks[this.stackKey],
p=q.threshold,H=e.getThreshold(q.threshold),t,q=q.connectNulls||"percent"===r,L=function(c,f,h){var l=a[c];c=r&&u[l.x].points[d];var n=l[h+"Null"]||0;h=l[h+"Cliff"]||0;var t,m,l=!0;h||n?(t=(n?c[0]:c[1])+h,m=c[0]+h,l=!!n):!r&&a[f]&&a[f].isNull&&(t=m=p);void 0!==t&&(k.push({plotX:b,plotY:null===t?H:e.getThreshold(t),isNull:l,isCliff:!0}),z.push({plotX:b,plotY:null===m?H:e.getThreshold(m),doCurve:!1}))};a=a||this.points;r&&(a=this.getStackPoints(a));for(c=0;c<a.length;c++)if(l=a[c].isNull,b=m(a[c].rectPlotX,
a[c].plotX),t=m(a[c].yBottom,H),!l||q)q||L(c,c-1,"left"),l&&!r&&q||(k.push(a[c]),z.push({x:c,plotX:b,plotY:t})),q||L(c,c+1,"right");c=f.call(this,k,!0,!0);z.reversed=!0;l=f.call(this,z,!0,!0);l.length&&(l[0]="L");l=c.concat(l);f=f.call(this,k,!1,q);l.xMap=c.xMap;this.areaPath=l;return f},drawGraph:function(){this.areaPath=[];h.prototype.drawGraph.apply(this);var a=this,f=this.areaPath,q=this.options,w=[["area","highcharts-area",this.color,q.fillColor]];D(this.zones,function(e,c){w.push(["zone-area-"+
c,"highcharts-area highcharts-zone-area-"+c+" "+e.className,e.color||a.color,e.fillColor||q.fillColor])});D(w,function(e){var c=e[0],h=a[c];h?(h.endX=a.preventGraphAnimation?null:f.xMap,h.animate({d:f})):(h=a[c]=a.chart.renderer.path(f).addClass(e[1]).attr({fill:m(e[3],C(e[2]).setOpacity(m(q.fillOpacity,.75)).get()),zIndex:0}).add(a.group),h.isArea=!0);h.startX=f.xMap;h.shiftUnit=q.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var C=a.pick;a=a.seriesType;a("spline",
"line",{},{getPointSpline:function(a,E,m){var h=E.plotX,f=E.plotY,r=a[m-1];m=a[m+1];var y,q,w,e;if(r&&!r.isNull&&!1!==r.doCurve&&!E.isCliff&&m&&!m.isNull&&!1!==m.doCurve&&!E.isCliff){a=r.plotY;w=m.plotX;m=m.plotY;var c=0;y=(1.5*h+r.plotX)/2.5;q=(1.5*f+a)/2.5;w=(1.5*h+w)/2.5;e=(1.5*f+m)/2.5;w!==y&&(c=(e-q)*(w-h)/(w-y)+f-e);q+=c;e+=c;q>a&&q>f?(q=Math.max(a,f),e=2*f-q):q<a&&q<f&&(q=Math.min(a,f),e=2*f-q);e>m&&e>f?(e=Math.max(m,f),q=2*f-e):e<m&&e<f&&(e=Math.min(m,f),q=2*f-e);E.rightContX=w;E.rightContY=
e}E=["C",C(r.rightContX,r.plotX),C(r.rightContY,r.plotY),C(y,h),C(q,f),h,f];r.rightContX=r.rightContY=null;return E}})})(K);(function(a){var C=a.seriesTypes.area.prototype,D=a.seriesType;D("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:C.getStackPoints,getGraphPath:C.getGraphPath,drawGraph:C.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var C=a.animObject,D=a.color,E=a.each,m=a.extend,h=a.isNumber,f=a.merge,r=a.pick,y=a.Series,q=a.seriesType,w=a.svg;
q("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){y.prototype.init.apply(this,
arguments);var a=this,c=a.chart;c.hasRendered&&E(c.series,function(c){c.type===a.type&&(c.isDirty=!0)})},getColumnMetrics:function(){var a=this,c=a.options,f=a.xAxis,h=a.yAxis,k=f.options.reversedStacks,k=f.reversed&&!k||!f.reversed&&k,d,b={},m=0;!1===c.grouping?m=1:E(a.chart.series,function(c){var e=c.options,f=c.yAxis,k;c.type!==a.type||!c.visible&&a.chart.options.chart.ignoreHiddenSeries||h.len!==f.len||h.pos!==f.pos||(e.stacking?(d=c.stackKey,void 0===b[d]&&(b[d]=m++),k=b[d]):!1!==e.grouping&&
(k=m++),c.columnIndex=k)});var p=Math.min(Math.abs(f.transA)*(f.ordinalSlope||c.pointRange||f.closestPointRange||f.tickInterval||1),f.len),q=p*c.groupPadding,t=(p-2*q)/(m||1),c=Math.min(c.maxPointWidth||f.len,r(c.pointWidth,t*(1-2*c.pointPadding)));a.columnMetrics={width:c,offset:(t-c)/2+(q+((a.columnIndex||0)+(k?1:0))*t-p/2)*(k?-1:1)};return a.columnMetrics},crispCol:function(a,c,f,h){var e=this.chart,d=this.borderWidth,b=-(d%2?.5:0),d=d%2?.5:1;e.inverted&&e.renderer.isVML&&(d+=1);this.options.crisp&&
(f=Math.round(a+f)+b,a=Math.round(a)+b,f-=a);h=Math.round(c+h)+d;b=.5>=Math.abs(c)&&.5<h;c=Math.round(c)+d;h-=c;b&&h&&(--c,h+=1);return{x:a,y:c,width:f,height:h}},translate:function(){var a=this,c=a.chart,f=a.options,h=a.dense=2>a.closestPointRange*a.xAxis.transA,h=a.borderWidth=r(f.borderWidth,h?0:1),k=a.yAxis,d=f.threshold,b=a.translatedThreshold=k.getThreshold(d),m=r(f.minPointLength,5),p=a.getColumnMetrics(),q=p.width,t=a.barW=Math.max(q,1+2*h),w=a.pointXOffset=p.offset;c.inverted&&(b-=.5);f.pointPadding&&
(t=Math.ceil(t));y.prototype.translate.apply(a);E(a.points,function(e){var f=r(e.yBottom,b),h=999+Math.abs(f),h=Math.min(Math.max(-h,e.plotY),k.len+h),l=e.plotX+w,p=t,u=Math.min(h,f),x,g=Math.max(h,f)-u;m&&Math.abs(g)<m&&(g=m,x=!k.reversed&&!e.negative||k.reversed&&e.negative,e.y===d&&a.dataMax<=d&&k.min<d&&(x=!x),u=Math.abs(u-b)>m?f-m:b-(x?m:0));e.barX=l;e.pointWidth=q;e.tooltipPos=c.inverted?[k.len+k.pos-c.plotLeft-h,a.xAxis.len-l-p/2,g]:[l+p/2,h+k.pos-c.plotTop,g];e.shapeType="rect";e.shapeArgs=
a.crispCol.apply(a,e.isNull?[l,b,p,0]:[l,u,p,g])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,c){var e=this.options,h,k=this.pointAttrToOptions||{};h=k.stroke||"borderColor";var d=k["stroke-width"]||"borderWidth",b=a&&a.color||this.color,m=a&&a[h]||e[h]||this.color||b,p=a&&a[d]||e[d]||this[d]||0,k=e.dashStyle;a&&this.zones.length&&(b=a.getZone(),b=a.options.color||
b&&b.color||this.color);c&&(a=f(e.states[c],a.options.states&&a.options.states[c]||{}),c=a.brightness,b=a.color||void 0!==c&&D(b).brighten(a.brightness).get()||b,m=a[h]||m,p=a[d]||p,k=a.dashStyle||k);h={fill:b,stroke:m,"stroke-width":p};k&&(h.dashstyle=k);return h},drawPoints:function(){var a=this,c=this.chart,l=a.options,m=c.renderer,k=l.animationLimit||250,d;E(a.points,function(b){var e=b.graphic,p=e&&c.pointCount<k?"animate":"attr";if(h(b.plotY)&&null!==b.y){d=b.shapeArgs;if(e)e[p](f(d));else b.graphic=
e=m[b.shapeType](d).add(b.group||a.group);l.borderRadius&&e.attr({r:l.borderRadius});e[p](a.pointAttribs(b,b.selected&&"select")).shadow(l.shadow,null,l.stacking&&!l.borderRadius);e.addClass(b.getClassName(),!0)}else e&&(b.graphic=e.destroy())})},animate:function(a){var c=this,f=this.yAxis,e=c.options,k=this.chart.inverted,d={},b=k?"translateX":"translateY",h;w&&(a?(d.scaleY=.001,a=Math.min(f.pos+f.len,Math.max(f.pos,f.toPixels(e.threshold))),k?d.translateX=a-f.len:d.translateY=a,c.group.attr(d)):
(h=c.group.attr(b),c.group.animate({scaleY:1},m(C(c.options.animation),{step:function(a,e){d[b]=h+e.pos*(f.pos-h);c.group.attr(d)}})),c.animate=null))},remove:function(){var a=this,c=a.chart;c.hasRendered&&E(c.series,function(c){c.type===a.type&&(c.isDirty=!0)});y.prototype.remove.apply(a,arguments)}})})(K);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(K);(function(a){var C=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&C.prototype.drawGraph.call(this)}})})(K);(function(a){var C=a.deg2rad,D=a.isNumber,E=a.pick,m=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,f=this.chart,r=2*(a.slicedOffset||0),y=f.plotWidth-2*r,
f=f.plotHeight-2*r,q=a.center,q=[E(q[0],"50%"),E(q[1],"50%"),a.size||"100%",a.innerSize||0],w=Math.min(y,f),e,c;for(e=0;4>e;++e)c=q[e],a=2>e||2===e&&/%$/.test(c),q[e]=m(c,[y,f,w,q[2]][e])+(a?r:0);q[3]>q[2]&&(q[3]=q[2]);return q},getStartAndEndRadians:function(a,f){a=D(a)?a:0;f=D(f)&&f>a&&360>f-a?f:a+360;return{start:C*(a+-90),end:C*(f+-90)}}}})(K);(function(a){var C=a.addEvent,D=a.CenteredSeriesMixin,E=a.defined,m=a.each,h=a.extend,f=D.getStartAndEndRadians,r=a.inArray,y=a.noop,q=a.pick,w=a.Point,
e=a.Series,c=a.seriesType,l=a.setAnimation;c("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,
trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var c=this,d=c.points,b=c.startAngleRad;a||(m(d,function(a){var d=a.graphic,f=a.shapeArgs;d&&(d.attr({r:a.startR||c.center[3]/2,start:b,end:b}),d.animate({r:f.r,start:f.start,end:f.end},c.options.animation))}),c.animate=null)},updateTotals:function(){var a,c=0,d=this.points,b=d.length,f,e=this.options.ignoreHiddenPoint;for(a=0;a<b;a++)f=d[a],c+=e&&!f.visible?0:f.isNull?
0:f.y;this.total=c;for(a=0;a<b;a++)f=d[a],f.percentage=0<c&&(f.visible||!e)?f.y/c*100:0,f.total=c},generatePoints:function(){e.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var c=0,d=this.options,b=d.slicedOffset,e=b+(d.borderWidth||0),h,l,t,m=f(d.startAngle,d.endAngle),x=this.startAngleRad=m.start,m=(this.endAngleRad=m.end)-x,r=this.points,n,w=d.dataLabels.distance,d=d.ignoreHiddenPoint,z,y=r.length,F;a||(this.center=a=this.getCenter());this.getX=
function(b,c,d){t=Math.asin(Math.min((b-a[1])/(a[2]/2+d.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(t)*(a[2]/2+d.labelDistance)};for(z=0;z<y;z++){F=r[z];F.labelDistance=q(F.options.dataLabels&&F.options.dataLabels.distance,w);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,F.labelDistance);h=x+c*m;if(!d||F.visible)c+=F.percentage/100;l=x+c*m;F.shapeType="arc";F.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*h)/1E3,end:Math.round(1E3*l)/1E3};t=(l+h)/2;t>1.5*Math.PI?
t-=2*Math.PI:t<-Math.PI/2&&(t+=2*Math.PI);F.slicedTranslation={translateX:Math.round(Math.cos(t)*b),translateY:Math.round(Math.sin(t)*b)};l=Math.cos(t)*a[2]/2;n=Math.sin(t)*a[2]/2;F.tooltipPos=[a[0]+.7*l,a[1]+.7*n];F.half=t<-Math.PI/2||t>Math.PI/2?1:0;F.angle=t;h=Math.min(e,F.labelDistance/5);F.labelPos=[a[0]+l+Math.cos(t)*F.labelDistance,a[1]+n+Math.sin(t)*F.labelDistance,a[0]+l+Math.cos(t)*h,a[1]+n+Math.sin(t)*h,a[0]+l,a[1]+n,0>F.labelDistance?"center":F.half?"right":"left",t]}},drawGraph:null,
drawPoints:function(){var a=this,c=a.chart.renderer,d,b,f,e,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=c.g("shadow").add(a.group));m(a.points,function(k){b=k.graphic;if(k.isNull)b&&(k.graphic=b.destroy());else{e=k.shapeArgs;d=k.getTranslate();var t=k.shadowGroup;l&&!t&&(t=k.shadowGroup=c.g("shadow").add(a.shadowGroup));t&&t.attr(d);f=a.pointAttribs(k,k.selected&&"select");b?b.setRadialReference(a.center).attr(f).animate(h(e,d)):(k.graphic=b=c[k.shapeType](e).setRadialReference(a.center).attr(d).add(a.group),
b.attr(f).attr({"stroke-linejoin":"round"}).shadow(l,t));b.attr({visibility:k.visible?"inherit":"hidden"});b.addClass(k.getClassName())}})},searchPoint:y,sortByAngle:function(a,c){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*c})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:D.getCenter,getSymbol:y},{init:function(){w.prototype.init.apply(this,arguments);var a=this,c;a.name=q(a.name,"Slice");c=function(c){a.slice("select"===c.type)};C(a,"select",c);C(a,"unselect",
c);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,c){var d=this,b=d.series,f=b.chart,e=b.options.ignoreHiddenPoint;c=q(c,e);a!==d.visible&&(d.visible=d.options.visible=a=void 0===a?!d.visible:a,b.options.data[r(d,b.data)]=d.options,m(["graphic","dataLabel","connector","shadowGroup"],function(b){if(d[b])d[b][a?"show":"hide"](!0)}),d.legendItem&&f.legend.colorizeItem(d,a),a||"hover"!==d.state||d.setState(""),e&&(b.isDirty=!0),c&&f.redraw())},slice:function(a,
c,d){var b=this.series;l(d,b.chart);q(c,!0);this.sliced=this.options.sliced=E(a)?a:!this.sliced;b.options.data[r(this,b.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var c=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:this.shapeArgs.r-
1,start:c.start,end:c.end})}})})(K);(function(a){var C=a.addEvent,D=a.arrayMax,E=a.defined,m=a.each,h=a.extend,f=a.format,r=a.map,y=a.merge,q=a.noop,w=a.pick,e=a.relativeLength,c=a.Series,l=a.seriesTypes,z=a.some,k=a.stableSort;a.distribute=function(c,b,f){function d(a,b){return a.target-b.target}var e,h=!0,l=c,x=[],q;q=0;var n=l.reducedLen||b;for(e=c.length;e--;)q+=c[e].size;if(q>n){k(c,function(a,b){return(b.rank||0)-(a.rank||0)});for(q=e=0;q<=n;)q+=c[e].size,e++;x=c.splice(e-1,c.length)}k(c,d);
for(c=r(c,function(a){return{size:a.size,targets:[a.target],align:w(a.align,.5)}});h;){for(e=c.length;e--;)h=c[e],q=(Math.min.apply(0,h.targets)+Math.max.apply(0,h.targets))/2,h.pos=Math.min(Math.max(0,q-h.size*h.align),b-h.size);e=c.length;for(h=!1;e--;)0<e&&c[e-1].pos+c[e-1].size>c[e].pos&&(c[e-1].size+=c[e].size,c[e-1].targets=c[e-1].targets.concat(c[e].targets),c[e-1].align=.5,c[e-1].pos+c[e-1].size>b&&(c[e-1].pos=b-c[e-1].size),c.splice(e,1),h=!0)}l.push.apply(l,x);e=0;z(c,function(c){var d=
0;if(z(c.targets,function(){l[e].pos=c.pos+d;if(Math.abs(l[e].pos-l[e].target)>f)return m(l.slice(0,e+1),function(a){delete a.pos}),l.reducedLen=(l.reducedLen||b)-.1*b,l.reducedLen>.1*b&&a.distribute(l,b,f),!0;d+=l[e].size;e++}))return!0});k(l,d)};c.prototype.drawDataLabels=function(){function c(a,b){var c=b.filter;return c?(b=c.operator,a=a[c.property],c=c.value,"\x3e"===b&&a>c||"\x3c"===b&&a<c||"\x3e\x3d"===b&&a>=c||"\x3c\x3d"===b&&a<=c||"\x3d\x3d"===b&&a==c||"\x3d\x3d\x3d"===b&&a===c?!0:!1):!0}
var b=this,e=b.chart,k=b.options,h=k.dataLabels,l=b.points,q,x,r=b.hasRendered||0,n,z,B=w(h.defer,!!k.animation),D=e.renderer;if(h.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(h),z=b.plotGroup("dataLabelsGroup","data-labels",B&&!r?"hidden":"visible",h.zIndex||6),B&&(z.attr({opacity:+r}),r||C(b,"afterAnimate",function(){b.visible&&z.show(!0);z[k.animation?"animate":"attr"]({opacity:1},{duration:200})})),x=h,m(l,function(d){var g,l=d.dataLabel,t,p,m=d.connector,u=!l,r;q=d.dlOptions||
d.options&&d.options.dataLabels;(g=w(q&&q.enabled,x.enabled)&&!d.isNull)&&(g=!0===c(d,q||h));g&&(h=y(x,q),t=d.getLabelConfig(),r=h[d.formatPrefix+"Format"]||h.format,n=E(r)?f(r,t,e.time):(h[d.formatPrefix+"Formatter"]||h.formatter).call(t,h),r=h.style,t=h.rotation,r.color=w(h.color,r.color,b.color,"#000000"),"contrast"===r.color&&(d.contrastColor=D.getContrast(d.color||b.color),r.color=h.inside||0>w(d.labelDistance,h.distance)||k.stacking?d.contrastColor:"#000000"),k.cursor&&(r.cursor=k.cursor),p=
{fill:h.backgroundColor,stroke:h.borderColor,"stroke-width":h.borderWidth,r:h.borderRadius||0,rotation:t,padding:h.padding,zIndex:1},a.objectEach(p,function(a,b){void 0===a&&delete p[b]}));!l||g&&E(n)?g&&E(n)&&(l?p.text=n:(l=d.dataLabel=t?D.text(n,0,-9999,h.useHTML).addClass("highcharts-data-label"):D.label(n,0,-9999,h.shape,null,null,h.useHTML,null,"data-label"),l.addClass(" highcharts-data-label-color-"+d.colorIndex+" "+(h.className||"")+(h.useHTML?" highcharts-tracker":""))),l.attr(p),l.css(r).shadow(h.shadow),
l.added||l.add(z),b.alignDataLabel(d,l,h,null,u)):(d.dataLabel=l=l.destroy(),m&&(d.connector=m.destroy()))});a.fireEvent(this,"afterDrawDataLabels")};c.prototype.alignDataLabel=function(a,b,c,e,f){var d=this.chart,k=d.inverted,l=w(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),m=w(a.plotY,-9999),n=b.getBBox(),p,q=c.rotation,r=c.align,u=this.visible&&(a.series.forceDL||d.isInsidePlot(l,Math.round(m),k)||e&&d.isInsidePlot(l,k?e.x+1:e.y+e.height-1,k)),g="justify"===w(c.overflow,"justify");if(u&&(p=c.style.fontSize,
p=d.renderer.fontMetrics(p,b).b,e=h({x:k?this.yAxis.len-m:l,y:Math.round(k?this.xAxis.len-l:m),width:0,height:0},e),h(c,{width:n.width,height:n.height}),q?(g=!1,l=d.renderer.rotCorr(p,q),l={x:e.x+c.x+e.width/2+l.x,y:e.y+c.y+{top:0,middle:.5,bottom:1}[c.verticalAlign]*e.height},b[f?"attr":"animate"](l).attr({align:r}),m=(q+720)%360,m=180<m&&360>m,"left"===r?l.y-=m?n.height:0:"center"===r?(l.x-=n.width/2,l.y-=n.height/2):"right"===r&&(l.x-=n.width,l.y-=m?0:n.height),b.placed=!0,b.alignAttr=l):(b.align(c,
null,e),l=b.alignAttr),g&&0<=e.height?a.isLabelJustified=this.justifyDataLabel(b,c,l,n,e,f):w(c.crop,!0)&&(u=d.isInsidePlot(l.x,l.y)&&d.isInsidePlot(l.x+n.width,l.y+n.height)),c.shape&&!q))b[f?"attr":"animate"]({anchorX:k?d.plotWidth-a.plotY:a.plotX,anchorY:k?d.plotHeight-a.plotX:a.plotY});u||(b.attr({y:-9999}),b.placed=!1)};c.prototype.justifyDataLabel=function(a,b,c,e,f,k){var d=this.chart,h=b.align,l=b.verticalAlign,n,m,t=a.box?0:a.padding||0;n=c.x+t;0>n&&("right"===h?b.align="left":b.x=-n,m=!0);
n=c.x+e.width-t;n>d.plotWidth&&("left"===h?b.align="right":b.x=d.plotWidth-n,m=!0);n=c.y+t;0>n&&("bottom"===l?b.verticalAlign="top":b.y=-n,m=!0);n=c.y+e.height-t;n>d.plotHeight&&("top"===l?b.verticalAlign="bottom":b.y=d.plotHeight-n,m=!0);m&&(a.placed=!k,a.align(b,null,f));return m};l.pie&&(l.pie.prototype.drawDataLabels=function(){var d=this,b=d.data,e,f=d.chart,k=d.options.dataLabels,h=w(k.connectorPadding,10),l=w(k.connectorWidth,1),q=f.plotWidth,r=f.plotHeight,n=Math.round(f.chartWidth/3),y,z=
d.center,C=z[2]/2,F=z[1],g,v,K,Q,J=[[],[]],O,N,A,R,S=[0,0,0,0];d.visible&&(k.enabled||d._hasPointLabels)&&(m(b,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),c.prototype.drawDataLabels.apply(d),m(b,function(a){a.dataLabel&&(a.visible?(J[a.half].push(a),a.dataLabel._pos=null,!E(k.style.width)&&!E(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>
n&&(a.dataLabel.css({width:.7*n}),a.dataLabel.shortened=!0)):a.dataLabel=a.dataLabel.destroy())}),m(J,function(b,c){var l,n,t=b.length,p=[],x;if(t)for(d.sortByAngle(b,c-.5),0<d.maxLabelDistance&&(l=Math.max(0,F-C-d.maxLabelDistance),n=Math.min(F+C+d.maxLabelDistance,f.plotHeight),m(b,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,F-C-a.labelDistance),a.bottom=Math.min(F+C+a.labelDistance,f.plotHeight),x=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPos[1]-a.top+x/
2,size:x,rank:a.y},p.push(a.distributeBox))}),l=n+x-l,a.distribute(p,l,l/5)),R=0;R<t;R++)e=b[R],K=e.labelPos,g=e.dataLabel,A=!1===e.visible?"hidden":"inherit",N=l=K[1],p&&E(e.distributeBox)&&(void 0===e.distributeBox.pos?A="hidden":(Q=e.distributeBox.size,N=e.top+e.distributeBox.pos)),delete e.positionIndex,O=k.justify?z[0]+(c?-1:1)*(C+e.labelDistance):d.getX(N<e.top+2||N>e.bottom-2?l:N,c,e),g._attr={visibility:A,align:K[6]},g._pos={x:O+k.x+({left:h,right:-h}[K[6]]||0),y:N+k.y-10},K.x=O,K.y=N,w(k.crop,
!0)&&(v=g.getBBox().width,l=null,O-v<h&&1===c?(l=Math.round(v-O+h),S[3]=Math.max(l,S[3])):O+v>q-h&&0===c&&(l=Math.round(O+v-q+h),S[1]=Math.max(l,S[1])),0>N-Q/2?S[0]=Math.max(Math.round(-N+Q/2),S[0]):N+Q/2>r&&(S[2]=Math.max(Math.round(N+Q/2-r),S[2])),g.sideOverflow=l)}),0===D(S)||this.verifyDataLabelOverflow(S))&&(this.placeDataLabels(),l&&m(this.points,function(a){var b;y=a.connector;if((g=a.dataLabel)&&g._pos&&a.visible&&0<a.labelDistance){A=g._attr.visibility;if(b=!y)a.connector=y=f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+
a.colorIndex+(a.className?" "+a.className:"")).add(d.dataLabelsGroup),y.attr({"stroke-width":l,stroke:k.connectorColor||a.color||"#666666"});y[b?"attr":"animate"]({d:d.connectorPath(a.labelPos)});y.attr("visibility",A)}else y&&(a.connector=y.destroy())}))},l.pie.prototype.connectorPath=function(a){var b=a.x,c=a.y;return w(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",
a[4],a[5]]},l.pie.prototype.placeDataLabels=function(){m(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},l.pie.prototype.alignDataLabel=q,l.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,
c=this.options,d=c.center,f=c.minSize||80,k,h=null!==c.size;h||(null!==d[0]?k=Math.max(b[2]-Math.max(a[1],a[3]),f):(k=Math.max(b[2]-a[1]-a[3],f),b[0]+=(a[3]-a[1])/2),null!==d[1]?k=Math.max(Math.min(k,b[2]-Math.max(a[0],a[2])),f):(k=Math.max(Math.min(k,b[2]-a[0]-a[2]),f),b[1]+=(a[0]-a[2])/2),k<b[2]?(b[2]=k,b[3]=Math.min(e(c.innerSize||0,k),k),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):h=!0);return h});l.column&&(l.column.prototype.alignDataLabel=function(a,b,e,f,k){var d=this.chart.inverted,
h=a.series,l=a.dlBox||a.shapeArgs,m=w(a.below,a.plotY>w(this.translatedThreshold,h.yAxis.len)),n=w(e.inside,!!this.options.stacking);l&&(f=y(l),0>f.y&&(f.height+=f.y,f.y=0),l=f.y+f.height-h.yAxis.len,0<l&&(f.height-=l),d&&(f={x:h.yAxis.len-f.y-f.height,y:h.xAxis.len-f.x-f.width,width:f.height,height:f.width}),n||(d?(f.x+=m?0:f.width,f.width=0):(f.y+=m?f.height:0,f.height=0)));e.align=w(e.align,!d||n?"center":m?"right":"left");e.verticalAlign=w(e.verticalAlign,d||n?"middle":m?"top":"bottom");c.prototype.alignDataLabel.call(this,
a,b,e,f,k);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(K);(function(a){var C=a.Chart,D=a.each,E=a.objectEach,m=a.pick;a=a.addEvent;a(C,"render",function(){var a=[];D(this.labelCollectors||[],function(f){a=a.concat(f())});D(this.yAxis||[],function(f){f.options.stackLabels&&!f.options.stackLabels.allowOverlap&&E(f.stacks,function(f){E(f,function(f){a.push(f.label)})})});D(this.series||[],function(f){var h=f.options.dataLabels,y=f.dataLabelCollections||["dataLabel"];
(h.enabled||f._hasPointLabels)&&!h.allowOverlap&&f.visible&&D(y,function(h){D(f.points,function(f){f[h]&&(f[h].labelrank=m(f.labelrank,f.shapeArgs&&f.shapeArgs.height),a.push(f[h]))})})});this.hideOverlappingLabels(a)});C.prototype.hideOverlappingLabels=function(a){var f=a.length,h=this.renderer,m,q,w,e,c,l,z=function(a,c,b,e,f,h,l,m){return!(f>a+b||f+l<a||h>c+e||h+m<c)};w=function(a){var c,b,e,f=2*(a.box?0:a.padding||0);e=0;if(a&&(!a.alignAttr||a.placed))return c=a.alignAttr||{x:a.attr("x"),y:a.attr("y")},
b=a.parentGroup,a.width||(e=a.getBBox(),a.width=e.width,a.height=e.height,e=h.fontMetrics(null,a.element).h),{x:c.x+(b.translateX||0),y:c.y+(b.translateY||0)-e,width:a.width-f,height:a.height-f}};for(q=0;q<f;q++)if(m=a[q])m.oldOpacity=m.opacity,m.newOpacity=1,m.absoluteBox=w(m);a.sort(function(a,c){return(c.labelrank||0)-(a.labelrank||0)});for(q=0;q<f;q++)for(l=(w=a[q])&&w.absoluteBox,m=q+1;m<f;++m)if(c=(e=a[m])&&e.absoluteBox,l&&c&&w!==e&&0!==w.newOpacity&&0!==e.newOpacity&&(c=z(l.x,l.y,l.width,
l.height,c.x,c.y,c.width,c.height)))(w.labelrank<e.labelrank?w:e).newOpacity=0;D(a,function(a){var c,b;a&&(b=a.newOpacity,a.oldOpacity!==b&&(a.alignAttr&&a.placed?(b?a.show(!0):c=function(){a.hide()},a.alignAttr.opacity=b,a[a.isOld?"animate":"attr"](a.alignAttr,null,c)):a.attr({opacity:b})),a.isOld=!0)})}})(K);(function(a){var C=a.addEvent,D=a.Chart,E=a.createElement,m=a.css,h=a.defaultOptions,f=a.defaultPlotOptions,r=a.each,y=a.extend,q=a.fireEvent,w=a.hasTouch,e=a.inArray,c=a.isObject,l=a.Legend,
z=a.merge,k=a.pick,d=a.Point,b=a.Series,u=a.seriesTypes,p=a.svg,H;H=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};r(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(r(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",
function(a){b.onTrackerMouseOut(a)});if(w)a[d].on("touchstart",c);a.options.cursor&&a[d].css(m).css({cursor:a.options.cursor})}}),a._hasTracking=!0);q(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,h=f.pointer,k=f.renderer,l=f.options.tooltip.snap,g=a.tracker,m,u=function(){if(f.hoverSeries!==a)a.onMouseOver()},y="rgba(192,192,192,"+(p?.0001:.002)+")";if(e&&!c)for(m=e+1;m--;)"M"===d[m]&&d.splice(m+
1,0,d[m+1]-l,d[m+2],"L"),(m&&"M"===d[m]||m===e)&&d.splice(m,0,"L",d[m-2]+l,d[m-1]);g?g.attr({d:d}):a.graph&&(a.tracker=k.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:y,fill:c?y:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*l),zIndex:2}).add(a.group),r([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",u).on("mouseout",function(a){h.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(w)a.on("touchstart",u)}));
q(this,"afterDrawTracker")}};u.column&&(u.column.prototype.drawTracker=H.drawTrackerPoint);u.pie&&(u.pie.prototype.drawTracker=H.drawTrackerPoint);u.scatter&&(u.scatter.prototype.drawTracker=H.drawTrackerPoint);y(l.prototype,{setItemEvents:function(a,b,c){var e=this,f=e.chart.renderer.boxWrapper,h="highcharts-legend-"+(a instanceof d?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");f.addClass(h);b.css(e.options.itemHoverStyle)}).on("mouseout",function(){b.css(z(a.visible?
e.itemStyle:e.itemHiddenStyle));f.removeClass(h);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};f.removeClass(h);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):q(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=E("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(b){q(a.series||
a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});h.legend.itemStyle.cursor="pointer";y(D.prototype,{showResetZoom:function(){function a(){b.zoomOut()}var b=this,c=h.lang,d=b.options.chart.resetZoomButton,e=d.theme,f=e.states,k="chart"===d.relativeTo?null:"plotBox";q(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,e,f&&f.hover).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,
!1,k)})},zoomOut:function(){q(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var b,d=this.pointer,e=!1,f;!a||a.resetSelection?(r(this.axes,function(a){b=a.zoom()}),d.initiated=!1):r(a.xAxis.concat(a.yAxis),function(a){var c=a.axis;d[c.isXAxis?"zoomX":"zoomY"]&&(b=c.zoom(a.min,a.max),c.displayBtn&&(e=!0))});f=this.resetZoomButton;e&&!f?this.showResetZoom():!e&&c(f)&&(this.resetZoomButton=f.destroy());b&&this.redraw(k(this.options.chart.animation,a&&a.animation,100>this.pointCount))},
pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&r(d,function(a){a.setState()});r("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",h=c[d],g=(b.pointRange||0)/2,k=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,l=b.getExtremes(),n=b.toValue(h-f,!0)+g*k,k=b.toValue(h+b.len-f,!0)-g*k,m=k<n,h=m?k:n,n=m?n:k,k=Math.min(l.dataMin,g?l.min:b.toValue(b.toPixels(l.min)-b.minPixelPadding)),g=Math.max(l.dataMax,g?l.max:b.toValue(b.toPixels(l.max)+
b.minPixelPadding)),m=k-h;0<m&&(n+=m,h=k);m=n-g;0<m&&(n=g,h-=m);b.series.length&&h!==l.min&&n!==l.max&&(b.setExtremes(h,n,!1,!1,{trigger:"pan"}),e=!0);c[d]=f});e&&c.redraw(!1);m(c.container,{cursor:"move"})}});y(d.prototype,{select:function(a,b){var c=this,d=c.series,f=d.chart;a=k(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[e(c,d.data)]=c.options;c.setState(a&&"select");b||r(f.getSelectedPoints(),function(a){a.selected&&
a!==c&&(a.selected=a.options.selected=!1,d.options.data[e(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");r(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,
c=z(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(a,c){C(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,e=this.series,h=e.options.states[a||"normal"]||{},l=f[e.type].marker&&e.options.marker,m=l&&!1===l.enabled,p=l&&l.states&&l.states[a||"normal"]||{},g=!1===p.enabled,t=e.stateMarkerGraphic,r=this.marker||{},u=e.chart,w=e.halo,z,C=l&&e.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===
h.enabled||a&&(g||m&&!1===p.enabled)||a&&r.states&&r.states[a]&&!1===r.states[a].enabled)){C&&(z=e.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(e.pointAttribs(this,a),k(u.options.chart.animation,h.animation)),z&&this.graphic.animate(z,k(u.options.chart.animation,p.animation,l.animation)),t&&t.hide();else{if(a&&p){l=r.symbol||e.symbol;t&&t.currentSymbol!==l&&(t=t.destroy());
if(t)t[b?"animate":"attr"]({x:z.x,y:z.y});else l&&(e.stateMarkerGraphic=t=u.renderer.symbol(l,z.x,z.y,z.width,z.height).add(e.markerGroup),t.currentSymbol=l);t&&t.attr(e.pointAttribs(this,a))}t&&(t[a&&u.isInsidePlot(c,d,u.inverted)?"show":"hide"](),t.element.point=this)}(c=h.halo)&&c.size?(w||(e.halo=w=u.renderer.path().add((this.graphic||t).parentGroup)),w.show()[b?"animate":"attr"]({d:this.haloPath(c.size)}),w.attr({"class":"highcharts-halo highcharts-color-"+k(this.colorIndex,e.colorIndex)+(this.className?
" "+this.className:""),zIndex:-1}),w.point=this,w.attr(y({fill:this.color||e.color,"fill-opacity":c.opacity},c.attributes))):w&&w.point&&w.point.haloPath&&w.animate({d:w.point.haloPath(0)},null,w.hide);this.state=a;q(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});y(b.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&q(this,"mouseOver");
this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&q(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,c=b.options,d=b.graph,e=c.states,f=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(r([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+
b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!e[a]||!1!==e[a].enabled)&&(a&&(f=e[a].lineWidth||f+(e[a].lineWidthPlus||0)),d&&!d.dashstyle))for(f={"stroke-width":f},d.animate(f,k(e[a||"normal"]&&e[a||"normal"].animation,b.chart.options.chart.animation));b["zone-graph-"+c];)b["zone-graph-"+c].attr(f),c+=1},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,h=d.options.chart.ignoreHiddenSeries,k=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!k:
a)?"show":"hide";r(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&r(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});r(c.linkedSeries,function(b){b.setVisible(a,!1)});h&&(d.isDirtyBox=!0);q(c,f);!1!==b&&d.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=
a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);q(this,a?"select":"unselect")},drawTracker:H.drawTrackerGraph})})(K);(function(a){var C=a.Chart,D=a.each,E=a.inArray,m=a.isArray,h=a.isObject,f=a.pick,r=a.splat;C.prototype.setResponsive=function(f){var h=this.options.responsive,m=[],e=this.currentResponsive;h&&h.rules&&D(h.rules,function(c){void 0===c._id&&(c._id=a.uniqueKey());this.matchResponsiveRule(c,m,f)},this);var c=a.merge.apply(0,a.map(m,function(c){return a.find(h.rules,
function(a){return a._id===c}).chartOptions})),m=m.toString()||void 0;m!==(e&&e.ruleIds)&&(e&&this.update(e.undoOptions,f),m?(this.currentResponsive={ruleIds:m,mergedOptions:c,undoOptions:this.currentOptions(c)},this.update(c,f)):this.currentResponsive=void 0)};C.prototype.matchResponsiveRule=function(a,h){var m=a.condition;(m.callback||function(){return this.chartWidth<=f(m.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=f(m.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=f(m.minWidth,0)&&this.chartHeight>=
f(m.minHeight,0)}).call(this)&&h.push(a._id)};C.prototype.currentOptions=function(f){function q(e,c,f,w){var k;a.objectEach(e,function(a,b){if(!w&&-1<E(b,["series","xAxis","yAxis"]))for(a=r(a),f[b]=[],k=0;k<a.length;k++)c[b][k]&&(f[b][k]={},q(a[k],c[b][k],f[b][k],w+1));else h(a)?(f[b]=m(a)?[]:{},q(a,c[b]||{},f[b],w+1)):f[b]=c[b]||null})}var w={};q(f,this.options,w,0);return w}})(K);return K});


/***/ }),

/***/ "./node_modules/jquery/dist/jquery.js":
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./node_modules/select2/dist/js/select2.js":
/*!*************************************************!*\
  !*** ./node_modules/select2/dist/js/select2.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;/*!
 * Select2 4.0.6-rc.1
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
} (function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
    var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name) {
            name = name.split('/');
            lastIndex = name.length - 1;

            // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
            }

            // Starts with a '.' so need the baseName
            if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
            }

            //start trimDots
            for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join('/');
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    //Creates a parts array for a relName where first part is plugin ID,
    //second part is resource ID. Assumes relName has already been normalized.
    function makeRelParts(relName) {
        return relName ? splitPrefix(relName) : [];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relParts) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0],
            relResourceName = relParts[1];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relResourceName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
            } else {
                name = normalize(name, relResourceName);
            }
        } else {
            name = normalize(name, relResourceName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i, relParts,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;
        relParts = makeRelParts(relName);

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, makeRelParts(callback)).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
      var superMethod = superMethods[m];

      DecoratedClass.prototype[superMethod] =
        SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;
    var params = slice.call(arguments, 1);

    this.listeners = this.listeners || {};

    // Params should always come in as an array
    if (params == null) {
      params = [];
    }

    // If there are no arguments to the event, use a temporary object
    if (params.length === 0) {
      params.push({});
    }

    // Set the `_type` of the first object to the event
    params[0]._type = event;

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') {
      var $jqNodes = $();

      $.map($nodes, function (node) {
        $jqNodes = $jqNodes.add(node);
      });

      $nodes = $jqNodes;
    }

    $element.append($nodes);
  };

  // Cache objects in Utils.__cache instead of $.data (see #4346)
  Utils.__cache = {};

  var id = 0;
  Utils.GetUniqueElementId = function (element) {
    // Get a unique element Id. If element has no id, 
    // creates a new unique number, stores it in the id 
    // attribute and returns the new id. 
    // If an id already exists, it simply returns it.

    var select2Id = element.getAttribute('data-select2-id');
    if (select2Id == null) {
      // If element has id, use it.
      if (element.id) {
        select2Id = element.id;
        element.setAttribute('data-select2-id', select2Id);
      } else {
        element.setAttribute('data-select2-id', ++id);
        select2Id = id.toString();
      }
    }
    return select2Id;
  };

  Utils.StoreData = function (element, name, value) {
    // Stores an item in the cache for a specified element.
    // name is the cache key.    
    var id = Utils.GetUniqueElementId(element);
    if (!Utils.__cache[id]) {
      Utils.__cache[id] = {};
    }

    Utils.__cache[id][name] = value;
  };

  Utils.GetData = function (element, name) {
    // Retrieves a value from the cache by its key (name)
    // name is optional. If no name specified, return 
    // all cache items for the specified element.
    // and for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (name) {
      if (Utils.__cache[id]) {
        return Utils.__cache[id][name] != null ? 
	      Utils.__cache[id][name]:
	      $(element).data(name); // Fallback to HTML5 data attribs.
      }
      return $(element).data(name); // Fallback to HTML5 data attribs.
    } else {
      return Utils.__cache[id];			   
    }
  };

  Utils.RemoveData = function (element) {
    // Removes all cached items for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (Utils.__cache[id] != null) {
      delete Utils.__cache[id];
    }
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
    var $results = $(
      '<ul class="select2-results__options" role="tree"></ul>'
    );

    if (this.options.get('multiple')) {
      $results.attr('aria-multiselectable', 'true');
    }

    this.$results = $results;

    return $results;
  };

  Results.prototype.clear = function () {
    this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="treeitem" aria-live="assertive"' +
      ' class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    $message[0].className += ' select2-results__message';

    this.$results.append($message);
  };

  Results.prototype.hideMessages = function () {
    this.$results.find('.select2-results__message').remove();
  };

  Results.prototype.append = function (data) {
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) {
      if (this.$results.children().length === 0) {
        this.trigger('results:message', {
          message: 'noResults'
        });
      }

      return;
    }

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) {
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    }

    this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
    var sorter = this.options.get('sorter');

    return sorter(data);
  };

  Results.prototype.highlightFirstItem = function () {
    var $options = this.$results
      .find('.select2-results__option[aria-selected]');

    var $selected = $options.filter('[aria-selected=true]');

    // Check if there are any selected options
    if ($selected.length > 0) {
      // If there are selected options, highlight the first
      $selected.first().trigger('mouseenter');
    } else {
      // If there are no selected options, highlight the first option
      // in the dropdown
      $options.first().trigger('mouseenter');
    }

    this.ensureHighlightVisible();
  };

  Results.prototype.setClasses = function () {
    var self = this;

    this.data.current(function (selected) {
      var selectedIds = $.map(selected, function (s) {
        return s.id.toString();
      });

      var $options = self.$results
        .find('.select2-results__option[aria-selected]');

      $options.each(function () {
        var $option = $(this);

        var item = Utils.GetData(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && $.inArray(id, selectedIds) > -1)) {
          $option.attr('aria-selected', 'true');
        } else {
          $option.attr('aria-selected', 'false');
        }
      });

    });
  };

  Results.prototype.showLoading = function (params) {
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    var loading = {
      disabled: true,
      loading: true,
      text: loadingMore(params)
    };
    var $loading = this.option(loading);
    $loading.className += ' loading-results';

    this.$results.prepend($loading);
  };

  Results.prototype.hideLoading = function () {
    this.$results.find('.loading-results').remove();
  };

  Results.prototype.option = function (data) {
    var option = document.createElement('li');
    option.className = 'select2-results__option';

    var attrs = {
      'role': 'treeitem',
      'aria-selected': 'false'
    };

    if (data.disabled) {
      delete attrs['aria-selected'];
      attrs['aria-disabled'] = 'true';
    }

    if (data.id == null) {
      delete attrs['aria-selected'];
    }

    if (data._resultId != null) {
      option.id = data._resultId;
    }

    if (data.title) {
      option.title = data.title;
    }

    if (data.children) {
      attrs.role = 'group';
      attrs['aria-label'] = data.text;
      delete attrs['aria-selected'];
    }

    for (var attr in attrs) {
      var val = attrs[attr];

      option.setAttribute(attr, val);
    }

    if (data.children) {
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      var $label = $(label);
      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) {
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      }

      var $childrenContainer = $('<ul></ul>', {
        'class': 'select2-results__options select2-results__options--nested'
      });

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    } else {
      this.template(data, option);
    }

    Utils.StoreData(option, 'data', data);

    return option;
  };

  Results.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) {
      self.clear();
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
        self.highlightFirstItem();
      }
    });

    container.on('results:append', function (params) {
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('query', function (params) {
      self.hideMessages();
      self.showLoading(params);
    });

    container.on('select', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
      self.highlightFirstItem();
    });

    container.on('unselect', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
      self.highlightFirstItem();
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    });

    container.on('results:toggle', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      $highlighted.trigger('mouseup');
    });

    container.on('results:select', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      var data = Utils.GetData($highlighted[0], 'data');

      if ($highlighted.attr('aria-selected') == 'true') {
        self.trigger('close', {});
      } else {
        self.trigger('select', {
          data: data
        });
      }
    });

    container.on('results:previous', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      // If we are already at te top, don't move further
      // If no options, currentIndex will be -1
      if (currentIndex <= 0) {
        return;
      }

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) {
        nextIndex = 0;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextTop - currentOffset < 0) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:next', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) {
        return;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextBottom > currentOffset) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:focus', function (params) {
      params.element.addClass('select2-results__option--highlighted');
    });

    container.on('results:message', function (params) {
      self.displayMessage(params);
    });

    if ($.fn.mousewheel) {
      this.$results.on('mousewheel', function (e) {
        var top = self.$results.scrollTop();

        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) {
          self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        } else if (isAtBottom) {
          self.$results.scrollTop(
            self.$results.get(0).scrollHeight - self.$results.height()
          );

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
      function (evt) {
      var $this = $(this);

      var data = Utils.GetData(this, 'data');

      if ($this.attr('aria-selected') === 'true') {
        if (self.options.get('multiple')) {
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        } else {
          self.trigger('close', {});
        }

        return;
      }

      self.trigger('select', {
        originalEvent: evt,
        data: data
      });
    });

    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
      function (evt) {
      var data = Utils.GetData(this, 'data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted');

      self.trigger('results:focus', {
        data: data,
        element: $(this)
      });
    });
  };

  Results.prototype.getHighlightedResults = function () {
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  };

  Results.prototype.destroy = function () {
    this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) {
      return;
    }

    var $options = this.$results.find('[aria-selected]');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) {
      this.$results.scrollTop(0);
    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
      this.$results.scrollTop(nextOffset);
    }
  };

  Results.prototype.template = function (result, container) {
    var template = this.options.get('templateResult');
    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, container);

    if (content == null) {
      container.style.display = 'none';
    } else if (typeof content === 'string') {
      container.innerHTML = escapeMarkup(content);
    } else {
      $(container).append(content);
    }
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      ' aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
      this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
    } else if (this.$element.attr('tabindex') != null) {
      this._tabindex = this.$element.attr('tabindex');
    }

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);

    this.$selection = $selection;

    return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-container';
    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('blur', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) {
        evt.preventDefault();
      }
    });

    container.on('results:focus', function (params) {
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.focus();
      window.setTimeout(function () {
        self.$selection.focus();
      }, 0);

      self._detachCloseHandler(container);
    });

    container.on('enable', function () {
      self.$selection.attr('tabindex', self._tabindex);
    });

    container.on('disable', function () {
      self.$selection.attr('tabindex', '-1');
    });
  };

  BaseSelection.prototype._handleBlur = function (evt) {
    var self = this;

    // This needs to be delayed as the active element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () {
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) {
        return;
      }

      self.trigger('blur', evt);
    }, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {
    var self = this;

    $(document.body).on('mousedown.select2.' + container.id, function (e) {
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () {
        var $this = $(this);

        if (this == $select[0]) {
          return;
        }

        var $element = Utils.GetData(this, 'element');

        $element.select2('close');
      });
    });
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
    $(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
    this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
    throw new Error('The `update` method must be defined in child classes.');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered')
      .attr('id', id)
      .attr('role', 'textbox')
      .attr('aria-readonly', 'true');
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('focus', function (evt) {
      if (!container.isOpen()) {
        self.$selection.focus();
      }
    });
  };

  SingleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title'); // clear tooltip on empty
  };

  SingleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);
    $rendered.attr('title', selection.title || selection.text);
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
    MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.options.get('disabled')) {
          return;
        }

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = Utils.GetData($selection[0], 'data');

        self.trigger('unselect', {
          originalEvent: evt,
          data: data
        });
      }
    );
  };

  MultipleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title');
  };

  MultipleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
          '&times;' +
        '</span>' +
      '</li>'
    );

    return $container;
  };

  MultipleSelection.prototype.update = function (data) {
    this.clear();

    if (data.length === 0) {
      return;
    }

    var $selections = [];

    for (var d = 0; d < data.length; d++) {
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      $selection.append(formatted);
      $selection.attr('title', selection.title || selection.text);

      Utils.StoreData($selection[0], 'data', selection);

      $selections.push($selection);
    }

    var $rendered = this.$selection.find('.select2-selection__rendered');

    Utils.appendMany($rendered, $selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) {
  function Placeholder (decorated, $element, options) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder.addClass('select2-selection__placeholder')
                .removeClass('select2-selection__choice');

    return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) {
      return decorated.call(this, data);
    }

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys',
  '../utils'
], function ($, KEYS, Utils) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) {
      if (this.options.get('debug') && window.console && console.error) {
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      }
    }

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) {
        self._handleClear(evt);
    });

    container.on('keypress', function (evt) {
      self._handleKeyboardClear(evt, container);
    });
  };

  AllowClear.prototype._handleClear = function (_, evt) {
    // Ignore the event if it is disabled
    if (this.options.get('disabled')) {
      return;
    }

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) {
      return;
    }

    evt.stopPropagation();

    var data = Utils.GetData($clear[0], 'data');

    var previousVal = this.$element.val();
    this.$element.val(this.placeholder.id);

    var unselectData = {
      data: data
    };
    this.trigger('clear', unselectData);
    if (unselectData.prevented) {
      this.$element.val(previousVal);
      return;
    }

    for (var d = 0; d < data.length; d++) {
      unselectData = {
        data: data[d]
      };

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) {
        this.$element.val(previousVal);
        return;
      }
    }

    this.$element.trigger('change');

    this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
    if (container.isOpen()) {
      return;
    }

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
      this._handleClear(evt);
    }
  };

  AllowClear.prototype.update = function (decorated, data) {
    decorated.call(this, data);

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) {
      return;
    }

    var $remove = $(
      '<span class="select2-selection__clear">' +
        '&times;' +
      '</span>'
    );
    Utils.StoreData($remove[0], 'data', data);

    this.$selection.find('.select2-selection__rendered').prepend($remove);
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
    var $search = $(
      '<li class="select2-search select2-search--inline">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
      '</li>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    var $rendered = decorated.call(this);

    this._transferTabIndex();

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self.$search.trigger('focus');
    });

    container.on('close', function () {
      self.$search.val('');
      self.$search.removeAttr('aria-activedescendant');
      self.$search.trigger('focus');
    });

    container.on('enable', function () {
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    });

    container.on('disable', function () {
      self.$search.prop('disabled', true);
    });

    container.on('focus', function (evt) {
      self.$search.trigger('focus');
    });

    container.on('results:focus', function (params) {
      self.$search.attr('aria-activedescendant', params.id);
    });

    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
        var $previousChoice = self.$searchContainer
          .prev('.select2-selection__choice');

        if ($previousChoice.length > 0) {
          var item = Utils.GetData($previousChoice[0], 'data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        }
      }
    });

    // Try to detect the IE version should the `documentMode` property that
    // is stored on the document. This is only implemented in IE and is
    // slightly cleaner than doing a user agent check.
    // This property is not available in Edge, but Edge also doesn't have
    // this bug.
    var msie = document.documentMode;
    var disableInputEvents = msie && msie <= 11;

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents) {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      }
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents && evt.type === 'input') {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
          return;
        }

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) {
          return;
        }

        self.handleSearch(evt);
      }
    );
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
    this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.$selection.find('.select2-selection__rendered')
                   .append(this.$searchContainer);

    this.resizeSearch();
    if (searchHadFocus) {
      var isTagInput = this.$element.find('[data-select2-tag]').length;
      if (isTagInput) {
        // fix IE11 bug where tag input lost focus
        this.$element.focus();
      } else {
        this.$search.focus();
      }
    }
  };

  Search.prototype.handleSearch = function () {
    this.resizeSearch();

    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
    this.trigger('unselect', {
      data: item
    });

    this.$search.val(item.text);
    this.handleSearch();
  };

  Search.prototype.resizeSearch = function () {
    this.$search.css('width', '25px');

    var width = '';

    if (this.$search.attr('placeholder') !== '') {
      width = this.$selection.find('.select2-selection__rendered').innerWidth();
    } else {
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    }

    this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting',
      'clear', 'clearing'
    ];

    var preventableEvents = [
      'opening', 'closing', 'selecting', 'unselecting', 'clearing'
    ];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) {
      // Ignore events that should not be relayed
      if ($.inArray(name, relayEvents) === -1) {
        return;
      }

      // The parameters should always be an object
      params = params || {};

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, {
        params: params
      });

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if ($.inArray(name, preventableEvents) === -1) {
        return;
      }

      params.prevented = evt.isDefaultPrevented();
    });
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
    this.dict = dict || {};
  }

  Translation.prototype.all = function () {
    return this.dict;
  };

  Translation.prototype.get = function (key) {
    return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
    this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
    if (!(path in Translation._cache)) {
      var translations = require(path);

      Translation._cache[path] = translations;
    }

    return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () {
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    });

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if ($(data.element).is('option')) {
      data.element.selected = true;

      this.$element.trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if ($.inArray(id, val) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if ($(data.element).is('option')) {
      data.element.selected = false;

      this.$element.trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      Utils.RemoveData(this);
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) {
        return;
      }

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id !== undefined) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    Utils.StoreData(option, 'data', normalizedData);

    return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = Utils.GetData($option[0], 'data');

    if (data != null) {
      return data;
    }

    if ($option.is('option')) {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if ($option.is('optgroup')) {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    Utils.StoreData($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (item !== Object(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id && this.container != null) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    var data = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);

    this.addOptions(this.convertToOptions(data));
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) {
      this.processResults = this.ajaxOptions.processResults;
    }

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
    var defaults = {
      data: function (params) {
        return $.extend({}, params, {
          q: params.term
        });
      },
      transport: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      }
    };

    return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
    return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
    var matches = [];
    var self = this;

    if (this._request != null) {
      // JSONP requests cannot always be aborted
      if ($.isFunction(this._request.abort)) {
        this._request.abort();
      }

      this._request = null;
    }

    var options = $.extend({
      type: 'GET'
    }, this.ajaxOptions);

    if (typeof options.url === 'function') {
      options.url = options.url.call(this.$element, params);
    }

    if (typeof options.data === 'function') {
      options.data = options.data.call(this.$element, params);
    }

    function request () {
      var $request = options.transport(options, function (data) {
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) {
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !$.isArray(results.results)) {
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          }
        }

        callback(results);
      }, function () {
        // Attempt to detect if a request was aborted
        // Only works if the transport exposes a status property
        if ('status' in $request &&
            ($request.status === 0 || $request.status === '0')) {
          return;
        }

        self.trigger('results:message', {
          message: 'errorLoading'
        });
      });

      self._request = $request;
    }

    if (this.ajaxOptions.delay && params.term != null) {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    } else {
      request();
    }
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) {
      this.createTag = createTag;
    }

    var insertTag = options.get('insertTag');

    if (insertTag !== undefined) {
        this.insertTag = insertTag;
    }

    decorated.call(this, $element, options);

    if ($.isArray(tags)) {
      for (var t = 0; t < tags.length; t++) {
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      }
    }
  }

  Tags.prototype.query = function (decorated, params, callback) {
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) {
      decorated.call(this, params, callback);
      return;
    }

    function wrapper (obj, child) {
      var data = obj.results;

      for (var i = 0; i < data.length; i++) {
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper({
            results: option.children
          }, true)
        );

        var optionText = (option.text || '').toUpperCase();
        var paramsTerm = (params.term || '').toUpperCase();

        var checkText = optionText === paramsTerm;

        if (checkText || checkChildren) {
          if (child) {
            return false;
          }

          obj.data = data;
          callback(obj);

          return;
        }
      }

      if (child) {
        return true;
      }

      var tag = self.createTag(params);

      if (tag != null) {
        var $option = self.option(tag);
        $option.attr('data-select2-tag', true);

        self.addOptions([$option]);

        self.insertTag(data, tag);
      }

      obj.results = data;

      callback(obj);
    }

    decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
    var term = $.trim(params.term);

    if (term === '') {
      return null;
    }

    return {
      id: term,
      text: term
    };
  };

  Tags.prototype.insertTag = function (_, data, tag) {
    data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
    var tag = this._lastTag;

    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () {
      if (this.selected) {
        return;
      }

      $(this).remove();
    });
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) {
      this.tokenizer = tokenizer;
    }

    decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
    var self = this;

    function createAndSelect (data) {
      // Normalize the data object so we can use it for checks
      var item = self._normalizeItem(data);

      // Check if the data object already exists as a tag
      // Select it if it doesn't
      var $existingOptions = self.$element.find('option').filter(function () {
        return $(this).val() === item.id;
      });

      // If an existing option wasn't found for it, create the option
      if (!$existingOptions.length) {
        var $option = self.option(item);
        $option.attr('data-select2-tag', true);

        self._removeOldTags();
        self.addOptions([$option]);
      }

      // Select the item, now that we know there is an option for it
      select(item);
    }

    function select (data) {
      self.trigger('select', {
        data: data
      });
    }

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, createAndSelect);

    if (tokenData.term !== params.term) {
      // Replace the search term if we have the search box
      if (this.$search.length) {
        this.$search.val(tokenData.term);
        this.$search.focus();
      }

      params.term = tokenData.term;
    }

    decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) {
      return {
        id: params.term,
        text: params.term
      };
    };

    while (i < term.length) {
      var termChar = term[i];

      if ($.inArray(termChar, separators) === -1) {
        i++;

        continue;
      }

      var part = term.substr(0, i);
      var partParams = $.extend({}, params, {
        term: part
      });

      var data = createTag(partParams);

      if (data == null) {
        i++;
        continue;
      }

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    }

    return {
      term: term
    };
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooShort',
        args: {
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooLong',
        args: {
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }
        decorated.call(self, params, callback);
      });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  };

  Dropdown.prototype.bind = function () {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
    // Should be implmented in subclasses
  };

  Dropdown.prototype.destroy = function () {
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function Search () { }

  Search.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="textbox" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    $rendered.prepend($search);

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) {
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    });

    this.$search.on('keyup input', function (evt) {
      self.handleSearch(evt);
    });

    container.on('open', function () {
      self.$search.attr('tabindex', 0);

      self.$search.focus();

      window.setTimeout(function () {
        self.$search.focus();
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);

      self.$search.val('');
      self.$search.blur();
    });

    container.on('focus', function () {
      if (!container.isOpen()) {
        self.$search.focus();
      }
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer.removeClass('select2-search--hide');
        } else {
          self.$searchContainer.addClass('select2-search--hide');
        }
      }
    });
  };

  Search.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
    return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) {
      var item = data[d];

      if (this.placeholder.id === item.id) {
        modifiedData.splice(d, 1);
      }
    }

    return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
    this.lastParams = {};

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) {
      this.$results.append(this.$loadingMore);
    }
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    container.on('query:append', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    this.$results.on('scroll', function () {
      var isLoadMoreVisible = $.contains(
        document.documentElement,
        self.$loadingMore[0]
      );

      if (self.loading || !isLoadMoreVisible) {
        return;
      }

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var loadingMoreOffset = self.$loadingMore.offset().top +
        self.$loadingMore.outerHeight(false);

      if (currentOffset + 50 >= loadingMoreOffset) {
        self.loadMore();
      }
    });
  };

  InfiniteScroll.prototype.loadMore = function () {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
    return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
    var $option = $(
      '<li ' +
      'class="select2-results__option select2-results__option--load-more"' +
      'role="treeitem" aria-disabled="true"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = options.get('dropdownParent') || $(document.body);

    decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var setupResultsEvents = false;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self._showDropdown();
      self._attachPositioningHandler(container);

      if (!setupResultsEvents) {
        setupResultsEvents = true;

        container.on('results:all', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });

        container.on('results:append', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
      }
    });

    container.on('close', function () {
      self._hideDropdown();
      self._detachPositioningHandler(container);
    });

    this.$dropdownContainer.on('mousedown', function (evt) {
      evt.stopPropagation();
    });
  };

  AttachBody.prototype.destroy = function (decorated) {
    decorated.call(this);

    this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown.removeClass('select2');
    $dropdown.addClass('select2-container--open');

    $dropdown.css({
      position: 'absolute',
      top: -999999
    });

    this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);

    this.$dropdownContainer = $container;

    return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
    this.$dropdownContainer.detach();
  };

  AttachBody.prototype._attachPositioningHandler =
      function (decorated, container) {
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () {
      Utils.StoreData(this, 'select2-scroll-position', {
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      });
    });

    $watchers.on(scrollEvent, function (ev) {
      var position = Utils.GetData(this, 'select2-scroll-position');
      $(this).scrollTop(position.y);
    });

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) {
      self._positionDropdown();
      self._resizeDropdown();
    });
  };

  AttachBody.prototype._detachPositioningHandler =
      function (decorated, container) {
    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.off(scrollEvent);

    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  };

  AttachBody.prototype._positionDropdown = function () {
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

    var newDirection = null;

    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = {
      height: this.$container.outerHeight(false)
    };

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = $offsetParent.offset();

    css.top -= parentOffset.top;
    css.left -= parentOffset.left;

    if (!isCurrentlyAbove && !isCurrentlyBelow) {
      newDirection = 'below';
    }

    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      newDirection = 'above';
    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      newDirection = 'below';
    }

    if (newDirection == 'above' ||
      (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - parentOffset.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
    var css = {
      width: this.$container.outerWidth(false) + 'px'
    };

    if (this.options.get('dropdownAutoWidth')) {
      css.minWidth = css.width;
      css.position = 'relative';
      css.width = 'auto';
    }

    this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
    var count = 0;

    for (var d = 0; d < data.length; d++) {
      var item = data[d];

      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    }

    return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) {
      this.minimumResultsForSearch = Infinity;
    }

    decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
    if (countResults(params.data.results) < this.minimumResultsForSearch) {
      return false;
    }

    return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[
  '../utils'
], function (Utils) {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function (params) {
      self._handleSelectOnClose(params);
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
    if (params && params.originalSelect2Event != null) {
      var event = params.originalSelect2Event;

      // Don't select an item if the close event was triggered from a select or
      // unselect event
      if (event._type === 'select' || event._type === 'unselect') {
        return;
      }
    }

    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) {
      return;
    }

    var data = Utils.GetData($highlightedResults[0], 'data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) {
      return;
    }

    this.trigger('select', {
        data: data
    });
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) {
      self._selectTriggered(evt);
    });

    container.on('unselect', function (evt) {
      self._selectTriggered(evt);
    });
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && originalEvent.ctrlKey) {
      return;
    }

    this.trigger('close', {
      originalEvent: originalEvent,
      originalSelect2Event: evt
    });
  };

  return CloseOnSelect;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
    errorLoading: function () {
      return 'The results could not be loaded.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) {
        message += 's';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    },
    loadingMore: function () {
      return 'Loading more results…';
    },
    maximumSelected: function (args) {
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) {
        message += 's';
      }

      return message;
    },
    noResults: function () {
      return 'No results found';
    },
    searching: function () {
      return 'Searching…';
    }
  };
});

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

             EnglishTranslation) {
  function Defaults () {
    this.reset();
  }

  Defaults.prototype.apply = function (options) {
    options = $.extend(true, {}, this.defaults, options);

    if (options.dataAdapter == null) {
      if (options.ajax != null) {
        options.dataAdapter = AjaxData;
      } else if (options.data != null) {
        options.dataAdapter = ArrayData;
      } else {
        options.dataAdapter = SelectData;
      }

      if (options.minimumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      }

      if (options.maximumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      }

      if (options.maximumSelectionLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      }

      if (options.tags) {
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      }

      if (options.tokenSeparators != null || options.tokenizer != null) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      }

      if (options.query != null) {
        var Query = require(options.amdBase + 'compat/query');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Query
        );
      }

      if (options.initSelection != null) {
        var InitSelection = require(options.amdBase + 'compat/initSelection');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          InitSelection
        );
      }
    }

    if (options.resultsAdapter == null) {
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      }

      if (options.placeholder != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      }

      if (options.selectOnClose) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      }
    }

    if (options.dropdownAdapter == null) {
      if (options.multiple) {
        options.dropdownAdapter = Dropdown;
      } else {
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      }

      if (options.minimumResultsForSearch !== 0) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      }

      if (options.closeOnSelect) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      }

      if (
        options.dropdownCssClass != null ||
        options.dropdownCss != null ||
        options.adaptDropdownCssClass != null
      ) {
        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      }

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    }

    if (options.selectionAdapter == null) {
      if (options.multiple) {
        options.selectionAdapter = MultipleSelection;
      } else {
        options.selectionAdapter = SingleSelection;
      }

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }

      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }

      if (options.multiple) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      }

      if (
        options.containerCssClass != null ||
        options.containerCss != null ||
        options.adaptContainerCssClass != null
      ) {
        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          ContainerCSS
        );
      }

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    }

    if (typeof options.language === 'string') {
      // Check if the language is specified with a region
      if (options.language.indexOf('-') > 0) {
        // Extract the region information if it is included
        var languageParts = options.language.split('-');
        var baseLanguage = languageParts[0];

        options.language = [options.language, baseLanguage];
      } else {
        options.language = [options.language];
      }
    }

    if ($.isArray(options.language)) {
      var languages = new Translation();
      options.language.push('en');

      var languageNames = options.language;

      for (var l = 0; l < languageNames.length; l++) {
        var name = languageNames[l];
        var language = {};

        try {
          // Try to load it with the original name
          language = Translation.loadPath(name);
        } catch (e) {
          try {
            // If we couldn't load it, check if it wasn't the full path
            name = this.defaults.amdLanguageBase + name;
            language = Translation.loadPath(name);
          } catch (ex) {
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files.
            if (options.debug && window.console && console.warn) {
              console.warn(
                'Select2: The language file for "' + name + '" could not be ' +
                'automatically loaded. A fallback will be used instead.'
              );
            }

            continue;
          }
        }

        languages.extend(language);
      }

      options.translations = languages;
    } else {
      var baseTranslation = Translation.loadPath(
        this.defaults.amdLanguageBase + 'en'
      );
      var customTranslation = new Translation(options.language);

      customTranslation.extend(baseTranslation);

      options.translations = customTranslation;
    }

    return options;
  };

  Defaults.prototype.reset = function () {
    function stripDiacritics (text) {
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) {
        return DIACRITICS[a] || a;
      }

      return text.replace(/[^\u0000-\u007E]/g, match);
    }

    function matcher (params, data) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // If it doesn't contain the term, don't return anything
      return null;
    }

    this.defaults = {
      amdBase: './',
      amdLanguageBase: './i18n/',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: EnglishTranslation,
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      sorter: function (data) {
        return data;
      },
      templateResult: function (result) {
        return result.text;
      },
      templateSelection: function (selection) {
        return selection.text;
      },
      theme: 'default',
      width: 'resolve'
    };
  };

  Defaults.prototype.set = function (key, value) {
    var camelKey = $.camelCase(key);

    var data = {};
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(true, this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) {
  function Options (options, $element) {
    this.options = options;

    if ($element != null) {
      this.fromElement($element);
    }

    this.options = Defaults.apply(this.options);

    if ($element && $element.is('input')) {
      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

      this.options.dataAdapter = Utils.Decorate(
        this.options.dataAdapter,
        InputCompat
      );
    }
  }

  Options.prototype.fromElement = function ($e) {
    var excludedData = ['select2'];

    if (this.options.multiple == null) {
      this.options.multiple = $e.prop('multiple');
    }

    if (this.options.disabled == null) {
      this.options.disabled = $e.prop('disabled');
    }

    if (this.options.language == null) {
      if ($e.prop('lang')) {
        this.options.language = $e.prop('lang').toLowerCase();
      } else if ($e.closest('[lang]').prop('lang')) {
        this.options.language = $e.closest('[lang]').prop('lang');
      }
    }

    if (this.options.dir == null) {
      if ($e.prop('dir')) {
        this.options.dir = $e.prop('dir');
      } else if ($e.closest('[dir]').prop('dir')) {
        this.options.dir = $e.closest('[dir]').prop('dir');
      } else {
        this.options.dir = 'ltr';
      }
    }

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if (Utils.GetData($e[0], 'select2Tags')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      }

      Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
      Utils.StoreData($e[0], 'tags', true);
    }

    if (Utils.GetData($e[0], 'ajaxUrl')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      }

      $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
      Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
	  
    }

    var dataset = {};

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
      dataset = $.extend(true, {}, $e[0].dataset, Utils.GetData($e[0]));
    } else {
      dataset = Utils.GetData($e[0]);
    }

    var data = $.extend(true, {}, dataset);

    data = Utils._convertData(data);

    for (var key in data) {
      if ($.inArray(key, excludedData) > -1) {
        continue;
      }

      if ($.isPlainObject(this.options[key])) {
        $.extend(this.options[key], data[key]);
      } else {
        this.options[key] = data[key];
      }
    }

    return this;
  };

  Options.prototype.get = function (key) {
    return this.options[key];
  };

  Options.prototype.set = function (key, val) {
    this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
    if (Utils.GetData($element[0], 'select2') != null) {
      Utils.GetData($element[0], 'select2').destroy();
    }

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || {};

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    Utils.StoreData($element[0], 'old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) {
      self.trigger('selection:update', {
        data: initialData
      });
    });

    // Hide the original select
    $element.addClass('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    Utils.StoreData($element[0], 'select2', this);

    // Ensure backwards compatibility with $element.data('select2').
    $element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
    var id = '';

    if ($element.attr('id') != null) {
      id = $element.attr('id');
    } else if ($element.attr('name') != null) {
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    } else {
      id = Utils.generateChars(4);
    }

    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = 'select2-' + id;

    return id;
  };

  Select2.prototype._placeContainer = function ($container) {
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) {
      $container.css('width', width);
    }
  };

  Select2.prototype._resolveWidth = function ($element, method) {
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') {
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) {
        return styleWidth;
      }

      return this._resolveWidth($element, 'element');
    }

    if (method == 'element') {
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) {
        return 'auto';
      }

      return elementWidth + 'px';
    }

    if (method == 'style') {
      var style = $element.attr('style');

      if (typeof(style) !== 'string') {
        return null;
      }

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) {
          return matches[1];
        }
      }

      return null;
    }

    return method;
  };

  Select2.prototype._bindAdapters = function () {
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
    var self = this;

    this.$element.on('change.select2', function () {
      self.dataAdapter.current(function (data) {
        self.trigger('selection:update', {
          data: data
        });
      });
    });

    this.$element.on('focus.select2', function (evt) {
      self.trigger('focus', evt);
    });

    this._syncA = Utils.bind(this._syncAttributes, this);
    this._syncS = Utils.bind(this._syncSubtree, this);

    if (this.$element[0].attachEvent) {
      this.$element[0].attachEvent('onpropertychange', this._syncA);
    }

    var observer = window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    ;

    if (observer != null) {
      this._observer = new observer(function (mutations) {
        $.each(mutations, self._syncA);
        $.each(mutations, self._syncS);
      });
      this._observer.observe(this.$element[0], {
        attributes: true,
        childList: true,
        subtree: false
      });
    } else if (this.$element[0].addEventListener) {
      this.$element[0].addEventListener(
        'DOMAttrModified',
        self._syncA,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeInserted',
        self._syncS,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeRemoved',
        self._syncS,
        false
      );
    }
  };

  Select2.prototype._registerDataEvents = function () {
    var self = this;

    this.dataAdapter.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerSelectionEvents = function () {
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () {
      self.toggleDropdown();
    });

    this.selection.on('focus', function (params) {
      self.focus(params);
    });

    this.selection.on('*', function (name, params) {
      if ($.inArray(name, nonRelayEvents) !== -1) {
        return;
      }

      self.trigger(name, params);
    });
  };

  Select2.prototype._registerDropdownEvents = function () {
    var self = this;

    this.dropdown.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerResultsEvents = function () {
    var self = this;

    this.results.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerEvents = function () {
    var self = this;

    this.on('open', function () {
      self.$container.addClass('select2-container--open');
    });

    this.on('close', function () {
      self.$container.removeClass('select2-container--open');
    });

    this.on('enable', function () {
      self.$container.removeClass('select2-container--disabled');
    });

    this.on('disable', function () {
      self.$container.addClass('select2-container--disabled');
    });

    this.on('blur', function () {
      self.$container.removeClass('select2-container--focus');
    });

    this.on('query', function (params) {
      if (!self.isOpen()) {
        self.trigger('open', {});
      }

      this.dataAdapter.query(params, function (data) {
        self.trigger('results:all', {
          data: data,
          query: params
        });
      });
    });

    this.on('query:append', function (params) {
      this.dataAdapter.query(params, function (data) {
        self.trigger('results:append', {
          data: data,
          query: params
        });
      });
    });

    this.on('keypress', function (evt) {
      var key = evt.which;

      if (self.isOpen()) {
        if (key === KEYS.ESC || key === KEYS.TAB ||
            (key === KEYS.UP && evt.altKey)) {
          self.close();

          evt.preventDefault();
        } else if (key === KEYS.ENTER) {
          self.trigger('results:select', {});

          evt.preventDefault();
        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
          self.trigger('results:toggle', {});

          evt.preventDefault();
        } else if (key === KEYS.UP) {
          self.trigger('results:previous', {});

          evt.preventDefault();
        } else if (key === KEYS.DOWN) {
          self.trigger('results:next', {});

          evt.preventDefault();
        }
      } else {
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) {
          self.open();

          evt.preventDefault();
        }
      }
    });
  };

  Select2.prototype._syncAttributes = function () {
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.options.get('disabled')) {
      if (this.isOpen()) {
        this.close();
      }

      this.trigger('disable', {});
    } else {
      this.trigger('enable', {});
    }
  };

  Select2.prototype._syncSubtree = function (evt, mutations) {
    var changed = false;
    var self = this;

    // Ignore any mutation events raised for elements that aren't options or
    // optgroups. This handles the case when the select element is destroyed
    if (
      evt && evt.target && (
        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
      )
    ) {
      return;
    }

    if (!mutations) {
      // If mutation events aren't supported, then we can only assume that the
      // change affected the selections
      changed = true;
    } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
      for (var n = 0; n < mutations.addedNodes.length; n++) {
        var node = mutations.addedNodes[n];

        if (node.selected) {
          changed = true;
        }
      }
    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
      changed = true;
    }

    // Only re-pull the data if we think there is a change
    if (changed) {
      this.dataAdapter.current(function (currentData) {
        self.trigger('selection:update', {
          data: currentData
        });
      });
    }
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = {
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting',
      'clear': 'clearing'
    };

    if (args === undefined) {
      args = {};
    }

    if (name in preTriggerMap) {
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = {
        prevented: false,
        name: name,
        args: args
      };

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) {
        args.prevented = true;

        return;
      }
    }

    actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
    if (this.options.get('disabled')) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  Select2.prototype.open = function () {
    if (this.isOpen()) {
      return;
    }

    this.trigger('query', {});
  };

  Select2.prototype.close = function () {
    if (!this.isOpen()) {
      return;
    }

    this.trigger('close', {});
  };

  Select2.prototype.isOpen = function () {
    return this.$container.hasClass('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
    return this.$container.hasClass('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) {
      return;
    }

    this.$container.addClass('select2-container--focus');
    this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    }

    if (args == null || args.length === 0) {
      args = [true];
    }

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  };

  Select2.prototype.data = function () {
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) {
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    }

    var data = [];

    this.dataAdapter.current(function (currentData) {
      data = currentData;
    });

    return data;
  };

  Select2.prototype.val = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    }

    if (args == null || args.length === 0) {
      return this.$element.val();
    }

    var newVal = args[0];

    if ($.isArray(newVal)) {
      newVal = $.map(newVal, function (obj) {
        return obj.toString();
      });
    }

    this.$element.val(newVal).trigger('change');
  };

  Select2.prototype.destroy = function () {
    this.$container.remove();

    if (this.$element[0].detachEvent) {
      this.$element[0].detachEvent('onpropertychange', this._syncA);
    }

    if (this._observer != null) {
      this._observer.disconnect();
      this._observer = null;
    } else if (this.$element[0].removeEventListener) {
      this.$element[0]
        .removeEventListener('DOMAttrModified', this._syncA, false);
      this.$element[0]
        .removeEventListener('DOMNodeInserted', this._syncS, false);
      this.$element[0]
        .removeEventListener('DOMNodeRemoved', this._syncS, false);
    }

    this._syncA = null;
    this._syncS = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex',
    Utils.GetData(this.$element[0], 'old-tabindex'));

    this.$element.removeClass('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    Utils.RemoveData(this.$element[0]);
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  };

  Select2.prototype.render = function () {
    var $container = $(
      '<span class="select2 select2-container">' +
        '<span class="selection"></span>' +
        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
      '</span>'
    );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container.addClass('select2-container--' + this.options.get('theme'));

    Utils.StoreData($container[0], 'element', this.$element);

    return $container;
  };

  return Select2;
});

S2.define('jquery-mousewheel',[
  'jquery'
], function ($) {
  // Used to shim jQuery.mousewheel for non-full builds.
  return $;
});

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults',
  './select2/utils'
], function ($, _, Select2, Defaults, Utils) {
  if ($.fn.select2 == null) {
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) {
      options = options || {};

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend(true, {}, options);

          var instance = new Select2($(this), instanceOptions);
        });

        return this;
      } else if (typeof options === 'string') {
        var ret;
        var args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
          var instance = Utils.GetData(this, 'select2');

          if (instance == null && window.console && console.error) {
            console.error(
              'The select2(\'' + options + '\') method was called on an ' +
              'element that is not using Select2.'
            );
          }

          ret = instance[options].apply(instance, args);
        });

        // Check if we should be returning `this`
        if ($.inArray(options, thisMethods) > -1) {
          return this;
        }

        return ret;
      } else {
        throw new Error('Invalid arguments for Select2: ' + options);
      }
    };
  }

  if ($.fn.select2.defaults == null) {
    $.fn.select2.defaults = Defaults;
  }

  return Select2;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
    define: S2.define,
    require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map