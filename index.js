const express=require("express")
const app=express()
const cors = require('cors')
require('dotenv').config()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.route")
const {auth}=require("./middlewares/user.middle")
const {postRouter}=require("./routes/post.route")
app.use(express.json())

app.use(cors())

app.use("/users",userRouter)

//Private Routes
app.use(auth)
app.use("/posts",postRouter)

//

app.listen(process.env.PORT,async()=>{
    try{
await connection
console.log("connected to DB")
    }catch(er){
console.log(er)
    }
    console.log(`server running at ${process.env.PORT}`)
})