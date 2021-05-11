const ColumnModel = require("../models/column");

const ColumnsController = {
  getAll: async (req, res) => {
    let allColumns = await ColumnModel.find().populate("boards");
    res.json(allColumns);
  },

  getAllByBoardID: async (req, res) => {
    let foundColumns = await ColumnModel.find({column: req.params.column_id});
    res.json({foundColumns});
  },

  createOneByBoardID: async (req, res) => {
    let ColumnsAlreadyInBoard = await ColumnModel.find({board: req.params.board_id});
    let numberOfColumnsAlreadyInBoard = ColumnsAlreadyInBoard.length;
    let order = numberOfColumnsAlreadyInBoard + 1;
    let newColumn = new ColumnModel(req.body);
    newColumn.board = req.params.board_id; 
    newColumn.order = order;
    await newColumn.save();
    res.json({ newColumn });
  },

  deleteOneByID: async (req, res) => {
    const { column_id } = req.params;
    ColumnModel.findByIdAndDelete(column_id, () => { //Deletes by Id name and has a callback function to send response code and message
      res.status(200).send(`${column_id} was deleted`);
    });
  },

  changeNameByID: async (req, res) => {
    const { column_id } = req.params;

    ColumnModel.findByIdAndUpdate(column_id, req.body, { new: true })
      .then((column) => {
        if (!ColumnsController) {
          return res.status(404).send();
        }
        res.send(column);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
};

module.exports = ColumnsController;
