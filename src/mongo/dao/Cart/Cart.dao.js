import { cartModel } from '../../../models/cart.model.js';
import { petModel } from '../../../models/pet.model.js';

class CartDAO {
    static async getCartById(cartId) {
        return await cartModel.findById(cartId).populate('pets.pet');
    }

    static async addPetToCart(cartId, petId) {
      const cart = await cartModel.findById(cartId);
      const pet = await petModel.findById(petId);
  
      if (!cart) throw new Error('Cart not found');
      if (!pet) throw new Error('Pet not found');
  
      const existingPetIndex = cart.pets.findIndex(p => p.pet.toString() === petId);
  
      if (existingPetIndex >= 0) {
          // Si la mascota ya está en el carrito, no hacemos nada
          return cart;
      } else {
          // Agregamos la mascota al carrito
          cart.pets.push({ pet: petId });
      }
  
      await cart.save();
      return cart;
  }
  
  static async updateCart(cartId, pets) {
      const cart = await cartModel.findById(cartId);
      if (!cart) throw new Error('Cart not found');
  
      cart.pets = pets; // No gestionamos cantidades, solo las mascotas
      await cart.save();
      return cart;
  }
  
  static async removePetFromCart(cartId, petId) {
      const cart = await cartModel.findById(cartId);
      if (!cart) throw new Error('Cart not found');
  
      cart.pets = cart.pets.filter(p => p.pet.toString() !== petId);
      await cart.save();
      return cart;
  }
  
  static async clearCart(cartId) {
      const cart = await cartModel.findById(cartId);
      if (!cart) throw new Error('Cart not found');
  
      cart.products = [];
      await cart.save();
      return cart;
  }
  
  static async updatedPetAdopted(cartId, petId) {
      const cart = await cartModel.findById(cartId);
      const pet = await petModel.findById(petId);
  
      if (!cart) throw new Error('Cart not found');
      if (!pet) throw new Error('Pet not found');
  
      const existingPetIndex = cart.pets.findIndex(p => p.pet.toString() === petId);
  
      if (existingPetIndex >= 0) {
          cart.pets[existingPetIndex].state = "En pedido de adopción";
      } else {
          throw new Error('Pet not in cart');
      }
  
      await cart.save();
      return cart;
  }
}

export default CartDAO;