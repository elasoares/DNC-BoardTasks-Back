async function authDocProducao(req, res, next){
    const {senha} = req.body;
    if(req.originalUrl !== "/doc/"){
        /* Usuário está no locallhost */
        return next();
    }
    if(senha === process.env.SWAGGER_SENHA_DOC){
        /* o usuário digitou a senha certa */
        return next();
    }
    if(senha){
         /* Se usuário digitou a senha errada */
        res.status(401).set('Content-Type','text/html');
        res.send(Buffer.from(`
            <form method="post">
                <p style="color: red;"> Senha Errada!</p>
                <label for="senha"> Senha da documentação</label>
                <input type="password" name="senha" id="senha"/>
                <button type="submit"> Entrar</button>
            </form>
            `))
    }else{
          /* O usuário ainda não digitou a senha e está em modo produção */
        res.status(200).set('Content-Type','text/html');
        res.send(Buffer.from(`
            <form method="post">
                <label for="senha"> Senha da documentação</label>
                <input type="password" name="senha" id="senha"/>
                <button type="submit"> Entrar</button>
            </form>
        `))
    }
} 

module.exports = authDocProducao;