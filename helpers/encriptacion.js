const bcrypt = require('bcryptjs');

async function encriptar(pwd){
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(pwd,salt)
    return hash
}

async function comprobar(hash,pwd){
    const resultado = await bcrypt.compare(pwd,hash)
    return resultado
}

module.exports = {
    comprobar,
    encriptar
}