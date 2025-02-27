import { UserDAO } from '../mongo/dao/User/User.dao.js'; 

const userManager = new UserDAO();  

class UserRepository {
    async getUser(filter) {
        return await userManager.getUser(filter);
    }

    async getPaginatedUsers(filter, pagination) {
        return await userManager.getPaginatedUsers(filter, pagination);
    }
    async getAll() {
        return await userManager.getAllUsers();
    }

    async addPetToUser(userId, petId) {
      return await userManager.addPetToUser(userId, petId);
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
}

export const userRepository = new UserRepository();