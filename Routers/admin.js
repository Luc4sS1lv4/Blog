const express = require('express')
const router = express.Router()
mongoose = require('mongoose')
require('../models/Categoria')
const categoria = mongoose.model('Categoria')

router.get("/posts", (req, res)=>{
    res.render("admin/index")
})

router.get('/categorias', (req, res)=>{
    res.render('admin/categorias')
})

router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategoria')
})

router.post("/categorias/nova", (req, res)=>{
    const novaCategoria = {
        Nome: req.body.Nome,
        Sobrenome: req.body.Sobrenome
    }

    new categoria(novaCategoria).save().then(()=>{
        console.log(`Funcionou a Criação da categoria\n
            Nome: ${novaCategoria.Nome}\n
            Sobrenome: ${novaCategoria.Sobrenome}`)
    })
})

module.exports = router