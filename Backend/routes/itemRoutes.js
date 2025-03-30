const express = require('express');
const router = express.Router();
const { getAllItems, createItem, getItem, updateItem, deleteItem } = require('../controllers/itemController');

router.get('/', getAllItems);
router.post('/', createItem);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
