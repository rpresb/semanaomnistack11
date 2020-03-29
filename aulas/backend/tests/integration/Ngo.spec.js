const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/database/connection');

describe('Ngo', () => {
    beforeEach(async () => {
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    
    afterAll(async () => {
        await db.destroy();
    });

    it('should be able to create a new NGO', async () => {
        const response = await request(app)
            .post('/ngos')
            .send({
                name: "Test",
                email: "test@test.com.br",
                whatsapp: "1191919191",
                city: "Rio do Sul",
                state: "SC"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});