
class Process extends CommonProcess {
  constructor(
    _initSetting = {
      NAME: `${Project.NAME} Process`
    }
  ) {
    super(_initSetting);

    this.SHOW_SPEED = 350;
    this.MAIN_SELECTOR = 'main';
    this.BODY_SELECTOR = 'body';

    this.run();
  }

  run() {
    this.generateContent();
    this.setViewContent();
    this.initController();
    this.show();
  }

  generateContent() {
    $(this.MAIN_SELECTOR).empty();
    $(this.MAIN_SELECTOR).append(Content.getContent('user-area'));
    $(this.MAIN_SELECTOR).append(Content.getContent('help-area'));
  }

  setViewContent() {
    $('#user-area').hide();
    $('#help-area').hide();
  }

  initController() {
    this.SWITCH = {
      USER: new SwitchController({
        TEMPLATE: 'user',
        currentView: true,
        LS_KEY: 'none'
      })
    };

    this.SCROLL = {
      USER: new ScrollController({
        NAME: 'User Switch',
        SCROLL_SELECTOR: '#user-area',
        EVENT_SELECTOR: '#user-scroll'
      })
    };

    PS = this;

    this.CONTROLLER = {
      USER: new UserController(),
      NAV: new NavController()
    };
  }

  show() {
    $(this.BODY_SELECTOR).show();
    $(this.MAIN_SELECTOR).slideDown(this.SHOW_SPEED);
    Log.log();
    Log.logClass(this.NAME, 'Start');
  }
}
