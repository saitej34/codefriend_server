const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        required:false
    },
    college:{
        type:String,
        required:false
    },
    sbio:{
        type:String,
        required:false
    },
    linkdeinprofile:{
        type:String,
        required:false
    }
})

const model = mongoose.model("users",schema);

module.exports = model;