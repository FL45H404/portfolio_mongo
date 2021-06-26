const express=require('express')
const router=express.Router();
const {send}=require('../contoler/contactControler')


router.post('/contact',send);

module.exports=router;