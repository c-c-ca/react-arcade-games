const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  username: String,
  topScore: { type: Number, default: 0 },
});

module.exports = mongoose.model('users', userSchema);
