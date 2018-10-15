
var express = require('express');
var router = express.Router();
var Contest = require("../models/contest");

// Add new contest

router.post('/contests', (req, res) => {

    var db = req.db;

    let title = req.body.title;
    let author = req.body.author;
    let id = req.body.id;
    let deadline = req.body.deadline;
    let category = req.body.category;
    let permlink = req.body.permlink
    let body = req.body.body

    var new_contest = new Contest({
      title: title,
      author: author,
      id: id,
      deadline: deadline, 
      category: category,
      permlink: permlink,
      body: body,
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

    Contest.find({ permlink: permlink }, ['title', 'author', 'id', 'deadline', 'permlink', 'category', 'image'], function (error, contests) {
      if (error) { console.error(error); }
      res.send({
        contests: contests
      })
    }).sort({_id:-1})
  })
  

  // Update winners

  router.put('/contests/winners/:id', (req, res) => {
    var db = req.db;
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