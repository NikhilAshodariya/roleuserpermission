const {ObjectId} = require("mongodb");

const mongoCollections = require("../config/mongoCollections.js");

const Users = mongoCollections.users;

getAllUsers = async () => {
    let usersCollection = await Users();
    return usersCollection.find({}).toArray();
};

createUser = async (data) => {
    let usersCollection = await Users();

    const insertInfo = await usersCollection.insertOne({
        "email": data.email,
        "description": data.description
    });

    const {
        ops
    } = insertInfo;
    return ops[0];
};

getUserByEmail = async (email) => {
    let usersCollection = await Users();

    return usersCollection.findOne({
        email: email
    });
};

removeUser = async (email) => {
    let usersCollection = await Users();

    return usersCollection.deleteOne({
        email: email
    });
};

module.exports = {
    "getAllUsers": getAllUsers,
    "createUser": createUser,
    "getUserByEmail": getUserByEmail,
    "removeUser": removeUser
};