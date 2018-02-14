#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

import json
import datetime
import time

from web import cgi
from db import flex_sqlite3
import cw_user
import cw_clip
import cw_list
import cw_code

TIME = {}
TIME["init"] = datetime.datetime.now()
AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class Clipweb:
    # ----------------------------------------------------------------
    # Define

    result = {}

    # ----------------------------------------------------------------
    # Constructor
    # ----------------------------------------------------------------

    def __init__(cls):
        cls.cgi = cgi.CGI()
        _type = cls.cgi.get("type")

        if _type is not None:
            cls.check_type(_type)
        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "type is null"

        cls.exit()

    def check_type(cls, _type=None):
        _type = _type.split(".")
        if _type[0] == "user":
            cls.check_user(_type[1])

        elif _type[0] == "list":
            cls.check_list(_type[1])

        elif _type[0] == "clip":
            cls.check_clip(_type[1])

        elif _type[0] == "code":
            cls.check_code(_type[1])

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_type: {0}".format(_type)

    def check_user(cls, _type=None):
        USER = cw_user.User()
        USER.set_cgi(cls.cgi)
        if _type == "register":
            cls.result["user"] = USER.register()

        elif _type == "login":
            cls.result["user"] = USER.login()

        elif _type == "logout":
            cls.result["user"] = USER.logout()

        elif _type == "setting":
            cls.result["user"] = USER.setting()

        elif _type == "info":
            cls.result["user"] = USER.info()

        elif _type == "leave":
            cls.result["user"] = USER.leave()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_user: {0}".format(_type)

    def check_list(cls, _type=None):
        LIST = cw_list.List()
        LIST.set_cgi(cls.cgi)
        if _type == "search":
            cls.result["list"] = LIST.search()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_clip: {0}".format(_type)

    def check_clip(cls, _type=None):
        CLIP = cw_clip.Clip()
        CLIP.set_cgi(cls.cgi)
        if _type == "new":
            cls.result["clip"] = CLIP.new()

        elif _type == "setting":
            cls.result["clip"] = CLIP.setting()

        elif _type == "load":
            cls.result["clip"] = CLIP.load()

        elif _type == "delete":
            cls.result["clip"] = CLIP.delete()

        elif _type == "share":
            cls.result["clip"] = CLIP.share()

        elif _type == "privilege":
            cls.result["clip"] = CLIP.privilege()

        elif _type == "ban":
            cls.result["clip"] = CLIP.ban()

        elif _type == "history":
            cls.result["clip"] = CLIP.history()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_clip: {0}".format(_type)

    def check_code(cls, _type=None):
        CODE = cw_code.Code()
        CODE.set_cgi(cls.cgi)
        if _type == "load":
            cls.result["code"] = CODE.load()

        elif _type == "save":
            cls.result["code"] = CODE.save()

        elif _type == "sync":
            cls.result["code"] = CODE.sync()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_clip: {0}".format(_type)

    # ----------------------------------------------------------------
    # Method
    # ----------------------------------------------------------------

    def exit(cls):
        global TIME
        TIME["app"] = datetime.datetime.now()
        cls.result["exec_time"] = (TIME["app"] - TIME["init"]).total_seconds()

# ----------------------------------------------------------------
# Ready
# ----------------------------------------------------------------

app = Clipweb()

print(json.dumps(app.result))
