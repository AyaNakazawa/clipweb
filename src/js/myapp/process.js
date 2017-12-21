
class Process extends CommonProcess {
  constructor(
    _initSetting = {
      NAME: `${Project.NAME} Process`
    }
  ) {
    super(_initSetting);

    this.SHOW_SPEED = 350;
    this.MAIN_SELECTOR = 'main';

    this.run();
  }

  run() {
    this.initContent();
    this.initController();
    this.show();
  }

  initContent() {
    $(this.MAIN_SELECTOR).empty();
    $(this.MAIN_SELECTOR).append(Content.getContent('user-area'));
  }

  initController() {
    this.CONTROLLER = {
      User: new UserController()
    };

    this.CONTROLLER.SWITCH = {
      User: new SwitchController({
        TEMPLATE: 'user',
        currentView: true,
        LS_KEY: 'none'
      })
    };

    this.CONTROLLER.SCROLL = {
      User: new ScrollController({
        NAME: 'User Switch',
        SCROLL_SELECTOR: '#user-area',
        EVENT_SELECTOR: '#user-scroll'
      })
    };
  }

  show() {
    $(this.MAIN_SELECTOR).slideDown(this.SHOW_SPEED);
    Log.log();
    Log.logClass(this.NAME, 'Start');
  }
}
