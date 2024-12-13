const express = require('express')
const handlebars = require('express-handlebars')
const BodyParser = require('body-parser')
const app = express()
const port = 8081
const admin = require('./Routers/admin')
const path = require('path')
const mongoose = require('mongoose')

//body Parser config.
app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())

//Handlebars Config.
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Mongoose
 mongoose.Promise = global.Promisse
mongoose.connect("mongodb://localhost/blogapp").then(()=>{
    console.log("conectado ao banco")
}).catch((error)=>{
    console.log(`O erro é: ${error}`)
})

//Public
app.use(express.static(path.join(__dirname,'Public')))

//rotas
app.use('/admin',admin)

//Servidor
app.listen(port, ()=>{
    console.log('Servidor rodando')
})