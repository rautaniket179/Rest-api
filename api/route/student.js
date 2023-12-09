const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Student=require('../model/student')

router.get('/',(req,res,next)=>{
   Student.find()
   .then(result=>{
    res.status(200).json({
        studentData:result
    });
   })
   .catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
   });
});


router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        console.log(result);
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
// router.get('/',(req,res,next)=>{
//     Student.find()
//     .then(result=>{
//         console.log(result);
//         res.status(200).json({
//             data:result
//         }) 
//     })
// })

// router.get('/:id',(req,res,next)=>{
//     console.log(req.params.id)
//     Student.findById(req.params.id)
//     .then(result=>{
//         console.log(result);
//         res.status(200).json({
//             data:result
//         }) 
//     })
// })


// router.delete('/:id',(req,res,next)=>{
//     Student.findByIdAndDelete(req.params.id)
//         .then(result => {
//             if (!result) {
//                 return res.status(404).json({ message: 'Student not found' });
//             }
//             console.log(result);
//             res.status(200).json({ message: 'Student is successfully deleted' });
//         })
//         .catch(err => {
//             res.status(500).json({ error: err });
//         });
// });
// router.patch('/:id',(req,res,next)=>{
//     console.log(req.params.id)
//     Student.findById(req.params.id)
//     .then(result=>{ 
//       if(!result){
//         return res.status(404).json({message :'Student not found'})
//       }
//       if(req.body.name){
//         result.name = req.body.name
//       }
//       if(req.body.phone){
//         result.phone = req.body.phone
//       }
//       if(req.body.email){
//         result.email = req.body.email
//       }
//       if(req.body.gender){
//         result.gender = req.body.gender
//       }
 
//      // Save the updated student information
//      return result.save();
//     })
//     .then(updatedStudent => {
//         console.log(updatedStudent);
//         res.status(200).json({ updatedStudent });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({ error: err });
//     });
// });

router.post('/',(req,res,next)=>{
    
    const student=new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
    })
    student.save()
     .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
     })
     .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
     })
    // student.save()
    // .then(result=>{
    //     console.log(result);
    //     res.status(200).json({
    //         newStudent:result
    //     })

    // })
    // .catch(err=>{
    //     console.log(err);
    //     res.status(500).json({
    //         error:err
    //     })
    // })
})


module.exports = router;