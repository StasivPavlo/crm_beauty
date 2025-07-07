import { Sequelize } from 'sequelize-typescript';
import { Patient } from '../patients/patients.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.POSTGRES_HOST || '', {
        dialect: 'postgres',
      });
      sequelize.addModels([Patient]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
