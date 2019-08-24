const router = require('express').Router();
const { Image } = require('../database/index');
const chalk = require('chalk');

//Get all iamges
router.get('/', (req, res, next) => {
  return Image.findAll()
    .then(users => {
      console.log(chalk.green('Successfully got all images'));
      return res.status(200).json(users);
    })
    .catch(e => {
      console.error(chalk.red('Failed to find any images', e));
      next(e);
    });
});

//Get image by ID
router.get('/:id', (req, res, next) => {
  return Image.findByPk(req.params.id)
    .then(image => {
      console.log(chalk.green(`Successfully got image ${req.params.id}`));
      return res.status(200).json(image);
    })
    .catch(e => {
      console.error(chalk.red(`Failed to get image ${req.params.id}`), e);
      next(e);
    });
});

//post new image
router.post('/', (req, res, next) => {
  return Image.create(req.body)
    .then(image => {
      console.log(`Successfully posted new image`);
      return res.status(201).json(image);
    })
    .catch(e => {
      console.error(chalk.red(`Failed to post new image`), e);
      next(e);
    });
});

//put (update) image by ID
router.put('/:id', (req, res, next) => {
  return Image.findByPk(req.params.id)
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
    });
});

//delete image by ID
router.delete(':/id', (req, res, next) => {
  return Image.findByPk(req.params.id)
    .then(image => image.destroy({ where: req.params.id }))
    .then(image =>
      res.status(200).json({ messgae: 'Image successfully deleted', image })
    )
    .catch(e => {
      console.error(chalk.red(`Failed to delete image ${req.params.id}`), e);
      next(e);
    });
});

module.exports = router;
