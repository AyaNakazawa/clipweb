
// ----------------------------------------------------------------
// Common Class

class CommonClass {
  constructor (
    initSetting = {},
    common = {
      NAME: 'Common Class',
      VIEW_NAME: false,
      VIEW_OBJECT: false
    }
  ) {
    Object.assign(this, common, initSetting);

    this.OBJECT = {};

    if (this.VIEW_OBJECT) {
      this.logNameModel();

    } else if (this.VIEW_NAME) {
      this.logName();

    }
  }

  logName (name = null) {
    Log.line()();
    if (name != null) {
      Log.log(name, Log.ALIGN_CENTER)();
    } else {
      Log.log(this.NAME, Log.ALIGN_CENTER)();
    }
    // Method chain
    return this;
  }

  logModel (model = null) {
    if (model != null) {
      Log.obj(model)();
    } else {
      Log.obj(this)();
    }
    // Method chain
    return this;
  }

  logNameModel (name = null, model = null) {
    this.logName(name);
    this.logModel(model);
    // Method chain
    return this;
  }

  log (...args) {
    if (args.length == 0) {
      return Log.line();
    } else if (args.length == 1) {
      return Log.class(this.NAME, args[0]);
    } else if (args.length == 2) {
      return Log.classKey(this.NAME, args[0], args[1]);
    } else if (args.length == 3) {
      return Log.classKey(this.NAME, args[0], args[1], args[2]);
    } else {
      this.logError(arguments, 'many unknown arguments')();
    }
  }
}

// ----------------------------------------------------------------
// Model

class CommonModel extends CommonClass {
  constructor (
    initSetting = {},
    common = {
      NAME: 'Common Object'
    }
  ) {
    super(initSetting, common);

    this.COMMON = {};
    this.generateId();

    this.COMMON.BODY = 'html, body';
    this.COMMON.MAIN = 'main';
    this.COMMON.ACTIVE = 'active';
    this.COMMON.HOVER = 'hover';
    this.COMMON.CURRENT = 'current';
    this.COMMON.DISPLAY_NONE = 'display-none';
    this.COMMON.OFFSET = 0;

    this.COMMON.MESSAGE = {};

    this.COMMON.VIEW = null;

    this.COMMON.TYPE = {};
    this.COMMON.TYPE.APPEND = 'append';
    this.COMMON.TYPE.PREPEND = 'prepend';
    this.COMMON.TYPE.AFTER = 'after';
    this.COMMON.TYPE.BEFORE = 'before';

    this.COMMON.SPEED = {};
    this.COMMON.SPEED.CLEAR = 0;
    this.COMMON.SPEED.SHOW = 500;
    this.COMMON.SPEED.HIDE = 500;
    this.COMMON.SPEED.SCROLL = 750;

    this.COMMON.DELAY = {};
    this.COMMON.DELAY.CLEAR = 0;
    this.COMMON.DELAY.SHOW = 0;
    this.COMMON.DELAY.HIDE = 0;
    this.COMMON.DELAY.SCROLL = 0;
    this.COMMON.DELAY.ADD = 0;
    this.COMMON.DELAY.APPEND = 0;
    this.COMMON.DELAY.PREPEND = 0;
    this.COMMON.DELAY.REMOVE = 0;

    this.COMMON.EFFECT = {};
    this.COMMON.EFFECT.SHOW = 'show';
    this.COMMON.EFFECT.FADE_IN = 'fadeIn';
    this.COMMON.EFFECT.SLIDE_DOWN = 'slideDown';
    this.COMMON.EFFECT.HIDE = 'hide';
    this.COMMON.EFFECT.FADE_OUT = 'fadeOut';
    this.COMMON.EFFECT.SLIDE_UP = 'slideUp';

    this.COMMON.EFFECT.DEFAULT = {};
    this.COMMON.EFFECT.DEFAULT.SHOW = this.COMMON.EFFECT.SLIDE_DOWN;
    this.COMMON.EFFECT.DEFAULT.HIDE = this.COMMON.EFFECT.SLIDE_UP;
    this.COMMON.EFFECT.DEFAULT.SCROLL = false;

    this.COMMON.EFFECT.DEFAULT.MOVE = {};
    this.COMMON.EFFECT.DEFAULT.MOVE.VIEW = true;
    this.COMMON.EFFECT.DEFAULT.MOVE.SCROLL = true;

    this.COMMON.EASING = {};
    this.COMMON.EASING.CLEAR = 'easeOutCubic';
    this.COMMON.EASING.SHOW = 'easeOutCubic';
    this.COMMON.EASING.HIDE = 'easeOutCubic';
    this.COMMON.EASING.SCROLL = 'easeInOutCubic';

    this.COMMON.SELECTOR = {};
    this.COMMON.SELECTOR.ROOT = document;
    this.COMMON.SELECTOR.AREA = '#area';

    this.COMMON.KEYCODE = {
      '1': 49,
      '2': 50,
      '3': 51,
      '4': 52,
      '5': 53,
      '6': 54,
      '7': 55,
      '8': 56,
      '9': 57,
      '0': 48,
      'A': 65,
      'B': 66,
      'C': 67,
      'D': 68,
      'E': 69,
      'F': 70,
      'G': 71,
      'H': 72,
      'I': 73,
      'J': 74,
      'K': 75,
      'L': 76,
      'M': 77,
      'N': 78,
      'O': 79,
      'P': 80,
      'Q': 81,
      'R': 82,
      'S': 83,
      'T': 84,
      'U': 85,
      'V': 86,
      'W': 87,
      'X': 88,
      'Y': 89,
      'Z': 90,
      'MINUS': 173,
      'CARET': 160,
      'BACKSLASH': 220,
      'AT': 64,
      'SQUARE_BRACKET_START': 219,
      'SQUARE_BRACKET_END': 221,
      'SEMICOLON': 59,
      'COLON': 58,
      'COMMA': 188,
      'DOT': 190,
      'SLASH': 191,
      'NUM_1': 97,
      'NUM_2': 98,
      'NUM_3': 99,
      'NUM_4': 100,
      'NUM_5': 101,
      'NUM_6': 102,
      'NUM_7': 103,
      'NUM_8': 104,
      'NUM_9': 105,
      'NUM_0': 96,
      'NUM_/': 111,
      'NUM_*': 106,
      'NUM_-': 109,
      'NUM_+': 107,
      'NUM_.': 110,
      'NUM_ENTER': 13,
      'F1': 112,
      'F2': 113,
      'F3': 114,
      'F4': 115,
      'F5': 116,
      'F6': 117,
      'F7': 118,
      'F8': 119,
      'F9': 120,
      'F10': 121,
      'F11': 122,
      'F12': 123,
      'UP': 38,
      'DOWN': 40,
      'LEFT': 37,
      'RIGHT': 39,
      'ENTER': 13,
      'SHIFT': 16,
      'CTRL': 17,
      'ALT': 18,
      'SPACE': 32,
      'BACKSPACE': 8,
      'ESC': 27,
      'TAB': 9,
      'CAPSLOCK': 20,
      'NUMLOCK': 144,
      'INSERT': 45,
      'DELETE': 46,
      'HOME': 36,
      'END': 35,
      'PAGEUP': 33,
      'PAGEDOWN': 34,
      'SCROLLLOCK': 145,
      'WINDOWS': 91,
    };

    this.SELECTOR = {};
    this.SELECTOR.AREA = this.COMMON.SELECTOR.AREA;

    this.TRIGGER = {};
    this.generateTrigger();

  }

