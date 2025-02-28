import { userRepository } from '../../repository/User.repository.js';

class UserViewAdapter {
  async getPaginatedUsers(page, limit) {
      const users = await userRepository.getPaginatedUsers({}, { page, limit });
      
      // Convertir cada usuario a un objeto plano
      const usersPlain = users.docs.map(user => user.toObject());

      console.log(usersPlain);

      return {
          users: usersPlain,
          totalPages: users.totalPages,
          currentPage: users.page,
          prevPage: users.prevPage,
          nextPage: users.nextPage,
          hasPrevPage: users.hasPrevPage,
          hasNextPage: users.hasNextPage,
          prevLink: users.hasPrevPage ? `/Usuarios?page=${users.prevPage}&limit=${limit}` : null,
          nextLink: users.hasNextPage ? `/Usuarios?page=${users.nextPage}&limit=${limit}` : null,
          limit: limit,
      };
  }
}

export const userViewAdapter = new UserViewAdapter();