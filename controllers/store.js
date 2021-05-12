const BoardModel = require('../models/board')
const ColumnModel = require('../models/board')
const CardModel = require('../models/board')

const storeController = {
  getAll: async (req,res, next) => {
    res.send("This is the store controller")
  },
};

module.exports = storeController;