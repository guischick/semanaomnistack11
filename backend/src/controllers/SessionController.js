const connection = require('../connection');

module.exports = {
    async login(request, response) {
        const { id } = request.body;

        const ong = connection('ongs')
            .select('name')
            .where('id', id)
            .first();

        if (!ong) {
            return response.status(400).json({ error: "No ONG found with this Id. "});
        }

        return response.json({ name });
    }

}