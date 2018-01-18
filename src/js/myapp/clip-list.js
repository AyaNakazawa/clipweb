
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class ClipListModel extends ClipwebModel {
  constructor (
    initSetting = {
      NAME: 'clipweb List Object'
    }
  ) {
    super(initSetting);

    // ----------------------------------------------------------------
    // エラーコード

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'cliplist';

    // ----------------------------------------------------------------
    // ステータス
    this.STATUS.GET = false;

    // ----------------------------------------------------------------
    // LocalStorageキー
    this.LS.SEARCH = 'cl.search';

    // ----------------------------------------------------------------
    // 情報

    // 検索文字列
    this.SEARCH = '';

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.SEARCH = '#list-search-template';
    this.TEMPLATE.CLIP = '#list-clip-template';

    // ----------------------------------------------------------------
    // オフセット
    this.COMMON.OFFSET = -8;

    // ----------------------------------------------------------------
    // セレクタ

    // エリア
    this.SELECTOR.AREA = '#clip-list-area';

    // 検索
    this.SELECTOR.SEARCH = {};
    this.SELECTOR.SEARCH.NEW = '#search-new';
    this.SELECTOR.SEARCH.SEARCH = '#search-search';
    this.SELECTOR.SEARCH.ORDER_NAME = '#search-order-name';
    this.SELECTOR.SEARCH.ORDER_TYPE = '#search-order-type';
    this.SELECTOR.SEARCH.ORDER_UPDATE = '#search-order-update';
    this.SELECTOR.SEARCH.CLIPS = '#search-clips';

    // クリップ
    this.SELECTOR.CLIP = {};
    this.SELECTOR.CLIP.NAME = '#clip-name';
    this.SELECTOR.CLIP.TYPE = '#clip-type';
    this.SELECTOR.CLIP.EDIT = '#clip-edit';
    this.SELECTOR.CLIP.DELETE = '#clip-delete';
    this.SELECTOR.CLIP.SHARE = '#clip-share';
    this.SELECTOR.CLIP.SETTING = '#clip-setting';

  }
}

// ----------------------------------------------------------------
// View

