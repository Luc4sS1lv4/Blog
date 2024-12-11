const express = require('express')
const handlebars = require('express-handlebars')
const BodyParser = require('body-parser')
const bodyParser = require('body-parser')
const app = express()
const port = 8081


//body Parser config.
app.use(BodyParser.urlencoded({extend:true}))
app.use(BodyParser.json())

//Handlebars Config.
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Mongoose




//Servidor
app.listen(port).then(()=>{
    console.log('Servidor rodando')
}).catch((error)=>{
    console.error(`Erro: ${error}`)
})