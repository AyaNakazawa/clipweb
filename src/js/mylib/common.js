
// ----------------------------------------------------------------
// Common Class

class CommonClass {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common Class',
      VIEW_NAME: false
    }
  ) {
    Object.assign(this, _common, _initSetting);

    if (this.NAME != null && this.VIEW_NAME) {
      this.showNameModel(this.NAME);
    }
  }

  showName(_name) {
    // Draw line
    Log.log();
    // Check name
    if (_name != null) {
      // Exists name
      // Write name
      Log.log(_name, Log.ALIGN_CENTER);
      return;
    } else {
      // Not exists name
      // Write this name
      Log.log(this.NAME, Log.ALIGN_CENTER);
    }
  }

  showNameModel(_name, _model) {
    // Write name
    this.showName(_name);

    // Check model
    if (_model != null) {
      // Exists model
      // Write model
      Log.logObj(_model);
    } else {
      // Not exists model
      // Write this
      Log.logObj(this);
    }
  }
}

// ----------------------------------------------------------------
// Model

class CommonModel extends CommonClass {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common Object',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);

    this.COMMON = {};
    this.COMMON.BODY = 'html, body';
    this.COMMON.ACTIVE = 'active';
    this.COMMON.HOVER = 'hover';
    this.COMMON.CURRENT = 'current';
    this.COMMON.DISPLAY_NONE = 'display-none';

    this.COMMON.VIEW = null;

    this.COMMON.SPEED = {};
    this.COMMON.SPEED.CLEAR = 0;
    this.COMMON.SPEED.OPEN = 500;
    this.COMMON.SPEED.CLOSE = 500;
    this.COMMON.SPEED.VIEW = 500;

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

    this.COMMON.SELECTOR = {};
    this.COMMON.SELECTOR.ROOT = document;
    this.COMMON.SELECTOR.AREA = '#area';

    this.SELECTOR = {};
    this.SELECTOR.AREA = this.COMMON.SELECTOR.AREA;
  }

  // Add var to Instance
  setKey(
    _key = 'KEY',
    _val = 'VALUE'
  ) {
    this[_key] = _val;
  }

  // Get var from Instance
  getKey(
    _key = 'KEY'
  ) {
    return this[_key];
  }

  // Remove var from Instance
  removeKey(
    _key = 'KEY'
  ) {
    this[_key] = undefined;
  }
}

// ----------------------------------------------------------------
// View

