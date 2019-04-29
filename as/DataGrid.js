(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DataGrid"] = factory(require("vue"));
	else
		root["DataGrid"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1247":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "284c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4911":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7ddf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./src/components/Grid.ts
function cast(data) {
    return data;
}

// CONCATENATED MODULE: ./src/components/DataColumn.ts

var DataColumn = "DataColumn";
/* harmony default export */ var components_DataColumn = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: DataColumn,
    props: {
        title: { type: String },
        template: {},
        headTemplate: { type: String },
        sortOrder: { type: Number },
        sortDir: { type: String, default: "asc" },
        field: { type: String },
        sortable: { type: Boolean, default: true },
        render: {},
        filter: { default: true },
        width: { type: String },
        type: { type: String },
        values: { type: Array },
        icon: { type: String },
        formatOptions: {},
    },
    render: function (h) {
        return h("div");
    }
}));

// CONCATENATED MODULE: ./src/linq.ts
var Enumerable = /** @class */ (function () {
    function Enumerable(items) {
        this.items = items;
    }
    Enumerable.prototype.toList = function () {
        return this.items();
    };
    Enumerable.prototype.select = function (selector) {
        var _this = this;
        return new Enumerable(function () { return _this.items().map(selector); });
    };
    Enumerable.prototype.take = function (count) {
        var _this = this;
        return new Enumerable(function () {
            var result = [];
            var items = _this.items();
            for (var a = 0; a < count && items.length; a++)
                result.push(items[a]);
            return result;
        });
    };
    Enumerable.prototype.where = function (predicate) {
        var _this = this;
        return new Enumerable(function () {
            var result = [];
            _this.items().forEach(function (i) {
                if (predicate(i))
                    result.push(i);
            });
            return result;
        });
    };
    Enumerable.prototype.orderBy = function (selector) {
        var _this = this;
        return new Enumerable(function () {
            var items = _this.items();
            items.sort(function (a, b) {
                var keyA = selector(a);
                var keyB = selector(b);
                if (keyA < keyB)
                    return -1;
                if (keyA > keyB)
                    return 1;
                return 0;
            });
            return items;
        });
    };
    Enumerable.prototype.selectMany = function (selector) {
        var _this = this;
        return new Enumerable(function () {
            var result = [];
            _this.items().forEach(function (i) {
                selector(i).forEach(function (j) { return result.push(j); });
            });
            return result;
        });
    };
    Enumerable.prototype.concat = function (other) {
        var _this = this;
        return new Enumerable(function () {
            var result = _this.items();
            result.push.apply(result, other);
            return result;
        });
    };
    Enumerable.prototype.groupSorted = function (keysSelector) {
        var _this = this;
        var arraysEqual = function (first, second) {
            if (first.length !== second.length)
                return false;
            for (var i = 0; i < first.length; i++)
                if (first[i] !== second[i])
                    return false;
            return true;
        };
        return new Enumerable(function () {
            var values = _this.items();
            var groupKey = [];
            var result = [];
            for (var a = 0; a < values.length; a++) {
                var item = values[a];
                var currentKey = keysSelector(item);
                if (a === 0 || !arraysEqual(groupKey, currentKey)) {
                    groupKey = currentKey;
                    result.push({ key: groupKey, values: [] });
                }
                result[result.length - 1].values.push(item);
            }
            return result;
        });
    };
    Enumerable.prototype.groupBy = function (keySelector) {
        var _this = this;
        return new Enumerable(function () {
            var result = [];
            var lookup = {};
            _this.items().forEach(function (i) {
                var key = keySelector(i);
                if (!lookup[key])
                    lookup[key] = [i];
                else
                    lookup[key].push(i);
            });
            for (var _i = 0, _a = Object.keys(lookup); _i < _a.length; _i++) {
                var key = _a[_i];
                result.push({
                    key: key,
                    values: lookup[key]
                });
            }
            return result;
        });
    };
    Enumerable.prototype.all = function (predicate) {
        for (var _i = 0, _a = this.items(); _i < _a.length; _i++) {
            var item = _a[_i];
            if (!predicate(item))
                return false;
        }
        return true;
    };
    Enumerable.prototype.zip = function (values, selector) {
        var _this = this;
        return new Enumerable(function () {
            var result = [];
            var items = _this.items();
            for (var a = 0; a < items.length; a++)
                result.push(selector(items[a], values[a]));
            return result;
        });
    };
    Enumerable.prototype.sum = function (selector) {
        var result = 0;
        for (var _i = 0, _a = this.items(); _i < _a.length; _i++) {
            var item = _a[_i];
            result += selector(item);
        }
        return result;
    };
    Enumerable.prototype.any = function (predicate) {
        for (var _i = 0, _a = this.items(); _i < _a.length; _i++) {
            var item = _a[_i];
            if (predicate(item))
                return true;
        }
        return false;
    };
    Enumerable.prototype.firstOrDefault = function (predicate) {
        var result = this.toList();
        if (result.length === 0)
            return undefined;
        if (!predicate)
            return result[0];
        return result.find(predicate);
    };
    Enumerable.prototype.cast = function () {
        return this;
    };
    return Enumerable;
}());
function chain(items) {
    return new Enumerable(function () { return items; });
}
function range(start, count) {
    var result = [];
    for (var a = 0; a < count; a++)
        result.push(start + a);
    return chain(result);
}

// CONCATENATED MODULE: ./src/StringFormat.ts
//no we are not using library for this...
function leftPad(text, length, placeholder) {
    var result = text ? text : "";
    while (result.length < length)
        result = placeholder + result;
    return result.length > length ? result.substr(0, length) : result;
}

// CONCATENATED MODULE: ./src/DateFormat.ts


var TokenKind;
(function (TokenKind) {
    TokenKind[TokenKind["Year"] = 0] = "Year";
    TokenKind[TokenKind["Month"] = 1] = "Month";
    TokenKind[TokenKind["Day"] = 2] = "Day";
    TokenKind[TokenKind["Hour"] = 3] = "Hour";
    TokenKind[TokenKind["Minute"] = 4] = "Minute";
    TokenKind[TokenKind["Second"] = 5] = "Second";
})(TokenKind || (TokenKind = {}));
var dateParts = [
    { token: "YYYY", formatter: function (d) { return "" + d.getFullYear(); }, setter: function (t, v) { return t.year = v; }, kind: TokenKind.Year },
    { token: "YY", formatter: function (d) { return ("" + d.getFullYear()).substr(2); }, setter: function (t, v) { return t.year = v; }, kind: TokenKind.Year },
    { token: "MM", formatter: function (d) { return leftPad("" + (d.getMonth() + 1), 2, "0"); }, setter: function (t, v) { return t.month = v - 1; }, kind: TokenKind.Month },
    { token: "DD", formatter: function (d) { return leftPad("" + d.getDate(), 2, "0"); }, setter: function (t, v) { return t.day = v; }, kind: TokenKind.Day },
    { token: "HH", formatter: function (d) { return leftPad("" + d.getHours(), 2, "0"); }, setter: function (t, v) { return t.hour = v; }, kind: TokenKind.Hour },
    { token: "mm", formatter: function (d) { return leftPad("" + d.getMinutes(), 2, "0"); }, setter: function (t, v) { return t.minute = v; }, kind: TokenKind.Minute },
    { token: "ss", formatter: function (d) { return leftPad("" + d.getSeconds(), 2, "0"); }, setter: function (t, v) { return t.second = v; }, kind: TokenKind.Second },
];
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Const"] = 0] = "Const";
    TokenType[TokenType["DatePart"] = 1] = "DatePart";
})(TokenType || (TokenType = {}));
function tokenize(format) {
    var result = [];
    while (format) {
        var entry = dateLookup[format[0]];
        var match = entry
            ? entry.find(function (i) { return format.startsWith(i.token); })
            : undefined;
        if (!match) {
            var last = result.length > 0 ? result[result.length - 1] : null;
            if (last != null && last.type === TokenType.Const)
                last.value += format[0];
            else
                result.push({
                    type: TokenType.Const,
                    value: format[0]
                });
            format = format.substr(1);
            continue;
        }
        result.push({
            type: TokenType.DatePart,
            part: match
        });
        format = format.substr(match.token.length);
    }
    return result;
}
function today() {
    var value = new Date();
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}
function findLayout(format) {
    return tokenize(format)
        .map(function (i) { return (i.type === TokenType.DatePart ? i.part.kind : undefined); })
        .filter(function (i) { return i !== undefined; });
}
var dateLookup = {};
chain(dateParts)
    .groupBy(function (i) { return i.token[0]; })
    .toList()
    .forEach(function (i) { return dateLookup[i.key] = i.values.sort(function (a, b) { return a.token.length < b.token.length ? 1 : -1; }); });
function formatDate(date, format) {
    return tokenize(format)
        .map(function (i) { return i.type === TokenType.DatePart ? i.part.formatter(date) : i.value; })
        .join("");
}
function positionKind(position, format) {
    var start = 0;
    var kind = null;
    for (var _i = 0, _a = tokenize(format); _i < _a.length; _i++) {
        var part = _a[_i];
        var value = part.type === TokenType.Const
            ? part.value
            : part.part.token;
        if (part.type === TokenType.DatePart)
            kind = part.part.kind;
        if (position >= start + value.length) {
            start += value.length;
            continue;
        }
        return kind;
    }
    return kind;
}
//checks if specified char value can be placed at given position when using specified format
function DateFormat_isMatching(input, position, format) {
    var start = 0;
    for (var _i = 0, _a = tokenize(format); _i < _a.length; _i++) {
        var part = _a[_i];
        var value = part.type === TokenType.Const
            ? part.value
            : part.part.token;
        if (position >= start + value.length) {
            start += value.length;
            continue;
        }
        return part.type === TokenType.Const
            ? part.value[position - start] === input
            : /^\d+$/gm.test(input);
    }
    return false;
}
function nearestInputIndex(position, format) {
    var start = 0;
    for (var _i = 0, _a = tokenize(format); _i < _a.length; _i++) {
        var part = _a[_i];
        var value = part.type === TokenType.Const
            ? part.value
            : part.part.token;
        if (part.type === TokenType.Const || position >= start + value.length) {
            start += value.length;
            continue;
        }
        return Math.max(start, position);
    }
    return format.length;
}
function nextBounadry(position, format) {
    var start = 0;
    if (position >= format.length - 1)
        return format.length;
    for (var _i = 0, _a = tokenize(format); _i < _a.length; _i++) {
        var part = _a[_i];
        if (part.type === TokenType.Const) {
            start += part.value.length;
            continue;
        }
        var length = part.part.token.length;
        if (position >= start + length) {
            start += length;
            continue;
        }
        if (position < start)
            return start;
        return start + length;
    }
    return format.length - 1;
}
function previousBoundary(position, format) {
    var end = format.length - 1;
    var tokens = tokenize(format);
    for (var a = tokens.length - 1; a >= 0; a--) {
        var part = tokens[a];
        if (part.type === TokenType.Const) {
            end -= part.value.length;
            continue;
        }
        var length = part.part.token.length;
        if (position <= end - length + 1) {
            end -= length;
            continue;
        }
        if (position > end + 1)
            return end + 1;
        return end - length + 1;
    }
    return 0;
}
function tryParse(value, format) {
    if (!value)
        return null;
    var result = {
        day: 0,
        hour: 0,
        minute: 0,
        month: 0,
        second: 0,
        year: 0
    };
    var parts = tokenize(format);
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (!value)
            return null;
        if (part.type === TokenType.Const) {
            if (!value.startsWith(part.value))
                return null;
            value = value.substr(part.value.length);
            continue;
        }
        var datePart = part.part;
        var tokenValue = value.substr(0, datePart.token.length);
        if (!/^\d+$/gm.test(tokenValue))
            return null;
        value = value.substr(datePart.token.length);
        datePart.setter(result, parseInt(tokenValue, 10));
    }
    return value.length === 0
        ? new Date(result.year, result.month, result.day, result.hour, result.minute, result.second, 0)
        : null;
}

// CONCATENATED MODULE: ./src/NumberFormat.ts
//based on code from accounting.js
/*!
 * accounting.js v0.4.2
 * Copyright 2014 Open Exchange Rates
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://openexchangerates.github.io/accounting.js/
 */
function unformat(value, decimal) {
    // Fails silently (need decent errors):
    if (!value)
        return 0;
    // Return the value as-is if it's already a number:
    if (typeof value === "number")
        return value;
    // Build regex to strip out everything except digits, decimal point and minus sign:
    var regex = new RegExp("[^0-9-.]", "g");
    var result = parseFloat(("" + value)
        .replace(/\((?=\d+)(.*)\)/, "-$1") // replace bracketed values with negatives
        .replace(decimal, '.') // make sure decimal point is standard
        .replace(regex, '') // strip out any cruft
    );
    // This will fail silently which may cause trouble, let's wait and see:
    return !isNaN(result) ? result : 0;
}
/**
 * Check and normalise the value of precision (must be positive integer)
 */
function checkPrecision(val, base) {
    val = Math.round(Math.abs(val));
    return isNaN(val) ? base : val;
}
/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */
function toFixed(value, precision) {
    precision = checkPrecision(precision, 2);
    var exponentialForm = Number(value + 'e' + precision);
    var rounded = Math.round(exponentialForm);
    return Number(rounded + 'e-' + precision).toFixed(precision);
}
function formatNumber(value, precision, thousand, decimal) {
    var raw = unformat(value, decimal);
    // Clean up precision
    var usePrecision = checkPrecision(precision, 2);
    // Do some calc:
    var negative = raw < 0 ? "-" : "";
    var base = parseInt(toFixed(Math.abs(raw || 0), usePrecision), 10) + "";
    var mod = base.length > 3 ? base.length % 3 : 0;
    // Format the number:
    return negative +
        (mod ? base.substr(0, mod) + thousand : "") +
        base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
        (usePrecision ? decimal + toFixed(Math.abs(raw), usePrecision).split('.')[1] : "");
}

