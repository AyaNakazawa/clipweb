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

from web import cgi
from db import sqlite3

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class Clip:
    # ----------------------------------------------------------------
    # Define

    DB_PATH = "db/clipweb.db"
    DB = sqlite3.SQLite3(DB_PATH)

    # ----------------------------------------------------------------
    # Constructor
    # ----------------------------------------------------------------

    def __init__(cls):
        cls.result = {}

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def new(cls):
        cls.result["type"] = "new"
        return cls.result

    def save(cls):
        cls.result["type"] = "save"
        return cls.result

    def delete(cls):
        cls.result["type"] = "delete"
        return cls.result
