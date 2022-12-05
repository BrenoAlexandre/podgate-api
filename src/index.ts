import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerDocs from './config/swagger';
import { handleErrorMiddleware } from './middleware/handleErrors';
import { RegisterRoutes } from './routes/routes';

import './config/mongo';

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.listen(3001, () => console.log('Server is running on port 3001!'));
RegisterRoutes(app);

app.use(handleErrorMiddleware);

swaggerDocs(app, 'localhost', 3001);
