// require libraries and initialize Express app
const express = require('express');
const app = express();

//tell Express which routers will be needed
const boardsRouter = require('./routes/boards');
const cardsRouter = require('./routes/cards');
const columnsRouter = require('./routes/columns');
const usersRouter = require('./routes/users');

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tell Express which routers to use for each second-level path
app.use('/api/boards', boardsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/columns', columnsRouter);
app.use('/api/users', usersRouter);

// export the app so that it can be called in bin>www
module.exports = app;