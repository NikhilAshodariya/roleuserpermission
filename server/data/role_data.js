const mongoCollections = require("../config/mongoCollections.js");

const Roles = mongoCollections.roles;

createRole = async (data) => {
    let roleCollections = await Roles();
    let insertInfo =  await roleCollections.insertOne({
        "role_name": data.role_name,
        "role_description": data.role_description
    });
    const {
        ops
    } = insertInfo;
    return ops[0];
};

getRoleByName = async (role_name) => {
    let roleCollections = await Roles();

    return await roleCollections.findOne({
        role_name: role_name
    });
};

deleteRole = async (role_name) => {
    let roleCollections = await Roles();

    let returnInfo = await getRoleByName(role_name);
    await roleCollections.deleteOne({
        role_name: role_name
    });

    return returnInfo;
};

getAllRoles = async () => {
    let roleCollections = await Roles();
    return roleCollections.find({}).toArray();
};

module.exports = {
    "createRole": createRole,
    "getAllRoles": getAllRoles,
    "deleteRole": deleteRole,
    "getRoleByName": getRoleByName
};
