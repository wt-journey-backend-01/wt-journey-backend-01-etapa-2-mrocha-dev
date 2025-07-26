const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevPolicia API',
      version: '1.0.0',
      description: 'API para gerenciamento de agentes e casos policiais',
    },
  },
  apis: ['./routes/*.js'], // Local onde estão suas rotas com os comentários Swagger
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
