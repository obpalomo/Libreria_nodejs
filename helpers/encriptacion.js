const bcrypt = require('bcryptjs');

async function comprobar(hash,pwd){
    const resultado = await bcrypt.compare(pwd,hash)
    return resultado
}

module.exports = {
    comprobar,
}