const crypto = require('crypto');
const db = require('../database/connection');

module.exports = {
    async index(_, res) {
        const ngos = await db('ngos').select('*');

        return res.json(ngos);
    },

    async create({ body }, res) {
        const { name, email, whatsapp, city, state } = body;

        const id = crypto.randomBytes(4).toString('HEX');

        await db('ngos').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            state
        });

        res.json({ id });
    }
};
