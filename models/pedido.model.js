const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pedidoSchema = new Schema ({
    comprador:{
        type: mongoose.Types.ObjectId,
        ref: "clientes",
        required: true,
    },
    libro:{
        type: mongoose.Types.ObjectId,
        ref: "libros",
        required: true,
    },
    unidades:{
        type: Number,
        required: true,
    }
})

const Pedido = mongoose.model("pedidos", pedidoSchema)

module.exports = Pedido