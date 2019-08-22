const db = require('../db');
const { TEXT } = require('sequelize');

const Image = db.define('image', {
  image_url: {
    type: TEXT,
    defaultValue:
      'https://www.freepnglogos.com/uploads/instagram-round-logo-png-21.png',
  },
});

module.exports = Image;
