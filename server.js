// require libraries and initialize Express app
const express = require('express');
var cors = require('cors');
const app = express();

//tell Express which routers will be needed
const boardsRouter = require('./routes/boards');
const cardsRouter = require('./routes/cards');
const columnsRouter = require('./routes/columns');
const usersRouter = require('./routes/users');
const storeRouter = require('./routes/store');

// Use CORS to allow this Heroku-hosted API server to be queried from other domains
app.use(cors());

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tell Express which routers to use for each second-level path
app.use('/api/boards', boardsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/columns', columnsRouter);
app.use('/api/users', usersRouter);
app.use('/api/store', storeRouter);

// export the app so that it can be called in bin>www
module.exports = app;