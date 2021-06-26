require('dotenv').config()
const mongoose=require('mongoose')
mongoose.connect(process.env.URL,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log('connection succesull'))
.catch((err)=>console.log(err))