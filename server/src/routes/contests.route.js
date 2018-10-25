// Definitions

var express = require('express');
var router = express.Router();
const validate = require('express-validation');
const checkSteemConnect = require('../middleware/check-steemconnect');
const checkUser = require('../middleware/user-check.js');
const { create_contest, set_winners, edit_contest } = require('../validation/contests.validation'); 
const validatePermissions = require('../middleware/check-permissions.js');

// Controller

const contest_controller = require('../controllers/contests.controller');

// Routes

router.post('/create_contest', validate(create_contest), checkSteemConnect, validatePermissions, checkUser, contest_controller.create_contest);
router.put('/set_winners/', validate(set_winners), checkSteemConnect, validatePermissions, checkUser, contest_controller.set_winners);
router.put('/edit_contest/', validate(edit_contest), checkSteemConnect, validatePermissions, checkUser, contest_controller.edit_contest);

router.get('/all/:sortby', contest_controller.get_contests);
router.get('/:category/:sortby', contest_controller.get_contests_by_category);
router.get('/permlink/:permlink', contest_controller.get_contest_by_permlink);

// Export

module.exports = router;