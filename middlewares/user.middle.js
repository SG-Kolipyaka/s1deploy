const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        try{
            const decode=jwt.verify(token,"wwe")
            if(decode){
                req.body.author=decode.author
                req.body.autherId=decode.autherId
                next()
            }else{
                res.status(200).send({"msg":"Please Login"}) 
            }
        }catch(er){
            res.status(200).send({"msg":er.message}) 
        }
    }else{
        res.status(200).send({"msg":"Please Login"}) 
    }
}


module.exports={
    auth
}