const Cliente = require('../models/cliente.model')

async function buscarClientes(){
    const todos = await Cliente.find()
    return todos;
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

    return nuevoCliente;
}



module.exports = {
    buscarClientes,
    buscarPorTematica,
    crearCliente
}