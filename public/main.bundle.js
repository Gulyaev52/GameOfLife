/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Controller = __webpack_require__(4);
	
	var _Controller2 = _interopRequireDefault(_Controller);
	
	var _View = __webpack_require__(5);
	
	var _View2 = _interopRequireDefault(_View);
	
	var _Life = __webpack_require__(22);
	
	var _Life2 = _interopRequireDefault(_Life);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HEIGHT = 25;
	var WIDTH = 50;
	
	var life = new _Life2.default(HEIGHT, WIDTH);
	var view = new _View2.default({ elem: document.body });
	var controller = new _Controller2.default(view, life);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Controller = function () {
	    function Controller(view, gameLife) {
	        _classCallCheck(this, Controller);
	
	        this._view = view;
	        this._gameLife = gameLife;
	        this._timerId = null;
	
	        this._view.on('start', this.play.bind(this));
	        this._view.on('pause', this.pause.bind(this));
	        this._view.on('clearBoard', this.clearBoard.bind(this));
	        this._view.on('changeCell', this.toggleStateCell.bind(this));
	        this._view.on('changeHeight', this.setHeight.bind(this));
	        this._view.on('changeWidth', this.setWidth.bind(this));
	
	        this.drawBoard();
	    }
	
	    _createClass(Controller, [{
	        key: 'toggleStateCell',
	        value: function toggleStateCell(x, y) {
	            this._gameLife.toggleStateCell(x, y);
	        }
	    }, {
	        key: 'setHeight',
	        value: function setHeight(height) {
	            this._gameLife.setHeight(height);
	            this.drawBoard();
	        }
	    }, {
	        key: 'setWidth',
	        value: function setWidth(width) {
	            this._gameLife.setWidth(width);
	            this.drawBoard();
	        }
	    }, {
	        key: 'play',
	        value: function play() {
	            var _this = this;
	
	            this._timerId = setInterval(function () {
	                _this._gameLife.nextGeneration();
	                _this.drawBoard();
	            }, 500);
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            clearInterval(this._timerId);
	        }
	    }, {
	        key: 'clearBoard',
	        value: function clearBoard() {
	            this._gameLife.clearBoard();
	            this.pause();
	            this.drawBoard();
	        }
	    }, {
	        key: 'drawBoard',
	        value: function drawBoard() {
	            var board = this._gameLife.board;
	            this._view.draw(board);
	        }
	    }]);
	
	    return Controller;
	}();
	
	exports.default = Controller;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _gameLife = __webpack_require__(6);
	
	var _gameLife2 = _interopRequireDefault(_gameLife);
	
	var _board = __webpack_require__(15);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _events = __webpack_require__(20);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _helpers = __webpack_require__(21);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var View = function (_eventEmitter) {
	    _inherits(View, _eventEmitter);
	
	    function View(_ref) {
	        var elem = _ref.elem;
	
	        _classCallCheck(this, View);
	
	        var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));
	
	        _this._elem = elem;
	        elem.innerHTML = (0, _gameLife2.default)();
	
	        _this._findElems();
	
	        _this._attachEventHandlers();
	        return _this;
	    }
	
	    _createClass(View, [{
	        key: '_attachEventHandlers',
	        value: function _attachEventHandlers() {
	            var _this2 = this;
	
	            (0, _helpers.delegate)(this._boardElem, '.cell', 'click', function (_ref2) {
	                var target = _ref2.target;
	
	                _this2.toggleStateCell(target);
	            });
	
	            (0, _helpers.on)(this._inputHeight, 'change', this.changeHeight.bind(this));
	
	            (0, _helpers.on)(this._inputWidth, 'change', this.changeWidth.bind(this));
	
	            (0, _helpers.on)(this._buttonClear, 'click', function () {
	                return _this2.emit('clearBoard');
	            });
	
	            (0, _helpers.on)(this._buttonPause, 'click', function () {
	                return _this2.emit('pause');
	            });
	
	            (0, _helpers.on)(this._buttonStart, 'click', function () {
	                return _this2.emit('start');
	            });
	        }
	    }, {
	        key: 'draw',
	        value: function draw(board) {
	            this._boardElem.innerHTML = (0, _board2.default)({ board: board });
	        }
	    }, {
	        key: 'toggleStateCell',
	        value: function toggleStateCell(cellElem) {
	            if (cellElem.classList.contains('cell_alive')) {
	                cellElem.classList.remove('cell_alive');
	                cellElem.classList.add('cell_dead');
	            } else {
	                cellElem.classList.remove('cell_dead');
	                cellElem.classList.add('cell_alive');
	            }
	
	            var cellPosition = this._getCellPosition(cellElem);
	
	            this.emit.apply(this, ['changeCell'].concat(_toConsumableArray(cellPosition)));
	        }
	    }, {
	        key: 'changeHeight',
	        value: function changeHeight() {
	            this.changeSize(this._inputHeight, 'changeHeight');
	        }
	    }, {
	        key: 'changeWidth',
	        value: function changeWidth() {
	            this.changeSize(this._inputWidth, 'changeWidth');
	        }
	    }, {
	        key: 'changeSize',
	        value: function changeSize(input, eventName) {
	            var newSize = parseInt(input.value);
	
	            this.emit(eventName, newSize);
	        }
	    }, {
	        key: '_findElems',
	        value: function _findElems() {
	            this._boardElem = (0, _helpers.qs)('.game-life__board', this._el);
	            this._inputHeight = (0, _helpers.qs)('.input.input_height', this._elem);
	            this._inputWidth = (0, _helpers.qs)('.input.input_width', this._elem);
	            this._buttonPause = (0, _helpers.qs)('.button.button_pause', this._elem);
	            this._buttonStart = (0, _helpers.qs)('.button.button_start', this._elem);
	            this._buttonClear = (0, _helpers.qs)('.button.button_clear', this._elem);
	        }
	    }, {
	        key: '_getCellPosition',
	        value: function _getCellPosition(cellElem) {
	            var td = cellElem.closest('td');
	            var tr = td.closest('tr');
	
	            var x = td.cellIndex;
	            var y = tr.rowIndex;
	
	            return [x, y];
	        }
	    }]);
	
	    return View;
	}(_events2.default);
	
	exports.default = View;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	__webpack_require__(10);
	
	var _gameLife = __webpack_require__(12);
	
	var _gameLife2 = _interopRequireDefault(_gameLife);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _gameLife2.default;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(9);

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(11);

