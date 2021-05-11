const express = require('express');
const router = express.Router();
//middleware for using protected routes 
const { withJWTAuthMiddleware } = require("express-kun");

const cardsController = require('../controllers/cards');

// helper function which checks there's an 'authorization' header in the body of a request
// and that it follows the expected 'Bearer [token]' format for its value.
function getTokenFromBearer(req) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error("No Authorization Header");
  }
  try {
    const token = authorization?.split("Bearer ")[1];
    return token;
  } catch {
    throw new Error("Invalid Token Format");
  }
}

// takes router, secret key, and user-provided token as an argument and returns a protected router
const protectedRouter = withJWTAuthMiddleware(router, process.env.SECRET_ENCODING_KEY, getTokenFromBearer);

// Get all the cards - DEV PURPOSES ONLY!!
router.get('/all', cardsController.getAll);

// Get a singel card by its ID
router.get('/:card_id', cardsController.getOneByID);

// Get all the cards associated with a specific column
protectedRouter.get('/column/:column_id', cardsController.getAllByColumnID);

// Create a new card (which includes the columnID passed as a param)
protectedRouter.post('/column/:column_id', cardsController.createOneByColumnID);

// Delete a card by id
protectedRouter.delete('/:card_id', cardsController.deleteOneByID);

// Change a card attributes by id (content passed in req.body - could be any/all of columnID, name, order)
router.patch('/:card_id', cardsController.changeNameByID);

module.exports = router;