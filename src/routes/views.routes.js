import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.render('home', { title: 'Inicio' });
});

router.get('/user', (req, res) => {
    res.render('user', { title: 'Crear Usuario' });
});

router.get('/pet', (req, res) => {
    res.render('pet', { title: 'Crear Mascota' });
});

export default router