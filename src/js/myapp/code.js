
// ----------------------------------------------------------------
// Code Class

// ----------------------------------------------------------------
// Model

class CodeModel extends ClipwebModel {
  constructor (
    initSetting = {
      NAME: 'Code Object'
    }
  ) {
    super(initSetting);

    // ----------------------------------------------------------------
    // エラーコード

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'code';

    // ----------------------------------------------------------------
    // LocalStorageキー

    // ----------------------------------------------------------------
    // ステータス
    this.STATUS.LOAD = false;

    // ----------------------------------------------------------------
    // クリップ
    this.HASH = '';
    this.CODE_HASH = null;
    this.FILENAME = 'test.js';
    this.FILETYPE = 'JavaScript';
    this.DATA = '';

    this.DL_DATA = null;

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.EDITOR = '#code-editor-template';

    // ----------------------------------------------------------------
    // セレクタ

    // エリア
    this.SELECTOR.AREA = '#code-area';

    // エディタ
    this.SELECTOR.EDITOR = {};
    this.SELECTOR.EDITOR.EDITOR = '#code-editor-editor';
    this.SELECTOR.EDITOR.CLOSE = '#code-editor-close';
    this.SELECTOR.EDITOR.DOWNLOAD = '#code-editor-download';
    this.SELECTOR.EDITOR.SAVE = '#code-editor-save';
    this.SELECTOR.EDITOR.SHARE = '#code-editor-share';
    this.SELECTOR.EDITOR.DELETE = '#code-editor-delete';
    this.SELECTOR.EDITOR.SETTING = '#code-editor-setting';
  }
}

// ----------------------------------------------------------------
// View

class CodeView extends ClipwebView {
  constructor (
    initSetting = {
      NAME: 'Code View'
    }
  ) {
    super(initSetting);
  }
}

// ----------------------------------------------------------------
// Event

class CodeEvent extends ClipwebEvent {
  constructor (
    initSetting = {
      NAME: 'Code Event'
    }
  ) {
    super(initSetting);
  }

