
// ----------------------------------------------------------------
// Content Class
// ----------------------------------------------------------------

class Content {
  static get TYPE_NAME_KEY() {
    return 0;
  }

  static get TYPE_BUTTON() {
    return 'BUTTON';
  }

  static get TYPE_TEXT() {
    return 'TEXT';
  }

  static get TYPE_INPUT() {
    return 'INPUT';
  }

  static get CONTENT() {
    return 'content';
  }

  static get ITEM() {
    return 'content-item';
  }

  static get HEADER() {
    return 'content-header';
  }

  static get HEADER_BUTTON() {
    return 'content-header-button';
  }

  static get NAV() {
    return 'content-nav';
  }

  static get NAV_ITEM() {
    return 'content-nav-item';
  }

  static get ITEM_NAME() {
    return 'content-item-name';
  }

  static get ITEM_KEYS() {
    return 'content-item-keys';
  }

  static get ITEM_KEY() {
    return 'content-item-key';
  }

  static getContent(_id = null) {
    if (_id != null) {
      return `<div class='${Content.CONTENT}' id='${_id}'></div>`;
    }
    return '';
  }

  static getHeader(
    _header = null,
    _button = null,
    _id = null
  ) {
    if (_header != null) {
      let button = '';
      if (_button != null) {
        let id = '';
        if (_id != null) {
          id = ` id=${_id}`;
        }

        button = ` <i class='${Content.HEADER_BUTTON} ${_button}'${id}></i>`;
      }
      return `<div class='${Content.HEADER}'>${_header}${button}</div>`;
    }
    return '';
  }

  static getNav() {
    return `<div class='${Content.NAV}'></div>`;
  }

  static getNavItem({
    name = null,
    type = Content.TYPE_BUTTON,
    buttonType = 'secondary',
    addClass = '',
    addId = '',
    value = '',
    placeHolder = ''
  } = {}) {
    if (type == Content.TYPE_BUTTON) {
      return `<button class='${Content.NAV_ITEM} btn btn-outline-${buttonType} ${addClass}' id="${addId}">${name}</button>`;

    } else if (type == Content.TYPE_TEXT) {
      return `<span class='${Content.NAV_ITEM} ${addClass}' id="${addId}">${name}</span>`;

    } else if (type == Content.TYPE_INPUT) {
      return `<input class='${Content.NAV_ITEM} form-control ${addClass}' id="${addId}" placeholder="${placeHolder}" value="${value}">`;
    }
    return '';
  }

  static getItemName(_name = null) {
    if (_name != null) {
      return `<div class='${Content.ITEM_NAME}'>${_name}</div>`;
    }
    return '';
  }

  static getItemKey(..._keys) {
    let result = '';
    if (_keys.length > 0 && (_keys.length == 1 && _keys[0] != null)) {
      result += `<div class='${Content.ITEM_KEYS}'>`;
      for (let i = 0; i < _keys.length; i++) {
        // content-key の作成
        result += `<div class='${Content.ITEM_KEY}'>${_keys[i]}</div>`;
      }
      result += '</div>';
    }
    return result;
  }

  static getItem({
    type = Content.TYPE_NAME_KEY,
    contentId = null,
    header = null,
    name = null,
    keys = null
  } = {}) {
    let result = '';

    if (contentId != null) {
      result += `<div class='${Content.CONTENT}' id='${contentId}'>`;
    }
    if (type == Content.TYPE_NAME_KEY) {
      // content-header の作成
      result += Content.getHeader(header);

      // content-item の作成
      result += `<div class='${Content.ITEM}'>`;

      // content-name の作成
      result += Content.getItemName(name);

      // content-keys の作成
      result += Content.getItemKey(keys);

      result += '</div>';
    }
    if (contentId != null) {
      result += '</div>';
    }
    return result;
  }
}

// ----------------------------------------------------------------
// Model

class ContentModel extends CommonModel {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Content Object',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);
  }
}

// ----------------------------------------------------------------
// View

class ContentView extends CommonView {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Common View',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);
  }

  generateAlert({
    selector = this.MODEL.SELECTOR_AREA,
    type = View.ALERT_SUCCESS,
    message = null,
    close = true
  } = {}) {
    if (selector == null) {
      Log.logCaution(this.NAME, 'generateAlert', 'Undefined selector');
      return;
    }

    $(selector).append(View.getAlert({
      type: type,
      message: message,
      close: close
    }));
  }

  generateLoading({
    selector = this.MODEL.SELECTOR_AREA,
    header = 'Loading',
    message = 'Loading'
  } = {}) {
    if (selector == null) {
      Log.logCaution(this.NAME, 'generateLoading', 'Undefined selector');
      return;
    }

    $(selector).append(View.getLoading({
      header: header,
      message: message
    }));
  }
}

// ----------------------------------------------------------------
// Event

class ContentEvent extends CommonEvent {
  constructor(
    _initSetting = {},
    _common = {
      NAME: 'Content Event',
      VIEW_NAME: false
    }
  ) {
    super(_initSetting, _common);
  }
}

// ----------------------------------------------------------------
// Controller

class ContentController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {},
    _common = {
      NAME: 'Content Controller',
      VIEW_NAME: false,
      VIEW_OBJECT: true,
      MODEL: new ContentModel(),
      VIEW: new ContentView(),
      EVENT: new ContentEvent()
    }
  ) {
    super(_model, _initSetting, _common);
  }
}
