
// ----------------------------------------------------------------
// Static classes

class Log {
  // Common line setting
  static get LOG_LENGTH() { return 96; }
  static get LOG_CHARACTER() { return '-'; }

  // View permission
  static get LOG_VIEW() { return true; }
  static get LOG_VIEW_OBJECT() { return true; }
  static get LOG_VIEW_TIME() { return true; }
  static get LOG_VIEW_CLASS() { return true; }
  static get LOG_VIEW_CLASS_KEY() { return true; }
  static get LOG_VIEW_ERROR() { return true; }
  static get LOG_VIEW_CAUTION() { return true; }

  // Align definition
  static get ALIGN_LEFT() { return 0; }
  static get ALIGN_CENTER() { return 1; }
  static get ALIGN_RIGHT() { return 2; }

  // Arrow definition
  static get ARROW_OUTPUT() { return ' ---> '; }
  static get ARROW_INPUT() { return ' <--- '; }

  // Length definition
  static get CLASS_LENGTH() { return 24; }
  static get KEY_LENGTH() { return 24; }

  // Style definition
  static get STYLE_COLOR_RED() { return 'color:#f00;'; }
  static get STYLE_COLOR_GREEN() { return 'color:#0f0;'; }
  static get STYLE_COLOR_BLUE() { return 'color:#00f;'; }
  static get STYLE_COLOR_YELLOW() { return 'color:#ff0;'; }
  static get STYLE_COLOR_MAGENTA() { return 'color:#f0f;'; }
  static get STYLE_COLOR_CYAN() { return 'color:#0ff;'; }

  static get STYLE_TIME() { return 'color:#333;font-weight:bold;'; }

  static get STYLE_CLASS() { return 'color:#222;'; }
  static get STYLE_KEY() { return 'color:#828;'; }
  static get STYLE_VALUE() { return 'color:#228;'; }

  static get STYLE_ERROR_LINE() { return 'color:#f00;'; }
  static get STYLE_ERROR_HEADER() { return 'color:#a00;'; }
  static get STYLE_ERROR_CONTENT() { return 'color:#111;'; }

  static get STYLE_CAUTION_LINE() { return 'color:#aa0;'; }
  static get STYLE_CAUTION_HEADER() { return 'color:#880;'; }
  static get STYLE_CAUTION_CONTENT() { return 'color:#111;'; }

  static logError(...array) {
    // View permission
    if (this.LOG_VIEW_ERROR) {
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
      // Write title
      this.log('Error', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER);

      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_ERROR_CONTENT);
      }

      // Write exit
      this.log('Exit', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER);
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
    }
  }

  static logCaution(...array) {
    // View permission
    if (this.LOG_VIEW_CAUTION) {
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
      // Write title
      this.log('Caution', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER);

      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_CAUTION_CONTENT);
      }

      // Write exit
      this.log('Exit', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER);
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
    }
  }

  static logErrorCommon(obj = null, ...array) {
    // View permission
    if (this.LOG_VIEW_ERROR) {
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
      // Write title
      this.log('Error', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER);

      // Write info
      this.logObj(obj);
      this.logClass('Class Name', obj.constructor.name);
      this.logClass('Object Name', obj.NAME);

      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
      // Write title
      this.log('Message', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER);

      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_ERROR_CONTENT);
      }

      // Write exit
      this.log('Exit', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER);
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
    }
  }

  static logCautionCommon(obj = null, ...array) {
    // View permission
    if (this.LOG_VIEW_CAUTION) {
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
      // Write title
      this.log('Caution', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER);

      // Write info
      this.logObj(obj);
      this.logClass('Class Name', obj.constructor.name);
      this.logClass('Object Name', obj.NAME);

      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
      // Write title
      this.log('Message', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER);

      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_CAUTION_CONTENT);
      }

      // Write exit
      this.log('Exit', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER);
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
    }
  }

  static logObj(_obj) {
    // View permission
    if (this.LOG_VIEW_OBJECT) {
      // Write object
      console.log(_obj);
    }
  }

  static logTime(_format) {
    // View permission
    if (this.LOG_VIEW_TIME) {
      // Write object
      this.log(new Date().formatString(), this.ALIGN_CENTER, this.STYLE_TIME);
    }
  }

  static logClass(_class = 'Class', _value = 'value', _style1 = this.STYLE_CLASS, _style2 = this.STYLE_VALUE) {
    // View permission
    if (this.LOG_VIEW_CLASS) {
      // Set style
      let result = '%c';
      // Write class
      result += _class;
      // Set spacing
      const classLength = _class.length;
      for (let i = 0; i < this.CLASS_LENGTH - classLength; i++) {
        result += ' ';
      }
      // Set style
      result += ': %c';
      // Write value
      result += _value;

      // Write result
      console.log(result, _style1, _style2);
    }
  }

  static logClassKey(_class = 'Class', _key = 'key', _value = 'value', _arrow = Log.ARROW_OUTPUT, _style1 = this.STYLE_CLASS, _style2 = this.STYLE_KEY, _style3 = this.STYLE_VALUE) {
    // View permission
    if (this.LOG_VIEW_CLASS_KEY) {
      // Set style
      let result = '%c';
      // Write class
      result += _class;
      // Set spacing
      const classLength = _class.length;
      for (let i = 0; i < this.CLASS_LENGTH - classLength; i++) {
        result += ' ';
      }
      // Set style
      result += ': %c';
      // Write key
      result += _key;
      // Set spacing
      const keyLength = _key.length;
      for (let i = 0; i < this.KEY_LENGTH - keyLength; i++) {
        result += ' ';
      }
      // Set style
      result += '%c';
      // Write arrow
      result += _arrow;
      // Set style
      result += '%c';
      // Write value
      result += _value;

      // Write result
      console.log(result, _style1, _style2, this.STYLE_RESET, _style3);
    }
  }

  static log(_string, _align = this.ALIGN_LEFT, _style = this.STYLE_RESET) {
    // View permission
    if (this.LOG_VIEW) {
      let result = '';

      // String is null
      if (_string == null) {
        // Draw line
        for (let i = 0; i < this.LOG_LENGTH; i++) {
          result += this.LOG_CHARACTER;

        }
        // String exists
      } else {
        // Align left
        if (_align == this.ALIGN_LEFT) {
          // Write string
          result = _string;

          // Align center
        } else if (_align == this.ALIGN_CENTER) {
          // Set spacing
          const strLength = _string.length;
          for (let i = 0; i < (this.LOG_LENGTH / 2) - (strLength / 2); i++) {
            result += ' ';
          }
          // Write string
          result += _string;

          // Align right
        } else if (_align == this.ALIGN_RIGHT) {
          // Set spacing
          const strLength = _string.length;
          for (let i = 0; i < this.LOG_LENGTH - strLength; i++) {
            result += ' ';
          }
          // Write string
          result += _string;
        }
      }

      // Set style
      // Write result
      console.log(`%c${result}`, _style);
    }
  }
}

