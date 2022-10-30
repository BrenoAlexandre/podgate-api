import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import tsoaSwagger from '../routes/swagger.json';

function swaggerDocs(app: Express, url: string, port: number) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(tsoaSwagger));

  // app.get('/docs.json', (req: Request, res: Response) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(tsoaSwagger);
  // });

  console.log(`Documentação disponível em http://${url}:${port}/docs`);
}

export default swaggerDocs;
