
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

  static getContent ({
    id = null
  } = {}) {
    id = Object.getArg(arguments, 0, 'String', id);
    if (id == null) {
      Log.error(arguments, 'Need id of arguments. X(')();
      return;
    }
    return View.element({
      id: id,
      clas: Content.CONTENT
    });
  }

  static getHeader ({
    header = null,
    id = null,
    buttonIcon = null,
    buttonTabindex = null,
    buttonId = null,
    buttonClass = null
  } = {}) {
    header = Object.getArg(arguments, 0, 'String', header);
    id = Object.getArg(arguments, 1, 'String', id);
    buttonIcon = Object.getArg(arguments, 2, 'String', buttonIcon);
    buttonTabindex = Object.getArg(arguments, 3, 'String', buttonTabindex);
    buttonId = Object.getArg(arguments, 4, 'String', buttonId);
    buttonClass = Object.getArg(arguments, 5, 'String', buttonClass);

    if (header == null) {
      Log.error(arguments, 'Need header of arguments. X(')();
      return;
    }
    let _result = '';
    let _button = '';
    if (buttonIcon != null) {
      _button = View.element({
        element: 'button',
        id: buttonId,
        clas: `close ${Content.HEADER_BUTTON} ${buttonClass}`,
        content: View.element({
          element: 'i',
          clas: buttonIcon
        }),
        attr: {
          tabindex: buttonTabindex
        }
      });
    }

    _result = View.element({
      id: id,
      clas: Content.HEADER,
      content: `${header}${_button}`
    });
    return _result;
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
