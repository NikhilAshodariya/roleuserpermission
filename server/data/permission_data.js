const mongoCollections = require("../config/mongoCollections");

const Permissions = mongoCollections.permissions;

createPermission = async (data) => {
    let permissionCollections = await Permissions();

    let check = await getPermissionByName(data.permission_name);
    if(check === null || check===undefined) {
        let insertInfo =  await permissionCollections.insertOne({
            "permission_name": data.permission_name,
            "permission_description": data.permission_description
        });
        const {
            ops
        } = insertInfo;
        return ops[0];
    }
    else {
        throw ("Permission already exists");
    }
};

getPermissionByName = async (permission_name) => {
    let permissionCollections = await Permissions();

    let returnInfo =  await permissionCollections.findOne({
        permission_name: permission_name
    });

    return returnInfo;
};

deletePermission = async (permission_name) => {
    let permissionCollections = await Permissions();

    return permissionCollections.deleteOne({
        permission_name: permission_name
    });
}

getAllPermissions = async () => {
    let permissionCollections = await Permissions();
    return permissionCollections.find().toArray();
};


module.exports = {
    "getAllPermissions": getAllPermissions,
    "createPermission": createPermission,
    "getPermissionByName": getPermissionByName,
    "deletePermission": deletePermission
};