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
        _type = "USER.REGISTER"

        if _type is not None:
            cls.check_type(_type)

    def check_type(cls, _type=None):
        # print(cls._type)
        _type = _type.split(".")
        if _type[0] == "USER":
            # print("user")
            cls.check_user(_type[1])

        elif _type[0] == "CLIP":
            # print("clip")
            cls.check_clip(_type[1])

        elif _type[0] == "SHARE":
            # print("share")
            cls.check_share(_type[1])

        else:
            print("[ERROR]")
            print("check_type: {0}".format(_type))

    def check_user(cls, _type=None):
        USER = user.User()
        # print("check user")
        if _type == "REGISTER":
            # print("register")
            USER.register()

        elif _type == "LOGIN":
            # print("login")
            USER.login()

        elif _type == "SETTING":
            # print("setting")
            USER.setting()

        elif _type == "INFO":
            # print("info")
            USER.info()

        elif _type == "LEAVE":
            # print("leave")
            USER.leave()

        else:
            print("[ERROR]")
            print("check_user: {0}".format(_type))

    def check_clip(cls, _type=None):
        CLIP = clip.Clip()
        # print("check clip")
        if _type == "NEW":
            # print("new")
            CLIP.new()

        elif _type == "SAVE":
            # print("save")
            CLIP.save()

        elif _type == "DELETE":
            # print("delete")
            CLIP.delete()

        else:
            print("[ERROR]")
            print("check_clip: {0}".format(_type))

    def check_share(cls, _type=None):
        SHARE = share.Share()
        # print("check share")
        if _type == "ALIVE":
            # print("alive")
            SHARE.alive()

        elif _type == "READ":
            # print("read")
            SHARE.read()

        elif _type == "WRITE":
            # print("write")
            SHARE.write()

        elif _type == "LEAVE":
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
