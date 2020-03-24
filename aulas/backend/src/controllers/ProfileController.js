const db = require('../database/connection');

module.exports = {
    async index({ headers }, res) {
        const ngo_id = headers.authorization;
        const incidents = await db('incidents')
            .where('ngo_id', ngo_id)
            .select('*');

        return res.json(incidents);
    }
}
