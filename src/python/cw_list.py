#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb List
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

class List(cw_base.Base):
    # ----------------------------------------------------------------
    # Define

    def __init__(cls):
        super(List, cls).__init__("clipweb list")

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def search(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_hash = cls.cgi.get("hash")
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
            model=user_password_hash,
            not_defined_error="password_hash_not_defined",
            unknown_class_error="password_hash_unknown_class"
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
            cls.result["error"] = cls._error("password_incorrect")
            return cls.result

        # ----------------------------------------------------------------
        # select clip data

        cls.result["clips"] = cls.DB.select(
            table="shares",
            column=[
                "clips.hash AS clip_hash",
                "clips.name AS clip_name",
                "clips.type AS clip_type",
                "clips.tags AS clip_tags",
                "clips.hash AS clip_hash",
                "clips.owner_hash AS clip_owner_hash",
                "clips.owner_publish AS clip_owner_publish",
                "clips.clip_mode AS clip_clip_mode",
                "clips.created_at AS clip_created_at",
                "clips.updated_at AS clip_updated_at",
                "shares.owner_hash AS share_owner_hash",
                "shares.created_at AS share_created_at",
                "shares.updated_at AS share_updated_at"
            ],
            where={
                "share_owner_hash": user_hash
            },
            join_table="clips",
            join_key="hash"
        )

        if len(cls.result["clips"]) == 0:
            cls.result["error"] = cls._error("clip_not_exists")
            return cls.result

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result
