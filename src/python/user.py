#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb User
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

from web import cgi
from db import sqlite3

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class User:
    # ----------------------------------------------------------------
    # Define

    DB = sqlite3.SQLite3()

    # ----------------------------------------------------------------
    # Constructor
    # ----------------------------------------------------------------

    def __init__(cls):
        cls.result = {}

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def register(cls):
        cls.result["type"] = "register"
        return cls.result

    def login(cls):
        cls.result["type"] = "login"
        return cls.result

    def setting(cls):
        cls.result["type"] = "setting"
        return cls.result

    def info(cls):
        cls.result["type"] = "info"
        return cls.result

    def leave(cls):
        cls.result["type"] = "leave"
        return cls.result
