const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Update a tag by id
router.put('/:id', async (req, res) => {
  // Add logic to update a tag by its id
});

// Delete a tag by id
router.delete('/:id', async (req, res) => {
  // Add logic to delete a tag by its id
});

module.exports = router;