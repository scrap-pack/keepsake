const router = require('express').Router();
const { Tag } = require('../database/index');
const chalk = require('chalk');

//Get all iamges
router.get('/', (req, res, next) => {
  return Tag.findAll()
    .then(tags => {
      console.log(chalk.green('Successfully got all tags'));
      return res.status(200).json(tags);
    })
    .catch(e => {
      console.error(chalk.red('Failed to find any tags', e));
      next(e);
    });
});

//Get image by ID
router.get('/:id', (req, res, next) => {
  return Tag.findByPk(req.params.id)
    .then(tag => {
      console.log(chalk.green(`Successfully got tag ${req.params.id}`));
      return res.status(200).json(tag);
    })
    .catch(e => {
      console.error(chalk.red(`Failed to get tag ${req.params.id}`), e);
      next(e);
    });
});

//post new image
router.post('/', (req, res, next) => {
  return Tag.create(req.body)
    .then(tag => {
      console.log(`Successfully posted new tag`);
      return res.status(201).json(tag);
    })
    .catch(e => {
      console.error(chalk.red(`Failed to post new tag`), e);
      next(e);
    });
});

//put (update) image by ID
router.put('/:id', (req, res, next) => {
  return Tag.findByPk(req.params.id)
    .then(tag => tag.update(req.body))
    .then(tag =>
      res.status(200).json({
        messgae: `Successfully updated tag ${req.params.id}`,
        tag,
      })
    )
    .catch(e => {
      console.error(chalk.red(`Failed to update tag ${req.params.id}`), e);
      next(e);
    });
});

//delete image by ID
router.delete(':/id', (req, res, next) => {
  return Tag.findByPk(req.params.id)
    .then(tag => tag.destroy({ where: req.params.id }))
    .then(tag =>
      res.status(200).json({ messgae: 'Tag successfully deleted', tag })
    )
    .catch(e => {
      console.error(chalk.red(`Failed to delete tag ${req.params.id}`), e);
      next(e);
    });
});

module.exports = router;
