const jwt = require('jsonwebtoken');
const { User } = require('../../database/index.js');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const user = await User.findOne({
      where: { id: decoded.id },
    }).then(user => {
      const foundToken = user.tokens.find(
        userToken => token === userToken.token
      );
      if (foundToken) return user;
    });
    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
