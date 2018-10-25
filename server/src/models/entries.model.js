// Definitions

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema

var EntrySchema = new Schema({
  title:  {
    type: String
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
  
},
{timestamps: true} 
);

// Define model

var Entry = mongoose.model("Entry", EntrySchema);

// Export model

module.exports = Entry;