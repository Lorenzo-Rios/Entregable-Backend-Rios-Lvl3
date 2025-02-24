import { userViewAdapter } from '../../viewAdapters/userView/userView.adapter.js';

async function renderUsers(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const data = await userViewAdapter.getPaginatedUsers(page, limit);
        res.render('users', data);
    } catch (error) {
        console.error('Error en renderUsers:', error);
        res.status(500).send('Error rendering users');
    }
}

export { renderUsers };