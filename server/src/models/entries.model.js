// Definitions

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
  body:  {
    type: String,
    required: true
  },
  parent_contest: {
    id:  {
      type: String,
      required: true
    },
    permlink:  {
      type: String,
      required: true
    },
    category:  {
      type: String,
      required: true
    },
    author:  {
      type: String,
      required: true
    },
  },
  hidden: {
    type: Boolean,
    default: false,
  }
});

// Define model

var Entry = mongoose.model("Entry", EntrySchema);

// Export model

module.exports = Entry;