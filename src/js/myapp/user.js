
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
    this.TYPE.INFO = 'INFO';
    this.TYPE.SETTING = 'SETTING';

    this.TIMING = {};
    this.TIMING.AFTER = 'AFTER';
    this.TIMING.BEFORE = 'BEFORE';

    // ----------------------------------------------------------------
    // ステータス
    this.STATUS = {};
    this.STATUS.LOGIN = false;

    // ----------------------------------------------------------------
    // ユーザ情報

    // ユーザ名
    this.USERNAME = 'test';
    // メールアドレス
    this.EMAIL = 'test@test';
    // パスワード
    this.PASSWORD = '';
    this.PASSWORD_NEW = '';
    // メール認証フラグ
    // 認証していない場合は
    //  - クリップ数を制限
    //  - 公開クリップしか作れない
    this.EMAIL_AUTH = false;
    // 作成日時
    this.CREATED_AT = new Date().formatString();
    // 更新日時
    this.UPDATED_AT = new Date().formatString();

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

    // 暗号
    this.ENCRYPT = {};
    // 暗号ハッシュ
    // 暗号ハッシュをパスワードで暗号化したもの
    this.ENCRYPT.CRYPTO = null;

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
    // オフセット
    this.COMMON.OFFSET = -8;

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

    // 登録
    this.SELECTOR.REGISTER = {};
    this.SELECTOR.REGISTER.USERNAME = '#register-username';
    this.SELECTOR.REGISTER.EMAIL = '#register-email';
    this.SELECTOR.REGISTER.PASSWORD = '#register-password';
    this.SELECTOR.REGISTER.PASSWORD_RE = '#register-password-re';
    this.SELECTOR.REGISTER.SUBMIT = '#register-submit';

    // ログイン
    this.SELECTOR.LOGIN = {};
    this.SELECTOR.LOGIN.EMAIL = '#login-email';
    this.SELECTOR.LOGIN.PASSWORD = '#login-password';
    this.SELECTOR.LOGIN.SUBMIT = '#login-submit';
    this.SELECTOR.LOGIN.REGISTER = '#login-register';

    // ログアウト
    this.SELECTOR.LOGOUT = {};
    this.SELECTOR.LOGOUT.SUBMIT = '#logout-submit';

    // ユーザ情報
    this.SELECTOR.INFO = {};
    this.SELECTOR.INFO.USERNAME = '#user-info-username';
    this.SELECTOR.INFO.EMAIL = '#user-info-email';
    this.SELECTOR.INFO.OLD_PASSWORD = '#user-info-old-password';
    this.SELECTOR.INFO.NEW_PASSWORD = '#user-info-new-password';
    this.SELECTOR.INFO.NEW_PASSWORD_RE = '#user-info-new-password-re';
    this.SELECTOR.INFO.SETTING = '#user-info-setting';
    this.SELECTOR.INFO.UPDATE_SUBMIT = '#user-info-update-submit';

    // ユーザ設定
    this.SELECTOR.SETTING = {};
    this.SELECTOR.SETTING.THEME = '#user-setting-theme';
    this.SELECTOR.SETTING.OWNER_PUBLISH = '#user-setting-owner-publish';
    this.SELECTOR.SETTING.CLIP_MODE = '#user-setting-clip-mode';
    this.SELECTOR.SETTING.INFO = '#user-setting-info';
    this.SELECTOR.SETTING.UPDATE_SUBMIT = '#user-setting-update-submit';

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

    // Clear
    this.clear();

    // Generate
    if (type != null) {
      super.log(type.capitalize(), 'Generate')();
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
    if (_mainTemplate != null && _mainModel != null) {
      $(this.MODEL.SELECTOR.AREA).append(
        View.getTemplate({
          template: _mainTemplate,
          model: _mainModel
        })
      );
    }

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
        super.log('Close', 'Submit')();
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
        super.log('Register', 'Submit')();
        this.CONTROLLER.submitRegister();
      }
    });

    this.setValidate(
      this.MODEL.SELECTOR.REGISTER.USERNAME
    );
    this.setValidate(
      this.MODEL.SELECTOR.REGISTER.EMAIL
    );
    this.setValidatePassword(
      this.MODEL.SELECTOR.REGISTER.PASSWORD,
      this.MODEL.SELECTOR.REGISTER.PASSWORD_RE
    );
  }

  setLogin () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.SUBMIT}`,
      func: () => {
        super.log('Login', 'Submit')();
        this.CONTROLLER.submitLogin();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.REGISTER}`,
      func: () => {
        super.log('Register', 'Open')();
        this.CONTROLLER.open({ type: this.MODEL.TYPE.REGISTER });
      }
    });

    this.setValidate(
      this.MODEL.SELECTOR.LOGIN.EMAIL
    );
    this.setValidate(
      this.MODEL.SELECTOR.LOGIN.PASSWORD
    );
  }

  setLogout () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGOUT.SUBMIT}`,
      func: () => {
        super.log('Logout', 'Submit')();
        this.CONTROLLER.submitLogout();
      }
    });
  }

  setInfo () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.INFO.SETTING}`,
      func: () => {
        super.log('User Setting', 'Open')();
        this.CONTROLLER.open({ type: this.MODEL.TYPE.SETTING });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.INFO.UPDATE_SUBMIT}`,
      func: () => {
        super.log('User Info', 'Submit')();
        this.CONTROLLER.submitInfo();
      }
    });

    this.setValidate(
      this.MODEL.SELECTOR.INFO.USERNAME
    );
    this.setValidate(
      this.MODEL.SELECTOR.INFO.EMAIL
    );
    this.setValidate(
      this.MODEL.SELECTOR.INFO.OLD_PASSWORD
    );
    this.setValidatePassword(
      this.MODEL.SELECTOR.INFO.NEW_PASSWORD,
      this.MODEL.SELECTOR.INFO.NEW_PASSWORD_RE
    );
  }

  setSetting () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.INFO}`,
      func: () => {
        super.log('User Info', 'Open')();
        this.CONTROLLER.open({ type: this.MODEL.TYPE.INFO });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.UPDATE_SUBMIT}`,
      func: () => {
        super.log('User Setting', 'Submit')();
        this.CONTROLLER.submitSetting();
      }
    });
  }

  // ----------------------------------------------------------------
  // change & key

  setValidate (
    selector = null
  ) {
    if (selector == null) {
      super.logGenerate(this.setValidate, arguments);
      super.logError()();
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

  setValidatePassword (
    selector = null,
    selectorRe = null
  ) {
    if (selector == null || selectorRe == null) {
      super.logGenerate(this.setValidatePassword, arguments);
      super.logError()();
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
      super.logGenerate(this.setOnLoading, arguments);
      super.logError()();
      return;
    }
    super.log(type.capitalize(), 'Loading')();

    // Loading
    this.CONTROLLER.openLoading(type);

    // Success
    super.setOn({
      trigger: this.MODEL.TRIGGER.POST.SUCCESS,
      func: () => {
        this.CONTROLLER.applyModel(type);
        this.CONTROLLER.updateHash(type, this.MODEL.TIMING.AFTER);
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
    mode = this.MODEL.KEY,
    type = null,
    model = {}
  } = {}) {
    if (type != null) {
      model['type'] = type;
    }

    if (mode == this.MODEL.KEY) {
      this.VIEW.generateArea(model);
    } else if (mode == ClipListModel.MODEL.KEY) {
      CLIPLIST.VIEW.generateArea(model);
    } else if (mode == ClipModel.MODEL.KEY) {
      CLIP.VIEW.generateArea(model);
    } else {
      super.logGenerate(this.open, arguments);
      super.logError('unknown mode')();
      return;
    }
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
      super.logError()();
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
      super.logError('unknown type.')();
      return;
    }

    this.open({
      model: {
        loadingHeader: _loadingHeader
      }
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
      this.open({
        type: _TYPE,
        model: {
          alertMessage: (
            View.div({ content: 'すべての項目を正しく入力してください。' })
          ),
          alertType: View.ALERT_WARNING
        }
      });
    }
  }

  submitLogin () {
    const _TYPE = this.MODEL.TYPE.LOGIN;

    let _validEmail = true;
    let _validPassword = true;

    const _EMAIL = $(this.MODEL.SELECTOR.LOGIN.EMAIL);
    const _PASSWORD = $(this.MODEL.SELECTOR.LOGIN.PASSWORD);

    _validEmail = _EMAIL[0].validity.valid;
    _validPassword = _PASSWORD[0].validity.valid;

    if (_validEmail) {
      this.MODEL.EMAIL = _EMAIL.val().trim();
    }
    if (_validPassword) {
      this.MODEL.PASSWORD = _PASSWORD.val();
    }

    if ( _validEmail && _validPassword) {
      this.EVENT.setOnLoading({
        type: _TYPE,
        successFunction: () => {
          PS.NAV.VIEW.generateLogined();
        },
        errorOpenType: _TYPE,
        errorModel: {
          alertMessage: (
            View.div({ content: 'ログインに失敗しました。' }) +
            View.div({ content: 'メールアドレスとパスワードの組み合わせが間違っています。' })
          ),
          alertType: View.ALERT_WARNING
        }
      });

      this.post(_TYPE);

    } else {
      this.open({
        type: _TYPE,
        model: {
          alertMessage: (
            View.div({ content: 'すべての項目を正しく入力してください。' })
          ),
          alertType: View.ALERT_WARNING
        }
      });
    }
  }

  submitLogout () {
    const _TYPE = this.MODEL.TYPE.LOGOUT;

    this.EVENT.setOnLoading({
      type: _TYPE,
      successOpenType: this.MODEL.TYPE.LOGIN,
      successModel: {
        alertMessage:
          View.div({ content: 'ログアウトしました。' })
      },
      successFunction: () => {
        PS.NAV.VIEW.generateNotLogin();
      },
      errorOpenType: _TYPE,
      errorModel: {
        alertMessage: (
          View.div({ content: 'ログアウトに失敗しました。' }) +
          View.div({ content: 'サーバーに障害が発生しています。' })
        ),
        alertType: View.ALERT_WARNING
      }
    });

    this.post(_TYPE);

  }

  submitInfo () {
    const _TYPE = this.MODEL.TYPE.INFO;

    let _validUsername = true;
    let _validEmail = true;
    let _validPassword = true;
    let _validNewPassword = true;
    let _validNewPasswordRe = true;

    const _USERNAME = $(this.MODEL.SELECTOR.INFO.USERNAME);
    const _EMAIL = $(this.MODEL.SELECTOR.INFO.EMAIL);
    const _PASSWORD = $(this.MODEL.SELECTOR.INFO.OLD_PASSWORD);
    const _NEW_PASSWORD = $(this.MODEL.SELECTOR.INFO.NEW_PASSWORD);
    const _NEW_PASSWORD_RE = $(this.MODEL.SELECTOR.INFO.NEW_PASSWORD_RE);

    _validUsername = _USERNAME[0].validity.valid;
    _validEmail = _EMAIL[0].validity.valid;
    _validPassword = _PASSWORD[0].validity.valid;
    _validNewPassword = _NEW_PASSWORD[0].validity.valid;
    _validNewPasswordRe = _NEW_PASSWORD_RE[0].validity.valid;

    if (_validUsername) {
      this.MODEL.USERNAME = _USERNAME.val().trim();
    }
    if (_validEmail) {
      this.MODEL.EMAIL = _EMAIL.val().trim();
    }
    if (_validPassword) {
      this.MODEL.PASSWORD = _PASSWORD.val();
    }
    if (_validNewPassword && _validNewPasswordRe) {
      this.MODEL.PASSWORD_NEW = _NEW_PASSWORD.val();
    }

    if (_validUsername && _validEmail && _validPassword) {
      this.EVENT.setOnLoading({
        type: _TYPE,
        successOpenType: _TYPE,
        successModel: {
          alertMessage:
            View.div({ content: 'ユーザー情報を更新しました。' })
        },
        errorOpenType: _TYPE,
        errorModel: {
          alertMessage: (
            View.div({ content: 'ユーザー情報の更新に失敗しました。' })
          ),
          alertType: View.ALERT_DANGER
        }
      });

      this.post(_TYPE);

    } else {
      this.open({
        type: _TYPE,
        model: {
          alertMessage: (
            View.div({ content: '正しく入力してください。' })
          ),
          alertType: View.ALERT_WARNING
        }
      });
    }
  }

  submitSetting () {
    const _TYPE = this.MODEL.TYPE.SETTING;

    let _validTheme = true;
    let _validOwnerPublish = true;
    let _validClipMode = true;

    const _THEME = this.MODEL.SELECTOR.SETTING.THEME;
    const _OWNER_PUBLISH = this.MODEL.SELECTOR.SETTING.OWNER_PUBLISH;
    const _CLIP_MODE = this.MODEL.SELECTOR.SETTING.CLIP_MODE;

    Log.obj($(_THEME))();
    Log.obj($(_OWNER_PUBLISH))();
    Log.obj($(_CLIP_MODE))();

    _validTheme = $(_THEME)[0].validity.valid;
    _validOwnerPublish = $(_OWNER_PUBLISH)[0].validity.valid;
    _validClipMode = $(_CLIP_MODE)[0].validity.valid;

    if (_validTheme) {
      this.MODEL.THEME = $(`${_THEME} option:selected`).val();
    }
    if (_validOwnerPublish) {
      this.MODEL.OWNER_PUBLISH = $(`${_OWNER_PUBLISH} option:selected`).val();
    }
    if (_validClipMode) {
      this.MODEL.CLIP_MODE = $(`${_CLIP_MODE} option:selected`).val();
    }

    if (_validTheme && _validOwnerPublish && _validClipMode) {
      this.EVENT.setOnLoading({
        type: _TYPE,
        successOpenType: _TYPE,
        successModel: {
          alertMessage:
            View.div({ content: 'ユーザー設定を更新しました。' })
        },
        errorOpenType: _TYPE,
        errorModel: {
          alertMessage: (
            View.div({ content: 'ユーザー設定の更新に失敗しました。' })
          ),
          alertType: View.ALERT_DANGER
        }
      });

      this.post(_TYPE);

    } else {
      this.open({
        type: _TYPE,
        model: {
          alertMessage: (
            View.div({ content: '正しく選択してください。' })
          ),
          alertType: View.ALERT_WARNING
        }
      });
    }
  }

  // ----------------------------------------------------------------
  // update

  updateHash (
    type = null,
    timing = null
  ) {
    if (type == null || timing == null) {
      super.logGenerate(this.updateHash, arguments);
      super.logError()();
      return;
    }

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
        this.MODEL.HASH.USER = SHA256.getHash(this.MODEL.USERNAME + new Date().toString());
        this.MODEL.HASH.CRYPTO = SHA256.getHash(this.MODEL.HASH.USER + this.MODEL.PASSWORD);
        this.MODEL.ENCRYPT.CRYPTO = Crypto.encrypt(
          this.MODEL.HASH.CRYPTO,
          this.MODEL.PASSWORD
        );
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
        this.MODEL.HASH.CRYPTO = Crypto.decrypt(
          this.MODEL.ENCRYPT.CRYPTO,
          this.MODEL.PASSWORD
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

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
        if (this.MODEL.PASSWORD_NEW != '') {
          this.MODEL.HASH.PASSWORD_NEW = SHA256.getHash(this.MODEL.PASSWORD_NEW);
          this.MODEL.ENCRYPT.CRYPTO = Crypto.encrypt(
            this.MODEL.HASH.CRYPTO,
            this.MODEL.PASSWORD_NEW
          );
        }
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
        this.MODEL.HASH.CRYPTO = Crypto.decrypt(
          this.MODEL.ENCRYPT.CRYPTO,
          this.MODEL.PASSWORD
        );
        this.MODEL.HASH.GRAVATAR = MD5.getHash(this.MODEL.EMAIL.toLowerCase().trim());
      }
    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING

    } else {
      super.logGenerate(this.updateHash, arguments);
      super.logError('unknown type.')();
      return;
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

  applyModel (
    type = null
  ) {
    super.log(type.capitalize(), 'Apply')();
    if (type == null) {
      super.logGenerate(this.applyModel, arguments);
      super.logError();
      return;
    }

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER

    } else if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      this.MODEL.STATUS.LOGIN = true;
      this.getAjaxData({ input: this.MODEL.USERNAME, key: 'username' });
      this.getAjaxData({ input: this.MODEL.HASH.USER, key: 'hash' });
      this.getAjaxData({ input: this.MODEL.ENCRYPT.CRYPTO, key: 'encrypted_crypto_hash' });
      this.getAjaxData({ input: this.MODEL.EMAIL_AUTH, key: 'email_authentication' });
      this.getAjaxData({ input: this.MODEL.THEME, key: 'theme' });
      this.getAjaxData({ input: this.MODEL.OWNER_PUBLISH, key: 'default_owner_publish' });
      this.getAjaxData({ input: this.MODEL.CLIP_MODE, key: 'default_clip_mode' });
      this.getAjaxData({ input: this.MODEL.CREATED_AT, key: 'created_at' });
      this.getAjaxData({ input: this.MODEL.UPDATED_AT, key: 'updated_at' });

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      // LOGOUT
      this.MODEL.STATUS.LOGIN = false;
      this.clearModel();

    } else if (type == this.MODEL.TYPE.LEAVE) {
      // LEAVE
      this.MODEL.STATUS.LOGIN = false;
      this.clearModel();

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      this.getAjaxData({ input: this.MODEL.USERNAME, key: 'username' });
      this.getAjaxData({ input: this.MODEL.HASH.USER, key: 'hash' });
      this.getAjaxData({ input: this.MODEL.ENCRYPT.CRYPTO, key: 'encrypted_crypto_hash' });
      this.getAjaxData({ input: this.MODEL.EMAIL_AUTH, key: 'email_authentication' });
      this.getAjaxData({ input: this.MODEL.CREATED_AT, key: 'created_at' });
      this.getAjaxData({ input: this.MODEL.UPDATED_AT, key: 'updated_at' });
      if (this.MODEL.PASSWORD_NEW != '') {
        this.MODEL.PASSWORD = this.MODEL.PASSWORD_NEW;
        this.MODEL.PASSWORD_NEW = '';
      }

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING
      this.getAjaxData({ input: this.MODEL.THEME, key: 'theme' });
      this.getAjaxData({ input: this.MODEL.OWNER_PUBLISH, key: 'default_owner_publish' });
      this.getAjaxData({ input: this.MODEL.CLIP_MODE, key: 'default_clip_mode' });
      this.getAjaxData({ input: this.MODEL.CREATED_AT, key: 'created_at' });
      this.getAjaxData({ input: this.MODEL.UPDATED_AT, key: 'updated_at' });

    } else {
      super.logGenerate(this.post, arguments);
      super.logError('unknown type.');
      return;
    }
  }

  clearModel () {
    this.MODEL.USERNAME = '';
    this.MODEL.EMAIL = '';
    this.MODEL.PASSWORD = '';
    this.MODEL.EMAIL_AUTH = false;
    this.MODEL.CREATED_AT = new Date().formatString();
    this.MODEL.UPDATED_AT = new Date().formatString();
    this.HASH = {};
  }

  getAjaxData ({
    input = null,
    type = this.MODEL.KEY,
    key = null
  } = {}) {
    if (key == null || input == null) {
      super.logGenerate(this.getAjaxData, arguments);
      super.logError()();
      return;
    }
    if (typeof this.MODEL.OBJECT.AJAX[type] == 'undefined') {
      super.logGenerate(this.getAjaxData, arguments);
      super.logError('type undefined')();
      Log.obj(this.MODEL.OBJECT.AJAX)();
      return;
    }
    if (typeof this.MODEL.OBJECT.AJAX[type][key] != 'undefined') {
      input = this.MODEL.OBJECT.AJAX[type][key];
    }
  }

  // ----------------------------------------------------------------
  // post

  post (
    type = null
  ) {
    if (type == null) {
      return;
    }

    super.log('post', type.capitalize())();

    let _path = 'python/clipweb.py';
    let _model = {};
    let _method = 'GET';
    let _cache = false;
    let _dateType = 'json';

    _model['type'] = `${this.MODEL.KEY}.${type.toLowerCase()}`;

    this.updateHash(type, this.MODEL.TIMING.BEFORE);

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      _method = 'POST';
      _model['hash'] = this.MODEL.HASH.USER;
      _model['username'] = this.MODEL.USERNAME;
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;
      _model['encrypted_crypto_hash'] = this.MODEL.ENCRYPT.CRYPTO;

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

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      _method = 'POST';
      _model['hash'] = this.MODEL.HASH.USER;
      _model['username'] = this.MODEL.USERNAME;
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;
      if (this.MODEL.HASH.PASSWORD_NEW != '') {
        _model['password_hash_new'] = this.MODEL.HASH.PASSWORD_NEW;
      }
      _model['encrypted_crypto_hash'] = this.MODEL.ENCRYPT.CRYPTO;

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING
      _method = 'POST';
      _model['hash'] = this.MODEL.HASH.USER;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;
      _model['theme'] = this.MODEL.THEME;
      _model['default_owner_publish'] = this.MODEL.OWNER_PUBLISH;
      _model['default_clip_mode'] = this.MODEL.CLIP_MODE;

    } else {
      super.logGenerate(this.post, arguments);
      super.logError('unknown type.')();
      return;
    }

    super.log('post', 'Commit', Log.ARROW_INPUT)();
    Log.obj(_model)();

    $.ajax({
      url: _path,
      data: _model,
      method: _method,
      cache: _cache,
      dateType: _dateType,
      beforeSend: (jqXHR, settings) => {
        super.log('post', 'Send')();
        super.log('settings')();
        Log.obj(settings)();
        super.log('jqXHR')();
        Log.obj(jqXHR)();
      },
      success: (data, textStatus, jqXHR) => {
        super.log('post', 'Success')();
        super.log('textStatus', textStatus)();
        super.log('data')();
        Log.obj(data)();
        super.log('jqXHR')();
        Log.obj(jqXHR)();
        this.MODEL.OBJECT.AJAX = data;
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.SUCCESS });
      },
      error: (jqXHR, textStatus, errorThrown) => {
        super.log('post', 'Error')();
        super.log('textStatus', textStatus)();
        super.log('errorThrown', errorThrown)();
        super.log('jqXHR')();
        Log.obj(jqXHR)();
        this.EVENT.trigger({ trigger: this.MODEL.TRIGGER.POST.ERROR });
      },
      complete: (jqXHR, textStatus) => {
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
    } else {
      super.logGenerate(this.validPassword, arguments);
      super.logError('selector is null')();
      return;
    }
  }

  updateValidMessage (
    inputElement = null
  ) {
    if (inputElement == null) {
      super.logGenerate(this.updateValidMessage, arguments);
      super.logError('selector is null')();
      return;
    }

    $(inputElement)
      .parent('.content-input')
      .children('.content-input-valid-message')
      .text($(inputElement)[0].validationMessage);
  }
}
