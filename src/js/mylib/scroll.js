
// ----------------------------------------------------------------
// Scroll Class

// ----------------------------------------------------------------
// Model

class ScrollModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Scroll Object',
      SPEED: 750,
      EASING: 'easeOutBack',
      OFFSET: 0,
      TRIGGER_EVENT: 'click',
      SELECTOR_EVENT: null,
      SELECTOR_SCROLL: null
    }
  ) {
    super(_initSetting);
  }
}

// ----------------------------------------------------------------
// View

class ScrollView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Scroll View'
    }
  ) {
    super(_initSetting);
  }

  scroll() {
    Log.logClass(this.NAME, 'Scroll');
    $(this.MODEL.COMMON.BODY).animate(
      {
        scrollTop: $(this.MODEL.SELECTOR_SCROLL).offset().top + this.MODEL.OFFSET
      },
      {
        duration: this.MODEL.SPEED,
        easing: this.MODEL.EASING
      }
    );
  }
}

// ----------------------------------------------------------------
// Event

class ScrollEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Scroll Event'
    }
  ) {
    super(_initSetting);
  }

  setOnScroll() {
    if (this.MODEL.SELECTOR_EVENT != null) {
      super.setOn({
        trigger: this.MODEL.TRIGGER_EVENT,
        selector: this.MODEL.SELECTOR_EVENT,
        func: () => {
          this.VIEW.scroll();
        }
      });
    }
  }
}

// ----------------------------------------------------------------
// Controller

class ScrollController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Scroll Controller',
      MODEL: new ScrollModel(),
      VIEW: new ScrollView(),
      EVENT: new ScrollEvent(),
      VIEW_OBJECT: false
    }
  ) {
    super(_model, _initSetting);

    this.EVENT.setOnScroll();
  }
}
