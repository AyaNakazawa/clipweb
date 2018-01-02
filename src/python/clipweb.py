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
        _mode = cgi.CGI.get("mode")
        _mode = "USER.REGISTER"

        if _mode is not None:
            cls.check_mode(_mode)

    def check_mode(cls, _mode=None):
        # print(cls._mode)
        _mode = _mode.split(".")
        if _mode[0] == "USER":
            # print("user")
            cls.check_user(_mode[1])

        elif _mode[0] == "CLIP":
            # print("clip")
            cls.check_clip(_mode[1])

        elif _mode[0] == "SHARE":
            # print("share")
            cls.check_share(_mode[1])

        else:
            print("[ERROR]")
            print("check_mode: {0}".format(_mode))

    def check_user(cls, _mode=None):
        USER = user.User()
        # print("check user")
        if _mode == "REGISTER":
            # print("register")
            USER.register()

        elif _mode == "LOGIN":
            # print("login")
            USER.login()

        elif _mode == "SETTING":
            # print("setting")
            USER.setting()

        elif _mode == "INFO":
            # print("info")
            USER.info()

        elif _mode == "LEAVE":
            # print("leave")
            USER.leave()

        else:
            print("[ERROR]")
            print("check_user: {0}".format(_mode))

    def check_clip(cls, _mode=None):
        CLIP = clip.Clip()
        # print("check clip")
        if _mode == "NEW":
            # print("new")
            CLIP.new()

        elif _mode == "SAVE":
            # print("save")
            CLIP.save()

        elif _mode == "DELETE":
            # print("delete")
            CLIP.delete()

        else:
            print("[ERROR]")
            print("check_clip: {0}".format(_mode))

    def check_share(cls, _mode=None):
        SHARE = share.Share()
        # print("check share")
        if _mode == "ALIVE":
            # print("alive")
            SHARE.alive()

        elif _mode == "READ":
            # print("read")
            SHARE.read()

        elif _mode == "WRITE":
            # print("write")
            SHARE.write()

        elif _mode == "LEAVE":
            # print("leave")
            SHARE.leave()

        else:
            print("[ERROR]")
            print("check_share: {0}".format(_mode))

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
