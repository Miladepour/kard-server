const express = require('express');
const router = express.Router();
//middleware for using protected routes 
const { withJWTAuthMiddleware } = require("express-kun");

const boardsController = require('../controllers/boards');

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

// Get all the boards
router.get('/all', boardsController.getAll);

// Get all the boards by logged-in user (takes user's ID from auth token)
protectedRouter.get('/', boardsController.getAllByUserID);

// Create a new board for logged-in user (takes user's ID from auth token)
protectedRouter.post('/create', boardsController.createOneByUserID);

// Delete a board by board id (but only if you are its owner)
router.delete('/:board_id', boardsController.deleteOneById);

// Change a board name by id (name passed in req.body - although function will also patch any other fields that are passed as JSON)
router.patch('/:board_id', boardsController.changeNameById);

module.exports = router;