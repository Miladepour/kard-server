const BoardModel = require("../models/board");
const ColumnModel = require("../models/column");
const CardModel = require("../models/card");
const column = require("../models/column");



const storeController = {
  getAll: async (req, res, next) => {
    const token = res.locals.decoded;
    const userID = token.user._id;
    let userBoards = await BoardModel.find({user: token.user._id});
    let userBoardID = userBoards[0]._id.toString()
    let userBoardTitle = userBoards[0].name.toString()
    let userBoardColumns = await ColumnModel.find({board: userBoardID}) // this is an array of objects
    let userBoardColumnIDs = userBoardColumns.map (column => {
      return column._id
    })

    const returnPromise = simplifiedColumnCards => { //a synchornous function that returns the promise
      return Promise.resolve(simplifiedColumnCards)
    }

    const findCardsForColumn = async (columnID) => {
      let columnCards = await CardModel.find({column: columnID});
      return returnPromise(columnCards)
    }


    

    const getCards = async () => {
      return Promise.all(userBoardColumnIDs.map(columnID => findCardsForColumn(columnID)))
    }

    let columns;

    getCards().then(cards => {
      columns = cards
    }).then(() => {

        res.json({
      data: {
        columns: columns,
        columnIds: userBoardColumnIDs, // this is an array
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
    
    })
    


  },
};

module.exports = storeController;
