
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
    this.OWNER_PUBLIC = '';
    this.CLIP_MODE = '';
    this.CREATED_AT = '';
    this.UPDATED_AT = '';

    this.DL_CLIP = null;

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.NEW = '#clip-new-template';
    this.TEMPLATE.SETTING = '#clip-setting-template';
    this.TEMPLATE.SETTING_USER = '#clip-setting-user-template';

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
    this.SELECTOR.NEW.TAGS = '#clip-new-tags';
    this.SELECTOR.NEW.OWNER_PUBLIC = '#clip-new-owner-public';
    this.SELECTOR.NEW.CLIP_MODE = '#clip-new-clip-mode';
    this.SELECTOR.NEW.CLOSE = '#clip-new-close';
    this.SELECTOR.NEW.CREATE = '#clip-new-create';

    // 設定
    this.SELECTOR.SETTING = {};
    this.SELECTOR.SETTING.FILENAME = '#clip-setting-filename';
    this.SELECTOR.SETTING.FILETYPE = '#clip-setting-filetype';
    this.SELECTOR.SETTING.TAGS = '#clip-setting-tags';
    this.SELECTOR.SETTING.OWNER_PUBLIC = '#clip-setting-owner-public';
    this.SELECTOR.SETTING.CLIP_MODE = '#clip-setting-clip-mode';
    this.SELECTOR.SETTING.USERS = '#clip-setting-users';
    this.SELECTOR.SETTING.EDIT = '#clip-setting-edit';
    this.SELECTOR.SETTING.DELETE = '#clip-setting-delete';
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
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.NEW.CLOSE}`,
      func: () => {
        super.log('Clip', 'Close')();
        this.VIEW.hide();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.NEW.CREATE}`,
      func: () => {
        super.log('Clip', 'New')();
        this.CONTROLLER.createNew();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.NEW.FILENAME}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateFile({
          name: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.NEW.FILENAME}`,
          type: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.NEW.FILETYPE}`
        });
      }
    });

    super.setValidate(
      this.MODEL.SELECTOR.NEW.FILENAME
    );
  }

  setOnSetting () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.EDIT}`,
      func: () => {
        super.log('Clip', 'Edit')();
        this.CONTROLLER.edit();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.DELETE}`,
      func: () => {
        super.log('Clip', 'Delete')();
        this.CONTROLLER.delete();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.SAVE}`,
      func: () => {
        super.log('Clip', 'Save')();
        this.CONTROLLER.connectSetting();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.FILENAME}`,
      trigger: 'keyup',
      func: () => {
        this.CONTROLLER.updateFile({
          name: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.FILENAME}`,
          type: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.FILETYPE}`
        });
      }
    });

    super.setValidate(
      this.MODEL.SELECTOR.SETTING.FILENAME
    );
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
    const _FAILED = 'failed_to_create_new_clip';

    const _NEW_NAME = this.MODEL.SELECTOR.NEW.FILENAME;
    const _NEW_TYPE = this.MODEL.SELECTOR.NEW.FILETYPE;
    const _NEW_TAGS = this.MODEL.SELECTOR.NEW.TAGS;
    const _NEW_OWNER_PUBLIC = this.MODEL.SELECTOR.NEW.OWNER_PUBLIC;
    const _NEW_CLIP_MODE = this.MODEL.SELECTOR.NEW.CLIP_MODE;

    if (
      $(_NEW_NAME)[0].validity.valid &&
      $(_NEW_TYPE)[0].validity.valid &&
      $(_NEW_TAGS)[0].validity.valid &&
      $(_NEW_OWNER_PUBLIC)[0].validity.valid &&
      $(_NEW_CLIP_MODE)[0].validity.valid
    ) {
      this.MODEL.FILENAME = $(_NEW_NAME).val();
      this.MODEL.FILETYPE = $(`${_NEW_TYPE} option:selected`).val();
      this.MODEL.TAGS = $(_NEW_TAGS).val();
      this.MODEL.OWNER_PUBLIC = $(`${_NEW_OWNER_PUBLIC} option:selected`).val();
      this.MODEL.CLIP_MODE = $(`${_NEW_CLIP_MODE} option:selected`).val();

      this.EVENT.setOnLoading({
        type: _TYPE,
        successFunction: () => {
          if (typeof this.getAjaxData({ key: 'result' }) == 'undefined') {
            // resultが取得できない
            this.open({
              type: _TYPE,
              model: super.getErrorModel('result', _FAILED)
            });
          } else {
            if (this.getAjaxData({ key: 'result' }) == false) {
              // 新規作成できていない
              if (typeof this.getAjaxData({ key: 'error' })[`${Project.NAME} ${this.MODEL.KEY} error`] != 'undefined') {
                const _ERROR = this.getAjaxData({ key: 'error' })[`${Project.NAME} ${this.MODEL.KEY} error`];
                this.open({
                  type: _TYPE,
                  model: super.getErrorModel('clipweb', _FAILED, _ERROR)
                });
              }
            } else {
              if (typeof this.getAjaxData({ key: 'hash' }) == 'undefined') {
                // 未知のエラー
                this.open({
                  type: _TYPE,
                  model: super.getErrorModel('result', _FAILED)
                });
              } else {
                if (typeof this.getAjaxData({ key: 'hash' })['flex sqlite3 error'] != 'undefined') {
                  // Flex SQLite3 エラー
                  const _ERROR = this.getAjaxData({ key: 'hash' })['flex sqlite3 error'];
                  this.open({
                    type: _TYPE,
                    model: super.getErrorModel('fsql', _FAILED, _ERROR)
                  });
                } else {
                  // 取得成功
                  LIST.loadList();
                  this.open({
                    type: this.MODEL.TYPE.SETTING,
                    model: {
                      alertMessage:
                        View.element({ content: LN.get('created_new_clip') })
                    }
                  });
                }
              }
            }
          }
        },
        errorOpenType: _TYPE,
        errorModel: super.getErrorModel('server', _FAILED)
      });

      // Post
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

  connectSetting (type = this.MODEL.TYPE.SETTING, hash = null) {
    if (type == null) {
      Log.error(arguments)();
      return;
    }
    const _TYPE = this.MODEL.TYPE.SETTING;
    const _FAILED = `failed_to_${type.toLowerCase()}_clip_setting`;
    let _success_message = null;
    if (type == this.MODEL.TYPE.LOAD) {
      if (hash == null) {
        Log.error(arguments)();
        return;
      }
      this.MODEL.HASH = hash;
    } else {
      _success_message = View.element({ content: LN.get('updated_clip_setting') });
    }

    this.EVENT.setOnLoading({
      type: _TYPE,
      successFunction: () => {
        if (typeof this.getAjaxData({ key: 'result' }) == 'undefined') {
          // resultが取得できない
          this.open({
            type: _TYPE,
            model: super.getErrorModel('result', _FAILED)
          });
        } else {
          if (this.getAjaxData({ key: 'result' }) == false) {
            // Resultエラー
            if (typeof this.getAjaxData({ key: 'error' })[`${Project.NAME} ${this.MODEL.KEY} error`] != 'undefined') {
              const _ERROR = this.getAjaxData({ key: 'error' })[`${Project.NAME} ${this.MODEL.KEY} error`];
              this.open({
                type: _TYPE,
                model: super.getErrorModel('clipweb', _FAILED, _ERROR)
              });
            }
          } else {
            if (typeof this.getAjaxData({ key: 'clip' }) == 'undefined') {
              // 未知のエラー
              this.open({
                type: _TYPE,
                model: super.getErrorModel('result', _FAILED)
              });
            } else {
              if (typeof this.getAjaxData({ key: 'clip' })['flex sqlite3 error'] != 'undefined') {
                // Flex SQLite3 エラー
                const _ERROR = this.getAjaxData({ key: 'clip' })['flex sqlite3 error'];
                this.open({
                  type: _TYPE,
                  model: super.getErrorModel('fsql', _FAILED, _ERROR)
                });
              } else {
                // 取得成功
                if (type == this.MODEL.TYPE.SETTING) {
                  LIST.loadClip();
                }
                this.applyReceiveModel(type);
                this.VIEW.move({
                  target: LIST.MODEL.SELECTOR.AREA,
                  mode: this.MODEL.COMMON.TYPE.AFTER
                });
                this.open({
                  type: this.MODEL.TYPE.SETTING,
                  model: {
                    alertMessage: _success_message
                  }
                });
              }
            }
          }
        }
      },
      errorOpenType: _TYPE,
      errorModel: super.getErrorModel('server', _FAILED)
    });

    // Post
    this.post({
      type: type,
      data: this.getSendModel(type)
    });
  }

  deleteClip (hash = null) {
    if (hash == null) {
      Log.error(arguments)();
      return;
    }
    Log.info(arguments)();

  }

  editClip (hash = null) {
    if (hash == null) {
      Log.error(arguments)();
      return;
    }
    Log.info(arguments)();

  }

  // ----------------------------------------------------------------
  // clip

  edit (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return;
    }
    super.log(hash.substr(0, 14), 'edit', Log.ARROW_INPUT)();
    this.editClip(hash);
  }

  delete (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return;
    }
    super.log(hash.substr(0, 14), 'delete', Log.ARROW_INPUT)();
  }

  // ----------------------------------------------------------------
  // file

  updateFile ({
    name = null,
    type = null
  } = {}) {
    if (name == null || type == null) {
      Log.error(arguments)();
      return;
    }
    const _FILENAME = $(name).val();
    const _FILETYPE = File.getExtension(_FILENAME);
    const _TYPES = FileTypes.getExtensions();
    if (typeof _TYPES[_FILETYPE] != 'undefined') {
      $(type).val(_TYPES[_FILETYPE]);
    }
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
          filetypes: this.MODEL.FILETYPES,
          defaultOwnerPublic: USER.MODEL.OWNER_PUBLIC,
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
          filetypes: this.MODEL.FILETYPES,
          filename: this.MODEL.FILENAME,
          filetype: this.MODEL.FILETYPE,
          tags: this.MODEL.TAGS,
          ownerPublic: this.MODEL.OWNER_PUBLIC,
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

  applyReceiveModel (
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
        this.MODEL.HASH = this.getAjaxData({ key: 'hash' });
        break;

      case this.MODEL.TYPE.LOAD:
      case this.MODEL.TYPE.SETTING:
        // SETTING
        this.MODEL.CLIP = this.getAjaxData({ key: 'clip' });
        this.MODEL.HASH = this.MODEL.CLIP['hash'];
        this.MODEL.FILENAME = this.MODEL.CLIP['name'];
        this.MODEL.FILETYPE = this.MODEL.CLIP['type'];
        this.MODEL.TAGS = this.MODEL.CLIP['tags'];
        this.MODEL.OWNER_HASH = this.MODEL.CLIP['owner_hash'];
        this.MODEL.OWNER_PUBLIC = this.MODEL.CLIP['owner_public'];
        this.MODEL.CLIP_MODE = this.MODEL.CLIP['clip_mode'];
        this.MODEL.CREATED_AT = this.MODEL.CLIP['created_at'];
        this.MODEL.UPDATED_AT = this.MODEL.CLIP['updated_at'];
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
    _model['owner_hash'] = USER.MODEL.HASH.USER;
    _model['password_hash'] = USER.MODEL.HASH.PASSWORD;
    switch (type) {
      case this.MODEL.TYPE.NEW:
        // NEW
        _model['hash'] = Random.hex();
        _model['filename'] = this.MODEL.FILENAME;
        _model['filetype'] = this.MODEL.FILETYPE;
        _model['tags'] = this.MODEL.TAGS;
        _model['owner_public'] = this.MODEL.OWNER_PUBLIC;
        _model['clip_mode'] = this.MODEL.CLIP_MODE;
        break;

      case this.MODEL.TYPE.LOAD:
        // LOAD
        _model['hash'] = this.MODEL.HASH;
        break;

      case this.MODEL.TYPE.SETTING:
        // SETTING
        _model['hash'] = this.MODEL.HASH;
        _model['filename'] = this.MODEL.FILENAME;
        _model['filetype'] = this.MODEL.FILETYPE;
        _model['tags'] = this.MODEL.TAGS;
        _model['owner_public'] = this.MODEL.OWNER_PUBLIC;
        _model['clip_mode'] = this.MODEL.CLIP_MODE;
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return;
    }
    return _model;
  }
}
