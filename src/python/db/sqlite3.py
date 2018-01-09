#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
SQLite3
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
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

    def __init__(cls, db_name=""):
        cls.DB_PATH = db_name
        cls.connect()

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def connect(cls):
        cls.connect = sqlite3.connect(cls.DB_PATH)
        cls.cursor = cls.connect.cursor()

    def disconnect(cls):
        cls.connect.close()

    def execute(cls, query="", args=None):
        try:
            if args is not None:
                cls.cursor.execute(query, args)
            cls.cursor.execute(query)
            cls.connect.commit()

        except Exception as e:
            return False

        return True

    def select(cls, query="", args=None):
        try:
            if args is not None:
                cls.cursor.execute(query, args)
            cls.cursor.execute(query)
            ncols = len(cls.cursor.description)
            colnames = [cls.cursor.description[i][0] for i in range(ncols)]
            results = []
            for row in cls.cursor.fetchall():
                res = {}
                for i in range(ncols):
                    res[colnames[i]] = row[i]
                results.append(res)

        except Exception as e:
            return False

        return results
