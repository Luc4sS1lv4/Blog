const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Categoria = new Schema({
    Nome:{
        type: String,
        required: true
    },
    Sobrenome: {
        type: String,
        required:true
    },
    Data:{
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("Categoria", Categoria);


  
