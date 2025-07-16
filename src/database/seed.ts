import { Sequelize } from 'sequelize-typescript';
import { Patient } from '../patients/patients.model';
import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker/locale/en';
import { MedicallyHistory } from '../medical-history/medical-history.model';

dotenv.config();

async function seed() {
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

  sequelize.addModels([Patient, MedicallyHistory]);
  await sequelize.sync({ force: true });

  const fakePatients = Array.from({ length: 100 }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthday: faker.date.birthdate({ min: 1960, max: 2005, mode: 'year' }),
    phoneNumber: faker.phone.number({ style: 'international' }),
    email: faker.internet.email(),
  }));

  await Patient.bulkCreate(fakePatients);

  console.log('✅ Seeded successfully!');
  await sequelize.close();
}

seed().catch((err) => {
  console.error('❌ error when seeding:', err);
});
