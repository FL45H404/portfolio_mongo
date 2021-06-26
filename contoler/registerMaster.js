
const dotenv = require('dotenv');
const db = require('../db')
const jwt = require('jsonwebtoken');
// get config vars
const bcrypt = require('bcrypt')
const session = require('express-session')
dotenv.config();
const Register = require('../model/register')
// exports.addregister=async (req,res)=>{
//     try{
//        db.query("select email from register where email=?",[req.body.email],(err,result)=>{
//             if (result.length >0 && result[0].email==req.body.email){
//                 console.log(req.body.username)
//                 res.render('register',{ name:req.body.username, message:'Email Id is already exist'})
//             }else{
//                 bcrypt.hash(req.body.password,8,(err,password)=>{
//                     if (err) throw err;
//                     const token=jwt.sign(req.body.email, process.env.TOKEN_SECRET);
//                     const data=[
//                         req.body.username,
//                         req.body.email,
//                         password,
//                         token,
//                         "user",
//                         new Date()
//                     ]
//                     var sql="INSERT INTO register (username,email,password,token,role,created_date) values (?,?,?,?,?,?)";
//                     db.query(sql,data,(err,result)=>{
//                         if (err) return res.status(400).send(err);
//                         res.status(201)
//                         return res.render('login',{message:"user added"})
//                 })
//                 })
//             }
//         })
//     }catch(err){
//        res.status(500).send(err)
//     }
// }

exports.addregister = async (req, res) => {
    try {
        const available = await Register.findOne({ email: req.body.email })
        console.log(available)
        if (available == null) {
            const password = await bcrypt.hash(req.body.password, 8)
            const token = jwt.sign(req.body.email, process.env.TOKEN_SECRET);
            console.log(password)
            console.log(token)
            const registerUser = new Register({
                username: req.body.username,
                email: req.body.email,
                password: password,
                token: token,
                role: req.body.role
            })
            const data = await registerUser.save()
            console.log(data)
            res.status(201)
            return res.render('login', { message: "user added" })
        }else{
            res.render('register', { name: req.body.username, message: 'Email Id is already exist' })
        }
    } catch (err) {
        res.status(400).send(err);
    }
}

// exports.login = async (req, res) => {
//     try {
//         const body = req.body;
//         db.query("select username,password  from register where email=?", body.email, (err, result) => {
//             if (result.length > 0) {
//                 bcrypt.compare(body.password, result[0].password, (err, hash) => {
//                     if (err) return res.status(400).send(err);
//                     if (hash) {
//                         const token = jwt.sign(body.email, process.env.TOKEN_SECRET);
//                         res.cookie("jwt", token, {
//                             expires: new Date(Date.now() + 3000000),
//                             httpOnly: true
//                         })
//                         req.session.user = result
//                         console.log(req.session.user)
//                         console.log("login succesfully")
//                         res.status(200)
//                         return res.redirect('/')
//                     } else {
//                         res.status(400)
//                         return res.render('login');
//                     }

//                 })
//             } else {
//                 res.status(400)
//                 return res.redirect('login')
//             }
//         })
//     } catch (err) {
//         return res.status(500).send(err)
//     }
// }
exports.login = async (req, res) => {
    try {
        const body = req.body;
        // console.log(body)
        const data = await Register.findOne({ email: body.email })
        if (data) {
            const hash = await bcrypt.compare(body.password, data.password)
            if (hash) {
                const token = jwt.sign(body.email, process.env.TOKEN_SECRET);
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 3000000),
                    httpOnly: true
                })
                console.log(data)
                req.session.user = data.role;
                // console.log(req.session.user)
                console.log("login succesfully")
                res.status(200)
                return res.redirect('/')
            } else {
                res.status(400)
                return res.render('login');
            }
        } else {
            res.status(400)
            return res.redirect('login')
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}



// exports.getUser = async (req, res) => {
//     try {
//         const data = [req.params.register_id];
//         db.query('SELECT * FROM register WHERE register_id=?', data, (err, result) => {
//             if (err) throw err;
//             console.log(result)
//             if (result.length > 0) {
//                 res.render('editUser', { result: result })
//             }
//             else {
//                 res.send('no data')
//             }
//         })
//     } catch (err) {
//         res.status(400).send(err)
//     }
// }
exports.getUser = async (req, res) => {
    try {
        const id = req.params.register_id;
        const result = await Register.find({ _id: id })
        res.render('editUser', { result: result })
    } catch (err) {
        res.status(400).send(err)
    }
}

// exports.updateUser = async (req, res) => {
//     try {
//         registerId = req.params.register_id;
//         const data = [
//             req.body.role,
//             registerId
//         ]
//         var sql = "update register set role=? where register_id=?"
//         db.query(sql, data, (err, result) => {
//             if (err) return err;
//             res.redirect('/admin/users')
//         })

//     } catch (err) {
//         res.send(err)
//     }
// }

exports.updateUser=async (req,res)=>{
    try{
        const id = req.params.register_id;
        const result=await Register.findOneAndUpdate({_id:id},{$set:{role:req.body.role}})
        res.redirect('/admin/users')  
    }catch(err){
        res.send(err)
    }
}

// exports.deleteUser = async (req, res) => {
//     try {
//         const data = [req.params.register_id];
//         db.query("delete from register where register_id=?", data, (err, result) => {
//             if (err) res.send(err);
//             res.redirect('/admin/users')
//         })
//     } catch (err) {
//         res.send(err)
//     }
// }


exports.deleteUser=async (req,res)=>{
    try{
        const id=req.params.register_id;
        const result=await Register.deleteOne({_id:id})
        res.redirect('/admin/users')
    }catch(err){
        res.send(err)
    }
}