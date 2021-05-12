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
    // let userBoardColumnsFlat = userBoardColumns[0]
    // let userBoardColumnIDs = []
    // userBoardColumnsFlat.forEach(userBoardColumn => {
    //   userBoardColumnIDs.push(userBoardColumn._id)
    // })
    
    // const { _id } = userBoards[0]

    res.json({
      userID,

      data: {
        columns: {

        },
        columnIds: [
          userBoardColumns[0].forEach(column => {console.log(column)})
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
