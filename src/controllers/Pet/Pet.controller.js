import { petViewAdapter } from '../../viewAdapters/petView/petView.adapter.js'

async function GetPet(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const data = await petViewAdapter.getPaginatedPets(page, limit);

    res.render('pets', {
      title: 'Listado de Mascotas',
      pets: data.pets,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: data.prevLink,
      nextLink: data.nextLink,
    });
  } catch (error) {
    console.error('Error en GetPet:', error);
    res.status(500).send('Error fetching Pets');
  }
}


export { GetPet };