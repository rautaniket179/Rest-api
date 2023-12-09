const mongoose=require('mongoose')
const questionSchema=new mongoose.Schema({
    "subject_name":String,
    "questionType":String,
    "question":String,
    "option":[
       String
    ],
    "Answer":String
})
module.exports=mongoose.model("question",questionSchema)