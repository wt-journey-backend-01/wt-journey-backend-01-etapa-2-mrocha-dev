const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para JSON
app.use(express.json());

// Configurações do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API DevPolicia',
      version: '1.0.0',
      description: 'Documentação da API para gerenciamento de casos policiais',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// Rota raiz para evitar "Cannot GET /"
app.get('/', (req, res) => {
  res.send('API DevPolicia rodando com sucesso!');
});

// Rotas da aplicação
app.use('/casos', casosRoutes);
app.use('/agentes', agentesRoutes);

module.exports = app;
