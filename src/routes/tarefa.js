const express = require('express');
const router = express.Router();
const conectarBD = require('../middlewares/conectarBD.js');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados.js');
const schemaTasks = require('../models/tarefa.js');
const authUser = require('../middlewares/authUser.js');



router.post('/criar', authUser, conectarBD ,  async function(req, res) {
try{
    // #swagger.tag = ['Usuario']
    let {posicao, titulo, descricao, status, dataEntrega} = req.body;
    const usuarioCriador = req.usuariojwt.id;
    const respostaBD = await schemaTasks.create({posicao, titulo, descricao, status, dataEntrega, usuarioCriador});
    res.status(200).json({
        status: "Ok",
        statusMensagem: "Tarefa criada com sucesso",
        resposta: respostaBD
    });

}catch(error){
        return tratarErrosEsperados(res, error)
}
});


module.exports = router;
