
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
    this.COMMON.EFFECT.DEFAULT.SHOW = this.COMMON.EFFECT.SHOW;
    this.COMMON.EFFECT.DEFAULT.HIDE = this.COMMON.EFFECT.HIDE;

    this.COMMON.EASING = {};
    this.COMMON.EASING.CLEAR = 'easeOutCubic';
    this.COMMON.EASING.SHOW = 'easeOutCubic';
    this.COMMON.EASING.HIDE = 'easeOutCubic';
    this.COMMON.EASING.SCROLL = 'easeInOutCubic';

    this.COMMON.TRIGGER = {};
    this.COMMON.TRIGGER.SCROLL = null;
    this.COMMON.TRIGGER.CLEAR = null;
    this.COMMON.TRIGGER.SHOW = null;
    this.COMMON.TRIGGER.HIDE = null;

    this.COMMON.SELECTOR = {};
    this.COMMON.SELECTOR.ROOT = document;
    this.COMMON.SELECTOR.AREA = '#area';

    this.SELECTOR = {};
    this.SELECTOR.AREA = this.COMMON.SELECTOR.AREA;
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

  add ({
    mode = this.COMMON.TYPE.APPEND,
    selector = this.MODEL.SELECTOR.AREA,
    element = null,
    delay = this.MODEL.COMMON.DELAY.ADD
  } = {}) {
    if (Object.getType(arguments[0]) == 'String') {
      element = arguments[0];
    }
    if (selector == null || element == null) {
      Log.error(arguments)();
      return;
    }

    if (mode == this.COMMON.TYPE.APPEND || mode == this.COMMON.TYPE.AFTER) {
      this.append({ selector: selector, element: element, delay: delay });
    } else if (mode == this.COMMON.TYPE.APPEND || mode == this.COMMON.TYPE.AFTER) {
      this.prepend({ selector: selector, element: element, delay: delay });
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
    delay = this.MODEL.COMMON.DELAY.APPEND
  } = {}) {
    if (Object.getType(arguments[0]) == 'String') {
      element = arguments[0];
    }
    if (selector == null || element == null) {
      Log.error(arguments)();
      return;
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
    delay = this.MODEL.COMMON.DELAY.PREPEND
  } = {}) {
    if (Object.getType(arguments[0]) == 'String') {
      element = arguments[0];
    }
    if (selector == null || element == null) {
      Log.error(arguments)();
      return;
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
    parentSelector = this.MODEL.SELECTOR.AREA,
    selector = null,
    delay = this.MODEL.COMMON.DELAY.REMOVE
  } = {}) {
    if (Object.getType(arguments[0]) == 'String') {
      selector = arguments[0];
    }
    if (selector == null) {
      Log.error(arguments)();
      return;
    }

    if (delay > 0) {
      $(`${parentSelector} ${selector}`).delay(delay).remove();
    } else {
      $(`${parentSelector} ${selector}`).remove();
    }
    // Method chain
    return this;
  }

  skip (
    selector = this.MODEL.SELECTOR.AREA
  ) {
    if (selector == null) {
      Log.error(arguments)();
      return;
    }

    $(selector).finish();
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
    if (selector == null) {
      Log.error(arguments)();
      return;
    }
    super.log('View', 'Clear', Log.ARROW_INPUT)();

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
    $(selector).empty();
    // Method chain
    return this;
  }

  show ({
    selector = this.MODEL.SELECTOR.AREA,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.SHOW,
    speed = this.MODEL.COMMON.SPEED.SHOW,
    delay = this.MODEL.COMMON.DELAY.SHOW,
    easing = this.MODEL.COMMON.EASING.SHOW
  } = {}) {
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
    callback = null
  } = {}) {
    if (view == null) {
      Log.error(arguments)();
      return;
    }
    super.log('View', view, Log.ARROW_INPUT)();

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
    if (selector == null || speed == null || easing == null) {
      Log.error(arguments)();
      return;
    }
    super.log('View', 'Scroll')();

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
