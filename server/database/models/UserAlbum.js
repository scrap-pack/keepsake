const {
  UUID, UUIDV4,
} = require('sequelize');
const db = require('../db');

const UserAlbum = db.define('userAlbum', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = UserAlbum;
