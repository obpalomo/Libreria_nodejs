const express = require("express");
const router = express.Router();

const {
  buscarLibros,
  buscarPorNombreOAutor,
  entradaLibro,
  eliminarLibro,
} = require("../controllers/libro.controller");

const { validarEntradaLibro } = require("../helpers/validadores");

router.get("/", async (req, res) => {
  try {
    const libros = await buscarLibros();
    res.json(libros);
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

module.exports = router;