  setEvent () {
    this.setOnHide();
    this.setOnEditor();
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

  setOnEditor () {
    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.CLOSE,
      func: () => {
        super.log('Editor', 'Close')();
        this.VIEW.hide();
        $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'auto');
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.SAVE,
      func: () => {
        super.log('Editor', 'Save')();
        this.CONTROLLER.saveCode();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.DOWNLOAD,
      func: () => {
        super.log('Editor', 'Download')();
        this.CONTROLLER.loadCode(this.MODEL.HASH, this.MODEL.TYPE.DOWNLOAD, this.MODEL.CODE_HASH);
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.SHARE,
      func: () => {
        super.log('Editor', 'Share')();
        this.CONTROLLER.share();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.DELETE,
      func: () => {
        super.log('Editor', 'Delete')();
        CLIP.delete(this.MODEL.HASH);
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.SETTING,
      func: () => {
        super.log('Editor', 'Setting')();
        this.VIEW.hide({ callback: () => {
          $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'auto');
          this.CONTROLLER.setting();
        }});
      }
    });
  }

}

// ----------------------------------------------------------------
// Controller

class CodeController extends ClipwebController {
  constructor (
    model = {},
    initSetting = {
      NAME: 'Code Controller',
      MODEL: new CodeModel(),
      VIEW: new CodeView(),
      EVENT: new CodeEvent()
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

  loadCode (hash = this.MODEL.HASH, type = this.MODEL.TYPE.LOAD, code_hash = null) {
    this.MODEL.HASH = hash;
    this.MODEL.CODE_HASH = code_hash;
    if (this.MODEL.HASH == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    const _TYPE = this.MODEL.TYPE.LOAD;
    let _failed = null;
    if (type == this.MODEL.TYPE.LOAD) {
      _failed = 'failed_to_load_code';
    } else if (type == this.MODEL.TYPE.DOWNLOAD) {
      _failed = 'failed_to_download_code';
    }

    this.EVENT.setLoading({
      type: _TYPE,
      loading: false,
      errorMessage: _failed,
      errorType: 'toast',
      check: [
        'data'
      ],
      functionSuccess: () => {
        // 取得成功
        this.applyReceiveModel(_TYPE);
        if (type == this.MODEL.TYPE.LOAD) {
          this.edit(this.MODEL.HASH);
        } else if (type == this.MODEL.TYPE.DOWNLOAD) {
          super.downloadText(this.MODEL.FILENAME, this.MODEL.DATA);
          this.VIEW.toast({ type: 'success', message: LN.get('downloaded_clip') });
        }
      },
      connectionErrorToastModel: super.getErrorModel('toast/server', _failed)
    });

    // Post
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
  }

  saveCode (hash = this.MODEL.HASH) {
    this.MODEL.HASH = hash;
    if (this.MODEL.HASH == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    const _TYPE = this.MODEL.TYPE.SAVE;
    const _FAILED = 'failed_to_save_code';

    this.MODEL.DATA = this.MODEL.EDITOR.getValue();
    this.VIEW.hide();

    this.EVENT.setLoading({
      type: _TYPE,
      loading: false,
      errorMessage: _FAILED,
      errorType: 'toast',
      check: [
        'save'
      ],
      functionSuccess: () => {
        // 取得成功
        this.applyReceiveModel(_TYPE);
        $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'auto');
        this.VIEW.toast({ type: 'success', message: LN.get('saved_clip') });
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
  // code

  start (edit = true) {
    $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'hidden');
    this.open({ type: this.MODEL.TYPE.EDITOR, model: { scroll: false, callback: () => {
      this.MODEL.EDITOR = ace.edit(this.MODEL.SELECTOR.EDITOR.EDITOR.replace('#', ''));
      $(this.MODEL.SELECTOR.EDITOR.EDITOR).css('font-size', '14px');
      $(this.MODEL.SELECTOR.EDITOR.EDITOR).focus();
      if (!edit) {
        this.MODEL.EDITOR.setReadOnly(true);
      }
      this.MODEL.EDITOR.$blockScrolling = Infinity;
      this.MODEL.EDITOR.setTheme(`ace/theme/${USER.MODEL.THEME}`);
      this.MODEL.EDITOR.session.setMode(`ace/mode/${this.MODEL.FILETYPE}`);
      this.MODEL.EDITOR.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      this.MODEL.EDITOR.setValue(this.MODEL.DATA);
      this.MODEL.EDITOR.resize();
      this.MODEL.EDITOR.focus();
      this.MODEL.EDITOR.clearSelection();
      this.MODEL.EDITOR.getSession().setUseWrapMode(true);
      this.MODEL.EDITOR.setShowPrintMargin(false);
    }}});
  }

  edit (hash = this.MODEL.HASH) {
    this.MODEL.HASH = hash;
    super.log(this.MODEL.HASH.substr(0, 14), 'Edit', Log.ARROW_INPUT)();
    if (!this.MODEL.STATUS.LOAD) {
      super.log('Script', 'Load', Log.ARROW_INPUT)();
      this.MODEL.STATUS.LOAD = true;
      $.getScript('js/lib/ace/ext-language_tools.js', () => {
        this.start(this.MODEL.EDIT);
      });
    } else {
      this.start(this.MODEL.EDIT);
    }
  }

  decrypt () {
    super.log(this.MODEL.HASH.substr(0, 14), 'Decrypt', Log.ARROW_INPUT)();
    if (this.MODEL.ENCRYPTION == 'on') {
      this.MODEL.DATA = Crypto.decrypt(
        this.MODEL.DL_DATA,
        USER.MODEL.HASH.CRYPTO
      );
      super.log(this.MODEL.DL_DATA)();
      super.log('↓')();
      super.log(this.MODEL.DATA)();
    } else {
      this.MODEL.DATA = this.MODEL.DL_DATA;
    }
  }

  encrypt () {
    super.log(this.MODEL.HASH.substr(0, 14), 'Encrypt', Log.ARROW_INPUT)();
    if (this.MODEL.ENCRYPTION == 'on') {
      this.MODEL.SEND_DATA = Crypto.encrypt(
        this.MODEL.DATA,
        USER.MODEL.HASH.CRYPTO
      );
      super.log(this.MODEL.DATA)();
      super.log('↓')();
      super.log(this.MODEL.SEND_DATA)();
    } else {
      this.MODEL.SEND_DATA = this.MODEL.DATA;
    }
  }

  share (hash = this.MODEL.HASH) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Share', Log.ARROW_INPUT)();
    CLIP.share(hash);
  }

  setting (hash = this.MODEL.HASH) {
    this.MODEL.HASH = hash;
    super.log(this.MODEL.HASH.substr(0, 14), 'Setting', Log.ARROW_INPUT)();
    CLIP.connectSetting(this.MODEL.TYPE.LOAD, this.MODEL.HASH);
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
      case this.MODEL.TYPE.EDITOR:
        // EDITOR
        var _type = 'open';
        if (this.MODEL.CODE_HASH != null) {
          _type = 'rollback';
        }
        _result = {
          type: _type,
          hash: this.MODEL.HASH,
          filename: this.MODEL.FILENAME,
          filetype: this.MODEL.FILETYPE,
          clip_mode: this.MODEL.CLIP_MODE,
          owner_hash: this.MODEL.OWNER_HASH,
          filetypes: this.MODEL.MODE_LIST['modesByName']
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
      case this.MODEL.TYPE.LOAD:
        // LOAD
        Log.obj(this.getAjaxData())();
        this.MODEL.DL_DATA = this.getAjaxData({ key: 'data' });
        this.decrypt();
        this.MODEL.FILENAME = this.getAjaxData({ key: 'filename' });
        this.MODEL.FILETYPE = this.getAjaxData({ key: 'filetype' });
        this.MODEL.CLIP_MODE = this.getAjaxData({ key: 'clip_mode' });
        this.MODEL.OWNER_HASH = this.getAjaxData({ key: 'owner_hash' });
        this.MODEL.EDIT = false;
        if (this.MODEL.CLIP_MODE == 'share' || this.MODEL.OWNER_HASH == USER.MODEL.HASH.USER) {
          this.MODEL.EDIT = true;
        }
        break;

      case this.MODEL.TYPE.SAVE:
        // SAVE
        this.MODEL.DL_DATA = this.getAjaxData({ key: 'data' });
        this.decrypt();
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
    _model['clip_hash'] = this.MODEL.HASH;
    switch (type) {
      case this.MODEL.TYPE.LOAD:
        // LOAD
        if (this.MODEL.CODE_HASH != null) {
          _model['code_hash'] = this.MODEL.CODE_HASH;
        }
        break;

      case this.MODEL.TYPE.SAVE:
        // SAVE
        this.encrypt();
        _model['data'] = this.MODEL.SEND_DATA;
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return this.MODEL.ERROR;
    }
    return _model;
  }

}
