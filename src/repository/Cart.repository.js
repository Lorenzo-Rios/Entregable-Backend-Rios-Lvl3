import CartDao from '../mongo/dao/Cart/Cart.dao.js';

const CartRepository = {
    getCartById: async (cartId) => {
        const cart = await CartDao.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart;
    },
    addPetToCart: async (cartId, petId) => {
      return await CartDao.addPetToCart(cartId, petId);
  },
  
    updateCart: async (cartId, pets) => {
        if (!Array.isArray(pets)) {
            throw new Error('Products must be an array');
        }
        return await CartDao.updateCart(cartId, pets);
    },
  
    removePetFromCart: async (cartId, petId) => {
        return await CartDao.removePetFromCart(cartId, petId);
    },
  
    clearCart: async (cartId) => {
        return await CartDao.clearCart(cartId);
    },
  
    updatedPetAdopted: async (cartId, petId) => {
        return await CartDao.updatedPetAdopted(cartId, petId);
    },
};

export default CartRepository;