// CONCATENATED MODULE: ./src/Config.ts


var types = {};
var i18n = {
    yes: "Yes",
    no: "No",
    pagerPage: "Page",
    pagerOfPages: "of",
    firstPage: "First page",
    previousPage: "Previous page",
    nextPage: "Next page",
    lastPage: "Last page",
    pageListItemTitle: "Page %page%",
    filterAccept: "Accept",
    filterReset: "Reset",
    dropdownLabel: "Select...",
    rangeFrom: "From:",
    rangeTo: "To:",
    containsValue: "Contains:",
    valueEquals: "Equals:"
};
var calendarSettings = {
    dateFormat: "YYYY-MM-DD",
    datePlaceholder: "yyyy-mm-dd",
    timeFormat: "HH:mm",
    timePlaceholder: "hh:mm",
    dateTimeFormat: "YYYY-MM-DD HH:mm",
    dateTimePlaceholder: "yyyy-mm-dd hh:mm",
    dayNames: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ],
    monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekStart: 1,
    yearFormat: "{year}",
    yearRangeFormat: "{from} - {to}",
    monthFormat: "{month}",
    monthFirst: true
};
function setLocale(locale) {
    setSettings(locale.settings);
    setCalendar(locale.calendar);
    setLanguage(locale.text);
}
function getCalendar() {
    return calendarSettings;
}
function setCalendar(calendar) {
    var target = calendarSettings;
    for (var _i = 0, _a = Object.getOwnPropertyNames(calendar); _i < _a.length; _i++) {
        var prop = _a[_i];
        if (target[prop] !== undefined)
            target[prop] = calendar[prop];
    }
}
var Config_settings = {
    idField: "id",
    thousandSeparator: " ",
    decimalPrecision: 2,
    decimalSeparator: ".",
    ignoreDateOffset: false,
    defaultRemoteSource: null
};
function setSettings(values) {
    var target = Config_settings;
    for (var _i = 0, _a = Object.getOwnPropertyNames(values); _i < _a.length; _i++) {
        var prop = _a[_i];
        if (target[prop] !== undefined)
            target[prop] = values[prop];
    }
}
function getSettings() {
    return Config_settings;
}
function setLanguage(lang) {
    i18n = lang;
}
function addType(name, definition) {
    types[name] = {
        name: name,
        formatter: definition.formatter,
        filterComponent: definition.filterComponent,
        filterParams: definition.filterParams
    };
}
function getFormatter(typeName) {
    function defaultFormatter(value) {
        return value !== undefined && value !== null ? "" + value : "";
    }
    if (!typeName || !types[typeName])
        return defaultFormatter;
    var candidate = types[typeName].formatter;
    return candidate ? candidate : defaultFormatter;
}
function getFilterComponent(typeName) {
    if (!typeName || !types[typeName])
        return null;
    var candidate = types[typeName];
    return candidate && candidate.filterComponent
        ? { component: candidate.filterComponent, params: candidate.filterParams }
        : null;
}
function localize(key) {
    return i18n[key];
}
function setFilterComponent(typeName, filterComponent) {
    var entry = types[typeName];
    if (entry)
        entry.filterComponent = filterComponent;
}
addType("bool", {
    formatter: function (value) {
        if (value === undefined || value === null)
            return "";
        return !!value ? i18n.yes : i18n.no;
    },
    filterComponent: "BoolFilter"
});
function normailzeDate(value) {
    if (value instanceof Date)
        return value;
    if (typeof value !== "string")
        return new Date(value);
    var last = value.charAt(value.length - 1);
    if (last === 'z' || last === 'Z')
        return new Date(value.substr(0, value.length - 1));
    if (value.length < 6)
        return new Date(value);
    var separator = value.charAt(value.length - 6);
    var raw = separator === '+' || separator === "-"
        ? value.substr(0, value.length - 6)
        : value;
    return new Date(raw);
}
addType("date", {
    formatter: function (value, options) {
        if (!value)
            return "";
        var date = normailzeDate(value);
        return formatDate(date, typeof options === "string" ? options : calendarSettings.dateFormat);
    },
    filterComponent: "DateFilter"
});
function decimalFormatter(value, options) {
    if (value === 0)
        return "0";
    if (!value)
        return "";
    if (!options)
        return formatNumber(value, Config_settings.decimalPrecision, Config_settings.thousandSeparator, Config_settings.decimalSeparator);
    return formatNumber(value, options.precision !== undefined ? options.precision : Config_settings.decimalPrecision, options.thousand !== undefined ? options.thousand : Config_settings.thousandSeparator, options.separator !== undefined ? options.separator : Config_settings.decimalSeparator);
}
addType("decimal", {
    formatter: decimalFormatter,
    filterComponent: "NumericFilter",
    filterParams: { decimal: true },
});
addType("double", {
    formatter: decimalFormatter,
    filterComponent: "NumericFilter",
    filterParams: { decimal: true },
});
addType("text", {
    filterComponent: "TextFilter"
});
addType("int", {
    formatter: function (value, options) {
        if (value === 0)
            return "0";
        if (!value)
            return "";
        if (!options)
            return formatNumber(value, 0, Config_settings.thousandSeparator, Config_settings.decimalSeparator);
        return formatNumber(value, 0, options.thousand !== undefined ? options.thousand : Config_settings.thousandSeparator, options.separator !== undefined ? options.separator : Config_settings.decimalSeparator);
    },
    filterComponent: "NumericFilter",
    filterParams: { decimal: false },
});
addType("dateTime", {
    formatter: function (value, options) {
        if (!value)
            return "";
        var date = normailzeDate(value);
        return formatDate(date, typeof options === "string" ? options : calendarSettings.dateTimeFormat);
    },
    filterComponent: "DateTimeFilter"
});

// CONCATENATED MODULE: ./src/DataSource.ts

//promises by hand - for better compatibility ane less dependencies
var FilterOperator;
(function (FilterOperator) {
    FilterOperator["Equals"] = "eq";
    FilterOperator["GreaterThan"] = "gt";
    FilterOperator["GraterThanOrEqual"] = "gte";
    FilterOperator["LowerThan"] = "lt";
    FilterOperator["LowerThanOrEqual"] = "lte";
    FilterOperator["NotEqals"] = "neq";
    FilterOperator["In"] = "in";
    FilterOperator["Contains"] = "substr";
})(FilterOperator || (FilterOperator = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["Asc"] = "asc";
    SortDirection["Desc"] = "desc";
})(SortDirection || (SortDirection = {}));
var DataPromise = /** @class */ (function () {
    function DataPromise(resolver) {
        this.onSuccess = function () { };
        this.onError = function () { };
        this.onAlways = function () { };
        this.resolver = resolver;
    }
    DataPromise.prototype.success = function (callback) {
        this.onSuccess = callback;
        return this;
    };
    DataPromise.prototype.error = function (callback) {
        this.onError = callback;
        return this;
    };
    DataPromise.prototype.always = function (callback) {
        this.onAlways = callback;
        return this;
    };
    DataPromise.prototype.fetch = function () {
        this.resolver(this.onSuccess, this.onError, this.onAlways);
    };
    return DataPromise;
}());

var sources = {};
function addSource(name, factory) {
    sources[name] = factory;
}
var xhrHooks = [];
function addXhrHook(hook) {
    if (hook)
        xhrHooks.push(hook);
}
function normalize(data) {
    if (!data)
        return data;
    if (Array.isArray(data)) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            normalize(item);
        }
        return data;
    }
    if (typeof data === "object") {
        for (var _a = 0, _b = Object.keys(data); _a < _b.length; _a++) {
            var prop = _b[_a];
            data[prop] = normalize(data[prop]);
        }
        return data;
    }
    if (typeof data === "string") {
        var match = /^\/Date\(([0-9]+)\)\/$/.exec(data);
        return match
            ? new Date(parseInt(match[1], 10))
            : data;
    }
    return data;
}
function addRemoteSource(name, factory, selector) {
    sources[name] = function (url) { return ({
        name: name,
        load: function (request) { return ({ resolver: function (onSuccess, onError, onAlways) {
                var urlSet = factory(url, request);
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState !== XMLHttpRequest.DONE)
                        return;
                    onAlways();
                    if (xhr.status < 200 || xhr.status >= 300) {
                        onError(xhr.status);
                        return;
                    }
                    var raw = JSON.parse(xhr.responseText);
                    var result = selector ? selector(raw) : raw;
                    onSuccess(normalize(result.items), result.total, urlSet.dataUrl, urlSet.pageUrl);
                };
                xhr.open("GET", urlSet.pageUrl);
                xhrHooks.forEach(function (i) { return i(xhr); });
                xhr.send();
            } }); }
    }); };
}
/* harmony default export */ var DataSource = (function (source, sourceType) {
    if (!source)
        return emptySource();
    if (typeof source === "string") {
        if (!sourceType)
            throw { error: "DataGrid source type is not defined. Use 'type' property or set defaultRemoteSource through configuration." };
        var builder = sources[sourceType];
        if (builder)
            return builder(source);
        throw { error: "Not supported data source type: " + sourceType + "." };
    }
    if (Array.isArray(source)) {
        return arraySource(source);
    }
    throw { error: "Not supported data type passed as source for grid. Expected string url or array of objects." };
});
function emptySource() {
    return {
        name: "empty",
        load: function () {
            return { resolver: function (onSuccess, _, onAlways) {
                    onSuccess([], 0, "no-data", "no-data");
                    onAlways();
                } };
        }
    };
}
function operatorOrDefault(operator) {
    return operator !== undefined ? operator : FilterOperator.Equals;
}
function isRowMatching(row, filter) {
    var value = row[filter.field];
    var operator = operatorOrDefault(filter.operator);
    if (operator === FilterOperator.Equals)
        return value === filter.value;
    if (operator === FilterOperator.NotEqals)
        return value !== filter.value;
    if (operator === FilterOperator.GraterThanOrEqual)
        return value >= filter.value;
    if (operator === FilterOperator.GreaterThan)
        return value > filter.value;
    if (operator === FilterOperator.LowerThan)
        return value < filter.value;
    if (operator === FilterOperator.LowerThanOrEqual)
        return value <= filter.value;
    if (operator === FilterOperator.In)
        return filter.value && filter.value.length > 0 && chain(filter.value).any(function (i) { return i === value; });
    throw { message: "Unknown filter type: " + operator };
}
function arraySource(values) {
    return {
        name: "array",
        load: function (data) {
            return { resolver: function (onSuccess, _, onAlways) {
                    var isMatching = function (row) { return chain(data.filters)
                        .all(function (group) { return chain(group.filters).any(function (filter) { return isRowMatching(row, filter); }); }); };
                    var copy = data.filters.length > 0
                        ? chain(values).where(isMatching).toList()
                        : values.slice();
                    if (data.sorting.length > 0)
                        copy.sort(function (a, b) {
                            for (var _i = 0, _a = data.sorting; _i < _a.length; _i++) {
                                var entry = _a[_i];
                                if (a[entry.field] === b[entry.field])
                                    continue;
                                var isLower = a[entry.field] < b[entry.field];
                                if (entry.direction === "desc")
                                    isLower = !isLower;
                                return isLower ? -1 : 1;
                            }
                            return 0;
                        });
                    var result = copy.slice(data.page * data.pageSize, (data.page + 1) * data.pageSize);
                    onSuccess(result, copy.length, "local", "local");
                    onAlways();
                } };
        }
    };
}

// EXTERNAL MODULE: ./src/components/DataGrid.less
var DataGrid = __webpack_require__("284c");

// CONCATENATED MODULE: ./src/components/NumericInput.ts

var validKeys = {};
["Backspace", "Tab", "ArrowLeft", "ArrowRight"].forEach(function (i) { return validKeys[i] = true; });
/* harmony default export */ var NumericInput = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "NumericInput",
    props: {
        value: { type: Number, default: null },
        float: { type: Boolean, default: false },
        separator: { type: String, default: "." }
    },
    data: function () {
        return {
            buffer: this.value !== null && this.value !== undefined ? "" + this.value : "",
        };
    },
    methods: {
        formatValue: function (value) {
            return value ? ("" + value).replace(".", this.separator) : "";
        },
        emitValue: function (buffer) {
            var _this = this;
            if (buffer.endsWith(this.separator))
                buffer = buffer + "0";
            if (buffer.startsWith(this.separator))
                buffer = "0" + buffer;
            buffer = buffer.replace(this.separator, ".");
            var newValue = (function () {
                if (buffer === "0")
                    return 0;
                if (!buffer)
                    return null;
                if (_this.float)
                    return parseFloat(buffer);
                return parseInt(buffer, 10);
            })();
            if (newValue !== this.value)
                this.$emit("input", newValue);
            return newValue;
        }
    },
    render: function (h) {
        var _this = this;
        return h("input", {
            attrs: { type: "text" },
            domProps: { value: this.formatValue(this.value) },
            on: {
                keydown: function (e) {
                    var target = e.target;
                    if (e.ctrlKey)
                        return true;
                    if (e.key >= "0" && e.key <= "9")
                        return true;
                    if (/F[0-9]{1,2}/.test(e.key))
                        return true;
                    if (e.key === "-" && !target.value)
                        return true;
                    if (e.key === _this.separator && _this.float)
                        return target.value.indexOf(_this.separator) === -1;
                    if (validKeys[e.key])
                        return true;
                    if (e.key === "Enter") {
                        _this.emitValue(target.value);
                        return true;
                    }
                    if (e.key === "Escape") {
                        _this.emitValue("" + _this.value);
                        target.value = "" + _this.value;
                        e.target.blur();
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                },
                blur: function (e) {
                    var target = e.target;
                    var newValue = _this.emitValue(target.value);
                    target.value = _this.formatValue(newValue);
                }
            }
        });
    }
}));

