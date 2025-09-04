'use strict';

const { faker } = require('@faker-js/faker/locale/en');

module.exports = {
  async up(queryInterface) {
    const patients = Array.from({ length: 100 }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthday: faker.date.birthdate({ min: 1960, max: 2005, mode: 'year' }),
      phoneNumber: faker.phone.number({ style: 'international' }),
      email: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const created = await queryInterface.bulkInsert('patients', patients, { returning: true });

    const histories = created.map((patient, idx) => ({
      patientId: patients[idx].id ?? idx + 1, // Sequelize не завжди повертає id у bulkInsert
      allergic: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      chronicDiseases: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      takingMedication: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      skinDiseases: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('medical-history', histories);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('medical-history', null, {});
    await queryInterface.bulkDelete('patients', null, {});
  },
};
