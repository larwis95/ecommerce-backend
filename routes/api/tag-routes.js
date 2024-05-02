const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json('Error getting tags.');
  }
  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) return res.status(404).json('No tag found with that id.');
    res.status(200).json(tagData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json('Error getting tag.');
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  }
  catch (err) {
    console.log(err);
    res.status(500).json('Error creating tag.');
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!tag[0]) return res.status(404).json('No tag found with that id.');
    res.status(200).json('Tag updated.');
  }
  catch (err) {
    console.log(err);
    res.status(500).json('Error updating tag.');
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!tag) return res.status(404).json('No tag found with that id.');
    res.status(200).json('Tag deleted.');
  }
  catch (err) {
    console.log(err);
    res.status(500).json('Error deleting tag.');
  }
});

module.exports = router;
