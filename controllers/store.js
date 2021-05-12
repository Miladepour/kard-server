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

    const returnPromise = (simplifiedColumnCards) => {
      //a synchornous function that returns the promise
      return Promise.resolve(simplifiedColumnCards);
    };

    const findCardsForColumn = async (columnID) => {
      let columnCards = await CardModel.find({ column: columnID }).populate(
        "column"
      );
      return returnPromise(columnCards);
    };

    const getCards = async () => {
      return Promise.all(
        userBoardColumnIDs.map((columnID) => findCardsForColumn(columnID))
      );
    };

    getCards()
      .then((cards) => {
        // if we run forEach on cards, each iteration is an array representing a column, with objects inside for each card
        let cardObjects = cards.map((column) => {
          let cardsBelongingToColumn = [];
          column.map((card) => {
            cardsBelongingToColumn.push(
              {
              id: card._id,
              title: card.name
              }
            );
          });

          return {
            [column[0].column._id]: {
              id: column[0].column._id,
              title: column[0].column.name,
              cards: cardsBelongingToColumn,
            },
          };
        });
        console.log(cards); // cards is an array of arrays of objects, were each object is a card - we want to turn this into an object of objects, with an array of card objects, where the top level object is a column, and only card id and title are referenced

        return cardObjects;
      })
      .then((cardObjects) => {
        res.json({
          data: {
            columns: cardObjects,
            columnIds: userBoardColumnIDs, // this is an array
            boards: {
              [userBoardID]: {
                id: userBoardID,
                title: userBoardTitle,
                column: [],
              },
              boardIds: [userBoardID],
            },
          },
        });
      });
  },
};

module.exports = storeController;
