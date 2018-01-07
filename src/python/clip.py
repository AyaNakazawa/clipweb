#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb Clip
  Author: Aya Nakazawa
  GitHub: https://github.com/AyaNakazawa
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

    DB = sqlite3.SQLite3()

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
