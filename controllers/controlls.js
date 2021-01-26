const shortid = require('shortid');
const db = require('../db/db');
const { validate } = require('jsonschema');

const getProfit = (req, res, next) => {
  const data = db.get('profit');
  res.json({ status: 'ok', data });
};

const getType = (req, res, next) => {
  const { type, id } = req.params;
  const typeElem = db.get(type);
  const data = typeElem.find((type) => String(type.id) === id);
  res.json({ status: 'ok', data });
};
const getCategory = (req, res, next) => {
  const { type, id } = req.params;
  const typeElem = db.get(type);
  const data = typeElem.find((type) => String(type.id) === id);
  res.json({ status: 'ok', data });
};

const createType = (req, res, next) => {
  const { body } = req;

  const typeSchema = {
    type: 'object',
    properties: {
      type: { type: 'string' },
      total: { type: 'number' },
      category: { type: 'string' },
      comment: { type: 'string' },
    },
    required: ['total'],
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
    db.get('profit').push(newElement).write();
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'ok', data: newElement });
};

const createCat = (req, res, next) => {
  const { body } = req;

  const typeSchema = {
    type: 'object',
    properties: {
      type: { type: 'string' },
      category: { type: 'string' },
    },
    required: ['type', 'category'],
    additionalProperties: false,
  };
  const validationResult = validate(body, typeSchema);

  if (body.type != 'category') return next(new Error('INVALID_TYPE'));
  if (!validationResult.valid)
    return next(new Error('INVALID_JSON_OR_API_FORMAT_CATEGORY'));

  const newCat = {
    id: shortid.generate(),
    type: body.type,
    category: body.category,
    combined: false,
  };

  try {
    db.get('profit').push(newCat).write();
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'ok', data: newCat });
};

const editTask = (req, res, next) => {
  const { id, type } = req.params;
  const editedTask = db.get(type).find({ id }).assign(req.body).value();
  db.write();

  res.json({ status: 'OK', data: editedTask });
};

const deleteType = (req, res, next) => {
  db.get('profit').remove({ id: req.params.id }).write();

  res.json({ status: 'OK' });
};
module.exports = {
  getProfit,
  getType,
  getCategory,
  deleteType,
  createType,
  editTask,
  createCat,
};
