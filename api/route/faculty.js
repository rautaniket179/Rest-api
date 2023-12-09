const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Successfull showed faculty'
    })

})
router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'Successfull showed faculty post'
    })

})

module.exports=router;