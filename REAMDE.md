Express/Mongo API server
===========

This directory contains a stand-alone Express/Mongo API server (no routes are intended to lead to rendering a view). It uniquely conducts CRUD operations - JSON in, JSON out - and the resultant API is consumed by a React front-end (files for which can be found in the 'client' directory).

The api routes (all of which are prefixed by /api) are:

Activity (/api/activities/)
---------

- create new activity (POST /api/activities/)
- delete activity based on activity id (DELETE /api/activities/:activity_id)

Board (/api/boards/)
---------

- read all boards associated with the currently-logged-in user (GET /api/boards/)
- read a single board based on its id (GET /api/boards/:board_id)
- create a new board to be associated with the currently-logged-in user


Card (/api/cards/)
----------

Column (/api/columns/)
----------

User (/api/users/)
----------

- create a new user