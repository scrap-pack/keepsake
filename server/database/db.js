const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/keepsake',
  {
    logging: false,
  });

// On CLI, enter : createdb keepsake

module.exports = db;
