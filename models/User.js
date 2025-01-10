const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  company_name: { type: String, required: true },
  password: { type: String, required: true },
  canvas: { type: Object, default: {} }, // Store user's design data
  hosted_page_url: { type: String, unique: true, sparse: true }, // Store the unique hosted page URL
});

const User = mongoose.model('User', userSchema);

module.exports = User;
