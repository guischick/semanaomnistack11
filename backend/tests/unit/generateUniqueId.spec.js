const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique ID for a new ONG', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    })
})