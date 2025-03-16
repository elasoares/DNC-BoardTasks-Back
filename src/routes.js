function routes(app) {
    app.use('/usuario', require('./routes/usuario.js'));
    app.use('/tarefa', require('./routes/tarefa'));
}

module.exports = routes;
