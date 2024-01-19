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

  async function busquedaContiene(nombre,autor){
    const libros = await Libro.find( { nombre: { "$regex": nombre, "$options": "i" },
                                      autor: { "$regex": autor, "$options": "i" },})
    return  libros
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

async function eliminarLibro(id) {
    const libroEliminado = await Libro.findByIdAndDelete(id)
    return libroEliminado
}

async function modificarLibro(id,nom,autor,pub,clas) {
  const libroModificado = await Libro.findByIdAndUpdate(id, {
    nombre: nom,
    autor: autor,
    publicacion: pub,
    clasificacion: clas,
  })
    return libroModificado
}

async function patchLibro(id, datosActualizados) {
  try {
    const resultado = await Libro.findOneAndUpdate(
      { _id: id },
      { $set: datosActualizados },
      { new: true } // Para obtener el libro actualizado
    );

    if (!resultado) {
      throw new Error("Libro no encontrado");
    }

    return resultado;
  } catch (error) {
    console.error(error);
    throw new Error("Error al modificar el libro");
  }
}


module.exports = {
    buscarLibros,
    buscarPorNombreOAutor,
    entradaLibro,
    eliminarLibro,
    modificarLibro,
    patchLibro,
    busquedaContiene
}