const express = require('express');
const router = express.Router();
const conectarBD = require('../middlewares/conectarBD.js');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/usuario.js');


router.post('/criar', conectarBD ,  async function(req, res) {
  try{
    // #swagger.tag = ['Usuario']
    let {nome, email, senha} = req.body;
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD = await userSchema.create({nome, email, senha: senhaHash});
    res.status(200).json({
      status: "Ok",
      statusMensagem: "Usuário criado com sucesso",
      resposta: respostaBD
    });

  }catch(error){
    if(String(error).includes("email_1 dup key")){
      return tratarErrosEsperados(res, "Error: E-mail já cadastrado.")
    }
    return tratarErrosEsperados(res, error)
  }
});



router.post('/logar', conectarBD, async function (req, res) {
  try{
    // #swagger.tag = ['Usuario']
    let {email, senha}= req.body;
    let respostaBD = await userSchema.findOne({email}).select('+senha');
    if(respostaBD){
        let senhaCorreta = await bcrypt.compare(senha, respostaBD.senha);
        if(senhaCorreta){
          let token = jwt.sign({id: respostaBD._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

          res.header('x-auth-token', token);
          res.status(200).json({
            status: 'Ok',
            statusMensagem: "Usuário autenticado com sucesso.",
            resposta: { "x-auth-token": token}
          });
        }else{
        throw new Error("E-mail ou senha incorreta.");
        }
    }else{
      throw new Error("E-mail ou senha incorreta.");
    }
  }catch(err){
    return tratarErrosEsperados(res, err);
  }
})
module.exports = router;
