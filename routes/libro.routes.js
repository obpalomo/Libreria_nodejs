const express = require("express");
const router = express.Router();

const {
  buscarLibros,
  buscarPorNombreOAutor,
  entradaLibro,
} = require("../controllers/libro.controller");

const {validarEntradaLibro} = require('../helpers/validadores')

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

router.post("/", async (req,res) => {
    await entradaLibro(
        req.body.nombre.trim(),
        req.body.autor.trim(),
        req.body.publicacion,
        req.body.clasificacion.trim()
    )
    res.json({msg:'Entrada libro correcta'})
})


module.exports = router;
