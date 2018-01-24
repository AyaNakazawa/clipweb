
// ----------------------------------------------------------------
// Clip Class

// ----------------------------------------------------------------
// Model

class ClipModel extends ClipwebModel {
  constructor (
    initSetting = {
      NAME: 'Clip Object'
    }
  ) {
    super(initSetting);

    // ----------------------------------------------------------------
    // エラーコード

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'clip';

    // ----------------------------------------------------------------
    // LocalStorageキー

    // ----------------------------------------------------------------
    // 情報

    // クリップ
    this.HASH = '';
    this.FILENAME = '';
    this.FILETYPE = '';
    this.DATA = '';
    this.TAG_IDS = '';
    this.OWNER_HASH = '';
    this.OWNER_PUBLISH = '';
    this.CLIP_MODE = '';
    this.CREATED_AT = '';
    this.UPDATED_AT = '';

    this.DL_CLIP = null;

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.NEW = '#clip-new-template';
    this.TEMPLATE.SETTING = '#clip-setting-template';
    this.TEMPLATE.SETTING = '#clip-user-template';

    // ----------------------------------------------------------------
    // オフセット
    this.COMMON.OFFSET = -8;

    // ----------------------------------------------------------------
    // セレクタ

    // エリア
    this.SELECTOR.AREA = '#clip-area';

    // 新規作成
    this.SELECTOR.NEW = {};
    this.SELECTOR.NEW.FILENAME = '#clip-new-filename';
    this.SELECTOR.NEW.FILETYPE = '#clip-new-filetype';
    this.SELECTOR.NEW.ONWER_PUBLISH = '#clip-new-onwer-publish';
    this.SELECTOR.NEW.CLIP_MODE = '#clip-new-clip-mode';
    this.SELECTOR.NEW.CLOSE = '#clip-new-close';
    this.SELECTOR.NEW.CREATE = '#clip-new-create';

    // 設定
    this.SELECTOR.SETTING = {};
    this.SELECTOR.SETTING.EDIT = '#clip-setting-edit';
    this.SELECTOR.SETTING.DELETE = '#clip-setting-delete';
    this.SELECTOR.SETTING.NAME = '#clip-setting-name';
    this.SELECTOR.SETTING.TYPE = '#clip-setting-type';
    this.SELECTOR.SETTING.ONWER_PUBLISH = '#clip-setting-onwer-publish';
    this.SELECTOR.SETTING.CLIP_MODE = '#clip-setting-clip-mode';
    this.SELECTOR.SETTING.USERS = '#clip-setting-users';
    this.SELECTOR.SETTING.SAVE = '#clip-setting-save';

    // 権限設定
    this.SELECTOR.USER = {};
    this.SELECTOR.USER.TYPE = '#clip-user-permit';
  }
}

// ----------------------------------------------------------------
// View

class ClipView extends ClipwebView {
  constructor (
    initSetting = {
      NAME: 'Clip View'
    }
  ) {
    super(initSetting);
  }
}

// ----------------------------------------------------------------
// Event

class ClipEvent extends ClipwebEvent {
  constructor (
    initSetting = {
      NAME: 'Clip Event'
    }
  ) {
    super(initSetting);
  }

