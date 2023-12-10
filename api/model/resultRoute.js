const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    emailId: String,
    name:String,
    testId: String,
    subjectName: String,
    score: Number,
    result: String,
    userName:String,
    timestamp: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;