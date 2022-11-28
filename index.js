// config initial
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// read json / middlewares
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

// rotas API - //Configurando para a rota /person funcione junto a const PersonRoutes
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// route initial / endpoint
  app.get('/', (req, res) => {
    res.json({ msg: 'Rota funcionando' })
  })

// listen port
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ld5ilny.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(3000)
    console.log('Conectamos ao MongoDB')
  })
  .catch((err) => console.log(err))
