const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Node 22 compatible import
const passportLocalMongoose =
  require("passport-local-mongoose").default ||
  require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// MUST receive a function
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
