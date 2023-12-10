const express = require('express');
const router = express.Router();
const Test = require('../model/test');
const user=require('./user')
const Result = require('../model/resultRoute'); // Import the Result model or create it

router.post('/:testId', async (req, res, next) => {
    try {
        const testId = req.params.testId;
        const userAnswers = req.body.userAnswers;
        const userName = req.body.userName;
        const emailId = req.body.emailId;

        const test = await Test.findOne({ testId: testId }); // Use findOne instead of find

        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }

        let correctAnswersCount = 0;
        
        // Check if QuestionSet exists in test and has the expected structure
        if (test.QuestionSet && Array.isArray(test.QuestionSet)) {
            userAnswers.forEach((userAnswer, index) => {
                if (test.QuestionSet[index] && userAnswer === test.QuestionSet[index].Answer) {
                    correctAnswersCount++;
                }
            });
        } else {
            return res.status(500).json({ error: 'Test structure is invalid' });
        }

        const score = (correctAnswersCount / test.QuestionSet.length) * 100;
        const passStatus = score >= 70 ? 'Pass' : 'Fail';

        const result = new Result({
            emailId: emailId,
            testId: testId,
            subjectName: test.subjectName,
            score: score,
            result: passStatus,
            userName: userName
        });

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