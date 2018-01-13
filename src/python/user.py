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

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class User:
    # ----------------------------------------------------------------
    # Define

    def __init__(cls):
        cls._define()
        cls.result = {}
        cls.DB_PATH = "db/clipweb.db"
        cls.DB = flex_sqlite3.FlexSQLite3(cls.DB_PATH)

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def set_cgi(cls, cgi=None):
        cls.cgi = cgi

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
        cls.result["result"] = True
        return cls.result

    def setting(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
        cls.result["result"] = True
        return cls.result

    def info(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
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

    def _define(cls):
        cls.NAME = "clipweb user"
        cls.ERROR = {
            "code_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 51,
                    "message": "Error code does not defined."
                }
            },
            "hash_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 101,
                    "message": "[hash] does not defined."
                }
            },
            "username_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 102,
                    "message": "[username] does not defined."
                }
            },
            "email_address_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 103,
                    "message": "[email_address] does not defined."
                }
            },
            "password_hash_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 104,
                    "message": "[password_hash] does not defined."
                }
            },
            "encrypted_crypto_hash_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 105,
                    "message": "[encrypted_crypto_hash] does not defined."
                }
            },
            "theme_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 106,
                    "message": "[theme] does not defined."
                }
            },
            "default_owner_publish_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 107,
                    "message": "[default_owner_publish] does not defined."
                }
            },
            "default_clip_mode_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 108,
                    "message": "[default_clip_mode] does not defined."
                }
            },
            "hash_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 201,
                    "message": "[hash] is unknown class"
                }
            },
            "username_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 202,
                    "message": "[username] is unknown class"
                }
            },
            "email_address_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 203,
                    "message": "[email_address] is unknown class"
                }
            },
            "password_hash_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 204,
                    "message": "[password_hash] is unknown class"
                }
            },
            "encrypted_crypto_hash_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 205,
                    "message": "[encrypted_crypto_hash] is unknown class"
                }
            },
            "theme_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 206,
                    "message": "[theme] is unknown class"
                }
            },
            "default_owner_publish_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 207,
                    "message": "[default_owner_publish] is unknown class"
                }
            },
            "default_clip_mode_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 208,
                    "message": "[default_clip_mode] is unknown class"
                }
            },
            "username_overlap": {
                "{} error".format(cls.NAME): {
                    "code": 301,
                    "message": "Username already exists."
                }
            },
            "email_address_overlap": {
                "{} error".format(cls.NAME): {
                    "code": 302,
                    "message": "User Email address already exists."
                }
            },
            "hash_overlap": {
                "{} error".format(cls.NAME): {
                    "code": 303,
                    "message": "User hash already exists."
                }
            }
        }

    def _error(
        cls,
        code=None,
        *arguments,
        **keyword_arguments
    ):
        if code is None:
            return cls._error("code_not_defined", mode=sys._getframe().f_code.co_name)

        error = cls.ERROR[code]

        for i_args in range(len(arguments)):
            custom_message = "Custom Message {0}".format(i_args)
            error["{} error".format(cls.NAME)][custom_message] = arguments[i_args]

        for key in keyword_arguments.keys():
            error["{} error".format(cls.NAME)][key] = keyword_arguments[key]

        return error

    def _check_str(
        cls,
        model=None,
        type=str,
        not_defined_error=None,
        unknown_class_error=None
    ):
        if isinstance(model, type):
            if len(model) == 0:
                cls.result["error"] = cls._error(not_defined_error)
                return False
        elif model is None:
            cls.result["error"] = cls._error(not_defined_error)
            return False
        else:
            cls.result["error"] = cls._error(unknown_class_error)
            return False

        return True
