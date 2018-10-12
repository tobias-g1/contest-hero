const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 8081)

var mongoose = require('mongoose');
mongoose.connect(`${process.env.DB}/contests`);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var Contest = require("../models/contest");

// Add new contest

app.post('/contests', (req, res) => {

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

app.get('/contests', (req, res) => {
  Contest.find({}, ['title', 'author', 'id', 'deadline', 'permlink'], function (error, contests) {
    if (error) { console.error(error); }
    res.send({
      contests: contests
    })
  }).sort({_id:-1})
})