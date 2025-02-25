import { PetDAO } from '../mongo/dao/Pet/Pet.dao.js'

const petManager = new PetDAO()

class PetRepository {

    async getPaginatedPets(filter, pagination) {
        return await petManager.getPaginatedPets(filter, pagination);
    }
    async getAll() {
        return await petManager.getAllPets();
    }

    async create(petData) {
        return await petManager.createPet(petData);
    }

    async update(pid, petData) {
        return await petManager.updatePetStatus(pid, petData);
    }

    async delete(pid) {
        return await petManager.deletePet(uid);
    }

    async getPet(filter) {
        return await petManager.getPet(filter);
    }
}

export const petRepository = new PetRepository();