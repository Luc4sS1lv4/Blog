const express = require('express')
const router = express.Router()
mongoose = require('mongoose')
require('../models/Categoria')
const categoria = mongoose.model('Categoria')

router.get("/posts", (req, res)=>{
    res.render("admin/index")
})

router.get('/categorias', (req, res)=>{

    categoria.find().then((categorias)=>{
        res.render("admin/categorias", {categorias:categorias.map(categor => categor.toJSON())})
    })
    .catch((err)=>{
        req.flash("error_msg", "Houve u erro ao registrar")
        res.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategoria')
})

router.post("/categorias/nova", (req, res)=>{

    var erros = []

if(!req.body.Nome || typeof req.body.Nome == undefined || req.body.Nome == null){
    erros.push({Texto: "Nome inválido"})
}
if(!req.body.Sobrenome || typeof req.body.Sobrenome == undefined || req.body.Sobrenome == null){
    erros.push({Texto: "Sobrenome inválido"})}

if(erros.length > 0){
    res.render("admin/addcategoria", {erros: erros})
}else{
    const novaCategoria = {
        Nome: req.body.Nome,
        Sobrenome: req.body.Sobrenome
    }
    new categoria(novaCategoria).save().then(()=>{
        req.flash("success_msg", "categoria Cadastrada com sucesso")
        res.redirect("/admin/categorias")

    }).catch((error)=>{
        req.flash("error_msg", "Houve um erro ao salvar, tente novamente")
        res.redirect("admin/categorias")
    })}

}
)

module.exports = router