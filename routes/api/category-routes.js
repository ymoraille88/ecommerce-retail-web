const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const Data = await Driver.findAll({
      include: [{ model: License }, { model: Car }],
      attributes: {
        include: [
          [
            // Use plain SQL to add up the total mileage
            sequelize.literal(
              '(SELECT SUM(mileage) FROM car WHERE car.driver_id = driver.id)'
            ),
            'totalMileage',
          ],
        ],
      },
    });
    res.status(200).json(driverData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async(req, res) => {
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
