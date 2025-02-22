import express from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { userModel } from '../models/user.model.js';
import { petModel } from '../models/pet.model.js';

const router = express.Router();

// Endpoint para generar mascotas (GET)
router.get('/mockingpets', async (req, res) => {
    try {
        const users = await userModel.find({}, '_id'); // Obtener los IDs de los usuarios
        const userIds = users.map(user => user._id);

        const pets = generateMockPets(20, userIds);
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Error generating mock pets', error });
    }
});

// Endpoint para generar usuarios (GET)
router.get('/mockingusers', async (req, res) => {
    try {
        const users = generateMockUsers(50);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error generating mock users', error });
    }
});

// Endpoint para generar e insertar datos (POST)
router.post('/generateData', async (req, res) => {
    try {
        const createdUsers = await userModel.insertMany(generateMockUsers(5));
        
        // Obtener los IDs de los usuarios recién creados
        const userIds = createdUsers.map(user => user._id);
        
        // Generar mascotas con los IDs de los usuarios creados
        const createdPets = await petModel.insertMany(generateMockPets(5, userIds));

        res.status(201).json({ message: 'Data generated successfully', createdUsers, createdPets });
    } catch (error) {
        res.status(500).json({ message: 'Error generating data', error });
    }
});

export default router;