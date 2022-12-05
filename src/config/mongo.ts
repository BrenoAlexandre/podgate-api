import mongoose, { Connection } from 'mongoose';
import logger from './logger';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, DATABASE_NAME } = process.env;

class DatabaseConnection {
  public dbUrl: string;

  public dbOptions: { user: string; pass: string; dbName: string };

  public constructor() {
    this.dbUrl = this.getDbUrl();
    this.dbOptions = this.getDbOptions();

    this.initDb(this.dbUrl, this.dbOptions);
  }

  private getDbUrl() {
    const MONGO_DB_URL =
      MONGO_USER && MONGO_PASSWORD
        ? `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`
        : `mongodb://${MONGO_HOST}`;

    return MONGO_DB_URL;
  }

  private getDbOptions() {
    const MONGO_OPTIONS = {
      user: MONGO_USER || 'user',
      pass: MONGO_PASSWORD || 'userPassword',
      dbName: DATABASE_NAME || 'podgate-db',
    };

    return MONGO_OPTIONS;
  }

  private configureConnectionCallbacks(connection: Connection) {
    connection.on('connected', () => {
      logger.info('Mongoose conectado.');
    });

    connection.on('error', (err: any) => {
      logger.error(`Mongoose com error ${err}`);
      throw new Error(err);
    });

    connection.on('disconnected', () => {
      logger.info('Mongoose desconectado');
    });
  }

  private async initDb(
    url: string,
    options: { user: string; pass: string; dbName: string }
  ) {
    mongoose.connect(url, options);

    const { connection } = mongoose;

    this.configureConnectionCallbacks(connection);
  }
}

export default new DatabaseConnection();
