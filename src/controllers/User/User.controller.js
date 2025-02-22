import { userModel } from '../../models/user.model.js';
import { userViewAdapter } from '../../viewAdapters/userView/userView.adapter.js';

async function GetUser(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const data = await userViewAdapter.getPaginatedUsers(page, limit);

    res.render('users', {
      title: 'Listado de Usuarios',
      users: data.users,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: data.prevLink,
      nextLink: data.nextLink,
    });
  } catch (error) {
    console.error('Error en GetUser:', error);
    res.status(500).send('Error fetching Users');
  }
}


export { GetUser };