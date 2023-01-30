const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

const RegisterModel = mongoose.model("laudryRegister", RegisterSchema);

module.exports = RegisterModel;