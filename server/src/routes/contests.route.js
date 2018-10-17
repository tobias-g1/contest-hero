// Definitions

var express = require('express');
var router = express.Router();
const validate = require('express-validation');
const checkSteemConnect = require('../middleware/check-steemconnect');
const { create_contest, set_winners } = require('../validation/contests.validation'); 

// Controller

const contest_controller = require('../controllers/contests.controller');

// Routes

router.post('/create_contest', validate(create_contest), checkSteemConnect, contest_controller.create_contest);
router.get('/all', contest_controller.get_contests);
router.get('/:category', contest_controller.get_contests_by_category);
router.get('/permlink/:permlink', contest_controller.get_contest_by_permlink);
router.put('/set_winners', validate(set_winners), checkSteemConnect, contest_controller.set_winners);

// Export

module.exports = router;