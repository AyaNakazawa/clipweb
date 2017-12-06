
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'User Object',
      SELECTOR_USER_ID: '#user-id',
      SELECTOR_USER_PASSWORD: '#user-password',
      SELECTOR_USER_CHECK: '#user-check',
      SELECTOR_LOGIN: '#login-submit',
      SELECTOR_LOGOUT: '#logout-submit',
      SELECTOR_SIGNUP: '#signup-submit',
      TRIGGER_LOGIN: 'click',
      TRIGGER_LOGOUT: 'click',
      TRIGGER_SIGNUP: 'click'
    }
  ) {
    super(_initSetting);
    
    this.LOGIN = false;
    
    this.ID = null;
    this.PASSWORD = null;
    
    this.HASH_ID = null;
    this.HASH_PASSWORD = null;
    this.HASH_CRYPTO = null;
    this.SALT_CRYPTO = Project.NAME_KEY;
    
    this.TEMPLATE_NOT_LOGIN = '#not-login-template';
    this.TEMPLATE_LOGINED = '#logined-template';
    
    this.LENGTH_MIN_ID = 3;
    this.LENGTH_MAX_ID = 32;
    this.LENGTH_MIN_PASSWORD = 8;
    this.LENGTH_MAX_PASSWORD = 32;
    
    this.SELECTOR_AREA = '#user-area';
    this.SELECTOR_SWITCH = '#user-switch';
    
  }
}

// ----------------------------------------------------------------
// View

class UserView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'User View'
    }
  ) {
    super(_initSetting);
  }
  
  generateArea(
    _initArgs = {},
    _common = {
      alertType: this.MODEL.ALERT_SUCCESS,
      alertClose: true,
      alertMessage: null,
      view: false
    }
  ) {
    let args = {};
    Object.assign(args, _common, _initArgs);
    
    // Clear
    $(this.MODEL.SELECTOR_AREA).empty();
    
    // Generate Alert
    if (args.alertMessage != null) {
      this.generateAlert(
        this.MODEL.SELECTOR_AREA,
        args.alertType,
        args.alertMessage,
        args.alertClose
      );
    }
    
    // Generate Content
    
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'User Event'
    }
  ) {
    super(_initSetting);
  }
  
  setEvent() {
    this.setClickUser();
  }
  
  setClickUser() {
    super.setOn({
      trigger: this.MODEL.TRIGGER_TEMPLATE,
      selector: this.MODEL.SELECTOR_TEMPLATE,
      func: () => {
        this.CONTROLLER.submitUser();
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class UserController extends CommonController {
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
    this.VIEW.generateArea();
  }
}
