const Entry = require("../models/entries.model");

// POST Create Entry

exports.create_entry = function (req, res) {
   
    var new_entry = new Entry({
        access_token: req.body.access_token,
        title: req.body.title,
        author: req.body.author,
        permlink: req.body.permlink,
        entry_method: req.body.entry_method,
        body: req.body.body,
        parent_contest: {
            id: req.body.parent_contest.id,
            author: req.body.parent_contest.author,
            permlink: req.body.parent_contest.permlink
        },
        hidden: false
    })

    console.log(new_entry)

    new_entry.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.status(200).send({success: true})
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

  // Get Entry by Permlink 

  exports.get_entries_by_permlink = function (req, res) {

    Entry.find({ 'permlink' : req.params.permlink }, ['title', 'author', 'permlink', 'entry_method'], function (error, entries) {
      if (error) { console.error(error); }
      res.send({
        entries: entries
      })
    }).sort({_id:-1})
  }
  

