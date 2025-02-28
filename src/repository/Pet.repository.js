import { PetDAO } from '../mongo/dao/Pet/Pet.dao.js'

const petManager = new PetDAO()

class PetRepository {
    async getAll() {
        return await petManager.getAllPets();
    }
    async getPet(filter) {
        return await petManager.getPet(filter).populate('owner')
    }
  
    async getPaginatedPets(filter, pagination) {
        return await petManager.getPaginatedPets(filter, pagination);
    }

    async create(petData) {
        return await petManager.createPet(petData);
    }

    async update(pid, petData) {
        return await petManager.updatePetStatus(pid, petData);
    }

    async delete(pid) {
        return await petManager.deletePet(pid);
    }

}

export const petRepository = new PetRepository();