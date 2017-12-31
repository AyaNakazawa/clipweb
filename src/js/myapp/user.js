
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

    // ログインステータス
    this.STATUS_LOGIN = false;

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

    // ユーザハッシュ
    // メールアドレスから生成
    // ログイン、登録時に使用
    // クリップ生成時に使用
    // ユーザハッシュ + 日時 = クリップID
    this.HASH_USER = null;
    // パスワードハッシュ
    // パスワード + クライアントSalt から生成
    // ログイン、登録時に使用
    // 暗号ハッシュ生成に使用
    this.HASH_PASSWORD = null;
    // 暗号ハッシュ
    // 非公開クリップの暗号化に使用
    // ユーザハッシュ + パスワード + クライアントSalt = 暗号ハッシュ
    this.HASH_CRYPTO = null;
    // メール認証ハッシュ
    // メールアドレス + サーバSalt = メール認証ハッシュ
    // メール認証に使用
    this.HASH_EMAIL_AUTH = null;
    // Gravatarハッシュ
    // メールアドレスのMD5ハッシュ
    this.HASH_GRAVATAR = null;

    // クライアントSalt
    // パスワードハッシュの生成に使用
    this.SALT = Project.NAME_KEY;

    // ユーザ設定
    this.THEME = 'light';
    this.OWNER_PUBLISH = 'public';
    this.CLIP_MODE = 'private';

    // テンプレート
    this.TEMPLATE_LOGIN = '#login-template';
    this.TEMPLATE_REGISTER = '#register-template';
    this.TEMPLATE_SETTING = '#user-setting-template';
    this.TEMPLATE_INFO = '#user-info-template';
    this.TEMPLATE_LOGOUT = '#logout-template';

    // バリデーション
    this.LENGTH_MIN_USERNAME = 3;
    this.LENGTH_MAX_USERNAME = 32;
    this.LENGTH_MIN_PASSWORD = 8;
    this.LENGTH_MAX_PASSWORD = 32;
    this.PATTERN_PASSWORD = '^[a-zA-Z0-9]*(?:[a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$';

    // セレクタ

    // ログイン
    this.SELECTOR_LOGIN_EMAIL = '#login-email';
    this.SELECTOR_LOGIN_PASSWORD = '#login-password';
    this.SELECTOR_LOGIN_SUBMIT = '#login-submit';
    this.SELECTOR_LOGIN_REGISTER = '#login-register';

    // 登録
    this.SELECTOR_REGISTER_USERNAME = '#register-username';
    this.SELECTOR_REGISTER_EMAIL = '#register-email';
    this.SELECTOR_REGISTER_PASSWORD = '#register-password';
    this.SELECTOR_REGISTER_PASSWORD_RE = '#register-password-re';
    this.SELECTOR_REGISTER_SUBMIT = '#register-submit';

    // ユーザ設定
    this.SELECTOR_SETTING_THEME = 'user-setting-theme';
    this.SELECTOR_SETTING_OWNER_PUBLISH = 'user-setting-owner-publish';
    this.SELECTOR_SETTING_CLIP_MODE = 'user-setting-clip-mode';
    this.SELECTOR_SETTING_INFO = '#user-setting-info';
    this.SELECTOR_SETTING_UPDATE_SUBMIT = '#user-setting-update-submit';

    // ユーザ情報
    this.SELECTOR_INFO_USERNAME = '#user-info-username';
    this.SELECTOR_INFO_EMAIL = '#user-info-email';
    this.SELECTOR_INFO_OLD_PASSWORD = '#user-info-old-password';
    this.SELECTOR_INFO_NEW_PASSWORD = '#user-info-new-password';
    this.SELECTOR_INFO_NEW_PASSWORD_RE = '#user-info-new-password-re';
    this.SELECTOR_INFO_SETTING = '#user-info-setting';
    this.SELECTOR_INFO_UPDATE_SUBMIT = '#user-info-update-submit';

    // ログアウト
    this.SELECTOR_LOGOUT_SUBMIT = '#logout-submit';

    // エリア
    this.SELECTOR_AREA = '#user-area';

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
      mainTemplate = this.MODEL.TEMPLATE_LOGIN;
      mainModel = {
        length: {
          min: {
            username: this.MODEL.LENGTH_MIN_USERNAME,
            password: this.MODEL.LENGTH_MIN_PASSWORD
          },
          max: {
            username: this.MODEL.LENGTH_MAX_USERNAME,
            password: this.MODEL.LENGTH_MAX_PASSWORD
          }
        },
        email: this.MODEL.EMAIL,
        pattern: {
          password: this.MODEL.PATTERN_PASSWORD
        }
      };

    } else if (type == 'setting') {
      header = 'User Setting';
      mainTemplate = this.MODEL.TEMPLATE_SETTING;
      this.MODEL.EMAIL = this.MODEL.EMAIL.toLowerCase().trim();
      this.MODEL.HASH_GRAVATAR = MD5.getHash(this.MODEL.EMAIL);
      mainModel = {
        gravatarHash: this.MODEL.HASH_GRAVATAR,
        theme: this.MODEL.THEME,
        ownerPublish: this.MODEL.OWNER_PUBLISH,
        clipMode: this.MODEL.CLIP_MODE
      };

    } else if (type == 'info') {
      header = 'User Info';
      mainTemplate = this.MODEL.TEMPLATE_INFO;
      mainModel = {
        length: {
          min: {
            username: this.MODEL.LENGTH_MIN_USERNAME,
            password: this.MODEL.LENGTH_MIN_PASSWORD
          },
          max: {
            username: this.MODEL.LENGTH_MAX_USERNAME,
            password: this.MODEL.LENGTH_MAX_PASSWORD
          }
        },
        username: this.MODEL.USERNAME,
        email: this.MODEL.EMAIL,
        pattern: {
          password: this.MODEL.PATTERN_PASSWORD
        }
      };

    } else if (type == 'logout') {
      header = 'Logout';
      mainTemplate = this.MODEL.TEMPLATE_LOGOUT;
      mainModel = {
        username: this.MODEL.USERNAME
      };

    } else if (type == 'register') {
      header = 'Join clipweb';
      mainTemplate = this.MODEL.TEMPLATE_REGISTER;
      mainModel = {
        length: {
          min: {
            username: this.MODEL.LENGTH_MIN_USERNAME,
            password: this.MODEL.LENGTH_MIN_PASSWORD
          },
          max: {
            username: this.MODEL.LENGTH_MAX_USERNAME,
            password: this.MODEL.LENGTH_MAX_PASSWORD
          }
        },
        username: this.MODEL.USERNAME,
        email: this.MODEL.EMAIL,
        pattern: {
          password: this.MODEL.PATTERN_PASSWORD
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
    $(this.MODEL.SELECTOR_AREA).append(
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
    $(this.MODEL.SELECTOR_AREA).append(area);

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
      selector: `${this.MODEL.SELECTOR_AREA} .content-header-button`,
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
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_LOGIN_SUBMIT}`,
      func: () => {
        Log.logClassKey('User', 'Login', 'Submit');
        PS.CONTROLLER.NAV.VIEW.generateLogined();
        this.VIEW.generateArea();
      }
    });
  }

  setClickLoginRegister() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_LOGIN_REGISTER}`,
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
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_REGISTER_SUBMIT}`,
      func: () => {
        Log.logClassKey('User', 'Register', 'Submit');
        this.CONTROLLER.submitRegister();
      }
    });
  }

  setChangeRegisterUsername() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_REGISTER_USERNAME}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR_REGISTER_USERNAME
        );
      }
    });
  }

  setChangeRegisterEmail() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_REGISTER_EMAIL}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR_REGISTER_EMAIL
        );
      }
    });
  }

  setChangeRegisterPassword() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_REGISTER_PASSWORD}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR_REGISTER_PASSWORD
        );
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR_REGISTER_PASSWORD_RE
        );
      }
    });
  }

  setChangeRegisterPasswordRe() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_REGISTER_PASSWORD_RE}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateValidMessage(
          this.MODEL.SELECTOR_REGISTER_PASSWORD_RE
        );
      }
    });
  }

  setKeyupRegisterPasswordRe() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_REGISTER_PASSWORD}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.validPassword(
          this.MODEL.SELECTOR_REGISTER_PASSWORD,
          this.MODEL.SELECTOR_REGISTER_PASSWORD_RE
        );
      }
    });
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_REGISTER_PASSWORD_RE}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.validPassword(
          this.MODEL.SELECTOR_REGISTER_PASSWORD,
          this.MODEL.SELECTOR_REGISTER_PASSWORD_RE
        );
      }
    });
  }

  // ----------------------------------------------------------------
  // info

  setClickSetting() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_INFO_SETTING}`,
      func: () => {
        Log.logClassKey('User', 'User Setting', 'Open');
        this.CONTROLLER.openSetting();
      }
    });
  }

  setClickInfoUpdate() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_INFO_UPDATE_SUBMIT}`,
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
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_SETTING_UPDATE_SUBMIT}`,
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
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_SETTING_INFO}`,
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
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_LOGOUT_SUBMIT}`,
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

    const _username = $(this.MODEL.SELECTOR_REGISTER_USERNAME);
    const _email = $(this.MODEL.SELECTOR_REGISTER_EMAIL);
    const _password = $(this.MODEL.SELECTOR_REGISTER_PASSWORD);
    const _passwordRe = $(this.MODEL.SELECTOR_REGISTER_PASSWORD_RE);

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
