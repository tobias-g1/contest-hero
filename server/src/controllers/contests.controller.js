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
    winners: [],
    prize: {
      type: req.body.prize.type,
      value: req.body.prize.value
    }
  })

  new_contest.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.status(200).send({
      success: true,
      id: new_contest._id
    })
  })
}

// GET All Contests

exports.get_contests = function (req, res) {

  let sortmethod;

  switch (req.params.sortby) {
    case 'oldest':
     sortmethod = {
       _id: 1
      }
      break;
    case 'newest':
    sortmethod = {
      _id: -1
     }
      break;
  }
  
  let query =  (req.params.prize === 'any') ? {} : {"prize.type": req.params.prize}

  Contest.find(query, function (error, contests) {
    if (error) {
      console.error(error);
    }
    res.send({
      contests: contests
    })
  }).sort(sortmethod)
}

// GET Contest by Category

exports.get_contests_by_category = function (req, res) {

  let sortmethod;

  switch (req.params.sortby) {
    case 'oldest':
     sortmethod = {
       _id: 1
      }
      break;
    case 'newest':
    sortmethod = {
      _id: -1
     }
      break;
  }

  let query =  (req.params.prize === 'any') ? {"category": req.params.category} : {"category": req.params.category, "prize.type": req.params.prize}

  Contest.find(query, function (error, contests) {
    if (error) {
      console.error(error);
    }
    res.send({
      contests: contests
    })
  }).sort(sortmethod)
}

// GET Single Contest

exports.get_contest_by_permlink = function (req, res) {

  Contest.find({
    permlink: req.params.permlink
  }, function (error, contests) {
    if (error) {
      console.error(error);
    }
    res.send({
      contests: contests
    })
  }).sort({
    _id: -1
  })
}

// PUT Update winners

exports.set_winners = function (req, res) {
  Contest.findById(req.body.id, '_id', function (error, contest) {
    console.log(req.body.id)
    if (error) {
      res.status(500).send({
        success: false
      })
    }


    contest.winners = req.body.winners;

    contest.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.status(200).send({
        success: true
      })
    })
  })
}

// PUT Update Full Contest

exports.edit_contest = function (req, res) {
  console.log(req.body)
  Contest.findById(req.body.id, '_id', function (error, contest) {
    console.log(req.body.id)
    if (error) {
      res.status(500).send({
        success: false
      })
    }

    contest.title = req.body.title;
    contest.deadline = req.body.deadline;
    contest.category = req.body.category;
    contest.body = req.body.body;
    contest.entry_method = req.body.entry_method;
    contest.prize.type = req.body.prize.type;
    contest.prize.value = req.body.prize.value;

    contest.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.status(200).send({
        success: true
      })
    })
  })
}