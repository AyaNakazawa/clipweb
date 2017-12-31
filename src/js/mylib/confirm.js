
// ----------------------------------------------------------------
// Confirm Class

// ----------------------------------------------------------------
// Model

class ConfirmModel extends CommonModel {
  static get TYPE_0BUTTON() { return 0; }
  static get TYPE_1BUTTON() { return 1; }
  static get TYPE_2BUTTON() { return 2; }

  constructor(
    _initSetting = {
      NAME: 'Confirm Object',
      CONFIRM_ID: 'confirm-id',
      CONFIRM_TITLE: '',
      CONFIRM_MESSAGE: '',
      EVENT_TRIGGER: 'click',
      EVENT_SELECTOR: null,
      AUTO_OPEN: false,
      TYPE: 2,
      IMAGE: '',
      YES: 'Accept',
      NO: 'Close',
      FUNCTION_YES: () => {},
      FUNCTION_NO: () => {},
      FUNCTION_CLOSE: () => {}
    }
  ) {
    super(_initSetting);

    this.GENERATE_SELECTOR = '#confirm-view';
    this.TEMPLATE_SELECTOR = '#confirm-view-template';

    this.TRIGGER_SHOW = 'show.bs.modal';
    this.TRIGGER_SHOWN = 'shown.bs.modal';
    this.TRIGGER_HIDE = 'hide.bs.modal';
    this.TRIGGER_HIDDEN = 'hidden.bs.modal';
  }

  updateSelector() {
    this.CONFIRM_ID_SELECTOR = `#${this.CONFIRM_ID}`;
    this.CONFIRM_ID_SELECTOR_YES = `#${this.CONFIRM_ID}-yes`;
    this.CONFIRM_ID_SELECTOR_NO = `#${this.CONFIRM_ID}-no`;
    this.CONFIRM_ID_SELECTOR_CLOSE = `#${this.CONFIRM_ID}-close`;
  }
}

// ----------------------------------------------------------------
// View

class ConfirmView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Confirm View'
    }
  ) {
    super(_initSetting);
  }

  generateModal() {
    $(this.MODEL.GENERATE_SELECTOR).html(View.getTemplate({
      template: $(this.MODEL.TEMPLATE_SELECTOR),
      model: {
        confirmId: this.MODEL.CONFIRM_ID,
        confirmTitle: this.MODEL.CONFIRM_TITLE,
        confirmMessage: this.MODEL.CONFIRM_MESSAGE,
        yes: this.MODEL.YES,
        no: this.MODEL.NO,
        type: this.MODEL.TYPE,
        image: this.MODEL.IMAGE
      }
    }));
  }
}

// ----------------------------------------------------------------
// Event

class ConfirmEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Confirm Event'
    }
  ) {
    super(_initSetting);
  }

  setOnHidden() {
    super.setOn({
      trigger: this.MODEL.TRIGGER_HIDDEN,
      func: () => {
        this.CONTROLLER.remove();
      }
    });
  }

  setOffHidden() {
    super.setOff({
      trigger: this.MODEL.TRIGGER_HIDDEN
    });
  }

  setOnHide() {
    super.setOn({
      trigger: this.MODEL.TRIGGER_HIDE,
      func: () => {
        this.CONTROLLER.destroy();
      }
    });
  }

  setOffHide() {
    super.setOff({
      trigger: this.MODEL.TRIGGER_HIDE
    });
  }

  setEvent(_set = null) {
    if (_set != null) {
      if (_set) {
        this.setOnHide();
        this.setOnOpen();
        this.setOnYesClick();
        this.setOnNoClick();
      } else {
        this.setOffHide();
        this.setOffOpen();
        this.setOffYesClick();
        this.setOffNoClick();
      }
    }
  }

  setOnOpen() {
    if (this.MODEL.AUTO_OPEN) {
      this.CONTROLLER.openConfirm();
    } else {
      super.setOn({
        trigger: this.MODEL.EVENT_TRIGGER,
        selector: this.MODEL.EVENT_SELECTOR,
        func: () => {
          this.CONTROLLER.openConfirm();
        }
      });
    }
  }

  setOnYesClick() {
    super.setOn({
      trigger: 'click',
      selector: this.MODEL.CONFIRM_ID_SELECTOR_YES,
      func: () => {
        this.CONTROLLER.selectYes();
      }
    });
  }

  setOnNoClick() {
    super.setOn({
      trigger: 'click',
      selector: this.MODEL.CONFIRM_ID_SELECTOR_NO,
      func: () => {
        this.CONTROLLER.selectNo();
      }
    });
  }

  setOffOpen() {
    if (!this.MODEL.AUTO_OPEN) {
      super.setOff({
        trigger: this.MODEL.EVENT_TRIGGER,
        selector: this.MODEL.EVENT_SELECTOR
      });
    }
  }

  setOffYesClick() {
    super.setOff({
      trigger: 'click',
      selector: this.MODEL.CONFIRM_ID_SELECTOR_YES
    });
  }

  setOffNoClick() {
    super.setOff({
      trigger: 'click',
      selector: this.MODEL.CONFIRM_ID_SELECTOR_NO
    });
  }

  setOffCloseClick() {
    super.setOff({
      trigger: 'click',
      selector: this.MODEL.CONFIRM_ID_SELECTOR_CLOSE
    });
  }
}

// ----------------------------------------------------------------
// Controller

class ConfirmController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Confirm Controller',
      MODEL: new ConfirmModel(),
      VIEW: new ConfirmView(),
      EVENT: new ConfirmEvent()
    }
  ) {
    super(_model, _initSetting);

    this.initConfirm();
  }

  initConfirm() {
    this.MODEL.updateSelector();
    this.VIEW.generateModal();
    this.EVENT.setEvent(true);
  }

  openConfirm() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_ID_SELECTOR, 'Open', Log.ARROW_INPUT);
    $(this.MODEL.CONFIRM_ID_SELECTOR).modal();
  }

  selectYes() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'Yes', Log.ARROW_INPUT);
    this.MODEL.FUNCTION_YES();
  }

  selectNo() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'No', Log.ARROW_INPUT);
    this.MODEL.FUNCTION_NO();
  }

  destroy() {
    setTimeout(() => {
      Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'Destroy', Log.ARROW_INPUT);
      this.EVENT.setEvent(false);
      this.EVENT.setOnHidden();
    });
  }

  remove() {
    Log.logClassKey(this.NAME, this.MODEL.CONFIRM_TITLE, 'Remove', Log.ARROW_INPUT);
    $(this.MODEL.CONFIRM_ID_SELECTOR).remove();
    this.EVENT.setOffHidden();
  }
}
