require('dotenv').config();
const Twilio = require('twilio');
const chalk = require('chalk');
const router = require('express').Router();
const Album = require('../database/models/Album');
const User = require('../database/models/User');

const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// GET ALL ALBUMS FOR A GIVEN USER
router.get('/:participantId', (req, res, next) => {
  User.findAll({
    where: {
      id: req.params.participantId,
    },
    include: [{ model: Album, as: 'userAlbums' }],
  })
    .then(([user]) => {
      console.log(chalk.green('Successfully got all albums'));
      return res.status(200).json(user.userAlbums);
    })
    .catch((e) => {
      console.error(chalk.red('Failed to find any albums', e));
      next(e);
    });
});

// GET A SINGLE ALBUM BY ID FOR A GIVEN USER
router.get('/:userId/:albumId', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.userId,
    },
    include: [{
      model: Album,
      where: {
        id: req.params.albumId,
      },
    }],
  })
    .then(([user]) => {
      console.log(chalk.green('Successfully got album'));
      return res.status(200).json(user.userAlbums);
    })
    .catch((e) => {
      console.error(chalk.red('ERROR IN GET SINGLE album', e));
      next(e);
    });
});

// POST NEW ALBUM
router.post('/', async (req, res, next) => {
  const { album, owner } = req.body;
  try {
    const newAlbum = await Album.create({ name: album });
    // owner association
    newAlbum.setUser(owner);
    // participant association
    newAlbum.setUsers(owner);
    console.log(chalk.green('Successfully CREATED album'));
  } catch (e) {
    console.error(chalk.red('Failed to post new album', e));
    next(e);
  }
});

// PUT (UPDATE) ALBUM WITH IMAGES
router.put('/addImages/:albumId', async (req, res, next) => {
  const { images } = req.body;

  try {
    const retrievedAlbum = await Album.findByPk(req.params.albumId);
    // image to album association
    if (images.length > 0) {
      images.forEach(async (img) => {
        await retrievedAlbum.setImages(img);
      });
      console.log(chalk.green('Successfully added imgs to album'));
    } else {
      res.status(500).json('No images provided').end();
    }
  } catch (e) {
    console.error(chalk.red('ERROR ADDING IMGS TO ALBUM', e));
    next(e);
  }
});

// PUT (UPDATE) ALBUM WITH ADDITIONAL USERS
router.put('/addUsers/:albumId', async (req, res, next) => {
  const { users } = req.body;

  try {
    const retrievedAlbum = await Album.findByPk(req.params.albumId);
    // image to album association
    if (users.length > 0) {
      users.forEach(async (user) => {
        await retrievedAlbum.setUsers(user);
      });
      console.log(chalk.green('Successfully added users to album'));
    } else {
      res.status(500).json('No users provided').end();
    }
  } catch (e) {
    console.error(chalk.red('ERROR ADDING USERS TO ALBUM', e));
    next(e);
  }
});

// DELETE ALBUM
router.delete('/:albumId', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.albumId);
    const deleteResponse = await album.destroy();
    console.log(chalk.green('Successfully deleted album'));
    res.status(200).json(deleteResponse);
  } catch (e) {
    console.error(chalk.red('ERROR DELETING ALBUM', e));
    next(e);
  }
});

router.post('/invite', async (req, res, next) => {
  const { phoneNumber, album } = req.body;

  // link to be updated once we have deployed app URL
  const link = `http://localhost:3000/album?invite=${album.id}`;

  client.messages.create({
    body: `You were invited to a Scrap Book! Click the link below to begin sharing images with your homies!\n\n ${link}`,
    to: `${phoneNumber}`,
    from: process.env.PHONE_NUMBER,
  });
});

module.exports = router;
