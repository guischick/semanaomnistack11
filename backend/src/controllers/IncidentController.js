const connection = require('../connection');

module.exports = {
    async list(request, response) {
        const { page = 1 } = request.query;

        const [total] = await connection('incidents')
            .count();
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf');

        response.header('X-Total-Count', total['count(*)']);
        return response.json(incidents);
    },

    async details(request, response) {
        const { id } = request.params;

        const incident = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .where('incidents.id', id)
            .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf')
            .first();

        return response.json(incident);
    }
}