class ClipListView extends ClipwebView {
  constructor (
    initSetting = {
      NAME: 'clipweb List View'
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
      header = LN.get('header_login');
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
        },
        auto_login: this.MODEL.STATUS.AUTO
      };

    } else if (type == this.MODEL.TYPE.SETTING) {
      // SETTING
      header = LN.get('header_setting');
      _mainTemplate = this.MODEL.TEMPLATE.SETTING;
      _mainModel = {
        theme: this.MODEL.THEME,
        ownerPublish: this.MODEL.OWNER_PUBLISH,
        clipMode: this.MODEL.CLIP_MODE
      };

    } else if (type == this.MODEL.TYPE.INFO) {
      // INFO
      header = LN.get('header_info');
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
      header = LN.get('header_logout');
      _mainTemplate = this.MODEL.TEMPLATE.LOGOUT;
      _mainModel = {
        username: this.MODEL.USERNAME
      };

    } else if (type == this.MODEL.TYPE.REGISTER) {
      // REGISTER
      header = LN.get('header_register');
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
    super.append(
      Content.getHeader(header, headerButton, null, 290)
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
      super.append(
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

class ClipListEvent extends ClipwebEvent {
  constructor (
    initSetting = {
      NAME: 'clipweb List Event'
    }
  ) {
    super(initSetting);
  }

  setEvent () {
    this.setHide();
    this.setSearch();
  }

  // ----------------------------------------------------------------
  // hide

  setHide () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} .content-header-button`,
      func: () => {
        this.trigger({ trigger: this.MODEL.TRIGGER.VIEW.HIDE });
      }
    });
  }

  // ----------------------------------------------------------------
  // type

  setSearch () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.REGISTER.SUBMIT}`,
      func: () => {
        super.log('Register', 'Submit')();
        this.CONTROLLER.submitRegister();
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class ClipListController extends ClipwebController {
  constructor (
    model = {},
    initSetting = {
      NAME: 'clipweb List Controller',
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
    // データを取得
    if (LocalStorage.getItem(this.MODEL.LS.SEARCH) != null) {
      // 前回の検索文字列
      this.MODEL.SEARCH = LocalStorage.getItem(this.MODEL.LS.SEARCH);
    }
  }

  // ----------------------------------------------------------------
  // ajax

  loadClipList () {
    const _TYPE = this.MODEL.TYPE.SEARCH;
    this.MODEL.STATUS.GET = false;

    this.EVENT.setOnLoading({
      type: _TYPE,
      successFunction: () => {
        if (typeof this.getAjaxData({ key: 'result' }) == 'undefined') {
          // resultが取得できない
          this.open({
            type: _TYPE,
            model: {
              alertMessage:
                View.element({ element: 'h5', content: LN.get('server_not_working') }) +
                View.element({ element: 'hr' }) +
                View.element({ content: LN.get('failed_to_get_clip_list') }),
              alertType: View.ALERT_DANGER
            }
          });
        } else {
          if (this.getAjaxData({ key: 'result' }) == false) {
            // 新規登録できていない(clipweb user error)
            if (typeof this.getAjaxData({ key: 'error' })[`${Project.NAME} ${this.MODEL.KEY} error`] != 'undefined') {
              const _ERROR = this.getAjaxData({ key: 'error' })[`${Project.NAME} ${this.MODEL.KEY} error`];
              let message = this.MODEL.getMessage(_ERROR['code'], _ERROR['message'], true);
              this.open({
                type: _TYPE,
                model: {
                  alertMessage:
                    View.element({ element: 'h5', content: LN.get('failed_to_get_clip_list') }) +
                    View.element({ element: 'hr' }) +
                    View.element({ content: LN.get('clipweb_user_error_code', {
                      project: Project.NAME,
                      code: _ERROR['code']
                    }) }) +
                    View.element({ content: LN.get('clipweb_user_error_message', { message: message }) }),
                  alertType: View.ALERT_WARNING
                }
              });
            }
          } else {
            if (typeof this.getAjaxData({ key: 'clip_list' })['flex sqlite3 error'] != 'undefined') {
              // Flex SQLite3 エラー
              const _ERROR = this.getAjaxData({ key: 'clip_list' })['flex sqlite3 error'];
              this.open({
                type: _TYPE,
                model: {
                  alertMessage:
                    View.element({ element: 'h5', content: LN.get('failed_to_get_clip_list') }) +
                    View.element({ element: 'hr' }) +
                    View.element({ content: LN.get('flex_sqlite3_error_code', { code: _ERROR['code'] }) }) +
                    View.element({ content: LN.get('flex_sqlite3_error_mode', { mode: _ERROR['mode'] }) }) +
                    View.element({ content: LN.get('flex_sqlite3_error_message', { message: _ERROR['message'] }) }),
                  alertType: View.ALERT_WARNING
                }
              });
            } else {
              // 取得成功
              this.MODEL.STATUS.GET = true;
              this.CONTROLLER.applyModel(_TYPE);
              this.open({
                type: _TYPE,
                model: {
                  alertMessage:
                    View.element({ content: LN.get('clip_list_got') })
                },
              });
            }
          }
        }
      },
      errorOpenType: _TYPE,
      errorModel: {
        alertMessage: (
          View.element({ element: 'h5', content: LN.get('failed_connect_to_server') }) +
          View.element({ element: 'hr' }) +
          View.element({ content: LN.get('failed_to_get_clip_list') })
        ),
        alertType: View.ALERT_DANGER
      }
    });

    // Post
    this.updateHash(_TYPE, this.MODEL.TIMING.BEFORE);
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
  }

  // ----------------------------------------------------------------
  // update

  applyModel (
    type = null
  ) {
    super.log(type.capitalize(), 'Apply')();
    if (type == null) {
      Log.error(arguments);
      return;
    }
    if (type != this.getAjaxData({ key: 'type' })) {
      Log.error(arguments, 'type mismatch')();
      return;
    }

    switch (type) {
      case this.MODEL.TYPE.SEARCH:
        // SEARCH
        break;

      default:
        Log.error(arguments, 'unknown type.')();
        return;
    }
  }

  clearModel () {
  }

  getSendModel (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return;
    }
    let _model = {};
    _model['hash'] = this.MODEL.HASH.USER;
    _model['password_hash'] = this.MODEL.HASH.PASSWORD;
    switch (type) {
      case this.MODEL.TYPE.NEW:
        // NEW
        break;

      case this.MODEL.TYPE.SAVE:
        // SAVE
        break;

      case this.MODEL.TYPE.DELETE:
        // DELETE
        break;

      default:
        Log.error(arguments, 'unknown type.')();
        return;
    }
    return _model;
  }
}
