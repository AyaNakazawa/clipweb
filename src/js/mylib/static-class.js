
// ----------------------------------------------------------------
// Static classes

class Log {
  // Common line setting
  static get LENGTH () { return 88; }
  static get LINE () { return '─'; }
  static get SPACE () { return ' '; }
  static get CHAR_STYLE () { return '%c'; }
  static get MARGIN () { return 2; }
  static get FILL () { return false; }
  static get TIMESTAMP () { return true; }
  static get NOWSTAMP () { return new Date().formatString('%M:%S.%MS '); }

  // Group character setting
  static get GROUP_NONE () { return ['', '']; }
  static get GROUP_START () { return ['┌', '┐']; }
  static get GROUP_MIDDLE () { return ['├', '┤']; }
  static get GROUP_IN () { return ['│', '│']; }
  static get GROUP_END () { return ['└', '┘']; }

  // Number of backtracking in Message
  static get MESSAGE_FUNCTION_TRACE () { return 3; }

  // View permission
  static get VIEW () { return true; }
  static get VIEW_LINE () { return true; }
  static get VIEW_OBJECT () { return true; }
  static get VIEW_TIME () { return true; }
  static get VIEW_CLASS () { return true; }
  static get VIEW_CLASS_KEY () { return true; }
  static get VIEW_ERROR () { return true; }
  static get VIEW_WARNING () { return true; }
  static get VIEW_CAUTION () { return true; }
  static get VIEW_INFO () { return true; }

  // Align definition
  static get ALIGN_LEFT () { return 0; }
  static get ALIGN_CENTER () { return 1; }
  static get ALIGN_RIGHT () { return 2; }

  // Arrow definition
  static get NULL () { return 'Log.NULL'; }
  static get COLON () { return ':'; }
  static get ARROW_OUTPUT () { return ' ---> '; }
  static get ARROW_INPUT () { return ' <--- '; }

  // Length definition
  static get CLASS_LENGTH () { return 24; }
  static get KEY_LENGTH () { return 24; }

  // Style definition
  static get STYLE_COLOR_RED () { return 'color:#f00;'; }
  static get STYLE_COLOR_GREEN () { return 'color:#0f0;'; }
  static get STYLE_COLOR_BLUE () { return 'color:#00f;'; }
  static get STYLE_COLOR_YELLOW () { return 'color:#ff0;'; }
  static get STYLE_COLOR_MAGENTA () { return 'color:#f0f;'; }
  static get STYLE_COLOR_CYAN () { return 'color:#0ff;'; }

  static get STYLE_LOG () { return 'color:#333'; }
  static get STYLE_LINE () { return 'color:#aaa'; }
  static get STYLE_COLON () { return 'color:#858'; }
  static get STYLE_ARROW () { return 'color:#145'; }
  static get STYLE_GROUP () { return 'color:#888'; }

  static get STYLE_TIME () { return 'color:#333;font-weight:bold;'; }
  static get STYLE_TIMESTAMP () { return 'color:#333;font-weight:bold;'; }

  static get STYLE_CLASS () { return 'color:#222;'; }
  static get STYLE_KEY () { return 'color:#c2c;'; }
  static get STYLE_VALUE () { return 'color:#22c;'; }

  static get STYLE_ERROR_LINE () { return 'color:#a00;'; }
  static get STYLE_ERROR_HEADER () { return 'color:#a00;'; }
  static get STYLE_ERROR_CONTENT () { return 'color:#611;'; }

  static get STYLE_WARNING_LINE () { return 'color:#a80;'; }
  static get STYLE_WARNING_HEADER () { return 'color:#850;'; }
  static get STYLE_WARNING_CONTENT () { return 'color:#651;'; }

  static get STYLE_CAUTION_LINE () { return 'color:#aa0;'; }
  static get STYLE_CAUTION_HEADER () { return 'color:#880;'; }
  static get STYLE_CAUTION_CONTENT () { return 'color:#661;'; }

