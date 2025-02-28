import CartRepository from '../../repository/Cart.repository.js';
import { petRepository } from '../../repository/Pet.repository.js';

class CartController {

  static async getCart(req, res) {
    try {
        const { cid } = req.params;
        const cart = await CartRepository.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
  static async addPet(req, res) {
    try {
        const { cid, pid } = req.params;

        // Verificar si el carrito existe
        const cart = await CartRepository.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
        }

        // Verificar si el carrito ya tiene una mascota
        if (cart.pets.length > 0) {
            return res.status(400).json({ success: false, message: 'Solo puedes adoptar una mascota a la vez.' });
        }

        // Buscar la mascota en la base de datos
        const pet = await petRepository.getPetById(pid);
        if (!pet) {
            return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
        }

        // Verificar que la mascota esté disponible
        if (pet.status !== "Disponible") {
            return res.status(400).json({ success: false, message: 'Esta mascota ya está en proceso de adopción o ya fue adoptada' });
        }

        // Agregar la mascota al carrito
        const updatedCart = await CartRepository.addPetToCart(cid, pid);

        res.json({ success: true, message: 'Mascota añadida al carrito', cart: updatedCart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al añadir la mascota al carrito', error: error.message });
    }
}

static async updateCart(req, res) {
    try {
        const { cid } = req.params;
        const { pets } = req.body;

        if (!Array.isArray(pets)) {
            return res.status(400).send({ error: 'Pets must be an array' });
        }

        const cart = await CartRepository.updateCart(cid, pets);
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

static async removePet(req, res) {
    try {
        const { cid, pid } = req.params;
        const cart = await CartRepository.removePetFromCart(cid, pid);
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

static async clearCart(req, res) {
    try {
        const { cid } = req.params;
        const cart = await CartRepository.clearCart(cid);
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

static async updatedPetAdopted(req, res) {
    try {
        const { cid, pid } = req.params;

        const cart = await CartRepository.updatedPetAdopted(cid, pid);
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
}

export default CartController;