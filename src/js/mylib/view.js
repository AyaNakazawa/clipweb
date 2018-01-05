
// ----------------------------------------------------------------
// View

class View {
  static get NAME() {
    return 'View Class';
  }

  static get SPEED_REMOVE() {
    return 350;
  }

  static get NAV() {
    return 'nav .navbar-nav';
  }

  static get ALERT_SUCCESS() {
    return 'success';
  }

  static get ALERT_INFO() {
    return 'info';
  }

  static get ALERT_WARNING() {
    return 'warning';
  }

  static get ALERT_DANGER() {
    return 'danger';
  }

  static get TEMPLATE_LOADING() {
    return '#loading-template';
  }

  static get TEMPLATE_ALERT() {
    return '#alert-template';
  }

  static get TEMPLATE_RUBY() {
    return '#ruby-template';
  }

  static div({
    id = null,
    cls = null,
    content = null
  } = {}) {
    let result = '';
    let _id = '';
    let _cls = '';
    let _content = '';

    if (id != null) {
      _id = ` id=${id}`;
    }
    if (cls != null) {
      _cls = ` class=${cls}`;
    }
    if (content != null) {
      _content = content;
    }

    result = `<div${_id}${_cls}>${content}</div>`;
    return result;
  }

  static addNav({
    id = 'nav-new'
  } = {}) {
    if (_id != null) {
      return `<div class='${Content.CONTENT}' id='${_id}'></div>`;
    }
    return '';
  }

  static getTemplate({
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

  static getAlert({
    type = View.ALERT_SUCCESS,
    message = null,
    text = 'ALERT',
    close = true
  } = {}) {
    message = message || text;
    if (message == null) {
      Log.logCautionCommon(
        this,
        'getAlert',
        'Undefined message',
        `type: ${type}`,
        `message: ${message}`,
        `text: ${text}`,
        `close: ${close}`
      );
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

  static getLoading({
    header = 'LOADING'
  } = {}) {
    if (header == null) {
      Log.logCautionCommon(
        this,
        'getLoading',
        'Undefined header',
        `header: ${header}`
      );
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

  static removeHTML({
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
