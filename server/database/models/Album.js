const {
  STRING, UUID, UUIDV4,
} = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  // ownerId: {
  //   type: UUID,
  //   allowNull: false,
  //   validate: {
  //     isUUID: 4,
  //   },
  // },
});

module.exports = Album;
