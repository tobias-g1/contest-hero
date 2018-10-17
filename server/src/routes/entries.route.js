// Definitions

var express = require('express');
var router = express.Router();

// Controller

const entry_controller = require('../controllers/entries.controller');

// Routes

router.post('/create_entry', entry_controller.create_entry);
router.get('/:id', entry_controller.get_entries_by_id);

// Export

module.exports = router;