const express = require('express');
const router = express.Router();
const Test = require('../model/test');
const user=require('./user')
const Result = require('../model/resultRoute'); // Import the Result model or create it

router.post('/:testId/submit', async (req, res, next) => {
    try {
        const testId = req.params.testId;
        const userAnswers = req.body.userAnswers;
        const userName = req.body.userName;
        console.log(userName);
        const emailId = req.body.emailId;

        // Fetch the test based on the provided testId
        const test = await Test.findOne({ testId: testId });
        console.log(test)

        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }

        // Compare user-selected options with correct answers
        let correctAnswersCount = 0;
        userAnswers.forEach((userAnswer, index) => {
            const correctAnswer = test.QuestionSet[index].Answer;

            // Assuming userAnswer is the option selected by the user
            if (userAnswer === correctAnswer) {
                correctAnswersCount++;
            }
        });

        // Calculate the score and check pass/fail status
        const score = (correctAnswersCount / test.count )* 100;
       
        const passStatus = score >= 70 ? 'Pass' : 'Fail';

        // Update the count in the database
        
        

        // Save the result to the database
        const result = new Result({
            emailId: emailId,
            testId: testId,
            subjectName: test[0].subjectName,
            score: score,
            result: passStatus,
            userName: userName
        });
console.log(user.new_user)
        await result.save();

        res.status(200).json({
            message: 'Test submitted successfully',
            correctAnswersCount: correctAnswersCount,
            score: score,
            result: passStatus,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/', async (req, res, next) => {
    try {
        const results = await Result.find();
        res.status(200).json({ results: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:testId', async (req, res, next) => {
    try {
        const testId = req.params.testId;

        // Assuming your Result model has a property named 'testId'
        const results = await Result.find({ testId: testId });

        res.status(200).json({ results: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;