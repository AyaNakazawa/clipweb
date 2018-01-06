
// ----------------------------------------------------------------
// Extension

let EX = {};
EX.Date = {};
EX.String = {};
EX.Object = {};

// ----------------------------------------------------------------
// Define

EX.Date.formatString = function (
  _format = '%Y/%m/%d(%W) %H:%M:%S.%MS'
) {
  _format = _format.replace('%Y', ('000' + this.getFullYear()).slice(-4));
  _format = _format.replace('%y', ('0' + this.getFullYear()).slice(-2));
  _format = _format.replace('%m', ('0' + (this.getMonth() + 1)).slice(-2));
  _format = _format.replace('%d', ('0' + this.getDate()).slice(-2));
  _format = _format.replace('%W', (this.toLocaleString(window.navigator.language, { weekday: 'short' })));
  _format = _format.replace('%H', ('0' + this.getHours()).slice(-2));
  _format = _format.replace('%MS', ('000' + this.getMilliseconds()).slice(-4));
  _format = _format.replace('%M', ('0' + this.getMinutes()).slice(-2));
  _format = _format.replace('%S', ('0' + this.getSeconds()).slice(-2));
  return _format;
};

EX.String.capitalize = function () {
  return this.substring(0, 1).toUpperCase() + this.substring(1).toLowerCase();
};

EX.String.getRows = function () {
  return this.length - this.replace(/\n/g, '').length + 1;
};

/**
 * Object.prototype.getType
 * @param  {Object} obj  Inspect Object
 * @return {String}      Result
**/

EX.Object.getType = function(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 * Object.prototype.typeIs
 * @param  {String}  type Object type
 * @param  {Object}  obj  Object to check
 * @return {Boolean}      Check result
**/

EX.Object.typeIs = function(type, obj) {
  const _CLAS = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && _CLAS === type;
};

/**
 * Object.prototype.assignType
 * @param  {Object}          target Target Object
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
    return Object.assign(target, source);
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
      target.__proto__[key] = source[key];
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
