const express = require('express')
const router = express.Router()

const {buscarClientes, buscarPorTematica, crearCliente} = require('../controllers/cliente.controller')

const {validarEntradaCliente} = require('../helpers/validadores')


router.get("/", async (req,res) => {
    const clientes = await buscarClientes()
    res.json(clientes)
})

router.get("/:tema", async (req, res) => {
    try {
      const temaBusqueda = req.params.tema;
      const resultados = await buscarPorTematica(temaBusqueda);
      if (resultados.length > 0) {
        res.json(resultados);
      } else {
        res.status(404).json({
          msg: "Error: No se han encontrado usuarios",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error interno" });
    }
  });

router.post("/", async (req,res) => {
    await crearCliente (
        req.body.nombre.trim(),
        req.body.email.trim(),
        req.body.password,
        req.body.tema.trim(),
    )

    res.json({msg:"Cliente creado correctamente"})
})




module.exports = router