class LocalStorage {
  // Check localStorage support
  static get SUPPORT() {
    let result = true;
    if (!localStorage) {
      result = false;
    }
    return result;
  }

  // Build key
  static buildKey(_key) {
    return `${Project.NAME_KEY}.${_key}`;
  }

  // All clear localStorage
  static clear() {
    // Check support
    if (this.SUPPORT) {
      Log.logClass('Local Storage', 'All Clear.');
      // Clear
      localStorage.clear();
    }
  }

  // getItem from localStorage
  static getItem(_key = 'key') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      const _val = localStorage.getItem(_key);
      Log.logClassKey('Local Storage', _key, _val, Log.ARROW_OUTPUT);
      // Get
      return _val;
    }
  }

  // setItem from localStorage
  static setItem(_key = 'key', _val = 'value') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      Log.logClassKey('Local Storage', _key, _val, Log.ARROW_INPUT);
      // Set
      localStorage.setItem(_key, _val);
    }
  }

  // removeItem from localStorage
  static removeItem(_key = 'key') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      Log.logClassKey('Local Storage', _key, 'null', Log.ARROW_INPUT);
      // Remove
      localStorage.removeItem(_key);
    }
  }
}

class SHA256 {
  static getHash(_string = null) {
    if (_string != null) {
      return CryptoJS.SHA256(_string).toString();
    }
    return null;
  }
}

class MD5 {
  static getHash(_string = null) {
    if (_string != null) {
      return CryptoJS.MD5(_string).toString();
    }
    return null;
  }
}

class Validate {
  static checkMaxLength(
    _string = null,
    _digit = null
  ) {
    if (_string != null && _digit != null) {
      if (_string.length <= _digit) {
        return true;
      }
    }
    return false;
  }

  static checkMinLength(
    _string = null,
    _digit = null
  ) {
    if (_string != null && _digit != null) {
      if (_string.length >= _digit) {
        return true;
      }
    }
    return false;
  }

  static checkIncludeNumber(
    _string = null
  ) {
    if (_string != null) {
      if (_string.match(/[0-9]/)) {
        return true;
      }
    }
    return false;
  }

  static checkIncludeAlphabet(
    _string = null
  ) {
    if (_string != null) {
      if (_string.match(/[a-zA-Z]/)) {
        return true;
      }
    }
    return false;
  }

  static checkIncludeChar(
    _string = null,
    _char = null
  ) {
    if (_string != null && _char != null) {
      if (~_string.indexOf(_char)) {
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
      return {iv: iv, mode: mode, padding: padding};
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
