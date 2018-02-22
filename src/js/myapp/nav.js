
// ----------------------------------------------------------------
// Nav Class

// ----------------------------------------------------------------
// Model

class NavModel extends ClipwebModel {
  constructor (
    initSetting = {
      NAME: 'Nav Object',
    }
  ) {
    super(initSetting);

    // ----------------------------------------------------------------
    // 識別子
    this.KEY = 'nav';

    // ----------------------------------------------------------------
    // テンプレート
    this.TEMPLATE.LICENSE = '#license-template';
    this.TEMPLATE.FEEDBACK = '#feedback-template';
    this.TEMPLATE.TERMS = '#terms-template';
    this.TEMPLATE.PRIVACY = '#privacy-template';

    // ----------------------------------------------------------------
    // セレクタ
    this.LS.TERMS = 'clipweb.visit';

    // ----------------------------------------------------------------
    // セレクタ
    this.SELECTOR = {};

    // エリア
    this.SELECTOR.AREA = {};
    this.SELECTOR.AREA.NAV = '#navbar';
    this.SELECTOR.AREA.USER = 'user-area';
    this.SELECTOR.AREA.LIST = 'list-area';
    this.SELECTOR.AREA.CLIP = 'clip-area';

    // ナビゲーション
    this.SELECTOR.NAV = {};
    this.SELECTOR.NAV.BAR = '.navbar-nav';
    this.SELECTOR.NAV.LOGIN = 'nav-login';
    this.SELECTOR.NAV.REGISTER = 'nav-register';
    this.SELECTOR.NAV.SETTING = 'nav-user';
    this.SELECTOR.NAV.LOGOUT = 'nav-logout';
    this.SELECTOR.NAV.LIST = 'nav-list';
    this.SELECTOR.NAV.NEW = 'nav-new';
    this.SELECTOR.NAV.HELP = 'nav-help';
    this.SELECTOR.NAV.FEEDBACK = 'nav-feedback';

    this.SELECTOR.NAV.SEARCH = {};
    this.SELECTOR.NAV.SEARCH.TEXT = 'nav-seacrh-text';
    this.SELECTOR.NAV.SEARCH.BUTTON = 'nav-seacrh-button';

    // フィードバック
    this.SELECTOR.FEEDBACK = {};
    this.SELECTOR.FEEDBACK.CONTENT = '#feedback-content';
    this.SELECTOR.FEEDBACK.TERMS = '#feedback-terms';
    this.SELECTOR.FEEDBACK.PRIVACY = '#feedback-privacy';
    this.SELECTOR.FEEDBACK.TODO = '#feedback-todo';

    // ヘッダー
    this.SELECTOR.HEADER = {};
    this.SELECTOR.HEADER.CLEAR = '#header-clear';

    // フッター
    this.SELECTOR.FOOTER = {};
    this.SELECTOR.FOOTER.LICENSE = '#footer-license';
    this.SELECTOR.FOOTER.CLIPWEB = '#footer-clipweb';
    this.SELECTOR.FOOTER.YEAR_NOW = '#footer-year-now';

  }
}

// ----------------------------------------------------------------
// View

class NavView extends ClipwebView {
  constructor (
    initSetting = {
      NAME: 'Nav View'
    }
  ) {
    super(initSetting);
  }

  clearNavItem () {
    $(this.MODEL.SELECTOR.AREA.NAV).empty();
    $(this.MODEL.SELECTOR.AREA.NAV).append('<ul class="navbar-nav col-md-8"></ul>');
  }

  addNavItem ({
    id = null,
    name = null,
    type = 'append',
    fa = null
  } = {}) {
    if (id == null || name == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }

    if ($(`${this.MODEL.SELECTOR.NAV.BAR} #${id}`).length > 0) {
      this.removeNavItem({
        id: this.MODEL.SELECTOR.NAV.LOGIN
      });
    }

    let _icon = '';
    if (fa != null) {
      _icon = ` <i class="${fa}"></i>`;
    }

    const _element = `<li class="nav-item"><a class="nav-link"id="${id}">${name}${_icon}</a></li>`;

    if (type == 'prepend') {
      $(this.MODEL.SELECTOR.NAV.BAR).prepend(_element);
    } else {
      $(this.MODEL.SELECTOR.NAV.BAR).append(_element);
    }
  }

  removeNavItem ({
    id = null
  } = {}) {
    if (id == null) {
      Log.error(arguments)();
      return this.MODEL.ERROR;
    }

    $(`${this.MODEL.SELECTOR.NAV.BAR} #${id}`).each((_index, _element) => {
      $(_element).parent().remove();
    });
  }

  addNavSearch () {
    $(this.MODEL.SELECTOR.AREA.NAV).append(`<div class="col-md-4 nav-seacrh"><div class="input-group"><input class="form-control" id="${this.MODEL.SELECTOR.NAV.SEARCH.TEXT}" placeholder="${LN.get('search')}"><span class="input-group-append"><button class="btn btn-outline-info" id="${this.MODEL.SELECTOR.NAV.SEARCH.BUTTON}"><i class="fas fa-search"></i></button></span></div></div>`);
  }

