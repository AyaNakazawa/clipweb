#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
Flex SQLite3
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

import sqlite3
import json
import sys
import copy

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class FlexSQLite3:

    # ----------------------------------------------------------------
    # Define
    # ----------------------------------------------------------------

    def __init__(cls, db_name=None, auto_connect=True):
        # Define
        cls._define()
        cls.DB_PATH = db_name
        cls.status = False

        # Define alias
        cls.set = cls.set_db
        cls.start = cls.connect
        cls.exit = cls.disconnect

        # Check DB
        if cls._check_db() is False:
            return

        # Check status
        if cls._check_status(False) is False:
            return

        # Auto connect
        if auto_connect:
            cls.connect()

    # ----------------------------------------------------------------
    # Method
    # ----------------------------------------------------------------

    def set_db(
        cls,
        db_name=None
    ):
        if db_name is None:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        cls.DB_PATH = db_name
        return True

    def connect(cls):
        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(False) is False:
            return cls._error("already_connected", mode=sys._getframe().f_code.co_name)

        cls.connection = sqlite3.connect(cls.DB_PATH)
        cls.cursor = cls.connection.cursor()

        cls.status = True
        return True

    def disconnect(cls):
        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("already_disconnected", mode=sys._getframe().f_code.co_name)

        cls.connection.close()

        cls.status = False
        return True

    def commit(cls):
        try:
            cls.connection.commit()

        except Exception as e:
            return cls._error("commit_exception", mode=sys._getframe().f_code.co_name)

        return True

    # ----------------------------------------------------------------
    # SQL
    # ----------------------------------------------------------------

    def execute(
        cls,
        query=None,
        dict_model=None,
        list_model=None
    ):

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        if query is None:
            return cls._error("query_not_defined", mode=sys._getframe().f_code.co_name)

        elif isinstance(query, str):
            # String
            exec_query = query

        else:
            # unknown type
            return cls._error("query_type", mode=sys._getframe().f_code.co_name)

        try:
            if dict_model is not None:
                # Dict model query
                cls.cursor.execute(exec_query, dict_model)

            elif list_model is not None:
                # List model query
                cls.cursor.execute(exec_query, list_model)

            else:
                # No model query
                cls.cursor.execute(exec_query)

            cls.connection.commit()

        except Exception as e:
            return cls._error("execute_exception", mode=sys._getframe().f_code.co_name)

        return True

    def table_exists(
        cls,
        table=None
    ):
        """
        :param table (str)    : Check table name.
        :return      (boolean): Exists status.
        """

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        # ----------------------------------------------------------------
        # Table name
        if isinstance(table, str):
            # String
            table_name = table

        elif table is None:
            # None
            return cls._error("table_not_defined", mode=sys._getframe().f_code.co_name)

        else:
            # unknown type
            return cls._error("table_type", mode=sys._getframe().f_code.co_name)

        # ----------------------------------------------------------------
        # Query
        try:
            num_records = cls.count_records(
                query="SELECT COUNT(*) FROM sqlite_master WHERE TYPE='table' AND name=:name;",
                model={"name": table_name}
            )

            if num_records == 0:
                return False
            return True

        except Exception as e:
            return cls._error("table_exists_exception", mode=sys._getframe().f_code.co_name)

    def count_records(
        cls,
        table=None,
        where=None,
        where_op=None,
        where_not=None,
        where_type=None,
        query=None,
        model=None
    ):
        """
        :param table      (str)         : Table name.
        :param where      (dict|str)    : Where Dict or String.
        :param where_op   (str)         : Where Operator. Default: "=". e.g. "=" or ">" etc...
        :param where_not  (boolean|str) : Where Not Operator. Default: False. e.g. True or "not" etc...
        :param where_type (str)         : Where Type. Default: "AND". e.g. "AND" or "OR" etc...
            OR
        :param query      (str)         : Query string.
        :param model      (dict)        : Model of query, qmark or named style.

        :return           (list|boolean): Select result or Failed status.
        """

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        if query is None:
            # ----------------------------------------------------------------
            # No query

            # ----------------------------------------------------------------
            # Table name
            if isinstance(table, str):
                # String
                if cls.table_exists(table=table) is False:
                    return cls._error("table_not_exists", mode=sys._getframe().f_code.co_name)

                query_table = table

            elif table is None:
                # None
                return cls._error("table_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("table_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Where dict
            if isinstance(where, str):
                # String
                query_where = where

            elif isinstance(where, dict):
                # Dict
                query_where = ""

                # Check where_op
                if where_op not in cls.WHERE_OPS:
                    where_op = cls.WHERE_OPS[0]
                # Check where_type
                if where_type not in cls.WHERE_TYPES:
                    where_type = cls.WHERE_TYPES[0]
                # Check where_not
                if where_not not in cls.WHERE_NOTS:
                    where_not = cls.WHERE_NOTS[0]

                # Generate where_not
                if where_not is True:
                    where_not = "not"
                elif where_not is False:
                    where_not = ""

                for where_key in where.keys():
                    query_where += "{not} {key} {op} :{key} {type} ".format(**{
                        "key": where_key,
                        "not": where_not,
                        "op": where_op,
                        "type": where_type
                    })

                # Slice " and "
                if len(where.keys()) > 0:
                    query_where = query_where[0:-5]

            elif where is None:
                # None
                query_where = ""

            else:
                # unknown type
                return cls._error("where_type", mode=sys._getframe().f_code.co_name)

            # Add "WHERE "
            if len(query_where) > 0:
                query_where = "WHERE " + query_where

            # ----------------------------------------------------------------
            # Generate query
            exec_query = "SELECT COUNT(*) FROM {table} {where};".format(**{
                "table": query_table,
                "where": query_where
            })

        else:
            # ----------------------------------------------------------------
            # Query exists
            if isinstance(query, str):
                # String
                exec_query = query

            else:
                # unknown type
                return cls._error("query_type", mode=sys._getframe().f_code.co_name)

        # ----------------------------------------------------------------
        # Query
        try:
            if where is not None:
                # Dict model query
                if isinstance(where, dict):
                    cls.cursor.execute(exec_query, where)
                else:
                    cls.cursor.execute(exec_query)

            elif model is not None:
                # model query
                cls.cursor.execute(exec_query, model)

            else:
                # No model query
                cls.cursor.execute(exec_query)

            result = cls.cursor.fetchone()[0]

        except Exception as e:
            return cls._error("count_records_exception", mode=sys._getframe().f_code.co_name)

        return result

    def drop(
        cls,
        table=None
    ):
        """
        :param table (str)    : Check table name.
        :return      (boolean): Drop result.
        """

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        # ----------------------------------------------------------------
        # Table name
        if isinstance(table, str):
            # String
            if cls.table_exists(table=table) is False:
                return cls._error("table_not_exists", mode=sys._getframe().f_code.co_name)

            query_table = table

        elif table is None:
            # None
            return cls._error("table_not_defined", mode=sys._getframe().f_code.co_name)

        else:
            # unknown type
            return cls._error("table_type", mode=sys._getframe().f_code.co_name)

        # ----------------------------------------------------------------
        # Query
        exec_query = "DROP TABLE {table};".format(**{
            "table": query_table
        })

        try:
            cls.cursor.execute(exec_query)
            cls.connection.commit()

        except Exception as e:
            return cls._error("drop_exception", mode=sys._getframe().f_code.co_name)

        return True

    def create(
        cls,
        table=None,
        column=None,
        force=False,
        commit=True,
        query=None
    ):
        """
        :param table  (str)     : Table name.
        :param column (dict|str): Column Dict or String.
        :param force  (boolean) : Force create table, if exists overwrite. Default: False
        :param commit (boolean) : Commit flag. Default: True
            OR
        :param query  (str)     : Query string.
        :return       (boolean) :  status.
        """

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        if query is None:
            # ----------------------------------------------------------------
            # No query

            # ----------------------------------------------------------------
            # Table name
            if isinstance(table, str):
                # String
                if force is False:
                    if cls.table_exists(table=table) is True:
                        return cls._error("table_exists", mode=sys._getframe().f_code.co_name)
                elif force is True:
                    cls.drop(table=table)
                    query_table = table
                else:
                    # unknown type
                    return cls._error("force_type", mode=sys._getframe().f_code.co_name)

            elif table is None:
                # None
                return cls._error("table_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("table_type", mode=sys._getframe().f_code.co_name)


            # ----------------------------------------------------------------
            # Column dict
            if isinstance(column, str):
                # String
                query_column = column

            elif isinstance(column, dict):
                # Dict
                query_column = ""

                for column_key in column.keys():
                    query_column += "{key} {type}, ".format(**{
                        "key": column_key,
                        "type": column[column_key]
                    })

                # Slice " and "
                if len(column.keys()) > 0:
                    query_column = query_column[0:-2]

            elif column is None:
                # None
                return cls._error("column_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("column_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Generate query
            exec_query = "CREATE TABLE {table}({column});".format(**{
                "table": query_table,
                "column": query_column
            })

        else:
            # ----------------------------------------------------------------
            # Query exists
            if isinstance(query, str):
                # String
                exec_query = query

            else:
                # unknown type
                return cls._error("query_type", mode=sys._getframe().f_code.co_name)

        try:
            cls.cursor.execute(exec_query)
            if commit is True:
                cls.connection.commit()

        except Exception as e:
            return cls._error("create_exception", mode=sys._getframe().f_code.co_name)

        return True

    def select(
        cls,
        table=None,
        distinct=False,
        column=None,
        where=None,
        where_op=None,
        where_not=None,
        where_type=None,
        order=None,
        order_type=None,
        join_table=None,
        join_key=None,
        query=None,
        model=None,
        result=None
    ):
        """
        :param table      (str)         : Table name.
        :param column     (str|list)    : Column name String or List.
        :param distinct   (boolean)     : Distinct option.
        :param where      (dict|str)    : Where Dict or String.
        :param where_op   (str)         : Where Operator. Default: "=". e.g. "=" or ">" etc...
        :param where_not  (boolean|str) : Where Not Operator. Default: False. e.g. True or "not" etc...
        :param where_type (str)         : Where Type. Default: "AND". e.g. "AND" or "OR" etc...
        :param order      (dict|str)    : Where Dict or String.
        :param order_type (str)         : Where Type. Default: "ASC". e.g. "ASC" or "DESC"
        :param join_table (str)         : Join table.
        :param join_key (str)           : Join key.
            OR
        :param query      (str)         : Query string.
        :param model      (dict)        : Model of query, qmark or named style.
        :param result     (class)       : Result type. Dict or List

        :return           (list|boolean): Select result or Failed status.
        """

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        if query is None:
            # ----------------------------------------------------------------
            # No query

            # ----------------------------------------------------------------
            # Table name
            if isinstance(table, str):
                # String
                if cls.table_exists(table=table) is False:
                    return cls._error("table_not_exists", mode=sys._getframe().f_code.co_name)

                query_table = table

            elif table is None:
                # None
                return cls._error("table_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("table_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Distinct
            query_distinct = ""
            if isinstance(distinct, bool):
                # String
                if distinct:
                    query_distinct = "DISTINCT"

            else:
                # unknown type
                return cls._error("table_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Column list
            if isinstance(column, str):
                # String
                query_column = column

            elif isinstance(column, list):
                # List
                query_column = ""
                for column_name in column:
                    query_column += "{0}, ".format(column_name)

                # Slice ", "
                if len(column) > 0:
                    query_column = query_column[0:-2]

            elif column is None:
                # None
                query_column = "*"

            else:
                # unknown type
                return cls._error("column_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Join
            query_join = ""
            if join_table is not None:
                if isinstance(join_table, str):
                    # String
                    query_join = "INNER JOIN {join_table}".format(**{
                        "join_table": join_table
                    })

                else:
                    # unknown type
                    return cls._error("join_table_type", mode=sys._getframe().f_code.co_name)

                if join_key is not None:
                    if isinstance(join_key, str):
                        # String
                        query_join += " ON {table}.{table_key} = {join_table}.{join_key}".format(**{
                            "table": query_table,
                            "table_key": "{}_{}".format(join_table[:-1], join_key),
                            "join_table": join_table,
                            "join_key": join_key
                        })

                    else:
                        # unknown type
                        return cls._error("join_key_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Where dict
            if isinstance(where, str):
                # String
                query_where = where

            elif isinstance(where, dict):
                # Dict
                query_where = ""

                # Check where_op
                if where_op not in cls.WHERE_OPS:
                    where_op = cls.WHERE_OPS[0]
                # Check where_type
                if where_type not in cls.WHERE_TYPES:
                    where_type = cls.WHERE_TYPES[0]
                # Check where_not
                if where_not not in cls.WHERE_NOTS:
                    where_not = cls.WHERE_NOTS[0]

                # Generate where_not
                if where_not is True:
                    where_not = "not"
                elif where_not is False:
                    where_not = ""

                where_model = copy.deepcopy(where)
                for where_key in where.keys():
                    if isinstance(where[where_key], str):
                        # String
                        query_where += "{not} {key} {op} :{key_escape} {type} ".format(**{
                            "key": where_key,
                            "key_escape": where_key.replace(".", "_"),
                            "not": where_not,
                            "op": where_op,
                            "type": where_type
                        })
                        where_model[where_key.replace(".", "_")] = where[where_key]

                    elif isinstance(where[where_key], list):
                        # With operator
                        if len(where[where_key]) == 1:
                            query_where += "{not} {key} {op} :{key_escape} {type} ".format(**{
                                "key": where_key,
                                "key_escape": where_key.replace(".", "_"),
                                "not": where_not,
                                "op": where_op,
                                "type": where_type
                            })
                        elif len(where[where_key]) == 2:
                            query_where += "{not} {key} {op} :{key_escape} {type} ".format(**{
                                "key": where_key,
                                "key_escape": where_key.replace(".", "_"),
                                "not": where_not,
                                "op": where[where_key][1],
                                "type": where_type
                            })
                        elif len(where[where_key]) == 3:
                            query_where += "{not} {key} {op} :{key_escape} {type} ".format(**{
                                "key": where_key,
                                "key_escape": where_key.replace(".", "_"),
                                "not": where_not,
                                "op": where[where_key][1],
                                "type": where[where_key][2]
                            })

                        if len(where[where_key]) > 0:
                            where_model[where_key.replace(".", "_")] = where[where_key][0]

                # Slice " and "
                if len(where.keys()) > 0:
                    if isinstance(where[where_key], str):
                        query_where = query_where[0:-2 - len(where_type)]

                    elif isinstance(where[where_key], list):
                        if len(where[where_key][len(where[where_key]) - 1]) == 3:
                            query_where = query_where[0:-2 - len(where[where_key][len(where[where_key]) - 1][2])]
                        else:
                            query_where = query_where[0:-2 - len(where_type)]

            elif where is None:
                # None
                query_where = ""

            else:
                # unknown type
                return cls._error("where_type", mode=sys._getframe().f_code.co_name)

            # Add "WHERE "
            if len(query_where) > 0:
                query_where = "WHERE " + query_where

            # ----------------------------------------------------------------
            # Order dict
            if isinstance(order, str):
                # String
                query_order = order

                if isinstance(order_type, str):
                    # Check order_type
                    if order_type not in cls.ORDER_TYPES:
                        order_type = cls.ORDER_TYPES[0]

                    query_order += " " + order_type

            elif isinstance(order, dict):
                # Dict
                query_order = ""

                for order_key in order.keys():
                    query_order += "{key} {order}, ".format(**{
                        "key": order_key,
                        "order": order[order_key]
                    })

                # Slice " and "
                if len(order.keys()) > 0:
                    query_order = query_order[0:-2]

            elif order is None:
                # None
                query_order = ""

            else:
                # unknown type
                return cls._error("order_type", mode=sys._getframe().f_code.co_name)

            # Add "ORDER BY "
            if len(query_order) > 0:
                query_order = "ORDER BY " + query_order

            # ----------------------------------------------------------------
            # Generate query
            exec_query = "SELECT {distinct} {column} FROM {table} {join} {where} {order};".format(**{
                "distinct": query_distinct,
                "column": query_column,
                "table": query_table,
                "join": query_join,
                "where": query_where,
                "order": query_order
            })

            exec_query = exec_query.replace("  ", " ")
            exec_query = exec_query.replace(" ;", ";")

        else:
            # ----------------------------------------------------------------
            # Query exists
            if isinstance(query, str):
                # String
                exec_query = query

            else:
                # unknown type
                return cls._error("query_type", mode=sys._getframe().f_code.co_name)

        try:
            if where is not None:
                # Dict model query
                if isinstance(where, dict):
                    cls.cursor.execute(exec_query, where_model)
                else:
                    cls.cursor.execute(exec_query)

            elif model is not None:
                # model query
                cls.cursor.execute(exec_query, model)

            else:
                # No model query
                cls.cursor.execute(exec_query)

            # Check where_op
            result_types = [dict, list]
            if result not in result_types:
                result = result_types[0]

            if result == dict:
                # Output to array
                ncols = len(cls.cursor.description)
                colnames = [cls.cursor.description[i][0] for i in range(ncols)]
                results = []
                for row in cls.cursor.fetchall():
                    res = {}
                    for i in range(ncols):
                        res[colnames[i]] = row[i]
                    results.append(res)

            elif result == list:
                results = cls.cursor.fetchall()
            else:
                return cls._error("result_type", mode=sys._getframe().f_code.co_name)

        except Exception as e:
            return cls._error("select_exception", mode=sys._getframe().f_code.co_name)

        return results

    def insert(
        cls,
        table=None,
        value=None,
        commit=True,
        query=None,
        model=None
    ):
        """
        :param table  (str)          : Table name.
        :param value  (dict|list|str): Value Dict or List(Dict) or String.
        :param commit (boolean)      : Commit flag. Default: True
            OR
        :param query  (str)          : Query string.
        :param model  (dict)         : Model of query, qmark or named style.
        :return       (list|boolean) : Select result or Failed status.
        """

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        multi_insert = False
        value_string = False

        if query is None:
            # ----------------------------------------------------------------
            # No query

            # ----------------------------------------------------------------
            # Table name
            if isinstance(table, str):
                # String
                query_table = table

            elif table is None:
                # None
                return cls._error("table_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("table_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Value dict
            if isinstance(value, str):
                # String
                value_string = True
                query_value = value

            elif isinstance(value, dict):
                # Dict
                query_value = ""
                query_column = ""

                for value_key in value.keys():
                    query_value += ":{key}, ".format(**{
                        "key": value_key
                    })
                    query_column += "{key}, ".format(**{
                        "key": value_key
                    })

                # Slice ", "
                if len(value.keys()) > 0:
                    query_value = query_value[0:-2]
                    query_column = query_column[0:-2]

            elif isinstance(value, list):
                # List
                multi_insert = True
                query_values = [None] * len(value)
                query_columns = [None] * len(value)

                for i_query in range(len(value)):
                    query_value = ""
                    query_column = ""

                    for value_key in value[i_query].keys():
                        query_value += ":{key}, ".format(**{
                            "key": value_key
                        })
                        query_column += "{key}, ".format(**{
                            "key": value_key
                        })

                    # Slice ", "
                    if len(value[i_query].keys()) > 0:
                        query_value = query_value[0:-2]
                        query_column = query_column[0:-2]

                    query_values[i_query] = query_value
                    query_columns[i_query] = query_column

            elif value is None:
                # None
                return cls._error("value_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("value_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Generate query
            if multi_insert is True:
                exec_queries = [None] * len(value)
                for i_query in range(len(value)):
                    exec_queries[i_query] = "INSERT INTO {table}({column}) VALUES({value});".format(**{
                        "table": query_table,
                        "column": query_columns[i_query],
                        "value": query_values[i_query]
                    })

            else:
                if value_string is True:
                    exec_query = "INSERT INTO {table} {value};".format(**{
                        "table": query_table,
                        "value": query_value
                    })
                else:
                    exec_query = "INSERT INTO {table}({column}) VALUES({value});".format(**{
                        "table": query_table,
                        "column": query_column,
                        "value": query_value
                    })

        else:
            # ----------------------------------------------------------------
            # Query exists
            if isinstance(query, str):
                # String
                exec_query = query

            else:
                # unknown type
                return cls._error("query_type", mode=sys._getframe().f_code.co_name)


        try:
            if multi_insert is True:
                for i_query in range(len(exec_queries)):
                    cls.cursor.execute(exec_queries[i_query], value[i_query])

            elif multi_insert is False:
                if isinstance(value, dict):
                    cls.cursor.execute(exec_query, value)

                elif model is not None:
                    # model query
                    cls.cursor.execute(exec_query, model)

                else:
                    cls.cursor.execute(exec_query)

            if commit is True:
                cls.connection.commit()

        except Exception as e:
            return cls._error("insert_exception", mode=sys._getframe().f_code.co_name)

        return True

    def delete(
        cls,
        table=None,
        where=None,
        where_op=None,
        where_not=None,
        where_type=None,
        commit=True,
        query=None,
        model=None
    ):
        """
        :param table      (str)         : Table name.
        :param where      (dict|str)    : Where Dict or String.
        :param where_op   (str)         : Where Operator. Default: "=". e.g. "=" or ">" etc...
        :param where_not  (boolean|str) : Where Not Operator. Default: False. e.g. True or "not" etc...
        :param where_type (str)         : Where Type. Default: "AND". e.g. "AND" or "OR" etc...
        :param commit     (boolean)     : Commit flag. Default: True
            OR
        :param query      (str)         : Query string.
        :param model      (dict)        : Model of query, qmark or named style.
        :return           (list|boolean): Select result or Failed status.
        """

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        if query is None:
            # ----------------------------------------------------------------
            # No query

            # ----------------------------------------------------------------
            # Table name
            if isinstance(table, str):
                # String
                if cls.table_exists(table=table) is False:
                    return cls._error("table_not_exists", mode=sys._getframe().f_code.co_name)

                query_table = table

            elif table is None:
                # None
                return cls._error("table_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("table_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Where dict
            if isinstance(where, str):
                # String
                query_where = where

            elif isinstance(where, dict):
                # Dict
                query_where = ""

                # Check where_op
                if where_op not in cls.WHERE_OPS:
                    where_op = cls.WHERE_OPS[0]
                # Check where_type
                if where_type not in cls.WHERE_TYPES:
                    where_type = cls.WHERE_TYPES[0]
                # Check where_not
                if where_not not in cls.WHERE_NOTS:
                    where_not = cls.WHERE_NOTS[0]

                # Generate where_not
                if where_not is True:
                    where_not = "not"
                elif where_not is False:
                    where_not = ""

                where_model = copy.deepcopy(where)
                for where_key in where.keys():
                    if isinstance(where[where_key], str):
                        # String
                        query_where += "{not} {key} {op} :{key_escape} {type} ".format(**{
                            "key": where_key,
                            "key_escape": where_key.replace(".", "_"),
                            "not": where_not,
                            "op": where_op,
                            "type": where_type
                        })
                        where_model[where_key.replace(".", "_")] = where[where_key]

                    elif isinstance(where[where_key], list):
                        # With operator
                        if len(where[where_key]) == 1:
                            query_where += "{not} {key} {op} :{key_escape} {type} ".format(**{
                                "key": where_key,
                                "key_escape": where_key.replace(".", "_"),
                                "not": where_not,
                                "op": where_op,
                                "type": where_type
                            })
                        elif len(where[where_key]) == 2:
                            query_where += "{not} {key} {op} :{key_escape} {type} ".format(**{
                                "key": where_key,
                                "key_escape": where_key.replace(".", "_"),
                                "not": where_not,
                                "op": where[where_key][1],
                                "type": where_type
                            })
                        elif len(where[where_key]) == 3:
                            query_where += "{not} {key} {op} :{key_escape} {type} ".format(**{
                                "key": where_key,
                                "key_escape": where_key.replace(".", "_"),
                                "not": where_not,
                                "op": where[where_key][1],
                                "type": where[where_key][2]
                            })

                        if len(where[where_key]) > 0:
                            where_model[where_key.replace(".", "_")] = where[where_key][0]

                # Slice " and "
                if len(where.keys()) > 0:
                    if isinstance(where[where_key], str):
                        query_where = query_where[0:-2 - len(where_type)]

                    elif isinstance(where[where_key], list):
                        if len(where[where_key][len(where[where_key]) - 1]) == 3:
                            query_where = query_where[0:-2 - len(where[where_key][len(where[where_key]) - 1][2])]
                        else:
                            query_where = query_where[0:-2 - len(where_type)]

            elif where is None:
                # None
                query_where = ""

            else:
                # unknown type
                return cls._error("where_type", mode=sys._getframe().f_code.co_name)

            # Add "WHERE "
            if len(query_where) > 0:
                query_where = "WHERE " + query_where

                temp_query = "SELECT COUNT(*) FROM {table} {where};".format(**{
                    "table": query_table,
                    "where": query_where
                })

                if isinstance(where, dict):
                    num_records = cls.count_records(query=temp_query, model=where)
                else:
                    num_records = cls.count_records(query=temp_query)

                if num_records == 0:
                    return cls._error("not_exists_match_record", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Generate query
            exec_query = "DELETE FROM {table} {where};".format(**{
                "table": query_table,
                "where": query_where
            })

            exec_query = exec_query.replace("  ", " ")
            exec_query = exec_query.replace(" ;", ";")

        else:
            # ----------------------------------------------------------------
            # Query exists
            if isinstance(query, str):
                # String
                exec_query = query

            else:
                # unknown type
                return cls._error("query_type", mode=sys._getframe().f_code.co_name)

        try:
            if where is not None:
                if isinstance(where, dict):
                    # Dict model query
                    cls.cursor.execute(exec_query, where_model)
                else:
                    cls.cursor.execute(exec_query)

            elif model is not None:
                # model query
                cls.cursor.execute(exec_query, model)

            else:
                # No model query
                cls.cursor.execute(exec_query)

            if commit is True:
                cls.connection.commit()

        except Exception as e:
            return cls._error("delete_exception", mode=sys._getframe().f_code.co_name)

        return True

    def update(
        cls,
        table=None,
        value=None,
        where=None,
        where_op=None,
        where_not=None,
        where_type=None,
        commit=True,
        query=None,
        model=None
    ):
        """
        :param table      (str)         : Table name.
        :param value      (dict|str)    : Value Dict or List or String.
        :param where      (dict|str)    : Where Dict or String.
        :param where_op   (str)         : Where Operator. Default: "=". e.g. "=" or ">" etc...
        :param where_not  (boolean|str) : Where Not Operator. Default: False. e.g. True or "not" etc...
        :param where_type (str)         : Where Type. Default: "AND". e.g. "AND" or "OR" etc...
        :param commit     (boolean)     : Commit flag. Default: True
            OR
        :param query      (str)         : Query string.
        :return           (list|boolean): Select result or Failed status.
        """

        # Check DB
        if cls._check_db() is False:
            return cls._error("db_path", mode=sys._getframe().f_code.co_name)

        # Check status
        if cls._check_status(True) is False:
            return cls._error("status", mode=sys._getframe().f_code.co_name)

        generated_dict = {}

        if query is None:
            # ----------------------------------------------------------------
            # No query

            # ----------------------------------------------------------------
            # Table name
            if isinstance(table, str):
                # String
                if cls.table_exists(table=table) is False:
                    return cls._error("table_not_exists", mode=sys._getframe().f_code.co_name)

                query_table = table

            elif table is None:
                # None
                return cls._error("table_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("table_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Value dict
            if isinstance(value, str):
                # String
                value_string = True
                query_value = value

            elif isinstance(value, dict):
                # Dict
                query_value = ""

                for value_key in value.keys():
                    query_value += "{key} = :value{key}, ".format(**{
                        "key": value_key
                    })
                    generated_dict["value{}".format(value_key)] = value[value_key]

                # Slice ", "
                if len(value.keys()) > 0:
                    query_value = query_value[0:-2]

            elif value is None:
                # None
                return cls._error("value_not_defined", mode=sys._getframe().f_code.co_name)

            else:
                # unknown type
                return cls._error("value_type", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Where dict
            if isinstance(where, str):
                # String
                query_where = where

            elif isinstance(where, dict):
                # Dict
                query_where = ""

                # Check where_op
                if where_op not in cls.WHERE_OPS:
                    where_op = cls.WHERE_OPS[0]
                # Check where_type
                if where_type not in cls.WHERE_TYPES:
                    where_type = cls.WHERE_TYPES[0]
                # Check where_not
                if where_not not in cls.WHERE_NOTS:
                    where_not = cls.WHERE_NOTS[0]

                # Generate where_not
                if where_not is True:
                    where_not = "not"
                elif where_not is False:
                    where_not = ""

                for where_key in where.keys():
                    query_where += "{not} {key} {op} :{key} {type} ".format(**{
                        "key": where_key,
                        "not": where_not,
                        "op": where_op,
                        "type": where_type
                    })
                    generated_dict["{}".format(where_key)] = where[where_key]

                # Slice " and "
                if len(where.keys()) > 0:
                    query_where = query_where[0:-5]

            elif where is None:
                # None
                query_where = ""

            else:
                # unknown type
                return cls._error("where_type", mode=sys._getframe().f_code.co_name)

            # Add "WHERE "
            if len(query_where) > 0:
                query_where = "WHERE " + query_where

                temp_query = "SELECT COUNT(*) FROM {table} {where};".format(**{
                    "table": query_table,
                    "where": query_where
                })

                if isinstance(where, dict):
                    num_records = cls.count_records(query=temp_query, model=where)
                else:
                    num_records = cls.count_records(query=temp_query)

                if num_records == 0:
                    return cls._error("not_exists_match_record", mode=sys._getframe().f_code.co_name)

            # ----------------------------------------------------------------
            # Generate query
            exec_query = "UPDATE {table} SET {value} {where};".format(**{
                "table": query_table,
                "value": query_value,
                "where": query_where
            })

        else:
            # ----------------------------------------------------------------
            # Query exists
            if isinstance(query, str):
                # String
                exec_query = query

            else:
                # unknown type
                return cls._error("query_type", mode=sys._getframe().f_code.co_name)

        try:
            if generated_dict is not None:
                if isinstance(generated_dict, dict):
                    if len(generated_dict.keys()) > 0:
                        cls.cursor.execute(exec_query, generated_dict)
                    else:
                        cls.cursor.execute(exec_query)
                else:
                    cls.cursor.execute(exec_query)

            elif model is not None:
                # model query
                cls.cursor.execute(exec_query, model)

            else:
                # No model query
                cls.cursor.execute(exec_query)

            if commit is True:
                cls.connection.commit()

        except Exception as e:
            return cls._error("update_exception", mode=sys._getframe().f_code.co_name)

        return True

    # ----------------------------------------------------------------
    # Inner Method
    # ----------------------------------------------------------------

    def _define(cls):
        cls.NAME = "flex sqlite3"
        cls.ERROR = {
            "code_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 51,
                    "message": "Error code does not defined."
                }
            },
            "db_path": {
                "{} error".format(cls.NAME): {
                    "code": 101,
                    "message": "DB path does not defined."
                }
            },
            "status": {
                "{} error".format(cls.NAME): {
                    "code": 151,
                    "message": "DB connection status does not match."
                }
            },
            "already_connected": {
                "{} error".format(cls.NAME): {
                    "code": 201,
                    "message": "DB already connected."
                }
            },
            "already_disconnected": {
                "{} error".format(cls.NAME): {
                    "code": 202,
                    "message": "DB already disconnected."
                }
            },
            "query_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 300,
                    "message": "Query does not defined."
                }
            },
            "table_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 301,
                    "message": "Table name does not defined."
                }
            },
            "column_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 302,
                    "message": "Column does not defined."
                }
            },
            "value_not_defined": {
                "{} error".format(cls.NAME): {
                    "code": 306,
                    "message": "Value does not defined."
                }
            },
            "table_type": {
                "{} error".format(cls.NAME): {
                    "code": 401,
                    "message": "Table name type is unknown."
                }
            },
            "column_type": {
                "{} error".format(cls.NAME): {
                    "code": 402,
                    "message": "Column type is unknown."
                }
            },
            "where_type": {
                "{} error".format(cls.NAME): {
                    "code": 403,
                    "message": "Where type is unknown."
                }
            },
            "result_type": {
                "{} error".format(cls.NAME): {
                    "code": 404,
                    "message": "Result type is unknown."
                }
            },
            "force_type": {
                "{} error".format(cls.NAME): {
                    "code": 405,
                    "message": "Force type is unknown."
                }
            },
            "value_type": {
                "{} error".format(cls.NAME): {
                    "code": 406,
                    "message": "Value type is unknown."
                }
            },
            "table_exists": {
                "{} error".format(cls.NAME): {
                    "code": 501,
                    "message": "Already exists table."
                }
            },
            "table_not_exists": {
                "{} error".format(cls.NAME): {
                    "code": 502,
                    "message": "Table does not exists."
                }
            },
            "not_exists_match_record": {
                "{} error".format(cls.NAME): {
                    "code": 511,
                    "message": "Where clause matching Record does not exists."
                }
            },
            "commit_exception": {
                "{} error".format(cls.NAME): {
                    "code": 900,
                    "message": "Commit Exception occured."
                }
            },
            "execute_exception": {
                "{} error".format(cls.NAME): {
                    "code": 901,
                    "message": "Execute Exception occured."
                }
            },
            "count_records_exception": {
                "{} error".format(cls.NAME): {
                    "code": 902,
                    "message": "Count_records Exception occured."
                }
            },
            "table_exists_exception": {
                "{} error".format(cls.NAME): {
                    "code": 903,
                    "message": "Table_exists Exception occured."
                }
            },
            "drop_exception": {
                "{} error".format(cls.NAME): {
                    "code": 904,
                    "message": "Drop Exception occured."
                }
            },
            "create_exception": {
                "{} error".format(cls.NAME): {
                    "code": 905,
                    "message": "Create Exception occured."
                }
            },
            "select_exception": {
                "{} error".format(cls.NAME): {
                    "code": 906,
                    "message": "Select Exception occured."
                }
            },
            "insert_exception": {
                "{} error".format(cls.NAME): {
                    "code": 907,
                    "message": "Insert Exception occured."
                }
            },
            "delete_exception": {
                "{} error".format(cls.NAME): {
                    "code": 908,
                    "message": "Delete Exception occured."
                }
            },
            "update_exception": {
                "{} error".format(cls.NAME): {
                    "code": 909,
                    "message": "Update Exception occured."
                }
            }
        }

        cls.WHERE_OPS = ["=", "==", "<>", "!=", ">", ">=", "<", "<="]
        cls.WHERE_TYPES = ["AND", "OR", "and", "or", "And", "Or"]
        cls.WHERE_NOTS = [False, "", True, "not"]
        cls.ORDER_TYPES = ["ASC", "DESC", "asc", "desc", "Asc", "Desc"]

    def _error(
        cls,
        code=None,
        *arguments,
        **keyword_arguments
    ):
        if code is None:
            return cls._error("code_not_defined", mode=sys._getframe().f_code.co_name)

        error = cls.ERROR[code]

        for i_args in range(len(arguments)):
            custom_message = "Custom Message {0}".format(i_args)
            error["{} error".format(cls.NAME)][custom_message] = arguments[i_args]

        for key in keyword_arguments.keys():
            error["{} error".format(cls.NAME)][key] = keyword_arguments[key]

        return error

    def _check_db(cls):
        if cls.DB_PATH is None:
            return False

        return True

    def _check_status(
        cls,
        connected=None
    ):
        if connected is None:
            print("Not defined connected flag")
            return False

        if cls.status == connected:
            return True

        return False
