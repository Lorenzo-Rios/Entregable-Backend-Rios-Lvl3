import { userRepository } from '../../repository/User.repository.js';

class UserViewAdapter {
    async getPaginatedUsers(page, limit) {
        const users = await userRepository.getPaginatedUsers({}, { page, limit });
        return {
            users: users.docs,
            totalPages: users.totalPages,
            currentPage: users.page,
            prevPage: users.prevPage,
            nextPage: users.nextPage,
            hasPrevPage: users.hasPrevPage,
            hasNextPage: users.hasNextPage,
            prevLink: users.hasPrevPage ? `/users?page=${users.prevPage}&limit=${limit}` : null,
            nextLink: users.hasNextPage ? `/users?page=${users.nextPage}&limit=${limit}` : null,
        };
    }
}

export const userViewAdapter = new UserViewAdapter();