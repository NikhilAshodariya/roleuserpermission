const express = require('express');
const User = require("../data/user_data.js");

const router = express.Router();

/* GET users listing. */
const userGetAll = (req, res, next) => {
  res.send(User.getAllUsers());
};

const createUser = async (req, res, next) => {
  let returninfo = await User.createUser({
    "email": req.body.email,
    "password": req.body.password,
    "userName": req.body.userName
  });

  res.send(returninfo);
};

router.post("/", createUser);
router.get("/", userGetAll);

module.exports = router;