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
    # Method
    # ----------------------------------------------------------------

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def search(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # get & check cgi

        user_hash = cls.get_cgi("owner_hash")
        user_password_hash = cls.get_cgi("password_hash")

        if cls.error:
            return cls.result

        # ----------------------------------------------------------------
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
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
                "clips.owner_hash AS clip_owner_hash",
                "clips.owner_public AS clip_owner_public",
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

        _delete_index = []
        _where_items = []
        _where_items.append(user_hash)
        for index in range(len(cls.result["clips"])):
            # 他のユーザーのPrivateなら返さない
            # もしPrivateを解除したときのために、DBからは消さない
            if cls.result["clips"][index]["clip_clip_mode"] == "private":
                if cls.result["clips"][index]["clip_owner_hash"] != user_hash:
                    _delete_index.append(index)

            # 公開ならオーナーリストに追加
            if cls.result["clips"][index]["clip_owner_public"] == "public":
                _where_items.append(cls.result["clips"][index]["clip_owner_hash"])

            else:
                # オーナー非公開のときは、オーナーハッシュ返さない
                if cls.result["clips"][index]["clip_owner_hash"] != user_hash:
                    cls.result["clips"][index]["clip_owner_hash"] = ""

        _where_items = list(set(_where_items))

        for index in reversed(range(len(_delete_index))):
            cls.result["clips"].pop(_delete_index[index])

        _where = ""
        for _hash in _where_items:
            _where += "hash = '{hash}' OR ".format(**{
                "hash": _hash
            })

        if len(_where_items) > 0:
            _where = _where[0:-4]

        # ----------------------------------------------------------------
        # select owner data
        cls.result["owners"] = cls.DB.select(
            table="owners",
            column=[
                "hash",
                "username"
            ],
            where=_where
        )

        if len(cls.result["owners"]) == 0:
            cls.result["error"] = cls._error("owner_not_exists")
            return cls.result

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    # ----------------------------------------------------------------
    # Inner Method
    # ----------------------------------------------------------------