// CONCATENATED MODULE: ./src/components/Pager.ts



/* harmony default export */ var Pager = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "Pager",
    props: {
        total: { type: Number, default: 0 },
        value: { type: Number, default: 0 },
        pageSize: { type: Number, default: 10 }
    },
    computed: {
        pageCount: function () {
            if (this.total <= 0)
                return 1;
            return Math.ceil(this.total / this.workingSize);
        },
        workingSize: function () {
            return this.pageSize >= 1 ? this.pageSize : 1;
        }
    },
    render: function (h) {
        var _this = this;
        return h("div", { class: "dg-pager" }, [
            h("span", localize("pagerPage")),
            h("numeric-input", {
                props: {
                    value: this.value + 1,
                },
                style: {
                    width: (10 + (("" + this.value).length * 20)) + "px"
                },
                on: {
                    input: function (value) {
                        var candidate = value >= 1 ? value - 1 : 0;
                        _this.$emit("input", candidate >= _this.pageCount
                            ? _this.pageCount - 1
                            : (candidate < 0 ? 0 : candidate));
                    }
                }
            }),
            h("span", localize("pagerOfPages") + " " + this.pageCount),
        ]);
    },
    components: {
        NumericInput: NumericInput
    }
}));

// CONCATENATED MODULE: ./src/components/PageList.ts



/* harmony default export */ var PageList = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "PageList",
    props: {
        total: { type: Number, default: 0 },
        value: { type: Number, default: 0 },
        pageSize: { type: Number, default: 10 }
    },
    computed: {
        pageCount: function () {
            if (this.total <= 0)
                return 1;
            return Math.ceil(this.total / this.workingSize);
        },
        workingSize: function () {
            return this.pageSize >= 1 ? this.pageSize : 1;
        }
    },
    render: function (h) {
        var _this = this;
        var buildRange = function () {
            var result = [];
            for (var a = _this.value - 2; a < _this.value; a++)
                if (a >= 0)
                    result.push(a);
            result.push(_this.value);
            for (var a = _this.value + 1; result.length < 5 && a < _this.pageCount; a++)
                result.push(a);
            while (result.length < 5 && result[0] !== 0)
                result.splice(0, 0, result[0] - 1);
            return result;
        };
        var pageLinks = buildRange()
            .map(function (i) { return i === _this.value
            ? h("span", { class: "current-page" }, "" + (i + 1))
            : h("a", {
                attrs: { href: "#", title: localize("pageListItemTitle").replace("%page%", "" + (i + 1)) },
                on: {
                    click: function (e) {
                        e.preventDefault();
                        _this.$emit("input", i);
                    }
                }
            }, "" + (i + 1)); });
        var links = [
            { title: "firstPage", text: "≪", selector: function () { return 0; } },
            { title: "previousPage", text: "<", selector: function () { return _this.value > 0 ? _this.value - 1 : 0; } },
            { title: "nextPage", text: ">", selector: function () { return _this.value < _this.pageCount - 1 ? _this.value + 1 : _this.pageCount - 1; } },
            { title: "lastPage", text: "≫", selector: function () { return _this.pageCount - 1; } },
        ];
        var linkNodes = links.map(function (i) { return h("a", {
            attrs: { href: "#", title: localize(i.title), disabled: i.selector() === _this.value ? "disabled" : null },
            on: {
                click: function (e) {
                    e.preventDefault();
                    _this.$emit("input", i.selector());
                }
            }
        }, i.text); });
        linkNodes.splice.apply(linkNodes, [2, 0].concat(pageLinks));
        return h("div", { class: "dg-page-list" }, linkNodes);
    },
    components: {
        NumericInput: NumericInput
    }
}));

// CONCATENATED MODULE: ./src/components/Checkbox.ts

/* harmony default export */ var Checkbox = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "Checkbox",
    props: {
        value: { type: Boolean, default: false },
        label: { type: String },
    },
    render: function (h) {
        var _this = this;
        return h("label", {}, [
            h("input", {
                attrs: {
                    type: "checkbox",
                },
                domProps: {
                    checked: !!this.value
                },
                on: {
                    input: function (e) { return _this.$emit("input", e.target.checked); }
                }
            }),
            this.label
        ]);
    },
}));

// CONCATENATED MODULE: ./src/components/BoolFilter.ts





/* harmony default export */ var BoolFilter = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "BoolFilter",
    props: {
        value: { type: Array, default: function () { return []; } },
        fieldName: { type: String },
    },
    render: function (h) {
        var _this = this;
        var filters = this.value && this.value.length ? this.value[0].filters : [];
        var trueFilter = !!filters.find(function (i) { return i.value; });
        var falseFilter = !!filters.find(function (i) { return !i.value; });
        var emitValue = function (withTrue, withFalse) {
            var newFilters = chain([
                { emit: withTrue, value: true },
                { emit: withFalse, value: false }
            ])
                .where(function (i) { return i.emit; })
                .select(function (i) { return ({
                value: i.value,
                operator: FilterOperator.Equals,
                field: _this.fieldName
            }); })
                .toList();
            var group = {
                filters: newFilters
            };
            _this.$emit("input", [group]);
        };
        return h("div", {}, [
            h("Checkbox", {
                props: {
                    label: localize("yes"),
                    value: trueFilter
                },
                on: {
                    input: function (e) { return emitValue(e, falseFilter); }
                }
            }),
            h("Checkbox", {
                props: {
                    label: localize("no"),
                    value: falseFilter
                },
                on: {
                    input: function (e) { return emitValue(trueFilter, e); }
                }
            })
        ]);
    },
    components: {
        Checkbox: Checkbox
    }
}));

// EXTERNAL MODULE: ./src/components/CalendarDisplay.less
var CalendarDisplay = __webpack_require__("7ddf");

// CONCATENATED MODULE: ./src/components/CalendarDisplay.ts





var Mode;
(function (Mode) {
    Mode["Year"] = "year";
    Mode["Month"] = "month";
    Mode["Day"] = "day";
})(Mode || (Mode = {}));
/* harmony default export */ var components_CalendarDisplay = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "CalendarDisplay",
    props: {
        value: { type: Date, default: null },
    },
    data: function () {
        return {
            mode: Mode.Day,
            editValue: null
        };
    },
    methods: {
        switchMode: function (mode, value) {
            this.editValue = value;
            this.mode = mode;
        }
    },
    render: function (h) {
        var _this = this;
        var date = (function () {
            if (_this.editValue)
                return _this.editValue;
            return _this.value ? _this.value : today();
        })();
        var settings = getCalendar();
        var year = date.getFullYear();
        var month = date.getMonth();
        var selectedTime = this.value
            ? new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate()).getTime()
            : 0;
        var renderDays = function () {
            var layout = range(0, 7).select(function (i) { return (settings.weekStart + i) % 7; }).toList();
            var monthStart = new Date(year, month, 1);
            var monthEnd = new Date(year, month + 1, 0);
            var startDay = monthStart.getDay(); //0 = Sunday, 1 = Monday... 6 = Saturday
            var fromPrev = layout.indexOf(startDay);
            var fromNext = 6 - layout.indexOf(monthEnd.getDay());
            var dayCount = monthEnd.getDate();
            var cells = range(-fromPrev, dayCount + fromPrev + fromNext).select(function (i) {
                var current = new Date(year, month, 1 + i);
                var isSelected = selectedTime === current.getTime();
                if (_this.value) {
                    current.setHours(_this.value.getHours());
                    current.setMinutes(_this.value.getMinutes());
                    current.setSeconds(_this.value.getSeconds());
                }
                var cssClass = (function () {
                    if (i < 0)
                        return "dg-prev";
                    return i >= dayCount ? "dg-next" : null;
                })();
                return h("li", {
                    class: [cssClass, isSelected ? "dg-date-selected" : null],
                    on: {
                        click: function (e) {
                            e.stopPropagation();
                            _this.$emit("input", current);
                        }
                    }
                }, "" + current.getDate());
            });
            return h("ul", { class: ["dg-days"] }, cells.toList());
        };
        var buildHeader = function (definition) {
            var renderLinkOrNull = function (text, css, onClick) { return onClick != null
                ? h("a", {
                    class: css,
                    attrs: {
                        href: "#"
                    },
                    on: {
                        click: function (e) {
                            e.preventDefault();
                            onClick();
                        }
                    }
                }, text)
                : null; };
            var linksPrev = h("div", { class: ["dg-links-prev", "dg-links"] }, [
                renderLinkOrNull("《", "dg-first", definition.onFirst),
                renderLinkOrNull("〈", "dg-prev", definition.onPrev),
            ]);
            var linksNext = h("div", { class: ["dg-links-next", "dg-links"] }, [
                renderLinkOrNull("〉", "dg-next", definition.onNext),
                renderLinkOrNull("》", "dg-last", definition.onLast),
            ]);
            var title = h("div", { class: "dg-title" }, definition.items.map(function (i) { return renderLinkOrNull(i.title, null, i.action); }));
            return h("div", { class: "dg-calendar-head" }, [linksPrev, title, linksNext]);
        };
        var daysHeader = function () {
            var head = [
                { title: settings.monthFormat.replace("{month}", settings.monthNamesFull[month]), action: function () { return _this.mode = Mode.Month; } },
                { title: settings.yearFormat.replace("{year}", "" + year), action: function () { return _this.mode = Mode.Year; } },
            ];
            if (!settings.monthFirst)
                head.reverse();
            return buildHeader({
                items: head,
                onFirst: function () { return _this.editValue = new Date(year - 1, month, 1); },
                onPrev: function () { return _this.editValue = new Date(year, month - 1, 1); },
                onLast: function () { return _this.editValue = new Date(year + 1, month, 1); },
                onNext: function () { return _this.editValue = new Date(year, month + 1, 1); },
            });
        };
        var monthsHeader = function () { return buildHeader({
            items: [
                { title: settings.yearFormat.replace("{year}", "" + year), action: function () { return _this.mode = Mode.Year; } },
            ],
            onFirst: function () { return _this.editValue = new Date(year - 1, month, 1); },
            onLast: function () { return _this.editValue = new Date(year + 1, month, 1); },
        }); };
        var yearsHeader = function () {
            var from = year - year % 10;
            var to = from + 9;
            return buildHeader({
                items: [
                    { title: settings.yearRangeFormat.replace("{from}", "" + from).replace("{to}", "" + to), action: function () { } },
                ],
                onFirst: function () { return _this.editValue = new Date(year - 10, month, 1); },
                onLast: function () { return _this.editValue = new Date(year + 10, month, 1); },
            });
        };
        var renderMonths = function () {
            var cells = range(0, 12).select(function (i) { return h("li", {
                on: {
                    click: function () { return _this.switchMode(Mode.Day, new Date(year, i, 1)); }
                }
            }, settings.monthNamesShort[i]); });
            return h("ul", { class: ["dg-months"] }, cells.toList());
        };
        var renderYears = function () {
            var start = year - year % 10;
            var cells = range(start, 10).select(function (i) { return h("li", {
                on: {
                    click: function () { return _this.switchMode(Mode.Month, new Date(i, month, 1)); }
                }
            }, "" + i); });
            return h("ul", { class: ["dg-years"] }, cells.toList());
        };
        var daysSubHeader = function () {
            var cells = range(0, 7)
                .select(function (i) { return (settings.weekStart + i) % 7; })
                .select(function (i) { return h("li", settings.dayNames[i]); });
            return h("ul", { class: "dg-sub-header" }, cells.toList());
        };
        var modes = {};
        modes[Mode.Day] = { body: renderDays, header: daysHeader, subHeader: daysSubHeader };
        modes[Mode.Month] = { body: renderMonths, header: monthsHeader, subHeader: function () { return null; } };
        modes[Mode.Year] = { body: renderYears, header: yearsHeader, subHeader: function () { return null; } };
        return h("div", {
            class: ["dg-calendar", "dg-type-" + this.mode],
            on: {
                click: function (e) { return e.stopPropagation(); }
            }
        }, [
            modes[this.mode].header(),
            modes[this.mode].subHeader(),
            h("div", { class: ["dg-calendar-display"] }, [
                modes[this.mode].body()
            ])
        ]);
    },
    components: {},
}));

// EXTERNAL MODULE: ./src/components/ScrollPanel.less
var ScrollPanel = __webpack_require__("1247");

// CONCATENATED MODULE: ./src/components/ScrollPanel.ts


