
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends CommonModel {
  constructor (
    initSetting = {
      NAME: 'User Object'
    }
  ) {
    super(initSetting);

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'user';

    this.TYPE = {};
    this.TYPE.REGISTER = 'REGISTER';
    this.TYPE.LOGIN = 'LOGIN';
    this.TYPE.LOGOUT = 'LOGOUT';
    this.TYPE.LEAVE = 'LEAVE';
    this.TYPE.SETTING = 'SETTING';
    this.TYPE.INFO = 'INFO';

    this.TIMING = {};
    this.TIMING.AFTER = 'AFTER';
    this.TIMING.BEFORE = 'BEFORE';

    // ----------------------------------------------------------------
    // ログインステータス
    this.STATUS = {};
    this.STATUS.LOGIN = false;

    // ----------------------------------------------------------------
    // ユーザ名
    this.USERNAME = 'test';
    // メールアドレス
    this.EMAIL = 'test@test';
    // パスワード
    this.PASSWORD = '';
    // メール認証フラグ
    // 認証していない場合は
    //  - クリップ数を制限
    //  - 公開クリップしか作れない
    this.EMAIL_AUTH = false;

    // ハッシュ
    this.HASH = {};
    // ユーザハッシュ
    // メールアドレスから生成
    // ログイン、登録時に使用
    // クリップ生成時に使用
    // ユーザハッシュ + 日時 = クリップID
    this.HASH.USER = null;
    // パスワードハッシュ
    // パスワード から生成
    // ログイン、登録時に使用
    // 暗号ハッシュ生成に使用
    this.HASH.PASSWORD = null;
    this.HASH.PASSWORD_NEW = null;
    // 暗号ハッシュ
    // 非公開クリップの暗号化に使用
    // ユーザハッシュ + パスワード = 暗号ハッシュ
    this.HASH.CRYPTO = null;
    // メール認証ハッシュ
    // メールアドレス + サーバSalt = メール認証ハッシュ
    // メール認証に使用
    this.HASH.EMAIL_AUTH = null;
    // Gravatarハッシュ
    // メールアドレスのMD5ハッシュ
    this.HASH.GRAVATAR = null;

    // ユーザ設定
    this.THEME = 'light';
    this.OWNER_PUBLISH = 'public';
    this.CLIP_MODE = 'private';

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE = {};
    this.TEMPLATE.LOGIN = '#login-template';
    this.TEMPLATE.REGISTER = '#register-template';
    this.TEMPLATE.SETTING = '#user-setting-template';
    this.TEMPLATE.INFO = '#user-info-template';
    this.TEMPLATE.LOGOUT = '#logout-template';

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
    // トリガー
    this.TRIGGER = {};

    this.TRIGGER.VIEW = {};
    this.TRIGGER.VIEW.CLOSE = 'cw.user.view.close';

    this.TRIGGER.POST = {};
    this.TRIGGER.POST.SUCCESS = 'cw.user.post.success';
    this.TRIGGER.POST.ERROR = 'cw.user.post.error';
    this.TRIGGER.POST.COMPLETE = 'cw.user.post.complete';

    // ----------------------------------------------------------------
    // セレクタ
    this.SELECTOR = {};

    // エリア
    this.SELECTOR.AREA = '#user-area';

    // ログイン
    this.SELECTOR.LOGIN = {};
    this.SELECTOR.LOGIN.EMAIL = '#login-email';
    this.SELECTOR.LOGIN.PASSWORD = '#login-password';
    this.SELECTOR.LOGIN.SUBMIT = '#login-submit';
    this.SELECTOR.LOGIN.REGISTER = '#login-register';

    // 登録
    this.SELECTOR.REGISTER = {};
    this.SELECTOR.REGISTER.USERNAME = '#register-username';
    this.SELECTOR.REGISTER.EMAIL = '#register-email';
    this.SELECTOR.REGISTER.PASSWORD = '#register-password';
    this.SELECTOR.REGISTER.PASSWORD_RE = '#register-password-re';
    this.SELECTOR.REGISTER.SUBMIT = '#register-submit';

    // ユーザ設定
    this.SELECTOR.SETTING = {};
    this.SELECTOR.SETTING.THEME = 'user-setting-theme';
    this.SELECTOR.SETTING.OWNER_PUBLISH = 'user-setting-owner-publish';
    this.SELECTOR.SETTING.CLIP_MODE = 'user-setting-clip-mode';
    this.SELECTOR.SETTING.INFO = '#user-setting-info';
    this.SELECTOR.SETTING.UPDATE_SUBMIT = '#user-setting-update-submit';

    // ユーザ情報
    this.SELECTOR.INFO = {};
    this.SELECTOR.INFO.USERNAME = '#user-info-username';
    this.SELECTOR.INFO.EMAIL = '#user-info-email';
    this.SELECTOR.INFO.OLD_PASSWORD = '#user-info-old-password';
    this.SELECTOR.INFO.NEW_PASSWORD = '#user-info-new-password';
    this.SELECTOR.INFO.NEW_PASSWORD_RE = '#user-info-new-password-re';
    this.SELECTOR.INFO.SETTING = '#user-info-setting';
    this.SELECTOR.INFO.UPDATE_SUBMIT = '#user-info-update-submit';

    // ログアウト
    this.SELECTOR.LOGOUT = {};
    this.SELECTOR.LOGOUT.SUBMIT = '#logout-submit';

    // オフセット
    this.COMMON.OFFSET = -8;

  }
}

