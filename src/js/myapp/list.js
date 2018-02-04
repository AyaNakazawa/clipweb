
// ----------------------------------------------------------------
// List Class

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
    this.LS.SEARCH_OP = 'list.search.op';
    this.LS.GROUP = 'list.group';
    this.LS.SORT = 'list.sort';
    this.LS.ORDER = 'list.order';

    // ----------------------------------------------------------------
    // 情報

    // 検索文字列
    this.SEARCH = '';
    this.SEARCH_OP = 'or';
    this.GROUP = 'type';
    this.SORT = 'name';
    this.ORDER = 'asc';

    // クリップ
    this.NAMED_CLIPS = {};
    this.DOWNLOADED_CLIPS = {};
    this.FILTERED_CLIPS = [];
    this.GROUPED_CLIPS = [];
    this.SORTED_CLIPS = [];

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.SEARCH = '#list-search-template';
    this.TEMPLATE.SEARCH_CLIP = '#list-search-clips-template';

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
    this.SELECTOR.SEARCH.REFRESH = '#list-search-refresh';
    this.SELECTOR.SEARCH.SEARCH = '#list-search-search';
    this.SELECTOR.SEARCH.SEARCH_OP = '#list-search-search-op';
    this.SELECTOR.SEARCH.SEARCH_CLEAR = '#list-search-search-clear';
    this.SELECTOR.SEARCH.GROUP = '#list-search-group';
    this.SELECTOR.SEARCH.SORT = '#list-search-sort';
    this.SELECTOR.SEARCH.SORT_ASC = '#list-search-sort-asc';
    this.SELECTOR.SEARCH.SORT_DESC = '#list-search-sort-desc';
    this.SELECTOR.SEARCH.CLIPS = '#list-search-clips';

    // グループ
    this.SELECTOR.SEARCH.GROUP_HEADER = '.list-search-group-header';
    this.SELECTOR.SEARCH.GROUP_CLIPS = '.list-search-group-clips';

    // クリップ
    this.SELECTOR.SEARCH.CLIP = '.list-search-clip';
    this.SELECTOR.SEARCH.CLIP_MAIN = '.list-search-clip-main';
    this.SELECTOR.SEARCH.CLIP_DETAIL = '.list-search-clip-detail';
    this.SELECTOR.SEARCH.CLIP_EDIT = '.list-search-clip-edit';
    this.SELECTOR.SEARCH.CLIP_VIEW = '.list-search-clip-view';
    this.SELECTOR.SEARCH.CLIP_DELETE = '.list-search-clip-delete';
    this.SELECTOR.SEARCH.CLIP_SETTING = '.list-search-clip-setting';
    this.SELECTOR.SEARCH.CLIP_SHARE = '.list-search-clip-share';
    this.SELECTOR.SEARCH.CLIP_CLOSE = '.list-search-clip-close';
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

  generateGroups () {
    super.log('Groups', 'Generate')();
    Log.line()();
    this.clear({ selector: this.MODEL.SELECTOR.SEARCH.CLIPS });
    this.append({
      selector: this.MODEL.SELECTOR.SEARCH.CLIPS,
      template: this.MODEL.TEMPLATE.SEARCH_CLIP,
      model: {
        filetypes: this.MODEL.MODE_LIST['modesByName'],
        group: this.MODEL.GROUP,
        sort: this.MODEL.SORT,
        clips: this.MODEL.GROUPED_CLIPS
      }
    });
    this.show({ selector: this.MODEL.SELECTOR.SEARCH.CLIPS });
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
    this.setOnGroups();
    this.setOnClips();
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
        CLIP.VIEW.move({ target: LIST.MODEL.SELECTOR.AREA, mode: this.MODEL.COMMON.TYPE.BEFORE });
        CLIP.open({ type: this.MODEL.TYPE.NEW });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.REFRESH}`,
      func: () => {
        super.log('Search', 'Refresh')();
        this.CONTROLLER.loadList();
      }
    });

    super.setOn({
      trigger: 'change',
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.GROUP}`,
      func: () => {
        super.log('Search', 'Group')();
        this.CONTROLLER.grouping();
      }
    });

    super.setOn({
      trigger: 'change',
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.SORT}`,
      func: () => {
        super.log('Search', 'Sort')();
        this.CONTROLLER.sorting();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.SORT_ASC}`,
      func: () => {
        super.log('Search', 'Sort Asc')();
        this.CONTROLLER.sorting({ type: 'asc' });
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.SORT_DESC}`,
      func: () => {
        super.log('Search', 'Sort Desc')();
        this.CONTROLLER.sorting({ type: 'desc' });
      }
    });

    super.setOn({
      trigger: 'change',
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.SEARCH_OP}`,
      func: () => {
        super.log('Search', 'OP')();
        this.CONTROLLER.filtering();
      }
    });

    super.setOn({
      trigger: 'change',
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.SEARCH}`,
      func: () => {
        super.log('Search', 'Filter')();
        this.CONTROLLER.filtering();
      }
    });

    super.setOn({
      selector: `${this.MODEL.SELECTOR.AREA} ${this.MODEL.SELECTOR.SEARCH.SEARCH_CLEAR}`,
      func: () => {
        super.log('Search', 'Filter Clear')();
        $(this.MODEL.SELECTOR.SEARCH.SEARCH).val('');
        this.CONTROLLER.filtering();
      }
    });
  }

  setOnGroups () {
    super.setOn({
      selector: this.MODEL.SELECTOR.SEARCH.GROUP_HEADER,
      func: function () {
        const _CLIPS = $(this).parent().find(LIST.MODEL.SELECTOR.SEARCH.GROUP_CLIPS);
        if (_CLIPS.is(':visible')) {
          LIST.VIEW.hide({
            selector: _CLIPS
          });
        } else {
          LIST.VIEW.show({
            selector: _CLIPS
          });
        }
      }
    });
  }

  setOnClips () {
    super.setOn({
      selector: this.MODEL.SELECTOR.SEARCH.CLIP_MAIN,
      func: function () {
        const _DETAIL = $(this).parent().find(LIST.MODEL.SELECTOR.SEARCH.CLIP_DETAIL);
        if (_DETAIL.is(':visible')) {
          LIST.VIEW.hide({
            selector: _DETAIL
          });
        } else {
          LIST.VIEW.show({
            selector: _DETAIL
          });
        }
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.SEARCH.CLIP_EDIT,
      func: function () {
        LIST.edit({ hash: $(this).parents(LIST.MODEL.SELECTOR.SEARCH.CLIP).find(LIST.MODEL.SELECTOR.SEARCH.CLIP_MAIN).attr('id') });
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.SEARCH.CLIP_VIEW,
      func: function () {
        LIST.edit({ hash: $(this).parents(LIST.MODEL.SELECTOR.SEARCH.CLIP).find(LIST.MODEL.SELECTOR.SEARCH.CLIP_MAIN).attr('id'), edit: false });
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.SEARCH.CLIP_DELETE,
      func: function () {
        LIST.delete({ hash: $(this).parents(LIST.MODEL.SELECTOR.SEARCH.CLIP).find(LIST.MODEL.SELECTOR.SEARCH.CLIP_MAIN).attr('id') });
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.SEARCH.CLIP_SETTING,
      func: function () {
        LIST.setting({ hash: $(this).parents(LIST.MODEL.SELECTOR.SEARCH.CLIP).find(LIST.MODEL.SELECTOR.SEARCH.CLIP_MAIN).attr('id') });
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.SEARCH.CLIP_SHARE,
      func: function () {
        LIST.share({ hash: $(this).parents(LIST.MODEL.SELECTOR.SEARCH.CLIP).find(LIST.MODEL.SELECTOR.SEARCH.CLIP_MAIN).attr('id') });
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.SEARCH.CLIP_CLOSE,
      func: function () {
        const _DETAIL = $(this).parents(LIST.MODEL.SELECTOR.SEARCH.CLIP_DETAIL);
        LIST.VIEW.hide({
          selector: _DETAIL
        });
      }
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
    // 前回の検索文字列
    if (LocalStorage.getItem(this.MODEL.LS.SEARCH) != null) {
      this.MODEL.SEARCH = LocalStorage.getItem(this.MODEL.LS.SEARCH);
    }
    // 前回の検索タイプ
    if (LocalStorage.getItem(this.MODEL.LS.SEARCH_OP) != null) {
      this.MODEL.SEARCH_OP = LocalStorage.getItem(this.MODEL.LS.SEARCH_OP);
    }
    // 前回のグループ
    if (LocalStorage.getItem(this.MODEL.LS.GROUP) != null) {
      this.MODEL.GROUP = LocalStorage.getItem(this.MODEL.LS.GROUP);
    }
    // 前回のソート
    if (LocalStorage.getItem(this.MODEL.LS.SORT) != null) {
      this.MODEL.SORT = LocalStorage.getItem(this.MODEL.LS.SORT);
    }
    // 前回のオーダー
    if (LocalStorage.getItem(this.MODEL.LS.ORDER) != null) {
      this.MODEL.ORDER = LocalStorage.getItem(this.MODEL.LS.ORDER);
    }
  }

  // ----------------------------------------------------------------
  // data shape

  grouping () {
    const _SELECTOR = this.MODEL.SELECTOR.SEARCH.GROUP;
    const _VALID = $(_SELECTOR)[0].validity.valid;

    if (_VALID) {
      this.MODEL.GROUP = $(`${_SELECTOR} option:selected`).val();
    } else {
      Log.error(arguments, 'select is invalid X(')();
      return this.MODEL.ERROR;
    }

    // Grouping
    super.log('Grouping', this.MODEL.GROUP)();
    LocalStorage.setItem(this.MODEL.LS.GROUP, this.MODEL.GROUP);

    super.log('Grouping...', this.MODEL.SORTED_CLIPS, Log.ARROW_INPUT)();
    this.MODEL.GROUPED_CLIPS = [];
    let _sortedClips = _.cloneDeep(this.MODEL.SORTED_CLIPS);

    let _groupSort = () => {
      this.MODEL.GROUPED_CLIPS.sort((a, b) => {
        const _KEY_A = a['key'].toLowerCase();
        const _KEY_B = b['key'].toLowerCase();

        if (_KEY_A > _KEY_B) {
          if (this.MODEL.SORT == this.MODEL.GROUP && this.MODEL.ORDER == 'desc') {
            return -1;
          }
          return 1;
        } else if (_KEY_A < _KEY_B) {
          if (this.MODEL.SORT == this.MODEL.GROUP && this.MODEL.ORDER == 'desc') {
            return 1;
          }
          return -1;
        }
        return 0;
      });
    };

    // グループ作成
    if (this.MODEL.GROUP == 'none') {
      // グループなし
      this.MODEL.GROUPED_CLIPS = [
        { name: LN.get('all'), key: '', clips: [] }
      ];
    } else if (this.MODEL.GROUP.indexOf('_at') >= 0) {
      // 日付系
      this.MODEL.GROUPED_CLIPS = [
        { name: LN.get('within_1_week'), key: '0', clips: [] },
        { name: LN.get('within_1_month'), key: '1', clips: [] },
        { name: LN.get('within_3_month'), key: '2', clips: [] },
        { name: LN.get('within_6_month'), key: '3', clips: [] },
        { name: LN.get('within_1_year'), key: '4', clips: [] },
        { name: LN.get('over_1_year_ago'), key: '5', clips: [] }
      ];
      _groupSort();
    } else if (this.MODEL.GROUP == 'tags') {
      // タグ
      let _add = null;
      let _add_tag = null;
      for (let index in _sortedClips) {
        for (let tag_index in _sortedClips[index]['clip_tags']) {
          _add = true;
          for (let group_index in this.MODEL.GROUPED_CLIPS) {
            if (this.MODEL.GROUPED_CLIPS[group_index]['name'] == _sortedClips[index]['clip_tags'][tag_index]) {
              _add = false;
              break;
            }
          }
          if (_add) {
            this.MODEL.GROUPED_CLIPS.push({ name: _sortedClips[index]['clip_tags'][tag_index], key: _sortedClips[index]['clip_tags'][tag_index], clips: [] });
          }
        }
      }
      _groupSort();
    } else if (this.MODEL.GROUP == 'type') {
      // ファイルタイプ
      let _add = null;
      for (let index in _sortedClips) {
        _add = true;
        for (let group_index in this.MODEL.GROUPED_CLIPS) {
          if (this.MODEL.GROUPED_CLIPS[group_index]['name'] == this.MODEL.MODE_LIST['modesByName'][_sortedClips[index][`clip_${this.MODEL.GROUP}`]]['caption']) {
            _add = false;
            break;
          }
        }
        if (_add) {
          this.MODEL.GROUPED_CLIPS.push({ name: this.MODEL.MODE_LIST['modesByName'][_sortedClips[index][`clip_${this.MODEL.GROUP}`]]['caption'], key: this.MODEL.MODE_LIST['modesByName'][_sortedClips[index][`clip_${this.MODEL.GROUP}`]]['caption'], clips: [] });
        }
      }
      _groupSort();
    } else {
      // その他
      let _add = null;
      for (let index in _sortedClips) {
        _add = true;
        for (let group_index in this.MODEL.GROUPED_CLIPS) {
          if (this.MODEL.GROUPED_CLIPS[group_index]['name'] == _sortedClips[index][`clip_${this.MODEL.GROUP}`]) {
            _add = false;
            break;
          }
        }
        if (_add) {
          if (this.MODEL.GROUP == 'owner_public' || this.MODEL.GROUP == 'clip_mode') {
            this.MODEL.GROUPED_CLIPS.push({ name: LN.get(_sortedClips[index][`clip_${this.MODEL.GROUP}`]), key: _sortedClips[index][`clip_${this.MODEL.GROUP}`], clips: [] });
          } else {
            this.MODEL.GROUPED_CLIPS.push({ name: _sortedClips[index][`clip_${this.MODEL.GROUP}`], key: _sortedClips[index][`clip_${this.MODEL.GROUP}`], clips: [] });
          }
        }
      }
      _groupSort();
    }

    // クリップをグループに追加
    if (this.MODEL.GROUP == 'none') {
      // グループなし
      for (let index in _sortedClips) {
        this.MODEL.GROUPED_CLIPS[0]['clips'].push(_sortedClips[index]);
      }
    } else if (this.MODEL.GROUP.indexOf('_at') >= 0) {
      // 日付系
      let _push = null;
      let _clipDate = null;
      let _nowDate = new Date();
      let _diffDate = [
        new Date().setDate(_nowDate.getDate() - 7),
        new Date().setMonth(_nowDate.getMonth() - 1),
        new Date().setMonth(_nowDate.getMonth() - 3),
        new Date().setMonth(_nowDate.getMonth() - 6),
        new Date().setFullYear(_nowDate.getFullYear() - 1),
      ];
      for (let index in _sortedClips) {
        _push = false;
        _clipDate = new Date(_sortedClips[index][`clip_${this.MODEL.GROUP}`]);
        _clipDate = new Date(_clipDate).setDate(_clipDate.getDate());
        for (let group_index in _diffDate) {
          if (_clipDate > _diffDate[group_index]) {
            if (this.MODEL.SORT == this.MODEL.GROUP && this.MODEL.ORDER == 'desc') {
              this.MODEL.GROUPED_CLIPS[5 - group_index]['clips'].push(_sortedClips[index]);
            } else {
              this.MODEL.GROUPED_CLIPS[group_index]['clips'].push(_sortedClips[index]);
            }
            _push = true;
            break;
          }
        }
        if (!_push) {
          this.MODEL.GROUPED_CLIPS[5]['clips'].push(_sortedClips[index]);
        }
      }
    } else if (this.MODEL.GROUP == 'tags') {
      // タグ
      for (let index in _sortedClips) {
        for (let group_index in this.MODEL.GROUPED_CLIPS) {
          if (_sortedClips[index][`clip_${this.MODEL.GROUP}`].includes(this.MODEL.GROUPED_CLIPS[group_index]['name'])) {
            this.MODEL.GROUPED_CLIPS[group_index]['clips'].push(_sortedClips[index]);
          }
        }
      }
    } else if (this.MODEL.GROUP == 'type') {
      // ファイルタイプ
      for (let index in _sortedClips) {
        for (let group_index in this.MODEL.GROUPED_CLIPS) {
          if (this.MODEL.GROUPED_CLIPS[group_index]['name'] == this.MODEL.MODE_LIST['modesByName'][_sortedClips[index][`clip_${this.MODEL.GROUP}`]]['caption']) {
            this.MODEL.GROUPED_CLIPS[group_index]['clips'].push(_sortedClips[index]);
            break;
          }
        }
      }
    } else {
      // その他
      for (let index in _sortedClips) {
        for (let group_index in this.MODEL.GROUPED_CLIPS) {
          if (this.MODEL.GROUP == 'owner_public' || this.MODEL.GROUP == 'clip_mode') {
            if (this.MODEL.GROUPED_CLIPS[group_index]['name'] == LN.get(_sortedClips[index][`clip_${this.MODEL.GROUP}`])) {
              this.MODEL.GROUPED_CLIPS[group_index]['clips'].push(_sortedClips[index]);
              break;
            }
          } else {
            if (this.MODEL.GROUPED_CLIPS[group_index]['name'] == _sortedClips[index][`clip_${this.MODEL.GROUP}`]) {
              this.MODEL.GROUPED_CLIPS[group_index]['clips'].push(_sortedClips[index]);
              break;
            }
          }
        }
      }
    }

    // クリップがないグループを削除
    let _length = this.MODEL.GROUPED_CLIPS.length;
    for (let index = 1; index <= _length; index ++) {
      if (this.MODEL.GROUPED_CLIPS[_length - index]['clips'].length == 0) {
        this.MODEL.GROUPED_CLIPS.splice(_length - index, 1);
      }
    }

    super.log('Grouped!', this.MODEL.GROUPED_CLIPS)();
    this.VIEW.generateGroups();
  }

  sorting ({
    type = null
  } = {}) {
    if (type == null) {
      type = 'asc';
    }
    const _SELECTOR = this.MODEL.SELECTOR.SEARCH.SORT;
    const _VALID = $(_SELECTOR)[0].validity.valid;

    if (_VALID) {
      this.MODEL.SORT = $(`${_SELECTOR} option:selected`).val();
    } else {
      Log.error(arguments, 'select is invalid X(')();
      return this.MODEL.ERROR;
    }

    switch (type) {
      case 'asc':
        this.MODEL.ORDER = 'asc';
        $(this.MODEL.SELECTOR.SEARCH.SORT_ASC).addClass('active');
        $(this.MODEL.SELECTOR.SEARCH.SORT_DESC).removeClass('active');
        break;
      case 'desc':
        this.MODEL.ORDER = 'desc';
        $(this.MODEL.SELECTOR.SEARCH.SORT_DESC).addClass('active');
        $(this.MODEL.SELECTOR.SEARCH.SORT_ASC).removeClass('active');
        break;
      default:
        Log.error(arguments, 'unknown type X(')();
    }

    // Sorting
    super.log('Sorting', `${this.MODEL.SORT} ${this.MODEL.ORDER.capitalize()}`)();
    LocalStorage.setItem(this.MODEL.LS.SORT, this.MODEL.SORT);
    LocalStorage.setItem(this.MODEL.LS.ORDER, this.MODEL.ORDER);

    super.log('Sorting...', this.MODEL.FILTERED_CLIPS, Log.ARROW_INPUT)();
    this.MODEL.SORTED_CLIPS = _.cloneDeep(this.MODEL.FILTERED_CLIPS);

    this.MODEL.SORTED_CLIPS.sort((a, b) => {
      const _KEY_A = a[`clip_${this.MODEL.SORT}`].mini();
      const _KEY_B = b[`clip_${this.MODEL.SORT}`].mini();

      if (_KEY_A > _KEY_B) {
        if (this.MODEL.ORDER == 'desc') {
          return -1;
        }
        return 1;
      } else if (_KEY_A < _KEY_B) {
        if (this.MODEL.ORDER == 'desc') {
          return 1;
        }
        return -1;
      }
      return 0;
    });

    // タグを配列に分割
    let _temp_tags = null;
    for (let index in this.MODEL.SORTED_CLIPS) {
      _temp_tags = this.MODEL.SORTED_CLIPS[index]['clip_tags'];
      _temp_tags = _temp_tags.replace(/\s+/g, ' ');
      _temp_tags = _temp_tags.replace(/,\s/g, ' ');
      _temp_tags = _temp_tags.split(' ');
      if (_temp_tags[0] == '' && _temp_tags.length == 1) {
        _temp_tags = [];
      }
      this.MODEL.SORTED_CLIPS[index]['clip_tags'] = _temp_tags;
    }

    super.log('Sorted!', this.MODEL.SORTED_CLIPS)();
    this.grouping();
  }

  filtering () {
    const _SELECTOR = this.MODEL.SELECTOR.SEARCH.SEARCH;
    const _SELECTOR_OP = this.MODEL.SELECTOR.SEARCH.SEARCH_OP;
    const _VALID = $(_SELECTOR)[0].validity.valid;

    if (!_VALID) {
      Log.error(arguments, 'input is invalid X(')();
      return this.MODEL.ERROR;
    }

    this.MODEL.SEARCH = $(_SELECTOR).val().trim();
    this.MODEL.SEARCH_OP = $(`${_SELECTOR_OP} option:selected`).val();

    // Filtering
    super.log('Filtering', `${this.MODEL.SEARCH_OP.toUpperCase()}: ${this.MODEL.SEARCH}`)();
    LocalStorage.setItem(this.MODEL.LS.SEARCH, this.MODEL.SEARCH);
    LocalStorage.setItem(this.MODEL.LS.SEARCH_OP, this.MODEL.SEARCH_OP);

    super.log('Filtering...', this.MODEL.DOWNLOADED_CLIPS, Log.ARROW_INPUT)();

    let _search = this.MODEL.SEARCH.replace(/\s+/, ' ');
    _search = _search.split(' ');
    let _searchItems = [];
    for (let index in _search) {
      _searchItems.push(_search[index]);
    }

    this.MODEL.FILTERED_CLIPS = [];
    let _clips = _.cloneDeep(this.MODEL.DOWNLOADED_CLIPS);
    let _add = null;
    let _temp = 0;
    let _temp2 = 0;
    let _skip = null;
    let _defineKeys = [
      'name',
      'type',
      'tags',
      'owner_public',
      'clip_mode',
      'created_at',
      'updated_at'
    ];
    let _item = null;
    for (let clipIndex of Object.keys(_clips)) {
      // クリップごとにまわす
      _skip = false;
      switch (this.MODEL.SEARCH_OP) {
        case 'or':
          _add = false;
          break;
        case 'and':
          _add = true;
          break;
        case 'nor':
          _add = false;
          break;
        case 'nand':
          _add = true;
          break;
        case 'xor':
          _add = false;
          break;
        default:
          Log.error(arguments, 'unknown search op', this.MODEL.SEARCH_OP)();
          return this.MODEL.ERROR;
      }
      for (let searchIndex of Object.keys(_searchItems)) {
        // 空白区切りの検索ごとにまわす
        let _searchItem = _searchItems[searchIndex].mini();
        _temp = 0;
        for (let keyIndex in _defineKeys) {
          // クリップの項目ごとにまわす
          if (_defineKeys[keyIndex] == 'type') {
            _item = this.MODEL.MODE_LIST['modesByName'][_clips[clipIndex]['clip_type']]['caption'].mini();
          } else {
            _item = _clips[clipIndex][`clip_${_defineKeys[keyIndex]}`].mini();
          }
          switch (this.MODEL.SEARCH_OP) {
            case 'or':
              if (_item.indexOf(_searchItem) >= 0) {
                _temp ++;
              } else if (_item.indexOf(_searchItem.replace(`${_defineKeys[keyIndex]}=`, '')) >= 0) {
                _temp ++;
              }
              break;
            case 'and':
              if (_item.indexOf(_searchItem) < 0) {
                _temp ++;
              }
              if (_item.indexOf(_searchItem.replace(`${_defineKeys[keyIndex]}=`, '')) < 0) {
                _temp ++;
              }
              break;
            case 'nor':
              if (_item.indexOf(_searchItem) < 0) {
                _temp ++;
              }
              if (_item.indexOf(_searchItem.replace(`${_defineKeys[keyIndex]}=`, '')) < 0) {
                _temp ++;
              }
              break;
            case 'nand':
              if (_item.indexOf(_searchItem) >= 0) {
                _temp ++;
              } else if (_item.indexOf(_searchItem.replace(`${_defineKeys[keyIndex]}=`, '')) >= 0) {
                _temp ++;
              }
              break;
            case 'xor':
              if (_item.indexOf(_searchItem) >= 0) {
                _temp ++;
              } else if (_item.indexOf(_searchItem.replace(`${_defineKeys[keyIndex]}=`, '')) >= 0) {
                _temp ++;
              }
              break;
            default:
              Log.error(arguments, 'unknown search op', this.MODEL.SEARCH_OP)();
              return this.MODEL.ERROR;
          }
        }
        switch (this.MODEL.SEARCH_OP) {
          case 'or':
            if (_temp > 0) {
              _add = true;
              _skip = true;
            }
            break;
          case 'and':
            if (_temp == _defineKeys.length * 2) {
              _add = false;
              _skip = true;
            }
            break;
          case 'nor':
            if (_temp == _defineKeys.length * 2) {
              _add = true;
              _skip = true;
            }
            break;
          case 'nand':
            if (_temp > 0) {
              _add = false;
              _skip = true;
            }
            break;
          case 'xor':
            if (_temp > 0) {
              _temp2 ++;
            }
            break;
          default:
            Log.error(arguments, 'unknown search op', this.MODEL.SEARCH_OP)();
            return this.MODEL.ERROR;
        }
        if (_skip) {
          break;
        }
      }
      if (this.MODEL.SEARCH_OP == 'xor') {
        if (_temp2 == 1) {
          _add = true;
        }
      }
      if (_add) {
        this.MODEL.FILTERED_CLIPS.push(_clips[clipIndex]);
      }
    }

    super.log('Filtered!', this.MODEL.FILTERED_CLIPS)();
    this.sorting({ type: this.MODEL.ORDER });
  }

  // ----------------------------------------------------------------
  // clip

  edit ({
    hash = null,
    edit = true
  } = {}) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Edit', Log.ARROW_INPUT)();
    CLIP.edit(hash, edit);
  }

  delete ({
    hash = null
  } = {}) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Delete', Log.ARROW_INPUT)();
    CLIP.delete(hash);
  }

  setting ({
    hash = null
  } = {}) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Setting', Log.ARROW_INPUT)();
    CLIP.connectSetting(this.MODEL.TYPE.LOAD, hash);
  }

  share ({
    hash = null
  } = {}) {
    if (hash == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }
    super.log(hash.substr(0, 14), 'Share', Log.ARROW_INPUT)();
    CLIP.share(hash);
  }

  // ----------------------------------------------------------------
  // ajax

  loadList () {
    const _TYPE = this.MODEL.TYPE.SEARCH;
    const _FAILED = 'failed_to_get_clip_list';
    this.MODEL.STATUS.GET = false;

    this.EVENT.setLoading({
      type: _TYPE,
      loading: false,
      functionSuccess: () => {
        this.checkSuccess({
          errorMessage: _FAILED,
          check: [
            'clips',
            'owners'
          ],
          functionSuccess: () => {
            this.MODEL.STATUS.GET = true;
            this.CONTROLLER.applyReceiveModel(_TYPE);
            this.open({
              type: _TYPE,
              model: {
                alertMessage:
                  View.element({ content: LN.get('clip_list_got') }),
                scroll: false
              },
            });
            this.filtering();
          }
        });
      },
      connectionErrorOpenType: _TYPE,
      connectionErrorModel: super.getErrorModel('server', _FAILED)
    });

    // Post
    this.post({
      type: _TYPE,
      data: this.getSendModel(_TYPE)
    });
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
      case this.MODEL.TYPE.SEARCH:
        // SEARCH
        _result = {
          search: this.MODEL.SEARCH,
          group: this.MODEL.GROUP,
          sort: this.MODEL.SORT,
          order: this.MODEL.ORDER,
          op: this.MODEL.SEARCH_OP
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
      case this.MODEL.TYPE.SEARCH:
        // SEARCH
        this.MODEL.DOWNLOADED_CLIPS = this.getAjaxData({ key: 'clips' });
        this.MODEL.DOWNLOADED_OWNERS = this.getAjaxData({ key: 'owners' });

        // オーナーを格納
        this.MODEL.NAMED_CLIPS = {};
        for (let index in this.MODEL.DOWNLOADED_CLIPS) {
          if (this.MODEL.DOWNLOADED_CLIPS[index]['clip_owner_public'] == 'public' || this.MODEL.DOWNLOADED_CLIPS[index]['clip_owner_hash'] == USER.MODEL.HASH.USER) {
            this.MODEL.DOWNLOADED_CLIPS[index]['clip_owner'] = LN.get('unknown');
            for (let owner_index in this.MODEL.DOWNLOADED_OWNERS) {
              if (this.MODEL.DOWNLOADED_CLIPS[index]['clip_owner_hash'] == this.MODEL.DOWNLOADED_OWNERS[owner_index]['hash']) {
                this.MODEL.DOWNLOADED_CLIPS[index]['clip_owner'] = this.MODEL.DOWNLOADED_OWNERS[owner_index]['username'];
              }
            }
          } else {
            this.MODEL.DOWNLOADED_CLIPS[index]['clip_owner'] = LN.get('private');
          }
          this.MODEL.NAMED_CLIPS[this.MODEL.DOWNLOADED_CLIPS[index]['clip_hash']] = _.cloneDeep(this.MODEL.DOWNLOADED_CLIPS[index]);
        }
        super.log('Named!', this.MODEL.NAMED_CLIPS)();

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
    _model['hash'] = USER.MODEL.HASH.USER;
    _model['password_hash'] = USER.MODEL.HASH.PASSWORD;
    switch (type) {
      case this.MODEL.TYPE.SEARCH:
        // SEARCH
        break;

      default:
        Log.error(arguments, 'unknown type X(')();
        return this.MODEL.ERROR;
    }
    return _model;
  }
}
