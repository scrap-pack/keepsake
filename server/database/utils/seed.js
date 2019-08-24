const { name, internet, image } = require("faker");
const { User, Image } = require("../index");

const seed = async () => {
  // const Users = [];
  for (let i = 0; i < 12; i++) {
    try {
      const userFaker = await {
        firstName: name.firstName(),
        lastName: name.lastName(),
        email: internet.email()
      };
      const user = await User.create(userFaker);
      let imgs = [];
      for (let j = 0; j < 3; j++) {
        const img = await { imageUrl: image.imageUrl() };
        const imgRecord = await Image.create(img);
        imgs.push(imgRecord.id);
      }
      await user.setImages(imgs);
      imgs = [];
    } catch (error) {
      console.log(error);
    }
  }
};

seed();