  static get STYLE_INFO_LINE () { return 'color:#08a;'; }
  static get STYLE_INFO_HEADER () { return 'color:#058;'; }
  static get STYLE_INFO_CONTENT () { return 'color:#156;'; }

  static error (...array) {
    let _args = null;
    if (Object.getType(array[0]) == 'Arguments') {
      _args = array.shift();
    }
    return this.message({
      message: array,
      args: _args,
      type: 'Error',
      view: this.VIEW_ERROR,
      styleLine: this.STYLE_ERROR_LINE,
      styleHeader: this.STYLE_ERROR_HEADER,
      styleContent: this.STYLE_ERROR_CONTENT
    });
  }

  static warning (...array) {
    let _args = null;
    if (Object.getType(array[0]) == 'Arguments') {
      _args = array.shift();
    }
    return this.message({
      message: array,
      args: _args,
      type: 'Warning',
      view: this.VIEW_WARNING,
      styleLine: this.STYLE_WARNING_LINE,
      styleHeader: this.STYLE_WARNING_HEADER,
      styleContent: this.STYLE_WARNING_CONTENT
    });
  }

  static caution (...array) {
    let _args = null;
    if (Object.getType(array[0]) == 'Arguments') {
      _args = array.shift();
    }
    return this.message({
      message: array,
      args: _args,
      type: 'Caution',
      view: this.VIEW_CAUTION,
      styleLine: this.STYLE_CAUTION_LINE,
      styleHeader: this.STYLE_CAUTION_HEADER,
      styleContent: this.STYLE_CAUTION_CONTENT
    });
  }

  static info (...array) {
    let _args = null;
    if (Object.getType(array[0]) == 'Arguments') {
      _args = array.shift();
    }
    return this.message({
      message: array,
      args: _args,
      type: 'Info',
      view: this.VIEW_INFO,
      styleLine: this.STYLE_INFO_LINE,
      styleHeader: this.STYLE_INFO_HEADER,
      styleContent: this.STYLE_INFO_CONTENT
    });
  }

