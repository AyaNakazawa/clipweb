
// ----------------------------------------------------------------
/**
 * Popover
 * Doc: https://getbootstrap.com/docs/4.0/components/popovers/#options
 * @param  {String}  NAME              Name of Object
 * @param  {String}  selector          Selector of Popover
 * @param  {String}  title             Title of Popover
 * @param  {String}  content           Content of Popover
 * @param  {String}  trigger           Trigger of Popover
 * @param  {String}  placement         Placement of Popover
 * @param  {Number}  delay             Delay of Popover
 * @param  {Boolean} html              Html insert flag of Popover
 * @param  {String}  offset            Offset of Popover
 * @param  {String}  fallbackPlacement Fallback placement of Popover
 * @param  {String}  boundary          Boundary of Popover
 * @return {Popover}                   extends PopoverController, CommonController, Commonclass
**/

// ----------------------------------------------------------------
// Model

class PopoverModel extends CommonModel {
  constructor(
    _setting = {},
    _initSetting = {
      NAME: 'Popover Object',
      selector: null,
      container: false,
      title: null,
      content: null,
      trigger: 'hover',
      placement: 'top',
      delay: 0,
      html: false,
      offset: 0,
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
      Log.logCautionCommon({
        obj: this,
        func: this.setView,
        args: arguments
      });
      return null;
    }

    if (view) {
      return this.show();
    } else if (!view) {
      return this.hide();
    } else {
      Log.logCautionCommon({
        obj: this,
        func: this.setView,
        args: arguments,
        message: 'unknown view.'
      });
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
        this.MODEL.container = this.MODEL.selector;
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

// ----------------------------------------------------------------
// Main

class Popover extends PopoverController {
  constructor(
    _model = {}
  ) {
    super(_model);
  }
}
