const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Categoria = new Schema({
    Nome:{
        type: String,
        require: true
    },
    Sobrenome: {
        type: String,
        require:true
    },
    Data:{
        type: Date,
        default: Date.now()
    }

})

mongoose.model("Categoria", Categoria)