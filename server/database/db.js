const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/keepsake', {
  logging: false,
});

// On CLI, enter : createdb keepsake

module.exports = db;
