const Entry = require("../models/entries.model");

// POST Create Entry

exports.create_entry = function (req, res) {
   
    var new_entry = new Entry({
        title: req.body.title,
        author: req.body.author,
        permlink: req.body.permlink,
        body: req.body.body,
        parent_contest: {
            id: req.body.parent_contest.title,
            author: req.body.parent_contest.author,
            permlink: req.body.parent_contest.permlink
        },
        hidden: false,
        addedDateTime: new Date().getTime()
    })

    console.log(new_entry)

    new_entry.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Success'
      })
    })
  }


// Get entries by contestId
exports.get_entries_by_id = function (req, res) {

    Entry.find({ 'parent_contest.id' : req.params.id }, ['title', 'author', 'permlink'], function (error, entries) {
      if (error) { console.error(error); }
      res.send({
        entries: entries
      })
    }).sort({_id:-1})
  }
  

