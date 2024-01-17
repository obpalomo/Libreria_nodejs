const Pedido = require('../models/pedido.model')

async function obtenerPedidos(){
    const pedidos = await Pedido.find().populate('libro','-_id -__v').populate('comprador','-password -_id -__v"')

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