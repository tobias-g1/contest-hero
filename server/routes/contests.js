
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
    
    var new_contest = new Contest({
      title: title,
      author: author,
      id: id,
      deadline: deadline, 
      category: category,
      permlink: permlink
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
  Contest.find({}, ['title', 'author', 'id', 'deadline', 'permlink'], function (error, contests) {
    if (error) { console.error(error); }
    res.send({
      contests: contests
    })
  }).sort({_id:-1})
})

module.exports = router;