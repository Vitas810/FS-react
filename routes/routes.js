const express = require('express');
const router = express.Router();
const typeControlls = require('../controllers/controlls');

router.post('/profit', typeControlls.createType);
router.post('/expense', typeControlls.createType);
router.get('/profit', typeControlls.getProfit);
router.get('/expense', typeControlls.getExpenses);
router.get('/category', typeControlls.getCategory);
router.delete('/:profit/:id', typeControlls.deleteType);

module.exports = router;
