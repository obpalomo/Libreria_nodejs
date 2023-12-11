const mongoose = require('mongoose');

const Schema = mongoose.Schema

const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    tema:{
        type: String,
        required: false
    }
})


const Clientes = mongoose.model("clientes", clienteSchema)

module.exports = Clientes;