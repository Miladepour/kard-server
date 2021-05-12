const express = require('express');
const router = express.Router();
//middleware for using protected routes 
const { withJWTAuthMiddleware } = require("express-kun");

const storeController = require('../controllers/store');

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


// Get all the data relevant to the logged-in user, so that front end can consume when initializing board states
protectedRouter.get('/', storeController.getAll);

module.exports = router;