// Definitions

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema

var ContestSchema = new Schema({

  title: String,
  author: String,
  id: String,
  deadline: String,
  category: String,
  permlink: String,
  body: String, 
  winners: Array,
  hidden: Boolean,
  addedDateTime: Date
  
});

// Define model

var Contest = mongoose.model("Contest", ContestSchema);

// Export model

module.exports = Contest;

