import { userViewAdapter } from '../../viewAdapters/userView/userView.adapter.js';

async function renderUsers(req, res) {
  try {
      const { page = 1, limit = 10 } = req.query; // Obtener los parámetros de la URL
      console.log('Página:', page, 'Límite:', limit);

      // Obtener los usuarios con la paginación automática
      const data = await userViewAdapter.getPaginatedUsers(page, limit);

      // Renderizar la vista de usuarios con la información de paginación
      res.render('users', data);
  } catch (error) {
      console.error('Error en renderUsers:', error);
      res.status(500).send('Error rendering users');
  }
}

export { renderUsers };