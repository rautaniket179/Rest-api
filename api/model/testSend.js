const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testId: String,
  emailId: String,
  studentName: String,
  // token: String, // Assuming this will store the generated token
});

module.exports = mongoose.model('TestSend', testSchema);
