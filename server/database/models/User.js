const db = require('../db.js');
const { STRING, UUID, UUIDV4, ENUM } = require('sequelize');

// userType constants for when we have auth
const GUEST = 'guest';
const REGISTERED = 'registered';

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  userType: {
    type: ENUM([GUEST, REGISTERED]),
    defaultValue: GUEST,
    allowNull: false,
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    validate: {
      notEmpty: true,
      len: [8, 24],
    },
  },
});

module.exports = User;
