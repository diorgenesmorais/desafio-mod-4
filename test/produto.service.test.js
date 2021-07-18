const request = require('supertest')
const app = require('../src/app.js')
const db = require('../src/db')

describe.only('Teste integração produtos', () => {

    afterAll(async () => await db.sequelize.close())

    const payloadRequest = {
        codigo: 1,
        descricao: 'Banana comprida',
        preco: 3.5
    }

    test.skip('Should create product if not exists', async () => {
        const res = await request(app)
                        .post('/produtos')
                        .send(payloadRequest)
        
        expect(res.status).toBe(201)
    })

    test('Should update product if exists', async () => {
        const res = await request(app)
                        .post('/produtos')
                        .send(payloadRequest)
        
        expect(res.status).toBe(200)
    })

    test('Should returns status 400', async () => {
        const res = await request(app)
                        .post('/produtos')
                        .send({ codigo: 2, preco: 6.8 })

        expect(res.status).toBe(400)
    })
})