  static message ({
    args = null,
    message = this.NULL,
    type = 'Log',
    view = null,
    styleLine = null,
    styleHeader = null,
    styleContent = null
  } = {}) {
    // View permission
    if (view) {
      const _ERROR = new Error().stack.split('\n');
      if (_ERROR[0] == 'Error') {
        _ERROR.shift();
      }
      _ERROR.shift();
      _ERROR.shift();
      let _stack = [];
      for (let error of _ERROR) {
        let _temp = error.trim();
        let _temp2 = null;
        if (_temp.indexOf(' (') > 0) {
          _temp = _temp.substr(3);
          _temp2 = _temp.split(' (');
        } else if (_temp.indexOf('@') > 0) {
          _temp2 = _temp.split('@');
        }
        if (_temp2 != null) {
          if (_temp.indexOf(')') > 0) {
            _temp2[1] = _temp2[1].slice(0, -1);
          }
          let _temp3 = {
            name: _temp2[0],
            path: _temp2[1]
          };
          _stack.push(_temp3);
        }
      }

      // Draw line
      this.line({ style: styleLine, group: this.GROUP_START })();
      // Write title
      this.log({
        text: type,
        align: this.ALIGN_CENTER,
        style: styleHeader,
        group: this.GROUP_IN,
        groupStyle: styleLine
      })();
      this.log({
        text: new Date().formatString(),
        align: this.ALIGN_RIGHT,
        style: styleHeader,
        group: this.GROUP_IN,
        groupStyle: styleLine
      })();

      for (let i = 0; i < _stack.length && i < this.MESSAGE_FUNCTION_TRACE; i++) {
        this.class({
          clas: _stack[i]['name'],
          key: _stack[i]['path'],
          group: this.GROUP_IN,
          groupStyle: styleLine
        })();
      }
      this.obj({
        obj: _stack,
        group: this.GROUP_IN,
        groupStyle: styleLine
      })();

      // Write args
      if (args !== null) {
        if (args.length > 0) {
          // Draw line
          this.line({ style: styleLine, group: this.GROUP_MIDDLE })();
          // Write title
          this.log({
            text: 'Arguments',
            align: this.ALIGN_CENTER,
            style: styleHeader,
            group: this.GROUP_IN,
            groupStyle: styleLine
          })();

          // Write args
          for (let i = 0; i < args.length; i++) {
            if (!Object.typeIs(['Object', 'Array'], args[i])) {
              args[i] = [args[i]];
            }
            for (let key of Object.keys(args[i])) {
              this.class({
                clas: `${i} > ${key}`,
                key: args[i][key],
                group: this.GROUP_IN,
                groupStyle: styleLine
              })();
            }
          }
        }
      }

      // Write message
      if (message.length > 0) {
        // Draw line
        this.line({ style: styleLine, group: this.GROUP_MIDDLE })();
        // Write title
        this.log({
          text: 'Message',
          align: this.ALIGN_CENTER,
          style: styleHeader,
          group: this.GROUP_IN,
          groupStyle: styleLine
        })();

        // Write message
        if (!Object.typeIs('Array', message)) {
          message = [message];
        }
        for (let i = 0; i < message.length; i++) {
          if (Object.typeIs('Object', message[i])) {
            this.obj({
              obj: message[i],
              group: this.GROUP_IN,
              groupStyle: styleLine
            })();
          } else {
            this.log({
              text: message[i],
              align: this.ALIGN_LEFT,
              style: styleContent,
              group: this.GROUP_IN,
              groupStyle: styleLine
            })();
          }
        }
      }

      this.line({ style: styleLine, group: this.GROUP_END })();
      return console.log.bind(
        console,
        this.format({
          text: `${this.CHAR_STYLE}${type} from${this.CHAR_STYLE}${this.ARROW_OUTPUT}`,
          align: this.ALIGN_RIGHT
        }),
        styleContent,
        styleContent,
        styleContent,
        this.STYLE_ARROW,
        styleContent
      );
    } else {
      return () => {};
    }
  }

  static _checkArgs (
    init = null,
    args = null,
    index = null
  ) {
    if (args == null || index == null) {
      return init;
    }
    if (args.length > index) {
      return args[index];
    }
    return init;
  }

