var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EntrySchema = new Schema({
  title: String,
  author: String,
  permlink: String,
  body: String,
  parent_contest: {
      id: String,
      permlink: String,
      category: String
  }
});

var Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry;