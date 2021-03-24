const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    lastName:{
        type: String,
        required: [true, 'you must enter user name'],
        // unique: true,
        minlength: 3,
        maxlength: 15,

    },
    profileImage:{},
    firstName: {
        type: String,
        required: [true, 'you must enter user name'],
        // unique: true,
        minlength: 3,
        maxlength: 15,

    },
    password: {
        type: String,
        required: [true, 'you must enter password '],
        minlength:8
    },
    
    gender: {type:String },
    address:{
        type:String,
        required:true
    },
    email:{
    type:String,
    unique:true,
    required:true

    },
    phone:{
type:Number,
// required:true

//match:/^(0[0-2]{2}[0-9]{8})$/
    },
    img:{
        
    type:String  
 },
    role:{
        type:String
    },
    // status: {
    //     type: String, 
    //     enum: ['Pending', 'Active'],
    //     default: 'Pending'
    //   },

    //   confirmationCode: { 
    //     type: String, 
    //     unique: true },

    image:{

    }
});

const user = mongoose.model('user', schema);
module.exports = user;