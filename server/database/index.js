// Import db and all models here to create associations

const db = require('./db');
const Image = require('./models/Image');
const User = require('./models/User');
const Tag = require('./models/Tag');
const Session = require('./models/Session');
const ImageTag = require('./models/ImageTag');

// Associations Here
User.hasMany(Session);
Session.belongsTo(User);
User.hasMany(Image);
Image.belongsTo(User);
Image.belongsToMany(Tag, { through: ImageTag });
Tag.belongsToMany(Image, { through: ImageTag });

module.exports = {
  db,
  Image,
  User,
  Tag,
  Session,
  ImageTag,
};