// ----------------------------------------------------------------
// View

class UserView extends CommonView {
  constructor (
    initSetting = {
      NAME: 'User View'
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
    if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      header = 'Login';
      _mainTemplate = this.MODEL.TEMPLATE.LOGIN;
      _mainModel = {
        length: {
          min: {
            username: this.MODEL.VALIDATE.LENGTH.MIN_USERNAME,
            password: this.MODEL.VALIDATE.LENGTH.MIN_PASSWORD
          },
          max: {
            username: this.MODEL.VALIDATE.LENGTH.MAX_USERNAME,
            password: this.MODEL.VALIDATE.LENGTH.MAX_PASSWORD
          }
        },
        email: this.MODEL.EMAIL,
        pattern: {
          password: this.MODEL.VALIDATE.PATTERN.PASSWORD
        }
      };

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING
      header = 'User Setting';
      _mainTemplate = this.MODEL.TEMPLATE.SETTING;
      _mainModel = {
        theme: this.MODEL.THEME,
        ownerPublish: this.MODEL.OWNER_PUBLISH,
        clipMode: this.MODEL.CLIP_MODE
      };

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      header = 'User Info';
      _mainTemplate = this.MODEL.TEMPLATE.INFO;
      _mainModel = {
        length: {
          min: {
            username: this.MODEL.VALIDATE.LENGTH.MIN_USERNAME,
            password: this.MODEL.VALIDATE.LENGTH.MIN_PASSWORD
          },
          max: {
            username: this.MODEL.VALIDATE.LENGTH.MAX_USERNAME,
            password: this.MODEL.VALIDATE.LENGTH.MAX_PASSWORD
          }
        },
        username: this.MODEL.USERNAME,
        email: this.MODEL.EMAIL,
        gravatarHash: this.MODEL.HASH.GRAVATAR,
        pattern: {
          password: this.MODEL.VALIDATE.PATTERN.PASSWORD
        }
      };

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      // LOGOUT
      header = 'Logout';
      _mainTemplate = this.MODEL.TEMPLATE.LOGOUT;
      _mainModel = {
        username: this.MODEL.USERNAME
      };

    } else if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      header = 'Join clipweb';
      _mainTemplate = this.MODEL.TEMPLATE.REGISTER;
      _mainModel = {
        length: {
          min: {
            username: this.MODEL.VALIDATE.LENGTH.MIN_USERNAME,
            password: this.MODEL.VALIDATE.LENGTH.MIN_PASSWORD
          },
          max: {
            username: this.MODEL.VALIDATE.LENGTH.MAX_USERNAME,
            password: this.MODEL.VALIDATE.LENGTH.MAX_PASSWORD
          }
        },
        username: this.MODEL.USERNAME,
        email: this.MODEL.EMAIL,
        pattern: {
          password: this.MODEL.VALIDATE.PATTERN.PASSWORD
        }
      };
    }

