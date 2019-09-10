const chalk = require('chalk');
const router = require('express').Router();
const Album = require('../database/models/Album');
const User = require('../database/models/User');
const Image = require('../database/models/Image');
const UserAlbum = require('../database/models/UserAlbum');

// GET ALL ALBUMS FOR A GIVEN USER
router.get('/:participantId', async (req, res, next) => {
  try {
    const userAlbums = await UserAlbum.findAll({
      where: {
        participantId: req.params.participantId,
      },
    });

    const albums = [];
    for (let i = 0; i < userAlbums.length; i++) {
      const foundAlbum = await Album.findByPk(userAlbums[i].albumId, { include: [Image] });
      albums.push(foundAlbum);
    }
    console.log(chalk.green('Successfully got all albums'));
    return res.status(200).json(albums);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// GET A SINGLE ALBUM BY ID FOR A GIVEN USER
router.get('/:albumId', async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const { data } = Album.findByPk(albumId, { include: [Image] });
    console.log(chalk.green('Successfully got album'));
    return res.status(200).json(data);
  } catch (e) {
    console.error(chalk.red('ERROR IN GET SINGLE album', e));
    next(e);
  }
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

module.exports = router;
