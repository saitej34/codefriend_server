const mongoose = require('mongoose')

const adsc = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

const adschema = mongoose.model('admins',adsc);

module.exports = adschema;