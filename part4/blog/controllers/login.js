const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  // if user does not exist need to handle in middleware
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // possible that the username is correct but the password is wrong
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  // generate things that every authenticated user should own
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // create the token for future verification and set an expiry date
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 6,
  });

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