  generateNotLogin () {
    this.clearNavItem();

    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.LOGIN,
      name: LN.get('login')
    });
    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.REGISTER,
      name: LN.get('register')
    });
    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.FEEDBACK,
      name: LN.get('report')
    });
    // this.addNavItem({
    //   id: this.MODEL.SELECTOR.NAV.HELP,
    //   name: LN.get('help')
    // });
  }

  generateLogined () {
    this.clearNavItem();
    this.addNavSearch();

    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.LIST,
      name: LN.get('clips')
    });
    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.NEW,
      name: LN.get('new')
    });
    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.SETTING,
      name: LN.get('user')
    });
    // this.addNavItem({
    //   id: this.MODEL.SELECTOR.NAV.HELP,
    //   name: LN.get('help')
    // });
    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.LOGOUT,
      name: LN.get('logout')
    });
    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.FEEDBACK,
      name: LN.get('report')
    });
  }

  writeFooter () {
    const RESULT = `-${new Date().getFullYear()}`;
    $(this.MODEL.SELECTOR.FOOTER.YEAR_NOW).text(RESULT);
  }
}

// ----------------------------------------------------------------
// Event

class NavEvent extends ClipwebEvent {
  constructor (
    initSetting = {
      NAME: 'Nav Event'
    }
  ) {
    super(initSetting);
  }

  setEvent () {
    this.setOnHeader();
    this.setOnFooter();
    this.setOnNavSearch();
    this.setOnLogin();
    this.setOnSetting();
    this.setOnLogout();
    this.setOnRegister();
    this.setOnList();
    this.setOnNew();
    this.setOnHelp();
    this.setOnFeedback();
  }

  setOnHeader () {
    super.setOn({
      selector: this.MODEL.SELECTOR.HEADER.CLEAR,
      func: () => {
        super.log('Click', 'Header LocalStorage Clear')();
        new Confirm({
          title: LN.get('userdata_clear'),
          content:
          View.element({ clas: 'text-center', content: LN.get('userdata_clear_confirm') }) +
            View.element({ element: 'hr' }) +
            View.element({ element: 'ul', content:
              View.element({ element: 'li', content: LN.get('language') }) +
              View.element({ element: 'li', content: LN.get('terms_agree') }) +
              View.element({ element: 'li', content: LN.get('status_login') }) +
              View.element({ element: 'li', content: LN.get('email_address') }) +
              View.element({ element: 'li', content: LN.get('password_hash') }) +
              View.element({ element: 'li', content: LN.get('auto_login') }) +
              View.element({ element: 'li', content: LN.get('crypto_hash') }) +
              View.element({ element: 'li', content: LN.get('last_search') }) +
              View.element({ element: 'li', content: LN.get('last_search_type') }) +
              View.element({ element: 'li', content: LN.get('last_search_group') }) +
              View.element({ element: 'li', content: LN.get('last_search_sort') })
            }),
          functionYes: () => {
            LocalStorage.clear();
            location.reload();
          }
        });
      }
    });
  }

