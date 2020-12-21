const mongoCollections = require("../config/mongoCollections");
const Roles = require('../data/role_data.js');
const Permissions = require('../data/permission_data.js');

const Roles_Permissions = mongoCollections.roles_permissions;


findByRoleName = async (role_name) => {
    let rolepermissioncollections = await Roles_Permissions();

    return await rolepermissioncollections.findOne({
        "role_name": role_name
    });
};

assignPermissionToRole = async (role_name, permission_name) => {
    let rolepermissioncollections = await Roles_Permissions();

    let role_permission = await rolepermissioncollections.findOne({
        role_name: role_name
    });



    // role_permission = await rolepermissioncollections.findOne({
    //     role_name:role_name
    // });

    let role = await Roles.getRoleByName(role_name);
    let permission = await Permissions.getPermissionByName(permission_name);

    if (role !== undefined && role !== null) {
        if (permission !== undefined && permission !== null) {
            // push into role_permission
            if(role_permission === null || role_permission === undefined ) {
                rolepermissioncollections.insertOne({
                    role_name: role_name,
                    permission_lis: []
                });
            }
            let temp = await rolepermissioncollections.updateOne({
                role_name: role_name
            }, {
                "$push": {
                    "permission_lis": permission
                }
            });
            return temp;
        } else {
            throw ("Invalid permission found");
        }
    } else {
        throw ("Invalid role found");
    }
};

unassignPermissionToRole = async (role_name, permission_name) => {

};

module.exports = {
    "assignPermissionToRole": assignPermissionToRole,
    "findByRoleName": findByRoleName
}