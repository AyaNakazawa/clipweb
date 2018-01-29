
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

    // 新規作成
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
        this.trigger({ trigger: this.MODEL.TRIGGER.VIEW.HIDE });
        $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'auto');
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

  // ----------------------------------------------------------------
  // code

  decrypto () {
    this.MODEL.DATA = this.MODEL.DL_DATA;
  }

  share () {
    super.log(this.MODEL.HASH.substr(0, 14), 'Share', Log.ARROW_INPUT)();
  }

  setting () {
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
      return;
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
      case this.MODEL.TYPE.LOAD:
        // LOAD
        this.MODEL.DL_DATA = this.getAjaxData({ key: 'data' });
        this.decrypto();
        this.MODEL.FILENAME = this.getAjaxData({ key: 'filename' });
        this.MODEL.FILETYPE = this.getAjaxData({ key: 'filetype' });
        break;

      case this.MODEL.TYPE.SAVE:
        // SAVE
        this.MODEL.DL_DATA = this.getAjaxData({ key: 'data' });
        this.decrypto();
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
      case this.MODEL.TYPE.LOAD:
        // LOAD
        _model['hash'] = this.MODEL.HASH;
        break;

      case this.MODEL.TYPE.SAVE:
        // SAVE
        _model['hash'] = this.MODEL.HASH;
        _model['data'] = this.MODEL.DATA;
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return;
    }
    return _model;
  }
}
