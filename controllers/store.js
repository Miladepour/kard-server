const BoardModel = require("../models/board");
const ColumnModel = require("../models/column");
const CardModel = require("../models/card");



const storeController = {
  getAll: async (req, res, next) => {
    const token = res.locals.decoded;
    const userID = token.user._id;

    res.json({
      userID: userID,
      data: {
        columns: {

        },
        columnIds: [

        ],
        boards: {

        }
      },
    });
  },
};

module.exports = storeController;
