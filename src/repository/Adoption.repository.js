import { adoptionDAO } from '../mongo/dao/Adoption/Adoption.dao.js';  
import CartRepository from './Cart.repository.js';
import  { petRepository }  from './Pet.repository.js';

class AdoptionRepository {
    async getAdoptionById(adoptionId) {
        return await adoptionDAO.getAdoptionById(adoptionId);  
    }
    
    async getPaginatedAdoptions(filter, options) {
        const result = await adoptionDAO.getPaginatedAdoptions(filter, options);  
        if (!result.docs || result.docs.length === 0) {
            throw new Error('No se encontraron adopciones');
        }
        return result;
    }

    async createAdoption({ cartId, userData }) {
        const cart = await CartRepository.getCartById(cartId).populate('pets.pet');
    
        if (!cart || cart.pets.length === 0) {
            throw new Error('Cart is empty or not found');
        }
    
        const petsToPurchase = [];
    
        for (const item of cart.pets) {
            const pet = await petRepository.getPet(item.pet._id);
    
            if (!pet) {
                throw new Error(`Pet with ID ${item.pet._id} not found`);
            }
    
              petsToPurchase.push({
                  name: pet.name,
                  species: pet.species,
                  date: pet.date,
                  owner: pet.owner
              })
        }
    
        if (petsToPurchase.length === 0) {
            throw new Error('No products available to purchase');
        }
    
        const adoptionData = {
            userData,
            cart: {
                pets: petsToPurchase
            },
            status: 'Pendiente',
        };
    
        // Crear la adopcion
        const newAdoption = await adoptionDAO.createAdoption(adoptionData); 
    
        return { newAdoption };
    }

    async updateAdoptionStatus(adoptionId, updates) {
        const updatedAdoption = await adoptionDAO.updateAdoptionStatus(adoptionId, updates); 
        if (!updatedAdoption.matchedCount) {
            throw new Error('Order not found');
        }
        return updatedAdoption;
    }

    async deleteAdoption(orderId) {
        return await adoptionDAO.deleteAdoption(orderId);  
    }

}

export const adoptionRepository = new AdoptionRepository();