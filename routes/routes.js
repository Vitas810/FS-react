const express = require('express');
const router = express.Router();
const typeControlls = require('../controllers/controlls');

router.post('/profit', typeControlls.createType);
router.post('/category', typeControlls.createCat);
router.get('/profit', typeControlls.getProfit);
router.get('/:type/:id', typeControlls.getType);
router.get('/:type/:id', typeControlls.editTask);
router.get('/:type/:id', typeControlls.getCategory);
router.delete('/:profit/:id', typeControlls.deleteType);

module.exports = router;
