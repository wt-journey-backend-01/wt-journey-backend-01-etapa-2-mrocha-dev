const express = require('express');
const app = express();

const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const errorHandler = require('./utils/errorHandler');


// Middleware de tratamento de erros (último)
app.use(errorHandler);

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rotas
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

// Documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz só pra confirmar que a API está rodando
app.get('/', (req, res) => {
  res.send('API DevPolicia está no ar!');
});

// Start do servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API DevPolicia rodando na porta ${PORT}`);
});
