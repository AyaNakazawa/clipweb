
// ----------------------------------------------------------------
// View

class View {
  static get NAME () {
    return 'View Class';
  }

  static get SPEED_REMOVE () {
    return 350;
  }

  static get ALERT_SUCCESS () {
    return 'success';
  }

  static get ALERT_INFO () {
    return 'info';
  }

  static get ALERT_WARNING () {
    return 'warning';
  }

  static get ALERT_DANGER () {
    return 'danger';
  }

  static get TEMPLATE_LOADING () {
    return '#loading-template';
  }

  static get TEMPLATE_ALERT () {
    return '#alert-template';
  }

  static get TEMPLATE_RUBY () {
    return '#ruby-template';
  }

  static element ({
    element = 'div',
    id = null,
    clas = null,
    content = null,
    attr = null
  } = {}) {
    if (element == null) {
      Log.error(arguments)();
      return;
    }
    let result = '';
    let _id = '';
    let _clas = '';
    let _content = '';
    let _attr = '';

    if (id != null) {
      id = id.replace('#', '');
      _id = ` id="${id}"`;
    }
    if (clas != null) {
      id = id.replace('.', '');
      _clas = ` class="${clas}"`;
    }
    if (content != null) {
      _content = content;
    }
    if (attr != null) {
      if (Object.getType(attr) == 'Object') {
        for (let key of Object.keys(attr)) {
          _attr += ` ${key}="${attr[key]}"`;
        }
      }
    }

    result = `<${element}${_id}${_clas}${_attr}>${_content}</${element}>`;
    return result;
  }

  static getTemplate ({
    template = null,
    model = {}
  } = {}) {
    if (template == null) {
      return null;
    }

    const _template = $(template).text();
    const _compiled = _.template(_template);
    return _compiled(model);
  }

  static getAlert ({
    type = View.ALERT_SUCCESS,
    message = null,
    text = 'ALERT',
    close = true
  } = {}) {
    message = message || text;
    if (message == null) {
      Log.error(arguments)();
      return;
    }

    let result = null;
    result = View.getTemplate({
      template: View.TEMPLATE_ALERT,
      model: {
        type: type,
        message: message,
        close: close
      }
    });

    return result;
  }

  static getLoading ({
    header = 'LOADING'
  } = {}) {
    if (header == null) {
      Log.error(arguments)();
      return;
    }

    let result = null;
    result = View.getTemplate({
      template: View.TEMPLATE_LOADING,
      model: {
        header: header
      }
    });

    return result;
  }

  static removeHTML ({
    selector = null,
    speed = View.SPEED_REMOVE
  } = {}) {
    if (selector == null) {
      return false;
    }
    $(selector).slideUp(speed, () => {
      $(selector).remove();
    });
    return true;
  }
}
