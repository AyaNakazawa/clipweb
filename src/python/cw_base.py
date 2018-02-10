#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb Base
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

import sys
import hashlib
import datetime
from db import flex_sqlite3

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class Base:
    # ----------------------------------------------------------------
    # Define

    def __init__(cls, name="clipweb base"):
        cls.NAME = name
        cls._define()
        cls.result = {}
        cls.DB_PATH = "db/clipweb.db"
        cls.DB = flex_sqlite3.FlexSQLite3(cls.DB_PATH)
        cls.error = False

    # ----------------------------------------------------------------
    # Method
    # ----------------------------------------------------------------

    def get_cgi(cls, param=None, empty_ok=False):
        result = cls.cgi.get(param)
        if empty_ok is False:
            cls._check_str(result, param)

        return result

    def set_cgi(cls, cgi=None):
        cls.cgi = cgi

    def check_user(
        cls,
        user_hash=None,
        user_password_hash=None
    ):
        _num_user_data = cls.DB.count_records(
            table="owners",
            where={
                "hash": user_hash,
                "password_hash": user_password_hash
            }
        )

        if _num_user_data > 1:
            cls.result["error"] = cls._error("corrupt_userdata")
            cls.error = True
            return False

        if _num_user_data < 1:
            cls.result["error"] = cls._error("user_not_found")
            cls.error = True
            return False

        return True

    def get_date(cls):
        return datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")

    def get_md5(cls, string=None):
        return str(hashlib.md5(string.encode('utf-8')).hexdigest())

    def get_sha256(cls, string=None):
        if string is None:
            string = str(datetime.datetime.now())
        return hashlib.sha256(string.encode('utf-8')).hexdigest()

    def get_share_users(cls, clip_hash):
        result = cls.DB.select(
            table="shares",
            column=[
                "owners.hash AS user_hash",
                "owners.username AS user_name",
                "owners.email_address AS user_gravatar",
                "shares.created_at AS share_created_at",
                "shares.updated_at AS share_updated_at"
            ],
            where={
                "clip_hash": clip_hash
            },
            order={
                "share_updated_at": "desc"
            },
            join_table="owners",
            join_key="hash"
        )

        for index in range(len(result)):
            result[index]["user_gravatar"] = cls.get_md5(result[index]["user_gravatar"])

        return result

    def get_code_history(cls, clip_hash):
        result = cls.DB.select(
            table="codes",
            column=[
                "owners.username AS user_name",
                "owners.email_address AS user_gravatar",
                "codes.hash AS code_hash",
                "codes.created_at AS code_created_at"
            ],
            where={
                "clip_hash": clip_hash
            },
            order={
                "code_created_at": "desc"
            },
            join_table="owners",
            join_key="hash"
        )

        for index in range(len(result)):
            result[index]["user_gravatar"] = cls.get_md5(result[index]["user_gravatar"])

        return result

    def get_clip(cls, clip_hash):
        return cls.DB.select(
            table="clips",
            column=[
                "hash",
                "name",
                "type",
                "tags",
                "owner_hash",
                "owner_public",
                "clip_mode",
                "created_at",
                "updated_at"
            ],
            where={
                "hash": clip_hash
            }
        )

    # ----------------------------------------------------------------
    # Inner Method
    # ----------------------------------------------------------------

    def _define(cls):
        cls.ERROR = {
            "code_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 51,
                    "message": "Error code does not defined."
                }
            },
            "unknown_code": {
                "{} error".format(cls.NAME): {
                    "code": 52,
                    "message": "Unknown error code."
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
            "default_owner_public_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 107,
                    "message": "[default_owner_public] does not defined."
                }
            },
            "default_clip_mode_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 108,
                    "message": "[default_clip_mode] does not defined."
                }
            },
            "created_at_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 109,
                    "message": "[created_at] does not defined."
                }
            },
            "updated_at_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 110,
                    "message": "[updated_at] does not defined."
                }
            },
            "owner_hash_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 111,
                    "message": "[owner_hash] does not defined."
                }
            },
            "name_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 112,
                    "message": "[name] does not defined."
                }
            },
            "type_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 113,
                    "message": "[type] does not defined."
                }
            },
            "owner_public_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 114,
                    "message": "[owner_public] does not defined."
                }
            },
            "clip_mode_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 115,
                    "message": "[clip_mode] does not defined."
                }
            },
            "tags_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 116,
                    "message": "[tags] does not defined."
                }
            },
            "data_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 117,
                    "message": "[data] does not defined."
                }
            },
            "ban_user_hash_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 118,
                    "message": "[ban_user_hash] does not defined."
                }
            },
            "clip_hash_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 119,
                    "message": "[clip_hash] does not defined."
                }
            },
            "code_hash_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 120,
                    "message": "[code_hash] does not defined."
                }
            },
            "share_hash_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 121,
                    "message": "[share_hash] does not defined."
                }
            },
            "encryption_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 122,
                    "message": "[encryption] does not defined."
                }
            },
            "model_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 151,
                    "message": "[sys] _check_str model does not defined."
                }
            },
            "model_type_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 152,
                    "message": "[sys] _check_str model_type does not defined."
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
            "default_owner_public_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 207,
                    "message": "[default_owner_public] is unknown class"
                }
            },
            "default_clip_mode_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 208,
                    "message": "[default_clip_mode] is unknown class"
                }
            },
            "created_at_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 209,
                    "message": "[created_at] is unknown class"
                }
            },
            "updated_at_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 210,
                    "message": "[updated_at] is unknown class"
                }
            },
            "owner_hash_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 211,
                    "message": "[owner_hash] is unknown class"
                }
            },
            "name_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 212,
                    "message": "[name] is unknown class"
                }
            },
            "type_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 213,
                    "message": "[type] is unknown class"
                }
            },
            "owner_public_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 214,
                    "message": "[owner_public] is unknown class"
                }
            },
            "clip_mode_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 215,
                    "message": "[clip_mode] is unknown class"
                }
            },
            "tags_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 216,
                    "message": "[tags] is unknown class"
                }
            },
            "data_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 217,
                    "message": "[data] is unknown class"
                }
            },
            "ban_user_hash_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 218,
                    "message": "[ban_user_hash] is unknown class"
                }
            },
            "clip_hash_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 219,
                    "message": "[clip_hash] is unknown class"
                }
            },
            "code_hash_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 220,
                    "message": "[code_hash] is unknown class"
                }
            },
            "share_hash_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 221,
                    "message": "[share_hash] is unknown class"
                }
            },
            "encryption_unknown_class": {
                "{} error".format(cls.NAME): {
                    "code": 222,
                    "message": "[encryption] is unknown class"
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
                    "message": "Hash already exists."
                }
            },
            "email_password_incorrect": {
                "{} error".format(cls.NAME): {
                    "code": 401,
                    "message": "The combination of the e-mail address and the password is incorrect."
                }
            },
            "password_incorrect": {
                "{} error".format(cls.NAME): {
                    "code": 402,
                    "message": "Password is incorrect."
                }
            },
            "user_not_found": {
                "{} error".format(cls.NAME): {
                    "code": 403,
                    "message": "User data not found."
                }
            },
            "clip_not_exists": {
                "{} error".format(cls.NAME): {
                    "code": 404,
                    "message": "Your clip not exists."
                }
            },
            "owner_not_exists": {
                "{} error".format(cls.NAME): {
                    "code": 405,
                    "message": "clip owner not exists."
                }
            },
            "failed_update_share": {
                "{} error".format(cls.NAME): {
                    "code": 406,
                    "message": "Failed to update share date."
                }
            },
            "corrupt_userdata": {
                "{} error".format(cls.NAME): {
                    "code": 801,
                    "message": "User data is corrupted. Please contact the administrator."
                }
            },
            "corrupt_clipdata": {
                "{} error".format(cls.NAME): {
                    "code": 802,
                    "message": "Clip data is corrupted. Please contact the administrator."
                }
            },
            "permission_denied": {
                "{} error".format(cls.NAME): {
                    "code": 901,
                    "message": "Permission denied."
                }
            },
            "permission_denied_or_clip_not_found": {
                "{} error".format(cls.NAME): {
                    "code": 902,
                    "message": "Permission denied or clip does not exist."
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

        if code in cls.ERROR:
            error = cls.ERROR[code]

        else:
            return cls._error("unknown_code", mode=sys._getframe().f_code.co_name, unknown_code=code)

        for i_args in range(len(arguments)):
            custom_message = "Custom Message {0}".format(i_args)
            error["{} error".format(cls.NAME)][custom_message] = arguments[i_args]

        for key in keyword_arguments.keys():
            error["{} error".format(cls.NAME)][key] = keyword_arguments[key]

        return error

    def _check_str(
        cls,
        model=None,
        model_type=None,
        not_defined_error=None,
        unknown_class_error=None
    ):
        if model_type is None:
            cls.result["error"] = cls._error("model_type_not_defined")
            cls.error = True
            return False

        if model is None:
            cls.result["error"] = cls._error("{type}_not_defined".format(**{"type": model_type}))
            cls.error = True
            return False
        else:
            if isinstance(model, str) is False:
                cls.result["error"] = cls._error("{type}_unknown_class".format(**{"type": model_type}))
                cls.error = True
                return False

        return True
