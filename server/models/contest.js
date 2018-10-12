var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContestSchema = new Schema({

  title: String,
  author: String,
  id: String,
  deadline: String,
  category: String,
  permlink: String


});

var Contest = mongoose.model("Contest", ContestSchema);
module.exports = Contest;