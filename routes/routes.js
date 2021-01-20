const express = require('express');
const router = express.Router();
const typeControlls = require('../controllers/controlls');

router.post('/', typeControlls.createType);
router.post('/category', typeControlls.createCat);
router.get('/', typeControlls.getTypes);
router.get('/:type/:id', typeControlls.getType);
router.get('/:type/:id', typeControlls.editTask);
router.get('/:type/:id', typeControlls.getCategory);
router.delete('/:type/:id', typeControlls.deleteType);

module.exports = router;
