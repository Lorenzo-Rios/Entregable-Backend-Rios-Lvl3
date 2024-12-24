import { Router } from 'express'
import { petModel } from '../models/pet.model.js';

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const pets = await petModel.find();
        res.sendSuccess(pets);
    } catch (error) {
        console.error('Error en GetUser:', error);
        res.sendServerError('Error fetching Users');
    }
})

router.post('/', async (req, res) => {
    const { name, species, date, owner } = req.body
    try {
        const newPet = new petModel({
            name,
            species,
            date,
            owner
        });
        await newPet.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default router