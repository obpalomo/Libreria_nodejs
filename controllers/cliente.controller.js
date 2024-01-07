const Cliente = require('../models/cliente.model')

async function buscarClientes(){
    const todos = await Cliente.find()
    return todos;
}

async function buscarPorMail(mail) {
    const clienteEncontrado = await Cliente.findOne({email: mail})
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



module.exports = {
    buscarClientes,
    buscarPorTematica,
    crearCliente,
    eliminarCliente,
    buscarPorMail
}