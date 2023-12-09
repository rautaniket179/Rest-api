const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testId: String,
  emailId: String,
  studentName: String,
  token: String, // Add this line for the token field
});

module.exports = mongoose.model('testSend', testSchema);
