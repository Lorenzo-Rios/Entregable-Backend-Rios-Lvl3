import { adoptionRepository } from '../../repository/Adoption.repository.js';
import { petRepository } from '../repository/Pet.repository.js';

class AdoptionController {
    async getAdoptionById(req, res) {
        try {
            const { aid } = req.params;
            const adoptions = await adoptionRepository.getAdoptionById(aid);
            res.json({ success: true, adoptions });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener adopciones', error });
          }
        }
        
        async getPaginatedAdoptions(req, res) {
            try {
                const { page = 1, limit = 10 } = req.query;
                const result = await adoptionRepository.getPaginatedAdoptions({}, { page, limit });
                res.json({ success: true, result });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Error al obtener adopciones paginadas', error });
            }
        }
        
        async createAdoption(req, res) {
        try {
            const { cartId, userData } = req.body;
            const adoption = await adoptionRepository.createAdoption({ cartId, userData });
            res.status(201).json({ success: true, message: 'Adopción creada con éxito', adoption });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al crear adopción', error });
        }
    }

    async updateAdoptionStatus(req, res) {
        try {
            const { adoptionId } = req.params;
            const { status } = req.body; // "Aceptada" o "Rechazada"

            const adoption = await adoptionRepository.getById(adoptionId);

            if (!adoption) {
                return res.status(404).json({ success: false, message: 'Adopción no encontrada' });
            }

            if (status === "Aceptada") {
                // Cambiar estado de todas las mascotas a "Adoptada"
                for (const pet of adoption.pets) {
                    await petRepository.updateAdoptionStatus(pet.petId, { status: "Adoptada" });
                }
            } else if (status === "Rechazada") {
                // Si se rechaza, las mascotas vuelven a estar disponibles
                for (const pet of adoption.pets) {
                    await petRepository.updateAdoptionStatus(pet.petId, { status: "Disponible" });
                }
            }

            // Actualizar el estado de la adopción
            await adoptionRepository.updateAdoptionStatus(adoptionId, { status });

            res.json({ success: true, message: `Adopción ${status.toLowerCase()} correctamente` });

        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al actualizar el estado de la adopción', error });
        }
    }

    async deleteAdoption(req, res) {
        try {
            const { adoptionId } = req.params;
            await adoptionRepository.deleteAdoption(adoptionId);
            res.json({ success: true, message: 'Adopción eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al eliminar adopción', error });
        }
    }

}

export const adoptionController = new AdoptionController();