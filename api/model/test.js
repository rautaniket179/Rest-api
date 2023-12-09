const mongoose=require('mongoose')
const questionSchema = new mongoose.Schema({
    "question": String,
    "option": [String],
    "Answer": String,
});
const testSchema=new mongoose.Schema({
    "testId":String,
    "subjectName":String,
    "questionType":String,
    "QuestionSet":[questionSchema],
    "time":{
        type:Number,
        default:30
    },
    "count": {
        type: Number,
        default: 0
    }
})
module.exports=mongoose.model('Test',testSchema)