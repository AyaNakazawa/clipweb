
// ----------------------------------------------------------------
// Language

class Language {
  constructor () {
    this.en = {
      language_name: 'English',

      username: 'Username',
      email_address: 'Email address',
      password: 'Password',
      auto_login: 'Auto login',
      password_confirm: 'Confirm Password',
      new_password: 'New Password',
      avatar: 'Avatar',
      theme: 'Theme',
      default_owner_publish: 'Default Owner Publish',
      default_clip_mode: 'Default clip mode',
      using_gravatar: 'Using {gravatar}',

      clip: 'clip',
      clips: 'clips',

      list: 'List',
      history: 'History',
      help: 'Help',

      register: 'Register',
      login: 'Login',
      logout: 'Logout',
      setting: 'Setting',
      info: 'Info',

      none: 'None',
      name: 'Name',
      yes: 'Yes',
      no: 'No',
      save: 'Save',
      new_create: 'New',
      clip_new_create: 'New clip',
      reload: 'Reload',
      update: 'Update',
      new: 'New',
      edit: 'Edit',
      delete: 'Delete',
      accept: 'Accept',
      close: 'Close',
      search: 'Search',
      group: 'Group',
      sort: 'Sort',
      type: 'Type',
      tag: 'Tag',
      owner: 'Owner',
      clip_mode: 'clip mode',
      created_at: 'Created date time',
      updated_at: 'Updated date time',
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

      header_clip_list: 'clip List',

      header_new_clip: 'New clip',
      header_setting_clip: 'clip setting',

      loading_header_register: 'Registering to clipweb',
      loading_header_login: 'Login to clipweb',
      loading_header_logout: 'Logout from clipweb',
      loading_header_leaving: 'Leaving from clipweb',
      loading_header_setting: 'Saving your Setting',
      loading_header_info: 'Saving your Info',

      loading_header_search: 'Getting clip list',

      user_registered: 'Registered you.',
      user_logined: 'You logined.',
      user_logouted: 'You logouted.',
      user_update_info: 'Update your info.',
      user_update_setting: 'Update your setting.',

      clip_list_got: 'Got your clips.',
      new_clip_created: 'Created new clip.',

      please_email_auth: 'Please Email authentication.',
      userdata_clear: 'Delete your data',
      userdata_clear_confirm: 'Delete user data such as login information saved in the browser?',

      please_all_inputs_correctly: 'Please enter all items correctly.',
      please_inputs_correctly: 'Please enter items correctly.',
      please_selects_correctly: 'Please select items correctly.',

      username_alreay_exist: 'Username already exists.',
      email_address_alreay_exist: 'Email address already exists.',
      hash_alreay_exist: 'User information can not be constructed. please try again.',
      email_password_incorrect: 'The combination of the e-mail address and the password is incorrect.',
      password_incorrect: 'Password is incorrect.',
      corrupt_userdata: 'User data is corrupted. Please contact the administrator.',
      password_dont_match: 'Password don\'t match.',

      failed_to_register: 'Failed to register.',
      failed_to_login: 'Failed to login.',
      failed_to_logout: 'Failed to logout.',
      failed_to_save_setting: 'Failed to save of user setting.',
      failed_to_save_info: 'Failed to save of user info.',

      failed_to_get_clip_list: 'Failed to getting your clips.',
      failed_to_create_new_clip: 'Failed to creating new clip.',

      failed_connect_to_server: 'Failed connect to clipweb server.',
      server_not_working: 'clipweb server is not working properly.',

      clipweb_user_error_code: '{project} User Error Code: {code}',
      clipweb_user_error_message: 'Message: {message}',
      flex_sqlite3_error_code: 'Flex Sqlite3 Error Code: {code}',
      flex_sqlite3_error_mode: 'Flex Sqlite3 Mode: {mode}',
      flex_sqlite3_error_message: 'Message: {message}',
    };
    this.ja = {
      language_name: '日本語',

      username: 'ユーザー名',
      email_address: 'メールアドレス',
      password: 'パスワード',
      auto_login: '自動ログイン',
      password_confirm: 'パスワードの確認',
      new_password: '新しいパスワード',
      avatar: 'アバター',
      theme: 'テーマ',
      default_owner_publish: 'オーナー公開設定',
      default_clip_mode: 'クリップモード',
      using_gravatar: '{gravatar} を利用しています。',

      clip: 'クリップ',
      clips: 'クリップ',

      list: '一覧',
      history: '履歴',
      help: 'ヘルプ',

      register: '登録',
      login: 'ログイン',
      logout: 'ログアウト',
      setting: '設定',
      info: '情報',

      none: 'なし',
      name: '名前',
      yes: 'はい',
      no: 'いいえ',
      save: '保存',
      new_create: '新規作成',
      clip_new_create: 'クリップの新規作成',
      reload: '再読込',
      update: '更新',
      new: '新規',
      edit: '編集',
      delete: '削除',
      accept: '確認',
      close: '閉じる',
      search: '検索',
      group: 'グループ',
      sort: '並び替え',
      type: '種別',
      tag: 'タグ',
      owner: 'オーナー',
      clip_mode: 'クリップモード',
      created_at: '作成日時',
      updated_at: '更新日時',
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

      header_clip_list: 'クリップ一覧',

      header_new_clip: '新規クリップ',
      header_setting_clip: 'クリップ設定',

      loading_header_register: 'clipweb に登録中',
      loading_header_login: 'ログイン中',
      loading_header_logout: 'ログアウト中',
      loading_header_leaving: 'ユーザーを削除中',
      loading_header_setting: 'ユーザー設定を保存中',
      loading_header_info: 'ユーザー情報を保存中',

      loading_header_search: 'クリップ一覧を取得中',

      user_registered: 'ユーザーを登録しました。',
      user_logined: 'ログインしました。',
      user_logouted: 'ログアウトしました。',
      user_update_info: 'ユーザー情報を更新しました。',
      user_update_setting: 'ユーザー設定を更新しました。',

      clip_list_got: 'クリップ一覧を取得しました。',
      new_clip_created: '新しいクリップを作成しました。',

      please_email_auth: 'メール認証をしてください。',
      userdata_clear: 'ユーザデータの削除',
      userdata_clear_confirm: 'ブラウザに保存されている、ログイン情報などのユーザーデータを削除しますか？',

      please_all_inputs_correctly: 'すべての項目を正しく入力してください。',
      please_inputs_correctly: '正しく入力してください。',
      please_selects_correctly: '正しく選択してください。',

      username_alreay_exist: 'すでに存在するユーザー名です。',
      email_address_alreay_exist: 'すでに存在するメールアドレスです。',
      hash_alreay_exist: 'ユーザー情報が構築できません。もう一度お試しください。',
      email_password_incorrect: 'メールアドレスとパスワードの組み合わせが間違っています。',
      password_incorrect: 'パスワードが間違っています。',
      corrupt_userdata: 'ユーザーデータが破損しています。管理者までご確認ください。',
      password_dont_match: 'パスワードが一致しません。',

      failed_to_register: '登録できませんでした。',
      failed_to_login: 'ログインに失敗しました。',
      failed_to_logout: 'ログアウトに失敗しました。',
      failed_to_save_setting: 'ユーザー設定の保存に失敗しました。',
      failed_to_save_info: 'ユーザー情報の保存に失敗しました。',

      failed_to_get_clip_list: 'クリップ一覧の取得に失敗しました。',
      failed_to_create_new_clip: '新しいクリップの作成に失敗しました。',

      failed_connect_to_server: 'clipwebサーバーとの通信に失敗しました。',
      server_not_working: 'clipwebサーバーが正常に動作していません。',

      clipweb_user_error_code: '{project} ユーザー エラーコード: {code}',
      clipweb_user_error_message: 'メッセージ: {message}',
      flex_sqlite3_error_code: 'Flex Sqlite3 エラーコード: {code}',
      flex_sqlite3_error_mode: 'Flex Sqlite3 モード: {mode}',
      flex_sqlite3_error_message: 'メッセージ: {message}',
    };
    this.zh = {
      language_name: '中文',
    };
    this.fl = {
      language_name: 'Français',
    };
    this.ru = {
      language_name: 'Русский язык',
    };
    this.ko = {
      language_name: '한국',
    };
    this.de = {
      language_name: 'Deutsch',
    };
    this.it = {
      language_name: 'italiano',
    };
    this.es = {
      language_name: 'Español',
    };
    this.ar = {
      language_name: 'عربى',
    };
    this.eo = {
      language_name: 'Esperanto',
    };
    this.la = {
      language_name: 'Latine',
    };
    this.ms = {
      language_name: 'Melayu',
    };
    this.el = {
      language_name: 'Ελληνικά',
    };
    this.default = this.en;
  }
}
