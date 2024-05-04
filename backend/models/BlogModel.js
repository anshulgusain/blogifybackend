const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true,},
    author:{type:String,required:true}, 
    blog:{type:String,required:true}, 
    userid:{type:String,required:true},
})

const BlogModel=mongoose.model("blogs",blogSchema)

module.exports={
    BlogModel
}