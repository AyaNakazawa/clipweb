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
        print("init clipweb")
        _mode = cgi.CGI.get("mode")
        _mode = "user.register"
        # print(_mode)

        if _mode is not None:
            cls.check_mode(_mode)

    def check_mode(cls, _mode=None):
        # print(cls._mode)
        _mode = _mode.split(".")
        if _mode[0] == "user":
            print("user")
            cls.check_user(_mode[1])

        elif _mode[0] == "clip":
            print("clip")
            cls.check_clip(_mode[1])

        elif _mode[0] == "share":
            print("share")
            cls.check_share(_mode[1])

        else:
            print("check_mode error")

    def check_user(cls, _mode=None):
        USER = user.User()
        print("check user")
        if _mode == "register":
            print("register")
            USER.register()

        elif _mode == "login":
            print("login")
            USER.login()

        elif _mode == "setting":
            print("setting")
            USER.setting()

        elif _mode == "info":
            print("info")
            USER.info()

        elif _mode == "leave":
            print("leave")
            USER.leave()

        else:
            print("error check_user")

    def check_clip(cls, _mode=None):
        CLIP = clip.Clip()
        print("check clip")
        if _mode == "new":
            print("new")
            CLIP.new()

        elif _mode == "save":
            print("save")
            CLIP.save()

        elif _mode == "delete":
            print("delete")
            CLIP.delete()

        else:
            print("error check_clip")

    def check_share(cls, _mode=None):
        SHARE = share.Share()
        print("check share")
        if _mode == "alive":
            print("alive")
            SHARE.alive()

        elif _mode == "read":
            print("read")
            SHARE.read()

        elif _mode == "write":
            print("write")
            SHARE.write()

        elif _mode == "leave":
            print("leave")
            SHARE.leave()

        else:
            print("error check_share")

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

# ----------------------------------------------------------------
# Ready
# ----------------------------------------------------------------

print("run clipweb")

Clipweb()

print("done clipweb")
