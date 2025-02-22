import { Router } from 'express'
import { userModel } from '../models/user.model.js';
import { hashPassword } from '../utils/bycrypt.js';
import { GetUser } from '../controllers/User/User.controller.js';

const router = Router()

router.get('/', GetUser)

router.post('/', async (req, res) => {
    const { first_name, last_name, user_name, email, password, phone, role, pets } = req.body;
    try {
        const hashedPassword = await hashPassword(password)

        const newUser = new userModel({
            first_name,
            last_name,
            user_name,
            email,
            password: hashedPassword, 
            phone,
            role,
            pets: pets || []
        });
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default router