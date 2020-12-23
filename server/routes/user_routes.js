const express = require('express');
const User = require("../data/user_data.js");

const router = express.Router();

/* GET users listing. */
const userGetAll = async (req, res, next) => {
  res.send(await User.getAllUsers());
};

const createUser = async (req, res, next) => {
  let returninfo = await User.createUser({
    "email": req.body.email,
    "description": req.body.description
  });

  res.send(returninfo);
};

const getUserByName = async (req, res, next) => {
  let check = await User.getUserByEmail(req.params.user_email);
  res.send(check);
};

const deleteUserByName = async (req, res, next) => {
  let check = await User.removeUser(req.params.user_email);
  res.send(check);
};

router.post("/", createUser);
router.get("/", userGetAll);
router.get("/:user_email", getUserByName);
router.delete("/:user_email", deleteUserByName);

module.exports = router;