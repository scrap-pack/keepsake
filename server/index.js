const { db } = require('./database/index.js');
const app = require('./server');
const chalk = require('chalk');

const PORT = 3000;

db.sync().then(() => {
  console.log(chalk.hex('#ACE000')("Database sync'd!"));
  app.listen(PORT, () => {
    console.log(
      chalk.cyan(`
            Listening on PORT : ${PORT}

            http://localhost:${PORT}
        `)
    );
  });
});
