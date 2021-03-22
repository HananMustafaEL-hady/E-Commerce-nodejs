const mongoose = require("mongoose");
const uerR = require("./user");
const MenuR = require("./menu");
const Schema = mongoose.Schema;

const Orderschema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [
    {
      
      
      menuid:{

        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",

      },
      count:{
        type:Number,
        default:1
      }
    
    
    }
    //{
    //   quantity: {
    //     type: Number,
    //     // required: true,
    //     default: 1,
    //   },
    //   price: {
    //     type: Number,
    //     // required: true,
    //   },
    //   name:{
    //     type: String,
    //     // required: true,
    //   }
    //  },
  ],

  Order_Placed_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // total_Price:{
  //     type:Number,
  //     // required:true

  // },

  Order_delivered_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  order_status: {
    type: String,
    enum: ["accepted ", "pending", "rejected"],
    default: "pending",
  },
});

const order = mongoose.model("order", Orderschema);
module.exports = order;

//export const todo = Todoschema.discriminator('todo', muser);
