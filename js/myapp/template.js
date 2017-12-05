
// ----------------------------------------------------------------
// Template Class

// ----------------------------------------------------------------
// Model

class TemplateModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Template Object',
    }
  ) {
    super(_initSetting);
    
    this.TEMPLATE_TRIGGER = 'click';
    this.TEMPLATE_SELECTOR = 'template';
    
  }
}

// ----------------------------------------------------------------
// View

class TemplateView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Template View'
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
    $(this.MODEL.USER_AREA_SELECTOR).empty();
    
    // Generate Alert
    this.generateAlert(
      this.MODEL.USER_AREA_SELECTOR,
      args.alertType,
      args.alertMessage,
      args.alertClose
    );
    
    // Generate Content
    
  }
}

// ----------------------------------------------------------------
// Event

class TemplateEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Template Event'
    }
  ) {
    super(_initSetting);
  }
  
  setEvent() {
    this.setClickTemplate();
  }
  
  setClickTemplate() {
    super.setOn({
      trigger: this.MODEL.TEMPLATE_TRIGGER,
      selector: this.MODEL.TEMPLATE_SELECTOR,
      func: () => {
        this.CONTROLLER.submitTemplate();
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class TemplateController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Template Controller',
      MODEL: new TemplateModel(),
      VIEW: new TemplateView(),
      EVENT: new TemplateEvent()
    }
  ) {
    super(_model, _initSetting);
    
    this.EVENT.setEvent();
    this.VIEW.generateArea();
  }
}
