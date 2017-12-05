
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
    Process.initPopover();
    this.show();
  }
  
  initContent() {
    $(this.MAIN_SELECTOR).empty();
    $(this.MAIN_SELECTOR).append(Content.getContent('user-area'));
  }
  
  static initPopover() {
    // new PopoverController({
    //   SELECTOR: '#template-help',
    //   HELP: 'Template help'
    // });
  }
  
  initController() {
    this.CONTROLLER = {
      TEMP: new UserController()
    };
    
    this.CONTROLLER.SWITCH = {
      TEMP: new SwitchController({
        TEMPLATE: 'user',
        currentView: true,
        LS_KEY: 'none'
      })
    };
    
    this.CONTROLLER.SCROLL = {
      TEMP: new ScrollController({
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
