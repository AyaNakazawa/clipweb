#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb User
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

import sys
import hashlib
import binascii
import datetime
from db import flex_sqlite3
import cw_base

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class User(cw_base.Base):
    # ----------------------------------------------------------------
    # Define

    def __init__(cls):
        super(User, cls).__init__("clipweb user")

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def register(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_hash = cls.cgi.get("hash")
        user_username = cls.cgi.get("username")
        user_email_address = cls.cgi.get("email_address")
        user_encrypted_crypto_hash = cls.cgi.get("encrypted_crypto_hash")
        user_password_hash = cls.cgi.get("password_hash")

        # ----------------------------------------------------------------
        # cgi get strings check

        if cls._check_str(
            model=user_hash,
            not_defined_error="hash_not_defined",
            unknown_class_error="hash_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_username,
            not_defined_error="username_not_defined",
            unknown_class_error="username_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_email_address,
            not_defined_error="email_address_not_defined",
            unknown_class_error="email_address_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_encrypted_crypto_hash,
            not_defined_error="encrypted_crypto_hash_not_defined",
            unknown_class_error="encrypted_crypto_hash_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_password_hash,
            not_defined_error="password_hash_not_defined",
            unknown_class_error="password_hash_unknown_class"
        ) is False:
            return cls.result

        # ----------------------------------------------------------------
        # check overlap user info

        num_username_overlap = cls.DB.count_records(table="owners", where={
            "username": user_username
        })
        num_email_address_overlap = cls.DB.count_records(table="owners", where={
            "email_address": user_email_address
        })
        num_hash_overlap = cls.DB.count_records(table="owners", where={
            "hash": user_hash
        })

        if num_username_overlap > 0:
            cls.result["error"] = cls._error("username_overlap")
            return cls.result
        if num_email_address_overlap > 0:
            cls.result["error"] = cls._error("email_address_overlap")
            return cls.result
        if num_hash_overlap > 0:
            cls.result["error"] = cls._error("hash_overlap")
            return cls.result

        # ----------------------------------------------------------------
        # generate email auth

        salt = "clipweb_user_register_email_salt"
        dk = hashlib.pbkdf2_hmac("sha256", user_username.encode(), salt.encode(), 100000)
        user_email_authentication_hash = binascii.hexlify(dk).decode()

        # ----------------------------------------------------------------
        # generate datetime

        now = datetime.datetime.now()
        now = now.strftime("%Y/%m/%d %H:%M:%S")

        # ----------------------------------------------------------------
        # insert new user

        cls.result["new_user"] = cls.DB.insert(
            table="owners",
            value={
                "hash": user_hash,
                "username": user_username,
                "email_address": user_email_address,
                "encrypted_crypto_hash": user_encrypted_crypto_hash,
                "email_authentication_hash": user_email_authentication_hash,
                "password_hash": user_password_hash,
                "created_at": now,
                "updated_at": now
            }
        )

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def login(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_email_address = cls.cgi.get("email_address")
        user_password_hash = cls.cgi.get("password_hash")

        # ----------------------------------------------------------------
        # cgi get strings check

        if cls._check_str(
            model=user_email_address,
            not_defined_error="email_address_not_defined",
            unknown_class_error="email_address_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_password_hash,
            not_defined_error="password_hash_not_defined",
            unknown_class_error="password_hash_unknown_class"
        ) is False:
            return cls.result

        # ----------------------------------------------------------------
        # select user data

        user_data = cls.DB.select(
            table="owners",
            column=[
                "hash",
                "username",
                "encrypted_crypto_hash",
                "email_authentication",
                "theme",
                "default_owner_publish",
                "default_clip_mode",
                "created_at",
                "updated_at"
            ],
            where={
                "email_address": user_email_address,
                "password_hash": user_password_hash
            }
        )

        if len(user_data) > 1:
            cls.result["error"] = cls._error("corrupt_userdata")
            return cls.result

        if len(user_data) < 1:
            cls.result["error"] = cls._error("email_password_incorrect")
            return cls.result

        for key in user_data[0].keys():
            cls.result[key] = user_data[0][key]

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def logout(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
        cls.result["result"] = True
        return cls.result

    def setting(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_hash = cls.cgi.get("hash")
        user_password_hash = cls.cgi.get("password_hash")
        user_theme = cls.cgi.get("theme")
        user_default_owner_publish = cls.cgi.get("default_owner_publish")
        user_default_clip_mode = cls.cgi.get("default_clip_mode")

        # ----------------------------------------------------------------
        # cgi get strings check

        if cls._check_str(
            model=user_hash,
            not_defined_error="hash_not_defined",
            unknown_class_error="hash_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_password_hash,
            not_defined_error="password_hash_not_defined",
            unknown_class_error="password_hash_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_theme,
            not_defined_error="theme_not_defined",
            unknown_class_error="theme_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_default_owner_publish,
            not_defined_error="default_owner_publish_not_defined",
            unknown_class_error="default_owner_publish_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_default_clip_mode,
            not_defined_error="default_clip_mode_not_defined",
            unknown_class_error="default_clip_mode_unknown_class"
        ) is False:
            return cls.result

        # ----------------------------------------------------------------
        # generate datetime

        now = datetime.datetime.now()
        now = now.strftime("%Y/%m/%d %H:%M:%S")

        # ----------------------------------------------------------------
        # count user

        num_user_data = cls.DB.count_records(
            table="owners",
            where={
                "hash": user_hash,
                "password_hash": user_password_hash
            }
        )

        if num_user_data > 1:
            cls.result["error"] = cls._error("corrupt_userdata")
            return cls.result

        if num_user_data < 1:
            cls.result["error"] = cls._error("user_not_found")
            return cls.result

        # ----------------------------------------------------------------
        # update user data

        cls.result["update_setting"] = cls.DB.update(
            table="owners",
            value={
                "theme": user_theme,
                "default_owner_publish": user_default_owner_publish,
                "default_clip_mode": user_default_clip_mode,
                "updated_at": now
            },
            where={
                "hash": user_hash,
                "password_hash": user_password_hash
            }
        )

        # ----------------------------------------------------------------
        # select user data

        user_data = cls.DB.select(
            table="owners",
            column=[
                "theme",
                "default_owner_publish",
                "default_clip_mode",
                "updated_at"
            ],
            where={
                "hash": user_hash,
                "password_hash": user_password_hash
            }
        )

        for key in user_data[0].keys():
            cls.result[key] = user_data[0][key]

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def info(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_hash = cls.cgi.get("hash")
        user_password_hash = cls.cgi.get("password_hash")
        user_username = cls.cgi.get("username")
        user_email_address = cls.cgi.get("email_address")
        user_encrypted_crypto_hash = cls.cgi.get("encrypted_crypto_hash")
        user_password_hash_new = cls.cgi.get("password_hash_new")

        # ----------------------------------------------------------------
        # cgi get strings check

        if cls._check_str(
            model=user_hash,
            not_defined_error="hash_not_defined",
            unknown_class_error="hash_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_password_hash,
            not_defined_error="password_hash_not_defined",
            unknown_class_error="password_hash_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_username,
            not_defined_error="username_not_defined",
            unknown_class_error="username_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_email_address,
            not_defined_error="email_address_not_defined",
            unknown_class_error="email_address_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_encrypted_crypto_hash,
            not_defined_error="encrypted_crypto_hash_not_defined",
            unknown_class_error="encrypted_crypto_hash_unknown_class"
        ) is False:
            return cls.result

        # ----------------------------------------------------------------
        # generate datetime

        now = datetime.datetime.now()
        now = now.strftime("%Y/%m/%d %H:%M:%S")

        # ----------------------------------------------------------------
        # count user

        num_user_data = cls.DB.count_records(
            table="owners",
            where={
                "hash": user_hash,
                "password_hash": user_password_hash
            }
        )

        if num_user_data > 1:
            cls.result["error"] = cls._error("corrupt_userdata")
            return cls.result

        if num_user_data < 1:
            cls.result["error"] = cls._error("password_incorrect")
            return cls.result

        # ----------------------------------------------------------------
        # update user data

        user_values = {
            "username": user_username,
            "email_address": user_email_address,
            "encrypted_crypto_hash": user_encrypted_crypto_hash,
            "updated_at": now
        }
        if user_password_hash_new is not None:
            user_values["password_hash"] = user_password_hash_new

        cls.result["update_info"] = cls.DB.update(
            table="owners",
            value=user_values,
            where={
                "hash": user_hash,
                "password_hash": user_password_hash
            }
        )

        # ----------------------------------------------------------------
        # select user data

        if user_password_hash_new is not None:
            user_password_hash = user_password_hash_new

        user_data = cls.DB.select(
            table="owners",
            column=[
                "username",
                "email_address",
                "encrypted_crypto_hash",
                "updated_at"
            ],
            where={
                "hash": user_hash,
                "password_hash": user_password_hash
            }
        )

        for key in user_data[0].keys():
            cls.result[key] = user_data[0][key]

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def leave(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
        cls.result["result"] = True
        return cls.result

    # ----------------------------------------------------------------
    # Inner Function
    # ----------------------------------------------------------------
