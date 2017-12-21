
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
      Log.logCaution(View.NAME, 'getAlert', 'Undefined message');
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
    header = 'LOADING',
    message = null,
    text = 'LOADING',
  } = {}) {
    message = message || text;
    if (message == null) {
      Log.logCaution(View.NAME, 'getLoading', 'Undefined message');
      return;
    }

    let result = null;
    result = View.getTemplate({
      template: View.TEMPLATE_LOADING,
      model: {
        header: header,
        message: message
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
