const mongoCollections = require("../config/mongoCollections.js");

const Roles = mongoCollections.roles;

getAllRoles = async () => {
    let roleCollections = await Roles();
    return roleCollections.find({}).toArray();
};