  // Add var to Instance
  setKey (
    _key = 'KEY',
    _val = 'VALUE'
  ) {
    this[_key] = _val;
    // Method chain
    return this;
  }

  // Get var from Instance
  getKey (
    _key = 'KEY'
  ) {
    return this[_key];
  }

  // Remove var from Instance
  removeKey (
    _key = 'KEY'
  ) {
    this[_key] = undefined;
    // Method chain
    return this;
  }

  addMessage (
    obj = null,
    string = null
  ) {
    if (Object.getType(obj) == 'Object') {
      for (let key of Object.keys(obj)) {
        this.COMMON.MESSAGE[key] = obj[key];
      }
    } else if (Object.getType(obj) == 'Number') {
      this.COMMON.MESSAGE[obj] = string;
    }
    return this;
  }

  getMessage (
    code = null,
    base = null,
    lang = false
  ) {
    if (code == null) {
      Log.error(arguments, 'Message code is null')();
      return;
    }
    let result = base;
    if (typeof this.COMMON.MESSAGE[code] != 'undefined') {
      if (lang) {
        if (LN.check(this.COMMON.MESSAGE[code])) {
          result = LN.get(this.COMMON.MESSAGE[code]);
        }
      } else {
        result = this.COMMON.MESSAGE[code];
      }
    }
    return result;
  }

  generateId () {
    this.ID = Random.hex(7);
    this.COMMON.ID = this.ID;
  }

