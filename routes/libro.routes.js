const express = require("express");
const router = express.Router();

const {
  buscarLibros,
  buscarPorNombreOAutor,
  entradaLibro,
  eliminarLibro,
  modificarLibro,
  patchLibro,
  busquedaContiene,
} = require("../controllers/libro.controller");

const { validarEntradaLibro } = require("../helpers/validadores");
const Libros = require("../models/libro.model");

router.get("/", async (req, res) => {
  try {
    let libros = []
    if (req.query.nombre || req.query.autor) {
        const nombre = req.query.nombre ? req.query.nombre : ""
        const marca = req.query.autor ? req.query.autor : ""
        libros = await busquedaContiene(nombre, marca)
    }
    else {
        libros = await buscarLibros()
    }

    res.json(libros)
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

router.get("/:lib", async (req, res) => {
  try {
    const libBusqueda = req.params.lib;
    const resultados = await buscarPorNombreOAutor(libBusqueda);

    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.status(404).json({
        msg: "Error: No se han encontrado coincidencias en la búsqueda",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno" });
  }
});

router.post("/", async (req, res) => {
  const validacion = validarEntradaLibro(req.body);

  if (!validacion.valido) {
    return res.status(400).json({ msg: validacion.mensaje });
  }
  await entradaLibro(
    req.body.nombre.trim(),
    req.body.autor.trim(),
    req.body.publicacion,
    req.body.clasificacion
  );
  res.json({ msg: "Entrada libro correcta" });
});

router.delete("/:id", async (req, res) => {
  const libroEliminado = await eliminarLibro(req.params.id);
  if (libroEliminado) {
    res.json({ msg: "El libro se ha eliminado" });
  } else {
    res.status(404).json({ msg: "Libro no encontrado" });
  }
});


router.put("/:id", async (req,res) => {
  let libroencontrado = null;
  let msg = [];
  const resultadoValidacion = validarEntradaLibro(req.body);
  if (!resultadoValidacion.valido) {
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  } else {
    libroencontrado = await modificarLibro(
      req.params.id,
      req.body.nombre.trim(),
      req.body.autor.trim(),
      req.body.publicacion,
      req.body.clasificacion
    )
    res.json(libroencontrado === null
      ? { msg: "error: libro no encontrado" }
      : { dato: libroencontrado, mensajes: 'El libro se ha modificado' }
  );
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const libroencontrado = await patchLibro(req.params.id, req.body);

    if (libroencontrado === null) {
      return res.status(404).json({ msg: "Error: Libro no encontrado" });
    }

    res.json({
      dato: libroencontrado,
      mensaje: 'El libro se ha modificado correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
});



module.exports = router;
