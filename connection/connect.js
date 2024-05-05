const mongoose=require("mongoose")
require('dotenv').config()
// console.log(process.env.PASSWORD)
const connection=mongoose.connect(`mongodb+srv://anshulgusain99:${process.env.PASSWORD}@cluster0.vwiwavz.mongodb.net/dashify`)

module.exports={
    connection
}