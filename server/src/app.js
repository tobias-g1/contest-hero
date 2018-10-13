const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var contests = require('../routes/contests');

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(contests);

require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(`${process.env.DB}/contests`);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.listen(process.env.PORT || 8081)



