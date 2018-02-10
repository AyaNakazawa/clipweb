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
    # Method
    # ----------------------------------------------------------------

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def register(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # get & check cgi

        user_hash = cls.get_cgi("owner_hash")
        user_username = cls.get_cgi("username")
        user_email_address = cls.get_cgi("email_address")
        user_encrypted_crypto_hash = cls.get_cgi("encrypted_crypto_hash")
        user_password_hash = cls.get_cgi("password_hash")

        if cls.error:
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

        user_email_authentication_hash = cls.get_sha256()

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
                "created_at": cls.get_date(),
                "updated_at": cls.get_date()
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
        # get & check cgi

        user_email_address = cls.get_cgi("email_address")
        user_password_hash = cls.get_cgi("password_hash")

        if cls.error:
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
                "default_owner_public",
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
        # get & check cgi

        user_hash = cls.get_cgi("owner_hash")
        user_password_hash = cls.get_cgi("password_hash")
        user_theme = cls.get_cgi("theme")
        user_default_owner_public = cls.get_cgi("default_owner_public")
        user_default_clip_mode = cls.get_cgi("default_clip_mode")

        if cls.error:
            return cls.result

        # ----------------------------------------------------------------
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # update user data

        cls.result["update_setting"] = cls.DB.update(
            table="owners",
            value={
                "theme": user_theme,
                "default_owner_public": user_default_owner_public,
                "default_clip_mode": user_default_clip_mode,
                "updated_at": cls.get_date()
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
                "default_owner_public",
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
        # get & check cgi

        user_hash = cls.get_cgi("owner_hash")
        user_password_hash = cls.get_cgi("password_hash")
        user_username = cls.get_cgi("username")
        user_email_address = cls.get_cgi("email_address")
        user_encrypted_crypto_hash = cls.get_cgi("encrypted_crypto_hash")
        user_password_hash_new = cls.get_cgi("password_hash_new")

        if cls.error:
            return cls.result

        # ----------------------------------------------------------------
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # update user data

        user_values = {
            "username": user_username,
            "email_address": user_email_address,
            "encrypted_crypto_hash": user_encrypted_crypto_hash,
            "updated_at": cls.get_date()
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
    # Inner Method
    # ----------------------------------------------------------------
