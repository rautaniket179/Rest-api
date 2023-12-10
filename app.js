const express=require('express');
const app=express();
const  userRoute = require('./api/route/user');
const student=require('./api/route/student');
const login=require('./api/route/login');
const test=require('./api/route/test');
const examQuestion=require('./api/route/create-question')
const bodyParser=require('body-parser')
const sendMail =require('./api/route/testSend')
const result = require('./api/route/result')
var cors = require('cors');
app.use(cors())
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://aniketraut64:9869615057Aniket@sbs.hhyrmgb.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('error',err=>{
    console.log('connection failed');
})

mongoose.connection.on('connected',connected=>{
    console.log("connected with database");
})
const faculty=require('./api/route/faculty');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json() )
app.use('/student',student)
app.use('/question',examQuestion)
app.use('/faculty',faculty)
app.use('/test',test)
app.use('/sendTest',sendMail)
app.use('/result',result)


// app.use('/login',login)
app.use('/user', userRoute);
app.use((req,res,next)=>{
    res.status(404).json({
        error:'Bad request'
    })
})
const port = 5000;
app.use(express.json());

// ... (Other middleware and routes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
    
module.exports = app;

// const app = express();


// const express = require("express");
// const app = express();
// let PORT = 5000;

// const sendMail = require("./api/route/testSend");

// app.get("/", (req, res) => {
//   res.send("I am a server");
// });

// app.get("/mail", sendMail);
// console.log("hello aniket how are you?")
// const start = async () => {
//   try {
//     app.listen(PORT, () => {
//       console.log(`I am live in port no.  ${PORT}`);
//     });
//   } catch (error) {}
// };

// start();
// module.exports = app;