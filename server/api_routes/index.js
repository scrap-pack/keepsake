// Import and connect all routes to router here to export to ../server.js

const router = require('express').Router();

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;
