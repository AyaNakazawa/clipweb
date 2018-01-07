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
import user
import clip
import share

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
        _type = cgi.CGI.get("type")

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

        elif _type[0] == "clip":
            cls.check_clip(_type[1])

        elif _type[0] == "share":
            cls.check_share(_type[1])

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_type: {0}".format(_type)

    def check_user(cls, _type=None):
        USER = user.User()
        if _type == "register":
            cls.result["user"] = USER.register()

        elif _type == "login":
            cls.result["user"] = USER.login()

        elif _type == "setting":
            cls.result["user"] = USER.setting()

        elif _type == "info":
            cls.result["user"] = USER.info()

        elif _type == "leave":
            cls.result["user"] = USER.leave()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_user: {0}".format(_type)

    def check_clip(cls, _type=None):
        CLIP = clip.Clip()
        if _type == "new":
            cls.result["clip"] = CLIP.new()

        elif _type == "save":
            cls.result["clip"] = CLIP.save()

        elif _type == "delete":
            cls.result["clip"] = CLIP.delete()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_clip: {0}".format(_type)

    def check_share(cls, _type=None):
        SHARE = share.Share()
        if _type == "alive":
            cls.result["share"] = SHARE.alive()

        elif _type == "read":
            cls.result["share"] = SHARE.read()

        elif _type == "write":
            cls.result["share"] = SHARE.write()

        elif _type == "leave":
            cls.result["share"] = SHARE.leave()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_share: {0}".format(_type)

    # ----------------------------------------------------------------
    # Function
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
