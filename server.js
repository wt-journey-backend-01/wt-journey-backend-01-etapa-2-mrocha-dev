const express = require('express');
const app = express();
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

app.use(express.json());

app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('API DevPolicia rodando na porta 3000');
});