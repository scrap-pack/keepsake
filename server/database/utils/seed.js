const { name, internet, image } = require('faker');
const chalk = require('chalk');
const {
  db, User, Image, Tag,
} = require('../index');


const seed = async () => {
  // const Users = [];

  try {
    console.log(chalk.cyan('Syncing db...'));
    await db.sync({ force: true });
    await User.create({
      firstName: 'Admin',
      lastName: 'AlsoAdmin',
      email: 'keepsake@keepsake.com',
      password: 'keepsafe',
      userType: 'registered',
    });

    await Tag.create({ description: 'people' });
    await Tag.create({ description: 'animals' });
    await Tag.create({ description: 'transport' });
    await Tag.create({ description: 'food' });
    await Tag.create({ description: 'fashion' });
    await Tag.create({ description: 'nature' });
    await Tag.create({ description: 'nightlife' });

    for (let i = 0; i < 12; i++) {
      const userFaker = await {
        firstName: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
        password: 'keepsake',
      };
      const user = await User.create(userFaker);
      let imgs = [];
<<<<<<< HEAD
      for (let j = 0; j < 7; j++) {
        const imgType = ['people', 'animals', 'transport', 'food', 'fashion', 'nature', 'nightlife'];
=======
      for (let j = 0; j < 3; j++) {
        const imgType = ['people', 'animals', 'transport'];
>>>>>>> Successfully generate jsonwebtoken for user
        const img = await { imageUrl: image.imageUrl(400, 400, imgType[j]) };
        const imgRecord = await Image.create(img);
        const foundTag = await Tag.findOne({ where: { description: imgType[j] } });
        await imgRecord.addTag(foundTag);
        imgs.push(imgRecord.id);
      }
      await user.setImages(imgs);
      imgs = [];
    }

    console.log(
      chalk.hex('#ACE000')('Finished seeding data...db will now close...'),
    );
    await db.close();
  } catch (error) {
    console.error(chalk.bold.bgRed('Error seeding data...', error));
  }
};

seed();