  static obj ({
    obj = this.NULL,
    group = this.GROUP_NONE,
    groupStyle = this.STYLE_GROUP
  } = {}) {
    // View permission
    if (this.VIEW_OBJECT) {
      if (Object.getType(arguments[0]) == 'Object') {
        if (typeof arguments[0]['obj'] == 'undefined') {
          obj = this._checkArgs(obj, arguments, 0);
        }
        if (typeof arguments[0]['group'] == 'undefined') {
          group = this._checkArgs(group, arguments, 1);
        }
        if (typeof arguments[0]['groupStyle'] == 'undefined') {
          groupStyle = this._checkArgs(groupStyle, arguments, 2);
        }
      } else {
        obj = this._checkArgs(obj, arguments, 0);
        group = this._checkArgs(group, arguments, 1);
        groupStyle = this._checkArgs(groupStyle, arguments, 2);
      }

      let result = this.CHAR_STYLE;
      result += group[0];
      for (let i = 0; i < this.MARGIN - group[0].length - 1; i++) {
        result += this.SPACE;
      }
      if (this.TIMESTAMP) {
        result = this.CHAR_STYLE + this.NOWSTAMP + result;
      } else {
        result = this.CHAR_STYLE + result;
      }
      return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, obj);
    } else {
      return () => {};
    }
  }

  static time ({
    format = '%Y/%m/%d %H:%M:%S.%MS',
    align = this.ALIGN_LEFT,
    style = this.STYLE_TIME,
    group = this.GROUP_NONE,
    groupStyle = this.STYLE_GROUP
  } = {}) {
    // View permission
    if (this.VIEW_TIME) {
      if (Object.getType(arguments[0]) != 'Object') {
        format = this._checkArgs(format, arguments, 0);
        align = this._checkArgs(align, arguments, 1);
        style = this._checkArgs(style, arguments, 2);
        group = this._checkArgs(group, arguments, 3);
        groupStyle = this._checkArgs(groupStyle, arguments, 4);
      }

      return this.log({
        text: new Date().formatString(format),
        align: align,
        group: group,
        style: style,
        groupStyle: groupStyle
      });
    } else {
      return () => {};
    }
  }

  static class ({
    clas = this.NULL,
    key = this.NULL,
    classStyle = this.STYLE_CLASS,
    keyStyle = this.STYLE_VALUE,
    group = this.GROUP_NONE,
    groupStyle = this.STYLE_GROUP
  } = {}) {
    // View permission
    if (this.VIEW_CLASS) {
      if (Object.getType(arguments[0]) != 'Object') {
        clas = this._checkArgs(clas, arguments, 0);
        key = this._checkArgs(key, arguments, 1);
        classStyle = this._checkArgs(classStyle, arguments, 2);
        keyStyle = this._checkArgs(keyStyle, arguments, 3);
        group = this._checkArgs(group, arguments, 4);
        groupStyle = this._checkArgs(groupStyle, arguments, 5);
      }

      return this.log({
        clas: clas,
        key: key,
        classStyle: classStyle,
        keyStyle: keyStyle,
        group: group,
        groupStyle: groupStyle
      });
    } else {
      return () => {};
    }
  }

  static classKey ({
    clas = this.NULL,
    key = this.NULL,
    value = this.NULL,
    arrow = this.ARROW_OUTPUT,
    classStyle = this.STYLE_CLASS,
    keyStyle = this.STYLE_KEY,
    valueStyle = this.STYLE_VALUE,
    group = this.GROUP_NONE,
    groupStyle = this.STYLE_GROUP
  } = {}) {
    // View permission
    if (this.VIEW_CLASS_KEY) {
      if (Object.getType(arguments[0]) != 'Object') {
        clas = this._checkArgs(clas, arguments, 0);
        key = this._checkArgs(key, arguments, 1);
        value = this._checkArgs(value, arguments, 2);
        arrow = this._checkArgs(arrow, arguments, 3);
        classStyle = this._checkArgs(classStyle, arguments, 4);
        keyStyle = this._checkArgs(keyStyle, arguments, 5);
        valueStyle = this._checkArgs(valueStyle, arguments, 6);
        group = this._checkArgs(group, arguments, 7);
        groupStyle = this._checkArgs(groupStyle, arguments, 8);
      }

      return this.log({
        clas: clas,
        key: key,
        value: value,
        arrow: arrow,
        classStyle: classStyle,
        keyStyle: keyStyle,
        valueStyle: valueStyle,
        group: group,
        groupStyle: groupStyle
      });
    } else {
      return () => {};
    }
  }

  static log ({
    text = this.NULL,
    align = this.ALIGN_LEFT,
    style = this.STYLE_LOG,
    group = this.GROUP_NONE,
    groupStyle = this.STYLE_GROUP,
    fill = this.FILL,
    clas = this.NULL,
    key = this.NULL,
    value = this.NULL,
    arrow = this.ARROW_OUTPUT,
    classStyle = this.STYLE_CLASS,
    keyStyle = this.STYLE_KEY,
    valueStyle = this.STYLE_VALUE,
  } = {}) {
    // View permission
    if (this.VIEW) {
      if (Object.getType(arguments[0]) != 'Object') {
        text = this._checkArgs(text, arguments, 0);
        align = this._checkArgs(align, arguments, 1);
        style = this._checkArgs(style, arguments, 2);
        group = this._checkArgs(group, arguments, 3);
        groupStyle = this._checkArgs(groupStyle, arguments, 4);
      }
      let result = this.format({
        text: text,
        align: align,
        group: group,
        clas: clas,
        key: key,
        value: value,
        arrow: arrow,
        fill: fill
      });
      if (this.TIMESTAMP) {
        result = this.CHAR_STYLE + this.NOWSTAMP + result;
      } else {
        result = this.CHAR_STYLE + result;
      }
      if (clas != this.NULL) {
        if (key != this.NULL) {
          if (value != this.NULL) {
            // class + key + value
            if (Object.typeIs(['Object', 'Array'], value)) {
              return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, classStyle, this.STYLE_COLON, keyStyle, this.STYLE_ARROW, value);
            } else {
              return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, classStyle, this.STYLE_COLON, keyStyle, this.STYLE_ARROW, valueStyle, groupStyle);
            }
          } else {
            // class + key
            if (Object.typeIs(['Object', 'Array'], key)) {
              return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, classStyle, this.STYLE_COLON, key);
            } else {
              return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, classStyle, this.STYLE_COLON, keyStyle, groupStyle);
            }
          }
        } else {
          if (value != this.NULL) {
            // class + value
            if (Object.typeIs(['Object', 'Array'], value)) {
              return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, classStyle, this.STYLE_COLON, value);
            } else {
              return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, classStyle, this.STYLE_COLON, valueStyle, groupStyle);
            }
          } else {
            // class
            return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, classStyle, this.STYLE_COLON, groupStyle);
          }
        }
      } else {
        return console.log.bind(console, result, this.STYLE_TIMESTAMP, groupStyle, style, groupStyle);
      }
    } else {
      return () => {};
    }
  }

  static line ({
    style = this.STYLE_LINE,
    group = this.GROUP_NONE
  } = {}) {
    // View permission
    if (this.VIEW_LINE) {
      if (Object.getType(arguments[0]) != 'Object') {
        style = this._checkArgs(style, arguments, 0);
        group = this._checkArgs(group, arguments, 1);
      }

      return this.log({
        text: this.NULL,
        style: style,
        group: group,
        groupStyle: style
      });
    } else {
      return () => {};
    }
  }

  static format ({
    text = this.NULL,
    message = this.NULL,
    align = this.ALIGN_LEFT,
    clas = this.NULL,
    key = this.NULL,
    value = this.NULL,
    arrow = this.ARROW_OUTPUT,
    fill = this.FILL,
    group = this.GROUP_NONE
  } = {}) {

    let groupEnd = true;
    let result = this.CHAR_STYLE;
    result += group[0];

    if (clas != this.NULL) {
      // Class Key

      for (let i = 0; i < this.MARGIN - group[0].length; i++) {
        result += this.SPACE;
      }

      result += this.CHAR_STYLE;
      result += clas;

      if (key != this.NULL) {
        // and Key
        for (let i = 0; i < this.CLASS_LENGTH - clas.length; i++) {
          result += this.SPACE;
        }
        result += this.CHAR_STYLE;
        result += this.COLON;
        result += this.SPACE;
        if (Object.typeIs(['Object', 'Array'], key)) {
          return result;
        }
        result += this.CHAR_STYLE;
        result += key;

        if (value != this.NULL) {
          // and Value
          for (let i = 0; i < this.KEY_LENGTH - key.length; i++) {
            result += this.SPACE;
          }
          result += this.CHAR_STYLE;
          result += arrow;
          if (Object.typeIs(['Object', 'Array'], value)) {
            return result;
          }
          result += this.CHAR_STYLE;
          result += value;
        }
      }
    } else {
      // Text
      if (text == this.NULL) {
        text = message;
      }
      result += this.CHAR_STYLE;

      if (text == this.NULL) {
        for (let i = 0; i < (this.LENGTH - group[0].length - group[1].length); i++) {
          result += this.LINE;
        }
      } else {
        const strLength = text.length - (2 * text.count(this.CHAR_STYLE));
        if (align == this.ALIGN_LEFT) {
          for (let i = 0; i < this.MARGIN - group[0].length; i++) {
            result += this.SPACE;
          }
          result += text;

        } else if (align == this.ALIGN_CENTER) {
          for (let i = 0; i < ((this.LENGTH) / 2) - (strLength / 2) - group[0].length; i++) {
            result += this.SPACE;
          }
          result += text;

        } else if (align == this.ALIGN_RIGHT) {
          for (let i = 0; i < (this.LENGTH) - strLength - this.MARGIN - (group[0].length); i++) {
            result += this.SPACE;
          }
          result += text;
        }
      }
    }
    if (fill || group[1].length > 0) {
      const _FILL_COUNT = this.LENGTH - result.length - group[1].length + (2 * result.count(this.CHAR_STYLE));
      for (let i = 0; i < _FILL_COUNT; i++) {
        result += this.SPACE;
      }
    }
    result += this.CHAR_STYLE;
    if ((result.length - 2 * result.count(this.CHAR_STYLE)) < this.LENGTH) {
      result += group[1];
    }
    return result;
  }
}

