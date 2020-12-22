const mongoCollections = require("../config/mongoCollections");
const Roles = require('../data/role_data.js');
const Permissions = require('../data/permission_data.js');

const Roles_Permissions = mongoCollections.roles_permissions;


findByRoleName = async (role_name) => {
    let rolepermissioncollections = await Roles_Permissions();

    return rolepermissioncollections.findOne({
        "role_name": role_name
    });
};

assignPermissionToRole = async (role_name, permission_name) => {
    //TODO: check if the role is already assigned to the permission if it is already assigned then give out error.
    let rolepermissioncollections = await Roles_Permissions();
    let role = await Roles.getRoleByName(role_name);
    let permission = await Permissions.getPermissionByName(permission_name);


    let role_permission = await rolepermissioncollections.findOne({
        role_name: role_name
    });

    if (role === undefined || role === null) {
        throw ("role does not exists");
    }

    if (permission === undefined || permission === null) {
        throw ("permission does not exists");
    }

    if(role_permission === null || role_permission === undefined ) {
        rolepermissioncollections.insertOne({
            role_name: role_name,
            permission_lis: []
        });

        role_permission = await rolepermissioncollections.findOne({
            role_name: role_name
        });
    }

    let verify = role_permission.permission_lis.filter(obj => obj.permission_name === permission_name);
    if (verify!== undefined && verify.length>0) {
        throw ("role already has the permission assigned");
    }
    else {
        return rolepermissioncollections.updateOne({
            role_name: role_name
        }, {
            "$push": {
                "permission_lis": permission
            }
        });
    }
};

unassignPermissionToRole = async (role_name, permission_name) => {
    let rolepermissioncollections = await Roles_Permissions();
    let role = await Roles.getRoleByName(role_name);
    let permission = await Permissions.getPermissionByName(permission_name);

    let rolepermission = await rolepermissioncollections.findOne({
        "role_name": role_name
    });

    if (rolepermission === null || rolepermission === undefined) {
        throw ("Role is not present");
    } else {
        let check = rolepermission.permission_lis.filter(obj => obj.permission_name === permission_name);
        if (check === null || check === undefined) {
            throw ("No such permission exists");
        }
        else {
            return rolepermissioncollections.updateOne({
                _id: rolepermission["_id"]
            }, {
                "$pull": {
                    "permission_lis": {
                        permission_name: permission_name
                    }
                }
            });
        }
    }

};

module.exports = {
    "assignPermissionToRole": assignPermissionToRole,
    "unassignPermissionToRole": unassignPermissionToRole,
    "findByRoleName": findByRoleName
}