function findRoot(item) {
    while (true) {
        if (item.classList.contains("dg-scroll-panel"))
            return item;
        item = item.parentElement;
    }
}
/* harmony default export */ var components_ScrollPanel = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "ScrollPanel",
    data: function () {
        return {
            vOffset: this.value,
        };
    },
    props: {
        value: { type: Number, default: 0 }
    },
    mounted: function () {
        this.vOffset = this.value;
    },
    watch: {
        value: function () {
            this.vOffset = this.value;
        }
    },
    render: function (h) {
        var _this = this;
        return h("div", {
            class: "dg-scroll-panel",
            on: {
                wheel: function (e) {
                    e.preventDefault();
                    _this.vOffset += Math.round(e.deltaY > 10 ? e.deltaY / 10 : e.deltaY);
                    _this.$emit("input", _this.vOffset);
                },
            },
            directives: [{
                    name: "ContentMargin",
                    value: {
                        value: this.vOffset,
                        valueAdjust: function (v) {
                            _this.vOffset = v;
                            _this.$emit("input", v);
                        }
                    }
                }, {
                    name: "BarMargin",
                    value: this.vOffset
                }
            ]
        }, [
            h("div", {
                class: "dg-scroll-content",
            }, this.$slots.default),
            h("div", { class: "dg-scroll-track" }, [
                h("div", {
                    on: {
                        mousedown: function (e) {
                            if (e.button !== 0)
                                return;
                            e.preventDefault();
                            var root = findRoot(e.target);
                            var content = root.querySelector(".dg-scroll-content");
                            var bar = root.querySelector(".dg-scroll-track div");
                            var containerHeight = root.clientHeight;
                            var maxContentOffset = content.clientHeight - containerHeight;
                            var startPos = e.pageY;
                            var startOffset = _this.vOffset;
                            var maxBarOffset = containerHeight - bar.clientHeight;
                            var moveHandler = function (ev) {
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                var delta = ev.pageY - startPos;
                                var percent = delta / maxBarOffset;
                                _this.vOffset = startOffset + Math.round(percent * maxContentOffset);
                                _this.$emit("input", _this.vOffset);
                            };
                            var endHandler;
                            endHandler = function (ev) {
                                if (ev.button !== 0)
                                    return;
                                e.preventDefault();
                                document.body.removeEventListener("mousemove", moveHandler);
                                document.body.removeEventListener("mouseup", endHandler);
                            };
                            document.body.addEventListener("mousemove", moveHandler);
                            document.body.addEventListener("mouseup", endHandler);
                        }
                    }
                })
            ])
        ]);
    },
    directives: {
        BarMargin: function (el, binding) {
            var contentOffset = binding.value;
            var content = el.querySelector(".dg-scroll-content");
            var bar = el.querySelector(".dg-scroll-track div");
            var containerHeight = el.clientHeight;
            var maxContentOffset = content.clientHeight - containerHeight;
            var percent = contentOffset / maxContentOffset;
            var maxBarOffset = containerHeight - bar.clientHeight;
            var offset = Math.round(maxBarOffset * percent);
            bar.style.marginTop = offset + "px";
        },
        ContentMargin: function (el, binding) {
            var value = binding.value;
            var containerHeight = el.clientHeight;
            var content = el.querySelector(".dg-scroll-content");
            var maxOffset = content.clientHeight - containerHeight;
            var offset = Math.max(Math.min(maxOffset, value.value), 0);
            if (offset !== value.value)
                value.valueAdjust(offset);
            content.style.marginTop = "-" + offset + "px";
        }
    }
}));

// EXTERNAL MODULE: ./src/components/TimeDisplay.less
var TimeDisplay = __webpack_require__("4911");

// CONCATENATED MODULE: ./src/components/TimeDisplay.ts







var parts = [
    { kind: TokenKind.Hour, getter: function (i) { return i.getHours(); }, count: 24, setter: function (d, v) { return d.setHours(v); } },
    { kind: TokenKind.Minute, getter: function (i) { return i.getMinutes(); }, count: 60, setter: function (d, v) { return d.setMinutes(v); } },
    { kind: TokenKind.Second, getter: function (i) { return i.getSeconds(); }, count: 60, setter: function (d, v) { return d.setSeconds(v); } },
];
/* harmony default export */ var components_TimeDisplay = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "TimeDisplay",
    props: {
        value: { type: Date },
        format: { type: String, default: getCalendar().timeFormat }
    },
    data: function () {
        return {
            offsets: [
                { kind: TokenKind.Hour, value: 0 },
                { kind: TokenKind.Minute, value: 0 },
                { kind: TokenKind.Second, value: 0 },
            ]
        };
    },
    mounted: function () {
        this.snapItems();
    },
    watch: {
        value: function () {
            this.snapItems();
        }
    },
    methods: {
        snapItems: function () {
            var value = this.value ? this.value : today();
            var item = this.$el.querySelector("li");
            var itemSize = item.clientHeight;
            this.offsets = parts.map(function (i) { return ({
                kind: i.kind,
                value: itemSize * i.getter(value)
            }); });
        }
    },
    render: function (h) {
        var _this = this;
        var layout = findLayout(this.format)
            .map(function (i) { return parts.find(function (j) { return j.kind === i; }); })
            .filter(function (i) { return i !== undefined; });
        var getCurrent = function () { return _this.value ? _this.value : today(); };
        var raw = getCurrent();
        var renderValue = function (part) {
            var value = part.getter(raw);
            var entry = _this.offsets.find(function (i) { return i.kind === part.kind; });
            if (!entry)
                throw { message: "No offset entry for token type: " + part.kind };
            return h("scroll-panel", {
                props: {
                    value: entry.value
                },
                on: {
                    input: function (offset) {
                        entry.value = offset;
                        var item = _this.$el.querySelector("li");
                        var itemSize = item.clientHeight;
                        var current = getCurrent();
                        var actual = part.getter(current);
                        var candidate = offset / itemSize;
                        var newValue = candidate >= actual
                            ? Math.min(actual + 1, Math.ceil(candidate))
                            : Math.max(actual - 1, Math.floor(candidate));
                        var clamped = Math.max(0, Math.min(newValue, part.count - 1));
                        if (part.getter(current) === clamped)
                            return;
                        var result = new Date(current);
                        part.setter(result, clamped);
                        _this.$emit("input", result);
                    }
                }
            }, [
                h("ul", {}, range(0, part.count).select(function (i) { return h("li", {
                    class: value === i ? "dg-part-selected" : null,
                    on: {
                        click: function () {
                            if (value === i) {
                                _this.$emit("accept");
                                return;
                            }
                            var result = new Date(getCurrent());
                            part.setter(result, i);
                            _this.$emit("input", result);
                        }
                    }
                }, leftPad("" + i, 2, "0")); }).toList())
            ]);
        };
        return h("div", {
            class: ["dg-time-display", "dg-time-" + layout.length],
            on: {
                click: function (e) { return e.stopPropagation(); }
            }
        }, layout.map(function (i) { return renderValue(i); }).concat([
            h("div", { class: "dg-select-indicator" })
        ]));
    },
    components: {
        ScrollPanel: components_ScrollPanel
    }
}));

// CONCATENATED MODULE: ./src/components/DatePicker.ts




function replacePart(text, index, value) {
    if (index < 0 || index > text.length - value.length)
        throw { message: "Index out of range" };
    if (index === 0)
        return value + text.substr(value.length);
    if (index === text.length - value.length)
        return text.substr(0, text.length - value.length) + value;
    return text.substr(0, index) + value + text.substr(index + value.length);
}
/* harmony default export */ var DatePicker = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "DatePicker",
    props: {
        value: { default: null },
        format: { type: String },
        placeholder: { type: String }
    },
    data: function () {
        return {
            editValue: "",
            editIndex: null,
            popupValue: this.value ? this.value : today(),
            clickListener: null,
            popupVisible: false,
        };
    },
    mounted: function () {
        var _this = this;
        this.editValue = this.value ? formatDate(this.value, this.format) : "";
        this.clickListener = function (e) {
            if (e instanceof CustomEvent && e.detail && e.detail.sender === _this)
                return;
            _this.popupVisible = false;
            e.stopPropagation();
        };
    },
    components: {
        CalendarDisplay: components_CalendarDisplay,
        TimeDisplay: components_TimeDisplay
    },
    watch: {
        popupVisible: function () {
            if (this.popupVisible) {
                var ev = new CustomEvent("dg-date-picker-close", { detail: { sender: this } });
                document.dispatchEvent(ev);
                document.addEventListener("click", this.clickListener);
                document.addEventListener("dg-date-picker-close", this.clickListener);
            }
            else {
                document.removeEventListener("click", this.clickListener);
                document.removeEventListener("dg-date-picker-close", this.clickListener);
            }
        }
    },
    render: function (h) {
        var _this = this;
        var textInput = h("input", {
            attrs: {
                type: "text",
                placeholder: this.placeholder
            },
            domProps: {
                value: this.editValue,
                selectionStart: this.editIndex,
                selectionEnd: this.editIndex
            },
            on: {
                dgFocus: function (e) {
                    e.preventDefault();
                    var input = e.target;
                    input.focus();
                    _this.popupVisible = false;
                },
                keydown: function (e) {
                    var input = e.target;
                    if (e.key === "Tab")
                        return true;
                    if (e.key === "c" && e.ctrlKey)
                        return true;
                    if (e.key === "a" && e.ctrlKey)
                        return true;
                    if ((e.key === "v" || e.key === "x") && e.ctrlKey) {
                        _this.$nextTick(function () {
                            var index = _this.editIndex;
                            _this.editValue = tryParse(input.value, _this.format) ? input.value : "";
                            _this.editIndex = Math.min(index > 0 ? index : _this.editValue.length, _this.editValue.length);
                        });
                        return true;
                    }
                    if (!_this.popupVisible && e.key === "Escape") {
                        _this.editValue = "";
                        input.blur();
                        e.stopPropagation();
                        return;
                    }
                    if (e.key === "Enter" || e.key === "Escape") {
                        _this.popupVisible = false;
                        var result = tryParse(_this.editValue, _this.format);
                        _this.$emit("input", result);
                        e.stopPropagation();
                        return;
                    }
                    if (/^F\d+$/gm.test(e.key))
                        return true;
                    (function () {
                        var index = _this.editIndex ? _this.editIndex : 0;
                        var target = _this.editValue
                            ? _this.editValue
                            : _this.placeholder;
                        var specialIndex = (function () {
                            if (e.key === "ArrowRight" && e.ctrlKey)
                                return nextBounadry(index, _this.format);
                            if (e.key === "ArrowLeft" && e.ctrlKey)
                                return previousBoundary(index, _this.format);
                            if (e.key === "ArrowLeft")
                                return Math.max(0, index - 1);
                            if (e.key === "ArrowRight")
                                return Math.min(index + 1, target.length);
                            if (e.key === "Home")
                                return 0;
                            if (e.key === "End")
                                return target.length;
                            return null;
                        })();
                        if (specialIndex !== null) {
                            _this.editIndex = Math.min(specialIndex, _this.editValue ? _this.editValue.length : 0);
                            return;
                        }
                        if (e.key === "Backspace" && e.ctrlKey) {
                            if (index > 0) {
                                var to = index;
                                var from = previousBoundary(to, _this.format);
                                _this.editValue = replacePart(target, from, _this.placeholder.substr(from, to - from));
                                _this.editIndex = from;
                            }
                            return;
                        }
                        if (e.key === "Delete" && e.ctrlKey) {
                            if (index < target.length) {
                                var from = index;
                                var to = nextBounadry(from, _this.format);
                                _this.editValue = replacePart(target, from, _this.placeholder.substr(from, to - from));
                                _this.editIndex = from;
                            }
                            return;
                        }
                        if (e.key === "Delete") {
                            if (index >= 0) {
                                _this.editValue = replacePart(target, index, _this.placeholder[index]);
                                _this.editIndex++;
                            }
                            return;
                        }
                        if (e.key === "Backspace") {
                            if (index > 0) {
                                _this.editValue = replacePart(target, index - 1, _this.placeholder[index - 1]);
                                _this.editIndex = index - 1;
                            }
                            return;
                        }
                        if (e.key.length > 1)
                            return;
                        var canBePlaced = DateFormat_isMatching(e.key, index, _this.format);
                        var isNumber = e.key >= "0" && e.key <= "9";
                        if (!canBePlaced && !isNumber)
                            return;
                        var newIndex = canBePlaced
                            ? index
                            : nearestInputIndex(canBePlaced ? index : index + 1, _this.format);
                        var nextIndex = nearestInputIndex(newIndex + 1, _this.format);
                        if (newIndex >= target.length)
                            return;
                        _this.editValue = replacePart(target, newIndex, e.key);
                        _this.editIndex = nextIndex;
                        var candidate = tryParse(_this.editValue, _this.format);
                        if (candidate)
                            _this.popupValue = candidate;
                    })();
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                },
                focus: function (e) {
                    var input = e.target;
                    _this.$nextTick(function () { return _this.editIndex = input.selectionStart ? input.selectionStart : 0; });
                    _this.popupVisible = true;
                },
                click: function (e) {
                    var input = e.target;
                    _this.$nextTick(function () { return _this.editIndex = input.selectionStart ? input.selectionStart : 0; });
                    _this.popupVisible = true;
                    e.stopPropagation();
                    e.preventDefault();
                },
                blur: function (e) {
                    var result = tryParse(_this.editValue, _this.format);
                    _this.$emit("input", result);
                    _this.editValue = result ? formatDate(result, _this.format) : "";
                }
            }
        });
        return h("div", {
            class: "dg-date-input",
            on: {
                click: function (e) {
                    var input = e.target;
                    _this.$nextTick(function () { return _this.editIndex = input.selectionStart ? input.selectionStart : 0; });
                    _this.popupVisible = true;
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        }, [
            textInput,
            this.popupVisible
                ? (function () {
                    var tokenKind = positionKind(_this.editIndex, _this.format);
                    if (tokenKind === null)
                        return null;
                    var isTime = tokenKind === TokenKind.Hour || tokenKind === TokenKind.Minute || tokenKind === TokenKind.Second;
                    if (isTime)
                        return h("TimeDisplay", {
                            props: {
                                value: _this.popupValue,
                                format: _this.format
                            },
                            on: {
                                input: function (value) {
                                    _this.popupValue = value;
                                    _this.$emit("input", _this.popupValue);
                                    _this.editValue = formatDate(_this.popupValue, _this.format);
                                },
                                accept: function () { return _this.popupVisible = false; }
                            }
                        });
                    return h("CalendarDisplay", {
                        props: {
                            value: _this.popupValue
                        },
                        on: {
                            input: function (value) {
                                _this.popupValue = value;
                                _this.$emit("input", _this.popupValue);
                                _this.editValue = formatDate(_this.popupValue, _this.format);
                                var input = _this.$el.querySelector("input[type='text']");
                                input.focus();
                                _this.popupVisible = false;
                                _this.editIndex = _this.editValue.length;
                            }
                        }
                    });
                })()
                : null
        ]);
    }
}));

