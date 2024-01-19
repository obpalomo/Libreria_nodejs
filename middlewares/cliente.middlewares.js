const {validarEntradaCliente} = require('../helpers/validadores')
const {buscarPorMail} = require('../controllers/cliente.controller')

const jwt = require('jsonwebtoken')

function middlewareEntradaCliente(req,res,next) {
    const resultadoValidacion = validarEntradaCliente(req.body)
    if (resultadoValidacion.valido) {
        next()
    } else {
        res.status(400).json({msg: resultadoValidacion.mensaje})
    }
}

function middlewaraEmailValido(req,res,next){
    if(req.body.email.includes("@")){
        next()
    } else {
        res.status(400).json({msg: "el formato de mail no es correcto"})
    }
}

async function emailDuplicado(req,res,next){
    const usarioMailDuplicado = await buscarPorMail(req.body.email)
    if(usarioMailDuplicado){
        res.status(400).json({msg: "email duplicado"})
    } else {
        next()
    }
}

function estaLoggeado(req,res,next){
    next()
}



module.exports = {
    middlewareEntradaCliente,
    middlewaraEmailValido,
    emailDuplicado,
    estaLoggeado
}