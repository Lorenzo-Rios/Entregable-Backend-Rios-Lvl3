import CartRepository from '../../repository/Cart.repository.js';

class CartController {

  static async getCart(req, res) {
    try {
        const { cid } = req.params;  // Obtener el cartId desde los parámetros
        const cart = await CartRepository.getCartById(cid); // Llamar al repositorio para obtener el carrito por ID
        res.send(cart);  // Enviar el carrito como respuesta
    } catch (error) {
        res.status(500).send({ error: error.message });  // Si ocurre un error, enviamos el error
    }
  }
  static async addPet(req, res) {
    try {
        const { cid, pid } = req.params;

        const cart = await CartRepository.addPetToCart(cid, pid);
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
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