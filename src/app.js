const express = require('express');
const eventsRouter = require('./routes/events');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

const app = express();
app.use(express.json());

app.use('/events', eventsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});