  setEvent () {
    this.setOnHide();
    this.setOnNew();
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

  setOnNew () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.NEW.CREATE}`,
      func: () => {
        super.log('Clip', 'New')();
        this.CONTROLLER.createNew();
      }
    });
  }

  setOnSetting () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.UPDATE}`,
      func: () => {
        super.log('Clip', 'Update')();
        this.CONTROLLER.updateSetting();
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class ClipController extends ClipwebController {
  constructor (
    model = {},
    initSetting = {
      NAME: 'Clip Controller',
      MODEL: new ClipModel(),
      VIEW: new ClipView(),
      EVENT: new ClipEvent()
    }
  ) {
    super(model, initSetting);
    this.init();
  }

  init () {
    this.EVENT.setEvent();
  }

  // ----------------------------------------------------------------
  // ajax

  createNew () {
    const _TYPE = this.MODEL.TYPE.NEW;

    const _NEW_NAME = this.MODEL.SELECTOR.NEW.FILENAME;
    const _NEW_TYPE = this.MODEL.SELECTOR.NEW.FILETYPE;
    const _NEW_ONWER_PUBLISH = this.MODEL.SELECTOR.NEW.ONWER_PUBLISH;
    const _NEW_CLIP_MODE = this.MODEL.SELECTOR.NEW.CLIP_MODE;

    if (
      $(_NEW_NAME)[0].validity.valid &&
      $(_NEW_TYPE)[0].validity.valid &&
      $(_NEW_ONWER_PUBLISH)[0].validity.valid &&
      $(_NEW_CLIP_MODE)[0].validity.valid
    ) {
      this.MODEL.NEW.NAME = $(_NEW_NAME).val();
      this.MODEL.NEW.TYPE = $(`${_NEW_TYPE} option:selected`).val();
      this.MODEL.NEW.ONWER_PUBLISH = $(`${_NEW_ONWER_PUBLISH} option:selected`).val();
      this.MODEL.NEW.CLIP_MODE = $(`${_NEW_CLIP_MODE} option:selected`).val();

      this.EVENT.setOnLoading({
        type: _TYPE,
        successFunction: () => {
          if (typeof this.getAjaxData({ key: 'result' }) == 'undefined') {
            // resultが取得できない
            this.open({
              type: _TYPE,
              model: super.getErrorModel('result', 'failed_to_create_new_clip')
            });
          } else {
            if (this.getAjaxData({ key: 'result' }) == false) {
              // 新規作成できていない
              if (typeof this.getAjaxData({ key: 'error' })[`${Project.NAME} ${this.MODEL.KEY} error`] != 'undefined') {
                const _ERROR = this.getAjaxData({ key: 'error' })[`${Project.NAME} ${this.MODEL.KEY} error`];
                this.open({
                  type: _TYPE,
                  model: super.getErrorModel('clipweb', 'failed_to_create_new_clip', _ERROR)
                });
              }
            } else {
              if (typeof this.getAjaxData({ key: 'clip_list' })['flex sqlite3 error'] != 'undefined') {
                // Flex SQLite3 エラー
                const _ERROR = this.getAjaxData({ key: 'clip_list' })['flex sqlite3 error'];
                this.open({
                  type: _TYPE,
                  model: super.getErrorModel('fsql', 'failed_to_create_new_clip', _ERROR)
                });
              } else {
                // 取得成功
                LIST.loadClip();
                LIST.grouping();
              }
            }
          }
        },
        errorOpenType: _TYPE,
        errorModel: super.getErrorModel('server', 'failed_to_create_new_clip')
      });

      // Post
      this.post({
        type: _TYPE,
        data: this.getSendModel(_TYPE)
      });
    }
  }

  updateSetting () {

  }

  // ----------------------------------------------------------------
  // model

  getAreaModel (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return;
    }
    let _result = {};
    switch (type) {
      case this.MODEL.TYPE.NEW:
        // NEW
        _result = {
          filetypes: FileTypes.get(),
          defaultOwnerPublish: USER.MODEL.OWNER_PUBLISH,
          defaultClipMode: USER.MODEL.CLIP_MODE,
          length: {
            min: {
              filename: this.MODEL.VALIDATE.LENGTH.MIN_FILENAME
            },
            max: {
              filename: this.MODEL.VALIDATE.LENGTH.MAX_FILENAME
            }
          },
        };
        break;
      case this.MODEL.TYPE.SETTING:
        // SETTING
        _result = {
          filename: this.MODEL.FILENAME,
          filetype: this.MODEL.FILETYPE,
          filetypes: FileTypes.get(),
          ownerPublish: this.MODEL.OWNER_PUBLISH,
          clipMode: this.MODEL.CLIP_MODE,
          length: {
            min: {
              filename: this.MODEL.VALIDATE.LENGTH.MIN_FILENAME
            },
            max: {
              filename: this.MODEL.VALIDATE.LENGTH.MAX_FILENAME
            }
          },
        };
        break;
      default:
        Log.error(arguments, 'unknown type X(')();
        return;
    }
    return _result;
  }

  applyModel (
    type = null
  ) {
    super.log(type.capitalize(), 'Apply')();
    if (type == null) {
      Log.error(arguments);
      return;
    }
    if (type != this.getAjaxData({ key: 'type' })) {
      Log.error(arguments, 'type mismatch X(')();
      return;
    }

    switch (type) {
      case this.MODEL.TYPE.NEW:
        // NEW
        this.MODEL.CLIP = this.getAjaxData({ key: 'clip' });
        break;

      case this.MODEL.TYPE.SETTING:
        // SETTING
        this.MODEL.CLIP = this.getAjaxData({ key: 'clip' });
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return;
    }
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
      case this.MODEL.TYPE.NEW:
        // NEW
        _model['name'] = this.MODEL.NEW.NAME;
        _model['type'] = this.MODEL.NEW.TYPE;
        _model['onwer_publish'] = this.MODEL.NEW.ONWER_PUBLISH;
        _model['clip_mode'] = this.MODEL.NEW.CLIP_MODE;
        break;

      case this.MODEL.TYPE.SETTING:
        // SETTING
        _model['name'] = this.MODEL.SETTING.NAME;
        _model['type'] = this.MODEL.SETTING.TYPE;
        _model['tags'] = this.MODEL.SETTING.TAGS;
        _model['onwer_publish'] = this.MODEL.SETTING.ONWER_PUBLISH;
        _model['clip_mode'] = this.MODEL.SETTING.CLIP_MODE;
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return;
    }
    return _model;
  }
}