/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(13);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_mixins["input"] = pug_interp = function({ value, type }){
	var block = (this && this.block), attributes = (this && this.attributes) || {};
	pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes(["input",`input_${type}`], [false,true]), false, true)+pug.attr("value", value, true, true)) + "\u003E";
	};
	pug_mixins["button"] = pug_interp = function({ type, text }){
	var block = (this && this.block), attributes = (this && this.attributes) || {};
	pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes(["button",`button_${type}`], [false,true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E";
	};
	pug_html = pug_html + "\u003Cdiv class=\"game-life\"\u003E\u003Cdiv class=\"game-life__board\"\u003E \u003C\u002Fdiv\u003E\u003Cdiv class=\"game-life__controllers\"\u003E ";
	pug_mixins["input"]({ type: 'height', value: 25 });
	pug_mixins["input"]({ type: 'width', value: 50 });
	pug_mixins["button"]({ type: 'start', text: 'start' });
	pug_mixins["button"]({ type: 'pause', text: 'pause' });
	pug_mixins["button"].call({
	block: function(){
	pug_html = pug_html + " ";
	}
	}, { type: 'clear', text: 'clear' });
	pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pug_has_own_property = Object.prototype.hasOwnProperty;
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = pug_merge;
	function pug_merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = pug_merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	
	  for (var key in b) {
	    if (key === 'class') {
	      var valA = a[key] || [];
	      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
	    } else if (key === 'style') {
	      var valA = pug_style(a[key]);
	      var valB = pug_style(b[key]);
	      a[key] = valA + valB;
	    } else {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Process array, object, or string as a string of classes delimited by a space.
	 *
	 * If `val` is an array, all members of it and its subarrays are counted as
	 * classes. If `escaping` is an array, then whether or not the item in `val` is
	 * escaped depends on the corresponding item in `escaping`. If `escaping` is
	 * not an array, no escaping is done.
	 *
	 * If `val` is an object, all the keys whose value is truthy are counted as
	 * classes. No escaping is done.
	 *
	 * If `val` is a string, it is counted as a class. No escaping is done.
	 *
	 * @param {(Array.<string>|Object.<string, boolean>|string)} val
	 * @param {?Array.<string>} escaping
	 * @return {String}
	 */
	exports.classes = pug_classes;
	function pug_classes_array(val, escaping) {
	  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
	  for (var i = 0; i < val.length; i++) {
	    className = pug_classes(val[i]);
	    if (!className) continue;
	    escapeEnabled && escaping[i] && (className = pug_escape(className));
	    classString = classString + padding + className;
	    padding = ' ';
	  }
	  return classString;
	}
	function pug_classes_object(val) {
	  var classString = '', padding = '';
	  for (var key in val) {
	    if (key && val[key] && pug_has_own_property.call(val, key)) {
	      classString = classString + padding + key;
	      padding = ' ';
	    }
	  }
	  return classString;
	}
	function pug_classes(val, escaping) {
	  if (Array.isArray(val)) {
	    return pug_classes_array(val, escaping);
	  } else if (val && typeof val === 'object') {
	    return pug_classes_object(val);
	  } else {
	    return val || '';
	  }
	}
	
	/**
	 * Convert object or string to a string of CSS styles delimited by a semicolon.
	 *
	 * @param {(Object.<string, string>|string)} val
	 * @return {String}
	 */
	
	exports.style = pug_style;
	function pug_style(val) {
	  if (!val) return '';
	  if (typeof val === 'object') {
	    var out = '';
	    for (var style in val) {
	      /* istanbul ignore else */
	      if (pug_has_own_property.call(val, style)) {
	        out = out + style + ':' + val[style] + ';';
	      }
	    }
	    return out;
	  } else {
	    val += '';
	    if (val[val.length - 1] !== ';') 
	      return val + ';';
	    return val;
	  }
	};
	
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = pug_attr;
	function pug_attr(key, val, escaped, terse) {
	  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
	    return '';
	  }
	  if (val === true) {
	    return ' ' + (terse ? key : key + '="' + key + '"');
	  }
	  if (typeof val.toJSON === 'function') {
	    val = val.toJSON();
	  }
	  if (typeof val !== 'string') {
	    val = JSON.stringify(val);
	    if (!escaped && val.indexOf('"') !== -1) {
	      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
	    }
	  }
	  if (escaped) val = pug_escape(val);
	  return ' ' + key + '="' + val + '"';
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} terse whether to use HTML5 terse boolean attributes
	 * @return {String}
	 */
	exports.attrs = pug_attrs;
	function pug_attrs(obj, terse){
	  var attrs = '';
	
	  for (var key in obj) {
	    if (pug_has_own_property.call(obj, key)) {
	      var val = obj[key];
	
	      if ('class' === key) {
	        val = pug_classes(val);
	        attrs = pug_attr(key, val, false, terse) + attrs;
	        continue;
	      }
	      if ('style' === key) {
	        val = pug_style(val);
	      }
	      attrs += pug_attr(key, val, false, terse);
	    }
	  }
	
	  return attrs;
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var pug_match_html = /["&<>]/;
	exports.escape = pug_escape;
	function pug_escape(_html){
	  var html = '' + _html;
	  var regexResult = pug_match_html.exec(html);
	  if (!regexResult) return _html;
	
	  var result = '';
	  var i, lastIndex, escape;
	  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
	    switch (html.charCodeAt(i)) {
	      case 34: escape = '&quot;'; break;
	      case 38: escape = '&amp;'; break;
	      case 60: escape = '&lt;'; break;
	      case 62: escape = '&gt;'; break;
	      default: continue;
	    }
	    if (lastIndex !== i) result += html.substring(lastIndex, i);
	    lastIndex = i + 1;
	    result += escape;
	  }
	  if (lastIndex !== i) return result + html.substring(lastIndex, i);
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the pug in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @param {String} str original source
	 * @api private
	 */
	
	exports.rethrow = pug_rethrow;
	function pug_rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(14).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    pug_rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Pug') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(16);
	
	__webpack_require__(17);
	
	var _board = __webpack_require__(19);
	
	var _board2 = _interopRequireDefault(_board);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _board2.default;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(18);

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(13);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (board) {pug_mixins["cell"] = pug_interp = function(isAlive){
	var block = (this && this.block), attributes = (this && this.attributes) || {};
	const state = isAlive ? 'alive' : 'dead';
	pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["cell",'cell_' + state], [false,true]), false, true)) + "\u003E\u003C\u002Fdiv\u003E";
	};
	pug_mixins["board"] = pug_interp = function(board){
	var block = (this && this.block), attributes = (this && this.attributes) || {};
	pug_html = pug_html + "\u003Ctable class=\"board\"\u003E";
	// iterate board
	;(function(){
	  var $$obj = board;
	  if ('number' == typeof $$obj.length) {
	      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
	        var row = $$obj[pug_index0];
	pug_html = pug_html + "\u003Ctr class=\"board__row\"\u003E";
	// iterate row
	;(function(){
	  var $$obj = row;
	  if ('number' == typeof $$obj.length) {
	      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
	        var cell = $$obj[pug_index1];
	pug_html = pug_html + "\u003Ctd class=\"board__cell\"\u003E";
	pug_mixins["cell"](cell.alive);
	pug_html = pug_html + "\u003C\u002Ftd\u003E";
	      }
	  } else {
	    var $$l = 0;
	    for (var pug_index1 in $$obj) {
	      $$l++;
	      var cell = $$obj[pug_index1];
	pug_html = pug_html + "\u003Ctd class=\"board__cell\"\u003E";
	pug_mixins["cell"](cell.alive);
	pug_html = pug_html + "\u003C\u002Ftd\u003E";
	    }
	  }
	}).call(this);
	
	pug_html = pug_html + "\u003C\u002Ftr\u003E";
	      }
	  } else {
	    var $$l = 0;
	    for (var pug_index0 in $$obj) {
	      $$l++;
	      var row = $$obj[pug_index0];
	pug_html = pug_html + "\u003Ctr class=\"board__row\"\u003E";
	// iterate row
	;(function(){
	  var $$obj = row;
	  if ('number' == typeof $$obj.length) {
	      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
	        var cell = $$obj[pug_index2];
	pug_html = pug_html + "\u003Ctd class=\"board__cell\"\u003E";
	pug_mixins["cell"](cell.alive);
	pug_html = pug_html + "\u003C\u002Ftd\u003E";
	      }
	  } else {
	    var $$l = 0;
	    for (var pug_index2 in $$obj) {
	      $$l++;
	      var cell = $$obj[pug_index2];
	pug_html = pug_html + "\u003Ctd class=\"board__cell\"\u003E";
	pug_mixins["cell"](cell.alive);
	pug_html = pug_html + "\u003C\u002Ftd\u003E";
	    }
	  }
	}).call(this);
	
	pug_html = pug_html + "\u003C\u002Ftr\u003E";
	    }
	  }
	}).call(this);
	
	pug_html = pug_html + "\u003C\u002Ftable\u003E";
	};
	pug_mixins["board"](board);}.call(this,"board" in locals_for_with?locals_for_with.board:typeof board!=="undefined"?board:undefined));;return pug_html;};
	module.exports = template;

