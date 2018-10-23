// Definitions

var timestamps = require('mongoose-timestamp');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema

var UserSchema = new Schema({
  user: {
    type: String,
    required: true
  }
});

UserSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps

// Define model

var User = mongoose.model("User", UserSchema);

// Export model

module.exports = User;