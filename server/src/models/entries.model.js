// Definitions

var timestamps = require('mongoose-timestamp');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema

var EntrySchema = new Schema({
  title:  {
    type: String,
    required: true
  },
  author:  {
    type: String,
    required: true
  },
  permlink:  {
    type: String,
    required: true
  },
  entry_method: {
    type: String,
    required: true
  },
  body:  {
    type: String,
    required: true
  },
  parent_contest: {
    permlink:  {
      type: String,
      required: true
    },
    author:  {
      type: String,
      required: true
    },
    id:  {
      type: String,
      required: true
    }
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  
});


EntrySchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps

// Define model

var Entry = mongoose.model("Entry", EntrySchema);

// Export model

module.exports = Entry;