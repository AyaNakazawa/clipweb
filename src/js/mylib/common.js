
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

    this.ACTIVE = 'active';
    this.HOVER = 'hover';
    this.SPEED_REMOVE = 400;
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    this.BODY = 'html, body';
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

  clearArea({
    selector = this.MODEL.SELECTOR_AREA
  } = {}) {
    $(selector).empty();

  }

  generateAlert({
    template = null,
    model = {}
  } = {}) {
    if (template == null) {
      return null;
    }
  }

  generateLoading({
    header = 'Loading',
    message = 'Loading'
  } = {}) {

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
      $(document).on(trigger, selector, func);
    } else {
      $(document).on(trigger, func);
    }
  }

  setOff({
    trigger = 'click',
    selector = null
  } = {}) {
    if (selector != null) {
      $(document).off(trigger, selector);
    } else {
      $(document).off(trigger);
    }
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
      VIEW_OBJECT: true,
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