class LocalStorage {
  // Check localStorage support
  static get SUPPORT () {
    if (!localStorage) {
      return false;
    }
    return true;
  }

  // All clear localStorage
  static clear () {
    // Check support
    if (this.SUPPORT) {
      Log.class('Local Storage', 'All Clear.')();
      // Clear
      localStorage.clear();
    }
  }

  // getItem from localStorage
  static getItem (key = 'key') {
    key = this._buildKey(key);
    // Check support
    if (this.SUPPORT) {
      const value = localStorage.getItem(key);
      Log.classKey('Local Storage', key, value, Log.ARROW_OUTPUT)();
      // Get
      return value;
    }
  }

  // setItem from localStorage
  static setItem (key = 'key', value = 'value') {
    key = this._buildKey(key);
    // Check support
    if (this.SUPPORT) {
      Log.classKey('Local Storage', key, value, Log.ARROW_INPUT)();
      // Set
      localStorage.setItem(key, value);
    }
  }

  // removeItem from localStorage
  static removeItem (key = 'key') {
    key = this._buildKey(key);
    // Check support
    if (this.SUPPORT) {
      Log.classKey('Local Storage', key, 'remove', Log.ARROW_INPUT)();
      // Remove
      localStorage.removeItem(key);
    }
  }

  // Build key
  static _buildKey (key) {
    return `${Project.KEY}.${key}`;
  }
}

