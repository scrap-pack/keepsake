const { STRING, UUID, UUIDV4, ENUM, ARRAY, JSON } = require('sequelize');
const db = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// userType constants for when we have auth
const GUEST = 'guest';
const REGISTERED = 'registered';

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  userType: {
    type: ENUM([GUEST, REGISTERED]),
    defaultValue: GUEST,
  },
  email: {
    type: STRING,
    isUnique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    validate: {
      notEmpty: true,
      len: [8, 24],
    },
  },
  tokens: {
    type: ARRAY(JSON),
    defaultValue: [],
  },
});

const hashPassword = (password, saltRounds = 8) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const loginError = 'Unable to login!';

User.findByCredentials = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  try {
    if (!user) throw new Error(loginError);

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) throw new Error(loginError);

    return user;
  } catch (e) {
    throw new Error('Invalid login credentitals!');
  }
};

User.prototype.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { id: user.id },
    process.env.AUTH_SECRET || 'secretkey'
  );
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

User.beforeCreate(async function(user) {
  try {
    user.password = await hashPassword(user.password);
  } catch (e) {
    throw new Error('Error hashing password!');
  }
});

User.beforeUpdate(async function(user) {
  const incomingPassword = user.dataValues.password;
  const currentPassword = user._previousDataValues.password;
  try {
    const isMatch =
      (await comparePassword(incomingPassword, currentPassword)) ||
      incomingPassword === currentPassword;
    if (isMatch) user.password = currentPassword;
    else user.password = await hashPassword(incomingPassword);
  } catch (e) {
    throw new Error('Error updating password!');
  }
});

module.exports = User;
