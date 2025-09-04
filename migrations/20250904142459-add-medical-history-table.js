'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medical-history', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'patients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      allergic: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      chronicDiseases: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      takingMedication: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      skinDiseases: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('medical-history');
  },
};
