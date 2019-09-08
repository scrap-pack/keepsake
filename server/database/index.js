// Import db and all models here to create associations

const db = require('./db');
const Image = require('./models/Image');
const User = require('./models/User');
const Tag = require('./models/Tag');
const Session = require('./models/Session');
const ImageTag = require('./models/ImageTag');
const Album = require('./models/Album');
const UserAlbum = require('./models/UserAlbum');
const ImageAlbum = require('./models/ImageAlbum');

// Associations Here
User.hasMany(Session);
Session.belongsTo(User);
User.hasMany(Image);
Image.belongsTo(User);
Image.belongsToMany(Tag, { through: ImageTag });
Tag.belongsToMany(Image, { through: ImageTag });
Album.belongsTo(User, { as: 'owner' });
Album.belongsToMany(User, { through: UserAlbum });
User.belongsToMany(Album, { as: 'userAlbums', through: UserAlbum, foreignKey: 'participantId' });
Album.belongsToMany(Image, { through: ImageAlbum });
Image.belongsToMany(Album, { through: ImageAlbum });

module.exports = {
  db,
  Image,
  User,
  Tag,
  Session,
  ImageTag,
};
