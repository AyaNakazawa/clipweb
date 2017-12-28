
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
    // ユーザ名から生成
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
    this.TEMPLATE_LOGOUT = '#logout-template';

    // バリデーション
    this.LENGTH_MIN_USERNAME = 3;
    this.LENGTH_MAX_USERNAME = 32;
    this.LENGTH_MIN_PASSWORD = 8;
    this.LENGTH_MAX_PASSWORD = 32;

    // セレクタ

    // ログイン
    this.SELECTOR_LOGIN_USERNAME = '#login-username';
    this.SELECTOR_LOGIN_PASSWORD = '#login-password';
    this.SELECTOR_LOGIN_SUBMIT = '#login-submit';
    this.SELECTOR_LOGIN_REGISTER = '#login-register';

    // 登録
    this.SELECTOR_REGISTER_EMAIL = '#register-email';
    this.SELECTOR_REGISTER_USERNAME = '#register-username';
    this.SELECTOR_REGISTER_PASSWORD = '#register-password';
    this.SELECTOR_REGISTER_PASSWORD_RE = '#register-password-re';
    this.SELECTOR_REGISTER_SUBMIT = '#register-submit';

    // 設定
    this.SELECTOR_SETTING_EMAIL = '#user-setting-email';
    this.SELECTOR_SETTING_USERNAME = '#user-setting-username';
    this.SELECTOR_SETTING_PASSWORD = '#user-setting-password';
    this.SELECTOR_SETTING_PASSWORD_RE = '#user-setting-password-re';
    this.SELECTOR_SETTING_UPDATE_SUBMIT = '#user-setting-update-submit';

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
    alertType = this.MODEL.ALERT_SUCCESS,
    alertClose = true,
    alertMessage = null,
    loadingHeader = null,
    loadingMessage = null
  } = {}) {

    // View
    if (PS.SWITCH.USER.getCurrentView() && view) {
      PS.SWITCH.USER.VIEW.setView(false, 0);
    }
    setTimeout(() => {
      PS.SWITCH.USER.VIEW.setView(view);
    }, 0);

    // Clear
    this.clearArea();

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
    if (type == 'login') {
      $(this.MODEL.SELECTOR_AREA).append(View.getTemplate({
        template: this.MODEL.TEMPLATE_LOGIN,
        model: {}
      }));
    } else if (type == 'setting') {
      $(this.MODEL.SELECTOR_AREA).append(View.getTemplate({
        template: this.MODEL.TEMPLATE_SETTING,
        model: {}
      }));
    }if (type == 'register') {
      $(this.MODEL.SELECTOR_AREA).append(View.getTemplate({
        template: this.MODEL.TEMPLATE_REGISTER,
        model: {}
      }));
    }
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

  openLogin() {
    this.VIEW.generateArea({
      type: 'login',
      view: true
    });
  }

  openSetting() {
    this.VIEW.generateArea({
      type: 'setting',
      view: true
    });
  }

  openRegister() {
    this.VIEW.generateArea({
      type: 'register',
      view: true
    });
  }
}
