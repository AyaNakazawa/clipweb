#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb Clip
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

class Clip(cw_base.Base):
    # ----------------------------------------------------------------
    # Define

    def __init__(cls):
        super(Clip, cls).__init__("clipweb clip")

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def new(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_hash = cls.cgi.get("owner_hash")
        user_password_hash = cls.cgi.get("password_hash")
        clip_hash = cls.cgi.get("hash")
        clip_name = cls.cgi.get("filename")
        clip_type = cls.cgi.get("filetype")
        clip_tags = cls.cgi.get("tags")
        clip_owner_public = cls.cgi.get("owner_public")
        clip_clip_mode = cls.cgi.get("clip_mode")

        if clip_tags is None:
            clip_tags = ""

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

        if cls._check_str(
            model=clip_name,
            not_defined_error="name_not_defined",
            unknown_class_error="name_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_type,
            not_defined_error="type_not_defined",
            unknown_class_error="type_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_tags,
            unknown_class_error="tags_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_owner_public,
            not_defined_error="owner_public_not_defined",
            unknown_class_error="owner_public_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_clip_mode,
            not_defined_error="clip_mode_not_defined",
            unknown_class_error="clip_mode_unknown_class"
        ) is False:
            return cls.result

        # ----------------------------------------------------------------
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # check overlap clip info

        num_hash_overlap = cls.DB.count_records(table="clips", where={
            "hash": clip_hash
        })

        if num_hash_overlap > 0:
            cls.result["error"] = cls._error("hash_overlap")
            return cls.result

        # ----------------------------------------------------------------
        # insert new clip

        value = {
            "hash": clip_hash,
            "owner_hash": user_hash,
            "name": clip_name,
            "type": clip_type,
            "owner_public": clip_owner_public,
            "clip_mode": clip_clip_mode,
            "created_at": cls.get_date(),
            "updated_at": cls.get_date()
        }
        if isinstance(clip_tags, str):
            if len(clip_tags) > 0:
                value["tags"] = clip_tags

        cls.result["new_clip"] = cls.DB.insert(
            table="clips",
            value=value
        )

        # ----------------------------------------------------------------
        # insert new share

        cls.result["new_share"] = cls.DB.insert(
            table="shares",
            value={
                "owner_hash": user_hash,
                "clip_hash": clip_hash,
                "created_at": cls.get_date(),
                "updated_at": cls.get_date()
            }
        )

        # ----------------------------------------------------------------
        # return

        cls.result["hash"] = clip_hash
        cls.result["result"] = True
        return cls.result

    def setting(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # cgi get

        user_hash = cls.cgi.get("owner_hash")
        user_password_hash = cls.cgi.get("password_hash")
        clip_hash = cls.cgi.get("hash")
        clip_filename = cls.cgi.get("filename")
        clip_filetype = cls.cgi.get("filetype")
        clip_tags = cls.cgi.get("tags")
        clip_owner_public = cls.cgi.get("owner_public")
        clip_clip_mode = cls.cgi.get("clip_mode")

        if clip_tags is None:
            clip_tags = ""

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

        if cls._check_str(
            model=clip_filename,
            not_defined_error="filename_not_defined",
            unknown_class_error="filename_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_filetype,
            not_defined_error="filetype_not_defined",
            unknown_class_error="filetype_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_tags,
            unknown_class_error="tags_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_owner_public,
            not_defined_error="owner_public_not_defined",
            unknown_class_error="owner_public_unknown_class"
        ) is False:
            return cls.result

        if cls._check_str(
            model=clip_clip_mode,
            not_defined_error="clip_mode_not_defined",
            unknown_class_error="clip_mode_unknown_class"
        ) is False:
            return cls.result

        # ----------------------------------------------------------------
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # update data

        cls.result["update"] = cls.DB.update(
            table="clips",
            value={
                "name": clip_filename,
                "type": clip_filetype,
                "tags": clip_tags,
                "owner_public": clip_owner_public,
                "clip_mode": clip_clip_mode,
                "updated_at": cls.get_date()
            },
            where={
                "hash": clip_hash,
                "owner_hash": user_hash
            }
        )

        # ----------------------------------------------------------------
        # select clip data

        cls.result["clip"] = cls.get_clip(clip_hash)

        if len(cls.result["clip"]) > 1:
            cls.result["error"] = cls._error("corrupt_clipdata")
            return cls.result

        if len(cls.result["clip"]) < 1:
            cls.result["error"] = cls._error("clip_not_exists")
            return cls.result

        cls.result["clip"] = cls.result["clip"][0]

        # ----------------------------------------------------------------
        # select user data

        cls.result["users"] = cls.get_share_users(clip_hash)

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

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
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # select clip data

        cls.result["clip"] = cls.get_clip(clip_hash)

        if len(cls.result["clip"]) > 1:
            cls.result["error"] = cls._error("corrupt_clipdata")
            return cls.result

        if len(cls.result["clip"]) < 1:
            cls.result["error"] = cls._error("clip_not_exists")
            return cls.result

        cls.result["clip"] = cls.result["clip"][0]

        # ----------------------------------------------------------------
        # select user data

        cls.result["users"] = cls.get_share_users(clip_hash)

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def delete(cls):
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
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # delete data

        cls.result["delete_clip"] = cls.DB.delete(
            table="clips",
            where={
                "hash": clip_hash,
                "owner_hash": user_hash
            }
        )

        cls.result["delete_share"] = cls.DB.delete(
            table="shares",
            where={
                "clip_hash": clip_hash
            }
        )

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def share(cls):
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
        # check user

        if cls.check_user(user_hash, user_password_hash) is False:
            return cls.result

        # ----------------------------------------------------------------
        # check clip

        clip = cls.DB.select(
            table="clips",
            column=[
                "clip_mode"
            ],
            where={
                "hash": clip_hash
            }
        )

        if len(clip) > 1:
            cls.result["error"] = cls._error("corrupt_clipdata")
            return cls.result

        if len(clip) < 1:
            cls.result["error"] = cls._error("clip_not_exists")
            cls.result["error"] = cls._error("permission_denied_or_clip_not_found")
            return cls.result

        clip = clip[0]
        if clip["clip_mode"] is 'private':
            cls.result["error"] = cls._error("permission_denied")
            cls.result["error"] = cls._error("permission_denied_or_clip_not_found")
            return cls.result

        # ----------------------------------------------------------------
        # check share

        num_share = cls.DB.count_records(
            table="shares",
            where={
                "owner_hash": user_hash,
                "clip_hash": clip_hash
            }
        )

        # ----------------------------------------------------------------
        # insert new share

        if num_share == 0:
            cls.result["new_share"] = cls.DB.insert(
                table="shares",
                value={
                    "owner_hash": user_hash,
                    "clip_hash": clip_hash,
                    "created_at": cls.get_date(),
                    "updated_at": cls.get_date()
                }
            )

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    def ban(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
        cls.result["result"] = True
        return cls.result
