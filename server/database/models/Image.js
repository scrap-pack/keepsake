const db = require('../db');
const { STRING, UUID, UUIDV4, DATE, DECIMAL } = require('sequelize');

const Image = db.define('image', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    }
  },
  dateTaken: {
    type: DATE,
  },
  fileName: {
    type: STRING,
  },
  latitude: {
    type: DECIMAL(10, 5),
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: DECIMAL(10, 5),
    validate: { min: -180, max: 180 }
  },
});

module.exports = Image;
