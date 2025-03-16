
const express = require('express');
const router = express.Router();
const connectMongoDB = require('../middlewares/Conect-MongoDB');
const EsquemaTarefa = require('../models/tarefas');
const authUser = require('../middlewares/authUser');


router.post('/criar', authUser, connectMongoDB, async function(req, res, next) {
  try{
    // #swagger.tags = ['Tarefa']

    let { titulo, descricao, status, dataEntrega } = req.body;
    const usuarioCriador = req.usuarioJwt.id;
    const respostaDB = await EsquemaTarefa.create({ titulo, descricao, status, dataEntrega, usuarioCriador });

    res.status(200).json({
      status: "Ok",
      statusMensagem: "Tarefa criada com sucesso!",
      resposta: respostaDB
    });


  }catch(error){
    return tratarErros(res, error);
  }
});

router.put('/editar/:id', authUser, connectMongoDB, async function(req, res, next) {
  try{
    // #swagger.tags = ['Tarefa']
    let idTarefa = req.params.id;

    let { titulo, descricao, status, dataEntrega } = req.body;

    const usuarioLogado = req.usuarioJwt.id;

    const checkTarefa = await EsquemaTarefa.findOne({_id: idTarefa, usuarioCriador: usuarioLogado})

    if(!checkTarefa){
      throw new Error("Tarefa não encontrada ou pertence a outro usuário.")
    }

    const tarefaAtualizada = await EsquemaTarefa.updateOne({_id: idTarefa},{ titulo, descricao, status, dataEntrega });
    if(tarefaAtualizada?.modifiedCount > 0){
      const dadostarefa = await EsquemaTarefa.findOne({_id: idTarefa}).populate('usuarioCriador');
      res.status(200).json({
        status: "Ok",
        statusMensagem: "Tarefa atualizada com sucesso!",
        resposta: dadostarefa
      });
  
    }
    

  }catch(error){
    return tratarErros(res, error);
  }
  
});


router.get('/obter', authUser, connectMongoDB, async function(req, res, next) {
  try{
    // #swagger.tags = ['Tarefa']
    // #swagger.description = "Endpoint para obter todas as tarefas de usuário logado."
    const usuarioLogado = req.usuarioJwt.id;
    const respostaDB = await EsquemaTarefa.find({usuarioCriador: usuarioLogado}).populate('usuarioCriador');

    res.status(200).json({
      status: "Ok",
      statusMensagem: "Tarefas listadas com sucesso!",
      resposta: respostaDB
    });


  }catch(error){
    return tratarErros(res, error);
  }
});

router.delete('/deletar/:id', authUser, connectMongoDB, async function(req, res, next) {
  try{
    // #swagger.tags = ['Tarefa']

    const idtarefa = req.params.id;

    const usuarioLogado = req.usuarioJwt.id;

    const checkTarefa = await EsquemaTarefa.findOne({_id: idtarefa, usuarioCriador: usuarioLogado});
    if(!checkTarefa){
      throw new Error("Tarefa não encontrada ou pertence a outro usuário.")
    }

    const respostaDB = await EsquemaTarefa.deleteOne({_id: idtarefa});

    res.status(200).json({
      status: "Ok",
      statusMensagem: "Tarefas deletada com sucesso!",
      resposta: respostaDB
    });


  }catch(error){
    return tratarErros(res, error);
  }
});


module.exports = router;
