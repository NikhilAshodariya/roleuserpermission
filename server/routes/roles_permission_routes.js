const express = require('express');
const RolePermissionData = require("../data/roles_permission_data.js");

const router = express.Router();

const getAllPermissions = (req, res, next) => {
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

const assignPermissionToRole = async (req, res, next) => {
    let check = await RolePermissionData.assignPermissionToRole(req.body.role_name, req.body.permission_name);
    res.send(check);
}

router.get("/",getAllPermissions);
router.get("/:permission_name",getPermissionByName);
router.post("/",assignPermissionToRole);

module.exports = router;