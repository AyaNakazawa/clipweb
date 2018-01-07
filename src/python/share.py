#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb Share
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

class Share:
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

    def alive(cls):
        cls.result["type"] = "alive"
        return cls.result

    def read(cls):
        cls.result["type"] = "read"
        return cls.result

    def write(cls):
        cls.result["type"] = "write"
        return cls.result

    def leave(cls):
        cls.result["type"] = "leave"
        return cls.result
