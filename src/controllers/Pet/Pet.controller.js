import { petRepository } from '../../repository/Pet.repository.js';
import { userRepository } from '../../repository/User.repository.js';

class PetController {
    async getAllPets(req, res) {
        try {
            const pets = await petRepository.getAll();
            res.json({ success: true, pets });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener las mascotas', error });
        }
    }

    async getPetById(req, res) {
        try {
            const { pid } = req.params;
            const pet = await petRepository.getPet({ _id: pid });

            if (!pet) {
                return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
            }

            res.json({ success: true, pet });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener la mascota', error });
        }
    }

    async createPet(req, res) {
      try {
          const { owner, ...petData } = req.body; // Extraer el owner del body
          const user = await userRepository.getUser({ user_name: owner });
  
          if (!user) {
              return res.status(404).json({ success: false, message: "El dueño no existe" });
          }
  
          const newPet = await petRepository.create({ ...petData, owner: user._id });
  
          // Agregar la mascota al array de pets del usuario
          await userRepository.addPetToUser(user._id, newPet._id);
  
          res.status(201).json({ success: true, pet: newPet });
      } catch (error) {
          res.status(500).json({ success: false, message: "Error al crear la mascota", error });
      }
  }

    async updatePetStatus(req, res) {
        try {
            const { pid } = req.params;

            // Actualizamos el estado directamente a "En pedido de adopción"
            const updatedPet = await petRepository.update(pid, { status: 'En pedido de adopción' });

            if (updatedPet.matchedCount === 0) {
                return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
            }

            res.json({ success: true, message: 'Estado de la mascota actualizado a "En pedido de adopción"' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al actualizar el estado de la mascota', error });
        }
    }

    async deletePet(req, res) {
        try {
            const { pid } = req.params;
            const deletedPet = await petRepository.delete(pid);

            if (!deletedPet) {
                return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
            }

            res.json({ success: true, message: 'Mascota eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al eliminar la mascota', error });
        }
    }
}

export const petController = new PetController();