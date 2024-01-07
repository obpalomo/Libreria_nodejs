require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const libroRouter = require('./routes/libro.routes')
const clienteRouter = require('./routes/cliente.routes')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("secretKey", process.env.JWTSECRET)

mongoose.connect(process.env.CONNECTIONSTRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a base de datos!'))

  // importar libros routes
app.use('/libros', libroRouter)

// importar clientes routes
app.use('/clientes', clienteRouter)


app.listen(process.env.PORT)