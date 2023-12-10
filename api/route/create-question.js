const express=require('express')
const mongoose = require('mongoose');

const router=express.Router();
const Question=require('../model/create-question')

router.post('/',(req,res,next)=>{
    const question=new Question({
        "id":new mongoose.Types.ObjectId,
        "subject_name":req.body.subject_name,
    "questionType":req.body.questionType,
    "question":req.body.question,
    "option":req.body.option,
    "Answer":req.body.Answer
    })
    question.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            res:result
        })
    })
    .catch(err=>{
     console.log(err)
     res.status(500).json({
        error:err
     })
    })

})
    router.get('/',(req,res,next)=>{
        Question.find()
        .then(result=>{
            console.log(result,"hello")
            res.status(200).json({
                questionbank:result
            })
            
        })
        .catch(err=>{
           
            res.status(500).json({
                error:err
            })
        })
    })

    router.get('/:subjectName',(req,res,next)=>{
       const subjectName= req.params.subjectName

       console.log(subjectName)
       question.find({ subject_name: subjectName })
       .then(result=>{
        console.log(subjectName)
        res.status(200).json({
            questions:result
        })
       })
       .catch(err=>{
        res.status(500).json({
            error:err
        })
       })
       
    })
module.exports = router;