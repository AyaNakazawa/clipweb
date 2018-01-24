
// ----------------------------------------------------------------
// Language

class Language {
  set () {
    this.default = this.en;
  }

  generate () {
    this.en = {
      language_name: 'English',

      username: 'Username',
      email_address: 'Email address',
      password: 'Password',
      password_hash: 'Password hash',
      crypto_hash: 'Crypto hash',
      last_search: 'Last search',
      last_search_group: 'Last group of search',
      last_search_sort: 'Last sort of search',
      history_clip: 'History of clip',
      language: 'Language',
      auto_login: 'Auto login',
      password_confirm: 'Confirm Password',
      new_password: 'New Password',
      avatar: 'Avatar',
      theme: 'Theme',
      default_owner_publish: 'Default Owner publish',
      default_clip_mode: 'Default clip mode',
      owner_publish: 'Owner publish',
      clip_mode: 'clip mode',
      using_gravatar: 'Using {gravatar}',

      filename: 'File name',
      filetype: 'File type',

      clip: 'clip',
      clips: 'clips',

      list: 'List',
      history: 'History',
      help: 'Help',

      status_login: 'Status of Login',

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
      created_at: 'Created date time',
      updated_at: 'Updated date time',
      private: 'Private',
      public: 'Public',
      share: 'Share',
      light: 'Light',
      dark: 'Dark',

      header_user_register: 'Join clipweb',
      header_user_login: 'Login',
      header_user_logout: 'Logout',
      header_user_leaving: 'Leave clipweb',
      header_user_setting: 'User Setting',
      header_user_info: 'User Info',

      header_list_search: 'clip List',

      header_clip_new: 'New clip',
      header_clip_setting: 'clip setting',

      loading_header_user_register: 'Registering to clipweb',
      loading_header_user_login: 'Login to clipweb',
      loading_header_user_logout: 'Logout from clipweb',
      loading_header_user_leaving: 'Leaving from clipweb',
      loading_header_user_setting: 'Saving your Setting',
      loading_header_user_info: 'Saving your Info',

      loading_header_list_search: 'Getting clip list',

      loading_header_clip_new: 'New clip',
      loading_header_clip_setting: 'Setting of clip',

      user_registered: 'Registered you.',
      user_logined: 'You logined.',
      user_logouted: 'You logouted.',
      user_update_info: 'Update your info.',
      user_update_setting: 'Update your setting.',

      clip_list_got: 'Got your clips.',
      created_new_clip: 'Created new clip.',

      please_email_auth: 'Please Email authentication.',
      userdata_clear: 'Delete your data',
      userdata_clear_confirm: 'Delete user data saved in the browser?',

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
      clip_not_exists: 'Your clip not exists.',

      failed_to_register: 'Failed to register.',
      failed_to_login: 'Failed to login.',
      failed_to_logout: 'Failed to logout.',
      failed_to_save_setting: 'Failed to save of user setting.',
      failed_to_save_info: 'Failed to save of user info.',

      failed_to_get_clip_list: 'Failed to getting your clips.',
      failed_to_create_new_clip: 'Failed to creating new clip.',

      failed_connect_to_server: 'Failed connect to clipweb server.',
      server_not_working: 'clipweb server is not working properly.',

      clipweb_user_error_code: '{project} Error Code: {code}',
      clipweb_user_error_message: 'Message: {message}',
      clipweb_list_error_code: '{project} Error Code: {code}',
      clipweb_list_error_message: 'Message: {message}',
      clipweb_clip_error_code: '{project} Error Code: {code}',
      clipweb_clip_error_message: 'Message: {message}',
      clipweb_share_error_code: '{project} Error Code: {code}',
      clipweb_share_error_message: 'Message: {message}',
      flex_sqlite3_error_code: 'Flex Sqlite3 Error Code: {code}',
      flex_sqlite3_error_mode: 'Flex Sqlite3 Mode: {mode}',
      flex_sqlite3_error_message: 'Message: {message}',
    };
    this.ja = {
      language_name: '日本語',

      username: 'ユーザー名',
      email_address: 'メールアドレス',
      password: 'パスワード',
      password_hash: 'パスワードハッシュ',
      crypto_hash: '暗号化用ハッシュ',
      last_search: '前回の検索文字列',
      last_search_group: '前回の検索グループ',
      last_search_sort: '前回の検索ソート',
      history_clip: 'クリップの履歴',
      language: '言語',
      auto_login: '自動ログイン',
      password_confirm: 'パスワードの確認',
      new_password: '新しいパスワード',
      avatar: 'アバター',
      theme: 'テーマ',
      default_owner_publish: 'デフォルトのオーナー公開設定',
      default_clip_mode: 'デフォルトのクリップモード',
      owner_publish: 'オーナー公開設定',
      clip_mode: 'クリップモード',
      using_gravatar: '{gravatar} を利用しています。',

      filename: 'ファイル名',
      filetype: 'ファイル種別',

      clip: 'クリップ',
      clips: 'クリップ',

      list: '一覧',
      history: '履歴',
      help: 'ヘルプ',

      status_login: 'ログインステータス',

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
      created_at: '作成日時',
      updated_at: '更新日時',
      private: '非公開',
      public: '公開',
      share: '共有',
      light: 'ライト',
      dark: 'ダーク',

      header_user_register: 'ユーザー登録',
      header_user_login: 'ログイン',
      header_user_logout: 'ログアウト',
      header_user_leaving: 'ユーザー削除',
      header_user_setting: 'ユーザー設定',
      header_user_info: 'ユーザー情報',

      header_list_search: 'クリップ一覧',

      header_clip_new: '新規クリップ',
      header_clip_setting: 'クリップ設定',

      loading_header_user_register: 'clipweb に登録中',
      loading_header_user_login: 'ログイン中',
      loading_header_user_logout: 'ログアウト中',
      loading_header_user_leaving: 'ユーザーを削除中',
      loading_header_user_setting: 'ユーザー設定を保存中',
      loading_header_user_info: 'ユーザー情報を保存中',

      loading_header_list_search: 'クリップ一覧を取得中',

      loading_header_clip_new: 'クリップ一覧を取得中',
      loading_header_clip_setting: 'クリップ一覧を取得中',

      user_registered: 'ユーザーを登録しました。',
      user_logined: 'ログインしました。',
      user_logouted: 'ログアウトしました。',
      user_update_info: 'ユーザー情報を更新しました。',
      user_update_setting: 'ユーザー設定を更新しました。',

      clip_list_got: 'クリップ一覧を取得しました。',
      created_new_clip: '新しいクリップを作成しました。',

      please_email_auth: 'メール認証をしてください。',
      userdata_clear: 'ユーザデータの削除',
      userdata_clear_confirm: 'ブラウザに保存されているユーザーデータを削除しますか？',

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
      clip_not_exists: 'あなたのクリップはありません。',

      failed_to_register: '登録できませんでした。',
      failed_to_login: 'ログインに失敗しました。',
      failed_to_logout: 'ログアウトに失敗しました。',
      failed_to_save_setting: 'ユーザー設定の保存に失敗しました。',
      failed_to_save_info: 'ユーザー情報の保存に失敗しました。',

      failed_to_get_clip_list: 'クリップ一覧の取得に失敗しました。',
      failed_to_create_new_clip: '新しいクリップの作成に失敗しました。',

      failed_connect_to_server: 'clipwebサーバーとの通信に失敗しました。',
      server_not_working: 'clipwebサーバーが正常に動作していません。',

      clipweb_user_error_code: '{project} エラーコード： {code}',
      clipweb_user_error_message: 'メッセージ： {message}',
      clipweb_list_error_code: '{project} エラーコード： {code}',
      clipweb_list_error_message: 'メッセージ： {message}',
      clipweb_clip_error_code: '{project} エラーコード： {code}',
      clipweb_clip_error_message: 'メッセージ： {message}',
      clipweb_share_error_code: '{project} エラーコード： {code}',
      clipweb_share_error_message: 'メッセージ： {message}',
      flex_sqlite3_error_code: 'Flex Sqlite3 エラーコード： {code}',
      flex_sqlite3_error_mode: 'Flex Sqlite3 モード： {mode}',
      flex_sqlite3_error_message: 'メッセージ： {message}',
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
  }
}