  generateTrigger () {
    this.TRIGGER.VIEW = {};
    this.TRIGGER.VIEW.SHOW = `${Project.KEY}.${this.ID}.view.show`;
    this.TRIGGER.VIEW.HIDE = `${Project.KEY}.${this.ID}.view.hide`;
    this.TRIGGER.VIEW.CLEAR = `${Project.KEY}.${this.ID}.view.clear`;
    this.TRIGGER.VIEW.REMOVE = `${Project.KEY}.${this.ID}.view.remove`;
    this.TRIGGER.VIEW.SCROLL = `${Project.KEY}.${this.ID}.view.scroll`;

    this.TRIGGER.POST = {};
    this.TRIGGER.POST.SUCCESS = `${Project.KEY}.${this.ID}.post.success`;
    this.TRIGGER.POST.ERROR = `${Project.KEY}.${this.ID}.post.error`;
    this.TRIGGER.POST.COMPLETE = `${Project.KEY}.${this.ID}.post.complete`;
  }
}

// ----------------------------------------------------------------
// View

class CommonView extends CommonClass {
  constructor (
    initSetting = {},
    common = {
      NAME: 'Common View'
    }
  ) {
    super(initSetting, common);
  }

  move ({
    target = null,
    mode = this.MODEL.COMMON.TYPE.APPEND,
    parent = this.MODEL.COMMON.MAIN,
    selector = this.MODEL.SELECTOR.AREA,
    view = this.MODEL.COMMON.EFFECT.DEFAULT.MOVE.VIEW,
    scroll = this.MODEL.COMMON.EFFECT.DEFAULT.MOVE.SCROLL
  } = {}) {
    target = Object.getArg(arguments, 0, 'String', target);
    mode = Object.getArg(arguments, 1, 'String', mode);
    parent = Object.getArg(arguments, 2, 'String', parent);
    selector = Object.getArg(arguments, 3, 'String', selector);
    if (mode == null || parent == null || selector == null) {
      Log.error(arguments, 'Need mode & parent & selector of arguments. X(')();
      return;
    }
    const _HTML = $(selector)[0]['outerHTML'];
    $(selector).remove();

    if (target == null) {
      this.VIEW.hide({ selector: selector, speed: 0 });
      if (mode == this.MODEL.COMMON.TYPE.APPEND) {
        this.VIEW.append({ selector: parent, element: _HTML });
      } else if (mode == this.MODEL.COMMON.TYPE.PREPEND) {
        this.VIEW.prepend({ selector: parent, element: _HTML });
      } else {
        Log.error(arguments, 'unknown mode X(')();
        return;
      }
      this.VIEW.setView({ selector: selector, view: view, scroll: scroll });
    } else {
      const _HTMLS = [];
      const _VISIBLES = [];
      const _SELECTORS = [];
      let _append = false;
      const _CHILDREN = $(parent).children();
      for (let child of _CHILDREN) {
        if (target == `#${$(child)[0]['id']}`) {
          if (mode == this.MODEL.COMMON.TYPE.AFTER) {
            _append = true;
          } else if (mode == this.MODEL.COMMON.TYPE.BEFORE) {
            _HTMLS.push(_HTML);
            _VISIBLES.push(view);
            _SELECTORS.push(selector);
          } else {
            Log.error(arguments, 'unknown mode X(')();
            return;
          }
        } else if (_append) {
          _HTMLS.push(_HTML);
          _VISIBLES.push(view);
          _SELECTORS.push(selector);
          _append = false;
        }
        _HTMLS.push($(child)[0]['outerHTML']);
        _VISIBLES.push($(child).is(':visible'));
        _SELECTORS.push(`#${$(child)[0]['id']}`);
        this.VIEW.hide({ selector: `#${$(child)[0]['id']}`, speed: 0 });
        $(child).remove();
      }
      for (let index in _HTMLS) {
        this.VIEW.append({ selector: parent, element: _HTMLS[index] });
        $(parent).append();
        if (!_VISIBLES[index]) {
          this.VIEW.hide({ selector: _SELECTORS[index], speed: 0 });
        }
      }
      this.VIEW.setView({ selector: selector, view: view, scroll: scroll });
    }
  }

