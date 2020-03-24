const db = require('../database/connection');

module.exports = {
    async index({ query }, res) {
        const { page = 1 } = query;

        const PAGE_SIZE = 5;

        const [count] = await db('incidents').count();
        const incidentsCount = Object.values(count)[0];

        res.header('X-Total-Count', incidentsCount);
        res.header('X-Total-Pages', Math.ceil(incidentsCount / PAGE_SIZE));

        const incidents = await db('incidents')
            .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
            .limit(PAGE_SIZE)
            .offset((page - 1) * PAGE_SIZE)
            .options({nestTables: true})
            .select([
                'incidents.*',
                'ngos.name',
                'ngos.email',
                'ngos.whatsapp',
                'ngos.city',
                'ngos.state'
            ]);

        return res.json(incidents);
    },

    async create({ body, headers }, res) {
        const { title, description, value } = body;
        const ngo_id = headers.authorization;

        const [id] = await db('incidents').insert({
            title,
            description,
            value,
            ngo_id
        });

        return res.json({ id });
    },

    async delete({ params: { id }, headers }, res) {
        const ngo_id = headers.authorization;

        const incident = await db('incidents')
            .where('id', id)
            .select('ngo_id')
            .first();

        if (incident.ngo_id !== ngo_id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await db('incidents').where('id', id).delete();

        return res.status(204).send();
    }
};
