// Import and connect all routes to router here to export to ../server.js
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');
const tagRoutes = require('./tagRoutes');

router.use('/users', userRoutes);

router.use('/images', imageRoutes);

router.use('/tags', tagRoutes);

module.exports = router;
