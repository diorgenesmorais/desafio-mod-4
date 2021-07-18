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

    test('Should create product if not exists', async () => {
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
        expect(res.body.erro[0].msg).toBe('A descrição deve ser informada')
    })

    test('Should returns status 400', async () => {
        const res = await request(app)
                        .put('/produtos')
                        .send({ codigo: 1, preco: 6.8 })

        expect(res.status).toBe(400)
    })

    test('Should returns status 405', async () => {
        const res = await request(app)
                        .put('/produtos')
                        .send({ codigo: 2, descricao: 'Banana', preco: 6.8 })

        expect(res.status).toBe(405)
    })

    test('Should get all and returns status 200', async () => {
        const res = await request(app)
                        .get('/produtos')

        expect(res.status).toBe(200)
    })

    test('Should delete and returns status 200', async () => {
        const res = await request(app)
                        .delete('/produtos/1')

        expect(res.status).toBe(200)
    })
})