const BoardModel = require("../models/board");
const ColumnModel = require("../models/column");
const CardModel = require("../models/card");
const column = require("../models/column");

const storeController = {
  getAll: async (req, res, next) => {
    const token = res.locals.decoded;
    const userID = token.user._id;
    let userBoards = await BoardModel.find({ user: token.user._id });
    let userBoardID = userBoards[0]._id.toString();
    let userBoardTitle = userBoards[0].name.toString();
    let userBoardColumns = await ColumnModel.find({ board: userBoardID }); // this is an array of objects
    let userBoardColumnIDs = userBoardColumns.map((column) => {
      return column._id;
    });
    let columns = {};
    userBoardColumns.map((column) => {
      columns[[column._id]] = {
        id: column._id,
        title: column.name,
        cards: column.cards,
      };
    });

    // TODO: This is how it should look ...
    res.json({
      data: {
        columns: userBoardColumns,
        columnIds: userBoardColumnIDs,
        boards: userBoards,
      },
    });

    // 👹
    // res.json({
    //   data: {
    //     columns,
    //     columnIds: userBoardColumnIDs, // this is an array
    //     boards: {
    //       [userBoardID]: {
    //         id: userBoardID,
    //         title: userBoardTitle,
    //         column: [],
    //       },
    //       boardIds: [userBoardID],
    //     },
    //   },
    // });
  },
};

module.exports = storeController;
