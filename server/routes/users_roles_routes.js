const express = require('express');

const UsersRolesData = require("../data/users_roles_data.js");
const router = express.Router();

//Todo: All the below is yet to work on

const findByUserEmail = async (req, res, next) => {
    res.send(await UsersRolesData.findByUserName(req.params.email));
};

const assignRoleToUser = async (req, res, next) => {
    try {
        let check = await UsersRolesData.assignRoleToUser(req.body.email,req.body.role_name);
        res.send(check);
    }
    catch (e) {
        res.send(e);
    }
}

const unassignPermissionToRole = async (req, res, next) => {
    try {
        let check = await UsersRolesData.unassignRoleToUser(req.body.role_name, req.body.permission_name);
        res.send(check);
    }
    catch(e) {
        res.send(e);
    }
}

// router.get("/",getAllPermissions);
router.post("/",assignRoleToUser);
router.get("/:email",findByUserEmail)
router.delete("/",unassignPermissionToRole);

module.exports = router;