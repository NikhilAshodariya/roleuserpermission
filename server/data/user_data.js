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
        "userName": data.userName,
        "email": data.email,
        "password": data.password
    });

    const {
        ops
    } = insertInfo;
    return ops[0];
};

removeTask = async (id) => {
    console.log(id);
    if(id === "") {
        return {};
    } else {
        taskCollection = await users();
        returnval = await getTaskById(id);
        await taskCollection.deleteOne({
            id: id
        });
        return returnval;
    }
};

getTaskById = async (id) => {
    // we need to search for that id;

    taskCollection = await task();
    const data = await taskCollection.findOne({
        id: id
    });

    if (data === null) {
        return undefined;
    }

    return data;
};

postTask = async (userData) => {
    taskCollection = await task();
    const insertInfo = await taskCollection.insertOne({
        "id": userData.id,
        "title": userData.title,
        "description": userData.description,
        "hoursEstimated": userData.hoursEstimated,
        "completed": userData.completed
    });

    const {
        ops
    } = insertInfo;
    return ops[0];
};

patchTask = async (suppliedId, newData) => {
    taskCollection = await task();
    const data = await getTaskById(suppliedId);

    if (data === null) {
        return undefined;
    } else {
        const newValues = {
            "$set": {
                "id": newData.id? newData.id: data.id,
                "title": newData.title ? newData.title : data.title,
                "description": newData.description ? newData.description : data.description,
                "hoursEstimated": newData.hoursEstimated ? newData.hoursEstimated : data.hoursEstimated,
                "completed": newData.completed ? newData.completed : data.completed,
            }
        };
        const taskCollection = await task();
        await taskCollection.updateOne({
            id: suppliedId
        }, newValues);
        return await getTaskById(suppliedId);
    }
};


module.exports = {
    "getAllUsers": getAllUsers,
    "createUser": createUser,
    "getTaskById": getTaskById,
    "postTask": postTask,
    "patchTask": patchTask,
    "removeTask": removeTask
};