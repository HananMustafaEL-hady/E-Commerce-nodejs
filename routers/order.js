const express = require('express');
const Order = require('../models/order');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const routerOrder = new express.Router();
const UserAuth=require('../middleware/authUser');
const adminAuth=require('../middleware/authAdmin');
Menu =require("../models/menu");


//6 Create new order
routerOrder.post('/',UserAuth, async(req, res) => {
  
    const items = req.body;
    const order = await Order.create({ userid: req.signedata.id,items:items});
     res.json({ order});
       
})

//  Return the Order of specific user 
routerOrder.get('/user',UserAuth, async(req, res) => {

        const order = await Order.find({userid: req.signedata.id }).populate('items._id');
        res.statusCode = 201;
        res.send(order);
});
//  Return the all Orders

routerOrder.get('/admin',async(req, res) => {
      const order = await Order.find({});
        res.statusCode = 201;
        res.send(order);
    
});




// //9 Edit todo 

routerOrder.patch('/s/:id', adminAuth,(req, res) => {
    const { id } = req.params;
    const order_status  = req.body;
     Order.findOneAndUpdate({_id:id},{order_status:order_status}, function(err, order) {
                if (err) throw "errorrrrrrr";
                res.send(order);
            })
           

 });

//10 delete order
routerOrder.delete('/:id',adminAuth ,(req, res) => {
    const { id } = req.params;
    
    Order.deleteOne({ _id: id, userid:req.signedata.id}, function(err) {
        if (err) return handleError(err);
        else res.send({ success: true })
    });

})

module.exports = routerOrder;