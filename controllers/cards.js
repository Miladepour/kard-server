const CardModel = require('../models/card')
const ColumnModel = require('../models/column')

const cardsController = {
  getAll: async (req,res) => {
    let allCards = await CardModel.find().populate("column") 
    res.json(allCards);
  },

  getOneByID: async (req,res) => {
    let foundCard = await CardModel.findById(req.params.card_id).populate("column") 
    res.json(foundCard);
  },

  getAllByColumnID: async(req, res) => {
    let foundCards = await CardModel.find({column: req.params.column_id});
    res.json({foundCards});
  },
  
  createOneByColumnID: async(req, res) => {
    let CardsAlreadyInColumn = await CardModel.find({column: req.params.column_id});
    let numberOfCardsAlreadyInColumn = CardsAlreadyInColumn.length;
    let order = numberOfCardsAlreadyInColumn + 1;
    let newCard = new CardModel(req.body);
    newCard.column = req.params.column_id; 
    newCard.order = order;
    await newCard.save();

    let associatedColumn = await ColumnModel.find({_id: req.params.column_id}).populate('cards');
    associatedColumn = associatedColumn["0"]
    associatedColumn.cards.push(newCard);
    let finalUpdatedColumn = await associatedColumn.save();
    res.json({ finalUpdatedColumn });
  },
  
  deleteOneByID: async(req, res) => { 
    let cardID = req.params.card_id
    let card = await CardModel.find({_id: cardID})
    let cardColumn = await ColumnModel.find({cards: cardID})
    cardColumn = cardColumn[0]
    

    let cardColumnAllCards = cardColumn.cards // array of all cards within column record, including one to be deleted
    console.log(cardColumnAllCards)
    console.log(cardID)

    let cardColumnCardsMinusCardToDelete = cardColumnAllCards.filter(e => e.toString() !== cardID.toString())
    
    
    cardColumn.cards = cardColumnCardsMinusCardToDelete
    cardColumn.save()

    await CardModel.findByIdAndDelete(cardID).then((card) => {
      if (!card) {
        return res.json({deletedCardID: cardID, finalUpdatedColumn: cardColumn});
      }
      res.send(card);
    }).catch((error) => {
        res.status(500).send(error);
      })
  },
  
  changeNameByID: async(req, res) => {
    // {new: true} gets us back the updated version of the document rather than the info prior to making the change
    console.log("Card ID:" + req.params.card_id)
    console.log(req.body)
    CardModel.findByIdAndUpdate(req.params.card_id, req.body, {new: true}).then((card) => { 
      console.log(card)
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