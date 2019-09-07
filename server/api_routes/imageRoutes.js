const chalk = require('chalk');
const router = require('express').Router();
const multer = require('multer');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const canvas = require('canvas');
const { Image, Tag } = require('../database/index');
const s3 = require('../aws3Config');
require('dotenv').config();
require('@tensorflow/tfjs-node');

const upload = multer();

// Get all images
router.get('/', (req, res, next) =>
  Image.findAll()
    .then(images => {
      console.log(chalk.green('Successfully got all images'));
      return res.status(200).json(images);
    })
    .catch(e => {
      console.error(chalk.red('Failed to find any images', e));
      next(e);
    })
);

// search images
router.get('/search', async (req, res) => {
  const { tag } = req.query;
  try {
    const results = await Image.searchByTag(tag);
    res.json(results);
  } catch (e) {
    console.error(e);
  }
});

// Get image by ID
router.get('/:id', (req, res, next) =>
  Image.findByPk(req.params.id)
    .then(image => {
      console.log(chalk.green(`Successfully got image ${req.params.id}`));
      return res.status(200).json(image);
    })
    .catch(e => {
      console.error(chalk.red(`Failed to get image ${req.params.id}`), e);
      next(e);
    })
);

// post new image
router.post('/', upload.single('imageUpload'), async (req, res, next) => {
  const { file } = req;
  const fileName = file.originalname.split('.')[0];
  let newImage;

  const s3payload = {
    Bucket: process.env.BUCKET,
    Key: fileName,
    ContentType: file.mimetype,
    Body: file.buffer,
    ACL: 'public-read',
  };

  // try catch block for AWS s3 upload + create new image record with s3 URL
  try {
    s3.upload(s3payload, async (err, data) => {
      if (err) {
        console.log(chalk.red('### ERROR IN S3 UPLOAD'), err);
      }
      if (data) {
        newImage = await Image.create({ imageUrl: data.Location, fileName });
      }
    });
  } catch (error) {
    console.error(chalk.red('Failed to post new image'), error);
  }

  // try catch block for tensorflow ML tag detection + create new tag + associate tag(s) with newImage created above
  try {
    // canvas or HTMLcanvasElement required for tensorflow in node; below is required config/conversion.
    const cnvs = canvas.createCanvas(300, 300);
    const ctx = cnvs.getContext('2d');
    const img = new canvas.Image();
    img.src = req.body.imageSrc;
    ctx.drawImage(img, 0, 0, 300, 300);

    // ML model load and object detection
    const objectDetector = await cocoSsd.load();
    const predictedTags = await objectDetector.detect(cnvs);

    // get tags from prediction
    const mlTags = predictedTags.reduce((accum, elem) => !accum.includes(elem.class) ? [...accum, elem.class] : [...accum], []);

    mlTags.forEach(async (elem) => {
      const newTag = await Tag.findOrCreate({ description: elem });
      await newImage.setTags(newTag);
    });
  } catch (error) {
    console.error(chalk.red('Failed to create ML tag'), error);
  }
});

// put (update) image by ID
router.put('/:id', (req, res, next) =>
  Image.findByPk(req.params.id)
    .then(image => image.update(req.body))
    .then(image =>
      res.status(200).json({
        messgae: `Successfully updated image ${req.params.id}`,
        image,
      })
    )
    .catch(e => {
      console.error(chalk.red(`Failed to update image ${req.params.id}`), e);
      next(e);
    })
);

// delete image by ID
router.delete('/:id', (req, res, next) =>
  Image.findByPk(req.params.id)
    .then(image => image.destroy({ where: req.params.id }))
    .then(image =>
      res.status(200).json({ messgae: 'Image successfully deleted', image })
    )
    .catch(e => {
      console.error(chalk.red(`Failed to delete image ${req.params.id}`), e);
      next(e);
    })
);

module.exports = router;
