const mongoose = require('mongoose');
const validator = require('validator');
const string = require('string');


const schema = new mongoose.Schema({
    nome: {
        type: String,
        required: 'Campo nome é obrigátorio',
    },
    email:{
        type: String,
        unique: true,
        required: 'Campo e-mail é obrigátorio',
        lowercase: true,
        index: true,
        validate:{
            validator: (valorDigitado) => {return validator.isEmail(valorDigitado)},
            message: 'Inválido.'
        }
    },
    senha:{
        type: String,
        required: 'Campo senha é obrigatório.',
        select: false,
    },
    },
    {
        timestamps: true
    }
);
const userSchema = mongoose.models.Usuario || mongoose.model('Usuario', schema);
module.exports = userSchema;