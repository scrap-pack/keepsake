const path = require('path');
const express = require('express');
const chalk = require('chalk');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

const apiRoutes = require('./api_routes');

// Add cookies and sessions

app.use('/api', apiRoutes);

// Serve index.html for all paths
app.use('/*', (req, res, next) => {
  const publicHtml = path.join(publicPath, 'index.html');
  res.sendFile(publicHtml);
});

// Error-handling middleware
app.use((error, req, res, next) => {
  console.log(chalk.bold.red('Error: ', error.stack));
  res
    .status(error.status || 500)
    .send(error.message || 'Internal Server Error');
});

module.exports = app;
