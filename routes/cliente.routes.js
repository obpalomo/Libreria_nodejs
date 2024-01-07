const express = require("express");
const router = express.Router();

const {
  buscarClientes,
  buscarPorTematica,
  crearCliente,
  eliminarCliente,
} = require("../controllers/cliente.controller");

const {middlewareEntradaCliente,middlewaraEmailValido,emailDuplicado} = require('../middlewares/cliente.middlewares')


router.get("/", async (req, res) => {
  try {
  const clientes = await buscarClientes();
  res.json(clientes);
  } catch (error) {
    res.status(500).json({msg: 'error interno en el servidor'})
  }
});

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

router.post("/", middlewareEntradaCliente, middlewaraEmailValido, emailDuplicado, async (req, res) => {
  try{
    await crearCliente(req.body.nombre.trim(), req.body.email.trim(), req.body.password, req.body.tema)
    res.json({msg: "usuario creado"})
  } catch (error) {
    res.status(500).json({msg: "error interno en el servidor"})
  }
})

router.delete("/:id", async (req,res) => {
  const clienteEliminado = await eliminarCliente(req.params.id)
  if(clienteEliminado) {
    res.json({msg:"Cliente eliminado"})
  } else {
    res.status(404).json({msg:"Cliente no encontrado"})
  }
})

module.exports = router;
