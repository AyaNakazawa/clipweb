#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb Code
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

import sys
import datetime
from db import flex_sqlite3
import cw_base

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class Code(cw_base.Base):
    # ----------------------------------------------------------------
    # Define

    def __init__(cls):
        super(Code, cls).__init__("clipweb code")

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def load(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_hash = cls.cgi.get("owner_hash")
        user_password_hash = cls.cgi.get("password_hash")
        clip_hash = cls.cgi.get("hash")

        # ----------------------------------------------------------------
        # cgi get strings check

        if cls._check_str(
            model=user_hash,
            not_defined_error="owner_hash_not_defined",
            unknown_class_error="owner_hash_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=user_password_hash,
            not_defined_error="password_hash_not_defined",
            unknown_class_error="password_hash_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_hash,
            not_defined_error="hash_not_defined",
            unknown_class_error="hash_unknown_class"
        ) is False:
            return cls.result

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
        # select clip data

        data = cls.DB.select(
            table="clips",
            column=[
                "owner_hash",
                "clip_mode",
                "data"
            ],
            where={
                "hash": clip_hash
            }
        )

        if len(data) > 1:
            cls.result["error"] = cls._error("corrupt_clipdata")
            return cls.result

        if len(data) < 1:
            cls.result["error"] = cls._error("clip_not_exists")
            return cls.result

        data = data[0]
        if data["clip_mode"] == "private":
            if data["owner_hash"] != user_hash:
                cls.result["error"] = cls._error("permission_denied")
                return cls.result

        cls.result["data"] = data["data"]

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def save(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
        cls.result["result"] = True
        return cls.result