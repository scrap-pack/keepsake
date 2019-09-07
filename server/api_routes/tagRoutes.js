const router = require('express').Router();
const chalk = require('chalk');
const { Op } = require('sequelize');
const { Tag, Image } = require('../database/index');

// Search Tags
router.get('/search', async (req, res) => {
  const queryString = req.query.q;
  try {
    if (queryString === '' || queryString === null) {
      res.json([]);
    } else {
      const results = await Tag.findAll({
        where: {
          [Op.or]: [
            {
              description: {
                [Op.startsWith]: queryString.toLowerCase(),
              },
            },
            {
              description: {
                [Op.startsWith]: queryString.toUpperCase(),
              },
            },
          ],
        },
        order: ['description'],
      });
      res.json(results);
    }
  } catch (e) {
    console.error(e);
  }
});

//Get all tags
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

//post new tag
router.post('/', async (req, res, next) => {
  try {
    const tags = await Promise.all(
      req.body.tags.map(tag =>
        Tag.findOrCreate({ where: { description: tag } })
      )
    );
    console.log(chalk.green(`Successfully posted new tags`));

    const images = await Promise.all(
      req.body.images.map(image => Image.findByPk(image.id))
    );

    console.log(chalk.green(`Successfully got selected images`));
    console.log('IMAGES', images, '\n\nTAGS', tags);

    await images.forEach(image => image.addTags(tags));

    return res.status(201).json(tags);
  } catch (e) {
    console.error(chalk.red(`Failed to post new tags`), e);
    return res.sendStatus(400);
  }

  //console.log('-------', req.body);
  // {images:[],
  // tags:[]}
  // Promise.all(
  //   req.body.tags.map(tag => {
  //     return Tag.findOrCreate({ where: { description: tag } });
  //   })
  // )
  //   .then(tags => {
  //     let images = Promise.all(
  //       req.body.images.map(image => Image.findByPk(image.id))
  //     );
  //     images = images.then(images => images);
  //     console.log('------', images);
  //     return { images, tags };
  //   })
  //   .then(imagesAndTags => {
  //     const { images, tags } = imagesAndTags;
  //     images.forEach(image => {
  //       tags.forEach(tag => {
  //         //console.log('IMAGE: ', image, '   TAG: ', tag);
  //         image.addTag(tag);
  //       });
  //     });
  //     return tags.map(tag => tag.description);
  //   })
  // .then(tags => {
  //   console.log(`Successfully posted new tags`);
  //   return res.status(201).json(tags);
  // })
  // .catch(e => {
  //   console.error(chalk.red(`Failed to post new tags`), e);
  //   next(e);
  // });
});

//put (update) tag by ID
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

//delete tag by ID
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
