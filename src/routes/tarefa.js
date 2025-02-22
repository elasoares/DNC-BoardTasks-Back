const express = require('express');
const router = express.Router();
const conectarBD = require('../middlewares/conectarBD.js');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados.js');
const schemaTasks = require('../models/tarefa.js');
const authUser = require('../middlewares/authUser.js');

router.post('/criar', authUser, conectarBD ,  async function(req, res) {
    try {
        // #swagger.tags = ['Tarefa']
        let {posicao, titulo, descricao, status, dataEntrega} = req.body;
        const usuarioCriador = req.usuariojwt.id;
        const respostaBD = await schemaTasks.create({posicao, titulo, descricao, status, dataEntrega, usuarioCriador});
        
        res.status(200).json({
            status: "Ok",
            statusMensagem: "Tarefa criada com sucesso",
            resposta: respostaBD
        });

    } catch(error) {
        return tratarErrosEsperados(res, error);
    }
});

router.put('/editar/:id', authUser, conectarBD ,  async function(req, res) {
    try {
        // #swagger.tags = ['Tarefa']
        let idTarefa = req.params.id;
        let {posicao, titulo, descricao, status, dataEntrega} = req.body;
        const usuarioCriador = req.usuariojwt.id; 

        const checkTarefa = await schemaTasks.findOne({ _id: idTarefa, usuarioCriador });
        if (!checkTarefa) {
            throw new Error("Tarefa não encontrada.");
        }

        const tarefaAtualizada = await schemaTasks.updateOne({ _id: idTarefa }, { posicao, titulo, descricao, status, dataEntrega });
        if(tarefaAtualizada?.modifiedCount > 0){
            const dadosTarefa = await schemaTasks.findOne({_id: idTarefa}).populate('usuarioCriador')
            res.status(200).json({
                status: "Ok",
                statusMensagem: "Tarefa atualizada com sucesso",
                resposta: dadosTarefa
            });
        }

    } catch(error) {
        return tratarErrosEsperados(res, error);
    }
});

module.exports = router;
