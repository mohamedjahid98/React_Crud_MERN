const mongoose=require('mongoose')

const SignupSchema= new mongoose.Schema({
    username:String,
    email: { type: String, unique: true },
    password:String,
    confirmpassword:String,
})

const SignupModel =mongoose.model("Signup",SignupSchema)
module.exports=SignupModel