class CommonView extends CommonClass {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common View',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);
  }

  skip(
    selector = null
  ) {
    if (selector == null) {
      Log.logCaution(
        this,
        'skip',
        'selector of args is null.',
        `selector: ${selector}`
      );
      return null;
    }

    $(selector).finish();
    return true;
  }

  clearArea({
    selector = this.MODEL.SELECTOR.AREA,
    speed = this.MODEL.COMMON.SPEED.CLEAR,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.HIDE
  } = {}) {
    if (selector == null) {
      Log.logCaution(
        this,
        'clearArea',
        'selector of args is null.',
        `selector: ${selector}`
      );
      return null;
    }
    Log.logClassKey(this.NAME, 'View', 'Clear', Log.ARROW_INPUT);

    if (speed > 0 || this.getView()) {
      this.setView({
        view: false,
        selector: selector,
        speed: speed,
        type: type
      });
    }
    $(selector).empty();

    return true;
  }

  openArea({
    selector = this.MODEL.SELECTOR.AREA,
    speed = this.MODEL.COMMON.SPEED.OPEN,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.SHOW
  } = {}) {
    if (selector == null) {
      Log.logCaution(
        this,
        'openArea',
        'selector of args is null.',
        `selector: ${selector}`
      );
      return null;
    }

    return this.setView({
      view: true,
      selector: selector,
      speed: speed,
      type: type
    });
  }

  closeArea({
    selector = this.MODEL.SELECTOR.AREA,
    speed = this.MODEL.COMMON.SPEED.CLOSE,
    type = this.MODEL.COMMON.EFFECT.DEFAULT.HIDE
  } = {}) {
    if (selector == null) {
      Log.logCaution(
        this,
        'closeArea',
        'selector of args is null.',
        `selector: ${selector}`
      );
      return null;
    }

    return this.setView({
      view: false,
      selector: selector,
      speed: speed,
      type: type
    });
  }

  setView({
    selector = this.MODEL.SELECTOR.AREA,
    speed = this.MODEL.COMMON.SPEED.VIEW,
    type = null,
    view = null,
    callback = null
  }) {
    if (view == null) {
      Log.logCaution(
        this,
        'setView',
        'view of args is null.',
        `selector: ${selector}`,
        `speed: ${speed}`,
        `type: ${type}`,
        `view: ${view}`,
        `callback: ${callback}`
      );
      return null;
    }
    Log.logClassKey(this.NAME, 'View', view, Log.ARROW_INPUT);

    this.skip(selector);

    if (type == null) {
      if (view) {
        type = this.MODEL.COMMON.EFFECT.DEFAULT.SHOW;
      } else if (!view) {
        type = this.MODEL.COMMON.EFFECT.DEFAULT.HIDE;
      }
    }

    this.MODEL.COMMON.VIEW = view;

    if (view) {
      if (type == this.MODEL.COMMON.EFFECT.SHOW) {
        if (callback != null) {
          $(selector).show(speed, callback);
        } else {
          $(selector).show(speed);
        }

      } else if (type == this.MODEL.COMMON.EFFECT.SLIDE_DOWN) {
        if (callback != null) {
          $(selector).slideDown(speed, callback);
        } else {
          $(selector).slideDown(speed);
        }

      } else if (type == this.MODEL.COMMON.EFFECT.FADE_IN) {
        if (callback != null) {
          $(selector).fadeIn(speed, callback);
        } else {
          $(selector).fadeIn(speed);
        }

      } else {
        Log.logCaution(
          this,
          'setView',
          'unknown type.',
          `selector: ${selector}`,
          `speed: ${speed}`,
          `type: ${type}`,
          `view: ${view}`,
          `callback: ${callback}`
        );
        return null;
      }
    } else if (!view) {
      if (type == this.MODEL.COMMON.EFFECT.HIDE) {
        if (callback != null) {
          $(selector).hide(speed, callback);
        } else {
          $(selector).hide(speed);
        }

      } else if (type == this.MODEL.COMMON.EFFECT.SLIDE_UP) {
        if (callback != null) {
          $(selector).slideUp(speed, callback);
        } else {
          $(selector).slideUp(speed);
        }

      } else if (type == this.MODEL.COMMON.EFFECT.FADE_OUT) {
        if (callback != null) {
          $(selector).fadeOut(speed, callback);
        } else {
          $(selector).fadeOut(speed);
        }

      } else {
        Log.logCaution(
          this,
          'setView',
          'unknown type.',
          `selector: ${selector}`,
          `speed: ${speed}`,
          `type: ${type}`,
          `view: ${view}`,
          `callback: ${callback}`
        );
        return null;
      }
    }

    return this.MODEL.COMMON.VIEW;
  }

  getView() {
    const result = this.MODEL.COMMON.VIEW;
    if (result != true && result != false) {
      Log.logCaution(
        this,
        'getView',
        'Current view is unknown.',
        `this.MODEL.COMMON.VIEW: ${this.MODEL.COMMON.VIEW}`
      );
    }
    return result;
  }

  generateAlert({
    selector = this.MODEL.SELECTOR.AREA,
    type = View.ALERT_SUCCESS,
    message = null,
    close = true
  } = {}) {
    if (selector == null) {
      Log.logCaution(
        this,
        'generateAlert',
        'Undefined selector',
        `selector: ${selector}`,
        `type: ${type}`,
        `message: ${message}`,
        `close: ${close}`
      );
      return;
    }

    $(selector).append(View.getAlert({
      type: type,
      message: message,
      close: close
    }));
    return true;
  }

  generateLoading({
    selector = this.MODEL.SELECTOR.AREA,
    header = 'Loading'
  } = {}) {
    if (selector == null) {
      Log.logCaution(
        this,
        'generateLoading',
        'Undefined selector',
        `selector: ${selector}`,
        `header: ${header}`
      );
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
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common Event',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);
  }

  setOn({
    trigger = 'click',
    selector = null,
    func = () => {}
  } = {}) {
    if (selector != null) {
      return $(this.MODEL.COMMON.SELECTOR.ROOT).on(trigger, selector, func);
    }
    return $(this.MODEL.COMMON.SELECTOR.ROOT).on(trigger, func);
  }

  setOff({
    trigger = 'click',
    selector = null
  } = {}) {
    if (selector != null) {
      return $(this.MODEL.COMMON.SELECTOR.ROOT).off(trigger, selector);
    }
    return $(this.MODEL.COMMON.SELECTOR.ROOT).off(trigger);
  }

  trigger({
    trigger = null,
    selector = this.MODEL.COMMON.SELECTOR.ROOT
  } = {}) {
    if (trigger == null) {
      Log.logCaution(
        this,
        'trigger',
        `trigger: ${trigger}`,
        `selector: ${selector}`
      );
      return;
    }

    return $(selector).trigger(trigger);
  }
}

// ----------------------------------------------------------------
// Controller

class CommonController extends CommonClass {
  constructor(
    _model = {},
    _initSetting = {},
    _common = {
      NAME: 'Common Controller',
      VIEW_NAME: false,
      VIEW_OBJECT: false,
      MODEL: new CommonModel(),
      VIEW: new CommonView(),
      EVENT: new CommonEvent()
    }
  ) {
    super(_initSetting, _common);
    Object.assign(this.MODEL, _model);

    if (this.VIEW_OBJECT) {
      super.showNameModel(this.MODEL.NAME);
    }

    this.applyObject();
  }

  applyObject() {
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
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common Process',
      VIEW_NAME: true
    }
  ) {
    super(_initSetting, _common);
  }
}
