const { name, internet, image } = require('faker');
const { db, User, Image } = require('../index');
const chalk = require('chalk');

const seed = async () => {
  // const Users = [];

  try {
    console.log(chalk.cyan('Syncing db...'));
    await db.sync({ force: true });

    for (let i = 0; i < 12; i++) {
      const userFaker = await {
        firstName: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
      };
      const user = await User.create(userFaker);
      let imgs = [];
      for (let j = 0; j < 3; j++) {
        const imgType = ["people", "animals", "transport"]
        const img = await { imageUrl: image.imageUrl(400, 400, imgType[j]) };
        const imgRecord = await Image.create(img);
        imgs.push(imgRecord.id);
      }
      await user.setImages(imgs);
      imgs = [];
    }

    console.log(
      chalk.hex('#ACE000')('Finished seeding data...db will now close...')
    );
    await db.close();
  } catch (error) {
    console.error(chalk.bold.bgRed('Error seeding data...', error));
  }
};

seed();
