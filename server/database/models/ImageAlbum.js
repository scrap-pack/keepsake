const {
  UUID, UUIDV4,
} = require('sequelize');
const db = require('../db');

const ImageAlbum = db.define('imageAlbum', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = ImageAlbum;
