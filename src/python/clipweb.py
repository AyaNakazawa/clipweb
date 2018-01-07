#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb
  Author: Aya Nakazawa
  GitHub: https://github.com/AyaNakazawa
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
        # print("[INIT]")
        # print("clipweb")
        _type = cgi.CGI.get("type")

        if _type is not None:
            cls.check_type(_type)
        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "type is null"

        cls.exit()

    def check_type(cls, _type=None):
        # print(cls._type)
        _type = _type.split(".")
        if _type[0] == "user":
            # print("user")
            cls.check_user(_type[1])

        elif _type[0] == "clip":
            # print("clip")
            cls.check_clip(_type[1])

        elif _type[0] == "share":
            # print("share")
            cls.check_share(_type[1])

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_type: {0}".format(_type)
            # print("[ERROR]")
            # print("check_type: {0}".format(_type))

    def check_user(cls, _type=None):
        USER = user.User()
        # print("check user")
        if _type == "register":
            # print("register")
            cls.result["user"] = USER.register()

        elif _type == "login":
            # print("login")
            cls.result["user"] = USER.login()

        elif _type == "setting":
            # print("setting")
            cls.result["user"] = USER.setting()

        elif _type == "info":
            # print("info")
            cls.result["user"] = USER.info()

        elif _type == "leave":
            # print("leave")
            cls.result["user"] = USER.leave()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_user: {0}".format(_type)
            # print("[ERROR]")
            # print("check_user: {0}".format(_type))

    def check_clip(cls, _type=None):
        CLIP = clip.Clip()
        # print("check clip")
        if _type == "new":
            # print("new")
            cls.result["clip"] = CLIP.new()

        elif _type == "save":
            # print("save")
            cls.result["clip"] = CLIP.save()

        elif _type == "delete":
            # print("delete")
            cls.result["clip"] = CLIP.delete()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_clip: {0}".format(_type)
            # print("[ERROR]")
            # print("check_clip: {0}".format(_type))

    def check_share(cls, _type=None):
        SHARE = share.Share()
        # print("check share")
        if _type == "alive":
            # print("alive")
            cls.result["share"] = SHARE.alive()

        elif _type == "read":
            # print("read")
            cls.result["share"] = SHARE.read()

        elif _type == "write":
            # print("write")
            cls.result["share"] = SHARE.write()

        elif _type == "leave":
            # print("leave")
            cls.result["share"] = SHARE.leave()

        else:
            cls.result["error"] = {}
            cls.result["error"]["message"] = "check_share: {0}".format(_type)
            # print("[ERROR]")
            # print("check_share: {0}".format(_type))

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

# print("[RUN]")
# print("clipweb")

app = Clipweb()

print(json.dumps(app.result))

# print("[EXIT]")
# print("clipweb")
