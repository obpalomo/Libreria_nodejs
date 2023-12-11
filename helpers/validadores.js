function validarEntradaLibro(body){
    if (body.nombre === undefined
        || body.nombre.trim() === ""
        || body.autor === undefined
        || body.autor.trim() === "") {
        return{
            valido: false,
            mensaje: "falta nombre o autor"
        }
    }
    else{
        return{
            valido: true,
            mensaje: null,
        }
    }
}

function validarEntradaCliente(body){
    if (body.nombre === undefined
        || body.nombre.trim() === ""
        || body.email === undefined
        || body.email.trim() === ""
        || body.password === undefined
        || body.password === "") {
        return{
            valido: false,
            mensaje: "falta nombre, email o password"
        }
    }
    else{
        return{
            valido: true,
            mensaje: null,
        }
    }
}



module.exports = {
    validarEntradaLibro,
    validarEntradaCliente
}