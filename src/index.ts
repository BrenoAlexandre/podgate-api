import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { handleErrorMiddleware } from './middlewares/handleErrors';
import { RegisterRoutes } from './routes/routes';
import swaggerDocs from 'config/swagger';
import Logger from 'config/logger';
import 'config/mongo';

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.listen(process.env.PORT, () =>
  Logger.info('Server is running on port 3001!')
);

RegisterRoutes(app);

app.use(handleErrorMiddleware);

swaggerDocs(app, 'localhost', process.env.PORT || '3001');
