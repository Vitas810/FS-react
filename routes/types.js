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
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const data = types.find((type) => String(type.id) === id);

  res.json({ status: 'ok', data });
});
router.post('/', (req, res, next) => {
  const { body } = req;
  console.log('body', body);
  const typeSchema = {
    type: 'object',
    properties: {
      categoryExpense: { type: 'string' },
      commentExpense: { type: 'string' },
      categoryProfit: { type: 'string' },
      commentProfit: { type: 'string' },
    },
    required: ['categoryProfit'],
    additionalProperties: false,
  };

  const validationResult = validate(body, typeSchema);
  if (!validationResult.valid) {
    return next(new Error('INVALID_JSON_OR_API_FORMAT'));
  }

  // const newType = { id: 3, title: body.title, combined: false };
  const newExpense = {
    id: 2,
    totalExpense: 5000,
    categoryExpense: body.categoryExpense,
    commentExpense: 'аванс',
    dateExpense: new Date().toLocaleDateString(),
    combined: false,
  };
  const newProfit = {
    id: 3,
    totalProfit: 100,
    categoryProfit: body.categoryProfit,
    commentProfit: 'купил билеты',
    dateProfit: new Date().toLocaleDateString(),
    combined: false,
  };
  try {
    db.get('expense').push(newExpense).write();
    db.get('profit').push(newProfit).write();
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'ok', data: newProfit });
});

module.exports = router;
