import { Router } from 'express';
import CartController from '../controllers/Cart/Cart.controller.js';
import { GetCart, PostCart } from '../controllers/PostCart/PostCart.controller.js';
import { passportCall } from '../passport/passportCall.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();

// Rutas de carrito
router.get('/', GetCart);
router.post('/', PostCart);
router.get('/:cid', CartController.getCart);
router.post('/:cid/products/:pid', passportCall('jwt'), authorization('user'), CartController.addPet);
router.put('/:cid', CartController.updateCart);
router.put('/:cid/products/:pid', CartController.updatedPetAdopted); // Cambiar estado de la mascota al hacer el pedido
router.delete('/:cid/products/:pid', CartController.removePet);
router.delete('/:cid', CartController.clearCart);

export default router;