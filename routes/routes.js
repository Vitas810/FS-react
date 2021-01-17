const express = require('express');
const router = express.Router();
const typeControlls = require('../controllers/controlls');

router.post('/', typeControlls.createType);
router.get('/', typeControlls.getTypes);
router.get('/:type/:id', typeControlls.getType);
router.delete('/:type/:id', typeControlls.deleteType);

module.exports = router;
