async function authUser(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; 

    if (!token) {
        return tratarErrosEsperados(res, new Error("Token de autenticação não fornecido"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.usuarioJwt = decoded;

        next();
    } catch (error) {
        console.error(error);
        return tratarErrosEsperados(res, new Error("Token de autenticação inválido"));
    }
}

module.exports = authUser;