// CONCATENATED MODULE: ./src/components/FocusInput.ts
/* harmony default export */ var FocusInput = (function () {
    return {
        inserted: function (el) {
            var target = el.tagName.toLowerCase() === "input"
                ? el
                : el.querySelector("input");
            if (!target)
                return;
            var ev = new Event("dgFocus", { cancelable: true });
            if (target.dispatchEvent(ev) !== false)
                target.focus();
        }
    };
});

// CONCATENATED MODULE: ./src/components/DateFilter.ts






/* harmony default export */ var DateFilter = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "DateFilter",
    props: {
        value: { type: Array, default: function () { return []; } },
        fieldName: { type: String },
    },
    components: {
        DatePicker: DatePicker
    },
    directives: {
        focus: FocusInput()
    },
    render: function (h) {
        var _this = this;
        var filters = this.value && this.value.length ? this.value : [];
        var fromFilter = filters.find(function (i) { return i.tag === "date-from"; });
        var toFilter = filters.find(function (i) { return i.tag === "date-to"; });
        var emitValue = function (from, to) {
            var newFilters = chain([
                { emit: !!from, value: from, tag: "date-from", operator: FilterOperator.GraterThanOrEqual },
                { emit: !!to, value: to, tag: "date-to", operator: FilterOperator.LowerThanOrEqual }
            ])
                .where(function (i) { return i.emit; })
                .select(function (i) { return ({
                tag: i.tag,
                filters: [{
                        value: i.value,
                        operator: i.operator,
                        field: _this.fieldName
                    }]
            }); })
                .toList();
            _this.$emit("input", newFilters);
        };
        var calendar = getCalendar();
        return h("div", { class: "dg-date-filter" }, [
            h("div", [
                localize("rangeFrom"),
                h("DatePicker", {
                    props: {
                        value: fromFilter ? fromFilter.filters[0].value : null,
                        format: calendar.dateFormat,
                        placeholder: calendar.datePlaceholder
                    },
                    directives: [
                        { name: "focus" }
                    ],
                    on: {
                        input: function (value) {
                            emitValue(value, (function () {
                                var raw = toFilter ? toFilter.filters[0].value : null;
                                if (!raw)
                                    return null;
                                var result = new Date(raw);
                                result.setDate(raw.getDate() + 1);
                                return result;
                            })());
                        }
                    }
                })
            ]),
            h("div", [
                localize("rangeTo"),
                h("DatePicker", {
                    props: {
                        value: toFilter ? toFilter.filters[0].value : null,
                        format: calendar.dateFormat,
                        placeholder: calendar.datePlaceholder
                    },
                    on: {
                        input: function (value) {
                            emitValue(fromFilter ? fromFilter.filters[0].value : null, (function () {
                                if (!value)
                                    return null;
                                var result = new Date(value);
                                result.setDate(result.getDate() + 1);
                                result.setMilliseconds(-1);
                                return result;
                            })());
                        }
                    }
                })
            ])
        ]);
    },
}));

// CONCATENATED MODULE: ./src/components/DateTimeFilter.ts






/* harmony default export */ var DateTimeFilter = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "DateTimeFilter",
    props: {
        value: { type: Array, default: function () { return []; } },
        fieldName: { type: String },
    },
    components: {
        DatePicker: DatePicker
    },
    directives: {
        focus: FocusInput()
    },
    render: function (h) {
        var _this = this;
        var filters = this.value && this.value.length ? this.value : [];
        var fromFilter = filters.find(function (i) { return i.tag === "date-from"; });
        var toFilter = filters.find(function (i) { return i.tag === "date-to"; });
        var emitValue = function (from, to) {
            var newFilters = chain([
                { emit: !!from, value: from, tag: "date-from", operator: FilterOperator.GraterThanOrEqual },
                { emit: !!to, value: to, tag: "date-to", operator: FilterOperator.LowerThanOrEqual }
            ])
                .where(function (i) { return i.emit; })
                .select(function (i) { return ({
                tag: i.tag,
                filters: [{
                        value: i.value,
                        operator: i.operator,
                        field: _this.fieldName
                    }]
            }); })
                .toList();
            _this.$emit("input", newFilters);
        };
        var calendar = getCalendar();
        return h("div", { class: "dg-date-filter" }, [
            h("div", [
                localize("rangeFrom"),
                h("DatePicker", {
                    props: {
                        value: fromFilter ? fromFilter.filters[0].value : null,
                        format: calendar.dateTimeFormat,
                        placeholder: calendar.dateTimePlaceholder
                    },
                    directives: [
                        { name: "focus" }
                    ],
                    on: {
                        input: function (value) {
                            emitValue(value, toFilter ? toFilter.filters[0].value : null);
                        }
                    }
                })
            ]),
            h("div", [
                localize("rangeTo"),
                h("DatePicker", {
                    props: {
                        value: toFilter ? toFilter.filters[0].value : null,
                        format: calendar.dateTimeFormat,
                        placeholder: calendar.dateTimePlaceholder
                    },
                    on: {
                        input: function (value) {
                            emitValue(fromFilter ? fromFilter.filters[0].value : null, value);
                        }
                    }
                })
            ])
        ]);
    },
}));

// CONCATENATED MODULE: ./src/components/ValueListFilter.ts





function ValueListFilter_normalize(raw) {
    if (raw.length === 0)
        return [];
    if (typeof raw[0] === "string")
        return raw.map(function (i) { return ({ key: i, value: i }); });
    if (typeof raw[0] === "number")
        return raw.map(function (i) { return ({ key: "" + i, value: "" + i }); });
    return raw;
}
/* harmony default export */ var ValueListFilter = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "ValueListFilter",
    props: {
        value: { type: Array, default: function () { return []; } },
        fieldName: { type: String },
        options: { type: Array, default: function () { return []; } }
    },
    render: function (h) {
        var _this = this;
        var filters = this.value && this.value.length ? this.value[0].filters : [];
        var values = filters.length > 0 ? filters[0].value : [];
        var selected = {};
        values.forEach(function (i) { return selected[i] = true; });
        var nameLookup = {};
        var normalized = ValueListFilter_normalize(this.options);
        normalized.forEach(function (i) { return nameLookup[i.key] = i.value; });
        var emitValue = function (filterValues) {
            var filter = filterValues.length ? [{
                    filters: [{
                            field: _this.fieldName,
                            operator: FilterOperator.In,
                            value: filterValues
                        }]
                }] : [];
            _this.$emit("input", filter);
        };
        var renderTag = function (key) {
            return h("li", [
                nameLookup[key],
                h("a", {
                    class: "dg-remove-value",
                    attrs: { href: "#" },
                    on: {
                        click: function (e) {
                            e.preventDefault();
                            emitValue(chain(values).where(function (i) { return i !== key; }).toList());
                        }
                    }
                }, "x")
            ]);
        };
        var availableOptions = chain(normalized)
            .where(function (i) { return !selected[i.key]; })
            .toList();
        return h("div", { class: "dg-value-list" }, [
            h("ul", values.map(renderTag)),
            h("select", {
                on: {
                    change: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        var dropDown = e.target;
                        var newValues = values.slice(0);
                        newValues.push(availableOptions[dropDown.selectedIndex - 1].key);
                        emitValue(newValues);
                    }
                },
                domProps: {
                    selectedIndex: 0
                }
            }, [
                h("option", { class: "dg-select-placeholder" }, localize("dropdownLabel"))
            ].concat(availableOptions.map(function (i) { return h("option", [i.value]); })))
        ]);
    },
    components: {
        Checkbox: Checkbox
    }
}));

// CONCATENATED MODULE: ./src/components/NumericFilter.ts






/* harmony default export */ var NumericFilter = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "NumericFilter",
    props: {
        value: { type: Array, default: function () { return []; } },
        fieldName: { type: String },
        params: {},
    },
    components: {
        NumericInput: NumericInput
    },
    directives: {
        focus: FocusInput()
    },
    render: function (h) {
        var _this = this;
        var filters = this.value && this.value.length ? this.value : [];
        var fromFilter = filters.find(function (i) { return i.tag === "range-from"; });
        var toFilter = filters.find(function (i) { return i.tag === "range-to"; });
        var equalsFilter = filters.find(function (i) { return i.tag === "value-equals"; });
        var emitValue = function (from, to, equals) {
            var newFilters = chain([
                { emit: equals === null && !!from, value: from, tag: "range-from", operator: FilterOperator.GraterThanOrEqual },
                { emit: equals === null && !!to, value: to, tag: "range-to", operator: FilterOperator.LowerThanOrEqual },
                { emit: equals !== null, value: equals, tag: "value-equals", operator: FilterOperator.Equals },
            ])
                .where(function (i) { return i.emit; })
                .select(function (i) { return ({
                tag: i.tag,
                filters: [{
                        value: i.value,
                        operator: i.operator,
                        field: _this.fieldName
                    }]
            }); })
                .toList();
            _this.$emit("input", newFilters);
        };
        var settings = getSettings();
        return h("div", { class: "dg-numeric-filter" }, [
            h("div", [
                localize("valueEquals"),
                h("NumericInput", {
                    props: {
                        value: equalsFilter ? equalsFilter.filters[0].value : null,
                        float: this.params.decimal,
                        separator: settings.decimalSeparator
                    },
                    directives: [
                        { name: "focus" }
                    ],
                    on: {
                        input: function (value) {
                            emitValue(null, null, value);
                        }
                    }
                })
            ]),
            h("div", [
                localize("rangeFrom"),
                h("NumericInput", {
                    props: {
                        value: fromFilter ? fromFilter.filters[0].value : null,
                        float: this.params.decimal,
                        separator: settings.decimalSeparator
                    },
                    on: {
                        input: function (value) {
                            emitValue(value, toFilter ? toFilter.filters[0].value : null, null);
                        }
                    }
                })
            ]),
            h("div", [
                localize("rangeTo"),
                h("NumericInput", {
                    props: {
                        value: toFilter ? toFilter.filters[0].value : null,
                        float: this.params.decimal,
                        separator: settings.decimalSeparator
                    },
                    on: {
                        input: function (value) {
                            emitValue(fromFilter ? fromFilter.filters[0].value : null, value, null);
                        }
                    }
                })
            ])
        ]);
    },
}));

// CONCATENATED MODULE: ./src/components/TextFilter.ts




/* harmony default export */ var TextFilter = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "TextFilter",
    props: {
        value: { type: Array, default: function () { return []; } },
        fieldName: { type: String },
    },
    directives: {
        focus: FocusInput()
    },
    render: function (h) {
        var _this = this;
        var filter = this.value && this.value.length ? this.value[0].filters : null;
        var filterValue = filter ? filter[0].value : null;
        var emitValue = function (value) {
            var newValue = value
                ? [{
                        filters: [{ field: _this.fieldName, operator: FilterOperator.Contains, value: value }]
                    }]
                : [];
            _this.$emit("input", newValue);
        };
        return h("div", {}, [
            localize("containsValue"),
            h("input", {
                domProps: {
                    value: filterValue,
                },
                attrs: {
                    type: "text",
                },
                directives: [
                    { name: "focus" }
                ],
                on: {
                    input: function (e) { return emitValue(e.target.value); }
                }
            })
        ]);
    },
}));

// CONCATENATED MODULE: ./src/components/FilterPopup.ts








