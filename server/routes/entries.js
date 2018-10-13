
var express = require('express');
var router = express.Router();
var Entry = require("../models/entries");

// Create Entry

router.post('/entries', (req, res) => {

    var db = req.db;

    let title = req.body.title;
    let author = req.body.author;
    let body = req.body.body;
    let permlink = req.body.permlink;
    let id = req.body.parent_contest.id;
    let category = req.body.parent_contest.category;
    let parentPemlink = req.body.parent_contest.permlink
   
    var new_entry = new Entry({
        title: title,
        author: author,
        permlink: permlink,
        body: body,
        parent_contest: {
            id: id,
            permlink: parentPemlink,
            category: category
        }
    })


    new_entry.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Success'
      })
    })
  })


// Get entries by contestId

router.get('/entries/:id', (req, res) => {

    let contestId = req.params.id

    Entry.find({ 'parent_contest.id' : contestId }, ['title', 'author', 'permlink'], function (error, entries) {
      if (error) { console.error(error); }
      res.send({
        entries: entries
      })
    }).sort({_id:-1})
  })
  

module.exports = router;