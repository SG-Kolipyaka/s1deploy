const {UserModel}=require("../model/user.model")

const {Router}=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    
    try{
        const finduser=await UserModel.findOne({email})
        if(finduser){
            res.status(200).send({"msg":"User already Registered Please Login"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                const user=UserModel({name,email,gender,password:hash})
                await user.save()
                res.status(200).send({"msg":"User Registered Successfully"})
            })
        }
    }catch(er){
        res.status(200).send({"msg":er})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const finduser=await UserModel.findOne({email})
        if(finduser){
            bcrypt.compare(password, finduser.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({author:finduser.name,autherId:finduser._id},"wwe");
                   res.status(200).send({"msg":"Login Successfully","token":token})
                }else{
                    res.status(200).send({"msg":"Wrong Credential"}) 
                }
            })
        }else{
            res.status(200).send({"msg":"Wrong Credential"}) 
        }
    }catch(er){
        res.status(400).send({"msg":er.message}) 
    }
})

module.exports={
    userRouter
}