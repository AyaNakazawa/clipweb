
// ----------------------------------------------------------------
// Content Class
// ----------------------------------------------------------------

class Content {
  static get TYPE_NAME_KEY () {
    return 0;
  }

  static get TYPE_BUTTON () {
    return 'BUTTON';
  }

  static get TYPE_TEXT () {
    return 'TEXT';
  }

  static get TYPE_INPUT () {
    return 'INPUT';
  }

  static get CONTENT () {
    return 'content';
  }

  static get ITEM () {
    return 'content-item';
  }

  static get HEADER () {
    return 'content-header';
  }

  static get HEADER_BUTTON () {
    return 'content-header-button';
  }

  static get NAV () {
    return 'content-nav';
  }

  static get NAV_ITEM () {
    return 'content-nav-item';
  }

  static get ITEM_NAME () {
    return 'content-item-name';
  }

  static get ITEM_KEYS () {
    return 'content-item-keys';
  }

  static get ITEM_KEY () {
    return 'content-item-key';
  }

  static getContent (_id = null) {
    if (_id != null) {
      return `<div class='${Content.CONTENT}' id='${_id}'></div>`;
    }
    return '';
  }

  static getHeader (
    _header = null,
    _icon = null,
    _id = null,
    _tabindex = null
  ) {
    if (_header != null) {
      let button = '';
      let icon = '';
      if (_icon != null) {
        icon = `<i class="${_icon}"></i>`;
        let id = '';
        if (_id != null) {
          id = ` id=${_id}`;
        }
        let tabindex = '';
        if (_tabindex != null) {
          tabindex = ` tabindex=${_tabindex}`;
        }

        button = ` <button class='close ${Content.HEADER_BUTTON}'${id}${tabindex}>${icon}</button>`;
      }
      return `<div class='${Content.HEADER}'>${_header}${button}</div>`;
    }
    return '';
  }

  static getNav () {
    return `<div class='${Content.NAV}'></div>`;
  }

  static getNavItem ({
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

  static getItemName (_name = null) {
    if (_name != null) {
      return `<div class='${Content.ITEM_NAME}'>${_name}</div>`;
    }
    return '';
  }

  static getItemKey (..._keys) {
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

  static getItem ({
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
