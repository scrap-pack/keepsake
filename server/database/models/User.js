const { STRING, UUID, UUIDV4, ENUM, ARRAY, JSON } = require('sequelize');
const db = require('../db.js');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/bcrypt');

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
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
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
    },
  },
  tokens: {
    type: ARRAY(JSON),
    defaultValue: [],
  },
});

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
  const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET);
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

User.prototype.getPublicProfile = function() {
  const { id, firstName, lastName, userType, email, token } = this;
  const userObject = { id, firstName, lastName, userType, email, token };
  return userObject;
};

module.exports = User;
