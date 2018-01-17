
// ----------------------------------------------------------------
// Extension

let EX = {};
EX.Date = {};
EX.String = {};
EX.Object = {};

// ----------------------------------------------------------------
// Define

EX.Date.formatString = function (
  _format = '%Y/%m/%d %H:%M:%S'
) {
  _format = _format.replace('%Y', ('000' + this.getFullYear()).slice(-4));
  _format = _format.replace('%y', ('0' + this.getFullYear()).slice(-2));
  _format = _format.replace('%m', ('0' + (this.getMonth() + 1)).slice(-2));
  _format = _format.replace('%d', ('0' + this.getDate()).slice(-2));
  _format = _format.replace('%W', (this.toLocaleString(window.navigator.language, { weekday: 'short' })));
  _format = _format.replace('%H', ('0' + this.getHours()).slice(-2));
  _format = _format.replace('%MS', ('00' + this.getMilliseconds()).slice(-3));
  _format = _format.replace('%M', ('0' + this.getMinutes()).slice(-2));
  _format = _format.replace('%S', ('0' + this.getSeconds()).slice(-2));
  return _format;
};

EX.String.format = function (arg) {
  let rep_fn = undefined;

  if (typeof arg == 'object') {
    rep_fn = function (m, k) { return arg[k]; };
  }
  else {
    let args = arguments;
    rep_fn = function (m, k) { return args[ parseInt(k) ]; };
  }

  return this.replace( /\{(\w+)\}/g, rep_fn );
};

EX.String.capitalize = function () {
  return this.substring(0, 1).toUpperCase() + this.substring(1).toLowerCase();
};

EX.String.getRows = function () {
  return this.length - this.replace(/\n/g, '').length + 1;
};

EX.String.count = function (target) {
  return this.split(target).length - 1;
};

/**
 * Object.prototype.getType
 * @param  {Object} obj  Inspect Object or Optional (using this)
 * @return {String}      Result
**/

EX.Object.getType = function(obj = null) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 * Object.prototype.typeIs
 * @param  {String}  type Object type
 * @param  {Object}  obj  Check Object or Optional (using this)
 * @return {Boolean}      Check result
**/

EX.Object.typeIs = function(type = null, obj = null) {
  if (obj === null) {
    obj = this;
  }
  const _TYPE = Object.getType(obj);
  return obj !== undefined && obj !== null && _TYPE === type;
};

/**
 * Object.prototype.assignType
 * @param  {Object}          target Target Object or Optional (using this)
 * @param  {Object}          source Source Object
 * @param  {String|String[]} type   Assign target array of type
 * @return {Object}                 Result Object
**/

EX.Object.assignType = function (
  target = null,
  source = null,
  type = null
) {
  if (target === null) {
    return;
  }
  if (source === null) {
    return;
  }
  if (type === null) {
    if (Object.getType(source) == 'Object') {
      return Object.assign(target, source);

    } else if (Object.getType(source) == 'String' || Object.getType(source) == 'Array') {
      if (Object.getType(this) == 'Object') {
        type = source;
        source = target;
        target = this;
      }
    }
  }
  if (!Array.isArray(type)) {
    type = [type];
  }
  for (let key of Object.getOwnPropertyNames(source)) {
    if (type.includes(Object.getType(source[key]))) {
      target[key] = source[key];
    }
  }
  for (let key of Object.getOwnPropertyNames(source.__proto__)) {
    if (type.includes(Object.getType(source[key])) && key != 'constructor') {
      Object.defineProperty(
        target.__proto__,
        key,
        {
          value: source[key]
        }
      );
    }
  }
  return target;
};

// ----------------------------------------------------------------
// defineProperty

(() => {
  for (let type of Object.keys(EX)) {
    for (let extension of Object.keys(EX[type])) {
      Object.defineProperty(
        eval(`${type}.prototype`),
        extension,
        {
          value: EX[type][extension]
        }
      );
    }
  }
})();
