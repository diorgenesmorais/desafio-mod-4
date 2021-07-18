const db = require('./db')

const create = async (produto) => {
    const { codigo, descricao, preco } = produto
    const produtoWhere = db.produto.findOne({
        where: {
            codigo
        }
    })

    if (produtoWhere) {
        update(produto)
    }

    return await db.produto.create({
        codigo,
        descricao,
        preco
    })
}

const update = async (produto) => {
    console.log(produto)
}

module.exports = {
    create,
    update
}
