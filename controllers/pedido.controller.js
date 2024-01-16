const Pedido = require('../models/pedido.model')

async function obtenerPedidos(){
    const pedidos = await Pedido.find()

    return pedidos
}

async function crearPedido(usuario, producto, cantidad){
    const nuevoPedido = new Pedido({
        comprador: usuario,
        libro: producto,
        unidades: cantidad
    })

    await nuevoPedido.save()

    return nuevoPedido
}

module.exports = {
    obtenerPedidos,
    crearPedido
}