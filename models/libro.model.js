const mongoose = require('mongoose');

const Schema = mongoose.Schema

const libroSchema = new Schema ({
    nombre: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    publicacion: {
        type: Number,
        required: false,
    },
    clasificacion: {
        type: String,
        required: false,
    }
})

const Libros = mongoose.model("libros", libroSchema)

module.exports = Libros;