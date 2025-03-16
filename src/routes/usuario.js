
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connectMongoDB = require('../middlewares/Conect-MongoDB');
const tratarErros = require('../functions/TratarErrors');
const EsquemaUsuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

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


router.post('/logar', connectMongoDB,  async function(req, res){
  try{
    let { email, senha } = req.body;
    let respostaDB = await EsquemaUsuario.findOne({email}).select('+senha');

    if(respostaDB){

      let senhaCorreta = await bcrypt.compare(senha, respostaDB.senha);

      if(senhaCorreta){

          let token = jwt.sign({id: respostaDB._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

          res.header('x-auth-token', token);
          res.status(200).json({
            status: "Ok",
            statusMensagem: "Usuário autenticado com sucesso!",
            resposta: { "x-auth-token": token }
          });
      }else{
        throw new Error("E-mail ou senha incorreta.")
      }
    }else{
      throw new Error("E-mail ou senha incorreta.")
  }

  }catch(error){

    return tratarErros(res, error);
  }
})
module.exports = router;
