const {validarEntradaCliente} = require('../helpers/validadores')
const {buscarPorMail,buscarPorId} = require('../controllers/cliente.controller')

const jwt = require('jsonwebtoken')
require('dotenv').config()

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
    if(req.query.token){

        try{
            const resultado = jwt.verify(req.query.token, process.env.JWTSECRET)
            if(resultado.id === req.params.id) {
                next()
            } else {
                res.status(403).json({msg:"no tienes persmiso para acceder al perfil"})
            }
        } catch (error) {
            res.status(401).json({msg:"token no valido"})
        }
    } else {
        res.status(400).json({msg:"no has proporcionado token"})
    }
}

async function esAdmin(req,res,next){
    if(req.query.token){

        try{
            const resultado = jwt.verify(req.query.token, process.env.JWTSECRET)
            const clienteEncontrado = await buscarPorId(resultado.id)
            if(clienteEncontrado.rol === "admin"){
                next()
            }
            else{
                res.status(403).json({msg: "no tienes permiso para acceder a este recurso"})
            }
        }catch(error){
            res.status(401).json({msg: "token no valido"})
        }
    }
    else{
        res.status(400).json({msg: "no has proporcionado token"})
    }
}



module.exports = {
    middlewareEntradaCliente,
    middlewaraEmailValido,
    emailDuplicado,
    estaLoggeado,
    esAdmin
}