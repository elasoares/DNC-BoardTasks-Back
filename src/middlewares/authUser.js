const jwt = require('jsonwebtoken');
const tratarErros = require('../functions/TratarErrors');

async function authUser(req, res, next){
    const token = req.headers['x-auth-token'];
    if(!token){
        return  tratarErros(res, new Error("Token de autenticação não fornecido."))
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioJwt = decoded;
        next();
    }catch(err){
        console.error(err);
        return tratarErros(res, new Error("Token de autenticação inválido!"))
    }
}

module.exports = authUser;