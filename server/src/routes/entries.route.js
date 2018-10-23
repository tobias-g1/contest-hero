// Definitions

var express = require('express');
var router = express.Router();
const validate = require('express-validation');
const checkSteemConnect = require('../middleware/check-steemconnect');
const checkUser = require('../middleware/user-check.js');
const { create_entry } = require('../validation/entries.validation'); 
const validatePermissions = require('../middleware/check-permissions.js');

// Controller

const entry_controller = require('../controllers/entries.controller');

// Routes

router.post('/create_entry', validate(create_entry), checkSteemConnect, validatePermissions, checkUser, entry_controller.create_entry);
router.get('/get_entries/:id', entry_controller.get_entries_by_id);
router.get('/get_entries/permlink/:permlink', entry_controller.get_entries_by_permlink);

// Export

module.exports = router;