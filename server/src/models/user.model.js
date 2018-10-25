// Definitions

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema

var UserSchema = new Schema({
  user: {
    type: String,
    required: true
  }
},
{timestamps: true} 
);

// Define model

var User = mongoose.model("User", UserSchema);

// Export model

module.exports = User;