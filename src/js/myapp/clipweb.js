
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
    super.addMessage(403, 'user_not_found');
    super.addMessage(404, 'clip_not_exists');
    super.addMessage(405, 'owner_not_exists');
    super.addMessage(801, 'corrupt_userdata');
    super.addMessage(802, 'corrupt_clipdata');
    super.addMessage(901, 'permission_denied');
    super.addMessage(902, 'permission_denied_or_clip_not_found');

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'clipweb';
    this.NULL = 'clipweb_null';
    this.ERROR = 'clipweb_error';

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
    this.TYPE.EDITOR = 'editor';
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
    // データ
    this.THEME_LIST = ace.require('ace/ext/themelist');
    this.MODE_LIST = ace.require('ace/ext/modelist');
    this.EXTENSION_LIST = this.setExtensions();

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

  setExtensions () {
    let _types = this.MODE_LIST['modesByName'];
    let _result = {};
    let _extensions = [];
    for (let type of Object.keys(_types)) {
      _extensions = _types[type]['extensions'].split('|');
      for (let index = 0; index < _extensions.length; index ++) {
        _extensions[index] = _extensions[index].replace('^', '');
        _result[_extensions[index].mini()] = type;
      }
    }
    return _result;
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
    scroll = true,
    callback = null,
    header = null,
    headerButton = 'fas fa-times',
    alertType = this.MODEL.ALERT_SUCCESS,
    alertClose = true,
    alertMessage = null,
    loadingHeader = null
  } = {}) {
    super.log()();
    Log.log('Area generating...', Log.ALIGN_CENTER)();

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
      if (header == null) {
        header = LN.get(`header_${this.MODEL.KEY.mini()}_${type.mini()}`);
      }
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

    this.EVENT.setOnPopover({ selector: this.MODEL.SELECTOR.AREA, type: 'all' });

    // View
    this.setView({ view: view, scroll: scroll, callback: callback });

    Log.log('Area generated', Log.ALIGN_CENTER)();
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

  setLoading ({
    type = null,
    loading = true,
    connectionSuccessOpenMode = this.MODEL.KEY,
    connectionSuccessOpenType = null,
    connectionSuccessModel = {},
    errorMessage = null,
    errorType = 'open',
    errorOpen = null,
    errorClose = false,
    check = [],
    functionSuccess = () => {},
    connectionErrorOpenMode = this.MODEL.KEY,
    connectionErrorOpenType = null,
    connectionErrorModel = {},
    connectionErrorToastModel = null,
    connectionErrorFunction = () => {}
  } = {}) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(type.capitalize(), 'Loading')();

    // Loading
    if (loading) {
      this.CONTROLLER.openLoading(type);
    }

    // Success
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.SUCCESS,
      func: () => {
        if (typeof connectionSuccessModel['scroll'] == 'undefined') {
          connectionSuccessModel['scroll'] = false;
        }
        this.CONTROLLER.open({
          mode: connectionSuccessOpenMode,
          type: connectionSuccessOpenType,
          model: connectionSuccessModel
        });
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.SUCCESS });
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.ERROR });
        this.CONTROLLER.checkSuccess({
          errorMessage: errorMessage,
          errorType: errorType,
          errorOpen: errorOpen,
          errorClose: errorClose,
          check: check,
          functionSuccess: functionSuccess
        });
      }
    });
    // Error
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.ERROR,
      func: () => {
        if (typeof connectionErrorModel['scroll'] == 'undefined') {
          connectionErrorModel['scroll'] = false;
        }
        this.CONTROLLER.open({
          mode: connectionErrorOpenMode,
          type: connectionErrorOpenType,
          model: connectionErrorModel
        });
        if (connectionErrorToastModel != null) {
          connectionErrorToastModel['type'] = 'error';
          this.VIEW.toast(connectionErrorToastModel);
          this.CONTROLLER.open({ model: { scroll: false } });
        }
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.SUCCESS });
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.ERROR });
        connectionErrorFunction();
      }
    });
    // Complete
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.COMPLETE,
      func: () => {
        super.log(type.capitalize(), 'Complete')();
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
      USER.open({ type: type, model: model });
    } else if (mode == ListModel.KEY) {
      LIST.open({ type: type, model: model });
    } else if (mode == ClipModel.KEY) {
      CLIP.open({ type: type, model: model });
    } else if (mode == CodeModel.KEY) {
      CODE.open({ type: type, model: model });
    } else {
      Log.error(arguments, 'unknown mode')();
      return this.MODEL.ERROR;
    }
  }

  close ({
    scroll = false
  } = {}) {
    this.VIEW.generateArea({ scroll: scroll });
  }

  openLoading (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }

    this.open({
      model: {
        loadingHeader: LN.get(`loading_header_${this.MODEL.KEY.mini()}_${type.mini()}`),
        scroll: false
      }
    });
  }

  // ----------------------------------------------------------------
  // model

  getAreaModel () {}

  getAjaxData ({
    type = this.MODEL.KEY,
    key = null,
    key2 = null
  } = {}) {
    if (key == null) {
      return this.MODEL.OBJECT.AJAX[type];
    }
    if (typeof this.MODEL.OBJECT.AJAX[type] == 'undefined') {
      Log.error(arguments, 'type undefined', this.MODEL.OBJECT.AJAX)();
      return this.MODEL.ERROR;
    }
    if (typeof this.MODEL.OBJECT.AJAX[type][key] != 'undefined') {
      if (key2 == null) {
        return this.MODEL.OBJECT.AJAX[type][key];
      } else {
        if (typeof this.MODEL.OBJECT.AJAX[type][key][key2] != 'undefined') {
          return this.MODEL.OBJECT.AJAX[type][key][key2];
        } else {
          // Log.error(arguments, 'key2 undefined', this.MODEL.OBJECT.AJAX)();
          return this.MODEL.ERROR;
        }
      }
    } else {
      // Log.error(arguments, 'key undefined', this.MODEL.OBJECT.AJAX)();
      return this.MODEL.ERROR;
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
      return this.MODEL.ERROR;
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
      case 'toast/result':
        _result = {
          type: 'error',
          message: LN.get(localization)
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
      case 'toast/clipweb':
        _result = {
          type: 'error',
          message: LN.get(localization)
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
      case 'toast/fsql':
        _result = {
          type: 'error',
          message: LN.get(localization)
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
      case 'toast/server':
        _result = {
          type: 'error',
          message: LN.get(localization)
        };
        break;
    }
    return _result;
  }

  checkSuccess ({
    errorMessage = null,
    errorType = 'open',
    errorOpen = null,
    errorClose = false,
    check = [],
    functionSuccess = () => {}
  } = {}) {
    super.log('Check', 'CGI')();
    if (this.getAjaxData({ key: 'result' }) == this.MODEL.ERROR) {
      // resultが取得できない
      super.log('Error', 'Not defined')();
      if (errorType == 'open') {
        this.open({
          type: errorOpen,
          model: this.getErrorModel('result', errorMessage)
        });
      } else {
        this.VIEW.toast({ type: 'error', message: LN.get(errorMessage) });
      }
      Log.error(arguments)();
    } else if (this.getAjaxData({ key: 'result' }) == false) {
      // clipwebエラーが出ているとき
      super.log('Error', 'clipweb')();
      if (this.getAjaxData({ key: 'error', key2: `${Project.NAME} ${this.MODEL.KEY} error` }) != this.MODEL.ERROR) {
        if (errorType == 'open') {
          const _ERROR = this.getAjaxData({ key: 'error', key2: `${Project.NAME} ${this.MODEL.KEY} error` });
          this.open({
            type: errorOpen,
            model: this.getErrorModel('clipweb', errorMessage, _ERROR)
          });
        } else {
          this.VIEW.toast({ type: 'error', message: LN.get(errorMessage) });
        }
      }
      Log.error(arguments)();
    } else {
      let _error = false;
      for (let index = 0; index < check.length; index ++) {
        if (Object.typeIs('String', check[index])) {
          if (this.getAjaxData({ key: check[index] }) == this.MODEL.ERROR) {
            // 未実装
            super.log('Error', 'Unimplemented')();
            if (errorType == 'open') {
              this.open({
                type: errorOpen,
                model: this.getErrorModel('result', errorMessage)
              });
              _error = true;
            } else {
              this.VIEW.toast({ type: 'error', message: LN.get(errorMessage) });
              _error = true;
            }
          } else if (this.getAjaxData({ key: check[index], key2: 'flex sqlite3 error' }) != this.MODEL.ERROR) {
            // Flex SQLite3 エラー
            super.log('Error', 'FlexSQLite3')();
            if (errorType == 'open') {
              const _ERROR = this.getAjaxData({ key: check[index], key2: 'flex sqlite3 error' });
              Log.obj(_ERROR)();
              this.open({
                type: errorOpen,
                model: this.getErrorModel('fsql', errorMessage, _ERROR)
              });
              _error = true;
            } else {
              this.VIEW.toast({ type: 'error', message: LN.get(errorMessage) });
              _error = true;
            }
          }
        } else {
          if (this.getAjaxData({ key: check[index][0], key2: check[index][1] }) == this.MODEL.ERROR) {
            // 未実装
            super.log('Error', 'Unimplemented')();
            if (errorType == 'open') {
              this.open({
                type: errorOpen,
                model: this.getErrorModel('result', errorMessage)
              });
              _error = true;
            } else {
              this.VIEW.toast({ type: 'error', message: LN.get(errorMessage) });
              _error = true;
            }
          }
        }
        if (_error) {
          if (errorClose) {
            this.close();
          }
          Log.error(arguments)();
          return this.MODEL.ERROR;
        }
      }
      // 成功
      super.log('Success', 'CGI')();
      functionSuccess();
    }
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
      return this.MODEL.ERROR;
    }

    super.log()();
    Log.log('Post', Log.ALIGN_CENTER)();
    super.log('post', `${mode.mini()}.${type.mini()}`)();

    data['type'] = `${mode.mini()}.${type.mini()}`;

    super.log('data', data)();

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
