
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

    this.CLIP = null;
    this.USERS = {};
    this.CODES = {};

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.NEW = '#clip-new-template';
    this.TEMPLATE.SETTING = '#clip-setting-template';
    this.TEMPLATE.PRIVILEGE = '#clip-privilege-template';
    this.TEMPLATE.HISTORY = '#clip-history-template';
    this.TEMPLATE.SHARE = '#clip-share-template';

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
    this.SELECTOR.SETTING.CLOSE = '#clip-setting-close';
    this.SELECTOR.SETTING.PRIVILEGE = '#clip-setting-privilege';
    this.SELECTOR.SETTING.HISTORY = '#clip-setting-history';
    this.SELECTOR.SETTING.EDIT = '#clip-setting-edit';
    this.SELECTOR.SETTING.SHARE = '#clip-setting-share';
    this.SELECTOR.SETTING.DOWNLOAD = '#clip-setting-download';
    this.SELECTOR.SETTING.DELETE = '#clip-setting-delete';
    this.SELECTOR.SETTING.SAVE = '#clip-setting-save';

    // 権限
    this.SELECTOR.PRIVILEGE = {};
    this.SELECTOR.PRIVILEGE.CLOSE = '#clip-privilege-close';
    this.SELECTOR.PRIVILEGE.SETTING = '#clip-privilege-setting';
    this.SELECTOR.PRIVILEGE.HISTORY = '#clip-privilege-history';
    this.SELECTOR.PRIVILEGE.BAN = '.clip-privilege-ban';

    // 履歴
    this.SELECTOR.HISTORY = {};
    this.SELECTOR.HISTORY.CLOSE = '#clip-history-close';
    this.SELECTOR.HISTORY.SETTING = '#clip-history-setting';
    this.SELECTOR.HISTORY.PRIVILEGE = '#clip-history-privilege';
    this.SELECTOR.HISTORY.LOAD = '.clip-history-load';

    // シェア
    this.SELECTOR.SHARE = {};
    this.SELECTOR.SHARE.LINK = '#clip-share-link';
    this.SELECTOR.SHARE.COPY = '#clip-share-copy';
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
    this.setOnPrivilege();
    this.setOnHistory();
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
        super.log('New', 'Close')();
        this.VIEW.hide();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.NEW.CREATE}`,
      func: () => {
        super.log('New', 'New')();
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
        super.log('Setting', 'Close')();
        this.VIEW.hide();
        LIST.VIEW.scroll({ selector: `#${this.MODEL.HASH}`, offset: -120 });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.PRIVILEGE}`,
      func: () => {
        super.log('Setting', 'Privilege')();
        this.CONTROLLER.connectPrivilege();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.HISTORY}`,
      func: () => {
        super.log('Setting', 'Hisotry')();
        this.CONTROLLER.connectHistory();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.EDIT}`,
      func: () => {
        super.log('Setting', 'Edit')();
        this.CONTROLLER.edit();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.SHARE}`,
      func: () => {
        super.log('Setting', 'Share')();
        this.CONTROLLER.share();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.DOWNLOAD}`,
      func: () => {
        super.log('Setting', 'Download')();
        this.CONTROLLER.download();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.DELETE}`,
      func: () => {
        super.log('Setting', 'Delete')();
        this.CONTROLLER.delete();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SETTING.SAVE}`,
      func: () => {
        super.log('Setting', 'Save')();
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

  setOnPrivilege () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.PRIVILEGE.CLOSE}`,
      func: () => {
        super.log('Privilege', 'Close')();
        this.VIEW.hide();
        LIST.VIEW.scroll({ selector: `#${this.MODEL.HASH}`, offset: -120 });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.PRIVILEGE.SETTING}`,
      func: () => {
        super.log('Privilege', 'Setting')();
        this.CONTROLLER.connectSetting(this.MODEL.TYPE.LOAD);
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.PRIVILEGE.HISTORY}`,
      func: () => {
        super.log('Privilege', 'Hisotry')();
        this.CONTROLLER.connectHistory();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.PRIVILEGE.BAN}`,
      func: function () {
        CLIP.banShare($(this).attr('data-user-hash'));
      }
    });
  }

  setOnHistory () {
    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.HISTORY.CLOSE}`,
      func: () => {
        super.log('History', 'Close')();
        this.VIEW.hide();
        LIST.VIEW.scroll({ selector: `#${this.MODEL.HASH}`, offset: -120 });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.HISTORY.SETTING}`,
      func: () => {
        super.log('History', 'Setting')();
        this.CONTROLLER.connectSetting(this.MODEL.TYPE.LOAD);
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.HISTORY.PRIVILEGE}`,
      func: () => {
        super.log('History', 'Privilege')();
        this.CONTROLLER.connectPrivilege();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.HISTORY.LOAD}`,
      func: function () {
        CODE.loadCode(
          CLIP.MODEL.HASH,
          CLIP.MODEL.TYPE.LOAD,
          $(this).attr('data-code-hash')
        );
      }
    });
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

      this.EVENT.setLoading({
        type: _TYPE,
        errorOpen: _TYPE,
        errorMessage: _FAILED,
        check: [
          'hash',
          'new_clip',
          'new_code',
          'new_share'
        ],
        functionSuccess: () => {
          this.applyReceiveModel(_TYPE);
          LIST.loadList();
          CLIP.connectSetting(this.MODEL.TYPE.LOAD);
        },
        connectionErrorOpenType: _TYPE,
        connectionErrorModel: super.getErrorModel('server', _FAILED)
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
    let _failed = null;
    let _success_message = null;
    let _check_data = null;

    if (type == this.MODEL.TYPE.LOAD) {
      if (hash == null) {
        Log.error(arguments)();
        return this.MODEL.ERROR;
      }

      this.MODEL.HASH = hash;
      _failed = 'failed_to_load_clip_setting';
      _check_data = ['clip'];

    } else if (type == this.MODEL.TYPE.BAN) {
      this.MODEL.BAN = hash;
      _failed = 'failed_to_stop_share';
      _check_data = ['clip', 'ban'];
      _success_message = View.element({ content: LN.get('stopped_share_to_user', {
        ban_username: this.MODEL.USERS[hash]['user_name']
      }) });

    } else if (type == this.MODEL.TYPE.SETTING) {
      _failed = 'failed_to_setting_clip_setting';
      _check_data = ['update', 'clip'];
      _success_message = View.element({ content: LN.get('updated_clip_setting') });

      const _NEW_NAME = this.MODEL.SELECTOR.SETTING.FILENAME;
      const _NEW_TYPE = this.MODEL.SELECTOR.SETTING.FILETYPE;
      const _NEW_TAGS = this.MODEL.SELECTOR.SETTING.TAGS;
      const _NEW_OWNER_PUBLIC = this.MODEL.SELECTOR.SETTING.OWNER_PUBLIC;
      const _NEW_CLIP_MODE = this.MODEL.SELECTOR.SETTING.CLIP_MODE;

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

    this.EVENT.setLoading({
      type: _TYPE,
      errorOpen: _TYPE,
      errorMessage: _failed,
      check: _check_data,
      functionSuccess: () => {
        this.applyReceiveModel(type);
        if (type == this.MODEL.TYPE.SETTING) {
          LIST.loadList();
        }
        this.open({
          type: _TYPE,
          model: {
            alertMessage: _success_message
          }
        });
      },
      connectionErrorOpenType: _TYPE,
      connectionErrorModel: super.getErrorModel('server', _failed)
    });

    // Post
    this.post({
      type: type,
      data: this.getSendModel(type)
    });
  }

  connectPrivilege (type = this.MODEL.TYPE.PRIVILEGE, ban_hash = null) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }

    const _TYPE = this.MODEL.TYPE.PRIVILEGE;
    let _failed = null;
    let _success_message = null;
    let _check_data = null;

    if (type == this.MODEL.TYPE.PRIVILEGE) {
      _failed = 'failed_to_load_clip_privilege';
      _check_data = ['users'];

    } else if (type == this.MODEL.TYPE.BAN) {
      this.MODEL.BAN = ban_hash;
      _failed = 'failed_to_stop_share';
      _check_data = ['users', 'ban'];
      _success_message = View.element({ content: LN.get('stopped_share_to_user', {
        ban_username: this.MODEL.USERS[ban_hash]['user_name']
      }) });
    }

    this.EVENT.setLoading({
      type: _TYPE,
      errorOpen: _TYPE,
      errorMessage: _failed,
      check: _check_data,
      functionSuccess: () => {
        this.applyReceiveModel(type);
        this.open({
          type: _TYPE,
          model: { alertMessage: _success_message }
        });
      },
      connectionErrorOpenType: _TYPE,
      connectionErrorModel: super.getErrorModel('server', _failed)
    });

    // Post
    this.post({
      type: type,
      data: this.getSendModel(type)
    });
  }

  connectHistory () {
    const _TYPE = this.MODEL.TYPE.HISTORY;
    let _failed = 'failed_to_load_clip_history';
    let _check_data = ['codes'];

    this.EVENT.setLoading({
      type: _TYPE,
      errorOpen: _TYPE,
      errorMessage: _failed,
      check: _check_data,
      functionSuccess: () => {
        this.applyReceiveModel(_TYPE);
        this.open({ type: _TYPE });
      },
      connectionErrorOpenType: _TYPE,
      connectionErrorModel: super.getErrorModel('server', _failed)
    });

    // Post
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
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
            'delete_clip',
            'delete_share'
          ],
          functionSuccess: () => {
            // 取得成功
            LIST.loadList();
            this.VIEW.toast({ type: 'success', message: LN.get('deleted_clip') });
          }
        });
      },
      connectionErrorToastModel: super.getErrorModel('toast/server', _FAILED)
    });

    // Post
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
  }

  getShareClip (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    const _TYPE = this.MODEL.TYPE.SHARE;
    const _FAILED = 'failed_to_get_share_clip';

    this.MODEL.HASH = hash;

    this.EVENT.setLoading({
      type: _TYPE,
      loading: false,
      errorMessage: _FAILED,
      errorType: 'toast',
      functionSuccess: () => {
        // 取得成功
        LIST.loadList();
        this.VIEW.toast({ type: 'success', message: LN.get('shared_clip') });
        CODE.loadCode(hash);
      },
      connectionErrorToastModel: super.getErrorModel('toast/server', _FAILED)
    });

    // Post
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
  }

  // ----------------------------------------------------------------
  // reload

  reload () {
    switch (this.MODEL.STATUS.AREA) {
      case this.MODEL.TYPE.SETTING:
      case this.MODEL.TYPE.LOAD:
        this.connectSetting(this.MODEL.TYPE.LOAD);
        break;

      case this.MODEL.TYPE.PRIVILEGE:
      case this.MODEL.TYPE.BAN:
        this.connectPrivilege();
        break;

      case this.MODEL.TYPE.HISTORY:
        this.connectHistory();
        break;
    }
  }

  // ----------------------------------------------------------------
  // clip

  edit (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Edit', Log.ARROW_INPUT)();
    CODE.loadCode(hash);
  }

  download (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Download', Log.ARROW_INPUT)();
    CODE.loadCode(hash, this.MODEL.TYPE.DOWNLOAD);
  }

  share (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    this.MODEL.HASH = hash;
    super.log(this.MODEL.HASH.substr(0, 14), 'Share', Log.ARROW_INPUT)();

    new Confirm({
      title: LN.get('share_clip'),
      template: this.MODEL.TEMPLATE.SHARE,
      model: {
        hash: this.MODEL.HASH,
        filename: LIST.MODEL.NAMED_CLIPS[this.MODEL.HASH]['clip_name'],
        filetype: LIST.MODEL.NAMED_CLIPS[this.MODEL.HASH]['clip_type']
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
              View.element({ element: 'td', content: this.MODEL.MODE_LIST['modesByName'][LIST.MODEL.NAMED_CLIPS[hash]['clip_type']]['caption'] })
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
              View.element({ element: 'td', clas: 'date', content: LIST.MODEL.NAMED_CLIPS[hash]['clip_created_at'] })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('updated_at') }) +
              View.element({ element: 'td', clas: 'date', content: LIST.MODEL.NAMED_CLIPS[hash]['clip_updated_at'] })
            })
          })
        }),
      functionYes: () => {
        CODE.VIEW.hide();
        this.deleteClip(hash);
      }
    });
  }

  banShare (owner_hash = null) {
    if (owner_hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    Log.obj(owner_hash)();
    super.log(owner_hash.substr(0, 14), 'Ban', Log.ARROW_INPUT)();
    new Confirm({
      title: LN.get('stop_share_user'),
      content:
        View.element({ clas: 'text-center', content: LN.get('stop_share_user_confirm') }) +
        View.element({ element: 'hr' }) +
        View.element({ clas: 'text-center', content:
          View.element({ element: 'img', clas: 'avatar', attr: {
            src: `https://www.gravatar.com/avatar/${this.MODEL.USERS[owner_hash]['user_gravatar']}?s=48`,
            alt: `${this.MODEL.USERS[owner_hash]['user_name']}'s avatar`,
            style: 'margin-bottom: 1rem;'
          }}) +
          View.element({ element: 'span', clas: 'user-name', attr: {
            style: `
              margin: 1rem;
              font-size: 2rem;
              height: 2rem;
              line-height: 5rem;
              font-weight: 700;
            `
          }, content: ` ${this.MODEL.USERS[owner_hash]['user_name']}` })
        }) +
        View.element({ element: 'hr' }) +
        View.element({ clas: 'text-center', content: LN.get('clip_info') }) +
        View.element({ element: 'hr' }) +
        View.element({ element: 'table',
          clas: 'table table-striped table-hover table-sm',
          content: View.element({ element: 'tbody', content:
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('filename') }) +
              View.element({ element: 'td', content: this.MODEL.FILENAME })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('filetype') }) +
              View.element({ element: 'td', content: this.MODEL.MODE_LIST['modesByName'][this.MODEL.FILETYPE]['caption'] })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('tags') }) +
              View.element({ element: 'td', content: this.MODEL.TAGS })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('owner_public') }) +
              View.element({ element: 'td', content: LN.get(this.MODEL.OWNER_PUBLIC) })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('clip_mode') }) +
              View.element({ element: 'td', content: LN.get(this.MODEL.CLIP_MODE) })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('created_at') }) +
              View.element({ element: 'td', clas: 'date', content: this.MODEL.CREATED_AT })
            }) +
            View.element({ element: 'tr', content:
              View.element({ attr: {scope: 'row'}, element: 'th', content: LN.get('updated_at') }) +
              View.element({ element: 'td', clas: 'date', content: this.MODEL.UPDATED_AT })
            })
          })
        }),
      functionYes: () => {
        this.connectPrivilege(this.MODEL.TYPE.BAN, owner_hash);
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
    if (typeof this.MODEL.EXTENSION_LIST[_FILETYPE] != 'undefined') {
      $(type).val(this.MODEL.EXTENSION_LIST[_FILETYPE]);
    }
  }

  // ----------------------------------------------------------------
  // model

  getAreaModel (type = null) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    let _result = {};
    switch (type) {
      case this.MODEL.TYPE.NEW:
        // NEW
        _result = {
          filetypes: this.MODEL.MODE_LIST['modesByName'],
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
          filetypes: this.MODEL.MODE_LIST['modesByName'],
          filename: this.MODEL.FILENAME,
          filetype: this.MODEL.FILETYPE,
          tags: this.MODEL.TAGS,
          ownerPublic: this.MODEL.OWNER_PUBLIC,
          clipMode: this.MODEL.CLIP_MODE,
          users: this.MODEL.USERS,
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

      case this.MODEL.TYPE.PRIVILEGE:
        // PRIVILEGE
        _result = {
          users: this.MODEL.USERS
        };
        break;

      case this.MODEL.TYPE.HISTORY:
        // HISTORY
        _result = {
          codes: this.MODEL.CODES
        };
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return this.MODEL.ERROR;
    }
    return _result;
  }

  applyReceiveModel (type = null) {
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

      case this.MODEL.TYPE.BAN:
      case this.MODEL.TYPE.PRIVILEGE:
        //PRIVILEGE
        var _users = this.getAjaxData({ key: 'users' });
        this.MODEL.USERS = {};
        for (let index = 0; index < _users.length; index ++) {
          this.MODEL.USERS[_users[index]['user_hash']] = _users[index];
        }
        break;

      case this.MODEL.TYPE.HISTORY:
        //HISTORY
        var _codes = this.getAjaxData({ key: 'codes' });
        this.MODEL.CODES = {};
        for (let index = 0; index < _codes.length; index ++) {
          this.MODEL.CODES[_codes[index]['code_hash']] = _codes[index];
        }
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return this.MODEL.ERROR;
    }
  }

  getSendModel (type = null) {
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
        _model['filename'] = this.MODEL.FILENAME;
        _model['filetype'] = this.MODEL.FILETYPE;
        _model['tags'] = this.MODEL.TAGS;
        _model['owner_public'] = this.MODEL.OWNER_PUBLIC;
        _model['clip_mode'] = this.MODEL.CLIP_MODE;
        break;

      case this.MODEL.TYPE.LOAD:
        // LOAD
        _model['clip_hash'] = this.MODEL.HASH;
        break;

      case this.MODEL.TYPE.DELETE:
        // DELETE
        _model['clip_hash'] = this.MODEL.HASH;
        break;

      case this.MODEL.TYPE.SHARE:
        // SHARE
        _model['clip_hash'] = this.MODEL.HASH;
        break;

      case this.MODEL.TYPE.SETTING:
        // SETTING
        _model['clip_hash'] = this.MODEL.HASH;
        _model['filename'] = this.MODEL.FILENAME;
        _model['filetype'] = this.MODEL.FILETYPE;
        _model['tags'] = this.MODEL.TAGS;
        _model['owner_public'] = this.MODEL.OWNER_PUBLIC;
        _model['clip_mode'] = this.MODEL.CLIP_MODE;
        break;

      case this.MODEL.TYPE.PRIVILEGE:
        // PRIVILEGE
        _model['clip_hash'] = this.MODEL.HASH;
        break;

      case this.MODEL.TYPE.BAN:
        // BAN
        _model['clip_hash'] = this.MODEL.HASH;
        _model['ban_hash'] = this.MODEL.BAN;
        break;

      case this.MODEL.TYPE.HISTORY:
        // HISTORY
        _model['clip_hash'] = this.MODEL.HASH;
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return this.MODEL.ERROR;
    }
    return _model;
  }

}