class SHA256 {
  static getHash(_string = null) {
    if (_string != null) {
      let shaObject = new jsSHA('SHA-256', 'TEXT', 1);
      shaObject.update(_string);
      return shaObject.getHash('HEX');
    }
    return null;
  }
}

class MD5 {
  static getHash (string = null) {
    if (string != null) {
      return CryptoJS.MD5(string).toString();
    }
    return null;
  }
}

class Validate {
  static checkMaxLength (
    string = null,
    _digit = null
  ) {
    if (string != null && _digit != null) {
      if (string.length <= _digit) {
        return true;
      }
    }
    return false;
  }

  static checkMinLength (
    string = null,
    _digit = null
  ) {
    if (string != null && _digit != null) {
      if (string.length >= _digit) {
        return true;
      }
    }
    return false;
  }

  static checkIncludeNumber (
    string = null
  ) {
    if (string != null) {
      if (string.match(/[0-9]/)) {
        return true;
      }
    }
    return false;
  }

  static checkIncludeAlphabet (
    string = null
  ) {
    if (string != null) {
      if (string.match(/[a-zA-Z]/)) {
        return true;
      }
    }
    return false;
  }

  static checkIncludeChar (
    string = null,
    _char = null
  ) {
    if (string != null && _char != null) {
      if (~string.indexOf(_char)) {
        return true;
      }
    }
    return false;
  }
}

class Crypto {
  static get KEY_SIZE () {
    return 128 / 8;
  }

  static get ITERATIONS () {
    return 500;
  }

