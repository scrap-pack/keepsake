// Import and connect all routes to router here to export to ../server.js
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');
const tagRoutes = require('./tagRoutes');
const albumRoutes = require('./albumRoutes');

router.use('/users', userRoutes);

router.use('/images', imageRoutes);

router.use('/tags', tagRoutes);

router.use('/albums', albumRoutes);

module.exports = router;
