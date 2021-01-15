const express = require('express');
const router = express.Router();

const types = [
  { id: 1, title: 'Расходы', combined: true },
  { id: 2, title: 'Доходы', combined: true },
];

router.get('/', (req, res, next) => {
  res.json({ status: 'ok', data: types });
});

//types/:id
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const data = types.find((type) => String(type.id) === id);

  res.json({ status: 'ok', data });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  const newType = { id: 3, title: body.title, combined: false };
  //add to type

  res.json({ status: 'ok', data: newType });
});

module.exports = router;
