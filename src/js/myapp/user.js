
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends ContentModel {
  constructor(
    _initSetting = {
      NAME: 'User Object'
    }
  ) {
    super(_initSetting);

    this.LOGINED = false;

    this.ID = null;
    this.PASSWORD = null;

    this.HASH_ID = null;
    this.HASH_PASSWORD = null;
    this.HASH_CRYPTO = null;
    this.SALT_CRYPTO = Project.NAME_KEY;

    this.TEMPLATE_LOGIN = '#login-template';
    this.TEMPLATE_REGISTER = '#register-template';
    this.TEMPLATE_SETTING = '#user-setting-template';

    this.LENGTH_MIN_ID = 3;
    this.LENGTH_MAX_ID = 32;
    this.LENGTH_MIN_PASSWORD = 8;
    this.LENGTH_MAX_PASSWORD = 32;

    this.SELECTOR_USER_ID = '#login-id';
    this.SELECTOR_USER_PASSWORD = '#login-password';
    this.SELECTOR_LOGIN = '#login-submit';
    this.SELECTOR_LOGOUT = '#logout-submit';
    this.SELECTOR_REGISTER = '#register-submit';

    this.SELECTOR_LOGIN_REGISTER = '#login-register';

    this.SELECTOR_AREA = '#user-area';

    this.SELECTOR_NAV = `${this.SELECTOR_AREA} .${Content.NAV}`;

  }
}

// ----------------------------------------------------------------
// View

class UserView extends ContentView {
  constructor(
    _initSetting = {
      NAME: 'User View'
    }
  ) {
    super(_initSetting);
  }

  generateArea({
    type = null,
    view = false,
    alertType = this.MODEL.ALERT_SUCCESS,
    alertClose = true,
    alertMessage = null,
    loadingHeader = null,
    loadingMessage = null
  } = {}) {

    // View
    if (PS.SWITCH.USER.getCurrentView() && view) {
      PS.SWITCH.USER.VIEW.setView(false, 0);
    }
    setTimeout(() => {
      PS.SWITCH.USER.VIEW.setView(view);
    }, 0);

    // Clear
    this.clearArea();

    // Generate Loading
    if (loadingMessage != null) {
      this.generateLoading({
        header: loadingHeader,
        message: loadingMessage
      });
      return;
    }

    // Generate Alert
    if (alertMessage != null) {
      this.generateAlert({
        type: alertType,
        message: alertMessage,
        close: alertClose
      });
    }

    // Generate Content
    if (type == 'login') {
      $(this.MODEL.SELECTOR_AREA).append(View.getTemplate({
        template: this.MODEL.TEMPLATE_LOGIN,
        model: {}
      }));
    } else if (type == 'setting') {
      $(this.MODEL.SELECTOR_AREA).append(View.getTemplate({
        template: this.MODEL.TEMPLATE_SETTING,
        model: {}
      }));
    }if (type == 'register') {
      $(this.MODEL.SELECTOR_AREA).append(View.getTemplate({
        template: this.MODEL.TEMPLATE_REGISTER,
        model: {}
      }));
    }
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends ContentEvent {
  constructor(
    _initSetting = {
      NAME: 'User Event'
    }
  ) {
    super(_initSetting);
  }

  setEvent() {
    this.setClickClose();
    this.setClickLogin();
    this.setClickLoginRegister();
  }

  setClickClose() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} .content-header-button`,
      func: () => {
        Log.logClassKey('User', 'Close', 'Submit');
        this.VIEW.generateArea();
      }
    });
  }

  setClickLogin() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_LOGIN}`,
      func: () => {
        Log.logClassKey('User', 'Login', 'Submit');
        PS.CONTROLLER.NAV.VIEW.generateLogined();
        this.VIEW.generateArea();
      }
    });
  }

  setClickLoginRegister() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_LOGIN_REGISTER}`,
      func: () => {
        Log.logClassKey('User', 'Register', 'Open');
        this.CONTROLLER.openRegister();
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class UserController extends ContentController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'User Controller',
      MODEL: new UserModel(),
      VIEW: new UserView(),
      EVENT: new UserEvent()
    }
  ) {
    super(_model, _initSetting);

    this.EVENT.setEvent();
    this.openLogin();
  }

  openLogin() {
    this.VIEW.generateArea({
      type: 'login',
      view: true
    });
  }

  openSetting() {
    this.VIEW.generateArea({
      type: 'setting',
      view: true
    });
  }

  openRegister() {
    this.VIEW.generateArea({
      type: 'register',
      view: true
    });
  }
}
