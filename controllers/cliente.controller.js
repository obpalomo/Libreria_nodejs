const Cliente = require('../models/cliente.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function buscarClientes(){
    const todos = await Cliente.find()
    return todos;
}

async function buscarPorMail(mail) {
    const clienteEncontrado = await Cliente.find({email: mail})
    return clienteEncontrado
}

async function buscarPorTematica(tema) {
    const regex = new RegExp(tema, 'i');
    const resultados = await Cliente.find({tema:{$regex: regex}})
    return resultados;
}

async function crearCliente(nom,mail,pass,tem) {
    const nuevoCliente = new Cliente ({
        nombre:nom,
        email:mail,
        password:pass,
        tema:tem,
    })
        await nuevoCliente.save()

        return nuevoCliente
}

async function eliminarCliente(id) {
    const clienteEliminado = await Cliente.findByIdAndDelete(id)
    return clienteEliminado
}

async function login(mail, pwd) {
    const usuarioEncontrado = await Cliente.findOne({email: mail})

    if(usuarioEncontrado) {
        if(usuarioEncontrado.password === pwd) {
            const token = jwt.sign({id: usuarioEncontrado._id, name: usuarioEncontrado.email}, process.env.JWTSECRET, {expiresIn: '1h'})
            return{
                usuario: usuarioEncontrado,
                token: token,
                msg: null
            }
        } else {
            return {
                usuario: null,
                token:null,
                msg: 'password incorrecta'
            }
        }
    } else {
        return {
            usuario: null,
            token: null,
            msg: 'email no encontrado'
        }
    }
}


module.exports = {
    buscarClientes,
    buscarPorTematica,
    crearCliente,
    eliminarCliente,
    buscarPorMail,
    login
}