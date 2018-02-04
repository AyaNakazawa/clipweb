
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends ClipwebModel {
  constructor (
    initSetting = {
      NAME: 'User Object'
    }
  ) {
    super(initSetting);

    // ----------------------------------------------------------------
    // エラーコード

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'user';

    // ----------------------------------------------------------------
    // ステータス
    this.STATUS.LOGIN = false;
    this.STATUS.AUTO = false;
    this.STATUS.LS_LOAD = false;

    // ----------------------------------------------------------------
    // LocalStorageキー
    this.LS.LOGIN = 'user.login';

    this.LS.AUTO = {};
    this.LS.AUTO.LOGIN = 'user.auto.login';
    this.LS.AUTO.EMAIL = 'user.auto.em';

    this.LS.AUTO.HASH = {};
    this.LS.AUTO.HASH.PASSWORD = 'user.auto.ph';
    this.LS.AUTO.HASH.DECRYPT_CRYPTO = 'user.auto.dch';

    // ----------------------------------------------------------------
    // ユーザ情報

    // ユーザ名
    this.USERNAME = '';
    // メールアドレス
    this.EMAIL = '';
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
    this.THEME = 'monokai';
    this.OWNER_PUBLIC = 'public';
    this.CLIP_MODE = 'private';

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.LOGIN = '#user-login-template';
    this.TEMPLATE.REGISTER = '#user-register-template';
    this.TEMPLATE.SETTING = '#user-setting-template';
    this.TEMPLATE.INFO = '#user-info-template';
    this.TEMPLATE.LOGOUT = '#user-logout-template';

    // ----------------------------------------------------------------
    // オフセット
    this.COMMON.OFFSET = -8;

    // ----------------------------------------------------------------
    // セレクタ

    // エリア
    this.SELECTOR.AREA = '#user-area';

    // 登録
    this.SELECTOR.REGISTER = {};
    this.SELECTOR.REGISTER.USERNAME = '#user-register-username';
    this.SELECTOR.REGISTER.EMAIL = '#user-register-email';
    this.SELECTOR.REGISTER.PASSWORD = '#user-register-password';
    this.SELECTOR.REGISTER.PASSWORD_RE = '#user-register-password-re';
    this.SELECTOR.REGISTER.SUBMIT = '#user-register-submit';
    this.SELECTOR.REGISTER.LOGIN = '#user-register-login';

    // ログイン
    this.SELECTOR.LOGIN = {};
    this.SELECTOR.LOGIN.EMAIL = '#user-login-email';
    this.SELECTOR.LOGIN.PASSWORD = '#user-login-password';
    this.SELECTOR.LOGIN.AUTO_LABEL = '#user-login-auto-label';
    this.SELECTOR.LOGIN.AUTO = '#user-login-auto';
    this.SELECTOR.LOGIN.SUBMIT = '#user-login-submit';
    this.SELECTOR.LOGIN.REGISTER = '#user-login-register';

    // ログアウト
    this.SELECTOR.LOGOUT = {};
    this.SELECTOR.LOGOUT.SUBMIT = '#user-logout-submit';

    // ユーザ情報
    this.SELECTOR.INFO = {};
    this.SELECTOR.INFO.USERNAME = '#user-info-username';
    this.SELECTOR.INFO.EMAIL = '#user-info-email';
    this.SELECTOR.INFO.OLD_PASSWORD = '#user-info-old-password';
    this.SELECTOR.INFO.NEW_PASSWORD = '#user-info-new-password';
    this.SELECTOR.INFO.NEW_PASSWORD_RE = '#user-info-new-password-re';
    this.SELECTOR.INFO.SETTING = '#user-info-setting';
    this.SELECTOR.INFO.SUBMIT = '#user-info-submit';

    // ユーザ設定
    this.SELECTOR.SETTING = {};
    this.SELECTOR.SETTING.THEME = '#user-setting-theme';
    this.SELECTOR.SETTING.OWNER_PUBLIC = '#user-setting-owner-public';
    this.SELECTOR.SETTING.CLIP_MODE = '#user-setting-clip-mode';
    this.SELECTOR.SETTING.INFO = '#user-setting-info';
    this.SELECTOR.SETTING.SUBMIT = '#user-setting-submit';

  }
}