  setOnFooter () {
    super.setOn({
      selector: this.MODEL.SELECTOR.FOOTER.CLIPWEB,
      func: () => {
        window.open('https://github.com/ayatec/clipweb/', '_blank');
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.FOOTER.LICENSE,
      func: () => {
        new Confirm({
          title: LN.get('license'),
          template: this.MODEL.TEMPLATE.LICENSE,
          type: Confirm.TYPE_YES,
          yes: LN.get('close')
        });
      }
    });
  }

  setOnNavSearch () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.SEARCH.BUTTON}`,
      func: () => {
        super.log('Click', 'Nav Search')();
        LIST.VIEW.move({ mode: this.MODEL.COMMON.TYPE.PREPEND });
        $(LIST.MODEL.SELECTOR.SEARCH.SEARCH).val($(`#${this.MODEL.SELECTOR.NAV.SEARCH.TEXT}`).val());
        $(`#${this.MODEL.SELECTOR.NAV.SEARCH.TEXT}`).val('');
        LIST.filtering();
      }
    });

    super.setOn({
      trigger: 'keyup',
      selector: `#${this.MODEL.SELECTOR.NAV.SEARCH.TEXT}`,
      func: (event) => {
        if (event.which == 13) {
          super.trigger({
            trigger: 'click',
            selector: `#${this.MODEL.SELECTOR.NAV.SEARCH.BUTTON}`
          });
        }
      }
    });
  }

  setOnLogin () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.LOGIN}`,
      func: () => {
        super.log('Login', 'Open')();
        USER.VIEW.move({ mode: this.MODEL.COMMON.TYPE.PREPEND });
        USER.open({ type: this.MODEL.TYPE.LOGIN });
      }
    });
  }

  setOnSetting () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.SETTING}`,
      func: () => {
        super.log('User Setting', 'Open')();
        USER.VIEW.move({ mode: this.MODEL.COMMON.TYPE.PREPEND });
        USER.open({ type: this.MODEL.TYPE.SETTING });
      }
    });
  }

  setOnLogout () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.LOGOUT}`,
      func: () => {
        super.log('Logout', 'Open')();
        USER.VIEW.move({ mode: this.MODEL.COMMON.TYPE.PREPEND });
        USER.open({ type: this.MODEL.TYPE.LOGOUT });
      }
    });
  }

  setOnRegister () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.REGISTER}`,
      func: () => {
        super.log('Register', 'Open')();
        USER.VIEW.move({ mode: this.MODEL.COMMON.TYPE.PREPEND });
        USER.open({ type: this.MODEL.TYPE.REGISTER });
      }
    });
  }

  setOnList () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.LIST}`,
      func: () => {
        super.log('List', 'Open')();
        LIST.VIEW.move({ mode: this.MODEL.COMMON.TYPE.PREPEND });
      }
    });
  }

  setOnNew () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.NEW}`,
      func: () => {
        super.log('New', 'Open')();
        CLIP.VIEW.move({ target: LIST.MODEL.SELECTOR.AREA, mode: this.MODEL.COMMON.TYPE.BEFORE });
        CLIP.open({ type: this.MODEL.TYPE.NEW });
      }
    });
  }

  setOnHelp () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.HELP}`,
      func: () => {
        super.log('Help', 'Open')();
        HELP.VIEW.move({ mode: this.MODEL.COMMON.TYPE.PREPEND });
        HELP.open({ type: this.MODEL.TYPE.HELP });
      }
    });
  }

  setOnFeedback () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.FEEDBACK}`,
      func: () => {
        super.log('Feedback', 'Open')();
        this.CONTROLLER.openFeedback();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.FEEDBACK.TERMS,
      func: () => {
        super.log('Terms', 'Open')();
        this.CONTROLLER.openTermsOfService();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.FEEDBACK.PRIVACY,
      func: () => {
        super.log('Privacy', 'Open')();
        this.CONTROLLER.openPrivacyPolicy();
      }
    });

    super.setOn({
      selector: this.MODEL.SELECTOR.FEEDBACK.TODO,
      func: () => {
        super.log('ToDo', 'Open')();
        window.open('https://clipweb.ayatec.jp/?share=fbf00b396c614d864b06b2e68a1b135f68218a9ae2c3c22444ef4a9b2a448a96&type=official', 'newtab');
      }
    });
  }

}

// ----------------------------------------------------------------
// Controller

class NavController extends ClipwebController {
  constructor (
    model = {},
    initSetting = {
      NAME: 'Nav Controller',
      MODEL: new NavModel(),
      VIEW: new NavView(),
      EVENT: new NavEvent()
    }
  ) {
    super(model, initSetting);
    this.init();
  }

  init () {
    if (LocalStorage.getItem(this.MODEL.LS.TERMS) != 'true') {
      this.openTermsOfService();
    }
    this.VIEW.writeFooter();
    this.EVENT.setEvent();
    this.logout();
  }

  openTermsOfService () {
    new Confirm({
      title: LN.get('terms_of_service'),
      template: this.MODEL.TEMPLATE.TERMS,
      keyboard: false,
      backdrop: 'static',
      close: false,
      type: Confirm.TYPE_YES,
      yes: LN.get('agree'),
      functionOpen: () => {
        LocalStorage.removeItem(this.MODEL.LS.TERMS);
      },
      functionYes: () => {
        LocalStorage.setItem(this.MODEL.LS.TERMS, 'true');
      }
    });
  }

  openPrivacyPolicy () {
    new Confirm({
      title: LN.get('privacy_policy'),
      template: this.MODEL.TEMPLATE.PRIVACY,
      type: Confirm.TYPE_1,
      yes: LN.get('close')
    });
  }

  openFeedback () {
    new Confirm({
      title: LN.get('feedback'),
      template: this.MODEL.TEMPLATE.FEEDBACK,
      type: Confirm.TYPE_YES_NO,
      yes: LN.get('send'),
      no: LN.get('close'),
      functionYes: () => {
        // 内容チェック
        let _feedback = $(this.MODEL.SELECTOR.FEEDBACK.CONTENT).val();
        if (_feedback.length > 0) {
          // Post
          super.log('Feedback', 'Send')();
          this.VIEW.toast({
            title: View.element({ element: 'i', clas: 'far fa-heart' }),
            message: LN.get('thank_you_feedback'),
            backgroundColor: '#FF99AA'
          });
          this.CONTROLLER.post({
            type: 'feedback',
            data: {
              feedback: _feedback
            }
          });
        }
      }
    });
  }

  login () {
    this.VIEW.generateLogined();
  }

  logout () {
    this.VIEW.generateNotLogin();
  }
}
