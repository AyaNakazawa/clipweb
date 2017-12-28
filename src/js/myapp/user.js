
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
    this.LOGINED = false;

    // ユーザ名
    this.USERNAME = null;
    // メールアドレス
    this.EMAIL = null;
    // パスワード
    this.PASSWORD = null;
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
    // ユーザハッシュ + パスワードハッシュ = 暗号ハッシュ
    this.HASH_CRYPTO = null;
    // メール認証ハッシュ
    // メールアドレス + サーバSalt = メール認証ハッシュ
    // メール認証に使用
    this.HASH_EMAIL_AUTH = null;

    // クライアントSalt
    // パスワードハッシュの生成に使用
    this.SALT = Project.NAME_KEY;

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

    // セレクタ

    // ログイン
    this.SELECTOR_LOGIN_EMAIL = '#login-email';
    this.SELECTOR_LOGIN_PASSWORD = '#login-password';
    this.SELECTOR_LOGIN_SUBMIT = '#login-submit';
    this.SELECTOR_LOGIN_REGISTER = '#login-register';

    // 登録
    this.SELECTOR_REGISTER_EMAIL = '#register-email';
    this.SELECTOR_REGISTER_USERNAME = '#register-username';
    this.SELECTOR_REGISTER_PASSWORD = '#register-password';
    this.SELECTOR_REGISTER_PASSWORD_RE = '#register-password-re';
    this.SELECTOR_REGISTER_SUBMIT = '#register-submit';

    // ユーザ設定
    this.SELECTOR_SETTING_THEME = 'user-setting-theme';
    this.SELECTOR_SETTING_OWNER_PUBLISH = 'user-setting-owner-publish';
    this.SELECTOR_SETTING_CLIP_MODE = 'user-setting-clip-mode';
    this.SELECTOR_SETTING_UPDATE_SUBMIT = '#user-setting-update-submit';
    this.SELECTOR_SETTING_INFO = '#user-setting-info';

    // ユーザ情報
    this.SELECTOR_INFO_EMAIL = '#user-info-email';
    this.SELECTOR_INFO_USERNAME = '#user-info-username';
    this.SELECTOR_INFO_PASSWORD = '#user-info-password';
    this.SELECTOR_INFO_PASSWORD_RE = '#user-info-password-re';
    this.SELECTOR_INFO_UPDATE_SUBMIT = '#user-info-update-submit';
    this.SELECTOR_INFO_SETTING = '#user-info-setting';

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
      mainModel = {};

    } else if (type == 'setting') {
      header = 'User Setting';
      mainTemplate = this.MODEL.TEMPLATE_SETTING;
      mainModel = {};

    } else if (type == 'info') {
      header = 'User Info';
      mainTemplate = this.MODEL.TEMPLATE_INFO;
      mainModel = {};

    } else if (type == 'logout') {
      header = 'Logout';
      mainTemplate = this.MODEL.TEMPLATE_LOGOUT;
      mainModel = {};

    } else if (type == 'register') {
      header = 'Join clipweb';
      mainTemplate = this.MODEL.TEMPLATE_REGISTER;
      mainModel = {};

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
    this.setClickSetting();
    this.setClickSettingUpdate();
    this.setClickInfo();
    this.setClickInfoUpdate();
    this.setClickRegister();
    this.setClickLogout();
  }

  setClickClose() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} .content-header-button`,
      func: () => {
        Log.logClassKey('User', 'Close', 'Submit');
        this.VIEW.generateArea();
      }
    });
  }

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

  setClickRegister() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_REGISTER_SUBMIT}`,
      func: () => {
        Log.logClassKey('User', 'Register', 'Submit');
        this.CONTROLLER.openLogin({
          alertMessage: 'Please do email authentication'
        });
      }
    });
  }

  setClickSetting() {
    super.setOn({
      selector: `${this.MODEL.SELECTOR_AREA} ${this.MODEL.SELECTOR_INFO_SETTING}`,
      func: () => {
        Log.logClassKey('User', 'User Setting', 'Open');
        this.CONTROLLER.openSetting();
      }
    });
  }

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
    this.openLogin();
  }

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
}
