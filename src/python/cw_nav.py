#!/usr/bin/python3
# -*- mode: python; Encoding: utf-8; coding: utf-8 -*-

"""
----------------------------------------------------------------
clipweb Nav
  Author: ayaya (ayatec)
  GitHub: https://github.com/ayatec/clipweb
----------------------------------------------------------------
"""

# ----------------------------------------------------------------
# Import
# ----------------------------------------------------------------

import sys
from db import flex_sqlite3
import cw_base

AUTO_GENERATE = None

# ----------------------------------------------------------------
# Class
# ----------------------------------------------------------------

class Nav(cw_base.Base):
    # ----------------------------------------------------------------
    # Define

    def __init__(cls):
        super(Nav, cls).__init__("clipweb list")

    # ----------------------------------------------------------------
    # Method
    # ----------------------------------------------------------------

    # ----------------------------------------------------------------
    # type
    # ----------------------------------------------------------------

    def feedback(cls):
        cls.result["type"] = sys._getframe().f_code.co_name
        cls.result["result"] = False

        # ----------------------------------------------------------------
        # get & check cgi

        feedback = cls.get_cgi("feedback")

        if cls.error:
            return cls.result

        # ----------------------------------------------------------------
        # insert feedback

        cls.result["feedback"] = cls.DB.insert(
            table="feedbacks",
            value={
                "feedback": feedback,
                "created_at": cls.get_date()
            }
        )

        # ----------------------------------------------------------------
        # return

        cls.result["result"] = True
        return cls.result

    # ----------------------------------------------------------------
    # Inner Method
    # ----------------------------------------------------------------
