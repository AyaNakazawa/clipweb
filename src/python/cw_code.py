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
        clip_data = cls.get_cgi("data", True)

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

        save_time = cls.get_date()
        cls.result["save_time"] = save_time

        code_value = {
            "hash": code_hash,
            "clip_hash": clip_hash,
            "owner_hash": user_hash,
            "encryption": clip_encryption,
            "created_at": save_time
        }

        if clip_data is not None:
            code_value["data"] = clip_data

        cls.result["code"] = cls.DB.insert(
            table="codes",
            value=code_value
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

        user_hash = cls.get_cgi("owner_hash")
        user_password_hash = cls.get_cgi("password_hash")
        clip_hash = cls.get_cgi("clip_hash")
        base_sync_hash = cls.get_cgi("base_sync_hash")
        last_patched = cls.get_cgi("last_patched")
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
            "clip_hash": clip_hash,
            "created_at": [
                last_patched, ">"
            ]
        }

        cls.result["patches"] = cls.DB.select(
            table="syncs",
            column=[
                "hash",
                "base_hash",
                "patch",
                "created_at"
            ],
            where=where,
            order={
                "created_at": "ASC"
            }
        )

        # ----------------------------------------------------------------
        # delete access

        cls.result["delete_access"] = cls.DB.delete(
            table="syncs",
            where={
                "hash": "access",
                "clip_hash": clip_hash,
                "owner_hash": user_hash,
                "created_at": [
                    cls.get_date(), "<"
                ]
            }
        )

        # ----------------------------------------------------------------
        # new sync

        patched_time = cls.get_date()

        new_sync = {
            "clip_hash": clip_hash,
            "owner_hash": user_hash,
            "base_hash": base_sync_hash,
            "created_at": patched_time
        }

        cls.result["patched_time"] = patched_time

        if new_sync_hash is not None:
            if len(cls.result["patches"]) == 0:
                new_sync["hash"] = new_sync_hash
                new_sync["patch"] = sync_patch

        cls.result["sync"] = cls.DB.insert(
            table="syncs",
            value=new_sync
        )

        # ----------------------------------------------------------------
        # select last save

        last_save = cls.DB.select(
            table="codes",
            column=[
                "created_at"
            ],
            where={
                "clip_hash": clip_hash
            },
            order={
                "created_at": "desc"
            }
        )

        cls.result["last_save"] = last_save[0]["created_at"]

        # ----------------------------------------------------------------
        # select member

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

    def chat(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # get & check cgi

        user_hash = cls.get_cgi("owner_hash")
        user_password_hash = cls.get_cgi("password_hash")
        clip_hash = cls.get_cgi("clip_hash")
        last_receive = cls.get_cgi("last_receive")
        message = cls.get_cgi("message", True)

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
        # delete access

        cls.result["delete_access"] = cls.DB.delete(
            table="chats",
            where={
                "message": "cw_code.access",
                "clip_hash": clip_hash,
                "owner_hash": user_hash,
                "created_at": [
                    cls.get_date(), "<"
                ]
            }
        )

        # ----------------------------------------------------------------
        # new chat

        last_date = cls.get_date()

        cls.result["last_date"] = last_date

        value = {
            "clip_hash": clip_hash,
            "owner_hash": user_hash,
            "message": "cw_code.access",
            "created_at": last_date
        }

        if message is not None:
            value["message"] = message

        cls.result["new_chat"] = cls.DB.insert(
            table="chats",
            value=value
        )

        # ----------------------------------------------------------------
        # select messages

        cls.result["messages"] = cls.DB.select(
            table="chats",
            column=[
                "chats.clip_hash AS clip_hash",
                "owners.username AS username",
                "chats.message AS message",
                "chats.created_at AS created_at"
            ],
            where={
                "chats.message": ["cw_code.access", "<>"],
                "chats.clip_hash": clip_hash,
                "chats.created_at": [
                    last_receive, ">"
                ]
            },
            join_table="owners",
            join_key="hash",
            order={
                "chats.created_at": "ASC"
            }
        )

        # ----------------------------------------------------------------
        # select member

        cls.result["member"] = cls.DB.select(
            table="chats",
            distinct=True,
            column=[
                "owners.hash AS user_hash",
                "owners.username AS user_name",
                "owners.email_address AS user_gravatar"
            ],
            where={
                "clip_hash": clip_hash,
                "chats.created_at": [
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
