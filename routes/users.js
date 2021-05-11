const express = require('express');
const router = express.Router();
//middleware for using protected routes 
const { withJWTAuthMiddleware } = require("express-kun");

const usersController = require('../controllers/users');

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


// creates a new user, with JSON post object populated from from on app root/homepage 
router.post('/create', usersController.Create);

// logs a user in with their info and unique token
router.post('/login', usersController.Login);

// lists all users - ONLY FOR DEV PURPOSES. OTHERWISE SECURITY RISK!!!
router.get("/all", usersController.getAll);

// lists user details by id
protectedRouter.get("/:id", usersController.getOneByID);

module.exports = router;