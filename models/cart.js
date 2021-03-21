const mongoose = require('mongoose');
const uerR = require('./user');
const MenuR=require('./menu');
Schema = mongoose.Schema;
const cartchema = new mongoose.Schema({
    userid: {
        type:Schema.ObjectId,
        ref: "userR",
        required:true
    },
    Menucart: [
        {
        type: Schema.ObjectId,
        ref: "MenuR",
        required:true

    }],
   
    count:{
        type:Number,
        required:true
    },
    menuName:{
        type:String,
     required:true
    },
    price:{
        type:Number,
        required:true
    }
    

});

const  cart = mongoose.model('cart', cartchema);
module.exports = cart;

