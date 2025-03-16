const { lowerCase } = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({

    nome:{
        type: String,
        required: 'O campo nome é obrigatório!',
    },
    email:{
        type: String,
        unique: true,
        required: "O campo e-mail é obrigatório!",
        lowerCase: true,
        index: true,
        validator:{
            validator: (validator)=>{return validator.isEmail(validator)},
            message: "Campo inválido!"
        }
    },
    senha: {
        type: String,
        required: "O campo senha é obrigatório!",
        select: false,
    },
},
{
    timestamps: true
}
);

const EsquemaUsuario = mongoose.models.Usuario || mongoose.model('Usuario', schema);
module.exports = EsquemaUsuario;