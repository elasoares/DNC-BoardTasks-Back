const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {customCssUrl: '/swagger-ui.css'};
const routes = require('./src/routes.js');
const authDocProducao = require('./src/middlewares/authDoc');




const app = express();

require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


if(process.env.NODE_ENV !== 'test'){
    const swaggerFile = require('./swagger/swagger_output.json');
    app.get('/', (req, res)=>{/* #swagger.ignore = true */ res.redirect('/doc')});
    app.use('/doc',  authDocProducao, swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));
}


routes(app)


module.exports = app;
