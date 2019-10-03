const db = require('../db.js');
const { STRING, DATE } = require('sequelize');

const Session = db.define('Session', {
  sid: {
    type: STRING,
    primaryKey: true,
  },
  expires: {
    type: DATE,
  },
  data: {
    type: STRING,
  },
});

module.exports = Session;
