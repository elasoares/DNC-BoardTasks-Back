
const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    titulo:{
        type: String,
        required: "O campo título é obrigatório!",
    },
    descricao: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        required: "O campo status é obrigatório!",
    },
    dataEntrega: {
        type: Date,
        default: null,
    },
    usuarioCriador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: "O campo é obrigatório!",
    },
},
{
    timestamps: true
}
);

const EsquemaTarefa = mongoose.models.Tarefa || mongoose.model('Tarefa', schema);
module.exports = EsquemaTarefa;