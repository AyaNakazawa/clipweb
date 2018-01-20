
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class ListModel extends ClipwebModel {
  constructor (
    initSetting = {
      NAME: 'List Object'
    }
  ) {
    super(initSetting);

    // ----------------------------------------------------------------
    // エラーコード

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'list';

    // ----------------------------------------------------------------
    // ステータス
    this.STATUS.GET = false;

    // ----------------------------------------------------------------
    // LocalStorageキー
    this.LS.SEARCH = 'list.search';
    this.LS.GROUP = 'list.group';
    this.LS.SORT = 'list.sort';
    this.LS.ORDER = 'list.order';

    // ----------------------------------------------------------------
    // 情報

    // 検索文字列
    this.SEARCH = '';
    this.GROUP = 'type';
    this.SORT = 'name';
    this.ORDER = 'asc';

    // クリップ
    this.DL_CLIPS = null;
    this.CLIPS = null;

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
    this.SELECTOR.AREA = '#list-area';

    // 検索
    this.SELECTOR.SEARCH = {};
    this.SELECTOR.SEARCH.NEW = '#list-search-new';
    this.SELECTOR.SEARCH.SEARCH = '#list-search-search';
    this.SELECTOR.SEARCH.GROUP = '#list-search-group';
    this.SELECTOR.SEARCH.SORT = '#list-search-sort';
    this.SELECTOR.SEARCH.SORT_ASC = '#list-search-sort-asc';
    this.SELECTOR.SEARCH.SORT_DESC = '#list-search-sort-desc';
    this.SELECTOR.SEARCH.CLIPS = '#list-search-clips';

    // クリップ
    this.SELECTOR.CLIP = {};
    this.SELECTOR.CLIP.EDIT = '#list-clip-edit';
    this.SELECTOR.CLIP.DELETE = '#list-clip-delete';
    this.SELECTOR.CLIP.SHARE = '#list-clip-share';
    this.SELECTOR.CLIP.SETTING = '#list-clip-setting';
  }
}

// ----------------------------------------------------------------
// View

class ListView extends ClipwebView {
  constructor (
    initSetting = {
      NAME: 'List View'
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
    super.log()();
    Log.log('Generating...', Log.ALIGN_CENTER)();

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
    switch (type) {
      case this.MODEL.TYPE.SEARCH:
        // SEARCH
        header = LN.get('header_clip_list');
        _mainTemplate = this.MODEL.TEMPLATE.SEARCH;
        _mainModel = {
          search: this.MODEL.SEARCH,
          group: this.MODEL.GROUP,
          sort: this.MODEL.SORT,
          order: this.MODEL.ORDER
        };
        break;
    }

    // Clear
    this.clear();

    // Generate
    if (type != null) {
      super.log(type.capitalize(), 'Generate')();
    }

    // Generate Header
    if (header != null) {
      super.generateHeader({
        header: header,
        icon: headerButton,
        tabindex: 290
      });
    }

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
      super.append({
        template: _mainTemplate,
        model: _mainModel
      });
    }

    // View
    this.setView({ view: view, scroll: true });

    Log.log('Generated !', Log.ALIGN_CENTER)();
    super.log()();
  }
}

// ----------------------------------------------------------------
// Event

class ListEvent extends ClipwebEvent {
  constructor (
    initSetting = {
      NAME: 'List Event'
    }
  ) {
    super(initSetting);
  }

  setEvent () {
    this.setOnHide();
    this.setOnSearch();
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

  setOnSearch () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.NEW}`,
      func: () => {
        super.log('Search', 'New')();
        this.CONTROLLER.submitNew();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.ORDER_NAME}`,
      func: () => {
        super.log('Search', 'Order Name')();
        this.CONTROLLER.order({ type: this.MODEL.TYPE.NAME });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.ORDER_TYPE}`,
      func: () => {
        super.log('Search', 'Order Type')();
        this.CONTROLLER.order({ type: this.MODEL.TYPE.TYPE });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.ORDER_UPDATE}`,
      func: () => {
        super.log('Search', 'Order Update')();
        this.CONTROLLER.order({ type: this.MODEL.TYPE.UPDATE });
      }
    });
  }

  setOnClip (
    hash = null
  ) {
    if (hash == null) {
      Log.error(arguments, 'need hash of argument')();
      return;
    }
    const _SELECTOR = `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.CLIPS} ${hash}`;
    super.setOn({
      selector: `${_SELECTOR} ${this.MODEL.SELECTOR.CLIP.EDIT}`,
      func: () => {
        super.log(`clip ${hash}`, 'Edit')();
        this.CONTROLLER.edit({ hash: hash });
      }
    });
    super.setOn({
      selector: `${_SELECTOR} ${this.MODEL.SELECTOR.CLIP.DELETE}`,
      func: () => {
        super.log(`clip ${hash}`, 'Delete')();
        this.CONTROLLER.delete({ hash: hash });
      }
    });
    super.setOn({
      selector: `${_SELECTOR} ${this.MODEL.SELECTOR.CLIP.SHARE}`,
      func: () => {
        super.log(`clip ${hash}`, 'Share')();
        this.CONTROLLER.share({ hash: hash });
      }
    });
    super.setOn({
      selector: `${_SELECTOR} ${this.MODEL.SELECTOR.CLIP.SETTING}`,
      func: () => {
        super.log(`clip ${hash}`, 'Setting')();
        this.CONTROLLER.setting({ hash: hash });
      }
    });
  }

  setOffClip (
    hash = null
  ) {
    if (hash == null) {
      Log.error(arguments, 'need hash of argument')();
      return;
    }
    const _SELECTOR = `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.CLIPS} ${hash}`;
    super.setOff({
      selector: `${_SELECTOR} ${this.MODEL.SELECTOR.CLIP.EDIT}`
    });
    super.setOff({
      selector: `${_SELECTOR} ${this.MODEL.SELECTOR.CLIP.DELETE}`
    });
    super.setOff({
      selector: `${_SELECTOR} ${this.MODEL.SELECTOR.CLIP.SHARE}`
    });
    super.setOff({
      selector: `${_SELECTOR} ${this.MODEL.SELECTOR.CLIP.SETTING}`
    });
  }
}

// ----------------------------------------------------------------
// Controller

class ListController extends ClipwebController {
  constructor (
    model = {},
    initSetting = {
      NAME: 'List Controller',
      MODEL: new ListModel(),
      VIEW: new ListView(),
      EVENT: new ListEvent()
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

  loadList () {
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
        this.MODEL.CLIPS = this.getAjaxData({ key: 'clip_list' });
        break;

      default:
        Log.error(arguments, 'unknown type.')();
        return;
    }
  }

  clearModel () {
    this.MODEL.CLIPS = null;
  }

  getSendModel (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return;
    }
    let _model = {};
    _model['hash'] = USER.MODEL.HASH.USER;
    _model['password_hash'] = USER.MODEL.HASH.PASSWORD;
    switch (type) {
      case this.MODEL.TYPE.SEARCH:
        // SEARCH
        break;

      default:
        Log.error(arguments, 'unknown type.')();
        return;
    }
    return _model;
  }
}
