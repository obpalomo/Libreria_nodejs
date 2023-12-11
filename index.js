const express = require('express')
const bodyParser = require('body-parser')
const libroRouter = require('./routes/libro.routes')
const clienteRouter = require('./routes/cliente.routes')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://obpalomo:ZrbmRvNtjT51bdY6@cluster1.zlkhvg5.mongodb.net/Libreria',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a base de datos!'))

  // importar libros routes
app.use('/libros', libroRouter)

// importar clientes routes
app.use('/clientes', clienteRouter)


app.listen(3000)