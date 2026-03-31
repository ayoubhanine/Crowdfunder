import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:6,
    },
    role:{
        type:String,
        enum:["investor","owner","admin"],
        default:"investor",
    },
    balance:{      //Seulement pour investor
        type:Number, 
        default:0,
    },
},
{
    timestamps:true,
}
);
const User=mongoose.model("User",userSchema)
export default User;