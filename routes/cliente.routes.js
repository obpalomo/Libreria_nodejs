const express = require("express");
const router = express.Router();

const {
  buscarClientes,
  buscarPorTematica,
  crearCliente,
  eliminarCliente,
} = require("../controllers/cliente.controller");

const { validarEntradaCliente } = require("../helpers/validadores");

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

router.post("/", async (req, res) => {
  const validacion = validarEntradaCliente(req.body);

  if (!validacion.valido) {
    return res.status(400).json({ msg: validacion.mensaje });
  }
  const nuevoCliente = await crearCliente(
    req.body.nombre.trim(),
    req.body.email.trim(),
    req.body.password,
    req.body.tema
  );
  if (nuevoCliente === null) {
    // Cliente con correo electrónico duplicado
    return res
      .status(400)
      .json({ msg: "Error: El correo electrónico ya está registrado" });
  }

  res.json({ msg: "Cliente creado correctamente" });
});

router.delete("/:id", async (req,res) => {
  const clienteEliminado = await eliminarCliente(req.params.id)
  if(clienteEliminado) {
    res.json({msg:"Cliente eliminado"})
  } else {
    res.status(404).json({msg:"Cliente no encontrado"})
  }
})

module.exports = router;
