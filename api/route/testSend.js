const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const testSend = require('../model/testSend');
const jwt = require('jsonwebtoken');

router.post('/sendTest', async (req, res, next) => {
  console.log("I am in");
  try {
    // Extract data from the request body
    const { testId, studentName, emailId } = req.body;
    console.log('Received request with body:', req.body);

    // Save the data to MongoDB
    const newTestSend = new testSend({ testId, studentName, emailId });
    await newTestSend.save();

    // Generate a JWT token that expires in 30 minutes
    const token = jwt.sign({ emailId }, 'aniketraut@123', { expiresIn: '30m' });
    console.log('Generated Token:', token);

    // Generate dynamic exam link based on the token
    const examLink = `http://localhost:3000/exam?token=${token}`;

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dev1sprktechnologies@gmail.com',
        pass: 'Kingk3@143',
      },
    });

    const mailOptions = {
      from: 'dev1sprktechnologies@gmail.com',
      to: emailId,
      subject: 'Exam Token',
      text: `Dear ${studentName},

      Thank you for registering for the upcoming exam. Your exam link is ready.

      Click the following link to access the exam: ${examLink}

      Best regards,
      Exam Administration Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Token and Exam link sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
