// Definitions

var express = require('express');
var router = express.Router();
const validate = require('express-validation');
const { create_entry } = require('../validation/entries.validation'); 

// Controller

const entry_controller = require('../controllers/entries.controller');

// Routes

router.post('/create_entry', validate(create_entry), entry_controller.create_entry);

// Export

module.exports = router;