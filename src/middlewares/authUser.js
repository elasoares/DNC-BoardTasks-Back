const jwt = require('jsonwebtoken');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');

async function authUser(req, res, next) {
    const token = req.headers['x-auth-token'];
    if(!token){
        return tratarErrosEsperados(res, new Error("Token de autenticação não fornecido."));
    }    

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuariojwt = decoded;
        next();
    }catch(err){
        console.error(err);
        return tratarErrosEsperados(res, new error("Token de autenticação inválido!"))
    }
}

module.exports = authUser;