const express=require("express")
const connection=require("./connection/connect")
const bcrypt = require('bcrypt');
const { UserModel } = require("./models/UserModel");
var jwt = require('jsonwebtoken');
const { authenticate } = require("./middlewares/authenticate");

const cors = require('cors');
const { BlogModel } = require("./models/BlogModel");


const app=express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Base api")
})

// Login and Signup

app.post("/signup",async(req,res)=>{
    const {name,email,mobile,password}=req.body
     bcrypt.hash(password, 5, async function(err, hash) {
       await  UserModel.create({name,email,mobile,password:hash,})
       res.send("Signed up Succesfully")
    });

   
})


app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})
    const hash=user.password
    if(user){
        bcrypt.compare(password, hash, async function(err, result) {
            // result == true
            if(result){
                var token = jwt.sign({ userid:user._id }, 'shhhhh');
                res.send({msg:"Logged in Succesfully",token:token})
            }
            else{
                res.send("Wrong password")
            }
        });
    }else{
        res.send("Sign up first")
    }
  
})

// Crud api part

app.use(authenticate)

app.get("/blog",async (req,res)=>{
const data=await BlogModel.find(req.query)
    res.send({data})
})


app.post("/blog/add",async (req,res)=>{
    const {title,image,author,blog}=req.body
    const userid=req.userid
    console.log(userid)
    try{
await BlogModel.create({title,image,author,blog,userid})
res.send("Blog Created Sucessfully")
    }catch(err){
        console.log(err)
        res.send("Error in Creating")
    }

})

app.put("/blog/edit/:id",async (req,res)=>{
  const {id}=req.params
  const userid=req.userid
 const {title,image,author,blog}=req.body
//  console.log(status)
 try{
    if(id===userid){
await BlogModel.findByIdAndUpdate(id,{title,image,author,blog})
res.send("Edited Succesfully")

    }else{
        res.send("Not Authorised")
    }
 }catch(err){
    console.log(err)
    res.send("Not edited")
 }

})


app.delete("/blog/:id",async (req,res)=>{
    const {id}=req.params
    
    const userid=req.userid
    console.log(userid)
    console.log(id)
   try{
      if(id===userid){
  await BlogModel.findByIdAndDelete(id)
  res.send("Deleted Succesfully")
  
      }else{
          res.send("Not Authorised")
      }
   }catch(err){
      console.log(err)
      res.send("Not Deleted")
   }
  
  })

app.listen(8080,async()=>{
try{
await connection
console.log("Listening to port 8080")
}catch(err){
    console.log(err)
    console.log("Unable to connect")
}
})