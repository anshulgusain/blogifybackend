const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://anshulgusain99:tchLqjY7Dinyb9tX@cluster0.vwiwavz.mongodb.net/dashify")

module.exports={
    connection
}