/* harmony default export */ var FilterPopup = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "FilterPopup",
    props: {
        value: { type: Array, default: function () { return []; } },
        fieldName: { type: String },
        filterComponent: { type: String },
        filterOptions: {},
        filterParams: {},
    },
    mounted: function () {
        var _this = this;
        this.clickListener = function () {
            _this.opened = false;
        };
        this.closeListener = function (e) {
            if (e instanceof CustomEvent && e.detail && e.detail.sender === _this)
                return;
            _this.opened = false;
            e.stopPropagation();
        };
        this.keyListener = function (e) {
            if (e.key === "Enter") {
                _this.opened = false;
                _this.$emit("input", _this.workingValue);
                e.stopPropagation();
            }
            if (e.key === "Escape") {
                _this.opened = false;
                e.stopPropagation();
            }
        };
        if (this.opened)
            this.bindEvents();
    },
    beforeDestroy: function () {
        this.unbindEvents();
    },
    data: function () {
        return {
            opened: false,
            workingValue: [],
        };
    },
    methods: {
        bindEvents: function () {
            document.addEventListener("click", this.clickListener);
            document.addEventListener("keydown", this.keyListener);
            document.addEventListener("dg-filter-popup-close", this.closeListener);
        },
        unbindEvents: function () {
            document.removeEventListener("click", this.clickListener);
            document.removeEventListener("keydown", this.keyListener);
            document.removeEventListener("dg-filter-popup-close", this.closeListener);
        }
    },
    watch: {
        opened: function () {
            if (this.opened)
                this.bindEvents();
            else
                this.unbindEvents();
            if (!this.opened)
                return;
            var ev = new CustomEvent("dg-filter-popup-close", { detail: { sender: this } });
            document.dispatchEvent(ev);
        }
    },
    render: function (h) {
        var _this = this;
        return h("div", {
            class: "dg-column-filter",
            attrs: {
                "data-opened": this.opened,
                "data-has-value": this.value && this.value.length > 0
            }
        }, [
            h("a", {
                class: "dg-popup-link",
                attrs: { href: "#" },
                on: {
                    click: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.workingValue = _this.value;
                        _this.opened = !_this.opened;
                    }
                }
            }, "▼"),
            this.opened ? h("div", {
                class: "dg-filter-popup",
                on: {
                    click: function (e) {
                        e.stopPropagation();
                        document.dispatchEvent(new Event("dg-date-picker-close"));
                    }
                },
                directives: [
                    { name: "adjustSide" }
                ]
            }, [
                h("div", { attrs: { "data-component": this.filterComponent } }, [
                    h("form", {
                        on: {
                            submit: function (e) {
                                e.preventDefault();
                                _this.$emit("input", _this.workingValue);
                                _this.opened = false;
                            }
                        }
                    }, [
                        h(this.filterComponent, {
                            props: {
                                value: this.workingValue,
                                options: this.filterOptions,
                                params: this.filterParams,
                                fieldName: this.fieldName
                            },
                            on: {
                                input: function (value) { return _this.workingValue = value; }
                            }
                        }),
                        h("input", {
                            domProps: { type: "submit" },
                            style: { display: "none" }
                        })
                    ])
                ]),
                h("div", { class: "dg-popup-actions" }, [
                    h("a", {
                        attrs: { href: "#" },
                        on: {
                            click: function (e) {
                                e.preventDefault();
                                _this.$emit("input", _this.workingValue);
                                _this.opened = false;
                            }
                        }
                    }, localize("filterAccept")),
                    h("a", {
                        attrs: { href: "#" },
                        on: {
                            click: function (e) {
                                e.preventDefault();
                                _this.$emit("input", []);
                                _this.opened = false;
                            }
                        }
                    }, localize("filterReset"))
                ])
            ]) : null
        ]);
    },
    directives: {
        adjustSide: {
            inserted: function (el) {
                var minOffset = el.clientWidth * 1.25;
                var box = el.getBoundingClientRect();
                el.classList.add(window.innerWidth - box.left > minOffset ? "dg-side-left" : "dg-side-right");
            }
        }
    },
    components: {
        BoolFilter: BoolFilter,
        DateFilter: DateFilter,
        NumericFilter: NumericFilter,
        DateTimeFilter: DateTimeFilter,
        TextFilter: TextFilter,
        ValueListFilter: ValueListFilter
    },
}));

// CONCATENATED MODULE: ./src/components/TriCheckbox.ts

/* harmony default export */ var TriCheckbox = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "TriCheckbox",
    props: {
        value: { type: Boolean, default: false },
    },
    render: function (h) {
        var _this = this;
        return h("input", {
            attrs: {
                type: "checkbox",
                checked: !!this.value,
            },
            domProps: {
                indeterminate: this.value === null,
                checked: !!this.value,
            },
            on: {
                input: function (e) { return _this.$emit("input", e.target.checked); },
                click: function (e) {
                    var target = e.target;
                    e.preventDefault();
                    e.stopPropagation();
                    var value = _this.value === null ? false : !_this.value;
                    target.checked = value;
                    _this.$emit("input", value);
                    return false;
                }
            }
        });
    },
}));

// CONCATENATED MODULE: ./src/Normalization.ts


//sorting data can be provided as sigle string representing column name
function normalizeSorting(candidate) {
    function normalizeField(field) {
        if (typeof field === "string")
            return { field: field, direction: SortDirection.Asc };
        return {
            field: field.field,
            direction: field.direction ? field.direction : SortDirection.Asc
        };
    }
    return Array.isArray(candidate)
        ? candidate.map(normalizeField)
        : [normalizeField(candidate)];
}
function withCheck(first, second, check) {
    if (first ? !second : second) //a xor b: one is null and other one is not
        return false;
    if (!first && !second)
        return true;
    if (first.length !== second.length)
        return false;
    return check();
}
function isSortingEqual(first, second) {
    return withCheck(first, second, function () { return range(0, first.length)
        .all(function (index) { return first[index].direction === second[index].direction && first[index].field === second[index].field; }); });
}
function areFilterValuesEqual(first, second) {
    return withCheck(first, second, function () { return chain(first)
        .zip(second, function (a, b) { return a.field === b.field && a.operator === b.operator && a.value === b.value; })
        .all(function (i) { return i; }); });
}
function areFilterGroupsEqual(first, second) {
    return withCheck(first, second, function () { return chain(first)
        .zip(second, function (a, b) { return areFilterValuesEqual(a.filters, b.filters); })
        .all(function (i) { return i; }); });
}
function areFiltersEqual(first, second) {
    return withCheck(first, second, function () {
        var firstLookup = {};
        first.forEach(function (i) { return firstLookup[i.field] = i.groups; });
        return chain(second).all(function (i) { return areFilterGroupsEqual(firstLookup[i.field], i.groups); });
    });
}

// CONCATENATED MODULE: ./src/components/FilterField.ts

var FilterField = "FilterField";

/* harmony default export */ var components_FilterField = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: FilterField,
    props: {
        field: { type: String },
        operator: { type: String, default: FilterOperator.Equals },
        value: { default: null }
    },
    methods: {
        getValue: function () {
            return {
                field: this.field,
                value: this.value,
                operator: this.operator
            };
        },
        notifyParent: function () {
            var handler = this.$parent.onValueSignaled;
            if (handler)
                handler();
        }
    },
    mounted: function () {
        this.notifyParent();
    },
    beforeDestroy: function () {
        this.notifyParent();
    },
    watch: {
        field: "notifyParent",
        value: "notifyParent",
    },
    render: function (h) {
        return h("div");
    }
}));

// CONCATENATED MODULE: ./src/components/FilterGroup.ts

var FilterGroup = "FilterGroup";


/* harmony default export */ var components_FilterGroup = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: FilterGroup,
    methods: {
        getValue: function () {
            return {
                filters: chain(this.$children)
                    .where(function (i) { return i.$options.name === FilterField; })
                    .cast()
                    .select(function (i) { return i.getValue(); })
                    .toList()
            };
        },
        onValueSignaled: function () {
            this.notifyParent();
        },
        notifyParent: function () {
            var handler = this.$parent.onValueSignaled;
            if (handler)
                handler();
        }
    },
    beforeDestroy: function () {
        this.notifyParent();
    },
    mounted: function () {
        this.notifyParent();
    },
    render: function (h) {
        return h("div", this.$slots.default);
    }
}));

// CONCATENATED MODULE: ./src/components/GroupField.ts

var GroupField = "GroupField";

/* harmony default export */ var components_GroupField = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: GroupField,
    props: {
        field: { type: String },
        order: { type: Number },
        direction: { type: String, default: SortDirection.Asc },
    },
    methods: {
        notifyParent: function () {
            var handler = this.$parent.onValueSignaled;
            if (handler)
                handler();
        }
    },
    mounted: function () {
        this.notifyParent();
    },
    beforeDestroy: function () {
        this.notifyParent();
    },
    watch: {
        field: "notifyParent",
        order: "notifyParent",
        direction: "notifyParent",
    },
    render: function (h) {
        return h("div");
    }
}));

// CONCATENATED MODULE: ./src/components/DataGrid.ts















