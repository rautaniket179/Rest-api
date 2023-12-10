const express = require('express');
const router = express.Router();
const bodyParser=require('body-parser')
const nodemailer = require('nodemailer');
const testSend = require('../model/testSend')
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
  console.log("I am in");
  try {
    // Extract data from the request body
    const { testId, studentName, emailId } = req.body;

    console.log(testId)

    // Validate if required data exists
    if (!testId || !studentName || !emailId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Received request with body:', req.body);

    // Save the data to MongoDB
    const newTestSend = new testSend({ testId, studentName, emailId });
    await newTestSend.save();
     console.log(testId, studentName, emailId )
    // Generate a JWT token that expires in 30 minutes
    const token = jwt.sign({ emailId }, 'aniketraut@123', { expiresIn: '30m' });
    console.log('Generated Token:', token);

    // Generate dynamic exam link based on the token
    const examLink = `http://localhost:4000?token=${token}`;

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'dev1sprktechnologies@gmail.com',
        pass: 'gslq alyb wcop didn',
      },
    });
    
    

    const mailOptions = {
      from: '"Exam Link"  <dev1sprktechnologies@gmail.com>',
      to: emailId,
      subject: 'Exam Token',
      text: `Dear ${studentName},

      Thank you for registering for the upcoming exam. Your exam link is ready.

      Click the following link to access the exam: ${examLink}

      Best regards,
      Exam Administration Team`,
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error); // Log the specific error
        return res.status(500).json({ error: 'Failed to send email', specificError: error.message });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Token and Exam link sent successfully' });
      }
    });
    
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
