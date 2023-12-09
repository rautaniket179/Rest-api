const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    phone:String,
    email:String,
    userType:String,
})


module.exports = mongoose.model("user",userSchema);