function logError(message) {
    if (!external_commonjs_vue_commonjs2_vue_root_Vue_default.a.config.silent)
        console.error(message);
}
var SelectionMode;
(function (SelectionMode) {
    SelectionMode["None"] = "none";
    SelectionMode["Single"] = "single";
    SelectionMode["Multi"] = "multi";
})(SelectionMode || (SelectionMode = {}));
function buildSourceOrDefault(source, sourceType) {
    return DataSource(source, sourceType ? sourceType : getSettings().defaultRemoteSource);
}
/* harmony default export */ var components_DataGrid = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    name: "DataGrid",
    data: function () {
        var self = this;
        return cast({
            vPage: 0,
            vFetchId: 0,
            vDataSource: buildSourceOrDefault(self.source, self.type),
            vPageData: [],
            vSorting: self.sorting ? normalizeSorting(self.sorting) : [],
            vTotal: 0,
            vColumnFilters: self.columnFilters ? self.columnFilters : [],
            vSelectedIds: self.selectedIds ? self.selectedIds : [],
            vExpanded: {},
            vIsLoading: false,
            vReloadHandler: null,
            vUri: null,
            vPageUri: null
        });
    },
    mounted: function () {
        if (this.selectionMode === SelectionMode.None) {
            this.resetSelection();
        }
        if (!Array.isArray(this.vSorting) || this.vSorting.length === 0) {
            this.vSorting = this.findColumns()
                .filter(function (i) { return i.sortOrder !== null && i.sortOrder !== undefined && i.field; })
                .sort(function (a, b) { return a.sortOrder - b.sortOrder; })
                .map(function (i) { return ({
                field: i.field,
                direction: i.sortDir === "desc" ? SortDirection.Desc : SortDirection.Asc
            }); });
            this.$emit("update:sorting", this.vSorting);
        }
        this.switchPage(this.page, true, true);
        this.bindReload(this.reloadEvent);
    },
    beforeDestroy: function () {
        this.bindReload(null);
    },
    watch: {
        page: function () {
            this.switchPage(this.page);
        },
        reloadEvent: function () {
            this.bindReload(this.reloadEvent);
        },
        filters: function () {
            this.switchPage(this.page);
        },
        sourceArgs: function () {
            this.switchPage(0, true);
        },
        pageSize: function (newValue, oldValue) {
            var index = oldValue * this.vPage;
            this.switchPage(Math.floor(index / newValue), true);
        },
        source: function () {
            this.vDataSource = buildSourceOrDefault(this.source, this.type);
        },
        soureOptions: function () {
            this.vDataSource = buildSourceOrDefault(this.source, this.type);
        },
        selectionMode: function () {
            if (this.selectionMode === SelectionMode.None) {
                this.resetSelection();
            }
            if (this.selectionMode === SelectionMode.Single && this.vSelectedIds.length > 1) {
                this.vSelectedIds = [this.vSelectedIds[0]];
                this.$emit("update:selectedIds", this.vSelectedIds);
                this.$emit("update:selected", this.selected ? [this.selected[0]] : []);
            }
        },
        selectedIds: function () {
            if (!this.selectedIds) {
                this.vSelectedIds = [];
                return;
            }
            if (this.vSelectedIds.length !== this.selectedIds.length || !chain(this.vSelectedIds).zip(this.selectedIds, function (a, b) { return a === b; }).any(function (i) { return !i; }))
                this.vSelectedIds = this.selectedIds;
        },
        vDataSource: function () {
            this.switchPage(0, true);
        },
        vColumnFilters: function (newValue, oldValue) {
            if (!areFiltersEqual(newValue, oldValue))
                this.switchPage(0, true);
        },
        columnFilters: function () {
            this.vColumnFilters = this.columnFilters;
        },
        sorting: function () {
            var candidate = normalizeSorting(this.sorting);
            if (!isSortingEqual(this.vSorting, candidate))
                this.vSorting = candidate;
        },
        vSorting: function () {
            this.fetchSource();
        }
    },
    props: {
        page: { type: Number, default: 0 },
        pageSize: { type: Number, default: 10 },
        reloadEvent: { type: String, default: "grid:reload" },
        source: { default: null },
        type: { default: null },
        sourceArgs: { default: null },
        isLoading: { type: Boolean, default: false },
        idField: { type: String, default: function () { return getSettings().idField; } },
        sorting: { type: Array, default: function () { return []; } },
        selectedIds: { type: Array, default: function () { return []; } },
        selected: { type: Array, default: function () { return []; } },
        selectionMode: { type: String, default: SelectionMode.None },
        sortable: { type: Boolean, default: true },
        pageable: { type: Boolean, default: true },
        filterable: { type: Boolean, default: true },
        keepSelection: { type: Boolean, default: false },
        checkboxes: { type: Boolean, default: true },
        canReload: { type: Boolean, default: true },
        uri: { type: String, default: null },
        pageUri: { type: String, default: null },
        rowClass: { type: Function },
        filters: {},
        columnFilters: {},
        detailsTemplate: { default: null },
        fieldInfos: { type: Array, default: null },
        theme: { type: String, default: "dg-light" },
        groupTemplate: { default: null }
    },
    methods: cast({
        switchPage: function (page, forceReload, initialLoad) {
            if (this.vPage === page && !forceReload)
                return;
            if (!initialLoad && !this.keepSelection)
                this.resetSelection();
            this.vPage = page;
            this.$emit("update:page", page);
            this.fetchSource();
        },
        bindReload: function (name) {
            var _this = this;
            var context = this.$root;
            if (!context)
                return;
            if (this.vReloadHandler != null)
                context.$off(this.vReloadHandler.name, this.vReloadHandler.handler);
            if (!name)
                return;
            this.vReloadHandler = {
                name: name,
                handler: function () { return _this.switchPage(_this.vPage, true); }
            };
            context.$on(name, this.vReloadHandler.handler);
        },
        onValueSignaled: function () {
            //caled when data group filters have changed
            this.switchPage(0, true);
        },
        selectAll: function () {
            var _this = this;
            if (!this.keepSelection) {
                this.vSelectedIds = this.vPageData.map(function (i) { return i[_this.idField]; });
                this.$emit("update:selectedIds", this.vSelectedIds);
                this.$emit("update:selected", this.vPageData);
            }
            var selected = {};
            this.vSelectedIds.forEach(function (i) {
                selected["" + i] = true;
            });
            var toAdd = this.vPageData.filter(function (i) { return !selected[i[_this.idField]]; });
            this.vSelectedIds = this.vSelectedIds.slice().concat(toAdd.map(function (i) { return i[_this.idField]; }));
            this.$emit("update:selectedIds", this.vSelectedIds);
            this.$emit("update:selected", this.selected ? this.selected.slice().concat(toAdd) : toAdd);
        },
        findColumns: function () {
            var nodes = this.$slots.default;
            if (nodes === undefined)
                return [];
            return chain(nodes)
                .where(function (i) { return i.tag !== undefined && i.tag.endsWith(DataColumn); })
                .select(function (i) { return i.componentOptions && i.componentOptions.propsData ? i.componentOptions.propsData : null; })
                .where(function (i) { return i !== null; })
                .cast()
                .toList();
        },
        findGrouping: function () {
            var nodes = this.$slots.default;
            if (nodes === undefined)
                return [];
            return chain(nodes)
                .where(function (i) { return i.tag !== undefined && i.tag.endsWith(GroupField); })
                .select(function (i) { return i.componentOptions && i.componentOptions.propsData ? i.componentOptions.propsData : null; })
                .where(function (i) { return i !== null; })
                .cast()
                .orderBy(function (i) { return i.order; })
                .select(function (i) { return ({ field: i.field, direction: i.direction ? i.direction : SortDirection.Asc }); })
                .toList();
        },
        updateSelection: function (item) {
            var _this = this;
            var id = item[this.idField];
            if (id === undefined) {
                logError("Data item does not have " + this.idField + " property specified as id.");
                return;
            }
            if (this.vSelectedIds.findIndex(function (i) { return i === id; }) >= 0) {
                //deselect
                this.vSelectedIds = this.vSelectedIds.filter(function (i) { return i !== id; });
                this.$emit("update:selectedIds", this.vSelectedIds);
                this.$emit("update:selected", this.selected ? this.selected.filter(function (i) { return i[_this.idField] !== id; }) : []);
                return;
            }
            if (this.selectionMode === SelectionMode.Single) {
                this.vSelectedIds = [id];
                this.$emit("update:selectedIds", this.vSelectedIds);
                this.$emit("update:selected", [item]);
                return;
            }
            if (this.selectionMode === SelectionMode.Multi) {
                this.vSelectedIds = this.vSelectedIds.slice().concat([id]);
                this.$emit("update:selectedIds", this.vSelectedIds);
                this.$emit("update:selected", this.selected ? this.selected.slice().concat([item]) : [item]);
                return;
            }
            logError("Unknown selection mode selected: " + this.selectionMode + ".");
        },
        resetSelection: function () {
            this.vSelectedIds = [];
            this.$emit("update:selectedIds", []);
            this.$emit("update:selected", []);
        },
        fetchSource: function () {
            var _this = this;
            this.vFetchId++;
            var fetchId = this.vFetchId;
            this.$emit("update:isLoading", true);
            this.vIsLoading = true;
            this.$nextTick(function () {
                if (fetchId !== _this.vFetchId)
                    return;
                var externalFilters = function () {
                    if (!_this.filters)
                        return [];
                    function normalize(value) {
                        if ("filters" in value)
                            return value;
                        return {
                            filters: [value]
                        };
                    }
                    return Array.isArray(_this.filters)
                        ? _this.filters.map(normalize)
                        : [normalize(_this.filters)];
                };
                var dataGroups = chain(_this.$children)
                    .where(function (i) { return i.$options.name === FilterGroup; })
                    .cast()
                    .select(function (i) { return i.getValue(); })
                    .where(function (i) { return i.filters.length > 0; })
                    .toList();
                var dataFilters = chain(_this.$children)
                    .where(function (i) { return i.$options.name === FilterField; })
                    .cast()
                    .select(function (i) { return ({ filters: [i.getValue()] }); })
                    .toList();
                var infos = chain(Array.isArray(_this.fieldInfos) ? _this.fieldInfos : [])
                    .select(function (i) { return ({ field: i.field, dataType: i.dataType }); })
                    .where(function (i) { return !!i.field; })
                    .toList();
                var lookup = {};
                infos.forEach(function (i) { return lookup[i.field] = true; });
                _this.findColumns()
                    .filter(function (i) { return i.field && !lookup[i.field]; })
                    .forEach(function (i) { return infos.push({
                    dataType: i.type,
                    field: i.field
                }); });
                var request = {
                    sorting: (function () {
                        var grouping = _this.findGrouping();
                        var groupLookup = {};
                        grouping.forEach(function (i) { return groupLookup[i.field] = true; });
                        var sortLookup = {};
                        _this.vSorting.forEach(function (i) { return sortLookup[i.field] = i; });
                        var groupingPart = grouping.map(function (i) {
                            var existing = sortLookup[i.field];
                            return existing ? existing : i;
                        });
                        var sortingPart = _this.vSorting.filter(function (i) { return !groupLookup[i.field]; });
                        return groupingPart.concat(sortingPart);
                    })(),
                    page: _this.vPage,
                    pageSize: _this.pageSize,
                    filters: chain(_this.vColumnFilters)
                        .selectMany(function (i) { return i.groups; })
                        .concat(dataGroups)
                        .concat(dataFilters)
                        .concat(externalFilters())
                        .toList(),
                    fields: infos,
                    args: _this.sourceArgs
                };
                var source = _this.vDataSource.load(request);
                new DataPromise(source.resolver)
                    .always(function () {
                    if (fetchId !== _this.vFetchId)
                        return;
                    _this.$emit("update:isLoading", false);
                    _this.vExpanded = {};
                    _this.vIsLoading = false;
                })
                    .error(function (error) {
                    logError("Unable to load grid page. Data source error: " + error + ".");
                    _this.vPageData = [];
                    _this.$emit("update:uri", null);
                    _this.$emit("update:pageUri", null);
                    _this.vUri = null;
                    _this.vPageUri = null;
                    _this.vTotal = 0;
                })
                    .success(function (data, total, uri, pageUri) {
                    if (fetchId !== _this.vFetchId)
                        return;
                    _this.vExpanded = {};
                    _this.vPageData = data;
                    _this.vTotal = total;
                    _this.$emit("update:uri", uri);
                    _this.$emit("update:pageUri", pageUri);
                    _this.vUri = uri;
                    _this.vPageUri = pageUri;
                })
                    .fetch();
            });
        }
    }),
    render: function (h) {
        var _this = this;
        var hasDetails = !!this.detailsTemplate;
        var findColumns = function () { return _this.findColumns()
            .map(function (i) {
            function buildLookup() {
                if (!i.values)
                    return null;
                if (!Array.isArray(i.values))
                    return null;
                if (i.values.length === 0)
                    return null;
                if (typeof i.values[0] === "string" || typeof i.values[0] === "number")
                    return null;
                var lookup = {};
                i.values.forEach(function (j) { return lookup[j.key] = j.value; });
                return lookup;
            }
            return {
                definition: i,
                values: buildLookup()
            };
        }); };
        var sorting = {};
        this.vSorting.forEach(function (i) { return sorting[i.field] = i.direction ? i.direction : SortDirection.Asc; });
        var columnFilters = {};
        this.vColumnFilters.forEach(function (i) { return columnFilters[i.field] = i.groups; });
        function findFilter(dataType, value) {
            if (!value)
                return null;
            if (value === true) {
                var component = getFilterComponent(dataType);
                return component != null ? { filter: component.component, params: component.params, options: null } : null;
            }
            return { filter: value, options: null, params: null };
        }
        var hasCheckboxes = this.selectionMode === SelectionMode.Multi && this.checkboxes;
        var columns = findColumns();
        var headerCells = columns.map(function (data) {
            var column = data.definition;
            var headTpl = column.headTemplate ? _this.$scopedSlots[column.headTemplate] : null;
            var title = headTpl ? headTpl(column) : column.title ? column.title : column.field;
            var canSort = _this.sortable && (column.sortable || column.sortable === undefined) && column.field;
            var columnSorting = column.field ? sorting[column.field] : null;
            var filterValue = column.filter === undefined ? true : column.filter;
            var filterComponent = _this.filterable && filterValue
                ? (column.values ? { filter: "ValueListFilter", options: column.values, params: null } : findFilter(column.type, filterValue))
                : null;
            var content = [
                title,
                h("span", { class: "sort-direction" }, columnSorting ? (columnSorting === "asc" ? "↑" : "↓") : ""),
                filterComponent && column.field ? h("FilterPopup", {
                    props: {
                        value: columnFilters[column.field],
                        fieldName: column.field,
                        filterComponent: filterComponent ? filterComponent.filter : null,
                        filterParams: filterComponent ? filterComponent.params : null,
                        filterOptions: filterComponent ? filterComponent.options : null
                    },
                    on: {
                        input: function (value) {
                            var newFilters = chain(_this.vColumnFilters).where(function (i) { return i.field !== column.field; }).toList();
                            newFilters.push({
                                field: column.field,
                                groups: value
                            });
                            _this.$emit("update:columnFilters", newFilters);
                            _this.vColumnFilters = newFilters;
                        }
                    }
                }) : null
            ];
            if (column.icon)
                content.splice(0, 0, h("i", { class: column.icon, attrs: { "aria-hidden": true } }));
            return h("th", {
                class: canSort ? "can-sort" : null,
                on: {
                    click: function (e) {
                        if (!canSort || !column.field)
                            return;
                        e.preventDefault();
                        function cycleSorting(current) {
                            //asc -> desc -> null
                            if (current === SortDirection.Asc)
                                return SortDirection.Desc;
                            if (current === SortDirection.Desc)
                                return null;
                            return SortDirection.Asc;
                        }
                        var entry = _this.vSorting.find(function (i) { return i.field === column.field; });
                        var newDirection = cycleSorting(entry ? entry.direction : undefined);
                        _this.vSorting = newDirection
                            ? [{ field: column.field, direction: newDirection }]
                            : [];
                        _this.$emit("update:sorting", _this.vSorting);
                    }
                }
            }, content);
        });
        var selected = {};
        this.vSelectedIds.forEach(function (i) {
            selected["" + i] = true;
        });
        if (hasDetails)
            headerCells.splice(0, 0, h("th", { class: "dg-details" }));
        if (hasCheckboxes)
            headerCells.splice(0, 0, h("th", { class: "dg-selector" }, [
                h("TriCheckbox", {
                    props: {
                        value: this.vSelectedIds.length === 0
                            ? false
                            : (this.keepSelection ? this.vTotal : this.vPageData.length) === this.vSelectedIds.length && chain(this.vPageData).all(function (i) { return selected[i[_this.idField]]; })
                                ? true
                                : null
                    },
                    on: {
                        input: function (value) {
                            if (value)
                                _this.selectAll();
                            else
                                _this.resetSelection();
                        }
                    }
                })
            ]));
        var renderCell = function (data, binding) {
            var column = binding.definition;
            var buildContent = function () {
                if (column.render) {
                    return column.render(column.field ? data[column.field] : null, data, h);
                }
                if (!column.template) {
                    if (!column.field) {
                        logError("Data column has no field and no template defined. It will be always empty.");
                        return "";
                    }
                    var rawValue = data[column.field];
                    if (binding.values) {
                        var match = binding.values["" + rawValue];
                        return match !== undefined ? match : "" + rawValue;
                    }
                    return getFormatter(column.type)(rawValue, column.formatOptions !== undefined ? column.formatOptions : null, h);
                }
                var buildFromScope = function (scopeName) {
                    var tpl = _this.$scopedSlots[scopeName];
                    if (!tpl) {
                        logError("Unable to find scoped slot named '" + scopeName + "' defined as template for grid data column.");
                        return "";
                    }
                    return tpl({ row: data, value: column.field ? data[column.field] : null });
                };
                if (typeof column.template === "string")
                    return buildFromScope(column.template);
                var result = column.template(column.field ? data[column.field] : null, data, h);
                if (typeof result === "string")
                    return buildFromScope(result);
                return result;
            };
            return h("td", [buildContent()]);
        };
        var renderRow = function (data) {
            var cells = columns.map(function (i) { return renderCell(data, i); });
            if (hasDetails)
                cells.splice(0, 0, h("td", { class: "dg-details" }, [
                    h("a", {
                        attrs: {
                            href: "#",
                            class: _this.vExpanded[data[_this.idField]] ? "dg-expanded" : null
                        },
                        on: {
                            click: function (e) {
                                e.preventDefault();
                                _this.vExpanded[data[_this.idField]] = !_this.vExpanded[data[_this.idField]];
                                _this.$forceUpdate();
                            }
                        }
                    }, '▲')
                ]));
            if (hasCheckboxes)
                cells.splice(0, 0, h("td", { class: "dg-selector" }, [
                    h("TriCheckbox", {
                        props: { value: !!selected[data[_this.idField]] },
                        on: {
                            input: function () { return _this.updateSelection(data); }
                        }
                    })
                ]));
            var classes = ["dg-data-row", selected[data[_this.idField]] ? "dg-selected" : null];
            if (_this.rowClass) {
                var additional = _this.rowClass(data);
                if (Array.isArray(additional))
                    classes.push.apply(classes, additional);
                if (typeof additional === "string")
                    classes.push(additional);
            }
            var rows = [h("tr", {
                    class: classes.length > 0 ? classes : undefined,
                    on: {
                        click: function (e) {
                            if (_this.selectionMode === SelectionMode.None)
                                return;
                            e.preventDefault();
                            e.stopPropagation();
                            _this.updateSelection(data);
                        }
                    }
                }, cells)];
            if (_this.vExpanded[data[_this.idField]]) {
                var buildScoped_1 = function (scopeName) {
                    var scope = _this.$scopedSlots[scopeName];
                    if (!scope) {
                        logError("Unable to find scoped slot named '" + _this.detailsTemplate + "' for details row.");
                        return null;
                    }
                    return scope({ item: data });
                };
                var buildDetails = function () {
                    if (typeof _this.detailsTemplate !== "string") {
                        var detailsResult = _this.detailsTemplate(data, h);
                        return typeof detailsResult === "string"
                            ? buildScoped_1(detailsResult)
                            : detailsResult;
                    }
                    return buildScoped_1(_this.detailsTemplate);
                };
                rows.push(h("tr", {
                    class: "dg-details-row"
                }, [h("td", { attrs: { colspan: cells.length } }, [buildDetails()])]));
            }
            return rows;
        };
        var renderGroupRow = function (keyValues, grouping) {
            var dataItem = {};
            for (var a = 0; a < grouping.length; a++)
                dataItem[grouping[a]] = keyValues[a];
            var buildContent = function () {
                if (!_this.groupTemplate)
                    return keyValues.join(", ");
                if (typeof _this.groupTemplate === "string") {
                    var tpl = _this.$scopedSlots[_this.groupTemplate];
                    if (!tpl) {
                        logError("Unable to find scoped slot named '" + _this.groupTemplate + "' defined as template for grid data group.");
                        return keyValues.join(", ");
                    }
                    return tpl({ group: dataItem });
                }
                return _this.groupTemplate(dataItem, h);
            };
            return h("tr", {
                class: "dg-grouping-row"
            }, [h("td", { attrs: { colspan: columns.length } }, [buildContent()])]);
        };
        var cols = columns.map(function (i) { return h("col", { style: { width: i.definition.width ? i.definition.width : undefined } }); });
        if (hasDetails)
            cols.unshift(h("col", { style: { width: "5px" } }));
        var thead = h("thead", { class: "dg-head" }, [h("tr", {}, headerCells)]);
        var dataRows = (function () {
            var grouping = _this.findGrouping();
            var pageData = chain(_this.vPageData);
            return grouping.length === 0
                ? pageData.selectMany(renderRow).toList()
                : pageData
                    .groupSorted(function (item) { return grouping.map(function (i) { return item[i.field]; }); })
                    .selectMany(function (i) { return [renderGroupRow(i.key, grouping.map(function (j) { return j.field; }))].concat(i.values.map(renderRow).flat()); })
                    .toList();
        })();
        var tbody = h("tbody", { class: "dg-body" }, dataRows);
        var dataTable = h("table", { class: "dg-table" }, [h("colgroup", {}, cols), thead, tbody]);
        var slot = h("div", { class: "dg-hidden" }, this.$slots.default ? this.$slots.default : []);
        var pager = h("pager", {
            props: {
                value: this.vPage,
                pageSize: this.pageSize,
                total: this.vTotal
            },
            on: {
                input: function (page) {
                    _this.switchPage(page);
                    _this.$emit("update:page", page);
                }
            }
        });
        var pageList = h("page-list", {
            props: {
                value: this.vPage,
                pageSize: this.pageSize,
                total: this.vTotal
            },
            on: {
                input: function (page) {
                    _this.switchPage(page);
                    _this.$emit("update:page", page);
                }
            }
        });
        var reloadLink = h("a", {
            class: "dg-reload",
            attrs: { href: "#" },
            on: {
                click: function (e) {
                    e.preventDefault();
                    _this.switchPage(_this.vPage, true);
                }
            }
        }, [h("i", { class: "icon-arrows-cw" })]);
        return h("div", {
            class: ["dg-grid", this.theme, this.vIsLoading ? "dg-loading" : null]
        }, [
            slot,
            dataTable,
            this.pageable ? h("div", { class: "dg-footer" }, [this.canReload ? reloadLink : null, pageList, pager]) : null,
            this.vIsLoading ? h("div", { class: "dg-loader" }) : null,
        ]);
    },
    components: {
        Pager: Pager,
        PageList: PageList,
        FilterPopup: FilterPopup,
        TriCheckbox: TriCheckbox
    }
}));

