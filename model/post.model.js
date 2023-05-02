const mongoose=require("mongoose")

const PostSchema=mongoose.Schema({
    title : {type:String,require:true},
body : {type:String,require:true},
device: {type:String, enum:["PC", "TABLET", "MOBILE"],require:true},
autherId:{type:String},
author:{type:String}
},{
    versionKey:false
})

const PostModel=mongoose.model("post",PostSchema)

module.exports={
    PostModel
}