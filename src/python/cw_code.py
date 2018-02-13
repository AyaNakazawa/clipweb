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
    # Method
    # ----------------------------------------------------------------

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def load(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # get & check cgi

        user_hash = cls.get_cgi("owner_hash")
        user_password_hash = cls.get_cgi("password_hash")
        clip_hash = cls.get_cgi("clip_hash")
        code_hash = cls.get_cgi("code_hash", True)

        if cls.error:
            return cls.result

        # ----------------------------------------------------------------
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # select clip data

        data = None

        if code_hash is not None:
            data = cls.DB.select(
                table="clips",
                column=[
                    "name",
                    "type",
                    "owner_hash",
                    "clip_mode",
                ],
                where={
                    "hash": clip_hash
                }
            )
            code = cls.DB.select(
                table="codes",
                column=[
                    "encryption",
                    "data",
                    "created_at"
                ],
                where={
                    "hash": code_hash
                }
            )
            data[0]["encryption"] = code[0]["encryption"]
            data[0]["data"] = code[0]["data"]
            data[0]["code_update"] = code[0]["created_at"]
        else:
            data = cls.DB.select(
                table="clips",
                column=[
                    "clips.hash AS clip_hash",
                    "clips.name AS name",
                    "clips.type AS type",
                    "clips.owner_hash AS owner_hash",
                    "clips.clip_mode AS clip_mode",
                    "codes.encryption AS encryption",
                    "codes.data AS data",
                    "codes.created_at AS code_update"
                ],
                where={
                    "clip_hash": clip_hash
                },
                join_table="codes",
                join_key="hash"
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
        cls.result["code_update"] = data["code_update"]
        cls.result["clip_mode"] = data["clip_mode"]
        cls.result["owner_hash"] = data["owner_hash"]
        cls.result["encryption"] = data["encryption"]

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
        # get & check cgi

        user_hash = cls.get_cgi("owner_hash")
        user_password_hash = cls.get_cgi("password_hash")
        clip_hash = cls.get_cgi("clip_hash")
        clip_encryption = cls.get_cgi("encryption")
        clip_data = cls.get_cgi("data")

        if cls.error:
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
        # create code hash

        code_hash = cls.get_sha256()

        # ----------------------------------------------------------------
        # insert code

        cls.result["code"] = cls.DB.insert(
            table="codes",
            value={
                "hash": code_hash,
                "clip_hash": clip_hash,
                "owner_hash": user_hash,
                "encryption": clip_encryption,
                "data": clip_data,
                "created_at": cls.get_date()
            }
        )

        # ----------------------------------------------------------------
        # save clip

        cls.result["save"] = cls.DB.update(
            table="clips",
            value={
                "code_hash": code_hash,
                "updated_at": cls.get_date()
            },
            where={
                "hash": clip_hash
            }
        )

        # ----------------------------------------------------------------
        # delete sync

        cls.result["sync"] = cls.DB.delete(
            table="syncs",
            where={
                "clip_hash": clip_hash,
                "created_at": [
                    cls.get_date(), "<"
                ]
            }
        )

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def sync(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # get & check cgi

        user_hash = cls.get_cgi("owner_hash", True)
        user_password_hash = cls.get_cgi("password_hash", True)
        clip_hash = cls.get_cgi("clip_hash", True)
        base_sync_hash = cls.get_cgi("base_sync_hash", True)
        new_sync_hash = cls.get_cgi("new_sync_hash", True)
        sync_patch = cls.get_cgi("sync_patch", True)

        if cls.error:
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
            if auth["clip_mode"] == 'private':
                cls.result["error"] = cls._error("permission_denied")
                return cls.result

        # ----------------------------------------------------------------
        # select patches

        where = {
            "hash": [
                "access", "<>"
            ],
            "clip_hash": clip_hash
        }

        _base_created_at = cls.DB.select(
            table="syncs",
            column="created_at",
            where={
                "hash": [
                    "access", "<>"
                ],
                "base_hash": base_sync_hash
            },
            order={
                "created_at": "DESC"
            }
        )

        cls.result["patches"] = []

        if len(_base_created_at) > 0:
            where["created_at"] = [
                _base_created_at[0]["created_at"], ">="
            ]

            cls.result["patches"] = cls.DB.select(
                table="syncs",
                column=[
                    "hash",
                    "base_hash",
                    "patch"
                ],
                where=where,
                order={
                    "created_at": "ASC"
                }
            )

        # ----------------------------------------------------------------
        # new sync

        new_sync = {
            "clip_hash": clip_hash,
            "owner_hash": user_hash,
            "base_hash": base_sync_hash,
            "created_at": cls.get_date()
        }

        if new_sync_hash is not None:
            new_sync["hash"] = new_sync_hash
            new_sync["patch"] = sync_patch

        cls.result["sync"] = cls.DB.insert(
            table="syncs",
            value=new_sync
        )

        # ----------------------------------------------------------------
        # select member

        where = {
            "clip_hash": clip_hash
        }

        cls.result["member"] = cls.DB.select(
            table="syncs",
            distinct=True,
            column=[
                "owners.hash AS user_hash",
                "owners.username AS user_name",
                "owners.email_address AS user_gravatar"
            ],
            where={
                "clip_hash": clip_hash,
                "syncs.created_at": [
                    cls.get_date(datetime.datetime.now() - datetime.timedelta(minutes=1)),
                    ">"
                ]
            },
            join_table="owners",
            join_key="hash"
        )

        if isinstance(cls.result["member"], list):
            for index in range(len(cls.result["member"])):
                cls.result["member"][index]["user_gravatar"] = cls.get_md5(cls.result["member"][index]["user_gravatar"])

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    # ----------------------------------------------------------------
    # Inner Method
    # ----------------------------------------------------------------
