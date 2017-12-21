
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends ContentModel {
  constructor(
    _initSetting = {
      NAME: 'User Object',
      SELECTOR_USER_ID: '#user-id',
      SELECTOR_USER_PASSWORD: '#user-password',
      SELECTOR_USER_CHECK: '#user-check',
      SELECTOR_LOGIN: '#login-submit',
      SELECTOR_LOGOUT: '#logout-submit',
      SELECTOR_SIGNUP: '#signup-submit',
      TRIGGER_LOGIN: 'click',
      TRIGGER_LOGOUT: 'click',
      TRIGGER_SIGNUP: 'click'
    }
  ) {
    super(_initSetting);

    this.LOGIN = false;

    this.ID = null;
    this.PASSWORD = null;

    this.HASH_ID = null;
    this.HASH_PASSWORD = null;
    this.HASH_CRYPTO = null;
    this.SALT_CRYPTO = Project.NAME_KEY;

    this.TEMPLATE_NOT_LOGIN = '#not-login-template';
    this.TEMPLATE_LOGINED = '#logined-template';

    this.LENGTH_MIN_ID = 3;
    this.LENGTH_MAX_ID = 32;
    this.LENGTH_MIN_PASSWORD = 8;
    this.LENGTH_MAX_PASSWORD = 32;

    this.SELECTOR_AREA = '#user-area';
    this.SELECTOR_SWITCH = '#user-switch';

    this.SELECTOR_NAV = `${this.SELECTOR_AREA} .${Content.NAV}`;

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
    view = false,
    alertType = this.MODEL.ALERT_SUCCESS,
    alertClose = true,
    alertMessage = null,
    loadingHeader = null,
    loadingMessage = null
  } = {}) {
    // Clear
    this.clearArea();

    // Generate Loading
    if (loadingMessage != null) {
      this.generateLoading({
        header: loadingHeader,
        message: loadingMessage
      });
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
    $(this.MODEL.SELECTOR_AREA).append(Content.getHeader('header'));
    $(this.MODEL.SELECTOR_AREA).append(Content.getNav());
    $(this.MODEL.SELECTOR_NAV).append(Content.getNavItem({
      addId: 'test-button',
      name: 'button',
      type: Content.TYPE_BUTTON
    }));
    $(this.MODEL.SELECTOR_NAV).append(Content.getNavItem({
      addId: 'test-text',
      name: 'text',
      type: Content.TYPE_TEXT
    }));
    $(this.MODEL.SELECTOR_NAV).append(Content.getNavItem({
      addId: 'test-input',
      value: 'input',
      type: Content.TYPE_INPUT
    }));

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
    this.setClickTest();
  }

  setClickTest() {
    super.setOn({
      selector: '#test-button',
      func: () => {
        Log.log('click');
        new ConfirmController({
          CONFIRM_ID: 'confirm-submit-logout',
          CONFIRM_TITLE: 'ログアウト',
          CONFIRM_MESSAGE: 'ログアウトしてもよろしいですか？',
          AUTO_OPEN: true,
          FUNCTION_YES: () => {
            Log.log('yes');
          }
        });
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
    this.VIEW.generateArea({
      alertMessage: 'alert',
      loadingHeader: 'クリップ読み込み',
      loadingMessage: '読み込み中'
    });
  }
}