// ----------------------------------------------------------------
// View

class UserView extends ClipwebView {
  constructor (
    initSetting = {
      NAME: 'User View'
    }
  ) {
    super(initSetting);
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends ClipwebEvent {
  constructor (
    initSetting = {
      NAME: 'User Event'
    }
  ) {
    super(initSetting);
  }

  setEvent () {
    this.setOnHide();
    this.setOnRegister();
    this.setOnLogin();
    this.setOnLogout();
    this.setOnInfo();
    this.setOnSetting();
  }

  // ----------------------------------------------------------------
  // hide

  setOnHide () {
    super.setHeaderButton({
      func: () => {
        this.trigger({ trigger: this.MODEL.TRIGGER.VIEW.HIDE });
      }
    });
  }

  // ----------------------------------------------------------------
  // type

  setOnRegister () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.SUBMIT}`,
      func: () => {
        super.log('Register', 'Submit')();
        this.CONTROLLER.submitRegister();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.LOGIN}`,
      func: () => {
        super.log('Login', 'Open')();
        this.CONTROLLER.open({ type: this.MODEL.TYPE.LOGIN });
      }
    });

    super.setSeqFocus([
      this.MODEL.SELECTOR.REGISTER.USERNAME,
      this.MODEL.SELECTOR.REGISTER.EMAIL,
      this.MODEL.SELECTOR.REGISTER.PASSWORD,
      this.MODEL.SELECTOR.REGISTER.PASSWORD_RE,
      this.MODEL.SELECTOR.REGISTER.SUBMIT,
    ]);

    super.setValidate(
      this.MODEL.SELECTOR.REGISTER.USERNAME
    );
    super.setValidate(
      this.MODEL.SELECTOR.REGISTER.EMAIL
    );
    super.setValidatePassword(
      this.MODEL.SELECTOR.REGISTER.PASSWORD,
      this.MODEL.SELECTOR.REGISTER.PASSWORD_RE
    );
  }

  setOnLogin () {
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

    super.setOn({
      trigger: 'keydown',
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.AUTO_LABEL}`,
      func: (event) => {
        if (event.which == 13 || event.which == 32) {
          super.trigger({
            trigger: 'click',
            selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.AUTO}`
          });
        }
      }
    });

    super.setOn({
      trigger: 'change',
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGIN.AUTO}`,
      func: () => {
        super.log('Auto Login', 'Change')();
        this.MODEL.STATUS.AUTO = $(this.MODEL.SELECTOR.LOGIN.AUTO).prop('checked');
        if (this.MODEL.STATUS.AUTO) {
          LocalStorage.setItem(this.MODEL.LS.AUTO.LOGIN, 'true');
        } else {
          LocalStorage.setItem(this.MODEL.LS.AUTO.LOGIN, 'false');
        }
      }
    });

    super.setSeqFocus([
      this.MODEL.SELECTOR.LOGIN.EMAIL,
      this.MODEL.SELECTOR.LOGIN.PASSWORD,
      this.MODEL.SELECTOR.LOGIN.AUTO_LABEL,
      this.MODEL.SELECTOR.LOGIN.SUBMIT,
    ]);

    super.setValidate(
      this.MODEL.SELECTOR.LOGIN.EMAIL
    );
    super.setValidate(
      this.MODEL.SELECTOR.LOGIN.PASSWORD
    );
  }

  setOnLogout () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.LOGOUT.SUBMIT}`,
      func: () => {
        super.log('Logout', 'Submit')();
        this.CONTROLLER.submitLogout();
      }
    });
  }

  setOnInfo () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.INFO.SETTING}`,
      func: () => {
        super.log('User Setting', 'Open')();
        this.CONTROLLER.open({ type: this.MODEL.TYPE.SETTING, model: {
          scroll: true
        }});
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.INFO.SUBMIT}`,
      func: () => {
        super.log('User Info', 'Submit')();
        this.CONTROLLER.submitInfo();
      }
    });

    super.setSeqFocus([
      this.MODEL.SELECTOR.INFO.USERNAME,
      this.MODEL.SELECTOR.INFO.EMAIL,
      this.MODEL.SELECTOR.INFO.OLD_PASSWORD,
      this.MODEL.SELECTOR.INFO.NEW_PASSWORD,
      this.MODEL.SELECTOR.INFO.NEW_PASSWORD_RE,
      this.MODEL.SELECTOR.INFO.SUBMIT,
    ]);

    super.setValidate(
      this.MODEL.SELECTOR.INFO.USERNAME
    );
    super.setValidate(
      this.MODEL.SELECTOR.INFO.EMAIL
    );
    super.setValidate(
      this.MODEL.SELECTOR.INFO.OLD_PASSWORD
    );
    super.setValidatePassword(
      this.MODEL.SELECTOR.INFO.NEW_PASSWORD,
      this.MODEL.SELECTOR.INFO.NEW_PASSWORD_RE
    );
  }

  setOnSetting () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.INFO}`,
      func: () => {
        super.log('User Info', 'Open')();
        this.CONTROLLER.open({ type: this.MODEL.TYPE.INFO, model: {
          scroll: true
        }});
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.SUBMIT}`,
      func: () => {
        super.log('User Setting', 'Submit')();
        this.CONTROLLER.submitSetting();
      }
    });

    super.setSeqFocus([
      this.MODEL.SELECTOR.SETTING.THEME,
      this.MODEL.SELECTOR.SETTING.OWNER_PUBLIC,
      this.MODEL.SELECTOR.SETTING.CLIP_MODE,
      this.MODEL.SELECTOR.SETTING.SUBMIT,
    ]);
  }
}

