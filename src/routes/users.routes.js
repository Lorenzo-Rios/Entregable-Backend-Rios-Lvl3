import { Router } from 'express'
import { userModel } from '../models/user.model.js';

const router = Router()

router.get('/', async (req, res)=>{
    try {
        const users = await userModel.find();
        res.sendSuccess(users);
    } catch (error) {
        console.error('Error en GetUser:', error);
        res.sendServerError('Error fetching Users');
    }
})

router.post('/', async (req, res) => {
    const { first_name, last_name, user_name, email, password, phone, role } = req.body;
    try {
        const newUser = new User({
            first_name,
            last_name,
            user_name,
            email,
            password,
            phone,
            role
        });
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default router