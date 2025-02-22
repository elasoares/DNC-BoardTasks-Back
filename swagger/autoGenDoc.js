
const mongooseToSwagger = require('mongoose-to-swagger');
const userSchema = require('../src/models/usuario.js');
const schemaTasks = require('../src/models/tarefa.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    language: 'pt-BR',
});

const outputFile = './swagger_output.json';
const endpointsFiles = ['../index.js', '../src/routes.js'];


let doc = {
    info: {
        version: "1.0.0",
        title: "API dp BoardTasks",
        description: "Documentação da API do BoardTasks."
    },
    servers: [
        {

            url: "http://localhost:4000",
            description: "Servidor localhost"
        },
        {
            url: "https://b-board-task.vercel.app/",
            description: "Servidor de produção."
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    components:{
        schemas:{
            Usuario: mongooseToSwagger(userSchema),
            Tarefa: mongooseToSwagger(schemaTasks)
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(()=>{
    console.log("Documentação do swagger gerada encontra-se no arquivo em: " + outputFile);
    if(process.env.NODE_ENV !== 'production'){
        require("../index.js");
    }
})