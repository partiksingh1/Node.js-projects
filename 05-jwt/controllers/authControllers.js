const User = require("../models/users");
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("error, user not created");
  }
  res.send("new signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.login_post = (req, res) => {
  const { email, password } = req.body;
  res.send("user login");
};
