const router = require('express').Router();
const { User } = require('../database/index.js');
const Album = require('../database/models/Album');
const auth = require('./utils/userAuth.js');
const chalk = require('chalk');

// Get my user info
router.get('/me', auth, (req, res, next) => {
  res.json(req.user.getPublicProfile());
  next();
});
// Get all users
router.get('/', (req, res, next) => {
  const { id } = req.params;
  return User.findByPk(id)
    .then(user => {
      console.log(chalk.green('Found user'));
      res.json(user);
    })
    .catch(error => {
      console.error(chalk.bgRed('Error finding user from db!', error));
      next(error);
    });
});

// Post/Create user
router.post('/', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const createUserObj = { firstName, lastName, email, password };

  return User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        res.json({ error: 'User already exists!' });
      } else if (password.length < 8 || password.length > 24) {
        res.json({
          error: 'Password must be between 8 to 24 characters long!',
        });
      } else {
        return User.create(createUserObj).then(async newUser => {
          if (Object.hasOwnProperty.call(req.body, 'albumId')) {
            const album = await Album.findByPk(req.body.albumId);
            console.log(album);
            await album.setUsers(newUser);
            res
              .status(201)
              .json(newUser)
              .redirect(`/albums/${album.id}`);
          }
          console.log(chalk.green('New user created: ', newUser));
          res.status(201).json(newUser);
        });
      }
    })
    .catch(error => {
      console.log(chalk.bgRed('Error creating new user', error));
      next(error);
    });
});

// Login route
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ error: 'Invalid login credentials!' });
  else {
    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      if (user && Object.hasOwnProperty.call(req.body, 'albumId')) {
        const album = await Album.findByPk(req.body.albumId);
        await album.setUsers(user);
        res
          .status(201)
          .json(user)
          .redirect(`/albums/${album.id}`);
      }
      if (user) res.send({ user: user.getPublicProfile(), token });
    } catch (e) {
      next(e);
    }
  }
});

// User logout single session route
router.post('/logout', auth, async (req, res, next) => {
  const { user } = req;
  try {
    user.tokens = user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await user.save();

    res.json({ authenticated: false });
  } catch (e) {
    res.status(500).json();
  }
});

// User logout all sessions
router.post('/logoutAll', auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ message: 'Logged out all sessions!' });
  } catch (e) {
    res.status(500).send('Error logging out all sessions!');
  }
});

// Put route for updating user by id
router.put('/me', auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) res.status(400).send({ error: 'Invalid update!' });

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send({ user: req.user, message: 'Successfully updated user!' });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete user by id
router.delete('/me', auth, (req, res, next) => {
  const { user } = req;
  return User.destroy({ where: { id: user.id } })
    .then(() => {
      console.log(chalk.green('Successfully deleted user!'));
      res.status(200).json({ message: 'User successfully deleted!' });
    })
    .catch(error => {
      console.error(chalk.bgRed('Error deleting user from db!'));
      next(error);
    });
});

module.exports = router;
