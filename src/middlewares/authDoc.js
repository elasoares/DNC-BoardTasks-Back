async function authDocProduction(req, res, next) {
    const {senhaDigitada} = req.body;
    if(req.headers.host.includes("localhost") || req.originalUrl !== "/doc/"){
        // Quando o usuário está no localhost
        return next();
    }
    if(senhaDigitada === process.env.SWAGGER_SENHA_DOC){
        //Usuário digitou a senha certa
        return next();
    }

    if(senhaDigitada){
        // Aqui é quando o usuário digitou a senha e a senha está incorreta
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form  method="post">
                <p style="color: red;">Senha errada!</p>
                <label htmlFor="senhaDigitada">Senha da documentação: </label>
                <input type="password" name="senhaDigitada" id="senhaDigitada"/>
                <button type="submit"> Entrar</button>
            </form>
        `))
    }else{
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form  method="post">
                <label htmlFor="senhaDigitada">Senha da documentação: </label>
                <input type="password" name="senhaDigitada" id="senhaDigitada"/>
                <button type="submit"> Entrar</button>
            </form>
        `))
    }

}
module.exports = authDocProduction;