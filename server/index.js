const chalk = require("chalk");
const { db } = require("./database/index.js");
const app = require("./server");

const PORT = 3000;

db.sync({ force: true })
  .then(() => {
    console.log(chalk.hex("#ACE000")("Database sync'd!"));
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        chalk.cyan(`
            Listening on PORT : ${PORT}

            http://localhost:${PORT}
        `)
      );
    });
  });
