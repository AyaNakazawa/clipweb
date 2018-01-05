
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
  _format = _format.replace('%W', (this.toLocaleString(window.navigator.language, {weekday: 'short'})));
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
