import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    location:{
        type: String,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})


const UserSchema = mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default:"../Utils/woman.webp"
    },
    reviews:{
        type:[ReviewSchema],
        default:[]
    }
})

const User = mongoose.model("User",UserSchema)

export default User