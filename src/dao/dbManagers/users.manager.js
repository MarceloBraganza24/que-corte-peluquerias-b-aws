import { usersModel } from "../dbManagers/models/users.model.js";

export default class Users {
    constructor() {
        console.log('Working with users DB');        
    }
    getAll = async() => {
        const users = await usersModel.find().lean();
        return users;
    }
    getById = async(id) => {
        const userById = await usersModel.findOne({ _id: id }).lean();
        return userById;
    }
    getByEmail = async(email) => {
        const user = await usersModel.findOne({ email }).lean();
        return user;
    }
    save = async(user) => {
        const userSaved = await usersModel.create(user);
        return userSaved;
    }
    update = async(id, userToUpdate) => {
        const userUpdated = await usersModel.findByIdAndUpdate(id, userToUpdate);
        return userUpdated;
    }
    eliminate = async(id) => {
        const userDeleted = await usersModel.findByIdAndDelete(id);
        return userDeleted;
    }
}