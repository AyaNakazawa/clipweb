
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
    this.STATUS.OPEN = false;
    this.STATUS.SEND = false;
    this.STATUS.RECEIVE = false;

    // ----------------------------------------------------------------
    // クリップ
    this.HASH = '';
    this.CODE_HASH = null;
    this.FILENAME = 'test.js';
    this.FILETYPE = 'JavaScript';
    this.DATA = '';
    this.ENCRYPTION = 'off';

    this.DL_DATA = null;

    // ----------------------------------------------------------------
    // 同時編集
    this.CONCURRENT = {};
    this.CC = this.CONCURRENT;

    // ID
    this.CC.ID = null;

    // Diff
    this.CC.DIFF = null;

    // コード本体
    this.CC.CODE = {};
    this.CC.CODE.BEFORE = null;
    this.CC.CODE.CURRENT = null;

    // チェックサム
    this.CC.HASH = {};
    this.CC.HASH.BEFORE = null;
    this.CC.HASH.CURRENT = null;

    // アップデート順序
    this.CC.UPDATE = {};
    this.CC.UPDATE.TYPE = null;

    // アップデート順序
    this.CC.TYPE = {};
    this.CC.TYPE.INIT = 'init';
    this.CC.TYPE.ONCE = 'once';
    this.CC.TYPE.RECURSIVE = 'recursive';

    // キー判定
    this.CC.KEY = {};
    this.CC.KEY.CURSOR = [37, 38, 39, 40];
    this.CC.KEY.DELETE = [8, 46];
    this.CC.KEY.CUT = [88];
    this.CC.KEY.TYPE = {};
    this.CC.KEY.TYPE.CURSOR = 'cursor';
    this.CC.KEY.TYPE.DELETE = 'delete';
    this.CC.KEY.TYPE.INPUT = 'input';
    this.CC.KEY.BEFORE = null;

    // ----------------------------------------------------------------
    // TICK

    this.TICK = {};
    this.TICK.TIME = {};
    this.TICK.TIME.MIN = 500;
    this.TICK.TIME.MAX = 30000;
    this.TICK.TIME.TIMES = 1.55;
    this.TICK.TIME.CURRENT = this.TICK.TIME.MIN;
    this.TICK.TIME.LIMIT = 10 * 60 * 1000;
    this.TICK.TIME.TOTAL = null;

    this.TICK.ROOT = null;

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
    this.setOnEditor();
  }

  // ----------------------------------------------------------------
  // type

  setOnEditor () {
    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.CLOSE,
      func: () => {
        super.log('Editor', 'Close')();
        this.CONTROLLER.exitTick();
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
        this.CONTROLLER.exitTick();
        this.VIEW.hide({ callback: () => {
          $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'auto');
          this.CONTROLLER.setting();
        }});
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.EDITOR,
      trigger: ['click', 'drag'],
      func: () => {
        if (this.MODEL.CC.KEY.BEFORE != this.MODEL.CC.KEY.TYPE.CURSOR) {
          this.MODEL.CC.KEY.BEFORE = this.MODEL.CC.KEY.TYPE.CURSOR;
          this.CONTROLLER.raiseTick();
        }
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.EDITOR,
      trigger: 'keyup',
      func: (event) => {
        if (this.MODEL.CC.KEY.CURSOR.includes(event.keyCode)) {
          if (this.MODEL.CC.KEY.BEFORE != this.MODEL.CC.KEY.TYPE.CURSOR) {
            this.MODEL.CC.KEY.BEFORE = this.MODEL.CC.KEY.TYPE.CURSOR;
            this.CONTROLLER.raiseTick();
          }
        } else if (this.MODEL.CC.KEY.DELETE.includes(event.keyCode)) {
          if (this.MODEL.CC.KEY.BEFORE != this.MODEL.CC.KEY.TYPE.DELETE) {
            this.MODEL.CC.KEY.BEFORE = this.MODEL.CC.KEY.TYPE.DELETE;
            this.CONTROLLER.raiseTick();
          }
        } else if (this.MODEL.CC.KEY.CUT.includes(event.keyCode) && event.ctrlKey) {
          if (this.MODEL.CC.KEY.BEFORE != this.MODEL.CC.KEY.TYPE.DELETE) {
            this.MODEL.CC.KEY.BEFORE = this.MODEL.CC.KEY.TYPE.DELETE;
            this.CONTROLLER.raiseTick();
          }
        } else {
          this.MODEL.CC.KEY.BEFORE = this.MODEL.CC.KEY.TYPE.INPUT;
        }
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
          this.exitTick();
          $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'auto');
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
        this.exitTick();
        this.applyReceiveModel(_TYPE);
        $(this.MODEL.COMMON.SELECTOR.BODY).css('overflow', 'auto');
        this.VIEW.toast({ type: 'success', message: LN.get('saved_clip') });
        CLIP.reload();
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
  // tick

  startTick () {
    // 同時編集起動
    if (this.MODEL.ENCRYPTION == 'on') {
      // 暗号はサポートしていない
      super.log('Tick', 'No support for encryption.', Log.ARROW_INPUT)();
    } else if (this.MODEL.ENCRYPTION == 'off') {
      // 暗号化していないとき
      super.log('Tick', 'Start', Log.ARROW_INPUT)();

      // 初期化
      this.MODEL.STATUS.OPEN = true;
      this.MODEL.CC.UPDATE.TYPE = null;
      this.MODEL.CC.ID = 0;
      this.MODEL.CC.KEY.BEFORE = this.MODEL.CC.KEY.TYPE.CURSOR;
      this.MODEL.TICK.TIME.TOTAL = 0;
      this.MODEL.TICK.TIME.CURRENT = this.MODEL.TICK.TIME.MIN;
      this.MODEL.TICK.ROOT = 0;

      // コード
      this.MODEL.CC.CODE.CURRENT = this.MODEL.EDITOR.getValue();
      this.MODEL.CC.CODE.BEFORE = this.MODEL.CC.CODE.CURRENT;
      // チェックサム
      this.MODEL.CC.HASH.CURRENT = MD5.getHash(this.MODEL.CC.CODE.CURRENT);
      this.MODEL.CC.HASH.BEFORE = this.MODEL.CC.HASH.BEFORE;

      // 起動
      this.tick();
    }
  }

  exitTick () {
    // 同時編集終了
    super.log('Tick', 'Exit', Log.ARROW_INPUT)();
    this.MODEL.STATUS.OPEN = false;
  }

  raiseTick () {
    super.log('Raise root', this.MODEL.TICK.ROOT + 1)();
    this.MODEL.TICK.TIME.TOTAL = 0;
    this.MODEL.TICK.TIME.CURRENT = this.MODEL.TICK.TIME.MIN;
    this.MODEL.TICK.ROOT ++;
    if (this.MODEL.CC.UPDATE.TYPE == 'backup') {
      // もしDiffの途中なら一旦後回し
      Log.caution(arguments, 'Tick is halfway.')();
      setTimeout(
        () => {
          this.raiseTick();
        },
        1
      );
    } else {
      // Diffが区切れていればOK
      this.tick();
    }
  }

  tick (root = this.MODEL.TICK.ROOT) {
    this.MODEL.CC.ID ++;
    if (this.MODEL.STATUS.OPEN) {
      // Tick
      super.log(`Tick ${this.MODEL.TICK.ROOT}: ${this.MODEL.CC.ID}`, `${Math.round(this.MODEL.TICK.TIME.CURRENT).toLocaleString()}ms`)();

      // ステータスを初期化
      this.MODEL.STATUS.SEND = false;
      this.MODEL.STATUS.RECEIVE = false;

      // Rootのチェック
      if (this.MODEL.TICK.ROOT > root) {
        // Rootが育ってるから、今のRootを切る
        super.log(`Root ${root}`, 'Delete', Log.ARROW_INPUT)();
        return;
      } else {
        // 今のRootが一番大きい
        this.MODEL.TICK.ROOT = root;
      }

      // カレント - アップデート
      this.updateConcurrent();

      // Diff
      this.MODEL.CC.DIFF = JsDiff.diffChars(this.MODEL.CC.CODE.BEFORE, this.MODEL.CC.CODE.CURRENT);
      Log.obj(this.MODEL.CC.DIFF)();

      if (this.MODEL.CC.DIFF.length > 1) {
        this.MODEL.STATUS.SEND = true;
      }

      // バックアップ - アップデート
      this.updateConcurrent();

      // 編集を送信
      if (this.MODEL.STATUS.SEND) {
        super.log('Tick', 'Send')();
        this.MODEL.TICK.TIME.TOTAL = 0;
        this.MODEL.TICK.TIME.CURRENT = this.MODEL.TICK.TIME.MIN;
      }

      // 編集を受信
      if (this.MODEL.STATUS.RECEIVE) {
        super.log('Tick', 'Receive')();
        this.MODEL.TICK.TIME.TOTAL = 0;
        this.MODEL.TICK.TIME.CURRENT = this.MODEL.TICK.TIME.MIN;
      }

      // 編集なし
      if (this.MODEL.STATUS.SEND == false && this.MODEL.STATUS.RECEIVE == false){
        // 時間を増やす
        this.MODEL.TICK.TIME.TOTAL += this.MODEL.TICK.TIME.CURRENT;
        this.MODEL.TICK.TIME.CURRENT *= this.MODEL.TICK.TIME.TIMES;
        if (this.MODEL.TICK.TIME.CURRENT > this.MODEL.TICK.TIME.MAX) {
          this.MODEL.TICK.TIME.CURRENT = this.MODEL.TICK.TIME.MAX;
        }
        // 一定時間編集なしが続いたら一時停止
        if (this.MODEL.TICK.TIME.TOTAL > this.MODEL.TICK.TIME.LIMIT) {
          super.log('Tick', 'Time limit')();
          this.exitTick();
          new Confirm({
            title: LN.get('concurrent_editing_stop'),
            content: LN.get('close_to_start_concurrent_editing'),
            yes: LN.get('restart'),
            type: Confirm.TYPE_YES,
            functionClose: () => {
              this.startTick();
            }
          });
        }
      }

      // 次のコール
      setTimeout(
        () => {
          this.tick(root);
        },
        this.MODEL.TICK.TIME.CURRENT
      );
    }
  }

  // ----------------------------------------------------------------
  // diff

  updateConcurrent () {
    // 起動時
    if (this.MODEL.CC.UPDATE.TYPE == null) {
      this.MODEL.CC.UPDATE.TYPE = 'current';

    }

    if (this.MODEL.CC.UPDATE.TYPE == 'backup') {
      // super.log('Concurrent', 'Backup')();
      // バックアップ
      this.MODEL.CC.UPDATE.TYPE = 'current';
      // コード
      this.MODEL.CC.CODE.BEFORE = this.MODEL.EDITOR.getValue();
      // チェックサム
      this.MODEL.CC.HASH.BEFORE = MD5.getHash(this.MODEL.CC.CODE.BEFORE);

    } else if (this.MODEL.CC.UPDATE.TYPE == 'current') {
      // super.log('Concurrent', 'Current')();
      // カレント
      this.MODEL.CC.UPDATE.TYPE = 'backup';
      // コード
      this.MODEL.CC.CODE.CURRENT = this.MODEL.EDITOR.getValue();
      // チェックサム
      this.MODEL.CC.HASH.CURRENT = MD5.getHash(this.MODEL.CC.CODE.CURRENT);

    }
  }

  // ----------------------------------------------------------------
  // tick ajax

  connectConcurrent () {

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

      this.startTick();
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
        this.MODEL.ENCRYPTION = this.getAjaxData({ key: 'encryption' });
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
        if (this.MODEL.CLIP_MODE == 'private') {
          this.MODEL.ENCRYPTION = 'on';
        } else {
          this.MODEL.ENCRYPTION = 'off';
        }
        break;

      case this.MODEL.TYPE.SAVE:
        // SAVE
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
        if (this.MODEL.CLIP_MODE == 'private') {
          _model['encryption'] = 'on';
        } else {
          _model['encryption'] = 'off';
        }
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
