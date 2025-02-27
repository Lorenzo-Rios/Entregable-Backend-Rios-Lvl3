import { Router } from 'express';
import { sessionController } from '../controllers/SessionController.js';

const router = Router();

router.get('/data', sessionController.getData);
router.post('/register', sessionController.postRegister);
router.post('/login', sessionController.postLogin);
router.post('/changepass', sessionController.postChangePass);
router.get('/logout', sessionController.getLogout);

export default router;
