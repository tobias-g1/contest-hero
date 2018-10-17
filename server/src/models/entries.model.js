// Definitions

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema

var EntrySchema = new Schema({
  title: String,
  author: String,
  permlink: String,
  body: String,
  parent_contest: {
    id: String,
    permlink: String,
    category: String,
    author: String
  },
  hidden: Boolean,
  addedDateTime: Date
});

// Define model

var Entry = mongoose.model("Entry", EntrySchema);

// Export model

module.exports = Entry;