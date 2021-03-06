
// ----------------------------------------------------------------
// Switch Class

// ----------------------------------------------------------------
// Model

class SwitchModel extends CommonModel {
  constructor (
    _initSetting = {
      NAME: 'Switch Object',
      selector: null,
      view: null,
      speed: 500,
      template: null,
      localStorageKey: null,
      eventTrigger: 'click',
      eventSelector: null
    }
  ) {
    super(_initSetting);

    this.INIT_VIEW = true;
  }

  compile () {
    if (this.template != null) {
      if (this.NAME == 'Common Switch') {
        this.NAME = `${this.template.capitalize()} Switch`;
      }

      if (this.localStorageKey != null && this.localStorageKey != 'none') {
        this.localStorageKey = `View.${this.localStorageKey}`;
      }

      if (this.localStorageKey != 'none') {
        this.localStorageKey = `View.${this.template}`;
      } else {
        this.localStorageKey = null;
      }

      if (this.eventSelector != 'none') {
        this.eventSelector = `#${this.template}-switch`;
      }

      if (this.selector != 'none') {
        this.selector = `#${this.template}-area`;
      }
    }
  }
}

// ----------------------------------------------------------------
// View

class SwitchView extends CommonView {
  constructor (
    _initSetting = {
      NAME: 'Switch View'
    }
  ) {
    super(_initSetting);
  }

  switchView () {
    super.log('View', 'Switch', Log.ARROW_INPUT)();
    // Method chain
    return this.setView(!this.MODEL.view);
  }

  getView () {
    return this.MODEL.view;
  }

  setView (_view = null, _speed = this.MODEL.speed) {
    super.log('View', _view, Log.ARROW_INPUT)();

    if (_view == null) {
      Log.Error(arguments, 'view is null')();
      return;
    }

    if (_view) {
      if (eventSelector != null) {
        $(this.MODEL.eventSelector).addClass(this.MODEL.ACTIVE);
      }
      $(this.MODEL.selector).show(_speed);
    } else if (_view) {
      if (eventSelector != null) {
        $(this.MODEL.eventSelector).removeClass(this.MODEL.ACTIVE);
      }
      $(this.MODEL.selector).hide(_speed);
    } else {
      Log.Error(arguments, 'unknown view.')();
      return;
    }

    // save
    if (this.MODEL.localStorageKey != null) {
      LocalStorage.setItem(this.MODEL.localStorageKey, _view);
    }
    this.MODEL.view = _view;

    // Method chain
    return this;
  }
}

// ----------------------------------------------------------------
// Event

class SwitchEvent extends CommonEvent {
  constructor (
    _initSetting = {
      NAME: 'Switch Event'
    }
  ) {
    super(_initSetting);
  }

  setOnSwitch () {
    if (this.MODEL.eventSelector != null) {
      super.setOn({
        trigger: this.MODEL.eventTrigger,
        selector: this.MODEL.eventSelector,
        func: () => {
          this.CONTROLLER.switchView();
        }
      });
    }
  }
}

// ----------------------------------------------------------------
// Controller

class SwitchController extends CommonController {
  constructor (
    _model = {},
    _initSetting = {
      NAME: 'Switch Controller',
      MODEL: new SwitchModel(),
      VIEW: new SwitchView(),
      EVENT: new SwitchEvent()
    }
  ) {
    super(_model, _initSetting);

    this.initSwitchView();
  }

  initSwitchView () {
    this.MODEL.compile();
    if (this.MODEL.selector == null) {
      Log.Error(arguments, 'switch selector is null')();
      return;
    }
    this.initView();
    this.VIEW.setView(this.MODEL.view, 0);
    this.EVENT.setOnSwitch();
  }

  initView () {
    if (this.MODEL.view == null) {
      if (this.MODEL.localStorageKey == null) {
        this.MODEL.view = this.MODEL.INIT_VIEW;
      } else {
        const LS_VAL = LocalStorage.getItem(this.MODEL.localStorageKey);
        if (LS_VAL == null) {
          this.MODEL.view = this.MODEL.INIT_VIEW;
        } else if (LS_VAL == 'true') {
          this.MODEL.view = true;
        } else if (LS_VAL == 'false') {
          this.MODEL.view = false;
        }
      }
    }
  }
}
