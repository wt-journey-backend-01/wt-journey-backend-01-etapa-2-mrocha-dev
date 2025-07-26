const express = require('express');
const app = express();

// Importação das rotas
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

// Middleware para interpretar JSON
app.use(express.json());

// Rotas principais da API
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

// Documentação Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota para casos em que nenhuma rota foi encontrada
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API DevPolicia rodando na porta ${PORT}`);
});
