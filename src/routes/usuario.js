
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connectMongoDB = require('../middlewares/Conect-MongoDB');
const tratarErros = require('../functions/TratarErrors');
const EsquemaUsuario = require('../models/usuario');


router.post('/criar', connectMongoDB, async function(req, res, next) {
  try{
    // #swagger.tags = ['Usuario]

    let { nome, email, senha } = req.body;
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaDB = await EsquemaUsuario.create({nome, email, senha: senhaHash});

    res.status(200).json({
      status: "Ok",
      statusMensagem: "Usuário criado com sucesso!",
      resposta: respostaDB
    });


  }catch(error){
    if(String(error).includes("email_1 dup key")){
      return tratarErros(res, "Error: já existe uma conta com esse e-mail. ");
    }
    return tratarErros(res, error);
  }
});

module.exports = router;
