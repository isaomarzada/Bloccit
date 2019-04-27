'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("Advertisements", advertisements, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Advertisements", null, {});
  }
};
