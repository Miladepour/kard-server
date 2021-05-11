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
    let order = await ColumnModel.find().populate("boards"); //Finds the number of existing columns
    let newColumn = new ColumnModel(req.body);
    newColumn.board = req.params.board_id; // don't actually need params because user info is held in auth token and this is a protected route
    newColumn.order = order.length + 1; //Increases the order by one
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
