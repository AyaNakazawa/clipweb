#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
SQLite3 utility
  Author: Aya Nakazawa
  GitHub: https://github.com/AyaNakazawa
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

import sqlite3
import json

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class SQLite3:

    DB_PATH = 'clipweb.db'

    # def __init__:
    #     conn = sqlite3.connect(cls.DB_PATH)
    #     c = conn.cursor()
    #
    #     insert = "insert into users(hash, name) values(?,?)"
    #     user = ("aaaa", "bbbb")
    #     c.execute(insert, user)
    #
    #     conn.commit()
    #
    #     select = 'select * from users'
    #     for row in c.execute(select):
    #         print(row)
    #
    #     conn.close()

print("Content-type: text/html; charset=UTF-8")
print()
print("my sqlite3")
