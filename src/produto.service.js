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
    const { codigo } = produto
    return await db.produto.update(produto, {
        where: {
            codigo
        }
    })
}

const findAll = async () => {
    return await db.produto.findAll({})
}

const destroy = async (codigo) => {
    return await db.produto.destroy({
        where: {
            codigo
        }
    })
}

module.exports = {
    create,
    update,
    findAll,
    destroy
}
