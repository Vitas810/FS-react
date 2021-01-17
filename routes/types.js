const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { validate } = require('jsonschema');

router.get('/', (req, res, next) => {
  const profit = db.get('profit');
  const expense = db.get('expense');
  res.json({ status: 'ok', data: profit, data1: expense });
});

//types/:id
router.get('/:type/:id', (req, res, next) => {
  const { type, id } = req.params;

  switch (type) {
    case 'profit':
      const profit = db.get('profit');
      const dataProfit = profit.find((type) => String(type.id) === id);
      res.json({ status: 'ok', dataProfit });
      break;
    case 'expense':
      const expense = db.get('expense');
      const dataExpense = expense.find((type) => String(type.id) === id);
      res.json({ status: 'ok', dataExpense });
      break;
    default:
      res.json({ status: 'Error, undefined type' });
  }
});

router.post('/', (req, res, next) => {
  const { body } = req;
  console.log('body', body);
  const typeSchema = {
    type: 'object',
    properties: {
      type: { type: 'string' },
      total: { type: 'number' },
      category: { type: 'string' },
      comment: { type: 'string' },
    },
    required: ['type', 'total'],
    additionalProperties: false,
  };

  const validationResult = validate(body, typeSchema);
  if (!validationResult.valid) {
    return next(new Error('INVALID_JSON_OR_API_FORMAT'));
  }

  const newElement = {
    id: 2,
    type: body.type,
    total: 5000,
    category: body.category,
    comment: 'аванс',
    date: new Date().toLocaleDateString(),
    combined: false,
  };

  try {
    console.log('i am here');
    body.type === 'Доход'
      ? db.get('profit').push(newElement).write()
      : db.get('expense').push(newElement).write();
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'ok', data: newElement });
});

module.exports = router;
