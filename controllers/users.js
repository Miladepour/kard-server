// const { json } = require('express');
const UserModel = require('../models/user.js');
const BoardModel = require('../models/board.js');
const ColumnModel = require('../models/column.js');
const bcrypt = require('bcrypt');
//used for getting a token for unique login etc
const jwt = require('jsonwebtoken');

const usersController = {
  Create: async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    
    const userExists = await UserModel.findOne({ email });
      if (userExists) {
        res.status(400).json({
          message: "User already exists"
        });
        return
      }
    
    try {
    let user = new UserModel({
        firstName,
        lastName,
        email,
        password
    });

    let newBoard = new BoardModel({
      name: "Default Board (created automatically)",
      user: user.id
    });

    let newColumn = new ColumnModel({
      name: "Your First Column",
      board: newBoard.id,
      order: 1 
      // doing this via API has some more intelligent logic, but since we're just creating one to 
      // get a user up and running, the first card will always be order: 1 in the list
    });

    newBoard.columns.push(newColumn)

    user.save();
    newBoard.save();
    newColumn.save();

    console.log(user);
    res.status(201).end(); // doesn't need anything back except to know successful
    } catch {
    res.status(500).json({
      message: "Unforeseen exception or internal server error"
    });
  }
  },

  Login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email
    });

    console.log(user)
  
    if (!user) {
      res.status(401).json({
        message: "Unauthorized: User not found"
      });
    }

    else if (bcrypt.compareSync(password, user.password)) {
      const userID = user._id;
      const userFirstName = user.firstName;
      const token = jwt.sign({ user }, process.env.SECRET_ENCODING_KEY, {
        expiresIn: "24h"
      });
  
      res.json({
        userID,
        userFirstName,
        token,
        message: "created token successfully"
      });
    } else {
      res.status(401).json({
        message: "Unauthorized: Password incorrect"
      });
    }
  }, 

  getAll: async (req, res) => {
    const user = await UserModel.find({});
    res.json({
      user,
      message: "got users successfully"
    });
  }, 
  
  getOneByID: async (req, res, next) => {
    const user = await UserModel.findOne({
      user_id: req.params._id
    });
    res.json({
      user,
      message: "Got user details successfully"
    });
  }
};

module.exports = usersController;