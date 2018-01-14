
// ----------------------------------------------------------------
// Nav Class

// ----------------------------------------------------------------
// Model

class NavModel extends CommonModel {
  constructor (
    initSetting = {
      NAME: 'Nav Object',
    }
  ) {
    super(initSetting);

    this.SELECTOR = {};
    this.SELECTOR.AREA = '#navbar';

    this.SELECTOR.NAV = {};
    this.SELECTOR.NAV.BAR = '.navbar-nav';
    this.SELECTOR.NAV.LOGIN = 'nav-login';
    this.SELECTOR.NAV.REGISTER = 'nav-register';
    this.SELECTOR.NAV.SETTING = 'nav-setting';
    this.SELECTOR.NAV.LOGOUT = 'nav-logout';
    this.SELECTOR.NAV.HELP = 'nav-help';

    this.SELECTOR.HEADER = {};
    this.SELECTOR.HEADER.CLEAR = '#header-clear';

  }
}

// ----------------------------------------------------------------
// View

class NavView extends CommonView {
  constructor (
    initSetting = {
      NAME: 'Nav View'
    }
  ) {
    super(initSetting);
  }

  clearNavItem () {
    $(this.MODEL.SELECTOR.AREA).empty();
    $(this.MODEL.SELECTOR.AREA).append('<ul class="navbar-nav col-md-8"></ul>');
  }

  addNavItem ({
    id = null,
    name = null,
    type = 'append',
    fa = null
  } = {}) {
    if (id == null || name == null) {
      Log.error(arguments)();
      return;
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
      return;
    }

    $(`${this.MODEL.SELECTOR.NAV.BAR} #${id}`).each((_index, _element) => {
      $(_element).parent().remove();
    });
  }

  addNavSearch () {
    $(this.MODEL.SELECTOR.AREA).append(`<div class="col-md-4 nav-seacrh"><div class="input-group"><input class="form-control" id="nav-seacrh-text" placeholder="${LN.get('search')}"><span class="input-group-btn"><button class="btn btn-outline-info" id="nav-seacrh-button"><i class="fas fa-search"></i></button></span></div></div>`);
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
      id: this.MODEL.SELECTOR.NAV.HELP,
      name: LN.get('help')
    });
  }

  generateLogined () {
    this.clearNavItem();
    this.addNavSearch();

    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.SETTING,
      name: LN.get('setting')
    });
    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.HELP,
      name: LN.get('help')
    });
    this.addNavItem({
      id: this.MODEL.SELECTOR.NAV.LOGOUT,
      name: LN.get('logout')
    });
  }
}

// ----------------------------------------------------------------
// Event

class NavEvent extends CommonEvent {
  constructor (
    initSetting = {
      NAME: 'Nav Event'
    }
  ) {
    super(initSetting);
  }

  setEvent () {
    this.setClickHeaderClear();
    this.setOpenLogin();
    this.setOpenSetting();
    this.setOpenLogout();
    this.setOpenRegister();
    this.setOpenHelp();
  }

  setClickHeaderClear () {
    super.setOn({
      selector: this.MODEL.SELECTOR.HEADER.CLEAR,
      func: () => {
        super.log('Click', 'Header LocalStorage Clear')();
        new Confirm({
          title: LN.get('userdata_clear'),
          content: LN.get('userdata_clear_confirm'),
          functionYes: () => {
            LocalStorage.clear();
            location.reload();
          }
        });
      }
    });
  }

  setOpenLogin () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.LOGIN}`,
      func: () => {
        super.log('Login', 'Open')();
        USER.openLogin();
      }
    });
  }

  setOpenSetting () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.SETTING}`,
      func: () => {
        super.log('User Setting', 'Open')();
        USER.openSetting();
      }
    });
  }

  setOpenLogout () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.LOGOUT}`,
      func: () => {
        super.log('Logout', 'Open')();
        USER.openLogout();
      }
    });
  }

  setOpenRegister () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.REGISTER}`,
      func: () => {
        super.log('Register', 'Open')();
        USER.openRegister();
      }
    });
  }

  setOpenHelp () {
    super.setOn({
      selector: `#${this.MODEL.SELECTOR.NAV.HELP}`,
      func: () => {
        super.log('Help', 'Open')();
        HELP.openHelp();
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class NavController extends CommonController {
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

    this.EVENT.setEvent();
    this.logout();
  }

  login () {
    this.VIEW.generateLogined();
  }

  logout () {
    this.VIEW.generateNotLogin();
  }
}