/***/ },
/* 20 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.qs = qs;
	exports.on = on;
	exports.delegate = delegate;
	function qs(selector, scope) {
		return (scope || document).querySelector(selector);
	}
	
	function on(target, type, callback, capture) {
		target.addEventListener(type, callback, !!capture);
	}
	
	function delegate(target, selector, type, handler, capture) {
		var dispatchEvent = function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = target.querySelectorAll(selector);
			var i = potentialElements.length;
	
			while (i--) {
				if (potentialElements[i] === targetElement) {
					handler.call(targetElement, event);
					break;
				}
			}
		};
	
		on(target, type, dispatchEvent, !!capture);
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell = __webpack_require__(23);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Life = function () {
	    function Life() {
	        var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
	        var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
	
	        _classCallCheck(this, Life);
	
	        this.height = height;
	        this.width = width;
	
	        this.board = this._createBoard(height, width);
	    }
	
	    _createClass(Life, [{
	        key: 'nextGeneration',
	        value: function nextGeneration() {
	            var _this = this;
	
	            this.board = this.board.map(function (row, y) {
	                return row.map(function (cell, x) {
	                    var newCell = new _Cell2.default(cell.alive);
	                    var numAliveNeighbors = _this.countAliveNeighbors(x, y);
	
	                    if (cell.alive) {
	                        if (numAliveNeighbors != 2 && numAliveNeighbors != 3) {
	                            newCell.alive = false;
	                        }
	                    } else if (numAliveNeighbors == 3) {
	                        newCell.alive = true;
	                    }
	
	                    return newCell;
	                });
	            });
	        }
	    }, {
	        key: 'clearBoard',
	        value: function clearBoard() {
	            this.board = this._createBoard(this.height, this.width);
	        }
	    }, {
	        key: 'countAliveNeighbors',
	        value: function countAliveNeighbors(x, y) {
	            return this.getAliveNeighbors(x, y).length;
	        }
	    }, {
	        key: 'getAliveNeighbors',
	        value: function getAliveNeighbors(x, y) {
	            var isAliveCell = function isAliveCell(cell) {
	                return cell.alive;
	            };
	
	            return this.getNeighbors(x, y).filter(isAliveCell);
	        }
	    }, {
	        key: 'getNeighbors',
	        value: function getNeighbors(x, y) {
	            var _this2 = this;
	
	            var getCoordNeighborCell = function getCoordNeighborCell(xCell, yCell) {
	                return function (_ref) {
	                    var _ref2 = _slicedToArray(_ref, 2),
	                        xDirection = _ref2[0],
	                        yDirection = _ref2[1];
	
	                    return [xCell + xDirection, yCell + yDirection];
	                };
	            };
	
	            var directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
	
	            var neighboringCells = directions.map(getCoordNeighborCell(x, y)).map(function (coordNeighbors) {
	                return _this2.getCell.apply(_this2, _toConsumableArray(coordNeighbors));
	            }).filter(Boolean);
	
	            return neighboringCells;
	        }
	    }, {
	        key: '_createBoard',
	        value: function _createBoard(height, width) {
	            var board = new Array(height).fill(null).map(function (_) {
	                return new Array(width).fill(null).map(function (_) {
	                    return new _Cell2.default();
	                });
	            });
	
	            return board;
	        }
	    }, {
	        key: 'setHeight',
	        value: function setHeight(height) {
	            this.resize(height, this.width);
	        }
	    }, {
	        key: 'setWidth',
	        value: function setWidth(width) {
	            this.resize(this.height, width);
	        }
	    }, {
	        key: 'resize',
	        value: function resize(height, width) {
	            var _this3 = this;
	
	            var newBoard = this._createBoard(height, width).map(function (row, y) {
	                return row.map(function (cell, x) {
	                    return _this3.getCell(x, y) || cell;
	                });
	            });
	
	            this.board = newBoard;
	        }
	    }, {
	        key: 'getCell',
	        value: function getCell(x, y) {
	            if (x >= 0 && x < this.width && y >= 0 && y < this.height) return this.board[y][x];
	        }
	    }, {
	        key: 'toggleStateCell',
	        value: function toggleStateCell(x, y) {
	            var cell = this.getCell(x, y);
	            cell.alive = !cell.alive;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.board.map(function (row) {
	                return row.map(function (cell) {
	                    return cell.alive ? '1' : '0';
	                }).join(' ');
	            }).join('\n');
	        }
	    }]);
	
	    return Life;
	}();
	
	exports.default = Life;
	
	
	if (!Array.prototype.fill) {
	    Array.prototype.fill = function (value) {
	
	        // Шаги 1-2.
	        if (this == null) {
	            throw new TypeError('this is null or not defined');
	        }
	
	        var O = Object(this);
	
	        // Шаги 3-5.
	        var len = O.length >>> 0;
	
	        // Шаги 6-7.
	        var start = arguments[1];
	        var relativeStart = start >> 0;
	
	        // Шаг 8.
	        var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
	
	        // Шаги 9-10.
	        var end = arguments[2];
	        var relativeEnd = end === undefined ? len : end >> 0;
	
	        // Шаг 11.
	        var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
	
	        // Шаг 12.
	        while (k < final) {
	            O[k] = value;
	            k++;
	        }
	
	        // Шаг 13.
	        return O;
	    };
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = function Cell() {
	    var alive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	    _classCallCheck(this, Cell);
	
	    this.alive = alive;
	};
	
	exports.default = Cell;

/***/ }
/******/ ]);
//# sourceMappingURL=main.bundle.js.map