const {Router}=require("express")
const {PostModel}=require("../model/post.model")


const postRouter=Router()

postRouter.post("/create",async(req,res)=>{
    try{
        const posts=new PostModel(req.body)
        await posts.save()
        res.status(200).send({"msg":"Uploaded Post Successfully","post":posts})
    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})

postRouter.get("/",async(req,res)=>{
    const {device}=req.query
    const {autherId}=req.body
    const query={}
    if(autherId){
        query.autherId=autherId
    }
    if(device){
        query.device=device
    }
    // {autherId:req.body.autherId,device:device}
    try{
        const posts=await PostModel.find(query)
        res.status(200).send(posts) 

    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})


postRouter.patch("/update/:postId",async(req,res)=>{
    const {postId}=req.params
    const posts=await PostModel.findOne({_id:postId})
    try{
if(req.body.autherId!==posts.autherId){
    res.status(200).send({"msg":"You are not authorized Person"}) 
}else{
    await PostModel.findByIdAndUpdate({_id:postId},req.body)
    res.status(200).send({"msg":"Data Updated Successfully"})
}
    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})


postRouter.delete("/delete/:postId",async(req,res)=>{
    const {postId}=req.params
    const posts=await PostModel.findOne({_id:postId})
    try{
if(req.body.autherId!==posts.autherId){
    res.status(200).send({"msg":"You are not authorized Person"}) 
}else{
    await PostModel.findByIdAndDelete({_id:postId},req.body)
    res.status(200).send({"msg":"Data Deleted Successfully"})
}
    }catch(er){
        res.status(400).send({"msg":er.message})
    }
})



module.exports={
    postRouter
}