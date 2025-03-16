function routes(app) {
    app.use('/usuario', require('./routes/usuario.js'));
}

module.exports = routes;
