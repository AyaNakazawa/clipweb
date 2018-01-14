
// ----------------------------------------------------------------
// Localization

class Localization {
  constructor () {
    this.LANG = 'default';
    this.SELECTOR = 'select.localization';

    this.langs = new Language();
    this._setSelect();

    const _LS_LANG = LocalStorage.getItem('l10n');
    if (_LS_LANG == null) {
      this.setLanguage(window.navigator.language);
    } else {
      this.setLanguage(_LS_LANG);
    }
  }

  setLanguage (lang = null) {
    if (lang == null) {
      Log.error(arguments, 'language is null')();
      return;
    }
    Log.classKey('Localization', this.LANG, lang, Log.ARROW_INPUT)();
    LocalStorage.setItem('l10n', lang);
    $(`${this.SELECTOR} option[value="${lang}"]`).prop('selected', true);
    this.LANG = lang;
  }

  _setSelect () {
    let langList = this.getLanguageList();
    for (let lang in langList) {
      $(this.SELECTOR).append(
        `<option value="${lang}">${langList[lang]} (${lang})</option>`
      );
    }
    $(document).on('change', this.SELECTOR, function () {
      if ($(this)[0].validity.valid) {
        LN.setLanguage($(this).val());
      }
    });
  }

  getLanguageList (existLimit = true) {
    let result = {};
    for (let key of Object.keys(this.langs)) {
      if (!existLimit || Object.keys(this.langs[key]).length > 1) {
        if (typeof this.langs[key]['name'] == 'undefined') {
          // 言語名が定義されていないのでエラー
          Log.error(arguments, `lang name is not defined: ${key}`, this.langs[key])();
          return;
        }
        if (key == 'default' || key != 'default' && this.langs[key]['name'] != this.langs.default['name']) {
          result[key] = this.langs[key]['name'];
        }
      }
    }
    return result;
  }

  getShortLanguage () {
    let result = this.LANG;
    if (result.indexOf('-') > 0) {
      result = result.slice(0, result.indexOf('-'));
    }
    return result;
  }

  check (id = null) {
    if (typeof this.langs.default[id] == 'undefined') {
      return false;
    }
    return true;
  }

  get (id = null, model = null) {
    if (typeof this.langs[this.LANG] == 'undefined') {
      // 現在の言語がない
      if (typeof this.langs[this.getShortLanguage()] == 'undefined') {
        // 省略言語がない
        if (typeof this.langs.default[id] == 'undefined') {
          // デフォルト言語でIDがない
          // 定義されていないのでエラー
          Log.error(arguments, `unknown lang id: ${id}`, 'Do you really define it?')();
          return;
        }

        // デフォルト言語でIDがある
        if (model != null) {
          return this.langs.default[id].format(model);
        }
        return this.langs.default[id];
      }

      // 省略言語がある
      if (typeof this.langs[this.getShortLanguage()][id] == 'undefined') {
        // 省略言語でIDがない
        // デフォルト言語で返す
        if (model != null) {
          return this.langs.default[id].format(model);
        }
        return this.langs.default[id];
      }

      // 省略言語でIDがある
      if (model != null) {
        return this.langs[this.getShortLanguage()][id].format(model);
      }
      return this.langs[this.getShortLanguage()][id];
    }

    // 現在の言語がある
    if (typeof this.langs[this.LANG][id] == 'undefined') {
      // 現在の言語でIDがない
      // デフォルト言語で返す
      if (model != null) {
        return this.langs.default[id].format(model);
      }

      return this.langs.default[id];
    }

    // 現在の言語でIDがある
    if (model != null) {
      return this.langs[this.LANG][id].format(model);
    }

    return this.langs[this.LANG][id];
  }
}