  add ({
    mode = this.MODEL.COMMON.TYPE.APPEND,
    selector = this.MODEL.SELECTOR.AREA,
    element = null,
    template = null,
    model = null,
    delay = this.MODEL.COMMON.DELAY.ADD
  } = {}) {
    mode = Object.getArg(arguments, 0, 'String', mode);
    selector = Object.getArg(arguments, 1, 'String', selector);
    element = Object.getArg(arguments, 2, 'String', element);
    template = Object.getArg(arguments, 3, 'String', template);
    model = Object.getArg(arguments, 4, 'Object', model);
    delay = Object.getArg(arguments, 5, 'Number', delay);
    if (selector == null || element == null && (template == null || model == null)) {
      Log.error(arguments)();
      return;
    }

    if (mode == this.MODEL.COMMON.TYPE.APPEND || mode == this.MODEL.COMMON.TYPE.AFTER) {
      this.append({
        selector: selector,
        element: element,
        template: template,
        model: model,
        delay: delay
      });
    } else if (mode == this.MODEL.COMMON.TYPE.PREPEND || mode == this.MODEL.COMMON.TYPE.BEFORE) {
      this.prepend({
        selector: selector,
        element: element,
        template: template,
        model: model,
        delay: delay
      });
    } else {
      Log.error(arguments, 'unknown mode')();
      return;
    }
    // Method chain
    return this;
  }

  append ({
    selector = this.MODEL.SELECTOR.AREA,
    element = null,
    template = null,
    model = null,
    delay = this.MODEL.COMMON.DELAY.APPEND
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    element = Object.getArg(arguments, 1, 'String', element);
    template = Object.getArg(arguments, 2, 'String', template);
    model = Object.getArg(arguments, 3, 'Object', model);
    delay = Object.getArg(arguments, 4, 'Number', delay);
    if (selector == null || element == null && (template == null || model == null)) {
      Log.error(arguments)();
      return;
    }
    if (template != null && model != null) {
      element = View.getTemplate({
        template: template,
        model: model
      });
    }

    if (delay > 0) {
      $(selector).delay(delay).append(element);
    } else {
      $(selector).append(element);
    }
    // Method chain
    return this;
  }

  prepend ({
    selector = this.MODEL.SELECTOR.AREA,
    element = null,
    template = null,
    model = null,
    delay = this.MODEL.COMMON.DELAY.PREPEND
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    element = Object.getArg(arguments, 1, 'String', element);
    template = Object.getArg(arguments, 2, 'String', template);
    model = Object.getArg(arguments, 3, 'Object', model);
    delay = Object.getArg(arguments, 4, 'Number', delay);
    if (selector == null || element == null && (template == null || model == null)) {
      Log.error(arguments)();
      return;
    }
    if (template != null && model != null) {
      element = View.getTemplate({
        template: template,
        model: model
      });
    }

    if (delay > 0) {
      $(selector).delay(delay).prepend(element);
    } else {
      $(selector).prepend(element);
    }
    // Method chain
    return this;
  }

  remove ({
    parent = this.MODEL.SELECTOR.AREA,
    selector = null,
    delay = this.MODEL.COMMON.DELAY.REMOVE
  } = {}) {
    parent = Object.getArg(arguments, 0, 'String', parent);
    selector = Object.getArg(arguments, 1, 'String', selector);
    delay = Object.getArg(arguments, 2, 'Number', delay);

    let _selector = `${parent} ${selector}`;
    if (selector == null) {
      _selector = parent;
    }
    super.log(_selector, 'Remove', Log.ARROW_INPUT)();

    if (delay > 0) {
      $(_selector).delay(delay).remove();
    } else {
      $(_selector).remove();
    }
    // Method chain
    return this;
  }

  skip (
    selector = this.MODEL.SELECTOR.AREA
  ) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    if (selector == null) {
      Log.error(arguments)();
      return;
    }

    $(selector).finish();
    // Method chain
    return this;
  }

  stop (
    selector = this.MODEL.SELECTOR.AREA,
    clearQueue = false,
    jumpToEnd = false
  ) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    clearQueue = Object.getArg(arguments, 1, 'Boolean', clearQueue);
    jumpToEnd = Object.getArg(arguments, 2, 'Boolean', jumpToEnd);
    if (selector == null) {
      Log.error(arguments)();
      return;
    }

    $(selector).stop(clearQueue, jumpToEnd);
    // Method chain
    return this;
  }