  static get MODE () {
    return CryptoJS.mode.CBC;
  }

  static get PADDING () {
    return CryptoJS.pad.Pkcs7;
  }

  static getKey (pass = null, salt = null) {
    if (pass != null && salt != null){
      const RESULT = CryptoJS.PBKDF2(
        pass,
        salt,
        {
          keySize: this.KEY_SIZE,
          iterations: this.ITERATIONS
        }
      );
      return RESULT;
    }
    return null;
  }

  static getRand (keySize = this.KEY_SIZE) {
    return CryptoJS.lib.WordArray.random(this.KEY_SIZE);
  }

  static toUTF8 (_data = null) {
    if (_data != null) {
      return _data.toString(CryptoJS.enc.Utf8);
    }
    return null;
  }

  static parseUTF8 (_data = null) {
    if (_data != null) {
      return CryptoJS.enc.Utf8.parse(_data);
    }
    return null;
  }

  static parseHex (_data = null) {
    if (_data != null) {
      return CryptoJS.enc.Hex.parse(_data);
    }
    return null;
  }

  static parseBase64 (_data = null) {
    if (_data != null) {
      return CryptoJS.enc.Base64.parse(_data);
    }
    return null;
  }

  static stringifyHex (_data = null) {
    if (_data != null) {
      return CryptoJS.enc.Hex.stringify(_data);
    }
    return null;
  }

  static getOption (iv = null, mode = this.MODE, padding = this.PADDING) {
    if (iv != null) {
      return { iv: iv, mode: mode, padding: padding };
    }
    return null;
  }

  static encrypt (
    _data = null,
    _password = null
  ) {
    if (_data == null) {
      return false;
    }
    if (_password == null) {
      return false;
    }

    let result = '';

    const DATA = this.parseUTF8(_data);
    const PASSWORD = this.parseUTF8(_password);

    const SALT = this.getRand();
    const KEY = this.getKey(PASSWORD, SALT);
    const IV = this.getRand();
    const OPTIONS = this.getOption(IV);

    const ENCRYPTED = CryptoJS.AES.encrypt(DATA, KEY, OPTIONS);

    result += this.stringifyHex(SALT);
    result += (',' + this.stringifyHex(IV));
    result += (',' + ENCRYPTED);

    return result;
  }

  static decrypt (
    _data = null,
    _password = null
  ) {
    if (_data == null) {
      return false;
    }
    if (_password == null) {
      return false;
    }

    let result = '';

    const DATA = _data.split(',');

    const ENCRYPTED = this.parseBase64(DATA[2]);
    const PASSWORD = this.parseUTF8(_password);

    const SALT = this.parseHex(DATA[0]);
    const IV = this.parseHex(DATA[1]);
    const KEY = this.getKey(PASSWORD, SALT);
    const OPTIONS = this.getOption(IV);

    result = CryptoJS.AES.decrypt({'ciphertext': ENCRYPTED}, KEY, OPTIONS);
    result = this.toUTF8(result);

    return result;
  }
}

class Random {
  static rand (
    min = null,
    max = null,
    type = 'int'
  ) {
    if (min == null || max == null) {
      Log.error(arguments, 'Need min & max of argument. X(')();
      return;
    }
    const _DIVIDE = this._calcDivide(max - min, 'uint');
    let _array = new Uint32Array(1);
    window.crypto.getRandomValues(_array);
    const _RESULT = (_array[0] / _DIVIDE) + min;

    if (type == 'int') {
      return parseInt(_RESULT);

    } else if (type == 'float') {
      return _RESULT;

    } else {
      Log.error(arguments, 'Unknown type. X(', 'e.g. "int" or "float"')();
      return;
    }
  }

  static randInt (
    min = null,
    max = null
  ) {
    return this.rand(min, max, 'int');
  }

  static randFloat (
    min = null,
    max = null
  ) {
    return this.rand(min, max, 'float');
  }

