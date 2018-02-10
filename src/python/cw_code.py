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
    # Method
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

        if cls._check_str(user_hash, "owner_hash") is False:
            return cls.result

        if cls._check_str(user_password_hash, "password_hash") is False:
            return cls.result

        if cls._check_str(clip_hash, "hash") is False:
            return cls.result

        # ----------------------------------------------------------------
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # select clip data

        data = cls.DB.select(
            table="clips",
            column=[
                "owner_hash",
                "clip_mode",
                "name",
                "type",
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

        cls.result["filename"] = data["name"]
        cls.result["filetype"] = data["type"]
        cls.result["data"] = data["data"]
        cls.result["clip_mode"] = data["clip_mode"]
        cls.result["owner_hash"] = data["owner_hash"]

        # ----------------------------------------------------------------
        # share date update

        _share_update = cls.DB.update(
            table="shares",
            value={
                "updated_at": cls.get_date()
            },
            where={
                "owner_hash": user_hash,
                "clip_hash": clip_hash
            }
        )

        if _share_update is False:
            cls.result["error"] = cls._error("failed_update_share")
            return cls.result

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def save(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_hash = cls.cgi.get("owner_hash")
        user_password_hash = cls.cgi.get("password_hash")
        clip_hash = cls.cgi.get("hash")
        clip_data = cls.cgi.get("data")

        if clip_data is None:
            clip_data = ""

        # ----------------------------------------------------------------
        # cgi get strings check

        if cls._check_str(user_hash, "owner_hash") is False:
            return cls.result

        if cls._check_str(user_password_hash, "password_hash") is False:
            return cls.result

        if cls._check_str(clip_hash, "hash") is False:
            return cls.result

        if cls._check_str(clip_data, "data") is False:
            return cls.result

        # ----------------------------------------------------------------
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # auth

        auth = cls.DB.select(
            table="clips",
            column=[
                "owner_hash",
                "clip_mode"
            ],
            where={
                "hash": clip_hash
            }
        )

        auth = auth[0]
        if auth["owner_hash"] != user_hash:
            if auth["clip_mode"] != 'share':
                cls.result["error"] = cls._error("permission_denied")
                return cls.result

        # ----------------------------------------------------------------
        # save data

        cls.result["save"] = cls.DB.update(
            table="clips",
            value={
                "data": clip_data,
                "updated_at": cls.get_date()
            },
            where={
                "hash": clip_hash
            }
        )

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    # ----------------------------------------------------------------
    # Inner Method
    # ----------------------------------------------------------------
