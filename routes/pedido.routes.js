const express = require('express')
const router = express.Router()


const {obtenerPedidos, crearPedido} = require('../controllers/pedido.controller')

router.get('/', async (req, res) => {
    const pedidos = await obtenerPedidos()
    res.json(pedidos)
})

router.post('/', async (req, res) => {
    await crearPedido(
        req.body.usuario,
        req.body.producto,
        req.body.cantidad)

    res.json({msg: "pedido creado"})

})





module.exports = router