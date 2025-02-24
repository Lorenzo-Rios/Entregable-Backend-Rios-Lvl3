import { UserDAO } from '../mongo/dao/User/User.dao.js'; 

const userManager = new UserDAO();  

class UserRepository {

    async getPaginatedUsers(filter, pagination) {
        return await userManager.getPaginatedUsers(filter, pagination);
    }
    async getAll() {
        return await userManager.getAllUsers();
    }

    async create(userData) {
        return await userManager.createUser(userData);
    }

    async update(uid, userData) {
        return await userManager.updateUser(uid, userData);
    }

    async delete(uid) {
        return await userManager.deleteUser(uid);
    }

    async getUser(filter) {
        return await userManager.getUser(filter);
    }
}

export const userRepository = new UserRepository();