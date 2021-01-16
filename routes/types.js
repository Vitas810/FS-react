const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { validate } = require('jsonschema');

// const types = [
//   { id: 1, title: 'Расходы', combined: true },
//   { id: 2, title: 'Доходы', combined: true },
// ];

router.get('/', (req, res, next) => {
  const profit = db.get('profit');
  const expense = db.get('expense');
  res.json({ status: 'ok', data: profit, data1: expense });
});

//types/:id
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const data = types.find((type) => String(type.id) === id);

  res.json({ status: 'ok', data });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  const typeSchema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
    required: ['title'],
    additionalProperties: false,
  };

  const validationResult = validate(body, typeSchema);
  if (!validationResult.valid) {
    return next(new Error('INVALID_JSON_OR_API_FORMAT'));
  }

  const newType = { id: 3, title: body.title, combined: false };
  try {
    db.get('expense').push(newType).write();
    db.get('profit').push(newType).write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({ status: 'ok', data: newType });
});

module.exports = router;
