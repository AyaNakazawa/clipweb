
class Process extends CommonProcess {
  constructor (
    _initSetting = {
      NAME: `${Project.NAME} Process`
    }
  ) {
    super(_initSetting);

    this.SELECTOR = {};
    this.SELECTOR.MAIN = 'main';
    this.SELECTOR.BODY = 'body';

    this.SELECTOR.CONTENT = {};
    this.SELECTOR.CONTENT.USER = 'user-area';
    this.SELECTOR.CONTENT.HELP = 'clip-list-area';
    this.SELECTOR.CONTENT.HELP = 'help-area';

    this.run();
  }

  run () {
    this.generateContent();
    this.setViewContent();
    this.initController();
    this.show();
  }

  generateContent () {
    $(this.SELECTOR.MAIN).empty();
    $.each(this.SELECTOR.CONTENT, (index, selector) => {
      $(this.SELECTOR.MAIN).append(Content.getContent(selector));
    });
  }

  setViewContent () {
    $.each(this.SELECTOR.CONTENT, (index, selector) => {
      $(`#${selector}`).hide();
    });
  }

  initController () {
    NAV = new NavController();
    // HELP = new HelpController();
    USER = new UserController();
    LIST = new ClipListController();
  }

  show () {
    $(this.SELECTOR.BODY).show();
    $(this.SELECTOR.MAIN).show();
  }
}
