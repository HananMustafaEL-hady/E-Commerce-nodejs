const mongoose = require('mongoose');
const uerR = require('./user');
const MenuR=require('./menu');
Schema = mongoose.Schema;
const cartchema = new mongoose.Schema({
    userid: {
        // type:Schema.ObjectId,
        // ref: "user",
        // required:true
    },
    menuid: 
        {
        // type: Schema.ObjectId,
        // ref: "menu",
        // required:true

    },
   
    count:{
        type:Number,
        required:true
    },
    
    price:{type:Number},
    menuname:{type:String},
});

const  cart = mongoose.model('cart', cartchema);
module.exports = cart;

