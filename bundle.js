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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = exports.app = exports.h = undefined;

var _h = __webpack_require__(4);

var _h2 = _interopRequireDefault(_h);

var _app = __webpack_require__(3);

var _app2 = _interopRequireDefault(_app);

var _router = __webpack_require__(5);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.h = _h2.default;
exports.app = _app2.default;
exports.Router = _router2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hyperapp = __webpack_require__(0);

var _actions = __webpack_require__(6);

var _actions2 = _interopRequireDefault(_actions);

var _state = __webpack_require__(7);

var _state2 = _interopRequireDefault(_state);

var _counter = __webpack_require__(8);

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _hyperapp.app)({ state: _state2.default, actions: _actions2.default, view: _counter2.default });

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (app) {
  var state = {};
  var view = app.view;
  var actions = {};
  var events = {};
  var node;
  var element;

  for (var i = -1, plugins = app.plugins || []; i < plugins.length; i++) {
    var plugin = plugins[i] ? plugins[i](app) : app;

    if (plugin.state != null) {
      state = merge(state, plugin.state);
    }

    init(actions, plugin.actions);

    Object.keys(plugin.events || []).map(function (key) {
      events[key] = (events[key] || []).concat(plugin.events[key]);
    });
  }

  if (document.readyState[0] !== "l") {
    load();
  } else {
    addEventListener("DOMContentLoaded", load);
  }

  function init(namespace, children, lastName) {
    Object.keys(children || []).map(function (key) {
      var action = children[key];
      var name = lastName ? lastName + "." + key : key;

      if (typeof action === "function") {
        namespace[key] = function (data) {
          var result = action(state, emit("action", {
            name: name,
            data: data
          }).data, actions, emit);

          if (result == null || typeof result.then === "function") {
            return result;
          }

          render(state = merge(state, emit("update", result)), view);
        };
      } else {
        init(namespace[key] || (namespace[key] = {}), action, name);
      }
    });
  }

  function load() {
    render(state, view);
    emit("loaded", emit);
  }

  function emit(name, data) {
    (events[name] || []).map(function (cb) {
      var result = cb(state, actions, data, emit);
      if (result != null) {
        data = result;
      }
    });

    return data;
  }

  function render(state, view) {
    element = patch(app.root || (app.root = document.body), element, node, node = emit("render", view)(state, actions));
  }

  function merge(a, b) {
    var obj = {};

    if ((typeof b === "undefined" ? "undefined" : _typeof(b)) !== "object" || Array.isArray(b)) {
      return b;
    }

    for (var i in a) {
      obj[i] = a[i];
    }
    for (var i in b) {
      obj[i] = b[i];
    }

    return obj;
  }

  function createElementFrom(node, isSVG) {
    if (typeof node === "string") {
      var element = document.createTextNode(node);
    } else {
      var element = (isSVG = isSVG || node.tag === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", node.tag) : document.createElement(node.tag);

      for (var i = 0; i < node.children.length;) {
        element.appendChild(createElementFrom(node.children[i++], isSVG));
      }

      for (var name in node.data) {
        if (name === "onCreate") {
          node.data[name](element);
        } else {
          setElementData(element, name, node.data[name]);
        }
      }
    }

    return element;
  }

  function setElementData(element, name, value, oldValue) {
    if (name === "key") {} else if ((name = name.toLowerCase()) === "style") {
      for (var i in merge(oldValue, value = value || {})) {
        element.style[i] = value[i] || "";
      }
    } else {
      try {
        element[name] = value;
      } catch (_) {}

      if (typeof value !== "function") {
        if (value) {
          element.setAttribute(name, value);
        } else {
          element.removeAttribute(name);
        }
      }
    }
  }

  function updateElementData(element, oldData, data) {
    for (var name in merge(oldData, data)) {
      var value = data[name];
      var oldValue = oldData[name];

      if (name === "onUpdate") {
        value(element);
      } else if (value !== oldValue || value !== element[name]) {
        setElementData(element, name, value, oldValue);
      }
    }
  }

  function getKeyFrom(node) {
    if (node && (node = node.data)) {
      return node.key;
    }
  }

  function removeElement(parent, element, node) {
    if (node.data.onRemove) {
      node.data.onRemove(element);
    }
    parent.removeChild(element);
  }

  function patch(parent, element, oldNode, node) {
    if (oldNode == null) {
      element = parent.insertBefore(createElementFrom(node), element);
    } else if (node.tag && node.tag === oldNode.tag) {
      updateElementData(element, oldNode.data, node.data);

      var len = node.children.length;
      var oldLen = oldNode.children.length;
      var reusableChildren = {};
      var oldElements = [];
      var newKeys = {};

      for (var i = 0; i < oldLen; i++) {
        var oldElement = element.childNodes[i];
        oldElements[i] = oldElement;

        var oldChild = oldNode.children[i];
        var oldKey = getKeyFrom(oldChild);

        if (null != oldKey) {
          reusableChildren[oldKey] = [oldElement, oldChild];
        }
      }

      var i = 0;
      var j = 0;

      while (j < len) {
        var oldElement = oldElements[i];
        var oldChild = oldNode.children[i];
        var newChild = node.children[j];

        var oldKey = getKeyFrom(oldChild);
        if (newKeys[oldKey]) {
          i++;
          continue;
        }

        var newKey = getKeyFrom(newChild);

        var reusableChild = reusableChildren[newKey];
        var reusableElement = 0;
        var reusableNode = 0;

        if (reusableChild) {
          reusableElement = reusableChild[0];
          reusableNode = reusableChild[1];
        }

        if (null == oldKey && null == newKey) {
          patch(element, oldElement, oldChild, newChild);
          j++;
          i++;
        } else if (null == oldKey && null != newKey) {
          if (reusableElement) {
            element.insertBefore(reusableElement, oldElement);
            patch(element, reusableElement, reusableNode, newChild);
          } else {
            patch(element, oldElement, null, newChild);
          }

          j++;
          newKeys[newKey] = newChild;
        } else if (null != oldKey && null == newKey) {
          i++;
        } else {
          if (oldKey === newKey) {
            patch(element, reusableElement, reusableNode, newChild);
            i++;
          } else if (reusableElement) {
            element.insertBefore(reusableElement, oldElement);
            patch(element, reusableElement, reusableNode, newChild);
          } else {
            patch(element, oldElement, null, newChild);
          }

          j++;
          newKeys[newKey] = newChild;
        }
      }

      while (i < oldLen) {
        var oldChild = oldNode.children[i];
        var oldKey = getKeyFrom(oldChild);
        if (null == oldKey) {
          removeElement(element, oldElements[i], oldChild);
        }
        i++;
      }

      for (var i in reusableChildren) {
        var reusableChild = reusableChildren[i];
        var reusableNode = reusableChild[1];
        if (!newKeys[reusableNode.data.key]) {
          removeElement(element, reusableChild[0], reusableNode);
        }
      }
    } else if (node !== oldNode) {
      var i = element;
      parent.replaceChild(element = createElementFrom(node), i);
    }

    return element;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tag, data) {
  var node;
  var canConcat;
  var oldCanConcat;

  var stack = [];
  var children = [];

  for (var i = arguments.length; i-- > 2;) {
    stack.push(arguments[i]);
  }

  while (stack.length) {
    if (Array.isArray(node = stack.pop())) {
      i = node.length;

      while (i--) {
        stack.push(node[i]);
      }
    } else if (node != null && node !== true && node !== false) {
      i = children.length;

      if (typeof node === "number") {
        node = node + "";
      }

      canConcat = typeof node === "string";

      if (canConcat && oldCanConcat) {
        children[i - 1] += node;
      } else {
        children[i] = node;
        oldCanConcat = canConcat;
      }
    }
  }

  return typeof tag === "string" ? {
    tag: tag,
    data: data || {},
    children: children
  } : tag(data, children);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  return {
    actions: {
      router: {
        match: function match(state, data, actions, emit) {
          return {
            router: _match(data, emit)
          };
        },
        go: function go(state, data, actions) {
          history.pushState({}, "", data);
          actions.router.match(data);
        }
      }
    },
    events: {
      loaded: function loaded(state, actions) {
        addEventListener("popstate", function () {
          actions.router.match(location.pathname);
        });
      },
      render: function render(state, actions, view, emit) {
        return view[(state.router || (state.router = _match(location.pathname, emit))).match];
      }
    }
  };

  function _match(data, emit) {
    var match;
    var params = {};

    for (var route in app.view) {
      var keys = [];

      if (!match && route !== "*") {
        data.replace(new RegExp("^" + route.replace(/\//g, "\\/").replace(/:([A-Za-z0-9_]+)/g, function (_, key) {
          keys.push(key);

          return "([-A-Za-z0-9_]+)";
        }) + "/?$", "g"), function () {

          for (var i = 1; i < arguments.length - 2;) {
            params[keys.shift()] = arguments[i++];
          }

          match = route;
        });
      }
    }

    return emit("route", {
      match: match || "*",
      params: params
    });
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  add: function add(_ref) {
    var num = _ref.num;
    return { num: num + 1 };
  },
  sub: function sub(_ref2) {
    var num = _ref2.num;
    return { num: num - 1 };
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  num: 0
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

exports.default = function (state, msg) {
  return (0, _hyperapp.h)(
    "div",
    { "class": "counter" },
    (0, _hyperapp.h)(
      "h1",
      null,
      "hyperapp-one"
    ),
    (0, _hyperapp.h)(
      "p",
      null,
      (0, _hyperapp.h)(
        "em",
        null,
        "With JSX and Webpack"
      )
    ),
    (0, _hyperapp.h)("hr", null),
    (0, _hyperapp.h)(
      "section",
      null,
      (0, _hyperapp.h)(
        "button",
        {
          "class": "sub",
          onClick: msg.sub,
          disabled: state.num < 1
        },
        "-"
      ),
      (0, _hyperapp.h)(
        "h1",
        { "class": "count" },
        state.num
      ),
      (0, _hyperapp.h)(
        "button",
        {
          "class": "add",
          onClick: msg.add
        },
        "+"
      )
    )
  );
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ })
/******/ ]);