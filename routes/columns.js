const express = require('express');
const router = express.Router();

const columnsController = require('../controllers/columns');

// Get all the columns
router.get('/all', columnsController.getAll);

// Get all columns by board
router.get('/board/:board_id', columnsController.getAllByBoardID);

// Create a new column for a given board ID
router.post('/board/:board_id', columnsController.createOneByBoardID);

// Delete a column by id
router.delete('/:column_id', columnsController.deleteOneByID);

// Change a column name and/or order by id (name/order passed in req.body)
router.patch('/:column_id', columnsController.changeNameByID);

module.exports = router;