// CONCATENATED MODULE: ./src/OData.ts


function OData_findFilter(operator) {
    if (operator === FilterOperator.Equals)
        return "eq";
    if (operator === FilterOperator.GraterThanOrEqual)
        return "ge";
    if (operator === FilterOperator.GreaterThan)
        return "gt";
    if (operator === FilterOperator.LowerThan)
        return "lt";
    if (operator === FilterOperator.LowerThanOrEqual)
        return "le";
    throw { message: "Unknown odata filter type: " + operator };
}
function mapDirection(direction) {
    if (direction === SortDirection.Asc)
        return "asc";
    if (direction === SortDirection.Desc)
        return "desc";
    throw { message: "Unknown odata sort direction: " + direction };
}
function mapData(version, result) {
    var paramName = version === ODataVersion.Version3
        ? "odata.count"
        : "@odata.count";
    return {
        items: result.value,
        total: parseInt(result[paramName], 10)
    };
}
var ODataVersion;
(function (ODataVersion) {
    ODataVersion[ODataVersion["Version3"] = 3] = "Version3";
    ODataVersion[ODataVersion["Version4"] = 4] = "Version4";
})(ODataVersion || (ODataVersion = {}));
function formatValueV3(fieldInfo, value) {
    if (value instanceof Date)
        return "DateTime'" + formatDate(value, "YYYY-MM-DDTHH:mm:ss") + "'";
    if (typeof value === "boolean")
        return value ? "true" : "false";
    if (typeof value !== "number")
        return "'" + value + "'";
    if (fieldInfo && fieldInfo.dataType === "decimal")
        return value + "m";
    return value;
}
function formatValueV4(fieldInfo, value) {
    if (value instanceof Date)
        return "" + formatDate(value, "YYYY-MM-DDTHH:mm:ssz");
    if (typeof value === "boolean")
        return value ? "true" : "false";
    if (typeof value !== "number")
        return "'" + value + "'";
    if (fieldInfo && fieldInfo.dataType === "decimal")
        return value + "m";
    return value;
}
function buildUrl(version, url, request) {
    var filterGroups = request.filters.map(function (group) { return group.filters.map(function (filter) {
        var operator = operatorOrDefault(filter.operator);
        var fieldInfo = request.fields.find(function (i) { return i.field === filter.field; });
        var formatValue = version === ODataVersion.Version3
            ? formatValueV3
            : formatValueV4;
        if (operator === FilterOperator.NotEqals)
            return "not(" + filter.field + " eq " + formatValue(fieldInfo, filter.value) + ")";
        if (operator === FilterOperator.Contains)
            return version === ODataVersion.Version3
                ? "substringof(" + formatValue(fieldInfo, filter.value) + ", " + filter.field + ")"
                : "contains(" + filter.field + ", " + formatValue(fieldInfo, filter.value) + ")";
        if (operator === FilterOperator.In) {
            if (!filter.value || filter.value.length === 0)
                return null;
            var clauses = filter.value.map(function (i) { return "(" + filter.field + " eq " + formatValue(fieldInfo, i) + ")"; }).join(" or ");
            return filter.value.length > 1 ? "(" + clauses + ")" : clauses;
        }
        return filter.field + " " + OData_findFilter(operator) + " " + formatValue(fieldInfo, filter.value);
    }).filter(function (i) { return !!i; }).join(" and "); });
    var filters = filterGroups.length > 1
        ? filterGroups.map(function (i) { return "(" + i + ")"; }).join(" and ")
        : filterGroups.length > 0 ? filterGroups[0] : null;
    var sort = request.sorting.map(function (i) { return i.field + " " + mapDirection(i.direction); }).join(", ");
    var customVars = (function () {
        if (!request.args)
            return [];
        var typed = request.args;
        if (!Array.isArray(typed.vars))
            return [];
        return typed.vars;
    })();
    var vars = [
        { name: "$filter", value: filters },
        { name: "$orderby", value: sort }
    ].concat(customVars).filter(function (i) { return i.value; }).map(function (i) { return i.name + "=" + i.value; }).join("&");
    var dataUrl = url + "?" + vars;
    var joinSymbol = vars ? "&" : "";
    var countParam = version === ODataVersion.Version3
        ? "$inlinecount=allpages"
        : "$count=true";
    return {
        dataUrl: dataUrl,
        pageUrl: "" + dataUrl + joinSymbol + "$top=" + request.pageSize + "&$skip=" + request.page * request.pageSize + "&" + countParam
    };
}

// CONCATENATED MODULE: ./src/KendoMvc.ts


function KendoMvc_findFilter(operator) {
    if (operator === FilterOperator.Equals)
        return "eq";
    if (operator === FilterOperator.GraterThanOrEqual)
        return "gte";
    if (operator === FilterOperator.GreaterThan)
        return "gt";
    if (operator === FilterOperator.LowerThan)
        return "lt";
    if (operator === FilterOperator.LowerThanOrEqual)
        return "lte";
    if (operator === FilterOperator.Contains)
        return "contains";
    if (operator === FilterOperator.NotEqals)
        return "neq";
    throw { message: "Unknown odata filter type: " + operator };
}
function KendoMvc_mapDirection(direction) {
    if (direction === SortDirection.Asc)
        return "asc";
    if (direction === SortDirection.Desc)
        return "desc";
    throw { message: "Unknown odata sort direction: " + direction };
}
function KendoMvc_mapData(result) {
    return {
        items: result.Data,
        total: result.Total
    };
}
function KendoMvc_buildUrl(url, request) {
    var filterGroups = request.filters.map(function (group) { return group.filters.map(function (filter) {
        var operator = operatorOrDefault(filter.operator);
        function formatValue(value) {
            if (value instanceof Date)
                return "datetime'" + formatDate(value, "YYYY-MM-DDTHH-mm-ss") + "'";
            if (typeof value !== "number")
                return "'" + value + "'";
            return value;
        }
        if (operator === FilterOperator.In) {
            if (!filter.value || filter.value.length === 0)
                return null;
            var clauses = filter.value.map(function (i) { return "(" + filter.field + "~eq~" + formatValue(i) + ")"; }).join("~or~");
            return filter.value.length > 1 ? "(" + clauses + ")" : clauses;
        }
        return filter.field + "~" + KendoMvc_findFilter(operator) + "~" + formatValue(filter.value);
    }).filter(function (i) { return i !== null; }).join("~and~"); });
    var filters = filterGroups.length > 1
        ? filterGroups.map(function (i) { return "(" + i + ")"; }).join("~and~")
        : filterGroups.length > 0 ? filterGroups[0] : null;
    var sort = request.sorting.map(function (i) { return i.field + "-" + KendoMvc_mapDirection(i.direction); }).join("~");
    var vars = [
        { name: "filter", value: filters },
        { name: "sort", value: sort },
    ].filter(function (i) { return i.value; }).map(function (i) { return i.name + "=" + i.value; }).join("&");
    var dataUrl = url + "?" + vars;
    var joinSymbol = vars ? "&" : "";
    var page = request.page + 1;
    return {
        dataUrl: dataUrl,
        pageUrl: "" + dataUrl + joinSymbol + "pageSize=" + request.pageSize + "&page=" + page
    };
}

// CONCATENATED MODULE: ./src/i18n/pl-PL.ts
var pl_PL_calendar = {
    dateFormat: "YYYY-MM-DD",
    datePlaceholder: "yyyy-mm-dd",
    timeFormat: "HH:mm",
    timePlaceholder: "hh:mm",
    dateTimeFormat: "YYYY-MM-DD HH:mm",
    dateTimePlaceholder: "yyyy-mm-dd hh:mm",
    dayNames: [
        "N",
        "Pn",
        "Wt",
        "Śr",
        "Czw",
        "Pt",
        "So",
    ],
    monthNamesFull: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    monthNamesShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
    weekStart: 1,
    yearFormat: "{year}",
    yearRangeFormat: "{from} - {to}",
    monthFormat: "{month}",
    monthFirst: true
};
var pl_PL_settings = {
    thousandSeparator: " ",
    decimalPrecision: 2,
    decimalSeparator: ","
};
var pl_PL_text = {
    yes: "Tak",
    no: "Nie",
    pagerPage: "Strona",
    pagerOfPages: "z",
    firstPage: "Pierwsza strona",
    previousPage: "Poprzednia strona",
    nextPage: "Następna strona",
    lastPage: "Ostatnia strona",
    pageListItemTitle: "Strona %page%",
    filterAccept: "OK",
    filterReset: "Usuń",
    dropdownLabel: "Wybierz...",
    rangeFrom: "Od:",
    rangeTo: "Do:",
    containsValue: "Zawiera:",
    valueEquals: "Równa się:"
};
var lang = {
    settings: pl_PL_settings,
    text: pl_PL_text,
    calendar: pl_PL_calendar
};
/* harmony default export */ var pl_PL = (lang);

// CONCATENATED MODULE: ./src/index.ts










var locales = {
    plPL: pl_PL
};
var components = {
    DataGrid: components_DataGrid,
    DataColumn: components_DataColumn,
    FilterGroup: components_FilterGroup,
    FilterField: components_FilterField,
    GroupField: components_GroupField
};
var src_plugin = {
    install: function (vue) {
        Object.keys(components).forEach(function (i) { return vue.component(i, components[i]); });
    },
    addType: addType,
    addSource: addSource,
    addRemoteSource: addRemoteSource,
    addXhrHook: addXhrHook,
    setCalendar: setCalendar,
    setSettings: setSettings,
    setFilterComponent: setFilterComponent,
    setLanguage: setLanguage,
    setLocale: setLocale,
    locales: locales
};
addRemoteSource("odata3", function (url, request) { return buildUrl(3, url, request); }, function (result) { return mapData(3, result); });
addRemoteSource("odata4", function (url, request) { return buildUrl(4, url, request); }, function (result) { return mapData(4, result); });
addRemoteSource("odata", function (url, request) { return buildUrl(4, url, request); }, function (result) { return mapData(4, result); });
addRemoteSource("kendo-mvc", KendoMvc_buildUrl, KendoMvc_mapData);
/* harmony default export */ var src = (src_plugin);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=DataGrid.umd.js.map