const express = require("express");
const router = express.Router();

const {
  buscarClientes,
  buscarPorTematica,
  crearCliente,
  eliminarCliente,
  login,
  buscarPorMail,
  buscarPorId,
} = require("../controllers/cliente.controller");

const {middlewareEntradaCliente,middlewaraEmailValido,emailDuplicado,estaLoggeado,esAdmin} = require('../middlewares/cliente.middlewares')


router.get("/", async (req, res) => {
  try {
    let clientes = []
    if(req.query.email){
        clientes = await buscarPorMail(req.query.email)
    }
    else{
        clientes = await buscarClientes()
    }
    res.json(clientes)
} catch (error) {
    res.status(500).json({ msg: "error interno en el servidor" })
}

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

router.post("/", middlewareEntradaCliente, middlewaraEmailValido,emailDuplicado, async (req, res) => {
  try{
    await crearCliente(req.body.nombre.trim(), req.body.email.trim(), req.body.password, req.body.tema, req.body.rol)
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

router.post("/login", async (req,res)=>{
  try{
      const resultado = await login(req.body.email, req.body.password)
      res.json({token: resultado.token, msg: resultado.msg})
  }catch(error){
      res.status(500).json({ msg: "error interno en el servidor" })
  }
})

router.get("/zona-privada/perfil/:id", estaLoggeado, async(req, res)=>{
  const clienteEncontrado = await buscarPorId(req.params.id)
  res.json({msg:'bienvenido a tu perfil! ' + clienteEncontrado.email})
})

router.get("/zona-admin/home", esAdmin, async(req,res) => {
  res.json({msg:'hola admin'})
})



module.exports = router;
