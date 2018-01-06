
// ----------------------------------------------------------------
// Popover

// ----------------------------------------------------------------
// Model

class PopoverModel extends CommonModel {
  constructor(
    _setting = {},
    _initSetting = {
      NAME: 'Popover Object',
      selector: null,
      title: null,
      content: null,
      trigger: 'hover',
      placement: 'top',
      delay: 0,
      html: false,
      offset: 0,
      container: true,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    }
  ) {
    super(_setting, _initSetting);
  }
}

// ----------------------------------------------------------------
// View

class PopoverView extends CommonView {
  constructor(
    _setting = {},
    _initSetting = {
      NAME: 'Popover View'
    }
  ) {
    super(_setting, _initSetting);
  }

  show() {
    return $(this.MODEL.selector).popover('show');
  }

  hide() {
    return $(this.MODEL.selector).popover('hide');
  }

  toggle() {
    return $(this.MODEL.selector).popover('toggle');
  }

  update() {
    return $(this.MODEL.selector).popover('update');
  }

  setView(view = null) {
    if (view === null) {
      super.logGenerate(this.setView, arguments);
      super.logError();
      return null;
    }

    if (view) {
      return this.show();
    } else if (!view) {
      return this.hide();
    } else {
      super.logGenerate(this.setView, arguments);
      super.logError('unknown view.');
      return null;
    }
  }
}

// ----------------------------------------------------------------
// Event

class PopoverEvent extends CommonEvent {
  constructor(
    _setting = {},
    _initSetting = {
      NAME: 'Popover Event'
    }
  ) {
    super(_setting, _initSetting);
  }

  setPopover() {
    if (this.MODEL.selector === null) {
      Log.log('test');
    } else {
      if (this.MODEL.content != null || this.MODEL.title != null) {
        if (this.MODEL.container == true) {
          this.MODEL.container = this.MODEL.selector;
        }
        $(this.MODEL.selector).attr('title', this.MODEL.title);
        $(this.MODEL.selector).attr('data-content', this.MODEL.content);
        $(this.MODEL.selector).attr('data-trigger', this.MODEL.trigger);
        $(this.MODEL.selector).attr('data-placement', this.MODEL.placement);
        $(this.MODEL.selector).attr('data-delay', this.MODEL.delay);
        $(this.MODEL.selector).attr('data-html', this.MODEL.html);
        $(this.MODEL.selector).attr('data-offset', this.MODEL.offset);
        $(this.MODEL.selector).attr('data-fallbackPlacement', this.MODEL.fallbackPlacement);
        $(this.MODEL.selector).attr('data-boundary', this.MODEL.boundary);
        $(this.MODEL.selector).attr('data-toggle', 'popover');
        $(this.MODEL.selector).popover();
      }
    }
  }
}

// ----------------------------------------------------------------
// Controller

class PopoverController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Popover Controller',
      MODEL: new PopoverModel(),
      VIEW: new PopoverView(),
      EVENT: new PopoverEvent(),
      VIEW_OBJECT: true
    }
  ) {
    super(_model, _initSetting);

    this.EVENT.setPopover();
  }

  dispose() {
    return $(this.MODEL.selector).popover('dispose');
  }

  destroy() {
    return this.dispose();
  }

  enable() {
    return $(this.MODEL.selector).popover('enable');
  }

  disable() {
    return $(this.MODEL.selector).popover('disable');
  }

  toggleEnabled() {
    return $(this.MODEL.selector).popover('toggleEnabled');
  }
}
