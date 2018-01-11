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
        cls.result["insert"] = cls.insert(
            "insert into tests(id, name) values(:id, :name);",
            {"id": 100, "name": "test"}
        )
        cls.result["insert"] = cls.insert(
            "insert into tests(id, name) values(:id, :name);",
            {"id": 200, "name": "test22"}
        )
        cls.result["insert"] = cls.insert(
            "insert into tests(id, name) values(:id, :name);",
            {"id": 300, "name": "test333"}
        )
        cls.result["select"] = cls.select()
        cls.result["update"] = cls.update(200, "22test")
        cls.result["select2"] = cls.select()
        cls.result["delete"] = cls.delete("id", 100)
        cls.result["select3"] = cls.select()

    # ----------------------------------------------------------------
    # Function
    # ----------------------------------------------------------------

    def create(cls):
        return cls.DB.execute("create table tests(id integer, name text);")

    def insert(cls, query, model=None):
        if cls.exists(model, "id"):
            return cls.DB.execute(query, model)
        else:
            return False

    def update(cls, model=None):
        return cls.DB.execute("update tests set name=:name where id = :id;", model)

    def delete(cls, model=None):
        return cls.DB.execute("delete from tests where id = :id;", model)

    def select(cls, model=None):
        if id is None:
            return cls.DB.select("select * from tests where id = :id;", model)
        else:
            return cls.DB.select("select * from tests;")

    def exists(cls, model, key=None):
        select = cls.select(model)
        for record in select:
            if record[key] == model[key]:
                return False

        return True


test = Test()
print(json.dumps(test.result))
