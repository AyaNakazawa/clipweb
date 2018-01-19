
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

  generateArea () {}
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
  // update

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
        super.log('data')(data);
        // super.log('jqXHR')(jqXHR);
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
        super.log('jqXHR')(jqXHR);
        super.log()();
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.ERROR });
      },
      complete: (jqXHR, textStatus) => {
        this.MODEL.TIME.COMPLETE = new Date();
        super.log()();
        Log.log('Post Complete', Log.ALIGN_CENTER)();
        super.log('post', 'Complete')();
        // super.log('textStatus', textStatus)();
        // super.log('jqXHR')(jqXHR);
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
