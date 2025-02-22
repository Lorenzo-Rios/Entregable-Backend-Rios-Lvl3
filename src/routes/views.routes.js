import { Router } from 'express'
import { GetUser } from '../controllers/User/User.controller.js';
import { GetPet } from '../controllers/Pet/Pet.controller.js';

const router = Router()

router.get('/', (req, res) => {
    res.render('home', { title: 'Inicio' });
});

router.get('/Createuser', (req, res) => {
    res.render('user', { title: 'Crear Usuario' });
});

router.get('/Createpet', (req, res) => {
    res.render('pet', { title: 'Crear Mascota' });
});

router.get('/Usuarios', GetUser)

router.get('/Mascotas', GetPet)

export default router