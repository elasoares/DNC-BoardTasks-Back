function routes(app) {
    app.use('/users', require('./routes/users'));
}

module.exports = routes;
