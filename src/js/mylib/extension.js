
Date.prototype.formatString = function (_format = '%Y/%m/%d(%W) %H:%M:%S.%MS') {
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

String.prototype.capitalize = function () {
  return this.substring(0, 1).toUpperCase() + this.substring(1);
};

String.prototype.getRows = function () {
  return this.length - this.replace(/\n/g, '').length + 1;
};
