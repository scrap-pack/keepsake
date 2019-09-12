const { name, internet, image } = require('faker');
const chalk = require('chalk');
const { db, User, Image, Tag, Album } = require('../index');

const seed = async () => {

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

    await Album.create({ name: 'Fun Party' });
    await Album.create({ name: 'Charity Gala 2019' });
    await Album.create({ name: 'Football Game' });
    await Album.create({ name: 'Concert' });
    await Album.create({ name: 'New Years 2018' });

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
      for (let j = 0; j < 7; j++) {
        const imgType = [
          'people',
          'animals',
          'transport',
          'food',
          'fashion',
          'nature',
          'nightlife',
        ];
        const img = await { imageUrl: image.imageUrl(400, 400, imgType[j]) };
        const imgRecord = await Image.create(img);
        const allAlbums = await Album.findAll();
        const randomAlbum = allAlbums[(Math.floor(Math.random() * 5))];
        await imgRecord.addAlbum(randomAlbum);
        const foundTag = await Tag.findOne({
          where: { description: imgType[j] },
        });
        await imgRecord.addTag(foundTag);
        imgs.push(imgRecord.id);
      }
      await user.setImages(imgs);
      imgs = [];
    }
    const allUsers = await User.findAll();
    const allAlbums = await Album.findAll();
    const albumUsersFunc = async () => {
      for (let i = 0; i < allAlbums.length; i++) {
        const updatedAlbum = await allAlbums[i].update({ ownerId: allUsers[(Math.floor(Math.random() * 12))].id });
        const foundUser = await User.findByPk(updatedAlbum.ownerId);
        await updatedAlbum.addUser(foundUser);
      }
    };
    await albumUsersFunc();

    console.log(
      chalk.hex('#ACE000')('Finished seeding data...db will now close...'),
    );

    await db.close();
  } catch (error) {
    console.error(chalk.bold.bgRed('Error seeding data...', error));
  }
};

seed();
