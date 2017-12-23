
class Error {
  static hide() {
    document.getElementsByTagName('main')[0].style.display = 'none';
    document.getElementsByTagName('body')[0].style.display = 'none';
  }
}

Error.hide();