// ----------------------------------------------------------------
// Controller

class UserController extends ClipwebController {
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
    this.init();
  }

  init () {
    this.EVENT.setEvent();
    if (LocalStorage.getItem(this.MODEL.LS.AUTO.LOGIN) == 'true') {
      // データを取得
      this.MODEL.STATUS.AUTO = true;
      if (LocalStorage.getItem(this.MODEL.LS.LOGIN) == 'true') {
        // 前回ログインしていたとき
        this.MODEL.EMAIL = LocalStorage.getItem(this.MODEL.LS.AUTO.EMAIL);
        this.MODEL.HASH.PASSWORD = LocalStorage.getItem(this.MODEL.LS.AUTO.HASH.PASSWORD);
        this.MODEL.HASH.DECRYPT_CRYPTO = LocalStorage.getItem(this.MODEL.LS.AUTO.HASH.DECRYPT_CRYPTO);
        if (this.MODEL.EMAIL != null || this.MODEL.HASH.PASSWORD != null) {
          // データがあるとき
          this.MODEL.STATUS.LS_LOAD = true;
          this.submitLogin(true);
          return this.MODEL.ERROR;
        }
      }
    }
    this.open({ type: this.MODEL.TYPE.LOGIN });
  }

  // ----------------------------------------------------------------
  // submit

  submitRegister () {
    const _TYPE = this.MODEL.TYPE.REGISTER;
    const _FAILED = 'failed_to_register';

    const _USERNAME = $(this.MODEL.SELECTOR.REGISTER.USERNAME);
    const _EMAIL = $(this.MODEL.SELECTOR.REGISTER.EMAIL);
    const _PASSWORD = $(this.MODEL.SELECTOR.REGISTER.PASSWORD);
    const _PASSWORD_RE = $(this.MODEL.SELECTOR.REGISTER.PASSWORD_RE);

    let _validUsername = _USERNAME[0].validity.valid;
    let _validEmail = _EMAIL[0].validity.valid;
    let _validPassword = _PASSWORD[0].validity.valid;
    let _validPasswordRe = _PASSWORD_RE[0].validity.valid;

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
      this.EVENT.setLoading({
        type: _TYPE,
        errorMessage: _FAILED,
        check: [
          'new_user'
        ],
        functionSuccess: () => {
          // 登録成功
          this.CONTROLLER.applyReceiveModel(_TYPE);
          this.CONTROLLER.updateHash(_TYPE, this.MODEL.TIMING.AFTER);
          this.open({
            type: this.MODEL.TYPE.LOGIN,
            model: {
              alertMessage:
                View.element({ content: LN.get('user_registered') }) +
                View.element({ content: LN.get('please_email_auth') })
            },
          });
        },
        connectionErrorOpenType: _TYPE,
        connectionErrorModel: super.getErrorModel('server', _FAILED)
      });

      // Post
      this.updateHash(_TYPE, this.MODEL.TIMING.BEFORE);
      this.post({
        type: _TYPE,
        data: this.getSendModel(_TYPE)
      });

    } else {
      this.open({
        type: _TYPE,
        model: {
          alertMessage: (
            View.element({ content: LN.get('please_all_inputs_correctly') })
          ),
          alertType: View.ALERT_WARNING
        }
      });
    }
  }

  submitLogin (auto = false) {
    const _TYPE = this.MODEL.TYPE.LOGIN;
    const _FAILED = 'failed_to_login';

    let _validEmail = true;
    let _validPassword = true;

    if (auto == false) {
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
    }

    if ( _validEmail && _validPassword) {
      this.EVENT.setLoading({
        type: _TYPE,
        errorMessage: _FAILED,
        check: [
          'hash',
          'username',
          'encrypted_crypto_hash',
          'email_authentication',
          'theme',
          'default_owner_public',
          'default_clip_mode',
          'created_at',
          'updated_at',
        ],
        functionSuccess: () => {
          // Login成功
          super.log(Web.getParam('share'))();
          NAV.login();
          this.CONTROLLER.applyReceiveModel(_TYPE);
          this.CONTROLLER.updateHash(_TYPE, this.MODEL.TIMING.AFTER);
          if (this.MODEL.STATUS.AUTO) {
            LocalStorage.setItem(this.MODEL.LS.AUTO.HASH.PASSWORD, this.MODEL.HASH.PASSWORD);
            LocalStorage.setItem(this.MODEL.LS.AUTO.EMAIL, this.MODEL.EMAIL);
            LocalStorage.setItem(this.MODEL.LS.AUTO.HASH.DECRYPT_CRYPTO, this.MODEL.HASH.DECRYPT_CRYPTO);
          }
          LocalStorage.setItem(this.MODEL.LS.LOGIN, 'true');
          this.MODEL.STATUS.LOGIN = true;
          this.close();
          LIST.loadList();
        },
        connectionErrorOpenType: _TYPE,
        connectionErrorModel: super.getErrorModel('server', _FAILED)
      });

      // Post
      this.updateHash(_TYPE, this.MODEL.TIMING.BEFORE);
      this.post({
        type: _TYPE,
        data: this.getSendModel(_TYPE)
      });

    } else {
      this.open({
        type: _TYPE,
        model: {
          alertMessage: (
            View.element({ content: LN.get('please_all_inputs_correctly') })
          ),
          alertType: View.ALERT_WARNING
        }
      });
    }
  }

  submitLogout () {
    const _TYPE = this.MODEL.TYPE.LOGOUT;
    const _FAILED = 'failed_to_logout';

    this.EVENT.setLoading({
      type: _TYPE,
      errorMessage: _FAILED,
      check: [],
      functionSuccess: () => {
        // Logout成功
        NAV.logout();
        LIST.VIEW.hide();
        LocalStorage.setItem(this.MODEL.LS.LOGIN, 'false');
        this.MODEL.STATUS.LOGIN = false;
        LocalStorage.removeItem(this.MODEL.LS.AUTO.HASH.PASSWORD);
        LocalStorage.removeItem(this.MODEL.LS.AUTO.EMAIL);
        LocalStorage.removeItem(this.MODEL.LS.AUTO.HASH.DECRYPT_CRYPTO);
        this.CONTROLLER.applyReceiveModel(_TYPE);
        this.CONTROLLER.updateHash(_TYPE, this.MODEL.TIMING.AFTER);
        LIST.open();
        CLIP.open();
        this.open({
          type: this.MODEL.TYPE.LOGIN,
          model: {
            alertMessage:
              View.element({ content: LN.get('user_logouted') })
          },
        });
      },
      connectionErrorOpenType: _TYPE,
      connectionErrorModel: super.getErrorModel('server', _FAILED)
    });

    // Post
    this.updateHash(_TYPE, this.MODEL.TIMING.BEFORE);
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
  }

  submitInfo () {
    const _TYPE = this.MODEL.TYPE.INFO;
    const _FAILED = 'failed_to_save_info';

    const _USERNAME = $(this.MODEL.SELECTOR.INFO.USERNAME);
    const _EMAIL = $(this.MODEL.SELECTOR.INFO.EMAIL);
    const _PASSWORD = $(this.MODEL.SELECTOR.INFO.OLD_PASSWORD);
    const _NEW_PASSWORD = $(this.MODEL.SELECTOR.INFO.NEW_PASSWORD);
    const _NEW_PASSWORD_RE = $(this.MODEL.SELECTOR.INFO.NEW_PASSWORD_RE);

    let _validUsername = _USERNAME[0].validity.valid;
    let _validEmail = _EMAIL[0].validity.valid;
    let _validPassword = _PASSWORD[0].validity.valid;
    let _validNewPassword = _NEW_PASSWORD[0].validity.valid;
    let _validNewPasswordRe = _NEW_PASSWORD_RE[0].validity.valid;

    if (_validUsername) {
      this.MODEL.USERNAME_NEW = _USERNAME.val().trim();
    }
    if (_validEmail) {
      this.MODEL.EMAIL_NEW = _EMAIL.val().trim();
    }
    if (_validPassword) {
      this.MODEL.PASSWORD = _PASSWORD.val();
    }
    if (_validNewPassword && _validNewPasswordRe) {
      this.MODEL.PASSWORD_NEW = _NEW_PASSWORD.val();
    } else {
      if (_NEW_PASSWORD.val().length == 0 && _NEW_PASSWORD_RE.val().length == 0) {
        this.MODEL.PASSWORD_NEW = '';
        _validNewPassword = true;
        _validNewPasswordRe = true;
      }
    }

    if (_validUsername && _validEmail && _validPassword && _validNewPassword && _validNewPasswordRe) {
      this.EVENT.setLoading({
        type: _TYPE,
        errorMessage: _FAILED,
        check: [
          'username',
          'email_address',
          'encrypted_crypto_hash',
          'updated_at',
        ],
        functionSuccess: () => {
          // 情報変更成功
          this.CONTROLLER.applyReceiveModel(_TYPE);
          this.CONTROLLER.updateHash(_TYPE, this.MODEL.TIMING.AFTER);
          if (this.MODEL.STATUS.AUTO) {
            LocalStorage.setItem(this.MODEL.LS.AUTO.HASH.PASSWORD, this.MODEL.HASH.PASSWORD);
            LocalStorage.setItem(this.MODEL.LS.AUTO.EMAIL, this.MODEL.EMAIL);
            LocalStorage.setItem(this.MODEL.LS.AUTO.HASH.DECRYPT_CRYPTO, this.MODEL.HASH.DECRYPT_CRYPTO);
          }
          this.open({
            type: _TYPE,
            model: {
              alertMessage:
                View.element({ content: LN.get('user_update_info') })
            }
          });
        },
        connectionErrorOpenType: _TYPE,
        connectionErrorModel: super.getErrorModel('server', _FAILED)
      });

      // Post
      this.updateHash(_TYPE, this.MODEL.TIMING.BEFORE);
      this.post({
        type: _TYPE,
        data: this.getSendModel(_TYPE)
      });

    } else {
      this.open({
        type: _TYPE,
        model: {
          alertMessage: (
            View.element({ content: LN.get('please_inputs_correctly') })
          ),
          alertType: View.ALERT_WARNING
        }
      });
    }
  }

  submitSetting () {
    const _TYPE = this.MODEL.TYPE.SETTING;
    const _FAILED = 'failed_to_save_setting';

    const _THEME = this.MODEL.SELECTOR.SETTING.THEME;
    const _OWNER_PUBLIC = this.MODEL.SELECTOR.SETTING.OWNER_PUBLIC;
    const _CLIP_MODE = this.MODEL.SELECTOR.SETTING.CLIP_MODE;

    let _validTheme = $(_THEME)[0].validity.valid;
    let _validOwnerPublic = $(_OWNER_PUBLIC)[0].validity.valid;
    let _validClipMode = $(_CLIP_MODE)[0].validity.valid;

    if (_validTheme) {
      this.MODEL.THEME = $(`${_THEME} option:selected`).val();
    }
    if (_validOwnerPublic) {
      this.MODEL.OWNER_PUBLIC = $(`${_OWNER_PUBLIC} option:selected`).val();
    }
    if (_validClipMode) {
      this.MODEL.CLIP_MODE = $(`${_CLIP_MODE} option:selected`).val();
    }

    if (_validTheme && _validOwnerPublic && _validClipMode) {
      this.EVENT.setLoading({
        type: _TYPE,
        errorMessage: _FAILED,
        check: [
          'theme',
          'default_owner_public',
          'default_clip_mode',
          'updated_at',
        ],
        functionSuccess: () => {
          // 設定更新成功
          this.CONTROLLER.applyReceiveModel(_TYPE);
          this.CONTROLLER.updateHash(_TYPE, this.MODEL.TIMING.AFTER);
          this.open({
            type: _TYPE,
            model: {
              alertMessage:
                View.element({ content: LN.get('user_update_setting') })
            }
          });
        },
        connectionErrorOpenType: _TYPE,
        connectionErrorModel: super.getErrorModel('server', _FAILED)
      });

      // Post
      this.updateHash(_TYPE, this.MODEL.TIMING.BEFORE);
      this.post({
        type: _TYPE,
        data: this.getSendModel(_TYPE)
      });

    } else {
      this.open({
        type: _TYPE,
        model: {
          alertMessage: (
            View.element({ content: LN.get('please_selects_correctly') })
          ),
          alertType: View.ALERT_WARNING
        }
      });
    }
  }

  // ----------------------------------------------------------------
  // model

  getAreaModel (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    let _result = {};
    switch (type) {
      case this.MODEL.TYPE.LOGIN:
        // LOGIN
        _result = {
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
          },
          auto_login: this.MODEL.STATUS.AUTO
        };
        break;
      case this.MODEL.TYPE.SETTING:
        // SETTING
        _result = {
          themes: this.MODEL.THEME_LIST['themesByName'],
          theme: this.MODEL.THEME,
          ownerPublic: this.MODEL.OWNER_PUBLIC,
          clipMode: this.MODEL.CLIP_MODE
        };
        break;
      case this.MODEL.TYPE.INFO:
        // INFO
        _result = {
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
        break;
      case this.MODEL.TYPE.LOGOUT:
        // LOGOUT
        _result = {
          username: this.MODEL.USERNAME
        };
        break;
      case this.MODEL.TYPE.REGISTER:
        // REGISTER
        _result = {
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
        break;
      default:
        Log.error(arguments, 'unknown type X(')();
        return this.MODEL.ERROR;
    }
    return _result;
  }

  updateHash (
    type = null,
    timing = null
  ) {
    if (type == null || timing == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
        this.MODEL.HASH.USER = SHA256.getHash(this.MODEL.USERNAME + new Date().toString());
        this.MODEL.HASH.CRYPTO = SHA256.getHash(this.MODEL.HASH.USER + this.MODEL.PASSWORD);
        this.MODEL.HASH.DECRYPT_CRYPTO = SHA256.getHash(this.MODEL.PASSWORD + this.MODEL.HASH.USER);
        this.MODEL.ENCRYPT.CRYPTO = Crypto.encrypt(
          this.MODEL.HASH.CRYPTO,
          this.MODEL.HASH.DECRYPT_CRYPTO
        );
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
      }

    } else if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      if (timing == this.MODEL.TIMING.BEFORE) {
        // BEFORE
        if (!this.MODEL.STATUS.LS_LOAD || !this.MODEL.STATUS.AUTO || this.MODEL.PASSWORD.length > 0) {
          this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
        }
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
        if (!this.MODEL.STATUS.LS_LOAD || !this.MODEL.STATUS.AUTO || this.MODEL.PASSWORD.length > 0) {
          this.MODEL.HASH.DECRYPT_CRYPTO = SHA256.getHash(this.MODEL.PASSWORD + this.MODEL.HASH.USER);
          this.MODEL.HASH.CRYPTO = Crypto.decrypt(
            this.MODEL.ENCRYPT.CRYPTO,
            this.MODEL.HASH.DECRYPT_CRYPTO
          );
        }
        this.MODEL.HASH.GRAVATAR = MD5.getHash(this.MODEL.EMAIL.mini());
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
          this.MODEL.HASH.DECRYPT_CRYPTO = SHA256.getHash(this.MODEL.PASSWORD_NEW + this.MODEL.HASH.USER);
          this.MODEL.ENCRYPT.CRYPTO = Crypto.encrypt(
            this.MODEL.HASH.CRYPTO,
            this.MODEL.HASH.DECRYPT_CRYPTO
          );
        }
      } else if (timing == this.MODEL.TIMING.AFTER) {
        // AFTER
        this.MODEL.HASH.PASSWORD = SHA256.getHash(this.MODEL.PASSWORD);
        this.MODEL.HASH.DECRYPT_CRYPTO = SHA256.getHash(this.MODEL.PASSWORD + this.MODEL.HASH.USER);
        this.MODEL.HASH.CRYPTO = Crypto.decrypt(
          this.MODEL.ENCRYPT.CRYPTO,
          this.MODEL.HASH.DECRYPT_CRYPTO
        );
        this.MODEL.HASH.GRAVATAR = MD5.getHash(this.MODEL.EMAIL.mini());
      }
    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING

    } else {
      Log.error(arguments, 'unknown type.')();
      return this.MODEL.ERROR;
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

  applyReceiveModel (
    type = null
  ) {
    super.log(type.capitalize(), 'Apply')();
    if (type == null) {
      Log.error(arguments);
      return this.MODEL.ERROR;
    }
    if (type != this.getAjaxData({ key: 'type' })) {
      Log.error(arguments, 'type mismatch')();
      return this.MODEL.ERROR;
    }

    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER

    } else if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      this.MODEL.HASH.USER = this.getAjaxData({ key: 'hash' });
      this.MODEL.USERNAME = this.getAjaxData({ key: 'username' });
      this.MODEL.ENCRYPT.CRYPTO = this.getAjaxData({ key: 'encrypted_crypto_hash' });
      this.MODEL.EMAIL_AUTH = this.getAjaxData({ key: 'email_authentication' });
      this.MODEL.THEME = this.getAjaxData({ key: 'theme' });
      this.MODEL.OWNER_PUBLIC = this.getAjaxData({ key: 'default_owner_public' });
      this.MODEL.CLIP_MODE = this.getAjaxData({ key: 'default_clip_mode' });
      this.MODEL.CREATED_AT = this.getAjaxData({ key: 'created_at' });
      this.MODEL.UPDATED_AT = this.getAjaxData({ key: 'updated_at' });

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      // LOGOUT
      this.clearModel();

    } else if (type == this.MODEL.TYPE.LEAVE) {
      // LEAVE
      this.clearModel();

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      this.MODEL.USERNAME = this.getAjaxData({ key: 'username' });
      this.MODEL.EMAIL = this.getAjaxData({ key: 'email_address' });
      this.MODEL.ENCRYPT.CRYPTO = this.getAjaxData({ key: 'encrypted_crypto_hash' });
      this.MODEL.UPDATED_AT = this.getAjaxData({ key: 'updated_at' });
      if (this.MODEL.PASSWORD_NEW.length > 0) {
        this.MODEL.PASSWORD = this.MODEL.PASSWORD_NEW;
        this.MODEL.PASSWORD_NEW = '';
      }

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING
      this.MODEL.THEME = this.getAjaxData({ key: 'theme' });
      this.MODEL.OWNER_PUBLIC = this.getAjaxData({ key: 'default_owner_public' });
      this.MODEL.CLIP_MODE = this.getAjaxData({ key: 'default_clip_mode' });
      this.MODEL.UPDATED_AT = this.getAjaxData({ key: 'updated_at' });

    } else {
      Log.error(arguments, 'unknown type.');
      return this.MODEL.ERROR;
    }
  }

  clearModel () {
    this.MODEL.USERNAME = '';
    this.MODEL.EMAIL = '';
    this.MODEL.PASSWORD = '';
    this.MODEL.EMAIL_AUTH = false;
    this.MODEL.CREATED_AT = new Date().formatString();
    this.MODEL.UPDATED_AT = new Date().formatString();
    this.MODEL.HASH = {};
  }

  getSendModel (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    let _model = {};
    if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      _model['hash'] = this.MODEL.HASH.USER;
      _model['username'] = this.MODEL.USERNAME;
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;
      _model['encrypted_crypto_hash'] = this.MODEL.ENCRYPT.CRYPTO;

    } else if (type == this.MODEL.TYPE.LOGIN) {
      // LOGIN
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;

    } else if (type == this.MODEL.TYPE.LOGOUT) {
      // LOGOUT
      _model['hash'] = this.MODEL.HASH.USER;

    } else if (type == this.MODEL.TYPE.LEAVE) {
      // LEAVE
      _model['hash'] = this.MODEL.HASH.USER;
      _model['username'] = this.MODEL.USERNAME;
      _model['email_address'] = this.MODEL.EMAIL;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      _model['hash'] = this.MODEL.HASH.USER;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;
      _model['username'] = this.MODEL.USERNAME_NEW;
      _model['email_address'] = this.MODEL.EMAIL_NEW;
      if (this.MODEL.HASH.PASSWORD_NEW != '') {
        _model['password_hash_new'] = this.MODEL.HASH.PASSWORD_NEW;
      }
      _model['encrypted_crypto_hash'] = this.MODEL.ENCRYPT.CRYPTO;

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING
      _model['hash'] = this.MODEL.HASH.USER;
      _model['password_hash'] = this.MODEL.HASH.PASSWORD;
      _model['theme'] = this.MODEL.THEME;
      _model['default_owner_public'] = this.MODEL.OWNER_PUBLIC;
      _model['default_clip_mode'] = this.MODEL.CLIP_MODE;

    } else {
      Log.error(arguments, 'unknown type.')();
      return this.MODEL.ERROR;
    }

    return _model;
  }
}
