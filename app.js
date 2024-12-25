const express = require('express')
const handlebars = require('express-handlebars')
const BodyParser = require('body-parser')
const app = express()
const port = 3000
const admin = require('./Routers/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require("connect-flash")

//Configs
//Sessões
app.use(session({
    secret: "ldsskamikaze",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg"),
        res.locals.error_msg = req.flash("error_msg"),
        next()
})
//body Parser config.
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

//Handlebars Config.
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Mongoose
mongoose.Promise = global.Promisse
mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("conectado ao banco")
}).catch((error) => {
    console.log(`O erro é: ${error}`)
})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

//Public
app.use(express.static(path.join(__dirname, 'Public')))

//rotas
app.get("/", (req, res) => {
    res.render("index")
})
app.use('/admin', admin)

//Servidor
app.listen(port, () => {
    console.log('Servidor rodando')
})