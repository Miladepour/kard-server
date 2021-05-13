const BoardModel = require('../models/board')

const boardsController = {
  getAll: async (req,res, next) => {
    let allBoards = await BoardModel.find().populate("user") // note the populate is needed in order to be able to name the user with anything other than their _id
    res.json(allBoards);
  },

  getAllByUserID: async(req, res, next) => {
    const token = res.locals.decoded;
    console.log(token)
    let userBoards = await BoardModel.find({user: token.user._id});
    userBoards = userBoards[0];
    res.json({userBoards});
  },
  
  createOneByUserID: async(req, res, next) => {
    const token = res.locals.decoded;

    let newBoard = new BoardModel(req.body);
    newBoard.user = token.user._id // don't actually need params because user info is held in auth token and this is a protected route
    await newBoard.save();
    res.json({newBoard});
  },
  
  deleteOneById: async(req, res, next) => { 
    BoardModel.findByIdAndDelete(req.params.board_id).then((board) => {
      if (!board) {
        return res.status(404).send();
      }
      res.send(board);
    }).catch((error) => {
        res.status(500).send(error);
      })
  },
  
  changeNameById: async(req, res, next) => {
    // {new: true} gets us back the updated version of the document rather than the info prior to making the change
    BoardModel.findByIdAndUpdate(req.params.board_id, req.body, {new: true}).then((board) => { 
        if (!board) {
            return res.status(404).send();
        }
        res.send(board);
    }).catch((error) => {
        res.status(500).send(error);
    })
  },
};

module.exports = boardsController;