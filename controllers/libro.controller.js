const Libro = require('../models/libro.model')

async function buscarLibros() {
    const libros = await Libro.find()
    return libros;
}

async function buscarPorNombreOAutor(lib) {
    const regex = new RegExp(lib, 'i');
    const resultados = await Libro.find({
      $or: [
        { autor: { $regex: regex } },
        { nombre: { $regex: regex } }
      ]
    });
    return resultados;
  }

async function entradaLibro(nom,autor,pub,clas) {
    const nuevoLibro = new Libro ({
        nombre: nom,
        autor: autor,
        publicacion: pub,
        clasificacion: clas,
    })

    await nuevoLibro.save()

    return nuevoLibro
}


module.exports = {
    buscarLibros,
    buscarPorNombreOAutor,
    entradaLibro,
}