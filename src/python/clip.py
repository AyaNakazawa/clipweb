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

from db import flex_sqlite3

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class Clip:
    # ----------------------------------------------------------------
    # Define

    def __init__(cls):
        cls.result = {}
        cls.DB_PATH = "db/clipweb.db"
        cls.DB = flex_sqlite3.FlexSQLite3(cls.DB_PATH)

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def set_cgi(cls, cgi=None):
        cls.cgi = cgi

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def new(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
        cls.result["result"] = True
        return cls.result

    def save(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
        cls.result["result"] = True
        return cls.result

    def delete(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False
        cls.result["result"] = True
        return cls.result
