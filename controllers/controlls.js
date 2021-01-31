const shortid = require('shortid');
const db = require('../db/db');
const { validate } = require('jsonschema');

const getProfit = (req, res, next) => {
  const data = db.get('profit');
  res.json({ status: 'ok', data });
};
const getExpenses = (req, res, next) => {
  const data = db.get('expense');
  res.json({ status: 'ok', data });
};

const getCategory = (req, res, next) => {
  const data = db.get('category');
  res.json({ status: 'ok', data });
};

const createType = (req, res, next) => {
  const { body } = req;
  const types = body.inputHeaderValue;

  const typeSchema = {
    type: 'object',
    properties: {
      type: { type: 'string' },
      total: { type: 'number' },
      categoryValue: { type: 'string' },
      inputHeaderValue: { type: 'string' },
      srcImgCat: { type: 'string' },
      colorCategor: { type: 'string' },
    },
    required: ['total', 'categoryValue'],
    additionalProperties: false,
  };

  const validationResult = validate(body, typeSchema);

  if (!validationResult.valid) {
    return next(new Error('INVALID_JSON_OR_API_FORMAT'));
  }

  const newElement = {
    id: shortid.generate(),
    type: body.inputHeaderValue,
    total: body.total,
    categoryValue: body.categoryValue,
    srcImgCat: body.srcImgCat,
    colorCategor: body.colorCategor,
    date: new Date().toLocaleDateString(),
    combined: false,
  };

  try {
    db.get(types).push(newElement).write();
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'ok', data: newElement });
};

const deleteType = (req, res, next) => {
  const { profit } = req.params;
  db.get(profit).remove({ id: req.params.id }).write();
  res.json({ status: 'OK' });
};

module.exports = {
  getProfit,
  getCategory,
  deleteType,
  createType,
  getExpenses,
};
