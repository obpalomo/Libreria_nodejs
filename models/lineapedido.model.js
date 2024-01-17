const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lineaPedidoSchema = new Schema({
    libro: {
        type: mongoose.Types.ObjectId,
        ref: "libros",
        required: true,
    },
    unidades: {
        type:Number,
        required: true
    }
})



const LineaPedido = mongoose.model("lineasPedido",lineaPedidoSchema)

module.exports = LineaPedido