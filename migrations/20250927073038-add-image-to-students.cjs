'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('students', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'address',
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('students', 'image');
  }
};
