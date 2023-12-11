function validarEntradaLibro(body){
    if (req.body.nombre === undefined
        || req.body.nombre.trim() === ""
        || req.body.autor === undefined
        || req.body.autor.trim() === "") {
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
    if (req.body.nombre === undefined
        || req.body.nombre.trim() === ""
        || req.body.email === undefined
        || req.body.email.trim() === ""
        || req.body.password === undefined
        || req.body.password === "") {
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