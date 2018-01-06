
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
    this.OBJECT.LOG = {};

    if (this.VIEW_OBJECT) {
      this.showNameModel();

    } else if (this.VIEW_NAME) {
      this.showName();

    }
  }

  showName (name = null) {
    // Draw line
    Log.log();
    // Write name
    if (name != null) {
      Log.log(name, Log.ALIGN_CENTER);
      return;
    } else {
      Log.log(this.NAME, Log.ALIGN_CENTER);
    }
  }

  showModel (model = null) {
    // Write name
    if (model != null) {
      Log.logObj(model);
      return;
    } else {
      Log.logObj(this);
    }
  }

  showNameModel (name = null, model = null) {
    // Write name
    this.showName(name);
    // Write model
    this.showModel(model);
  }

  log (...args) {
    if (args.length == 0) {
      super.logGenerate(this.log, arguments);
      super.logError();
      return;
    } else if (args.length == 1) {
      Log.logClass(this.NAME, args[0]);
    } else if (args.length == 2) {
      Log.logClassKey(this.NAME, args[0], args[1]);
    } else if (args.length == 3) {
      Log.logClassKey(this.NAME, args[0], args[1], args[2]);
    } else {
      super.logGenerate(this.log, arguments);
      super.logError('many unknown arguments');
      return;
    }
  }

  logGenerate (func = null, args = null) {
    this.OBJECT.LOG['obj'] = this;
    if (func != null) {
      this.OBJECT.LOG['func'] = func;
    }
    if (args != null) {
      this.OBJECT.LOG['args'] = args;
    }
    return true;
  }

  logError (message = null) {
    Log.logErrorCommon(this.logWithMessage(message));
  }

  logCaution (message = null) {
    Log.logCautionCommon(this.logWithMessage(message));
  }

  logWithMessage (message = null) {
    let model = this.OBJECT.LOG;
    if (message == null) {
      return model;
    } else if (message.length > 0) {
      model['message'] = message;
      return model;
    }
    return model;
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
    this.COMMON.BODY = 'html, body';
    this.COMMON.ACTIVE = 'active';
    this.COMMON.HOVER = 'hover';
    this.COMMON.CURRENT = 'current';
    this.COMMON.DISPLAY_NONE = 'display-none';
    this.COMMON.OFFSET = 0;

    this.COMMON.VIEW = null;

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

  skip (
    selector = this.MODEL.SELECTOR.AREA
  ) {
    if (selector == null) {
      super.logGenerate(this.skip, arguments);
      super.logError();
      return;
    }

    $(selector).finish();
    return true;
  }

  clear ({
    selector = this.MODEL.SELECTOR.AREA,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.HIDE,
    speed = this.MODEL.COMMON.SPEED.CLEAR,
    delay = this.MODEL.COMMON.DELAY.CLEAR,
    easing = this.MODEL.COMMON.EASING.CLEAR
  } = {}) {
    if (selector == null) {
      super.logGenerate(this.clear, arguments);
      super.logError();
      return;
    }
    super.log('View', 'Clear', Log.ARROW_INPUT);

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

    return true;
  }

  show ({
    selector = this.MODEL.SELECTOR.AREA,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.SHOW,
    speed = this.MODEL.COMMON.SPEED.SHOW,
    delay = this.MODEL.COMMON.DELAY.SHOW,
    easing = this.MODEL.COMMON.EASING.SHOW
  } = {}) {
    if (selector == null) {
      super.logGenerate(this.show, arguments);
      super.logError();
      return;
    }

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
      super.logGenerate(this.hide, arguments);
      super.logError();
      return;
    }

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
      super.logGenerate(this.setView, arguments);
      super.logError();
      return;
    }
    super.log('View', view, Log.ARROW_INPUT);

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
        super.logGenerate(this.setView, arguments);
        super.logError('unknown type.');
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
        super.logGenerate(this.setView, arguments);
        super.logError('unknown type.');
        return;
      }
    }

    return this.MODEL.COMMON.VIEW;
  }

  getView () {
    const result = this.MODEL.COMMON.VIEW;
    if (result != true && result != false) {
      super.logGenerate(this.getView, arguments);
      super.logCaution([
        'unknown current view.',
        `this.MODEL.COMMON.VIEW: ${this.MODEL.COMMON.VIEW}`
      ]);
    }
    return result;
  }

  initView () {
    this.MODEL.COMMON.VIEW = $(this.MODEL.SELECTOR.AREA).is(':visible');
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
      super.logGenerate(this.scroll, arguments);
      super.logError();
      return;
    }
    super.log('View', 'Scroll');

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
  }

  generateAlert ({
    selector = this.MODEL.SELECTOR.AREA,
    type = View.ALERT_SUCCESS,
    message = null,
    close = true
  } = {}) {
    if (selector == null) {
      super.logGenerate(this.generateAlert, arguments);
      super.logError();
      return;
    }

    $(selector).append(View.getAlert({
      type: type,
      message: message,
      close: close
    }));
    return true;
  }

  generateLoading ({
    selector = this.MODEL.SELECTOR.AREA,
    header = 'Loading'
  } = {}) {
    if (selector == null) {
      super.logGenerate(this.generateLoading, arguments);
      super.logError();
      return;
    }

    $(selector).append(View.getLoading({
      header: header
    }));
    return true;
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
      return $(this.MODEL.COMMON.SELECTOR.ROOT).on(trigger, selector, func);
    }
    return $(this.MODEL.COMMON.SELECTOR.ROOT).on(trigger, func);
  }

  setOff ({
    trigger = 'click',
    selector = null
  } = {}) {
    if (selector != null) {
      return $(this.MODEL.COMMON.SELECTOR.ROOT).off(trigger, selector);
    }
    return $(this.MODEL.COMMON.SELECTOR.ROOT).off(trigger);
  }

  trigger ({
    trigger = null,
    selector = this.MODEL.COMMON.SELECTOR.ROOT
  } = {}) {
    if (trigger == null) {
      super.logGenerate(this.trigger, arguments);
      super.logError();
      return;
    }

    return $(selector).trigger(trigger);
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
    Object.assignType(this, this.EVENT, 'Function');
    Object.assignType(this, this.VIEW, 'Function');
    Object.assignType(this, this.MODEL, 'Function');

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
