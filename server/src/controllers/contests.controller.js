const Contest = require('../models/contests.model.js');

// POST Create Contests

exports.create_contest = function (req, res) {

    var new_contest = new Contest({
      title: req.body.title,
      author: req.body.author,
      id: req.body.id,
      deadline: req.body.deadline, 
      category: req.body.category,
      permlink: req.body.permlink,
      entry_method: req.body.entry_method,
      body: req.body.body,
      hidden: false,
      addedDateTime: new Date().getTime(),
      winners: []
    })

    new_contest.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.status(200).send({success: true, id: new_contest._id})
    })
}

// GET All Contests

exports.get_contests = function (req,res) {
    Contest.find({}, ['title', 'author', 'id', 'deadline', 'entry_method', 'permlink', 'category', 'json', 'tags'], function (error, contests) {
      if (error) { console.error(error); }
      res.send({
        contests: contests
      })
    }).sort({_id:-1})
  }

  // GET Contest by Category

  exports.get_contests_by_category = function (req,res) {

    Contest.find({ category: req.params.category }, ['title', 'author', 'id', 'entry_method', 'deadline', 'permlink', 'category', 'image'], function (error, contests) {
      if (error) { console.error(error); }
      res.send({
        contests: contests
      })
    }).sort({_id:-1})
  }
  
    // GET Single Contest

    exports.get_contest_by_permlink = function (req,res) {

        Contest.find({ permlink: req.params.permlink }, ['title', 'author', 'id','entry_method', 'deadline', 'permlink', 'category', 'image', 'winners'], function (error, contests) {
          if (error) { console.error(error); }
          res.send({
            contests: contests
          })
        }).sort({_id:-1})
      }
    
      // PUT Update winners

      exports.set_winners = function (req,res) {
        Contest.findById(req.body.id, '_id', function (error, contest) {
          console.log(req.body.id)
          if (error) { res.status(500).send({ success: false }) }
          
          
          contest.winners = req.body.winners;
    
          contest.save(function (error) {
            if (error) {
              console.log(error)
            }
            res.status(200).send({success: true})
          })
        })
      }
      
      // PUT Update Full Contest

            exports.edit_contest = function (req,res) {
              console.log(req.body)
              Contest.findById(req.body.id, '_id', function (error, contest) {
                console.log(req.body.id)
                if (error) { res.status(500).send({ success: false }) }

                contest.title = req.body.title;
                contest.deadline = req.body.deadline;
                contest.category = req.body.category;
                contest.body = req.body.body;

                contest.save(function (error) {
                  if (error) {
                    console.log(error)
                  }
                  res.status(200).send({success: true})
                })
              })
            }