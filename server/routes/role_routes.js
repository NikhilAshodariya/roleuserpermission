const express = require('express');
const Role = require("../data/role_data.js");

const router = express.Router();

const getAllRoles = async (req, res, next) => {
    let allRoles = await Role.getAllRoles();
    res.send(allRoles);
};

const getRoleByName = async (req, res, next) => {
    let roleByName = await Role.getRoleByName(req.params.role_name);
    res.send(roleByName);
};

const createRole = async (req, res, next) => {
    let role = await Role.createRole({
        "role_name": req.body.role_name,
        "role_description": req.body.role_description
    });
    res.send(role);
};

const deleteRole = async(req, res, next) => {
    try {
        let role = await Role.deleteRole(req.params.role_name);
        res.send(role);
    }
    catch(e) {
        res.send(e);
    }
}

router.get("/",getAllRoles);
router.get("/:role_name",getRoleByName);
router.post("/",createRole);
router.delete("/:role_name", deleteRole);

module.exports = router;