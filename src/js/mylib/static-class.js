
// ----------------------------------------------------------------
// Static classes

class Log {
  // Common line setting
  static get LENGTH () { return 96; }
  static get CHARACTER () { return '─'; }
  static get SPACE () { return ' '; }

  // View permission
  static get VIEW () { return true; }
  static get VIEW_OBJECT () { return true; }
  static get VIEW_TIME () { return true; }
  static get VIEW_CLASS () { return true; }
  static get VIEW_CLASS_KEY () { return true; }
  static get VIEW_ERROR () { return true; }
  static get VIEW_CAUTION () { return true; }

  // Align definition
  static get ALIGN_LEFT () { return 0; }
  static get ALIGN_CENTER () { return 1; }
  static get ALIGN_RIGHT () { return 2; }

  // Arrow definition
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
  static get STYLE_OPRATION () { return 'color:#888'; }

  static get STYLE_TIME () { return 'color:#333;font-weight:bold;'; }

  static get STYLE_CLASS () { return 'color:#222;'; }
  static get STYLE_KEY () { return 'color:#c2c;'; }
  static get STYLE_VALUE () { return 'color:#22c;'; }

  static get STYLE_ERROR_LINE () { return 'color:#f00;'; }
  static get STYLE_ERROR_HEADER () { return 'color:#a00;'; }
  static get STYLE_ERROR_CONTENT () { return 'color:#411;'; }

  static get STYLE_CAUTION_LINE () { return 'color:#aa0;'; }
  static get STYLE_CAUTION_HEADER () { return 'color:#880;'; }
  static get STYLE_CAUTION_CONTENT () { return 'color:#441;'; }

  static error (...array) {
    // View permission
    if (this.VIEW_ERROR) {
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE)();
      // Write title
      this.log('Error', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER)();

      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_ERROR_CONTENT)();
      }

      // Write exit
      this.log('Exit', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER)();
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE)();
    }
  }

  static caution (...array) {
    // View permission
    if (this.VIEW_CAUTION) {
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE)();
      // Write title
      this.log('Caution', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER)();

      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_CAUTION_CONTENT)();
      }

      // Write exit
      this.log('Exit', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER)();
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE)();
    }
  }

  static message ({
    obj = null,
    func = null,
    args = null,
    message = '',
    type = 'Log',
    view = null,
    styleLine = null,
    styleHeader = null,
    styleContent = null
  } = {}) {
    // View permission
    if (view) {
      // Draw line
      this.log(null, null, styleLine)();
      // Write title
      this.log(type, this.ALIGN_CENTER, styleHeader)();

      // Write info
      if (obj !== null) {
        this.obj(obj)();
        this.class('Class Name', obj.constructor.name, styleContent)();
      }
      if (func !== null) {
        this.class('Function Name', func.name, styleContent)();
      }

      // Write args
      if (args !== null) {
        if (args.length > 0) {
          // Draw line
          this.log(null, null, styleLine)();
          // Write title
          this.log('Arguments', this.ALIGN_CENTER, styleHeader)();

          // Write args
          for (let i = 0; i < args.length; i++) {
            if (!Object.typeIs('Object', args[i]) && !Object.typeIs('Array', args[i])) {
              args[i] = [args[i]];
            }
            for (let key of Object.keys(args[i])) {
              this.class(`arguments ${i} ${key}`, args[i][key], styleContent)();
            }
          }
        }
      }

      // Write message
      if (message.length > 0) {
        // Draw line
        this.log(null, null, styleLine)();
        // Write title
        this.log('Message', this.ALIGN_CENTER, styleHeader)();

        // Write message
        if (!Object.typeIs('Array', message)) {
          message = [message];
        }
        for (let i = 0; i < message.length; i++) {
          this.log(message[i], this.ALIGN_LEFT, styleContent)();
        }
      }

      // Write exit
      this.log('Exit', this.ALIGN_CENTER, styleHeader)();
      return console.log.bind(
        console,
        this.format({
          text: `%c${type} from %c--->`,
          align: this.ALIGN_RIGHT
        }),
        this.STYLE_LOG,
        this.STYLE_OPRATION
      );
    }
  }

  static errorCommon ({
    obj = null,
    func = null,
    args = null,
    message = ''
  } = {}) {
    return this.message({
      obj: obj,
      func: func,
      args: args,
      message: message,
      type: 'Error',
      view: this.VIEW_ERROR,
      styleLine: this.STYLE_ERROR_LINE,
      styleHeader: this.STYLE_ERROR_HEADER,
      styleContent: this.STYLE_ERROR_CONTENT
    });
  }

  static cautionCommon ({
    obj = null,
    func = null,
    args = null,
    message = ''
  } = {}) {
    return this.message({
      obj: obj,
      func: func,
      args: args,
      message: message,
      type: 'Caution',
      view: this.VIEW_CAUTION,
      styleLine: this.STYLE_CAUTION_LINE,
      styleHeader: this.STYLE_CAUTION_HEADER,
      styleContent: this.STYLE_CAUTION_CONTENT
    });
  }

  static obj (_obj) {
    // View permission
    if (this.VIEW_OBJECT) {
      // Write object
      return console.log.bind(console, _obj);
    }
  }

  static time (_format = '%Y/%m/%d %H:%M:%S.%MS') {
    // View permission
    if (this.VIEW_TIME) {
      // Write object
      return console.log.bind(console, this.format({
        text: new Date().formatString(_format),
        align: this.ALIGN_CENTER
      }));
    }
  }

  static class (clas = 'Class', key = 'value', style1 = this.STYLE_CLASS, style2 = this.STYLE_VALUE) {
    // View permission
    if (this.VIEW_CLASS) {
      let result = this.format({
        clas: clas,
        key: key
      });
      // Write result
      return console.log.bind(console, result, style1, this.STYLE_OPRATION, style2);
    }
  }

  static classKey (clas = 'Class', key = 'key', value = 'value', arrow = Log.ARROW_OUTPUT, style1 = this.STYLE_CLASS, style2 = this.STYLE_KEY, style3 = this.STYLE_VALUE) {
    // View permission
    if (this.VIEW_CLASS_KEY) {
      let result = this.format({
        clas: clas,
        key: key,
        value: value,
        arrow: arrow,
      });
      // Write result
      return console.log.bind(console, result, style1, this.STYLE_OPRATION, style2, this.STYLE_OPRATION, style3);
    }
  }

  static log (string = null, align = this.ALIGN_LEFT, style = this.STYLE_LOG) {
    // View permission
    if (this.VIEW) {
      if (string == null) {
        style = this.STYLE_OPRATION;
      }
      let result = this.format({
        text: string,
        align: align
      });
      return console.log.bind(console, `%c${result}`, style);
    }
  }

  static format ({
    text = null,
    message = null,
    align = Log.ALIGN_LEFT,
    arrow = Log.ARROW_OUTPUT,
    clas = null,
    key = null,
    value = null,
  }) {

    let result = '';

    if (clas != null && key != null) {
      // Class Key

      result = '%c';
      result += clas;
      for (let i = 0; i < this.CLASS_LENGTH - clas.length; i++) {
        result += Log.SPACE;
      }
      result += '%c:';
      result += Log.SPACE;
      result += '%c';
      result += key;

      if (value != null) {
        // and Value

        for (let i = 0; i < this.KEY_LENGTH - key.length; i++) {
          result += Log.SPACE;
        }
        result += '%c';
        result += arrow;
        result += '%c';
        result += value;
      }
    } else {
      // Text
      if (text == null) {
        text = message;
      }

      if (text == null) {
        for (let i = 0; i < this.LENGTH; i++) {
          result += this.CHARACTER;
        }
      } else {
        if (align == this.ALIGN_LEFT) {
          result = text;

        } else if (align == this.ALIGN_CENTER) {
          const strLength = text.length - (2 * text.count('%c'));
          for (let i = 0; i < (this.LENGTH / 2) - (strLength / 2); i++) {
            result += Log.SPACE;
          }
          result += text;

        } else if (align == this.ALIGN_RIGHT) {
          const strLength = text.length - (2 * text.count('%c'));
          for (let i = 0; i < this.LENGTH - strLength; i++) {
            result += Log.SPACE;
          }
          result += text;
        }
      }

    }
    return result;
  }
}

