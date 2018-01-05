
// ----------------------------------------------------------------
// Confirm Class

// ----------------------------------------------------------------
// Model

class ConfirmModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Confirm Object',
      id: '',
      title: '',
      content: '',
      type: Confirm.TYPE_YES_NO,
      show: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      selector: null,
      trigger: 'click',
      image: '',
      yes: 'Accept',
      no: 'Close',
      functionYes: null,
      functionNo: null,
      functionClose: null
    }
  ) {
    super(_initSetting);

    this.SELECTOR = {};
    this.SELECTOR.AREA = '#confirm-view';
    this.SELECTOR.TEMPLATE = '#confirm-view-template';

    this.TRIGGER = {};
    this.TRIGGER.SHOW = 'show.bs.modal';
    this.TRIGGER.SHOWN = 'shown.bs.modal';
    this.TRIGGER.HIDE = 'hide.bs.modal';
    this.TRIGGER.HIDDEN = 'hidden.bs.modal';
  }

  updateSelector() {
    if (this.id == '') {
      this.id = SHA256.getHash(new Date().formatString()).substr(0, 7);
    }
    this.id = `confirm-${this.id}`;
    this.SELECTOR.ID = `#${this.id}`;
    this.SELECTOR.YES = `${this.SELECTOR.ID}-yes`;
    this.SELECTOR.NO = `${this.SELECTOR.ID}-no`;
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
    $(this.MODEL.SELECTOR.AREA).html(View.getTemplate({
      template: $(this.MODEL.SELECTOR.TEMPLATE),
      model: {
        id: this.MODEL.id,
        title: this.MODEL.title,
        content: this.MODEL.content,
        type: this.MODEL.type,
        backdrop: this.MODEL.backdrop,
        keyboard: this.MODEL.keyboard,
        focus: this.MODEL.focus,
        image: this.MODEL.image,
        yes: this.MODEL.yes,
        no: this.MODEL.no
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

  // ----------------------------------------------------------------
  // Set Event

  setEvent(_set = null) {
    if (_set != null) {
      if (_set) {
        this.setOnHide();
        this.setOnYesClick();
        this.setOnNoClick();
        this.setOnOpen();
      } else {
        this.setOffHide();
        this.setOffYesClick();
        this.setOffNoClick();
        this.setOffOpen();
      }
    }
  }

  // ----------------------------------------------------------------
  // Set Hide

  setOnHide() {
    super.setOn({
      trigger: this.MODEL.TRIGGER.HIDE,
      func: () => {
        this.CONTROLLER.destroy();
      }
    });
  }

  setOffHide() {
    super.setOff({
      trigger: this.MODEL.TRIGGER.HIDE
    });
  }

  // ----------------------------------------------------------------
  // Set Hidden

  setOnHidden() {
    super.setOn({
      trigger: this.MODEL.TRIGGER.HIDDEN,
      func: () => {
        this.CONTROLLER.remove();
      }
    });
  }

  setOffHidden() {
    super.setOff({
      trigger: this.MODEL.TRIGGER.HIDDEN
    });
  }

  // ----------------------------------------------------------------
  // Set On

  setOnOpen() {
    if (this.MODEL.show) {
      this.CONTROLLER.openConfirm();
    } else {
      super.setOn({
        trigger: this.MODEL.trigger,
        selector: this.MODEL.selector,
        func: () => {
          this.CONTROLLER.openConfirm();
        }
      });
    }
  }

  setOnYesClick() {
    super.setOn({
      trigger: 'click',
      selector: this.MODEL.SELECTOR.YES,
      func: () => {
        this.CONTROLLER.selectYes();
      }
    });
  }

  setOnNoClick() {
    super.setOn({
      trigger: 'click',
      selector: this.MODEL.SELECTOR.NO,
      func: () => {
        this.CONTROLLER.selectNo();
      }
    });
  }

  // ----------------------------------------------------------------
  // Set Off

  setOffOpen() {
    if (!this.MODEL.show) {
      super.setOff({
        trigger: this.MODEL.trigger,
        selector: this.MODEL.selector
      });
    }
  }

  setOffYesClick() {
    super.setOff({
      trigger: 'click',
      selector: this.MODEL.SELECTOR.YES
    });
  }

  setOffNoClick() {
    super.setOff({
      trigger: 'click',
      selector: this.MODEL.SELECTOR.NO
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
    Log.logClassKey(this.NAME, this.MODEL.id, 'Open', Log.ARROW_INPUT);
    $(this.MODEL.SELECTOR.ID).modal();
  }

  selectYes() {
    Log.logClassKey(this.NAME, this.MODEL.id, 'Yes', Log.ARROW_INPUT);
    if (Object.getType(this.MODEL.functionYes) == 'Function') {
      Log.logClassKey(this.NAME, 'Yes', 'Exec', Log.ARROW_INPUT);
      this.MODEL.functionYes();
    }
  }

  selectNo() {
    Log.logClassKey(this.NAME, this.MODEL.id, 'No', Log.ARROW_INPUT);
    if (Object.getType(this.MODEL.functionNo) == 'Function') {
      Log.logClassKey(this.NAME, 'No', 'Exec', Log.ARROW_INPUT);
      this.MODEL.functionNo();
    }
  }

  destroy() {
    setTimeout(() => {
      Log.logClassKey(this.NAME, this.MODEL.id, 'Close', Log.ARROW_INPUT);
      if (Object.getType(this.MODEL.functionClose) == 'Function') {
        Log.logClassKey(this.NAME, 'Close', 'Exec', Log.ARROW_INPUT);
        this.MODEL.functionClose();
      }
    });
    setTimeout(() => {
      Log.logClassKey(this.NAME, this.MODEL.id, 'Destroy', Log.ARROW_INPUT);
      this.EVENT.setEvent(false);
      this.EVENT.setOnHidden();
    });
  }

  remove() {
    Log.logClassKey(this.NAME, this.MODEL.id, 'Remove', Log.ARROW_INPUT);
    $(this.MODEL.SELECTOR.ID).remove();
    this.EVENT.setOffHidden();
  }
}
