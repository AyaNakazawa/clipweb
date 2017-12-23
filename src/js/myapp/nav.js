
// ----------------------------------------------------------------
// Nav Class

// ----------------------------------------------------------------
// Model

class NavModel extends ContentModel {
  constructor(
    _initSetting = {
      NAME: 'Nav Object',
    }
  ) {
    super(_initSetting);

    this.SELECTOR_AREA = '#navbar';
    this.SELECTOR_NAV = '.navbar-nav';

    this.SELECTOR_NAV_LOGIN = 'nav-login';
    this.SELECTOR_NAV_SIGNUP = 'nav-signup';
    this.SELECTOR_NAV_LOGOUT = 'nav-logout';
    this.SELECTOR_NAV_HELP = 'nav-help';

  }
}

// ----------------------------------------------------------------
// View

class NavView extends ContentView {
  constructor(
    _initSetting = {
      NAME: 'Nav View'
    }
  ) {
    super(_initSetting);
  }

  addNavItem({
    id = null,
    name = null,
    type = 'append'
  } = {}) {
    let element = '';
    if (id == null || name == null) {
      return;
    } else {
      element = `<li class="nav-item"><a class="nav-link"id="${id}">${name}</a></li>`;
    }
    if (type == 'prepend') {
      $(this.MODEL.SELECTOR_NAV).prepend(element);
    } else {
      $(this.MODEL.SELECTOR_NAV).append(element);
    }
  }

  initArea() {
    $(this.MODEL.SELECTOR_AREA).empty();
    $(this.MODEL.SELECTOR_AREA).append('<ul class="navbar-nav col-md-6"></ul>');
    $(this.MODEL.SELECTOR_AREA).append('<div class="col-md-6 nav-seacrh"><div class="input-group"><input class="form-control" id="nav-seacrh-text" placeholder="Search"><span class="input-group-btn"><button class="btn btn-outline-info" id="nav-seacrh-button"><i class="fas fa-search"></i></button></span></div></div>');

    this.addNavItem({
      id: this.MODEL.SELECTOR_NAV_LOGIN,
      name: 'Login'
    });
    this.addNavItem({
      id: this.MODEL.SELECTOR_NAV_HELP,
      name: 'Help'
    });
  }
}

// ----------------------------------------------------------------
// Event

class NavEvent extends ContentEvent {
  constructor(
    _initSetting = {
      NAME: 'Nav Event'
    }
  ) {
    super(_initSetting);
  }

  setEvent() {
    this.setOpenLogin();
  }

  setOpenLogin() {
    super.setOn({
      selector: this.MODEL.SELECTOR_NAV_LOGIN,
      func: () => {
        Log.log('Open Login');
        PS.CONTROLLER.USER.VIEW.openLogin();
      }
    });
  }
}

// ----------------------------------------------------------------
// Controller

class NavController extends ContentController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Nav Controller',
      MODEL: new NavModel(),
      VIEW: new NavView(),
      EVENT: new NavEvent()
    }
  ) {
    super(_model, _initSetting);

    this.EVENT.setEvent();
    this.VIEW.initArea({});
  }
}
