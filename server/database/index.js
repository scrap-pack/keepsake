// Import db and all models here to create associations

const db = require('./db');
const Image = require('./models/Images.js');
const User = require('./models/Users');

module.exports = {
  db,
  Image,
  User,
};
