import UsersDto from '../DTOs/users.dto.js';

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = async() => {
        const users = await this.dao.getAll();
        const usersDto = users.map((user) => user = new UsersDto(user))
        return usersDto;
    }
    getById = async(uid) => {
        const userById = await this.dao.getById(uid);
        return userById;
    }
    getCurrent = async(user) => {
        const current = new UsersDto(user.user);
        return current;
    }
    getByEmail = async(email) => {
        const user = await this.dao.getByEmail(email);
        return user;
    }
    save = async(user) => {
        const userSaved = await this.dao.save(user);
        return userSaved;
    }
    update = async(id, userToUpdate) => {
        const userUpdated = await this.dao.update(id, userToUpdate);
        return userUpdated;
    }
    eliminate = async(id) => {
        const userDeleted = await this.dao.eliminate(id);
        return userDeleted;
    }
}

