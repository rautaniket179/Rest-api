const mongoose=require('mongoose');
const loginSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String
})
module.exports=mongoose.model("Login",loginSchema)