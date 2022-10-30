import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerDocs from './config/swagger';

const app = express();

app.use(cors());
app.options('*', cors());

app.listen(3001, () => console.log('Server is running on port 3001!'));

swaggerDocs(app, 'localhost', 3001);
