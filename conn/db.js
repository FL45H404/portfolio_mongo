const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://vipul:Vipul@1997@cluster0.zpemt.mongodb.net/portfolio?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log('connection succesull'))
.catch((err)=>console.log(err))