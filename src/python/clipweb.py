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

from web import cgi
import user
import clip
import share

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class Clipweb:
    # ----------------------------------------------------------------
    # Define

    # ----------------------------------------------------------------
    # Constructor
    # ----------------------------------------------------------------

    def __init__(cls):
        print("[INIT]")
        print("clipweb")
        _type = cgi.CGI.get("type")

        if _type is not None:
            cls.check_type(_type)

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
            print("[ERROR]")
            print("check_type: {0}".format(_type))

    def check_user(cls, _type=None):
        USER = user.User()
        # print("check user")
        if _type == "register":
            # print("register")
            USER.register()

        elif _type == "login":
            # print("login")
            USER.login()

        elif _type == "setting":
            # print("setting")
            USER.setting()

        elif _type == "info":
            # print("info")
            USER.info()

        elif _type == "leave":
            # print("leave")
            USER.leave()

        else:
            print("[ERROR]")
            print("check_user: {0}".format(_type))

    def check_clip(cls, _type=None):
        CLIP = clip.Clip()
        # print("check clip")
        if _type == "new":
            # print("new")
            CLIP.new()

        elif _type == "save":
            # print("save")
            CLIP.save()

        elif _type == "delete":
            # print("delete")
            CLIP.delete()

        else:
            print("[ERROR]")
            print("check_clip: {0}".format(_type))

    def check_share(cls, _type=None):
        SHARE = share.Share()
        # print("check share")
        if _type == "alive":
            # print("alive")
            SHARE.alive()

        elif _type == "read":
            # print("read")
            SHARE.read()

        elif _type == "write":
            # print("write")
            SHARE.write()

        elif _type == "leave":
            # print("leave")
            SHARE.leave()

        else:
            print("[ERROR]")
            print("check_share: {0}".format(_type))

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

# ----------------------------------------------------------------
# Ready
# ----------------------------------------------------------------

print("[RUN]")
print("clipweb")

Clipweb()

print("[EXIT]")
print("clipweb")
