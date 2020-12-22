const express = require('express');
const RolePermissionData = require("../data/roles_permission_data.js");

const router = express.Router();

const findByRoleName = async (req, res, next) => {
  res.send(await RolePermissionData.findByRoleName(req.params.role_name));
};

const assignPermissionToRole = async (req, res, next) => {
    try {
        let check = await RolePermissionData.assignPermissionToRole(req.body.role_name, req.body.permission_name);
        res.send(check);
    }
    catch (e) {
        res.send(e);
    }
}

const unassignPermissionToRole = async (req, res, next) => {
    try {
        let check = await RolePermissionData.unassignPermissionToRole(req.body.role_name, req.body.permission_name);
        res.send(check);
    }
    catch(e) {
        res.send(e);
    }
}

// router.get("/",getAllPermissions);
router.post("/",assignPermissionToRole);
router.get("/:role_name",findByRoleName)
router.delete("/",unassignPermissionToRole);

module.exports = router;