
const express = require('express');
const router = express.Router();
const connectMongoDB = require('../middlewares/Conect-MongoDB');
const EsquemaTarefa = require('../models/tarefas');
const authUser = require('../middlewares/authUser');


router.post('/criar', authUser, connectMongoDB, async function(req, res, next) {
  try{
    // #swagger.tags = ['Tarefa']

    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const usuarioCriador = req.usuarioJwt.id;
    const respostaDB = await EsquemaTarefa.create({ posicao, titulo, descricao, status, dataEntrega, usuarioCriador });

    res.status(200).json({
      status: "Ok",
      statusMensagem: "Tarefa criada com sucesso!",
      resposta: respostaDB
    });


  }catch(error){
    return tratarErros(res, error);
  }
});



module.exports = router;
