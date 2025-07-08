import { Sequelize } from 'sequelize-typescript';
import { Patient } from '../patients/patients.model';
import * as process from 'node:process';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,

        dialect: 'postgres',
        dialectOptions:
          process.env.DB_SSL_ENABLE === 'true'
            ? {
                ssl: {
                  require: false,
                  rejectUnauthorized: false,
                },
              }
            : {},
      });
      sequelize.addModels([Patient]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
