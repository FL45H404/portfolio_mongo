require('dotenv').config()
const express=require('express');
const ejs=require('ejs');
const path=require('path');
// const db=require('./db') 
const app=express();
const cors=require('cors')
require('./conn/db')
const cookieParser=require('cookie-parser');
const port=process.env.PORT || 5000;
var session = require('express-session');
const Register=require('./model/register');
const Project=require('./model/project');

app.use(cors())
app.use(cookieParser());
app.use(session({
    key:'uid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {expires:60000000 }
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, '/public')));

const contact=require('./routes/contactRoute')
const register=require('./routes/register');
const project=require('./routes/projectroute');
const {auth,role}=require('./auth');


//😀😀middleware to generate login and logout button dynamically
app.use((req,res,next)=>{
    res.locals.islogin=req.cookies.jwt;
    // console.log(res.locals.islogin)
    next();
})

app.use('/',register);
app.use('/',project);
app.use('/',contact);   

app.get('/',async (req,res)=>{
    // db.query('SELECT * FROM projects limit 3',(err,result)=>{
    //     const data=result;
    //     res.render('index',{data:data})
    // })
    const result=await Project.find().limit(3)
    const data=result;
    res.render('index',{data:data})
})
app.get('/contact',(req,res)=>{
    res.render('contact',{message:''})
})
app.get('/login',(req,res)=>{
    console.log(req.session)
    if(req.session.user){
        return res.redirect('/')
    } 
    return res.render('login')
})
app.get('/register',(req,res)=>{
    res.render('register',{name:'',message:''})
})
app.get('/admin/projects',auth,role,async (req,res)=>{
//     db.query('select * from projects',(err,result)=>{
//     const data=result;
//     res.render('projects',{data:data});
// })
const data=await Project.find()
    res.render('projects',{data:data});
})
app.get('/admin/users',auth,role,async (req,res)=>{
    // db.query("SELECT * from register",(err,result)=>{
    const result=await Register.find()
    const data=result;
        res.render('users',{data:data})
    // })
})
app.get('/admin/project',auth,role,(req,res)=>{
    res.render('project')
})

app.get('/admin',auth,role,(req,res)=>{
    res.render('dashboard')
})
app.get('/resume',auth,(req,res)=>{
    res.render('resume')
})
app.get('/Project',auth,async (req,res)=>{
    // db.query('SELECT * FROM projects',(err,result)=>{
    //     const data=result;
    // res.render('myProject',{data})
    // })
const data=await Project.find()
    res.render('myProject',{data})
})
app.get('/logout',(req,res)=>{
    res.clearCookie('jwt')
    res.clearCookie('uid')
    req.session.destroy()
    res.redirect('/')
})
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})