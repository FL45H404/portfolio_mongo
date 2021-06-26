const express=require('express')
const router=express.Router();

const { addregister,login,updateUser,deleteUser,getUser }=require('../contoler/registerMaster');

router.post('/register',addregister);
router.post('/login',login)
router.get('/admin/user/:register_id', getUser);
router.post('/admin/user/:register_id', updateUser);
router.get('/admin/user/delete/:register_id', deleteUser);

module.exports=router;