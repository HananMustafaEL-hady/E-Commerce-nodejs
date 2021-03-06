const express = require('express');
const Order = require('../models/order');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const routerOrder = new express.Router();
const UserAuth=require('../middleware/authUser');
const adminAuth=require('../middleware/authAdmin');
const authUser = require('../middleware/authUser');
const routerUser = require('./users');
Menu =require("../models/menu");


//6 Create new order
routerOrder.post('/',UserAuth, async(req, res) => {
  
    const items = req.body;
    console.log({items})
    const order = await Order.create({ userid: req.signedata.id,items:items});
    console.log(order);
     res.json({ order});

       
})

//  Return the Order of specific user 
routerOrder.get('/user',UserAuth, async(req, res) => {

        const order = await Order.find({userid:req.signedata.id }).populate('items.menuid');
      //  const orderwithout = await Order.find({userid:req.signedata.id });

        //console.log(order[1].items);       

        // console.log(orderwithout[1].items);

        res.statusCode = 201;
        res.send(order);
});
//  Return the all Orders



routerOrder.get('/admin',async(req, res) => {
      const order = await Order.find({}).populate('items.menuid');
        res.statusCode = 201;
        res.send(order);
    
});




// //9 Edit order

routerOrder.patch('/:id',async(req, res) => {

    const { id } = req.params;
    console.log(id);
    const {order_status } = req.body;
    console.log(req.body);
  const order= await Order.findOneAndUpdate({_id:id},{order_status:order_status});
     res.json({order});
 }
 );

//10 delete order
routerOrder.delete('/:id',adminAuth ,(req, res) => {
    const { id } = req.params;
    
    Order.deleteOne({ _id: id, userid:req.signedata.id})
}
)


//10 delete order
routerOrder.delete('/user/:id' ,async(req, res) => {
    const {id  }= req.params;
    console.log(id);
    const orderuser= await Order.findOne({_id: id});
    console.log(orderuser.order_status);

    if(orderuser.order_status!="accepted") {
        await Order.deleteOne({_id:id})
        res.send(id);

    }
    else{
        res.send("false");
    }

})

// routerOrder.patch('/price',async(req, res) => {
//     const {total_price}= req.params;
//     console.log(total_price);
//     const orderuser= await Order.findOneAndUpdate({total_price:total_price});
//     res.send(orderuser);
// }
// )



module.exports = routerOrder;