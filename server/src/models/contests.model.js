// Definitions

var timestamps = require('mongoose-timestamp');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema

var ContestSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  permlink: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }, 
  winners: {
    type: Array,
    default: []
  },
  hidden: {
    type: Boolean,
    default: false,
  }
});

ContestSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps

// Define model

var Contest = mongoose.model("Contest", ContestSchema);

// Export model

module.exports = Contest;

