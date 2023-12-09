const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const user=require('../model/login')

router.post=('/',(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;

    user.findOne({username:username}).then(user=>{
        if (!user) {
            return res.status(404).json({
              error: 'Username not found'
            });
        }
        if (user.password !== password) {
            return res.status(401).json({
              error: 'Incorrect password'
            });
          }
          return res.status(200).json({
            message: 'User successfully logged in'
          });
    })
    .catch(err => {
        res.status(500).json({
          error: 'Internal server error'
        });
      });
    })
    module.exports = router;