const BoardModel = require('../models/board')
const ColumnModel = require('../models/column')
const CardModel = require('../models/card')

const storeController = {
  getAll: async (req,res, next) => {
    res.send("This is the store controller")
  },
};

module.exports = storeController;