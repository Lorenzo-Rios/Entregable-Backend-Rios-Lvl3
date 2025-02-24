import { Router } from 'express'
import { petModel } from '../models/pet.model.js';
import { userModel } from '../models/user.model.js'; // Importar el modelo de usuarios
import { GetPet } from '../controllers/Pet/Pet.controller.js'

const router = Router()

router.get('/', GetPet)

router.post('/', async (req, res) => {
  const { name, species, date, owner } = req.body;

  try {
      // Buscar el usuario en la base de datos por su nombre de usuario o email
      const user = await userModel.findOne({ user_name: owner }); // También podrías buscar por email
      
      if (!user) {
          return res.status(400).json({ message: 'Owner no encontrado!' });
      }

      // Crear la nueva mascota con el ID del usuario
      const newPet = new petModel({
          name,
          species,
          date,
          owner: user._id // Guardamos el ObjectId del usuario
      });

      await newPet.save();
      res.status(201).json({ message: 'Pet creada correctamente', pet: newPet });
  } catch (error) {
      res.status(500).json({ message: 'Error en craeando mascota', error });
  }
});

export default router