    // Set Template
    const _AREA = View.getTemplate({
      template: _mainTemplate,
      model: _mainModel
    });

    // Clear
    this.clear();

    // Generate
    if (type != null) {
      Log.logClassKey(this.NAME, type.capitalize(), 'Generate');
    }

    // Header
    $(this.MODEL.SELECTOR.AREA).append(
      Content.getHeader(header, headerButton)
    );

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
    $(this.MODEL.SELECTOR.AREA).append(_AREA);

    // View
    this.setView({ view: view });
    if (view) {
      this.scroll();
    }
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends CommonEvent {
  constructor (
    initSetting = {
      NAME: 'User Event'
    }
  ) {
    super(initSetting);
  }

  setEvent () {
    this.setClose();
    this.setRegister();
    this.setLogin();
    this.setLogout();
    this.setInfo();
    this.setSetting();
  }

  // ----------------------------------------------------------------
  // close

  setClose () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} .content-header-button`,
      func: () => {
        this.trigger({ trigger: this.MODEL.TRIGGER.VIEW.CLOSE });
      }
    });

    super.setOn({
      trigger: this.MODEL.TRIGGER.VIEW.CLOSE,
      func: () => {
        Log.logClassKey(this.NAME, 'Close', 'Submit');
        this.VIEW.hide();
      }
    });
  }

  // ----------------------------------------------------------------
  // type

  setRegister () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.SUBMIT}`,
      func: () => {
        Log.logClassKey(this.NAME, 'Register', 'Submit');
        this.VIEW.hide();
        this.CONTROLLER.submitRegister();
      }
    });
  }

  setLogin () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.SUBMIT}`,
      func: () => {
        Log.logClassKey(this.NAME, 'Login', 'Submit');
        PS.NAV.VIEW.generateLogined();
        this.VIEW.hide();
        this.CONTROLLER.submitLogin();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.REGISTER}`,
      func: () => {
        Log.logClassKey(this.NAME, 'Register', 'Open');
        this.CONTROLLER.openRegister();
      }
    });
  }

  setLogout () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGOUT.SUBMIT}`,
      func: () => {
        Log.logClassKey(this.NAME, 'Logout', 'Submit');
        PS.NAV.VIEW.generateNotLogin();
        this.VIEW.hide();
        this.CONTROLLER.submitLogout();
      }
    });
  }

  setInfo () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.INFO.SETTING}`,
      func: () => {
        Log.logClassKey(this.NAME, 'User Setting', 'Open');
        this.CONTROLLER.openSetting();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.INFO.UPDATE_SUBMIT}`,
      func: () => {
        Log.logClassKey(this.NAME, 'User Info', 'Submit');
        this.VIEW.hide();
        this.CONTROLLER.submitInfo();
      }
    });
  }

  setSetting () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.INFO}`,
      func: () => {
        Log.logClassKey(this.NAME, 'User Info', 'Open');
        this.CONTROLLER.openInfo();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.UPDATE_SUBMIT}`,
      func: () => {
        Log.logClassKey(this.NAME, 'User Setting', 'Submit');
        this.VIEW.hide();
        this.CONTROLLER.submitSetting();
      }
    });
  }

  // ----------------------------------------------------------------
  // change & key

  setValidate ({
    selector = null
  } = {}) {
    if (selector == null) {
      super.logGenerate(this.setValidate, arguments);
      super.logError();
      return;
    }
    selector = `${this.MODEL.SELECTOR.AREA} ${selector}`;

    super.setOn({
      selector: selector,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(selector);
      }
    });
  }

  setValidatePassword ({
    selector = null,
    selectorRe = null
  } = {}) {
    if (selector == null || selectorRe == null) {
      super.logGenerate(this.setValidatePassword, arguments);
      super.logError();
      return;
    }
    selector = `${this.MODEL.SELECTOR.AREA} ${selector}`;
    selectorRe = `${this.MODEL.SELECTOR.AREA} ${selectorRe}`;

    super.setOn({
      selector: selector,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.validPassword(selector, selectorRe);
        this.CONTROLLER.updateValidMessage(selector);
        this.CONTROLLER.updateValidMessage(selectorRe);
      }
    });

    super.setOn({
      selector: selectorRe,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.validPassword(selector, selectorRe);
        this.CONTROLLER.updateValidMessage(selectorRe);
      }
    });
  }

  // ----------------------------------------------------------------
  // set on with loading

  setOnLoading ({
    type = null,
    successOpenType = null,
    successModel = {},
    errorOpenType = null,
    errorModel = {}
  } = {}) {
    if (type == null || successOpenType == null) {
      super.logGenerate(this.setOnLoading, arguments);
      super.logError();
      return;
    }
    Log.logClassKey(this.NAME, type.capitalize(), 'Loading');

    // Loading
    this.CONTROLLER.openLoading(type);

    // Success
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.SUCCESS,
      func: () => {
        Log.logClassKey(this.NAME, successOpenType.capitalize(), 'Open');
        this.CONTROLLER.open({
          type: successOpenType,
          model: successModel
        });
      }
    });
    // Error
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.ERROR,
      func: () => {
        Log.logClassKey(this.NAME, errorOpenType.capitalize(), 'Open');
        this.CONTROLLER.open({
          type: errorOpenType,
          model: errorModel
        });
      }
    });
    // Error
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.COMPLETE,
      func: () => {
        Log.logClassKey(this.NAME, type.capitalize(), 'Complete');
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.SUCCESS });
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.ERROR });
        super.setOff({ trigger: this.MODEL.TRIGGER.POST.COMPLETE });
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class UserController extends CommonController {
  constructor (
    model = {},
    initSetting = {
      NAME: 'User Controller',
      MODEL: new UserModel(),
      VIEW: new UserView(),
      EVENT: new UserEvent()
    }
  ) {
    super(model, initSetting);

    this.EVENT.setEvent();
    this.open({ type: this.MODEL.TYPE.REGISTER });
  }

  // ----------------------------------------------------------------
  // open

  open ({
    type = null,
    model = {}
  } = {}) {
    if (type == null) {
      super.logGenerate(this.open, arguments);
      super.logError();
      return;
    }
    model['type'] = type;
    this.VIEW.generateArea(model);
  }

  openLogin (
    model = {}
  ) {
    this.open({ type: this.MODEL.TYPE.LOGIN, model: model });
  }

  openSetting (
    model = {}
  ) {
    this.open({ type: this.MODEL.TYPE.SETTING, model: model });
  }

  openInfo (
    model = {}
  ) {
    this.open({ type: this.MODEL.TYPE.INFO, model: model });
  }

  openLogout (
    model = {}
  ) {
    this.open({ type: this.MODEL.TYPE.LOGOUT, model: model });
  }

  openRegister (
    model = {}
  ) {
    this.open({ type: this.MODEL.TYPE.REGISTER, model: model });
  }

  openLoading (
    type = null
  ) {
    if (type == null) {
      super.logGenerate(this.openLoading, arguments);
      super.logError();
      return;
    }
    let _loadingHeader = null;

    if (type == this.MODEL.TYPE.REGISTER) {
      _loadingHeader = 'Registering to clipweb';

    } else if (type == this.MODEL.TYPE.LOGIN) {
      _loadingHeader = 'Login to clipweb';

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      _loadingHeader = 'Logout from clipweb';

    } else if (type == this.MODEL.TYPE.LEAVE) {
      _loadingHeader = 'Leaving from clipweb';

    } else if (type == this.MODEL.TYPE.SETTING) {
      _loadingHeader = 'Save your Setting';

    } else if (type == this.MODEL.TYPE.INFO) {
      _loadingHeader = 'Save your Info';

    } else {
      super.logGenerate(this.openLoading, arguments);
      super.logError('unknown type.');
      return;
    }

    this.open({
      type: type,
      loadingHeader: _loadingHeader
    });
  }

  // ----------------------------------------------------------------
  // submit

  submitRegister () {
    const _TYPE = this.MODEL.TYPE.REGISTER;

    let _validUsername = true;
    let _validEmail = true;
    let _validPassword = true;
    let _validPasswordRe = true;

    const _USERNAME = $(this.MODEL.SELECTOR.REGISTER.USERNAME);
    const _EMAIL = $(this.MODEL.SELECTOR.REGISTER.EMAIL);
    const _PASSWORD = $(this.MODEL.SELECTOR.REGISTER.PASSWORD);
    const _PASSWORD_RE = $(this.MODEL.SELECTOR.REGISTER.PASSWORD_RE);

    _validUsername = _USERNAME[0].validity.valid;
    _validEmail = _EMAIL[0].validity.valid;
    _validPassword = _PASSWORD[0].validity.valid;
    _validPasswordRe = _PASSWORD_RE[0].validity.valid;

    if (_validUsername) {
      this.MODEL.USERNAME = _USERNAME.val().trim();
    }
    if (_validEmail) {
      this.MODEL.EMAIL = _EMAIL.val().trim();
    }
    if (_validPassword && _validPasswordRe) {
      this.MODEL.PASSWORD = _PASSWORD.val();
    }

    if (_validUsername && _validEmail && _validPassword && _validPasswordRe) {
      this.EVENT.setOnLoading({
        type: _TYPE,
        successOpenType: this.MODEL.TYPE.LOGIN,
        successModel: {
          alertMessage:
            View.div({ content: 'ユーザーを登録しました。' }) +
            View.div({ content: 'メール認証をしてください。' })
        },
        errorOpenType: _TYPE,
        errorModel: {
          alertMessage: (
            View.div({ content: 'ユーザー登録に失敗しました。' }) +
            View.div({ content: 'もう一度登録してください。' })
          ),
          alertType: View.ALERT_DANGER
        }
      });

      this.post(_TYPE);

    } else {
      this.openRegister({
        alertMessage: (
          View.div({ content: 'すべての項目を正しく入力してください。' })
        ),
        alertType: View.ALERT_WARNING
      });
    }
  }

  submitLogin () {

  }

  submitInfo () {

  }

  submitSetting () {

  }

  submitLogout () {

  }

  // ----------------------------------------------------------------
  // update

  updateHash (
    type = null,
    timing = null
  ) {
    if (type == null || timing == null) {
      this.clearHash();
    }

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
        this.MODEL.HASH.USER = SHA256.getHash(this.MODEL.USERNAME + new Date().toString());
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
      }

    } else if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
        this.MODEL.HASH.CRYPTO = SHA256.getHash(
          this.MODEL.HASH.USER + this.MODEL.PASSWORD
        );
        this.MODEL.HASH.GRAVATAR = MD5.getHash(this.MODEL.EMAIL.toLowerCase().trim());
      }

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      // LOGOUT
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
        this.clearHash();
      }

    } else if (type == this.MODEL.TYPE.LEAVE) {
      // LEAVE
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
        this.clearHash();
      }

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
        this.MODEL.HASH.CRYPTO = SHA256.getHash(
          this.MODEL.HASH.USER + this.MODEL.PASSWORD
        );
        this.MODEL.HASH.GRAVATAR = MD5.getHash(this.MODEL.EMAIL.toLowerCase().trim());
      }
    }
  }

  clearHash () {
    this.MODEL.USERNAME = '';
    this.MODEL.EMAIL = '';
    this.MODEL.PASSWORD = '';
    this.MODEL.HASH.USER = '';
    this.MODEL.HASH.PASSWORD = '';
    this.MODEL.HASH.CRYPTO = '';
    this.MODEL.HASH.GRAVATAR = '';
  }

  // ----------------------------------------------------------------
  // post

  post (
    type = null
  ) {
    if (type == null) {
      return;
    }

    Log.logClassKey(this.NAME, 'post', type.capitalize());

    let _path = 'python/clipweb.py';
    let _model = {};
    let _method = 'GET';
    let _cache = false;
    let _dateType = 'json';

    _model['type'] = `${this.MODEL.KEY}.${type}`;

    this.updateHash(type, this.MODEL.TIMING.BEFORE);

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      _method = 'POST';
      _model['hash'] = this.MODEL.HASH.USER;
      _model['username'] = this.MODEL.USERNAME;
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;

    } else if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      _method = 'GET';
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      // LOGOUT
      _method = 'GET';

    } else if (type == this.MODEL.TYPE.LEAVE) {
      // LEAVE
      _method = 'POST';
      _model['hash'] = this.MODEL.HASH.USER;
      _model['username'] = this.MODEL.USERNAME;
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING
      _method = 'POST';
      _model['hash'] = this.MODEL.HASH.USER;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;
      _model['theme'] = this.MODEL.THEME;
      _model['default_owner_publish'] = this.MODEL.OWNER_PUBLISH;
      _model['default_clip_mode'] = this.MODEL.CLIP_MODE;

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      _method = 'POST';
      _model['hash'] = this.MODEL.HASH.USER;
      _model['username'] = this.MODEL.USERNAME;
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;
      _model['password_hash_new'] = this.MODEL.HASH.PASSWORD_NEW;

    }

    $.ajax({
      url: _path,
      data: _model,
      method: _method,
      cache: _cache,
      dateType: _dateType,
      beforeSend: (jqXHR, settings) => {
        Log.logClassKey(this.NAME, 'post', 'Send');
        Log.logClass(this.NAME, 'settings');
        Log.logObj(settings);
        Log.logClass(this.NAME, 'jqXHR');
        Log.logObj(jqXHR);
      },
      success: (data, textStatus, jqXHR) => {
        Log.logClassKey(this.NAME, 'post', 'Success');
        Log.logClassKey(this.NAME, 'textStatus', textStatus);
        Log.logClass(this.NAME, 'data');
        Log.logObj(data);
        Log.logClass(this.NAME, 'jqXHR');
        Log.logObj(jqXHR);
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.SUCCESS });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        Log.logClassKey(this.NAME, 'post', 'Error');
        Log.logClassKey(this.NAME, 'textStatus', textStatus);
        Log.logClassKey(this.NAME, 'errorThrown', errorThrown);
        Log.logClass(this.NAME, 'jqXHR');
        Log.logObj(jqXHR);
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.ERROR });
      },
      complete: (jqXHR, textStatus) => {
        this.updateHash(type, this.MODEL.TIMING.AFTER);
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.COMPLETE });
      }
    });
  }

  // ----------------------------------------------------------------
  // validate

  validPassword (
    password = null,
    passwordRe = null
  ) {
    if (password != null && passwordRe != null) {
      password = $(password);
      passwordRe = $(passwordRe);
      if (password.val() != passwordRe.val()) {
        passwordRe[0].setCustomValidity('パスワードが一致しません。');
      } else {
        passwordRe[0].setCustomValidity('');
      }
    }
  }

  updateValidMessage (
    inputElement = null
  ) {
    if (inputElement == null) {
      return;
    }
    inputElement = $(inputElement);
    const _VALID_MESSAGE = inputElement[0].validationMessage;
    const _VALID_ELEMENT = inputElement
      .parent('.content-input')
      .children('.content-input-valid-message');

    _VALID_ELEMENT.text(_VALID_MESSAGE);

  }
}
