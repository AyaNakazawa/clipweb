#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb User
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

class User:
    # ----------------------------------------------------------------
    # Define

    DB = sqlite3.SQLite3()

    # ----------------------------------------------------------------
    # Constructor
    # ----------------------------------------------------------------

    def __init__(cls):
        print("[INIT]")
        print("clipweb User")

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def register(cls):
        print("[FUNC]")
        print("User.register()")

    def login(cls):
        print("[FUNC]")
        print("User.login()")

    def setting(cls):
        print("[FUNC]")
        print("User.setting()")

    def info(cls):
        print("[FUNC]")
        print("User.info()")

    def leave(cls):
        print("[FUNC]")
        print("User.leave()")
