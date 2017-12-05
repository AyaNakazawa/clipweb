
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
    
    this.ALERT_SUCCESS = 'success';
    this.ALERT_INFO = 'info';
    this.ALERT_WARNING = 'warning';
    this.ALERT_DANGER = 'danger';
    
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    
    this.BODY = 'html, body';
    this.TEMPLATE_LOADING = '#loading-template';
    this.TEMPLATE_ALERT = '#alert-template';
    this.TEMPLATE_RUBY = '#ruby-template';
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
  
  getTemplate(
    _initArgs = {},
    _common = {
      template: null,
      model: {}
    }
  ) {
    let args = {};
    Object.assign(args, _common, _initArgs);
    
    if (args.template == null) {
      return null;
    }
    const template = $(args.template).text();
    const compiled = _.template(template);
    return compiled(args.model);
  }
  
  generateLoading(
    _initArgs = {},
    _common = {
      selector: this.AREA_SELECTOR,
      header: 'Loading',
      message: 'Loading'
    }
  ) {
    let args = {};
    Object.assign(args, _common, _initArgs);
    
    if (args.selector == null) {
      Log.logCaution(this.NAME, 'generateLoading', 'Undefined selector');
      return;
    }
    $(args.selector).empty();
    $(args.selector).append(this.getTemplate(
      $(this.MODEL.TEMPLATE_LOADING),
      {
        header: args.header,
        message: args.message
      }
    ));
  }
  
  generateAlert(
    _initArgs = {},
    _common = {
      selector: null,
      type: 'success',
      message: null,
      close: true
    }
  ) {
    let args = {};
    Object.assign(args, _common, _initArgs);
    
    if (args.selector == null) {
      Log.logCaution(this.NAME, 'generateAlert', 'Undefined selector');
      return;
    }
    if (args.message != null) {
      $(args.selector).append(this.getTemplate(
        $(this.MODEL.TEMPLATE_ALERT),
        {
          type: args.type,
          message: args.message,
          close: args.close
        }
      ));
    }
  }
  
  removeHTML(
    _initArgs = {},
    _common = {
      selector: null,
      speed: this.MODEL.SPEED_REMOVE
    }
  ) {
    let args = {};
    Object.assign(args, _common, _initArgs);
    
    if (args.selector == null) {
      return false;
    }
    $(args.selector).slideUp(args.speed, () => {
      $(args.selector).remove();
    });
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
  
  setOn(
    _initArgs = {},
    _common = {
      trigger: 'click',
      selector: null,
      func: () => {}
    }
  ) {
    let args = {};
    Object.assign(args, _common, _initArgs);
    
    if (args.selector != null) {
      $(document).on(args.trigger, args.selector, args.func);
    } else {
      $(document).on(args.trigger, args.func);
    }
  }
  
  setOff(
    _initArgs = {},
    _common = {
      trigger: 'click',
      selector: null
    }
  ) {
    let args = {};
    Object.assign(args, _common, _initArgs);
    
    if (args.selector != null) {
      $(document).off(args.trigger, args.selector);
    } else {
      $(document).off(args.trigger);
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
