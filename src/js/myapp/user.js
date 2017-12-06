
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'User Object',
    }
  ) {
    super(_initSetting);
    
    this.AREA_SELECTOR = '#user-area';
    
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
    $(this.MODEL.AREA_SELECTOR).empty();
    
    // Generate Alert
    if (args.alertMessage != null) {
      this.generateAlert(
        this.MODEL.AREA_SELECTOR,
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
      trigger: this.MODEL.TEMPLATE_TRIGGER,
      selector: this.MODEL.TEMPLATE_SELECTOR,
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
