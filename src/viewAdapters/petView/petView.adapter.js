import { petModel } from '../../models/pet.model.js';

export const petViewAdapter = {
  getPaginatedPets: async (page, limit) => {
    try {
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      // Validar los valores de la página y el límite
      if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
        throw new Error('Invalid page or limit number');
      }

      const options = { page: pageNumber, limit: limitNumber, lean: true };
      const result = await petModel.paginate({}, options);

      return {
        pets: result.docs,
        totalPages: result.totalPages || 1,
        currentPage: result.page || 1,
        hasPrevPage: result.hasPrevPage || false,
        hasNextPage: result.hasNextPage || false,
        prevLink: result.hasPrevPage ? `/Mascotas?page=${result.prevPage}&limit=${limitNumber}` : null,
        nextLink: result.hasNextPage ? `/Mascotas?page=${result.nextPage}&limit=${limitNumber}` : null,
      };
    } catch (error) {
      console.error('Error en getPaginatedPets:', error);
      throw error;
    }
  }
};