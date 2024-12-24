import express from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { userModel } from '../models/user.model.js';
import { petModel } from '../models/pet.model.js';

const router = express.Router();

// Endpoint para generar mascotas
router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(20);
    res.json(pets);
});

// Endpoint para generar usuarios (GET)
router.get('/mockingusers', async (req, res) => {
    const users = generateMockUsers(50);
    res.json(users);
});

// Endpoint para generar e insertar datos (POST)
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    try {
        const createdUsers = await userModel.insertMany(generateMockUsers(users));
        const createdPets = await petModel.insertMany(generateMockPets(pets));
        res.status(201).json({ message: 'Data generated successfully', createdUsers, createdPets });
    } catch (error) {
        res.status(500).json({ message: 'Error generating data', error });
    }
});

export default router;
