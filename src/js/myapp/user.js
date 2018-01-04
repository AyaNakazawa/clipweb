
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'User Object'
    }
  ) {
    super(_initSetting);

    // 識別子
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

    // トリガー
    this.TRIGGER = {};

    this.TRIGGER.LOADING = 'loading.cw.user';

    // ログインステータス
    this.STATUS = {};

    this.STATUS.LOGIN = false;

    // ユーザ名
    this.USERNAME = '';
    // メールアドレス
    this.EMAIL = '';
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

    // テンプレート
    this.TEMPLATE = {};

    this.TEMPLATE.LOGIN = '#login-template';
    this.TEMPLATE.REGISTER = '#register-template';
    this.TEMPLATE.SETTING = '#user-setting-template';
    this.TEMPLATE.INFO = '#user-info-template';
    this.TEMPLATE.LOGOUT = '#logout-template';

    // バリデーション
    this.VALIDATE = {};

    this.VALIDATE.LENGTH = {};
    this.VALIDATE.LENGTH.MIN_USERNAME = 3;
    this.VALIDATE.LENGTH.MAX_USERNAME = 32;
    this.VALIDATE.LENGTH.MIN_PASSWORD = 8;
    this.VALIDATE.LENGTH.MAX_PASSWORD = 32;

    this.VALIDATE.PATTERN = {};
    this.VALIDATE.PATTERN.PASSWORD = '^[a-zA-Z0-9]*(?:[a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$';

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

  }
}

// ----------------------------------------------------------------
// View

