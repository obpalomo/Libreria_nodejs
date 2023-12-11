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

module.exports = {
    validarEntradaLibro,
}