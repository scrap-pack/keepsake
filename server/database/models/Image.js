const { STRING, UUID, UUIDV4, DATE, DECIMAL, Op } = require('sequelize');
const db = require('../db');
const Tag = require('./Tag');

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
    },
  },
  dateTaken: {
    type: DATE,
  },
  fileName: {
    type: STRING,
  },
  latitude: {
    type: DECIMAL(10, 5),
    validate: { min: -90, max: 90 },
  },
  longitude: {
    type: DECIMAL(10, 5),
    validate: { min: -180, max: 180 },
  },
});

Image.searchByTag = async function searchByTag(searchTerm) {
  const tagResults = await Tag.findAll({
    where: {
      description: {
        [Op.iLike]: `%${searchTerm}`,
      },
    },
    attributes: ['id'],
  });

  const tagIds = tagResults.reduce((acc, element) => {
    acc.push(element.id);
    return acc;
  }, []);

  const imageResults = await Image.findAll({
    include: [
      {
        model: Tag,
        where: {
          id: {
            [Op.in]: tagIds,
          },
        },
      },
    ],
    order: ['createdAt'],
  });

  return imageResults;
};

module.exports = Image;
