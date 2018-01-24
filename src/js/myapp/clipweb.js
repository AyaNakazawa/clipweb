
// ----------------------------------------------------------------
// clipweb Class

// ----------------------------------------------------------------
// Model

class ClipwebModel extends CommonModel {
  constructor (
    initSetting = {
      NAME: 'clipweb Object'
    }
  ) {
    super(initSetting);

    // ----------------------------------------------------------------
    // エラーコード
    super.addMessage(301, 'username_alreay_exist');
    super.addMessage(302, 'email_address_alreay_exist');
    super.addMessage(303, 'hash_alreay_exist');
    super.addMessage(401, 'email_password_incorrect');
    super.addMessage(402, 'password_incorrect');
    super.addMessage(404, 'clip_not_exists');
    super.addMessage(801, 'corrupt_userdata');

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'clipweb';

    this.TYPE = {};
    this.TYPE.REGISTER = 'register';
    this.TYPE.LOGIN = 'login';
    this.TYPE.LOGOUT = 'logout';
    this.TYPE.LEAVE = 'leave';
    this.TYPE.INFO = 'info';
    this.TYPE.SETTING = 'setting';
    this.TYPE.SEARCH = 'search';
    this.TYPE.HISTORY = 'history';
    this.TYPE.SHARE = 'share';
    this.TYPE.LIST = 'list';
    this.TYPE.LOAD = 'load';
    this.TYPE.OPEN = 'open';
    this.TYPE.NEW = 'new';
    this.TYPE.SAVE = 'save';
    this.TYPE.DELETE = 'delete';

    this.TIMING = {};
    this.TIMING.AFTER = 'after';
    this.TIMING.BEFORE = 'before';
    this.TIMING.ERROR = 'error';
    this.TIMING.SUCCESS = 'success';

    // ----------------------------------------------------------------
    // 時間
    this.TIME = {};
    this.TIME.POST = new Date();
    this.TIME.BEFORE_SEND = new Date();
    this.TIME.RETURN = new Date();
    this.TIME.COMPLETE = new Date();

    // ----------------------------------------------------------------
    // ステータス
    this.STATUS = {};

    // ----------------------------------------------------------------
    // LocalStorageキー
    this.LS = {};

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE = {};

    // ----------------------------------------------------------------
    // バリデーション
    this.VALIDATE = {};
    this.VALIDATE.LENGTH = {};
    this.VALIDATE.LENGTH.MIN_USERNAME = 3;
    this.VALIDATE.LENGTH.MAX_USERNAME = 32;
    this.VALIDATE.LENGTH.MIN_PASSWORD = 8;
    this.VALIDATE.LENGTH.MAX_PASSWORD = 32;
    this.VALIDATE.LENGTH.MIN_FILENAME = 1;
    this.VALIDATE.LENGTH.MAX_FILENAME = 128;

    this.VALIDATE.PATTERN = {};
    this.VALIDATE.PATTERN.PASSWORD = '^[a-zA-Z0-9]*(?:[a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$';

    // ----------------------------------------------------------------
    // セレクタ
    this.SELECTOR = {};

    // エリア
    this.SELECTOR.AREA = '#clipweb-area';

  }
}

// ----------------------------------------------------------------
// View

class ClipwebView extends CommonView {
  constructor (
    initSetting = {
      NAME: 'clipweb View'
    }
  ) {
    super(initSetting);
  }

  generateArea ({
    type = null,
    view = false,
    header = null,
    headerButton = 'fas fa-times',
    alertType = this.MODEL.ALERT_SUCCESS,
    alertClose = true,
    alertMessage = null,
    loadingHeader = null
  } = {}) {
    super.log()();
    Log.log('Generating...', Log.ALIGN_CENTER)();

    // Set

    if (loadingHeader != null) {
      view = true;
    }
    if (alertMessage != null) {
      view = true;
    }
    if (header != null) {
      view = true;
    }
    if (type != null) {
      view = true;
    }

    // Type

    let _mainTemplate = null;
    let _mainModel = null;

    if (type != null) {
      header = this.CONTROLLER.getAreaHeader(type);
      _mainTemplate = this.MODEL.TEMPLATE[type.toUpperCase()];
      _mainModel = this.CONTROLLER.getAreaModel(type);
    }

    // Clear
    this.clear();

    // Generate
    if (type != null) {
      super.log(type.capitalize(), 'Generate')();
    }

    // Generate Header
    if (header != null) {
      super.generateHeader({
        header: header,
        buttonIcon: headerButton,
        buttonTabindex: 290
      });
    }

    // Generate Loading
    if (loadingHeader != null) {
      super.generateLoading({
        header: loadingHeader
      });
    }

    // Generate Alert
    if (alertMessage != null) {
      super.generateAlert({
        type: alertType,
        message: alertMessage,
        close: alertClose
      });
    }

    // Generate Content
    if (_mainTemplate != null && _mainModel != null) {
      super.append({
        template: _mainTemplate,
        model: _mainModel
      });
    }

    // View
    this.setView({ view: view, scroll: true });

    Log.log('Generated !', Log.ALIGN_CENTER)();
    super.log()();
  }
}

