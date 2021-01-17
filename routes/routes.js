const express = require('express');
const router = express.Router();
const typeControlls = require('../controllers/controlls');
const test = require('../db/category');

router.post('/', typeControlls.createType);
router.get('/', typeControlls.getTypes);
router.get('/:type/:id', typeControlls.getType);
router.get('/:type/:id', typeControlls.editTask);
router.delete('/:type/:id', typeControlls.deleteType);

router.get('/:cat', test.requestHandler);
module.exports = router;
