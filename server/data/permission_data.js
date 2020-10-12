const mongoCollections = require("../config/mongoCollections");

const Permissions = mongoCollections.permissions;

getAllPermissions = async () => {
    let permissionCollections = Permissions();
    return permissionCollections.find({}).toArray();
};

createPermission = async (data) => {
    let permissionCollections = await Permissions();
    let insertInfo =  await permissionCollections.insertOne({
        "permission_name": data.permission_name,
        "permission_description": data.permission_description
    });
    const {
        ops
    } = insertInfo;
    return ops[0];
};

getPermissionByName = async (permission_name) => {
    let permissionCollections = await Permissions();

    let returnInfo =  await permissionCollections.findOne({
        permission_name: permission_name
    });

    return returnInfo;
};


module.exports = {
    "getAllPermissions": getAllPermissions,
    "createPermission": createPermission,
    "getPermissionByName": getPermissionByName
};