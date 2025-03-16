const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.38.0/swagger-ui.css',
    customJsUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.38.0/swagger-ui-bundle.js',
  };
  
const routes = require('./src/routes');
const authDocProducao = require('./src/middles/authDoc');


const app = express();

require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



if(process.env.NODE_ENV !== 'test'){
    const swaggerFile = require('./swagger/swagger_output.json');
    app.get('/', (req, res)=>{/* #swagger.ignore = true */ res.redirect('/doc')});
    app.use('/doc',  authDocProducao, swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));
}


routes(app)


if(process.env.NODE_ENV !== 'test'){
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, ()=> console.log("Servidor rodando na porta: " + PORT));
}
module.exports = app;
