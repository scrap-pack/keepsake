const db = require('../db.js');
const { STRING, TEXT } = require('sequelize');

const User = db.define('user', {
  first_name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  last_name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
