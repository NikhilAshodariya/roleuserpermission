const express = require('express');
const Permission = require("../data/permission_data.js");

const router = express.Router();

const getAllPermissions = (req, res, next) => {
    let allPermissions = Permission.getAllPermissions();
    res.send(allPermissions);
};

const getPermissionByName = async (req, res, next) => {
    let permissionByName = await Permission.getPermissionByName(req.params.permission_name);
    res.send(permissionByName);
};

const createPermission = async (req, res, next) => {
  let permission = await Permission.createPermission({
      "permission_name": req.body.permission_name,
      "permission_description": req.body.permission_description
  });
  res.send(permission);
};

router.get("/",getAllPermissions);
router.get("/:permission_name",getPermissionByName);
router.post("/",createPermission);

module.exports = router;