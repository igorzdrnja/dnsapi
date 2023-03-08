import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import { register } from 'prom-client'
import express from 'express'
const router = express.Router()

// Root endpoint
router.get('/', (req, res) => {
  const now = Math.floor(Date.now() / 1000);
  res.json({
    version: process.env.npm_package_version,
    date: now,
    kubernetes: process.env.KUBERNETES === 'true',
  });
});

// OpenAPI/Swagger
const swaggerDocument = YAML.load('./swagger.yaml');
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Prometheus metrics
router.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  const data = await register.metrics();
  res.send(data);
});

// Health endpoint
router.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export { router }

