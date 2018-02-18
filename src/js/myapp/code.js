
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
    this.STATUS.HISTORY = false;
    this.STATUS.LOAD = false;
    this.STATUS.OPEN = false;
    this.STATUS.SEND = false;
    this.STATUS.RECEIVE = false;
    this.STATUS.SYNC = false;
    this.STATUS.PATCHED = false;
    this.STATUS.CONNECTING = false;
    this.STATUS.CHAT = false;
    this.STATUS.CHAT_USER = false;

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
    this.SYNC = {};

    // ID
    this.SYNC.ID = null;

    // 日時情報
    this.SYNC.DATE = {};
    this.SYNC.DATE.LAST = null;
    this.SYNC.DATE.PATCHED = null;

    // パッチ
    this.SYNC.PATCH = {};
    this.SYNC.PATCH.CURRENT = null;
    this.SYNC.PATCH.RECEIVE = null;

    // コード本体
    this.SYNC.CODE = {};
    this.SYNC.CODE.BACKUP = null;
    this.SYNC.CODE.CONNECTING = null;
    this.SYNC.CODE.CURRENT = null;

    // チェックサム
    this.SYNC.HASH = {};
    this.SYNC.HASH.BACKUP = null;
    this.SYNC.HASH.CONNECTING = null;
    this.SYNC.HASH.CURRENT = null;

    // 同期メンバー
    this.SYNC.MEMBER = null;

    // キー判定
    this.SYNC.KEY = {};
    this.SYNC.KEY.CURSOR = [37, 38, 39, 40];
    this.SYNC.KEY.DELETE = [8, 46];
    this.SYNC.KEY.CUT = [88];
    this.SYNC.KEY.TYPE = {};
    this.SYNC.KEY.TYPE.CURSOR = 'cursor';
    this.SYNC.KEY.TYPE.DELETE = 'delete';
    this.SYNC.KEY.TYPE.INPUT = 'input';
    this.SYNC.KEY.BACKUP = null;

    // ----------------------------------------------------------------
    // 同時編集
    this.CHAT = {};

    // 送信メッセージ
    this.CHAT.MESSAGE = null;

    // 受信メッセージ
    this.CHAT.RECEIVE = null;

    // 最終受信日時
    this.CHAT.DATE = new Date().formatString();

    // ----------------------------------------------------------------
    // TICK

    this.TICK = {};

    this.TICK = {};
    this.TICK.INIT = 1.5;
    this.TICK.MAX = 10;
    this.TICK.TIMES = 1.25;
    this.TICK.INTERVAL = 250;
    this.TICK.LIMIT = 10 * 60 * (1000 / this.TICK.INTERVAL);

    this.TICK.TOTAL = null;
    this.TICK.COUNT = null;
    this.TICK.CURRENT = null;

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.EDITOR = '#code-editor-template';
    this.TEMPLATE.CHAT = '#chat-content-template';
    this.TEMPLATE.USERS = '#chat-user-template';

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
    this.SELECTOR.EDITOR.STOP = '#code-editor-stop';
    this.SELECTOR.EDITOR.CHAT = '#code-editor-chat';
    this.SELECTOR.EDITOR.SHARE = '#code-editor-share';
    this.SELECTOR.EDITOR.DELETE = '#code-editor-delete';
    this.SELECTOR.EDITOR.SETTING = '#code-editor-setting';

    // チャット
    this.SELECTOR.CHAT = {};
    this.SELECTOR.CHAT.AREA = '#code-chat-area';
    this.SELECTOR.CHAT.CHAT_AREA = '#code-chat-chat-area';
    this.SELECTOR.CHAT.USERS_AREA = '#code-chat-users-area';
    this.SELECTOR.CHAT.USERS = '#code-chat-users';
    this.SELECTOR.CHAT.INPUT = '#code-chat-input';
    this.SELECTOR.CHAT.SEND = '#code-chat-send';
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

  addChat (time = null, username = null, message = null) {
    if (this.MODEL.STATUS.CHAT) {
      if (time == null || username == null || message == null) {
        Log.error(arguments)();
        return this.MODEL.ERROR;
      }
      super.append({
        selector: this.MODEL.SELECTOR.CHAT.CHAT_AREA,
        template: this.MODEL.TEMPLATE.CHAT,
        model: {
          time: time,
          username: username,
          message: message
        }
      });
    }
  }

  updateUsers () {
    if (this.MODEL.STATUS.CHAT_USER) {
      super.clear({
        selector: this.MODEL.SELECTOR.CHAT.USERS_AREA,
        type: 'skip'
      });
      for (let user of this.MODEL.CHAT.MEMBER) {
        super.log(user)();
        super.append({
          selector: this.MODEL.SELECTOR.CHAT.USERS_AREA,
          template: this.MODEL.TEMPLATE.USERS,
          model: {
            username: user['user_name'],
            avatar: user['user_gravatar']
          }
        });
      }
    }
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
        if (this.MODEL.HASH == CLIP.MODEL.HASH) {
          CLIP.reload();
        }
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
      selector: this.MODEL.SELECTOR.EDITOR.STOP,
      func: () => {
        super.log('Editor', 'Stop')();
        this.CONTROLLER.stopTick();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.CHAT,
      func: () => {
        this.CONTROLLER.switchChat();
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
        if (this.MODEL.SYNC.KEY.BACKUP != this.MODEL.SYNC.KEY.TYPE.CURSOR) {
          this.MODEL.SYNC.KEY.BACKUP = this.MODEL.SYNC.KEY.TYPE.CURSOR;
          this.CONTROLLER.accelerateTick();
        }
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.EDITOR,
      trigger: 'click',
      func: (event) => {
        this.CONTROLLER.accelerateTick();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.EDITOR.EDITOR,
      trigger: 'keyup',
      func: (event) => {
        if (this.MODEL.SYNC.KEY.CURSOR.includes(event.keyCode)) {
          this.CONTROLLER.accelerateTick();
          this.MODEL.SYNC.KEY.BACKUP = this.MODEL.SYNC.KEY.TYPE.CURSOR;
        } else if (this.MODEL.SYNC.KEY.DELETE.includes(event.keyCode)) {
          if (this.MODEL.SYNC.KEY.BACKUP != this.MODEL.SYNC.KEY.TYPE.DELETE) {
            this.MODEL.SYNC.KEY.BACKUP = this.MODEL.SYNC.KEY.TYPE.DELETE;
            this.CONTROLLER.accelerateTick();
          }
        } else if (this.MODEL.SYNC.KEY.CUT.includes(event.keyCode) && event.ctrlKey) {
          if (this.MODEL.SYNC.KEY.BACKUP != this.MODEL.SYNC.KEY.TYPE.DELETE) {
            this.MODEL.SYNC.KEY.BACKUP = this.MODEL.SYNC.KEY.TYPE.DELETE;
            this.CONTROLLER.accelerateTick();
          }
        } else {
          if (this.MODEL.SYNC.KEY.BACKUP != this.MODEL.SYNC.KEY.TYPE.INPUT) {
            this.MODEL.SYNC.KEY.BACKUP = this.MODEL.SYNC.KEY.TYPE.INPUT;
            this.CONTROLLER.accelerateTick();
          }
        }
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.CHAT.USERS,
      func: () => {
        this.CONTROLLER.switchChatUser();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.CHAT.INPUT,
      trigger: 'keydown',
      func: (event) => {
        if (event.keyCode == 13) {
          this.CONTROLLER.sendMessage();
        }
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.CHAT.SEND,
      func: () => {
        this.CONTROLLER.sendMessage();
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
    if (this.MODEL.CODE_HASH != null) {
      this.MODEL.STATUS.HISTORY = true;
    } else {
      this.MODEL.STATUS.HISTORY = false;
    }
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
  // tick

  startTick () {
    // 同時編集起動
    if (this.MODEL.ENCRYPTION == 'on') {
      // 暗号はサポートしていない
      super.log('Tick', 'No support for encryption.', Log.ARROW_INPUT)();
    } else if (this.MODEL.ENCRYPTION == 'off') {
      // 暗号化していないとき
      super.log('Tick', 'Start', Log.ARROW_INPUT)();
      $(this.MODEL.SELECTOR.EDITOR.STOP).removeClass('active');

      // 初期化
      this.MODEL.STATUS.OPEN = true;
      this.MODEL.SYNC.ID = 0;
      this.MODEL.SYNC.KEY.BACKUP = this.MODEL.SYNC.KEY.TYPE.CURSOR;
      this.MODEL.TICK.TOTAL = 0;
      this.MODEL.TICK.COUNT = 0;
      this.MODEL.TICK.CURRENT = this.MODEL.TICK.INIT;

      // コード
      this.MODEL.SYNC.CODE.CURRENT = this.MODEL.EDITOR.getValue();
      this.MODEL.SYNC.CODE.BEFORE = this.MODEL.SYNC.CODE.CURRENT;
      // チェックサム
      this.MODEL.SYNC.HASH.CURRENT = MD5.getHash(this.MODEL.SYNC.CODE.CURRENT);
      this.MODEL.SYNC.HASH.BEFORE = this.MODEL.SYNC.HASH.CURRENT;

      // 起動
      this.loopTick();
    }
  }

  exitTick () {
    // 同時編集終了
    super.log('Tick', 'Exit', Log.ARROW_INPUT)();
    $(this.MODEL.SELECTOR.EDITOR.STOP).addClass('active');
    this.MODEL.STATUS.OPEN = false;
  }

  stopTick () {
    // 一時停止
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

  accelerateTick () {
    super.log('Tick', 'Accelerate')();
    this.MODEL.TICK.CURRENT /= this.MODEL.TICK.TIMES;
    if (this.MODEL.TICK.CURRENT < this.MODEL.TICK.INIT) {
      this.MODEL.TICK.CURRENT = this.MODEL.TICK.INIT;
    }
    this.MODEL.TICK.COUNT = this.MODEL.TICK.CURRENT;
  }

  tick () {
    // ID更新
    this.MODEL.SYNC.ID ++;

    // Tick
    super.log(
      `Tick: ${this.MODEL.SYNC.ID}`,
      `${Math.round(this.MODEL.TICK.CURRENT * 100) / 100} tick (${Math.round(this.MODEL.TICK.INTERVAL * this.MODEL.TICK.CURRENT).toLocaleString()}ms)`
    )();

    // 前回値
    this.MODEL.SYNC.CODE.BEFORE = this.MODEL.SYNC.CODE.CURRENT;
    this.MODEL.SYNC.HASH.BEFORE = this.MODEL.SYNC.HASH.CURRENT;

    // カレント - アップデート
    this.MODEL.SYNC.CODE.CURRENT = this.MODEL.EDITOR.getValue();
    this.MODEL.SYNC.HASH.CURRENT = SHA256.getHash(this.MODEL.SYNC.CODE.CURRENT);

    // パッチ
    this.MODEL.SYNC.PATCH.CURRENT = JsDiff.createPatch(
      'Current',
      this.MODEL.SYNC.CODE.BEFORE,
      this.MODEL.SYNC.CODE.CURRENT
    );

    // ステータスを初期化
    this.MODEL.STATUS.SEND = false;

    // 編集送信判定
    if (this.MODEL.STATUS.RECEIVE == false) {
      if (this.MODEL.SYNC.PATCH.CURRENT.getRows() > 5) {
        this.MODEL.STATUS.SEND = true;
      }
    }

    // サーバに送信
    this.connectSync(() => {
      // コールバック

      // 最新コードがあればそっち開く
      if (this.MODEL.SYNC.DATE.SAVE > this.MODEL.SYNC.DATE.LAST) {
        this.loadCode();
      }

      // 編集を送信
      if (this.MODEL.STATUS.SEND) {
        super.log('Tick', 'Send')();
        this.MODEL.TICK.TOTAL = 0;
        this.MODEL.TICK.CURRENT = this.MODEL.TICK.INIT;
      }

      // 編集を受信
      if (this.MODEL.STATUS.RECEIVE) {
        super.log('Tick', 'Receive')();
        this.MODEL.TICK.TOTAL = 0;
        this.MODEL.TICK.CURRENT = this.MODEL.TICK.INIT;
      }

      // 編集なし
      if (this.MODEL.STATUS.SEND == false && this.MODEL.STATUS.RECEIVE == false){
        // 時間を増やす
        this.MODEL.TICK.TOTAL += this.MODEL.TICK.CURRENT;
        this.MODEL.TICK.CURRENT *= this.MODEL.TICK.TIMES;
        if (this.MODEL.TICK.CURRENT > this.MODEL.TICK.MAX) {
          this.MODEL.TICK.CURRENT = this.MODEL.TICK.MAX;
        }
        // 一定時間編集なしが続いたら一時停止
        if (this.MODEL.TICK.TOTAL > this.MODEL.TICK.LIMIT) {
          this.stopTick();
        }
      }
    });
  }

  loopTick () {
    // 履歴から開いてる or 開いていない
    if (this.MODEL.STATUS.HISTORY || this.MODEL.STATUS.OPEN == false) {
      return;
    }

    if (this.MODEL.TICK.COUNT >= this.MODEL.TICK.CURRENT && this.MODEL.STATUS.CONNECTING == false) {
      this.MODEL.TICK.COUNT = 0;
      this.tick();
    }
    // 次のコール
    setTimeout(
      () => {
        this.MODEL.TICK.COUNT ++;
        this.loopTick();
      },
      this.MODEL.TICK.INTERVAL
    );
  }

  // ----------------------------------------------------------------
  // tick ajax

  connectSync (callback = () => {}) {
    const _TYPE = this.MODEL.TYPE.SYNC;
    const _FAILED = 'failed_to_sync_code';

    // 接続開始
    this.MODEL.STATUS.CONNECTING = true;

    this.EVENT.setLoading({
      type: _TYPE,
      loading: false,
      errorMessage: _FAILED,
      errorType: 'toast',
      check: [
        'sync',
        'patches',
        'member'
      ],
      functionSuccess: () => {
        this.applyReceiveModel(_TYPE);

        // ステータスを初期化
        this.MODEL.STATUS.RECEIVE = false;
        this.MODEL.STATUS.PATCHED = false;

        // 送信時
        if (this.MODEL.STATUS.SEND) {
          this.MODEL.SYNC.DATE.LAST = this.MODEL.SYNC.DATE.PATCHED;
        }

        if (this.MODEL.SYNC.PATCH.RECEIVE.length > 0) {
          super.log('Receive')();
          this.MODEL.STATUS.RECEIVE = true;
          this.MODEL.SYNC.DATE.LAST = this.MODEL.SYNC.PATCH.RECEIVE[this.MODEL.SYNC.PATCH.RECEIVE.length - 1]['created_at'];

          let _temp_code = null;
          for (let index = 0; index < this.MODEL.SYNC.PATCH.RECEIVE.length; index ++) {
            // super.log('before code', this.MODEL.SYNC.CODE.BEFORE)();
            // super.log('patch', this.MODEL.SYNC.PATCH.RECEIVE[index]['patch'])();
            _temp_code = JsDiff.applyPatch(
              this.MODEL.SYNC.CODE.BEFORE,
              this.MODEL.SYNC.PATCH.RECEIVE[index]['patch']
            );
            if (_temp_code != false) {
              this.MODEL.STATUS.PATCHED = true;
              this.MODEL.SYNC.CODE.BEFORE = _temp_code;
              // super.log('patch', 'OK')();
            } else {
              // super.log('patch', 'NG')();
            }
          }
          if (this.MODEL.STATUS.PATCHED) {
            let _cursor = this.MODEL.EDITOR.getCursorPositionScreen();
            this.MODEL.SYNC.CODE.CURRENT = this.MODEL.SYNC.CODE.BEFORE;
            this.MODEL.EDITOR.setValue(this.MODEL.SYNC.CODE.BEFORE);
            this.MODEL.EDITOR.clearSelection();
            this.MODEL.EDITOR.moveCursorToPosition(_cursor);
            // super.log('SET', this.MODEL.SYNC.CODE.BEFORE)();
          }
        }

      },
      connectionErrorToastModel: super.getErrorModel('toast/server', _FAILED),
      connectionCompletefunction: () => {
        // コールバック
        callback();

        // 接続終了
        this.MODEL.STATUS.CONNECTING = false;
      }
    });

    // Post
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
  }

  // ----------------------------------------------------------------
  // chat

  switchChat () {
    if ($(this.MODEL.SELECTOR.CHAT.AREA).is(':visible')) {
      super.log('Editor', 'Close Chat')();
      this.MODEL.STATUS.CHAT = false;
      $(this.MODEL.SELECTOR.EDITOR.CHAT).removeClass('active');
      this.VIEW.hide({
        selector: $(this.MODEL.SELECTOR.CHAT.AREA)
      });
    } else {
      super.log('Editor', 'Open Chat')();
      this.MODEL.STATUS.CHAT = true;
      $(this.MODEL.SELECTOR.EDITOR.CHAT).addClass('active');
      this.VIEW.show({
        selector: $(this.MODEL.SELECTOR.CHAT.AREA)
      });
    }
  }

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
      if (this.MODEL.LOG.CRYPTO) {
        super.log(this.MODEL.DL_DATA)();
        super.log('↓')();
        super.log(this.MODEL.DATA)();
      }
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
      if (this.MODEL.LOG.CRYPTO) {
        super.log(this.MODEL.DATA)();
        super.log('↓')();
        super.log(this.MODEL.SEND_DATA)();
      }
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
        this.MODEL.SYNC.DATE.LAST = this.getAjaxData({ key: 'code_update' });
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
        this.MODEL.SYNC.DATE.LAST = this.getAjaxData({ key: 'save_time' });
        break;

      case this.MODEL.TYPE.SYNC:
        // SYNC
        this.MODEL.SYNC.PATCH.RECEIVE = this.getAjaxData({ key: 'patches' });
        this.MODEL.SYNC.DATE.PATCHED = this.getAjaxData({ key: 'patched_time' });
        this.MODEL.SYNC.DATE.SAVE = this.getAjaxData({ key: 'last_save' });
        this.MODEL.SYNC.MEMBER = this.getAjaxData({ key: 'member' });
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

      case this.MODEL.TYPE.SYNC:
        // SYNC
        _model['base_sync_hash'] = this.MODEL.SYNC.HASH.BEFORE;
        _model['last_patched'] = this.MODEL.SYNC.DATE.LAST;
        if (this.MODEL.STATUS.SEND) {
          _model['new_sync_hash'] = this.MODEL.SYNC.HASH.CURRENT;
          _model['sync_patch'] = this.MODEL.SYNC.PATCH.CURRENT;
        }
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return this.MODEL.ERROR;
    }
    return _model;
  }

}
