const express = require('express')
const app = express()

const { check, validationResult } = require('express-validator')

const consultaCliente = require('./consulta-cliente')
const produtoService = require('./produto.service')

app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!')
})

app.post('/consulta-credito',

  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
  check('parcelas', 'O número de parcelas deve ser um número inteiro').notEmpty().isInt(),

  async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() })
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas
      )
      res.status(201).json(valores)
    } catch (erro) {
      return res.status(405).json({ erro: erro.message })
    }
  }
)

app.post('/produtos',
  check('codigo', 'O código deve ser informado').notEmpty(),
  check('descricao', 'A descrição deve ser informada').notEmpty(),
  check('preco', 'O preço deve ser um número').notEmpty().isFloat(),
  async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() })
    }
    try {
      const result = await produtoService.create(req.body)
      res.status(201).json(result)
    } catch (error) {
      res.json({ erro: error.message })
    }
  }
)

app.put('/produtos',
  check('codigo', 'O código deve ser informado').notEmpty(),
  check('descricao', 'A descrição deve ser informada').notEmpty(),
  check('preco', 'O preço deve ser um número').notEmpty().isFloat(),
  async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() })
    }
    try {
      const [result] = await produtoService.update(req.body)
      if (result === 0) {
        return res.status(405).send()
      }
      res.status(200).json(result)
    } catch (error) {
      res.status(405).json({ erro: error.message })
    }
  }
)

app.get('/produtos', async (req, res) => {
  const result = await produtoService.findAll()
  res.status(200).json(result)
})

app.delete('/produtos/:codigo', async (req, res) => {
  const result = await produtoService.destroy(req.params.codigo)
  const statusCode = result ? 200 : 405
  res.status(statusCode).end()
})

module.exports = app
