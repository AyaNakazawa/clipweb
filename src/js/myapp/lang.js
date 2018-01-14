
// ----------------------------------------------------------------
// Language

class Language {
  constructor () {
    this.default = {
      name: '日本語 (Japanese)',

      username: 'ユーザー名',
      email_address: 'メールアドレス',
      password: 'パスワード',
      password_confirm: 'パスワードの確認',
      new_password: '新しいパスワード',
      avatar: 'アバター',
      theme: 'テーマ',
      default_owner_publish: 'オーナー公開設定',
      default_clip_mode: 'クリップボード',
      using_gravatar: '{gravatar} を利用しています。',

      help: 'ヘルプ',

      register: '登録',
      login: 'ログイン',
      logout: 'ログアウト',
      setting: '設定',
      info: '情報',

      save: '保存',
      search: '検索',
      private: '非公開',
      public: '公開',
      share: '共有',
      light: 'ライト',
      dark: 'ダーク',

      header_register: 'ユーザー登録',
      header_login: 'ログイン',
      header_logout: 'ログアウト',
      header_leaving: 'ユーザー削除',
      header_setting: 'ユーザー設定',
      header_info: 'ユーザー情報',

      loading_header_register: 'clipweb に登録中',
      loading_header_login: 'ログイン中',
      loading_header_logout: 'ログアウト中',
      loading_header_leaving: 'ユーザーを削除中',
      loading_header_setting: 'ユーザー設定を保存中',
      loading_header_info: 'ユーザー情報を保存中',

      user_registered: 'ユーザーを登録しました。',
      user_logined: 'ログインしました。',
      user_logouted: 'ログアウトしました。',
      user_update_info: 'ユーザー情報を更新しました。',
      user_update_setting: 'ユーザー設定を更新しました。',

      please_email_auth: 'メール認証をしてください。',

      please_all_inputs_correctly: 'すべての項目を正しく入力してください。',
      please_inputs_correctly: '正しく入力してください。',
      please_selects_correctly: '正しく選択してください。',
      email_password_incorrect: 'メールアドレスとパスワードの組み合わせが間違っています。',
      password_dont_match: 'パスワードが一致しません。',

      failed_to_register: '登録できませんでした。',
      failed_to_login: 'ログインに失敗しました。',
      failed_to_logout: 'ログアウトに失敗しました。',
      failed_connect_to_server: 'clipwebサーバーとの通信に失敗しました。',
      server_not_working: 'clipwebサーバーが正常に動作していません。',

      clipweb_user_error_code: '{project} ユーザー エラーコード: {code}',
      clipweb_user_error_message: 'メッセージ: {message}',
      flex_sqlite3_error_code: 'Flex Sqlite3 エラーコード: {code}',
      flex_sqlite3_error_mode: 'Flex Sqlite3 モード: {mode}',
      flex_sqlite3_error_message: 'メッセージ: {message}',
    };
    this.en = {
      name: 'English',

      username: 'Username',
      email_address: 'Email address',
      password: 'Password',
      password_confirm: 'Confirm Password',
      new_password: 'New Password',
      avatar: 'Avatar',
      theme: 'Theme',
      default_owner_publish: 'Default Owner Publish',
      default_clip_mode: 'Default Clip mode',
      using_gravatar: 'Using {gravatar}',

      help: 'Help',

      register: 'Register',
      login: 'Login',
      logout: 'Logout',
      setting: 'Setting',
      info: 'Info',

      save: 'Save',
      search: 'Search',
      private: 'Private',
      public: 'Public',
      share: 'Share',
      light: 'Light',
      dark: 'Dark',

      header_register: 'Join clipweb',
      header_login: 'Login',
      header_logout: 'Logout',
      header_leaving: 'Leave clipweb',
      header_setting: 'User Setting',
      header_info: 'User Info',

      loading_header_register: 'Registering to clipweb',
      loading_header_login: 'Login to clipweb',
      loading_header_logout: 'Logout from clipweb',
      loading_header_leaving: 'Leaving from clipweb',
      loading_header_setting: 'Save your Setting',
      loading_header_info: 'Save your Info',

      user_registered: 'Registered you.',
      user_logined: 'You logined.',
      user_logouted: 'You logouted.',
      user_update_info: 'Update your info.',
      user_update_setting: 'Update your setting.',

      please_email_auth: 'Please Email authentication.',

      please_all_inputs_correctly: 'Please enter all items correctly.',
      please_inputs_correctly: 'Please enter items correctly.',
      please_selects_correctly: 'Please select items correctly.',
      email_password_incorrect: 'The combination of the e-mail address and the password is incorrect.',
      password_dont_match: 'Password don\'t match.',

      failed_to_register: 'Failed to register.',
      failed_to_login: 'Failed to login.',
      failed_to_logout: 'Failed to logout.',
      failed_connect_to_server: 'Failed connect to clipweb server.',
      server_not_working: 'clipweb server is not working.',

      clipweb_user_error_code: '{project} User Error Code: {code}',
      clipweb_user_error_message: 'Message: {message}',
      flex_sqlite3_error_code: 'Flex Sqlite3 Error Code: {code}',
      flex_sqlite3_error_mode: 'Flex Sqlite3 Mode: {mode}',
      flex_sqlite3_error_message: 'Message: {message}',
    };
    this.ja = {
      name: '日本語 (Japanese)',
    };
    this.zh = {
      name: '中文 (Chinese)',
    };
    this.fl = {
      name: 'Français (French)',
    };
    this.ru = {
      name: 'Русский язык (Russian)',
    };
    this.ko = {
      name: '한국 (Korean)',
    };
    this.de = {
      name: 'Deutsch (German)',
    };
    this.it = {
      name: 'italiano (Italian)',
    };
    this.es = {
      name: 'Español (Spanish)',
    };
    this.ar = {
      name: 'عربى (Arabic)',
    };
    this.eo = {
      name: 'Esperanto (Esperanto)',
    };
    this.la = {
      name: 'Latine (Latin)',
    };
    this.ms = {
      name: 'Melayu (Malay)',
    };
    this.el = {
      name: 'Ελληνικά (Greek)',
    };
  }
}
