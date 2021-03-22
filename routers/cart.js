const express = require('express');
const Cart = require('../models/cart');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cart = require('../models/cart');
const UserAuth=require('../middleware/authUser');
const routercart = new express.Router();
controllersMenu=require('../controllers/products');

//6 Create new todo 


routercart.post('/', UserAuth,controllersMenu.postcart);
//7 Return the carts of specific user 
routercart.get('/', UserAuth,controllersMenu.getcart);

//9 Edit  cart count

routercart.patch('/:id', UserAuth,controllersMenu.patchcount);

//10 delete cart 
routercart.delete('/:id', UserAuth,controllersMenu.deletecart);
routercart.delete('/',UserAuth,controllersMenu.deleteAllcart);
module.exports = routercart;



