// Import and connect all routes to router here to export to ../server.js

const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);

const imageRoutes = require('./imageRouter');
router.use('/images', imageRoutes);

module.exports = router;
