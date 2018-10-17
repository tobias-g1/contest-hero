// Definitions

var express = require('express');
var router = express.Router();
const validate = require('express-validation');
const checkSteemConnect = require('../middleware/check-steemconnect');
const checkUser = require('../middleware/user-check.js');
const { create_entry } = require('../validation/entries.validation'); 

// Controller

const entry_controller = require('../controllers/entries.controller');

// Routes

router.post('/create_entry', validate(create_entry), checkSteemConnect, checkUser, entry_controller.create_entry);

// Export

module.exports = router;