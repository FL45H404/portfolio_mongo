var mongoose=require('mongoose')
const ProjectSchema=new mongoose.Schema({
title:{
    type:String,
    require:true
},
description:{
type:String,require:true
},
img:{
    type:String
},
link:{
    type:String
}
},{timestamps:true})

const Project=new mongoose.model('Project',ProjectSchema)
module.exports=Project;