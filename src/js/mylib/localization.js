
// ----------------------------------------------------------------
// Localization

class Localization {
  constructor () {
    this.LANG = '';
    this.SELECTOR = 'select.localization';

    this.langs = new Language();
    this._setSelect();

    this.errors = {};

    const _LS_LANG = LocalStorage.getItem('l10n');
    if (_LS_LANG == null) {
      this.setLanguage(window.navigator.language);
    } else {
      this.setLanguage(_LS_LANG);
    }
  }

  setLanguage (
    lang = null
  ) {
    if (lang == null) {
      Log.error(arguments, 'language is null')();
      return;
    }
    Log.classKey('Localization', this.LANG, lang, Log.ARROW_INPUT)();
    let _exist = true;
    if (this.langs.hasOwnProperty(lang) == false) {
      _exist = false;
    } else if (Object.keys(this.langs[lang]).length <= 1) {
      _exist = false;
    }
    if (_exist == false) {
      lang = this.langs.default;
    }
    LocalStorage.setItem('l10n', lang);
    $(`${this.SELECTOR} option[value="${lang}"]`).prop('selected', true);
    this.LANG = lang;
  }

  _setSelect () {
    let langList = this.getLanguageList();
    for (let lang in langList) {
      if (lang == this.langs.default) {
        $(this.SELECTOR).append(
          `<option value="${lang}">${langList[lang]} (default)</option>`
        );
      } else {
        $(this.SELECTOR).append(
          `<option value="${lang}">${langList[lang]} (${lang})</option>`
        );
      }
    }
    $(document).on('change', this.SELECTOR, function () {
      if ($(this)[0].validity.valid) {
        LN.setLanguage($(this).val());
      }
    });
  }

  getLanguageList (
    existLimit = true
  ) {
    let result = {};
    for (let key of Object.keys(this.langs)) {
      if (!existLimit || Object.keys(this.langs[key]).length > 1) {
        if (typeof this.langs[key]['language_name'] == 'undefined') {
          // 言語名が定義されていないのでスキップ
          continue;
        }
        result[key] = this.langs[key]['language_name'];
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

  check (
    id = null
  ) {
    if (typeof this.langs[this.langs.default][id] == 'undefined') {
      return false;
    }
    return true;
  }

  get (
    id = null,
    model = null
  ) {
    if (typeof this.langs[this.LANG] == 'undefined') {
      // 現在の言語がない
      if (typeof this.langs[this.getShortLanguage()] == 'undefined') {
        // 省略言語がない
        // デフォルト言語で返す
        return this._get({ lang: this.langs.default, id: id, model: model });
      }

      // 省略言語がある
      if (typeof this.langs[this.getShortLanguage()][id] == 'undefined') {
        // 省略言語でIDがない
        // デフォルト言語で返す
        return this._get({ lang: this.langs.default, id: id, model: model });
      }

      // 省略言語でIDがある
      return this._get({ lang: this.getShortLanguage(), id: id, model: model });
    }

    // 現在の言語がある
    if (typeof this.langs[this.LANG][id] == 'undefined') {
      // 現在の言語でIDがない
      // デフォルト言語で返す
      return this._get({ lang: this.langs.default, id: id, model: model });
    }

    // 現在の言語でIDがある
    return this._get({ lang: this.LANG, id: id, model: model });
  }

  _get ({
    lang = this.LANG,
    id = null,
    model = null
  } = {}) {
    lang = Object.getArg(arguments, 0, 'String', lang);
    id = Object.getArg(arguments, 1, 'String', id);
    model = Object.getArg(arguments, 2, 'String', model);
    if (lang == null || id == null) {
      Log.error(arguments)();
      reutrn;
    }
    if (typeof this.langs[lang][id] == 'undefined') {
      this.errors[id] = id;
      Log.error(arguments, 'Undefined word. X(', `Please define: ${id}`, this.errors)();
      return `Undefined word. X( => [${id}]`;
    }
    if (model != null) {
      return this.langs[lang][id].format(model);
    }
    return this.langs[lang][id];
  }
}
