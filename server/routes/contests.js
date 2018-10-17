
var express = require('express');
var router = express.Router();
var Contest = require("../models/contest");

// Add new contest

router.post('/contests', (req, res) => {

    var new_contest = new Contest({
      title: req.body.title,
      author: req.body.author,
      id: req.body.id,
      deadline: req.body.deadline, 
      category: req.body.category,
      permlink: req.body.permlink,
      body: req.body.body,
      hidden: false,
      addedDateTime: new Date().getTime(),
      winners: []
    })

    new_contest.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Success'
      })
    })
  })

// Get all contests

router.get('/contests', (req, res) => {
  Contest.find({}, ['title', 'author', 'id', 'deadline', 'permlink', 'category', 'json', 'tags'], function (error, contests) {
    if (error) { console.error(error); }
    res.send({
      contests: contests
    })
  }).sort({_id:-1})
})

// Get contests by category

router.get('/contests/category/:category', (req, res) => {

    let userCategory = req.params.category

    Contest.find({ category: userCategory }, ['title', 'author', 'id', 'deadline', 'permlink', 'category', 'image'], function (error, contests) {
      if (error) { console.error(error); }
      res.send({
        contests: contests
      })
    }).sort({_id:-1})
  })

  // Get single contest

  router.get('/contests/permlink/:permlink', (req, res) => {

    let permlink = req.params.permlink

    Contest.find({ permlink: permlink }, ['title', 'author', 'id', 'deadline', 'permlink', 'category', 'image', 'winners'], function (error, contests) {
      if (error) { console.error(error); }
      res.send({
        contests: contests
      })
    }).sort({_id:-1})
  })
  

  // Update winners

  router.put('/contests/winners/:id', (req, res) => {
    Contest.findById(req.params.id, '_id', function (error, contest) {
      if (error) { console.error(error); }

      contest.winners = req.body.winners;

      contest.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
  })

module.exports = router;