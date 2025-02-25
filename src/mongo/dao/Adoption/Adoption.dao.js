import { adoptionModel } from '../../models/Adoption.model.js';

class AdoptionDAO {
    async getAdoptions(filter = {}, options = {}) {
        return await adoptionModel.paginate(filter, options);
    }

    async getById(adoptionId) {
        return await adoptionModel.findById(adoptionId).populate('petId');
    }

    async createAdoption(adoptionData) {
        return await adoptionModel.create(adoptionData);
    }

    async updateAdoptionStatus(adoptionId, updates) {
        return await adoptionModel.updateOne({ _id: adoptionId }, updates);
    }

    async deleteAdoption(adoptionId) {
        return await adoptionModel.findByIdAndDelete(adoptionId);
    }

    async getPaginatedAdoptions(filter, options) {
        return await adoptionModel.paginate(filter, options);
    }
}

export const adoptionDAO = new AdoptionDAO();