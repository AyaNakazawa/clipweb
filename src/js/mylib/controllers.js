
// ----------------------------------------------------------------
/**
 * Confirm
 * Doc: https://getbootstrap.com/docs/4.0/components/modal/#options
 * @param  {String}         NAME          Name of Object
 * @param  {String}         id            id of confirm selector
 * @param  {String}         title         Title of modal
 * @param  {String}         content       Content of modal
 * @param  {String}         template      template of underscore
 * @param  {Object}         model         model of template
 * @param  {Number}         type          Type of button number (0, 1, 2)
 * @param  {Boolean}        show          Show modal when init
 * @param  {Boolean|String} backdrop      Includes backdrop (true, false, 'static')
 * @param  {Boolean}        keyboard      Close modal when escape key pressed
 * @param  {Boolean}        focus         Focus modal when init
 * @param  {String}         selector      Selector of Event
 * @param  {String}         trigger       Trigger of Event
 * @param  {String}         image         Image data of modal
 * @param  {String}         yes           Name of Yes button
 * @param  {String}         no            Name of No button
 * @param  {Function}       functionYes   Function run when Yes pressed
 * @param  {Function}       functionNo    Function run when No pressed
 * @param  {Function}       functionClose Function run when closed
 * @param  {Function}       functionOpen  Function run when opening
 * @return {Confirm}                      Extends ConfirmController, CommonController, Commonclass
**/

class Confirm extends ConfirmController {
  static get TYPE_0 () { return 0; }
  static get TYPE_1 () { return 1; }
  static get TYPE_2 () { return 2; }
  static get TYPE_EMPTY () { return 0; }
  static get TYPE_YES () { return 1; }
  static get TYPE_YES_NO () { return 2; }
  constructor (
    _model = {
      // NAME: 'Confirm Object',
      // id: '',
      // title: '',
      // content: '',
      // template: null,
      // model: {},
      // type: Confirm.TYPE_1,
      // show: true,
      // backdrop: true,
      // keyboard: true,
      // focus: true,
      // selector: null,
      // trigger: 'click',
      // image: '',
      // yes: 'Accept',
      // no: 'Close',
      // functionYes: null,
      // functionNo: null,
      // functionClose: null,
      // functionOpen: null
    }
  ) {
    super(_model);
  }
}

// ----------------------------------------------------------------
/**
 * Popover
 * Doc: https://getbootstrap.com/docs/4.0/components/popovers/#options
 * @param  {String}        NAME              Name of Object
 * @param  {String}        selector          Selector of Popover
 * @param  {String}        title             Title of Popover
 * @param  {String}        content           Content of Popover
 * @param  {String}        trigger           Trigger of Popover
 * @param  {String}        placement         Placement of Popover
 * @param  {Number}        delay             Delay of Popover
 * @param  {Boolean}       html              Html insert flag of Popover
 * @param  {String|Number} offset            Offset of Popover
 * @param  {String}        container         Container of Popover
 * @param  {String}        fallbackPlacement Fallback placement of Popover
 * @param  {String}        boundary          Boundary of Popover
 * @return {Popover}                         Extends PopoverController, CommonController, Commonclass
**/

class Popover extends PopoverController {
  constructor (
    _model = {
      // NAME: 'Popover Object',
      // selector: null,
      // title: null,
      // content: null,
      // trigger: 'hover',
      // placement: 'top',
      // delay: 0,
      // html: false,
      // offset: 0,
      // container: true,
      // fallbackPlacement: 'flip',
      // boundary: 'scrollParent'
    }
  ) {
    super(_model);
  }
}

// ----------------------------------------------------------------
/**
 * Scroll
 * Doc: https://getbootstrap.com/docs/4.0/components/popovers/#options
 * @param  {String} NAME           NAME of Object
 * @param  {String} selector       Selector of Scroll
 * @param  {Number} speed          Speed of Scroll
 * @param  {String} easing         Easing of Scroll
 * @param  {Number} offset         Offset of Scroll
 * @param  {String} eventSelector  Selector of Event
 * @param  {String} eventTrigger   Trigger of Event
 * @return {Scroll}                Extends ScrollController, CommonController, Commonclass
**/

class Scroll extends ScrollController {
  constructor (
    _model = {
      // NAME: 'Scroll Object',
      // selector: null,
      // speed: 750,
      // easing: 'easeInOutCubic',
      // offset: 0,
      // eventSelector: null,
      // eventTrigger: 'click'
    }
  ) {
    super(_model);
  }
}

// ----------------------------------------------------------------
/**
 * Switch
 * Doc: https://getbootstrap.com/docs/4.0/components/popovers/#options
 * @param  {String}  NAME            NAME of Object
 * @param  {String}  selector        selector of Switch
 * @param  {Boolean} view            view when init
 * @param  {Number}  speed           speed of Switch
 * @param  {String}  template        template of Switch
 * @param  {String}  localStorageKey localStorageKey of Switch view
 * @param  {String}  eventTrigger    Trigger of Event
 * @param  {String}  eventSelector   Selector of Event
 * @return {Switch}                  Extends SwitchController, CommonController, Commonclass
**/

class Switch extends SwitchController {
  constructor (
    _model = {
      // NAME: 'Switch Object',
      // selector: null,
      // view: null,
      // speed: 500,
      // template: null,
      // localStorageKey: null,
      // eventTrigger: 'click',
      // eventSelector: null
    }
  ) {
    super(_model);
  }
}
