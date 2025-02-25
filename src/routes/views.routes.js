import { Router } from 'express'
import { renderUsers } from '../controllers/View/View.controller.js';
import { passportCall } from '../passport/passportCall.js';
import { authorization } from '../middlewares/authorization.middleware.js';

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

router.get('/Usuarios', renderUsers)
//router.get('/Mascotas', renderPets)
//router.get('/Carrito', renderCart)
//router.get('/Adopciones', renderAdoptions)

export default router