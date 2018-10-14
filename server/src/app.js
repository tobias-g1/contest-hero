const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const contests = require('../routes/contests');
const entries = require('../routes/entries');

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
require('dotenv').config();

// Routes
app.use(contests);
app.use(entries);

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
.then(() => console.log('connecting to database successful'))
.catch(err => console.error('could not connect to mongo DB', err))
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var listener = app.listen(process.env.PORT || 8081, function(){
  console.log('Listening on port ' + listener.address().port);
});