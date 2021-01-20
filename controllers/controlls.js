const shortid = require('shortid');
const db = require('../db/db');
const { validate } = require('jsonschema');
const category = require('../db/category.json');

const getTypes = (req, res, next) => {
  const profit = db.get('profit');
  const expense = db.get('expense');

  res.json({ status: 'ok', profit, expense });
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

const createType = (req, res, next) => {
  const { body } = req;
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
};

const editTask = (req, res, next) => {
  const { id, type } = req.params;
  const editedTask = db.get(type).find({ id }).assign(req.body).value();
  db.write();

  res.json({ status: 'OK', data: editedTask });
};

const deleteType = (req, res, next) => {
  const { type, id } = req.params;
  db.get(type).remove({ id }).write();

  res.json({ status: 'ok' });
};

module.exports = {
  getTypes,
  getType,
  getCategory,
  deleteType,
  createType,
  editTask,
};
