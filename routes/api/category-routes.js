const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [{ model: Product }],
    });
      
    res.status(200).json(data);
  } catch (err) {
    console.log (err)
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id,{
       include: Product
    });
    res.json(categoryData);
  } catch (err) {
    console.error(err)
    res.json(err);
        }
});

router.post('/', async(req, res) => {
  // create a new ca
  try {
    const categoryData = await Category.create({
     
      reader_id: req.body.reader_id,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {

    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
        individualHooks: true
      });
      if (!categoryData) {
        res.status(404).json({ message: 'No category founnd with this id' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({ where: { id: req.params.id }});
    res.json(categoryData);
  } catch (err) {
      console.error(err)
      res.json(err);
          }
});

module.exports = router;