  clear ({
    selector = this.MODEL.SELECTOR.AREA,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.HIDE,
    speed = this.MODEL.COMMON.SPEED.CLEAR,
    delay = this.MODEL.COMMON.DELAY.CLEAR,
    easing = this.MODEL.COMMON.EASING.CLEAR
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    type = Object.getArg(arguments, 1, 'String', type);
    speed = Object.getArg(arguments, 2, 'Number', speed);
    delay = Object.getArg(arguments, 3, 'Number', delay);
    easing = Object.getArg(arguments, 4, 'String', easing);
    if (selector == null) {
      Log.error(arguments)();
      return;
    }
    if (speed > 0 || this.getView()) {
      this.setView({
        view: false,
        selector: selector,
        type: type,
        speed: speed,
        delay: delay,
        easing: easing
      });
    }

    super.log(selector, 'Clear', Log.ARROW_INPUT)();
    $(selector).empty();
    // Method chain
    return this;
  }

  show ({
    selector = this.MODEL.SELECTOR.AREA,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.SHOW,
    speed = this.MODEL.COMMON.SPEED.SHOW,
    delay = this.MODEL.COMMON.DELAY.SHOW,
    scroll = this.MODEL.COMMON.EFFECT.DEFAULT.SCROLL,
    easing = this.MODEL.COMMON.EASING.SHOW
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    type = Object.getArg(arguments, 1, 'String', type);
    speed = Object.getArg(arguments, 2, 'Number', speed);
    delay = Object.getArg(arguments, 3, 'Number', delay);
    scroll = Object.getArg(arguments, 4, 'Boolean', scroll);
    easing = Object.getArg(arguments, 5, 'String', easing);
    if (selector == null) {
      Log.error(arguments)();
      return;
    }

    // Method chain
    return this.setView({
      view: true,
      selector: selector,
      type: type,
      speed: speed,
      delay: delay,
      scroll: scroll,
      easing: easing
    });
  }

  hide ({
    selector = this.MODEL.SELECTOR.AREA,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.HIDE,
    speed = this.MODEL.COMMON.SPEED.HIDE,
    delay = this.MODEL.COMMON.DELAY.HIDE,
    easing = this.MODEL.COMMON.EASING.HIDE
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    type = Object.getArg(arguments, 1, 'String', type);
    speed = Object.getArg(arguments, 2, 'Number', speed);
    delay = Object.getArg(arguments, 3, 'Number', delay);
    easing = Object.getArg(arguments, 4, 'String', easing);
    if (selector == null) {
      Log.error(arguments)();
      return;
    }

    // Method chain
    return this.setView({
      view: false,
      selector: selector,
      type: type,
      speed: speed,
      delay: delay,
      easing: easing
    });
  }

  setView ({
    selector = this.MODEL.SELECTOR.AREA,
    speed = null,
    delay = null,
    type = null,
    easing = null,
    view = null,
    scroll = false,
    callback = null
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    speed = Object.getArg(arguments, 1, 'Number', speed);
    delay = Object.getArg(arguments, 2, 'Number', delay);
    type = Object.getArg(arguments, 3, 'String', type);
    easing = Object.getArg(arguments, 4, 'String', easing);
    view = Object.getArg(arguments, 5, 'Boolean', view);
    scroll = Object.getArg(arguments, 6, 'Boolean', scroll);
    callback = Object.getArg(arguments, 7, 'Function', callback);
    if (view == null) {
      Log.error(arguments)();
      return;
    }
    super.log(selector, view, Log.ARROW_INPUT)();

    // skip
    this.skip(selector);

    // type
    if (type == null) {
      if (view) {
        type = this.MODEL.COMMON.EFFECT.DEFAULT.SHOW;
      } else if (!view) {
        type = this.MODEL.COMMON.EFFECT.DEFAULT.HIDE;
      }
    }

    // speed
    if (speed == null) {
      if (view) {
        speed = this.MODEL.COMMON.SPEED.SHOW;
      } else if (!view) {
        speed = this.MODEL.COMMON.SPEED.HIDE;
      }
    }

    // delay
    if (delay == null) {
      if (view) {
        delay = this.MODEL.COMMON.DELAY.SHOW;
      } else if (!view) {
        delay = this.MODEL.COMMON.DELAY.HIDE;
      }
    }

    // easing
    if (easing == null) {
      if (view) {
        easing = this.MODEL.COMMON.EASING.SHOW;
      } else if (!view) {
        easing = this.MODEL.COMMON.EASING.HIDE;
      }
    }

    if (view && this.getView()) {
      $(selector).hide({ duration: 0 });
    }

    // view
    this.MODEL.COMMON.VIEW = view;

    if (view) {
      // show
      if (type == this.MODEL.COMMON.EFFECT.SHOW) {
        if (delay > 0) {
          if (callback != null) {
            $(selector).delay(delay).show(speed, easing, callback);
          } else {
            $(selector).delay(delay).show({
              duration: speed,
              easing: easing
            });
          }
        } else {
          if (callback != null) {
            $(selector).show(speed, easing, callback);
          } else {
            $(selector).show({
              duration: speed,
              easing: easing
            });
          }
        }

      } else if (type == this.MODEL.COMMON.EFFECT.SLIDE_DOWN) {
        if (delay > 0) {
          if (callback != null) {
            $(selector).delay(delay).slideDown(speed, easing, callback);
          } else {
            $(selector).delay(delay).slideDown({
              duration: speed,
              easing: easing
            });
          }
        } else {
          if (callback != null) {
            $(selector).slideDown(speed, easing, callback);
          } else {
            $(selector).slideDown({
              duration: speed,
              easing: easing
            });
          }
        }

      } else if (type == this.MODEL.COMMON.EFFECT.FADE_IN) {
        if (delay > 0) {
          if (callback != null) {
            $(selector).delay(delay).fadeIn(speed, easing, callback);
          } else {
            $(selector).delay(delay).fadeIn({
              duration: speed,
              easing: easing
            });
          }
        } else {
          if (callback != null) {
            $(selector).fadeIn(speed, easing, callback);
          } else {
            $(selector).fadeIn({
              duration: speed,
              easing: easing
            });
          }
        }

      } else {
        Log.error(arguments, 'unknown type.')();
        return;
      }
    } else if (!view) {
      // hide
      if (type == this.MODEL.COMMON.EFFECT.HIDE) {
        if (delay > 0) {
          if (callback != null) {
            $(selector).delay(delay).hide(speed, easing, callback);
          } else {
            $(selector).delay(delay).hide({
              duration: speed,
              easing: easing
            });
          }
        } else {
          if (callback != null) {
            $(selector).hide(speed, easing, callback);
          } else {
            $(selector).hide({
              duration: speed,
              easing: easing
            });
          }
        }

      } else if (type == this.MODEL.COMMON.EFFECT.SLIDE_UP) {
        if (delay > 0) {
          if (callback != null) {
            $(selector).delay(delay).slideUp(speed, easing, callback);
          } else {
            $(selector).delay(delay).slideUp({
              duration: speed,
              easing: easing
            });
          }
        } else {
          if (callback != null) {
            $(selector).slideUp(speed, easing, callback);
          } else {
            $(selector).slideUp({
              duration: speed,
              easing: easing
            });
          }
        }

      } else if (type == this.MODEL.COMMON.EFFECT.FADE_OUT) {
        if (delay > 0) {
          if (callback != null) {
            $(selector).delay(delay).fadeOut(speed, easing, callback);
          } else {
            $(selector).delay(delay).fadeOut({
              duration: speed,
              easing: easing
            });
          }
        } else {
          if (callback != null) {
            $(selector).fadeOut(speed, easing, callback);
          } else {
            $(selector).fadeOut({
              duration: speed,
              easing: easing
            });
          }
        }

      } else {
        Log.error(arguments, 'unknown type.')();
        return;
      }
    }

    if (scroll) {
      this.scroll({ selector: selector });
    }

    // Method chain
    return this;
  }

  getView () {
    const result = this.MODEL.COMMON.VIEW;
    if (result != true && result != false) {
      Log.caution(arguments, 'unknown current view.')();
    }
    return result;
  }

  initView () {
    this.MODEL.COMMON.VIEW = $(this.MODEL.SELECTOR.AREA).is(':visible');
    // Method chain
    return this;
  }

  scroll ({
    selector = this.MODEL.SELECTOR.AREA,
    speed = this.MODEL.COMMON.SPEED.SCROLL,
    delay = this.MODEL.COMMON.DELAY.SCROLL,
    easing = this.MODEL.COMMON.EASING.SCROLL,
    offset = this.MODEL.COMMON.OFFSET,
    callback = null
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    speed = Object.getArg(arguments, 1, 'Number', speed);
    delay = Object.getArg(arguments, 2, 'Number', delay);
    easing = Object.getArg(arguments, 3, 'String', easing);
    offset = Object.getArg(arguments, 4, 'Number', offset);
    callback = Object.getArg(arguments, 5, 'Function', callback);
    if (selector == null || speed == null || easing == null) {
      Log.error(arguments)();
      return;
    }
    super.log(selector, 'Scroll')();

    // skip
    this.skip(this.MODEL.COMMON.BODY);

    const _TOP = $(selector).offset().top + offset;

    if (delay > 0) {
      if (callback != null) {
        $(this.MODEL.COMMON.BODY).delay(delay).animate(
          {
            scrollTop: _TOP
          },
          speed,
          easing,
          callback
        );
      } else {
        $(this.MODEL.COMMON.BODY).delay(delay).animate(
          {
            scrollTop: _TOP
          },
          {
            duration: speed,
            easing: easing
          }
        );
      }
    } else {
      if (callback != null) {
        $(this.MODEL.COMMON.BODY).animate(
          {
            scrollTop: _TOP
          },
          speed,
          easing,
          callback
        );
      } else {
        $(this.MODEL.COMMON.BODY).animate(
          {
            scrollTop: _TOP
          },
          {
            duration: speed,
            easing: easing
          }
        );
      }
    }
    // Method chain
    return this;
  }

  generateAlert ({
    selector = this.MODEL.SELECTOR.AREA,
    type = View.ALERT_SUCCESS,
    message = null,
    close = true
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    type = Object.getArg(arguments, 1, 'String', type);
    message = Object.getArg(arguments, 2, 'String', message);
    close = Object.getArg(arguments, 3, 'Boolean', close);
    if (selector == null) {
      Log.error(arguments)();
      return;
    }

    $(selector).append(View.getAlert({
      type: type,
      message: message,
      close: close
    }));
    // Method chain
    return this;
  }

  generateLoading ({
    selector = this.MODEL.SELECTOR.AREA,
    header = 'Loading'
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    header = Object.getArg(arguments, 1, 'String', header);
    if (selector == null) {
      Log.error(arguments)();
      return;
    }

    $(selector).append(View.getLoading({
      header: header
    }));
    // Method chain
    return this;
  }

  generateHeader ({
    selector = this.MODEL.SELECTOR.AREA,
    header = null,
    id = null,
    buttonIcon = null,
    buttonTabindex = null,
    buttonId = null,
    buttonClass = null
  } = {}) {
    selector = Object.getArg(arguments, 0, 'String', selector);
    header = Object.getArg(arguments, 1, 'String', header);
    id = Object.getArg(arguments, 2, 'String', id);
    buttonIcon = Object.getArg(arguments, 3, 'String', buttonIcon);
    buttonTabindex = Object.getArg(arguments, 4, 'Number', buttonTabindex);
    buttonId = Object.getArg(arguments, 5, 'String', buttonId);
    buttonClass = Object.getArg(arguments, 6, 'String', buttonClass);

    if (selector == null || header == null) {
      Log.error(arguments)();
      return;
    }

    $(selector).prepend(Content.getHeader({
      id: id,
      header: header,
      buttonIcon: buttonIcon,
      buttonTabindex: buttonTabindex,
      buttonId: buttonId,
      buttonClass: buttonClass
    }));
    // Method chain
    return this;
  }
}

// ----------------------------------------------------------------
// Event

class CommonEvent extends CommonClass {
  constructor (
    initSetting = {},
    common = {
      NAME: 'Common Event'
    }
  ) {
    super(initSetting, common);
  }

  setOn ({
    trigger = 'click',
    selector = null,
    func = () => {}
  } = {}) {
    if (selector != null) {
      if (Object.getType(trigger) == 'Array') {
        for (let _triggerStr of trigger) {
          $(this.MODEL.COMMON.SELECTOR.ROOT).on(_triggerStr, selector, func);
        }
      } else if (Object.getType(trigger) == 'String') {
        $(this.MODEL.COMMON.SELECTOR.ROOT).on(trigger, selector, func);
      }
    } else {
      $(this.MODEL.COMMON.SELECTOR.ROOT).on(trigger, func);
    }
    // Method chain
    return this;
  }

  setOff ({
    trigger = 'click',
    selector = null
  } = {}) {
    if (selector != null) {
      if (Object.getType(trigger) == 'Array') {
        for (let _triggerStr of trigger) {
          $(this.MODEL.COMMON.SELECTOR.ROOT).off(_triggerStr, selector);
        }
      } else if (Object.getType(trigger) == 'String') {
        $(this.MODEL.COMMON.SELECTOR.ROOT).off(trigger, selector);
      }
    } else {
      $(this.MODEL.COMMON.SELECTOR.ROOT).off(trigger);
    }
    // Method chain
    return this;
  }

  trigger ({
    trigger = null,
    selector = this.MODEL.COMMON.SELECTOR.ROOT,
    model = null
  } = {}) {
    if (model != null) {
      if (Object.getType(model) == 'Array') {
        for (let set of model) {
          $(set[0]).trigger(set[1]);
        }
      }
    } else {
      if (trigger == null) {
        Log.error(arguments)();
        return;
      }
      $(selector).trigger(trigger);
    }
    // Method chain
    return this;
  }

  // ----------------------------------------------------------------
  // triggers

  setTrigger () {
    this.setOn({
      trigger: this.MODEL.TRIGGER.VIEW.SHOW,
      func: () => {
        super.log('Show', 'Submit')();
        this.VIEW.show();
      }
    });

    this.setOn({
      trigger: this.MODEL.TRIGGER.VIEW.HIDE,
      func: () => {
        super.log('Hide', 'Submit')();
        this.VIEW.hide();
      }
    });

    this.setOn({
      trigger: this.MODEL.TRIGGER.VIEW.CLEAR,
      func: () => {
        super.log('Clear', 'Submit')();
        this.VIEW.clear();
      }
    });

    this.setOn({
      trigger: this.MODEL.TRIGGER.VIEW.REMOVE,
      func: () => {
        super.log('Remove', 'Submit')();
        this.VIEW.remove();
      }
    });

    this.setOn({
      trigger: this.MODEL.TRIGGER.VIEW.SCROLL,
      func: () => {
        super.log('Scroll', 'Submit')();
        this.VIEW.scroll();
      }
    });
  }

  // ----------------------------------------------------------------
  // content

  setHeaderButton ({
    type = 'on',
    trigger = 'click',
    func = () => {}
  } = {}) {
    if (type == 'on') {
      this.setOn({
        selector: `${this.MODEL.SELECTOR.AREA} .content-header-button`,
        trigger: trigger,
        func: func
      });
    } else if (type == 'off') {
      this.setOff({
        selector: `${this.MODEL.SELECTOR.AREA} .content-header-button`,
        trigger: trigger
      });
    } else {
      Log.error(arguments, 'unknown type')();
    }
  }

  // ----------------------------------------------------------------
  // validate

  setValidate (
    selector = null
  ) {
    if (selector == null) {
      Log.error(arguments)();
      return;
    }
    selector = `${this.MODEL.SELECTOR.AREA} ${selector}`;

    this.setOn({
      selector: selector,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(selector);
      }
    });
    // Method chain
    return this;
  }

  setValidatePassword (
    selector = null,
    selectorRe = null
  ) {
    if (selector == null || selectorRe == null) {
      Log.error(arguments)();
      return;
    }
    selector = `${this.MODEL.SELECTOR.AREA} ${selector}`;
    selectorRe = `${this.MODEL.SELECTOR.AREA} ${selectorRe}`;

    this.setOn({
      selector: selector,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.validPassword(selector, selectorRe);
        this.CONTROLLER.updateValidMessage(selector);
        this.CONTROLLER.updateValidMessage(selectorRe);
      }
    });

    this.setOn({
      selector: selectorRe,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.validPassword(selector, selectorRe);
        this.CONTROLLER.updateValidMessage(selectorRe);
      }
    });
    // Method chain
    return this;
  }
}

// ----------------------------------------------------------------
// Controller

class CommonController extends CommonClass {
  constructor (
    model = {},
    initSetting = {},
    common = {
      NAME: 'Common Controller',
      VIEW_OBJECT: true,
      MODEL: new CommonModel(),
      VIEW: new CommonView(),
      EVENT: new CommonEvent()
    }
  ) {
    super(initSetting, common);
    Object.assign(this.MODEL, model);
    this.assignType(this.EVENT, 'Function');
    this.assignType(this.VIEW, 'Function');
    this.assignType(this.MODEL, 'Function');

    this.applyObject();
    this.EVENT.setTrigger();
    this.VIEW.initView();
  }

  applyObject () {
    this.CONTROLLER = this;

    this.VIEW.MODEL = this.MODEL;
    this.VIEW.VIEW = this.VIEW;
    this.VIEW.EVENT = this.EVENT;
    this.VIEW.CONTROLLER = this;

    this.EVENT.MODEL = this.MODEL;
    this.EVENT.VIEW = this.VIEW;
    this.EVENT.EVENT = this.EVENT;
    this.EVENT.CONTROLLER = this;

    // Method chain
    return this;
  }

  // ----------------------------------------------------------------
  // validate

  validPassword (
    password = null,
    passwordRe = null
  ) {
    if (password != null && passwordRe != null) {
      password = $(password);
      passwordRe = $(passwordRe);
      if (password.val() != passwordRe.val()) {
        passwordRe[0].setCustomValidity(LN.get('password_dont_match'));
      } else {
        passwordRe[0].setCustomValidity('');
      }
    } else {
      Log.error(arguments, 'selector is null')();
      return;
    }
    // Method chain
    return this;
  }

  updateValidMessage (
    inputElement = null
  ) {
    if (inputElement == null) {
      Log.error(arguments, 'selector is null')();
      return;
    }

    $(inputElement)
      .parent('.content-input')
      .children('.content-input-valid-message')
      .text($(inputElement)[0].validationMessage);

    // Method chain
    return this;
  }
}

// ----------------------------------------------------------------
// Process

class CommonProcess extends CommonClass {
  constructor (
    initSetting = {},
    common = {
      NAME: 'Common Process',
      VIEW_OBJECT: true
    }
  ) {
    super(initSetting, common);
  }
}
