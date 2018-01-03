
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends ContentModel {
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

    this.HASH = {};

    // ユーザハッシュ
    // メールアドレスから生成
    // ログイン、登録時に使用
    // クリップ生成時に使用
    // ユーザハッシュ + 日時 = クリップID
    this.HASH.USERNAME = null;
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

class UserView extends ContentView {
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
    loadingHeader = null,
    loadingMessage = null
  } = {}) {

    // Set
    let mainTemplate = null;
    let mainModel = null;
    if (type == 'login') {
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

    } else if (type == 'setting') {
      header = 'User Setting';
      mainTemplate = this.MODEL.TEMPLATE.SETTING;
      mainModel = {
        theme: this.MODEL.THEME,
        ownerPublish: this.MODEL.OWNER_PUBLISH,
        clipMode: this.MODEL.CLIP_MODE
      };

    } else if (type == 'info') {
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

    } else if (type == 'logout') {
      header = 'Logout';
      mainTemplate = this.MODEL.TEMPLATE.LOGOUT;
      mainModel = {
        username: this.MODEL.USERNAME
      };

    } else if (type == 'register') {
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

    // Clear
    this.clearArea();

    // Header
    $(this.MODEL.SELECTOR.AREA).append(
      Content.getHeader(header, headerButton)
    );

    // Generate Loading
    if (loadingMessage != null) {
      this.generateLoading({
        header: loadingHeader,
        message: loadingMessage
      });
      return;
    }

    // Generate Alert
    if (alertMessage != null) {
      this.generateAlert({
        type: alertType,
        message: alertMessage,
        close: alertClose
      });
    }

    // Generate Content
    $(this.MODEL.SELECTOR.AREA).append(area);

    // View
    if (PS.SWITCH.USER.getCurrentView() && view) {
      PS.SWITCH.USER.VIEW.setView(false, 0);
    }
    setTimeout(() => {
      PS.SWITCH.USER.VIEW.setView(view);
    }, 0);
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends ContentEvent {
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
        this.VIEW.generateArea();
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
        this.VIEW.generateArea();
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
}

// ----------------------------------------------------------------
// Controller

class UserController extends ContentController {
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
    this.openRegister();
  }

  // ----------------------------------------------------------------
  // open

  openLogin(
    args = null
  ) {
    let model = {
      type: 'login',
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openSetting(
    args = null
  ) {
    let model = {
      type: 'setting',
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openInfo(
    args = null
  ) {
    let model = {
      type: 'info',
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openLogout(
    args = null
  ) {
    let model = {
      type: 'logout',
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
  }

  openRegister(
    args = null
  ) {
    let model = {
      type: 'register',
      view: true
    };
    Object.assign(model, args);
    this.VIEW.generateArea(model);
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
      this.MODEL.USERNAME = _username.val();
    }
    if (_isCorrectEmail) {
      this.MODEL.EMAIL = _email.val();
    }
    if (_isCorrectPassword) {
      this.MODEL.PASSWORD = _password.val();
    }

    if (_isCorrectUsername && _isCorrectEmail && _isCorrectPassword && _isCorrectPasswordRe) {
      _isRegister = true;
    }

    this.updateModel(this.MODEL.REGISTER);

    if (_isRegister) {
      this.openLogin({
        alertMessage: '<div>ユーザーを登録しました。</div><div>メール認証をしてください。</div>'
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

  updateModel (
    type = null,
    timing = null
  ) {
    if (type == null || timing == null) {
      this.clearModel();
    }

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      if (timing == this.MODEL.TIMING.BEFORE) {
        this.MODEL.USERNAME = this.MODEL.USERNAME.trim();
        this.MODEL.EMAIL = this.MODEL.EMAIL.toLowerCase().trim();
        this.MODEL.HASH.USERNAME = SHA256.getHash(this.MODEL.USERNAME);
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      } else if (timing == this.MODEL.TIMING.AFTER) {
        this.MODEL.USERNAME = this.MODEL.USERNAME.trim();
        this.MODEL.EMAIL = this.MODEL.EMAIL.toLowerCase().trim();
        this.MODEL.HASH.USERNAME = SHA256.getHash(this.MODEL.USERNAME);
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      }

    } else if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      this.MODEL.USERNAME = this.MODEL.USERNAME.trim();
      this.MODEL.EMAIL = this.MODEL.EMAIL.toLowerCase().trim();
      this.MODEL.HASH.USERNAME = SHA256.getHash(this.MODEL.USERNAME);
      this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      this.MODEL.HASH.CRYPTO = SHA256.getHash(
        this.MODEL.HASH.USERNAME + this.MODEL.PASSWORD
      );
      this.MODEL.HASH.GRAVATAR = MD5.getHash(this.MODEL.EMAIL);

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      // LOGOUT
      this.clearModel();

    } else if (type == this.MODEL.TYPE.LEAVE) {
      // LEAVE
      this.clearModel();

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      this.MODEL.USERNAME = this.MODEL.USERNAME.trim();
      this.MODEL.EMAIL = this.MODEL.EMAIL.toLowerCase().trim();
      this.MODEL.HASH.USERNAME = SHA256.getHash(this.MODEL.USERNAME);
      this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      this.MODEL.HASH.CRYPTO = SHA256.getHash(
        this.MODEL.HASH.USERNAME + this.MODEL.PASSWORD
      );
      this.MODEL.HASH.GRAVATAR = MD5.getHash(this.MODEL.EMAIL);

    }
    return;
  }

  clearModel () {
    this.MODEL.USERNAME = '';
    this.MODEL.EMAIL = '';
    this.MODEL.PASSWORD = '';
    this.MODEL.HASH.USERNAME = '';
    this.MODEL.HASH.PASSWORD = '';
    this.MODEL.HASH.CRYPTO = '';
    this.MODEL.HASH.GRAVATAR = '';
  }

  // ----------------------------------------------------------------
  // post

  postModel (
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
    return;
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