  static hex (
    length = null
  ) {
    if (length == null) {
      return SHA256.getHash(this.rand(this.getMin('uint'), this.getMax('uint')).toString());
    }
    return SHA256.getHash(this.rand(this.getMin('uint'), this.getMax('uint')).toString()).substr(0, length);
  }

  static getMin (
    type = null
  ) {
    const _MINS = {
      sbyte: -128,
      byte: 0,
      short: -32768,
      ushort: 0,
      int: -2147483648,
      uint: 0,
      long: -9223372036854775808,
      ulong: 0,
    };
    if (type in _MINS) {
      return _MINS[type];
    } else {
      if (type == null) {
        Log.error(arguments, 'Need type of argument. X(', 'e.g. "int" or "sbyte" etc..')();
        return;
      } else {
        Log.error(arguments, 'Unknown type X(')();
        return;
      }
    }
  }

  static getMax (
    type = null
  ) {
    const _MAXS = {
      sbyte: 127,
      byte: 255,
      short: 32767,
      ushort: 65535,
      int: 2147483647,
      uint: 4294967295,
      long: 9223372036854775807,
      ulong: 18446744073709551615
    };
    if (type in _MAXS) {
      return _MAXS[type];
    } else {
      if (type == null) {
        Log.error(arguments, 'Need type of argument. X(', 'e.g. "int" or "sbyte" etc..')();
        return;
      } else {
        Log.error(arguments, 'Unknown type X(')();
        return;
      }
    }
  }

  static _calcDivide (
    diff = null,
    type = null
  ) {
    if (diff == 0) {
      Log.error(arguments, 'Need make B and C different values. X(')();
      return;
    } else if (diff == null) {
      Log.error(arguments, 'Need diff of argument. X(')();
      return;
    } else if (type == null) {
      Log.error(arguments, 'Need type of argument. X(')();
      return;
    }
    return this.getMax(type) / diff;
  }
}

class File {
  static getName (filename = null) {
    if (filename == null) {
      Log.error(arguments)();
      return;
    }
    return this.splitExtension(filename)[0];
  }

  static getExtension (filename = null) {
    if (filename == null) {
      Log.error(arguments)();
      return;
    }
    const _RESULT = this.splitExtension(filename);
    if (typeof _RESULT[1] != 'undefined') {
      return _RESULT[1];
    }
    return _RESULT[0];
  }

  static getExtensionWithDot (filename = null) {
    if (filename == null) {
      Log.error(arguments)();
      return;
    }
    const _RESULT = this.splitExtensionWithDot(filename);
    if (typeof _RESULT[1] != 'undefined') {
      return _RESULT[1];
    }
    return _RESULT[0];
  }

  static splitExtension (filename = null) {
    if (filename == null) {
      Log.error(arguments)();
      return;
    }
    return filename.split(/\.(?=[^.]+$)/);
  }

  static splitExtensionWithDot (filename = null) {
    if (filename == null) {
      Log.error(arguments)();
      return;
    }
    return filename.split(/(?=\.[^.]+$)/);
  }
}

class Web {
  static getParam (paramName = null) {
    if (paramName == null) {
      Log.error(arguments, 'Need paramName of argument. X(')();
      return null;
    }
    if (1 < document.location.search.length) {
      let _query = document.location.search.substring(1);
      let _params = _query.split('&');

      for (let index = 0; index < _params.length; index ++) {
        let _param = _params[index].split('=');
        let _paramName = decodeURIComponent(_param[0]);
        if (paramName.mini() == _paramName.mini()) {
          return decodeURIComponent(_param[1]);
        }
      }
      // Log.error(arguments,
      //   'The parameter could not be found. X(',
      //   `Your search value: ${paramName}`,
      //   'Parameter List: ',
      //   _params
      // )();
      return null;
    } else {
      // Log.error(arguments,
      //   'Parameters does not exist. X(',
      //   `Your search value: ${paramName}`
      // )();
      return null;
    }
  }
}
