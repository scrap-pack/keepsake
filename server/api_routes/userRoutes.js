const router = require('express').Router();
const { db, User } = require('../database/index.js');
const chalk = require('chalk');

// Get all users
router.get('/', (req, res, next) => {
  return User.findAll()
    .then(users => {
      console.log(chalk.green('Found all users'));
      res.json(users);
    })
    .catch(error => {
      console.error(chalk.bgRed('Error finding users from db!', error));
      next(error);
    });
});

// Get users by id
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  return User.findByPk(id)
    .then(user => {
      console.log(chalk.green('Found user'));
      res.json(user);
    })
    .catch(error => {
      console.error(chalk.bgRed('Error find user: ', user));
      next(error);
    });
});

// Post/Create user (Dummy post route, will need to be modified later)
router.post('/', (req, res, next) => {
  console.log(req.body);
  return User.create(req.body)
    .then(newUser => {
      console.log(chalk.green('New user created: ', newUser));
      res.status(201).json(req.body);
    })
    .catch(error => {
      console.log(chalk.bgRed('Error creating new user', error));
      next(error);
    });
});

// Put route for updating user by id
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  return User.findByPk(id)
    .then(user => {
      return user.update(req.body);
    })
    .then(() => {
      res.status(200).json({ message: 'User info updated successfully!' });
    })
    .catch(error => {
      console.error(chalk.bgRed('Error updating user info!'));
      next(error);
    });
});

// Delete user by id
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  return User.destroy({ where: { id } })
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
