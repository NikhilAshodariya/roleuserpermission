const mongoCollections = require("../config/mongoCollections");

const Roles = require('../data/role_data.js');
const Users = require('../data/user_data.js');

const Users_Roles = mongoCollections.users_roles;

findByUserName = async (email) => {
    let usersrolescollections = await Users_Roles();

    return usersrolescollections.findOne({
        "email": email
    });
};

assignRoleToUser = async (email, role_name) => {
    //TODO: check if the role is already assigned to the permission if it is already assigned then give out error.
    let usersrolescollections = await Users_Roles();

    let role = await Roles.getRoleByName(role_name);
    let user = await Users.getUserByEmail(email);

    let user_role = await usersrolescollections.findOne({
        email: email
    });

    if (role === undefined || role === null) {
        throw ("role does not exists");
    }

    if (user === undefined || user === null) {
        throw ("user does not exists");
    }

    if(user_role === null || user_role === undefined ) {
        await usersrolescollections.insertOne({
            email: email,
            roles_lis: []
        });

        user_role = await usersrolescollections.findOne({
            email: email
        });
    }

    let verify = user_role.roles_lis.filter(obj => obj.role_name === role_name);
    if (verify!== undefined && verify.length>0) {
        throw ("User already has the role assigned");
    }
    else {
        return usersrolescollections.updateOne({
            email: email
        }, {
            "$push": {
                "roles_lis": role
            }
        });
    }
};

unassignRoleToUser = async (role_name, permission_name) => {
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
    "assignRoleToUser": assignRoleToUser,
    "unassignRoleToUser": unassignRoleToUser,
    "findByUserName": findByUserName
}