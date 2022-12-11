import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import logger from './logger';
import tsoaSwagger from '../routes/swagger.json';

function swaggerDocs(app: Express, url: string, port: string) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(tsoaSwagger));

  logger.info(`Documentação disponível em http://${url}:${port}/docs`);
}

export default swaggerDocs;
