
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
    this.SELECTOR.EDITOR.SHARE = '#code-editor-share';
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
        super.log('Code', 'Close')();
        this.VIEW.hide();
        $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'auto');
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.SHARE,
      func: () => {
        super.log('Code', 'Share')();
        this.CONTROLLER.share();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.SETTING,
      func: () => {
        super.log('Code', 'Setting')();
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

  loadCode (hash = this.MODEL.HASH, edit = true) {
    this.MODEL.HASH = hash;
    if (this.MODEL.HASH == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    const _TYPE = this.MODEL.TYPE.LOAD;
    const _FAILED = 'failed_to_load_code';

    this.EVENT.setLoading({
      type: _TYPE,
      loading: false,
      errorMessage: _FAILED,
      errorType: 'toast',
      check: [
        'data'
      ],
      functionSuccess: () => {
        // 取得成功
        this.edit(this.MODEL.HASH, edit);
      },
      connectionErrorToastModel: super.getErrorModel('toast/server', _FAILED)
    });

    // Post
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
  }

  saveData (hash = this.MODEL.HASH) {
    this.MODEL.HASH = hash;

  }

  // ----------------------------------------------------------------
  // code

  start (edit = true) {
    $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'hidden');
    this.open({ type: this.MODEL.TYPE.EDITOR, model: { scroll: false, callback: () => {
      this.MODEL.EDITOR = ace.edit(this.MODEL.SELECTOR.EDITOR.EDITOR.replace('#', ''));
      if (!edit) {
        this.MODEL.EDITOR.setReadOnly(true);
      }
      this.MODEL.EDITOR.$blockScrolling = Infinity;
      this.MODEL.EDITOR.setTheme(`ace/theme/${USER.MODEL.THEME}`);
      this.MODEL.EDITOR.session.setMode(`ace/mode/${this.MODEL.FILETYPE.toLowerCase()}`);
      this.MODEL.EDITOR.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
    }}});
  }

  edit (hash = this.MODEL.HASH, edit = false) {
    this.MODEL.HASH = hash;
    super.log(this.MODEL.HASH.substr(0, 14), 'Edit', Log.ARROW_INPUT)();
    if (!this.MODEL.STATUS.LOAD) {
      super.log('Script', 'Load', Log.ARROW_INPUT)();
      this.MODEL.STATUS.LOAD = true;
      $.getScript('js/lib/ace/ext-language_tools.js', () => {
        this.start(edit);
      });
    } else {
      this.start(edit);
    }
  }

  decrypt () {
    super.log(this.MODEL.HASH.substr(0, 14), 'Decrypt', Log.ARROW_INPUT)();
    this.MODEL.DATA = this.MODEL.DL_DATA;
  }

  encrypt () {
    super.log(this.MODEL.HASH.substr(0, 14), 'Encrypt', Log.ARROW_INPUT)();
    this.MODEL.SEND_DATA = this.MODEL.DATA;
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

  getAreaModel (
    type = null
  ) {
    if (type == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    let _result = {};
    switch (type) {
      case this.MODEL.TYPE.EDITOR:
        // EDITOR
        _result = {
          hash: this.MODEL.HASH,
          filename: this.MODEL.FILENAME,
          filetype: this.MODEL.FILETYPE,
          filetypes: this.MODEL.FILETYPES,
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
      case this.MODEL.TYPE.LOAD:
        // LOAD
        this.MODEL.DL_DATA = this.getAjaxData({ key: 'data' });
        this.decrypt();
        this.MODEL.FILENAME = this.getAjaxData({ key: 'filename' });
        this.MODEL.FILETYPE = this.getAjaxData({ key: 'filetype' });
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
      case this.MODEL.TYPE.LOAD:
        // LOAD
        _model['hash'] = this.MODEL.HASH;
        break;

      case this.MODEL.TYPE.SAVE:
        // SAVE
        _model['hash'] = this.MODEL.HASH;
        _model['data'] = this.MODEL.SEND_DATA;
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return this.MODEL.ERROR;
    }
    return _model;
  }
}
