const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



router.post('/signUp', (req, res, next) => {
  console.log(req.body.username);

  User.findOne({ phone: req.body.phone })
      .exec()
      .then(existingUser => {
          if (existingUser) {
              return res.status(409).json({
                  error: 'User already exists in the database'
              });
          } else {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                  if (err) {
                      return res.status(500).json({
                          error: err
                      });
                  } else {
                      const user = new User({
                          _id: new mongoose.Types.ObjectId(),
                          username: req.body.username,
                          password: hash,
                          phone: req.body.phone,
                          email: req.body.email,
                          userType: req.body.userType
                      });

                      user.save()
                          .then(savedUser => {
                              res.status(201).json({
                                  message: 'User successfully created',
                                  new_user: savedUser
                              });
                              console.log(savedUser);
                          })
                          .catch(saveError => {
                              res.status(500).json({
                                  error: saveError
                              });
                          });
                  }
              });
          }
      })
      .catch(findError => {
          res.status(500).json({
              error: 'Internal server error'
          });
      });
});


router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
      .exec()
      .then(user => {
          if (!user) {
              return res.status(404).json({
                  error: 'Username not found'
              });
          }

          bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                  return res.status(500).json({
                      error: 'Authentication failed'
                  });
              }
              if (result) {
                  const token = jwt.sign({
                      username: user.username,
                      userType: user.userType,
                      email: user.email,
                      phone: user.phone
                  },
                  'this is dummy text',
                  {
                      expiresIn: '24h'
                  });

                  res.status(200).json({
                      username: user.username,
                      userType: user.userType,
                      email: user.email,
                      phone: user.phone,
                      token: token
                  });
              } else {
                  res.status(401).json({
                      message: 'Incorrect password'
                  });
              }
          });
      })
      .catch(err => {
          res.status(500).json({
              error: 'Internal server error'
          });
      });
});

  


router.get('/userDetails/:id',(req,res,next)=>{

    User.findById(req.params.id).then(result=>{
        res.status(200).json({
            data:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:'user not found'
        })
    })
})



module.exports = router;