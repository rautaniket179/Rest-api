
const express = require('express');
const router = express.Router();
const Test = require('../model/test');
// const question=require('../model/create-question')

router.post('/', async (req, res, next) => {
    try {
        const { subjectName,questionType, QuestionSet } = req.body;

        if (!subjectName || !QuestionSet || !Array.isArray(QuestionSet) || QuestionSet.length < 10) {
            return res.status(400).json({ error: 'Enter atleast 10 questions' });
        }

        const randomnumber = Math.floor(Math.random() * 1000);

        const newTest = new Test({
            testId: subjectName + randomnumber,
            subjectName,
            questionType,
            QuestionSet: QuestionSet.map(question => ({
                question: question.question,
                option: question.option,
                Answer: question.Answer,
            })),
            count: QuestionSet.length,
        });

         newTest.save()
         .then(result=>{
            console.log(result)
         res.status(200).json({
            res:result
         })
         })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/',(req,res,next)=>{
    Test.find()
    .then(result=>{
        res.status(200).json({
            test:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
router.get('/:testId',(req,res,next)=>{
    const testId= req.params.testId

    console.log(req.params.testId)
    Test.find({ testId: testId })
    .then(result=>{
     console.log(testId)
     res.status(200).json({
         data:result
     })
    })
    .catch(err=>{
        console.log(testId,"hello")
     res.status(500).json({
         error:err
     })
    })
    
 });
 
module.exports = router;
