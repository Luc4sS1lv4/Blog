const express = require('express')
const router = express.Router()
mongoose = require('mongoose')
require('../models/Categoria')
const categoria = mongoose.model('Categoria')

router.get("/posts", (req, res) => {
    res.render("admin/index")
})

//Lista de Categorias
router.get('/categorias', (req, res) => {

    categoria.find().then((categorias) => {
        res.render("admin/categorias", { categorias: categorias.map(categor => categor.toJSON()) })
    })
        .catch((err) => {
            req.flash("error_msg", "Houve um erro ao registrar")
            res.redirect('/admin')
        })
})

//
router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategoria')
})

//Rota de validação que redireciona para a rota de lista de categorias
router.post("/categorias/nova", (req, res) => {

    //validação de formulário
    var erros = []

    if (!req.body.Nome || typeof req.body.Nome == undefined || req.body.Nome == null) {
        erros.push({ Texto: "Nome inválido" })
    }
    if (!req.body.Sobrenome || typeof req.body.Sobrenome == undefined || req.body.Sobrenome == null) {
        erros.push({ Texto: "Sobrenome inválido" })
    }

    //Em caso de erros ele será exibido na tela na rota de adicionar categorias
    if (erros.length > 0) {
        res.render("admin/addcategoria", { erros: erros })
    } else {
        const novaCategoria = {
            Nome: req.body.Nome,
            Sobrenome: req.body.Sobrenome
        }

        //flash recebe dois argumentos("Variavel global neste caso", ""Mensagem que essa variavel exibie)
        new categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "categoria Cadastrada com sucesso")
            res.redirect("/admin/categorias")

        }).catch((error) => {
            req.flash("error_msg", "Houve um erro ao salvar, tente novamente")
            res.redirect("admin/categorias")
        })
    }

}
)

router.get("/categorias/edit/:id", (req, res) => {
    categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.render("admin/editeCategorias", { categoria: categoria })
    }).catch((erro) => {
        req.flash("error_msg", "Não foi possivel alterar os dados")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit", (req, res)=>{
    categoria.findOne({_id: req.body.id}).then((categoria)=>{
        categoria.Nome = req.body.Nome
        categoria.Sobrenome = req.body.Sobrenome

        categoria.save().then(()=>{
            res.redirect("/admin/categorias")
            req.flash("success_msg", "Categoria Atualizada com sucesso")
        }).catch((error)=>{
            req.flash("error_msg", "Erro ao Salvar")
        })
    })
})

module.exports = router