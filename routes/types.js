const express = require('express');
const shortid = require('shortid');
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
  const typeElem = db.get(type);
  const data = typeElem.find((type) => String(type.id) === id);
  res.json({ status: 'ok', data });
});

//delete
router.delete('/:type/:id', (req, res, next) => {
  const { type, id } = req.params;

  db.get(type)
    .remove({ id: Number(id) })
    .write();

  res.json({ status: 'ok' });
});

router.post('/', (req, res, next) => {
  const { body } = req;

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
    id: shortid.generate(),
    type: body.type,
    total: body.total,
    category: body.category,
    comment: body.comment,
    date: new Date().toLocaleDateString(),
    combined: false,
  };

  try {
    db.get(body.type).push(newElement).write();
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'ok', data: newElement });
});

module.exports = router;
