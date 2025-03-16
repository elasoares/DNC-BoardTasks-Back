const mongooseToSwagger = require('mongoose-to-swagger');
const EsquemaUsuario = require('../src/models/usuario.js');
const EsquemaTarefa = require('../src/models/tarefas.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    language: 'pt-BR',
});

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['../index.js', '../src/routes.js'];

let doc = {
    info: {
        version: "1.0.0",
        title: "API do BoardTasks",
        description: "Documentação da API"
    },
    servers: [
        {
            url: "http://localhost:4000/",
            description: "Servidor localhost"
        },
        {
            url: "https://dnc-board-tasks-back-iota.vercel.app/",
            description: "Servidor de produção"
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    components:{
        schemas:{
            Usuario: mongooseToSwagger(EsquemaUsuario),
            Tarefa: mongooseToSwagger(EsquemaTarefa)
        }
    }
};

swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log("Documentação gerada com sucesso em:", outputFile);
        if (process.env.NODE_ENV !== 'production') {
            console.log("Iniciando o servidor...");
            require("../index.js");  // Certifique-se de que este caminho está correto
        }
    })
    .catch((error) => {
        console.error("Erro ao gerar a documentação Swagger:", error);
    });
