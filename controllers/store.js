const BoardModel = require("../models/board");
const ColumnModel = require("../models/column");
const CardModel = require("../models/card");



const storeController = {
  getAll: async (req, res, next) => {
    const token = res.locals.decoded;
    const userID = token.user._id;
    let userBoards = await BoardModel.find({user: token.user._id});
    let userBoardID = userBoards[0]._id.toString()
    let userBoardTitle = userBoards[0].name.toString()
    let userBoardColumns = await ColumnModel.find({board: userBoardID})
    
    // const { _id } = userBoards[0]

    res.json({
      userID,

      data: {
        columns: {

        },
        columnIds: [
          userBoardColumns
        ],
        boards: {
          [userBoardID]: {
            id: userBoardID,
            title: userBoardTitle,
            column: []
          },
          boardIds: [
            userBoardID
          ]
        }
      },
    });
  },
};

module.exports = storeController;