// ----------------------------------------------------------------
// Event

class ClipwebEvent extends CommonEvent {
  constructor (
    initSetting = {
      NAME: 'clipweb Event'
    }
  ) {
    super(initSetting);
  }

  // ----------------------------------------------------------------
  // set on with loading

  setOnLoading ({
    type = null,
    successOpenMode = this.MODEL.KEY,
    successOpenType = null,
    successModel = {},
    successFunction = () => {},
    errorOpenMode = this.MODEL.KEY,
    errorOpenType = null,
    errorModel = {},
    errorFunction = () => {}
  } = {}) {
    if (type == null) {
      Log.error(arguments)();
      return;
    }
    super.log(type.capitalize(), 'Loading')();

    // Loading
    this.CONTROLLER.openLoading(type);

    // Success
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.SUCCESS,
      func: () => {
        this.CONTROLLER.open({
          mode: successOpenMode,
          type: successOpenType,
          model: successModel
        });
        successFunction();
      }
    });
    // Error
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.ERROR,
      func: () => {
        this.CONTROLLER.open({
          mode: errorOpenMode,
          type: errorOpenType,
          model: errorModel
        });
        errorFunction();
      }
    });
    // Complete
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.COMPLETE,
      func: () => {
        super.log(type.capitalize(), 'Complete')();
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.SUCCESS });
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.ERROR });
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.COMPLETE });
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class ClipwebController extends CommonController {
  constructor (
    model = {},
    initSetting = {
      NAME: 'clipweb Controller',
      MODEL: new ClipwebModel(),
      VIEW: new ClipwebView(),
      EVENT: new ClipwebEvent()
    }
  ) {
    super(model, initSetting);
  }

  // ----------------------------------------------------------------
  // open

  open ({
    mode = this.MODEL.KEY,
    type = null,
    model = {}
  } = {}) {
    if (type != null) {
      model['type'] = type;
    }

    if (mode == this.MODEL.KEY) {
      this.VIEW.generateArea(model);
    } else if (mode == UserModel.KEY) {
      USER.open({ mode: mode, type: type, model: model });
    } else if (mode == ListModel.KEY) {
      LIST.open({ mode: mode, type: type, model: model });
    } else {
      Log.error(arguments, 'unknown mode')();
      return;
    }
  }

  openLoading (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return;
    }

    this.open({
      model: {
        loadingHeader: LN.get(`loading_header_${type}`)
      }
    });
  }

  // ----------------------------------------------------------------
  // model

  getAjaxData ({
    type = this.MODEL.KEY,
    key = null
  } = {}) {
    if (key == null) {
      return this.MODEL.OBJECT.AJAX[type];
    }
    if (typeof this.MODEL.OBJECT.AJAX[type] == 'undefined') {
      Log.error(arguments, 'type undefined', this.MODEL.OBJECT.AJAX)();
      return;
    }
    if (typeof this.MODEL.OBJECT.AJAX[type][key] != 'undefined') {
      return this.MODEL.OBJECT.AJAX[type][key];
    } else {
      Log.error(arguments, 'key undefined', this.MODEL.OBJECT.AJAX)();
      return;
    }
  }

  getErrorModel ({
    type = null,
    localization = null,
    error = null
  } = {}) {
    type = Object.getArg(arguments, 0, 'String', type);
    localization = Object.getArg(arguments, 1, 'String', localization);
    error = Object.getArg(arguments, 2, 'Object', error);
    if (type == null || localization == null) {
      Log.error(arguments)();
      return;
    }
    let _result = '';
    switch (type) {
      case 'result':
        _result = {
          alertMessage:
            View.element({ element: 'h5', content: LN.get('server_not_working') }) +
            View.element({ element: 'hr' }) +
            View.element({ content: LN.get(localization) }),
          alertType: View.ALERT_DANGER
        };
        break;
      case 'clipweb':
        _result = {
          alertMessage:
            View.element({ element: 'h5', content: LN.get(localization) }) +
            View.element({ element: 'hr' }) +
            View.element({ content: LN.get(`clipweb_${this.MODEL.KEY}_error_code`, {
              project: Project.NAME,
              code: error['code']
            }) }) +
            View.element({ content: LN.get(`clipweb_${this.MODEL.KEY}_error_message`, {
              message: this.MODEL.getMessage(error['code'], error['message'], true)
            }) }),
          alertType: View.ALERT_WARNING
        };
        break;
      case 'fsql':
        _result = {
          alertMessage:
            View.element({ element: 'h5', content: LN.get(localization) }) +
            View.element({ element: 'hr' }) +
            View.element({ content: LN.get('flex_sqlite3_error_code', { code: error['code'] }) }) +
            View.element({ content: LN.get('flex_sqlite3_error_mode', { mode: error['mode'] }) }) +
            View.element({ content: LN.get('flex_sqlite3_error_message', { message: error['message'] }) }),
          alertType: View.ALERT_WARNING
        };
        break;
      case 'server':
        _result = {
          alertMessage: (
            View.element({ element: 'h5', content: LN.get('failed_connect_to_server') }) +
            View.element({ element: 'hr' }) +
            View.element({ content: LN.get(localization) })
          ),
          alertType: View.ALERT_DANGER
        };
        break;
    }
    return _result;
  }

  // ----------------------------------------------------------------
  // post

  post ({
    mode = this.MODEL.KEY,
    type = null,
    data = {},
    path = 'python/clipweb.py',
    method = 'GET',
    cache = false,
    dateType = 'json'
  } = {}) {
    if (type == null) {
      Log.error(arguments)();
      return;
    }

    super.log()();
    Log.log('Post', Log.ALIGN_CENTER)();
    super.log('post', `${mode.toLowerCase()}.${type.toLowerCase()}`)();

    data['type'] = `${mode.toLowerCase()}.${type.toLowerCase()}`;

    super.log('data')(data);

    this.MODEL.TIME.POST = new Date();

    $.ajax({
      url: path,
      data: data,
      method: method,
      cache: cache,
      dateType: dateType,
      beforeSend: (jqXHR, settings) => {
        this.MODEL.TIME.BEFORE_SEND = new Date();
        super.log()();
        Log.log('Post Before Send', Log.ALIGN_CENTER)();
        super.log('post', 'Send')();
        super.log('settings')(settings);
        // super.log('jqXHR')(jqXHR);
      },
      success: (data, textStatus, jqXHR) => {
        this.MODEL.TIME.RETURN = new Date();
        data = JSON.parse(data);
        super.log()();
        Log.log('Post Success', Log.ALIGN_CENTER)();
        super.log('post', 'Success')();
        // super.log('textStatus', textStatus)();
        super.log('data', data)();
        // super.log('jqXHR', jqXHR)();
        super.log()();
        this.MODEL.OBJECT.AJAX = data;
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.SUCCESS });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        this.MODEL.TIME.RETURN = new Date();
        super.log()();
        Log.log('Post Error', Log.ALIGN_CENTER)();
        super.log('post', 'Error')();
        super.log('textStatus', textStatus)();
        super.log('errorThrown', errorThrown)();
        super.log('jqXHR', jqXHR)();
        super.log()();
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.ERROR });
      },
      complete: (jqXHR, textStatus) => {
        this.MODEL.TIME.COMPLETE = new Date();
        super.log()();
        Log.log('Post Complete', Log.ALIGN_CENTER)();
        super.log('post', 'Complete')();
        // super.log('textStatus', textStatus)();
        // super.log('jqXHR', jqXHR)();
        const _EXEC_TIME = parseInt(this.getAjaxData({ type: 'exec_time' }) * 1000);
        Log.log('Post Time', Log.ALIGN_CENTER)();
        Log.classKey(
          'Before Send',
          new Date(this.MODEL.TIME.BEFORE_SEND - this.MODEL.TIME.POST).formatString('%S.%MSs'),
          new Date(this.MODEL.TIME.BEFORE_SEND - this.MODEL.TIME.POST).formatString('%S.%MSs')
        )();
        Log.classKey(
          'Server Exec',
          new Date(_EXEC_TIME).formatString('%S.%MSs'),
          new Date(_EXEC_TIME + (this.MODEL.TIME.BEFORE_SEND - this.MODEL.TIME.POST)).formatString('%S.%MSs')
        )();
        Log.classKey(
          'Network Delay',
          new Date((this.MODEL.TIME.RETURN - this.MODEL.TIME.BEFORE_SEND) - _EXEC_TIME).formatString('%S.%MSs'),
          new Date(this.MODEL.TIME.RETURN - this.MODEL.TIME.POST).formatString('%S.%MSs')
        )();
        Log.classKey(
          'Post Complete',
          new Date(this.MODEL.TIME.COMPLETE - this.MODEL.TIME.RETURN).formatString('%S.%MSs'),
          new Date(this.MODEL.TIME.COMPLETE - this.MODEL.TIME.POST).formatString('%S.%MSs')
        )();
        super.log()();
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.COMPLETE });
      }
    });
  }

}