class LocalStorage {
  // Check localStorage support
  static get SUPPORT () {
    let result = true;
    if (!localStorage) {
      result = false;
    }
    return result;
  }

  // Build key
  static buildKey (key) {
    return `${Project.KEY}.${key}`;
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
    key = this.buildKey(key);
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
    key = this.buildKey(key);
    // Check support
    if (this.SUPPORT) {
      Log.classKey('Local Storage', key, value, Log.ARROW_INPUT)();
      // Set
      localStorage.setItem(key, value);
    }
  }

  // removeItem from localStorage
  static removeItem (key = 'key') {
    key = this.buildKey(key);
    // Check support
    if (this.SUPPORT) {
      Log.classKey('Local Storage', key, 'remove', Log.ARROW_INPUT)();
      // Remove
      localStorage.removeItem(key);
    }
  }
}

class SHA256 {
  static getHash (string = null) {
    if (string != null) {
      return CryptoJS.SHA256(string).toString();
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
          keySize: Crypto.KEY_SIZE,
          iterations: Crypto.ITERATIONS
        }
      );
      return RESULT;
    }
    return null;
  }

  static getRand (keySize = Crypto.KEY_SIZE) {
    return CryptoJS.lib.WordArray.random(Crypto.KEY_SIZE);
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

  static getOption (iv = null, mode = Crypto.MODE, padding = Crypto.PADDING) {
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

    const DATA = Crypto.parseUTF8(_data);
    const PASSWORD = Crypto.parseUTF8(_password);

    const SALT = Crypto.getRand();
    const KEY = Crypto.getKey(PASSWORD, SALT);
    const IV = Crypto.getRand();
    const OPTIONS = Crypto.getOption(IV);

    const ENCRYPTED = CryptoJS.AES.encrypt(DATA, KEY, OPTIONS);

    result += Crypto.stringifyHex(SALT);
    result += (':' + Crypto.stringifyHex(IV));
    result += (':' + ENCRYPTED);

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

    const DATA = _data.split(':');

    const ENCRYPTED = Crypto.parseBase64(DATA[2]);
    const PASSWORD = Crypto.parseUTF8(_password);

    const SALT = Crypto.parseHex(DATA[0]);
    const IV = Crypto.parseHex(DATA[1]);
    const KEY = Crypto.getKey(PASSWORD, SALT);
    const OPTIONS = Crypto.getOption(IV);

    result = CryptoJS.AES.decrypt({'ciphertext': ENCRYPTED}, KEY, OPTIONS);
    result = Crypto.toUTF8(result);

    return result;
  }
}
