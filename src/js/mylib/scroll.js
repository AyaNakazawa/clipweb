
// ----------------------------------------------------------------
// Scroll Class

// ----------------------------------------------------------------
// Model

class ScrollModel extends CommonModel {
  constructor (
    _initSetting = {
      NAME: 'Scroll Object',
      selector: null,
      speed: 750,
      easing: 'easeInOutCubic',
      offset: 0,
      eventSelector: null,
      eventTrigger: 'click'
    }
  ) {
    super(_initSetting);
  }
}

// ----------------------------------------------------------------
// View

class ScrollView extends CommonView {
  constructor (
    _initSetting = {
      NAME: 'Scroll View'
    }
  ) {
    super(_initSetting);
  }

  scroll () {
    super.log('Scroll');
    if (this.MODEL.selector == null) {
      super.logGenerate(this.scroll, arguments);
      super.logError('selector is null');
      return;
    }
    $(this.MODEL.COMMON.BODY).animate(
      {
        scrollTop: $(this.MODEL.selector).offset().top + this.MODEL.offset
      },
      {
        duration: this.MODEL.speed,
        easing: this.MODEL.easing
      }
    );
  }
}

// ----------------------------------------------------------------
// Event

class ScrollEvent extends CommonEvent {
  constructor (
    _initSetting = {
      NAME: 'Scroll Event'
    }
  ) {
    super(_initSetting);
  }

  setOnScroll () {
    if (this.MODEL.eventSelector != null) {
      super.setOn({
        trigger: this.MODEL.eventTrigger,
        selector: this.MODEL.eventSelector,
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
  constructor (
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

    this.initScrollView();
  }

  initScrollView () {
    if (this.MODEL.selector == null) {
      super.logGenerate(this.initScrollView, arguments);
      super.logError('scroll selector is null');
      return;
    }
    this.EVENT.setOnScroll();
  }
}
