const request = require('supertest')
const app = require('../src/app.js')
const db = require('../src/db')

describe.only('Teste integração produtos', () => {

    afterAll(async () => await db.sequelize.close())

    const payloadRequest = {
        codigo: 1,
        descricao: 'Banana',
        preco: 3.5
    }

    test('Should create product if not exists', async () => {
        const res = await request(app)
                        .post('/produtos')
                        .send(payloadRequest)
        
        expect(res.status).toBe(201)
    })
})