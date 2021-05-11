const CardModel = require('../models/card')

const cardsController = {
  getAll: async (req,res) => {
    let allCards = await CardModel.find().populate("column") // note the populate is needed in order to be able to name the user with anything other than their _id
    res.json(allCards);
  },

  getOneByID: async (req,res) => {
    let foundCard = await CardModel.find(eq.params.card_id).populate("column");
    res.json(foundCard);
  },

  getAllByColumnID: async(req, res) => {
    let foundCards = await CardModel.find({column: req.params.column_id});
    res.json({foundCards});
  },
  
  createOneByColumnID: async(req, res) => {
    let order = await CardModel.find().populate("boards"); //Finds the number of existing cards
    let newCard = new CardModel(req.body);
    newCard.column = req.params.column_id; 
    newCard.order = order.length + 1; //Increases the order by one
    await newCard.save();
    res.json({ newCard });
  },
  
  deleteOneByID: async(req, res) => { 
    CardModel.findByIdAndDelete(req.params.card_id).then((card) => {
      if (!card) {
        return res.status(404).send();
      }
      res.send(card);
    }).catch((error) => {
        res.status(500).send(error);
      })
  },
  
  changeNameByID: async(req, res) => {
    // {new: true} gets us back the updated version of the document rather than the info prior to making the change
    CardModel.findByIdAndUpdate(req.params.card_id, req.body, {new: true}).then((card) => { 
        if (!card) {
            return res.status(404).send();
        }
        res.send(card);
    }).catch((error) => {
        res.status(500).send(error);
    })
  }
};

module.exports = cardsController;