class UserView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'User View'
    }
  ) {
    super(_initSetting);
  }

  generateArea({
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

    let mainTemplate = null;
    let mainModel = null;
    if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      header = 'Login';
      mainTemplate = this.MODEL.TEMPLATE.LOGIN;
      mainModel = {
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
      mainTemplate = this.MODEL.TEMPLATE.SETTING;
      mainModel = {
        theme: this.MODEL.THEME,
        ownerPublish: this.MODEL.OWNER_PUBLISH,
        clipMode: this.MODEL.CLIP_MODE
      };

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      header = 'User Info';
      mainTemplate = this.MODEL.TEMPLATE.INFO;
      mainModel = {
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
      mainTemplate = this.MODEL.TEMPLATE.LOGOUT;
      mainModel = {
        username: this.MODEL.USERNAME
      };

    } else if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      header = 'Join clipweb';
      mainTemplate = this.MODEL.TEMPLATE.REGISTER;
      mainModel = {
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
    const area = View.getTemplate({
      template: mainTemplate,
      model: mainModel
    });

    // View
    if (this.getView() && view) {
      super.closeArea({
        speed: 0
      });
    }

    // Clear
    this.clearArea();

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
    $(this.MODEL.SELECTOR.AREA).append(area);

    setTimeout(() => {
      this.setView({
        view: view
      });
    }, 0);
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'User Event'
    }
  ) {
    super(_initSetting);
  }

  setEvent() {
    this.setClickClose();
    this.setClickLogin();
    this.setClickLoginRegister();
    this.setKeyupRegisterPasswordRe();
    this.setChangeRegisterUsername();
    this.setChangeRegisterEmail();
    this.setChangeRegisterPassword();
    this.setChangeRegisterPasswordRe();
    this.setClickSetting();
    this.setClickSettingUpdate();
    this.setClickInfo();
    this.setClickInfoUpdate();
    this.setClickRegister();
    this.setClickLogout();
  }

  // ----------------------------------------------------------------
  // general

  setClickClose() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} .content-header-button`,
      func: () => {
        Log.logClassKey('User', 'Close', 'Submit');
        this.VIEW.closeArea();
      }
    });
  }

  // ----------------------------------------------------------------
  // login

  setClickLogin() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.SUBMIT}`,
      func: () => {
        Log.logClassKey('User', 'Login', 'Submit');
        PS.CONTROLLER.NAV.VIEW.generateLogined();
        this.VIEW.closeArea();
      }
    });
  }

  setClickLoginRegister() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.REGISTER}`,
      func: () => {
        Log.logClassKey('User', 'Register', 'Open');
        this.CONTROLLER.openRegister();
      }
    });
  }

  // ----------------------------------------------------------------
  // register

  setClickRegister() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.SUBMIT}`,
      func: () => {
        Log.logClassKey('User', 'Register', 'Submit');
        this.CONTROLLER.submitRegister();
      }
    });
  }

  setChangeRegisterUsername() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.USERNAME}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR.REGISTER.USERNAME
        );
      }
    });
  }

  setChangeRegisterEmail() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.EMAIL}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR.REGISTER.EMAIL
        );
      }
    });
  }

  setChangeRegisterPassword() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.PASSWORD}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR.REGISTER.PASSWORD
        );
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR.REGISTER.PASSWORD_RE
        );
      }
    });
  }

  setChangeRegisterPasswordRe() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.PASSWORD_RE}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR.REGISTER.PASSWORD_RE
        );
      }
    });
  }

  setKeyupRegisterPasswordRe() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.PASSWORD}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.validPassword(
          this.MODEL.SELECTOR.REGISTER.PASSWORD,
          this.MODEL.SELECTOR.REGISTER.PASSWORD_RE
        );
      }
    });
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.PASSWORD_RE}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.validPassword(
          this.MODEL.SELECTOR.REGISTER.PASSWORD,
          this.MODEL.SELECTOR.REGISTER.PASSWORD_RE
        );
      }
    });
  }

  // ----------------------------------------------------------------
  // info

  setClickSetting() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.INFO.SETTING}`,
      func: () => {
        Log.logClassKey('User', 'User Setting', 'Open');
        this.CONTROLLER.openSetting();
      }
    });
  }

  setClickInfoUpdate() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.INFO.UPDATE_SUBMIT}`,
      func: () => {
        Log.logClassKey('User', 'User Info', 'Submit');
        // Update User Info
        this.CONTROLLER.openInfo({
          alertMessage: 'Updated !'
        });
      }
    });
  }

  // ----------------------------------------------------------------
  // setting

  setClickSettingUpdate() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.UPDATE_SUBMIT}`,
      func: () => {
        Log.logClassKey('User', 'User Setting', 'Submit');
        // Update User Setting
        this.CONTROLLER.openSetting({
          alertMessage: 'Updated !'
        });
      }
    });
  }

  setClickInfo() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.INFO}`,
      func: () => {
        Log.logClassKey('User', 'User Info', 'Open');
        this.CONTROLLER.openInfo();
      }
    });
  }

  // ----------------------------------------------------------------
  // logout

  setClickLogout() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGOUT.SUBMIT}`,
      func: () => {
        Log.logClassKey('User', 'Logout', 'Submit');
        PS.CONTROLLER.NAV.VIEW.generateNotLogin();
        this.CONTROLLER.openLogin();
      }
    });
  }

  // ----------------------------------------------------------------
  // set on with loading

  setOnLoading({
    type = null,
    func = null,
    model = {}
  }) {
    if (type == null || func == null) {
      Log.logCaution(
        this,
        'setOnLoading',
        'includes null in args',
        `type :${type}`,
        `func :${func}`
      );
      return;
    }
    Log.logClassKey('User', type.capitalize(), 'Loading');
    this.CONTROLLER.openLoading(type);
    super.setOn({
      trigger: this.MODEL.TRIGGER.LOADING,
      func: () => {
        Log.logClassKey('User', type.capitalize(), 'Open');
        func(model);
        super.setOff({
          trigger: this.MODEL.TRIGGER.LOADING
        });
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class UserController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'User Controller',
      MODEL: new UserModel(),
      VIEW: new UserView(),
      EVENT: new UserEvent()
    }
  ) {
    super(_model, _initSetting);

    this.EVENT.setEvent();
    this.VIEW.closeArea({speed: 0});
    this.openRegister();
  }

  // ----------------------------------------------------------------
  // open

  openLogin(
    args = {}
  ) {
    let model = {
      type: this.MODEL.TYPE.LOGIN,
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openSetting(
    args = {}
  ) {
    let model = {
      type: this.MODEL.TYPE.SETTING,
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openInfo(
    args = {}
  ) {
    let model = {
      type: this.MODEL.TYPE.INFO,
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openLogout(
    args = {}
  ) {
    let model = {
      type: this.MODEL.TYPE.LOGOUT,
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openRegister(
    args = {}
  ) {
    let model = {
      type: this.MODEL.TYPE.REGISTER,
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openLoading(
    type = null
  ) {
    if (type == null) {
      Log.logCaution(
        this,
        'openLoading',
        'includes null in args',
        `type :${type}`
      );
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
      Log.logCaution(
        this,
        'openLoading',
        'unknown type',
        `type :${type}`
      );
      return;
    }

    this.VIEW.generateArea({
      loadingHeader: _loadingHeader
    });
  }

  // ----------------------------------------------------------------
  // submit

  submitRegister() {
    let _isRegister = false;
    let _isCorrectUsername = true;
    let _isCorrectEmail = true;
    let _isCorrectPassword = true;
    let _isCorrectPasswordRe = true;

    const _username = $(this.MODEL.SELECTOR.REGISTER.USERNAME);
    const _email = $(this.MODEL.SELECTOR.REGISTER.EMAIL);
    const _password = $(this.MODEL.SELECTOR.REGISTER.PASSWORD);
    const _passwordRe = $(this.MODEL.SELECTOR.REGISTER.PASSWORD_RE);

    if (!_username[0].validity.valid) {
      _isCorrectUsername = false;
    }

    if (!_email[0].validity.valid) {
      _isCorrectEmail = false;
    }

    if (!_password[0].validity.valid) {
      _isCorrectPassword = false;
    }

    if (!_passwordRe[0].validity.valid) {
      _isCorrectPasswordRe = false;
    }

    if (_isCorrectUsername) {
      this.MODEL.USERNAME = _username.val().trim();
    }
    if (_isCorrectEmail) {
      this.MODEL.EMAIL = _email.val().trim();
    }
    if (_isCorrectPassword) {
      this.MODEL.PASSWORD = _password.val();
    }

    if (_isCorrectUsername && _isCorrectEmail && _isCorrectPassword && _isCorrectPasswordRe) {
      _isRegister = true;
    }

    this.updateHash(this.MODEL.TYPE.REGISTER);

    if (_isRegister) {
      this.EVENT.setOnLoading({
        type: this.MODEL.TYPE.REGISTER,
        func: this.openLogin,
        model: {
          alertMessage: '<div>ユーザーを登録しました。</div><div>メール認証をしてください。</div>'
        }
      });

    } else {
      this.openRegister({
        alertMessage: '登録に失敗しました。',
        alertType: View.ALERT_WARNING
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
        this.clearHash();
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

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER

    } else if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      // LOGOUT

    } else if (type == this.MODEL.TYPE.LEAVE) {
      // LEAVE

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO

    }
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
    const VALID_MESSAGE = inputElement[0].validationMessage;
    const VALID_ELEMENT = inputElement
      .parent('.content-input')
      .children('.content-input-valid-message');

    VALID_ELEMENT.text(VALID_MESSAGE);

  }
}
