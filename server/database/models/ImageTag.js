const {
  UUID, UUIDV4,
} = require('sequelize');
const db = require('../db');

const ImageTag = db.define('imageTag', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = ImageTag;
