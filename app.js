const express = require('express')
const handlebars = require('express-handlebars')
const BodyParser = require('body-parser')
const app = express()
const port = 8081
const admin = require('./Routers/admin')
const path = require('path')

//body Parser config.
app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())

//Handlebars Config.
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Mongoose


//Public
app.use(express.static(path.join(__dirname,'Public')))

//rotas
app.use('/admin',admin)

//Servidor
app.listen(port, ()=>{
    console.log('Servidor rodando')
})