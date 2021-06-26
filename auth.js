const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// const db = require('./db');
const Register = require('./model/register');
const Project = require('./model/project');

// get config vars
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verify = await jwt.verify(token, process.env.TOKEN_SECRET);
    // const user=db.query("select * from register where ")
    // console.log(verify)
    next();
  } catch (err) {
    res.status(401)
    return res.render('401')
  }
}


// const role=async (req,res,next)=>{
//   try{
//     const token=[req.cookies.jwt];
//     var sql="select * from register where token=?";
//     await db.query(sql,token,(err,result)=>{
//       if (result.length>0){
//         const roles=result[0].role;
//         if(roles=='admin'){
//           next();
//         }
//         else{
//           res.status(401)
//           return res.render('401')
//         }
//       }else{
//         res.status(400)
//         return res.render('401')
//       }
//     })
//   }catch(err){
//     return res.status(500).send(err)
//   }
// }

const role = async (req, res,next) => {
  const roles=req.session.user;
  if(roles=='admin'){
    next();
  }else{
    res.redirect('/')
  }
}

module.exports = { auth, role };
