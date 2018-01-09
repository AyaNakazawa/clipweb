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

    # ----------------------------------------------------------------
    # Constructor
    # ----------------------------------------------------------------

    def __init__(cls):
        cls.result = {}
        cls.DB_PATH = "db/clipweb.db"
        cls.DB = sqlite3.SQLite3(cls.DB_PATH)

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def register(cls):
        cls.result["type"] = "register"
        cls.result["result"] = True
        return cls.result

    def login(cls):
        cls.result["type"] = "login"
        cls.result["result"] = True
        return cls.result

    def setting(cls):
        cls.result["type"] = "setting"
        cls.result["result"] = True
        return cls.result

    def info(cls):
        cls.result["type"] = "info"
        cls.result["result"] = True
        return cls.result

    def leave(cls):
        cls.result["type"] = "leave"
        cls.result["result"] = True
        return cls.result
