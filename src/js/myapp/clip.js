
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
    this.TEMPLATE.SHARE = '#code-share-template';

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
    this.SELECTOR.SETTING.CLOSE = '#clip-setting-close';
    this.SELECTOR.SETTING.EDIT = '#clip-setting-edit';
    this.SELECTOR.SETTING.SHARE = '#clip-setting-share';
    this.SELECTOR.SETTING.DELETE = '#clip-setting-delete';
    this.SELECTOR.SETTING.SAVE = '#clip-setting-save';

    // 権限設定
    this.SELECTOR.USER = {};
    this.SELECTOR.USER.TYPE = '#clip-user-permit';

    // シェア
    this.SELECTOR.SHARE = {};
    this.SELECTOR.SHARE.LINK = '#code-share-link';
    this.SELECTOR.SHARE.COPY = '#code-share-copy';
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
    this.setOnShare();
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
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.CLOSE}`,
      func: () => {
        super.log('Clip', 'Close')();
        this.VIEW.hide();
        LIST.VIEW.scroll({ selector: `#${this.MODEL.HASH}`, offset: -120 });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.EDIT}`,
      func: () => {
        super.log('Clip', 'Edit')();
        this.CONTROLLER.edit();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.SHARE}`,
      func: () => {
        super.log('Clip', 'Share')();
        this.CONTROLLER.share();
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

  // ----------------------------------------------------------------
  // share

  setOnShare () {
    super.setOn({
      selector: this.MODEL.SELECTOR.SHARE.LINK,
      trigger: 'focus',
      func: () => {
        $(this.MODEL.SELECTOR.SHARE.LINK).select();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.SHARE.COPY,
      func: () => {
        $(this.MODEL.SELECTOR.SHARE.LINK).select();
        document.execCommand('copy');
        this.VIEW.toast({
          message: LN.get('copied_share_link'),
          type: 'success'
        });
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

      this.MODEL.HASH = Random.hex();

      this.EVENT.setLoading({
        type: _TYPE,
        functionSuccess: () => {
          this.checkSuccess({
            errorMessage: _FAILED,
            check: [
              'hash'
            ],
            functionSuccess: () => {
              LIST.loadList();
              CLIP.connectSetting(this.MODEL.TYPE.LOAD);
            }
          });
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

  connectSetting (type = this.MODEL.TYPE.SETTING, hash = this.MODEL.HASH) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    const _TYPE = this.MODEL.TYPE.SETTING;
    const _FAILED = `failed_to_${type.toLowerCase()}_clip_setting`;
    let _success_message = null;
    if (type == this.MODEL.TYPE.LOAD) {
      if (hash == null) {
        Log.error(arguments)();
        return this.MODEL.ERROR;
      }
      this.MODEL.HASH = hash;
    } else {
      _success_message = View.element({ content: LN.get('updated_clip_setting') });
    }

    this.EVENT.setLoading({
      type: _TYPE,
      functionSuccess: () => {
        this.checkSuccess({
          errorMessage: _FAILED,
          check: [
            'clip'
          ],
          functionSuccess: () => {
            // 取得成功
            super.log('取得成功')();
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
        });
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

  deleteClip (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    const _TYPE = this.MODEL.TYPE.DELETE;
    const _FAILED = 'failed_to_delete_clip';

    this.MODEL.HASH = hash;

    this.EVENT.setLoading({
      type: _TYPE,
      loading: false,
      functionSuccess: () => {
        this.checkSuccess({
          errorMessage: _FAILED,
          errorType: 'toast',
          check: [
            'clip'
          ],
          functionSuccess: () => {
            // 取得成功
            LIST.loadList();
          }
        });
      },
      errorOpenType: _TYPE,
      errorToastModel: super.getErrorModel('toast/server', _FAILED)
    });

    // Post
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
  }

  // ----------------------------------------------------------------
  // clip

  edit (hash = this.MODEL.HASH, edit = true) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Edit', Log.ARROW_INPUT)();
    CODE.loadCode(hash, edit);
  }

  share (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Share', Log.ARROW_INPUT)();

    new Confirm({
      title: LN.get('share_clip'),
      template: this.MODEL.TEMPLATE.SHARE,
      model: {
        hash: hash,
        filename: LIST.MODEL.NAMED_CLIPS[hash]['clip_name'],
        filetype: LIST.MODEL.NAMED_CLIPS[hash]['clip_type']
      },
      type: Confirm.TYPE_YES,
      yes: LN.get('close')
    });
  }

  delete (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Delete', Log.ARROW_INPUT)();
    new Confirm({
      title: LN.get('delete_clip'),
      content:
        View.element({ clas: 'text-center', content: LN.get('delete_clip_confirm') }) +
        View.element({ element: 'hr' }) +
        View.element({ element: 'table',
          clas: 'table table-striped table-hover',
          content: View.element({ element: 'tbody', content:
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('filename') }) +
              View.element({ element: 'td', content: LIST.MODEL.NAMED_CLIPS[hash]['clip_name'] })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('filetype') }) +
              View.element({ element: 'td', content: this.MODEL.FILETYPES[LIST.MODEL.NAMED_CLIPS[hash]['clip_type']]['name'] })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('tags') }) +
              View.element({ element: 'td', content: LIST.MODEL.NAMED_CLIPS[hash]['clip_tags'] })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('owner') }) +
              View.element({ element: 'td', content: LIST.MODEL.NAMED_CLIPS[hash]['clip_owner'] })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('owner_public') }) +
              View.element({ element: 'td', content: LN.get(LIST.MODEL.NAMED_CLIPS[hash]['clip_owner_public']) })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('clip_mode') }) +
              View.element({ element: 'td', content: LN.get(LIST.MODEL.NAMED_CLIPS[hash]['clip_clip_mode']) })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('created_at') }) +
              View.element({ element: 'td', content: LIST.MODEL.NAMED_CLIPS[hash]['clip_created_at'] })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('updated_at') }) +
              View.element({ element: 'td', content: LIST.MODEL.NAMED_CLIPS[hash]['clip_updated_at'] })
            })
          })
        }),
      functionYes: () => {
        this.deleteClip(hash);
      }
    });
  }

  // ----------------------------------------------------------------
  // file

  updateFile ({
    name = null,
    type = null
  } = {}) {
    if (name == null || type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
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
      return this.MODEL.ERROR;
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
        return this.MODEL.ERROR;
    }
    return _result;
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
      Log.error(arguments, 'type mismatch X(')();
      return this.MODEL.ERROR;
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
        return this.MODEL.ERROR;
    }
  }

  getSendModel (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    let _model = {};
    _model['owner_hash'] = USER.MODEL.HASH.USER;
    _model['password_hash'] = USER.MODEL.HASH.PASSWORD;
    switch (type) {
      case this.MODEL.TYPE.NEW:
        // NEW
        _model['hash'] = this.MODEL.HASH;
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

      case this.MODEL.TYPE.DELETE:
        // DELETE
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
        return this.MODEL.ERROR;
    }
    return _model;
  }
}
