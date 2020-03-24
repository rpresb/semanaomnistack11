const db = require('../database/connection');

module.exports = {
    async create({ body: { id } }, res) {
        const ngo = await db('ngos')
            .where('id', id)
            .select('name')
            .first();

        if (!ngo) {
            return res.status(400).json({error: 'No NGO found'});
        }

        return res.json(ngo);
    }
}
