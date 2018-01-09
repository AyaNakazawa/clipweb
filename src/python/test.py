#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
test py
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

import json
from db import sqlite3

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class Test:
    # ----------------------------------------------------------------
    # Define

    # ----------------------------------------------------------------
    # Constructor
    # ----------------------------------------------------------------

    def __init__(cls):
        cls.DB_PATH = "db/test.db"
        cls.DB = sqlite3.SQLite3(cls.DB_PATH)

        cls.result = {}
        # cls.result["create"] = cls.create()
        cls.result["insert"] = cls.insert({"id": 100, "name": "test"})
        # cls.result["insert2"] = cls.insert(200, "test22")
        # cls.result["insert3"] = cls.insert(300, "test333")
        # cls.result["select"] = cls.select()
        # cls.result["update"] = cls.update(200, "22test")
        # cls.result["select2"] = cls.select()
        # cls.result["delete"] = cls.delete(100)
        cls.result["select"] = cls.select()

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def create(cls):
        return cls.DB.execute("create table tests(id integer, name text);")

    def insert(cls, args=None):
        select = cls.select(args)
        for record in select:
            if record["id"] == id:
                return False
        return cls.DB.execute("insert into tests(id, name) values(:id, ':name');", args)

    def update(cls, args=None):
        return cls.DB.execute("update tests set name=':name' where id = ':id';", args)

    def delete(cls, args=None):
        return cls.DB.execute("delete from tests where id = ':id';", args)

    def select(cls, args=None):
        if id is not None:
            return cls.DB.select("select * from tests where id = ':id';", args)
        return cls.DB.select("select * from tests;")

test = Test()
print(json.dumps(test.result))
