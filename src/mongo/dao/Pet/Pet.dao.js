import { petModel } from '../../../models/pet.model.js'

class PetDAO {
    constructor() {
        this.model = petModel
    }

    getPaginatedPets = async (options, filter = {}) => await this.model.paginate(filter, options)

    getAllPets = async () => await this.model.find({})

    getPet = async filter => await this.model.findOne(filter)

    createPet = async newPet => await this.model.create(newPet)

    updatePetStatus = async (petId, updateData) => {
        return await this.model.updateOne({ _id: petId }, { $set: updateData });
    }

    deletePet = async  (petId) => await this.model.findByIdAndDelete(petId)
}

export {
    PetDAO
}