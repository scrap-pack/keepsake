const { STRING, UUID, UUIDV4 } = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  description: {
    type: STRING,
    allowNull: false
  }
});

module.exports = Tag;
