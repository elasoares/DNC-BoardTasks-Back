const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    posicao: {
        type: Number,
        required: 'Campo posição é obrigátorio',
    },
    titulo:{
        type: String,
        unique: true,
        required: 'Campo título é obrigátorio',
    },
    descricao:{
        type: String,
        required: 'Campo descrição é obrigatório.',
    },
    status:{
        type: String,
        required: 'Campo status é obrigatório.',
    },
    dataEntrega:{
        type: Date,
        default: null,
    },
    usuarioCriador:{
        type: mongoose.mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: 'Campo é obrigatório.',
    },
    },
    {
        timestamps: true
    }
);
const schemaTasks = mongoose.models.Tarefa || mongoose.model('Tarefa', schema);
module.exports = schemaTasks;