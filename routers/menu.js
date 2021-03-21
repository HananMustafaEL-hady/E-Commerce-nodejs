const express = require('express');
const adminAuth=require('../middleware/authAdmin');
const routerMenu = new express.Router();
controllersMenu=require('../controllers/products');

//to add new menu by admin
routerMenu.post('/', adminAuth,controllersMenu.postmenu);

//to get all
routerMenu.get('/', controllersMenu.getmenu);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//9 Edit menu 

routerMenu.patch('/description/:id', adminAuth,controllersMenu.patchdescription);

routerMenu.patch('/name/:id', adminAuth,controllersMenu.patchName);

routerMenu.patch('/price/:id' ,adminAuth,controllersMenu.patchPrice);

routerMenu.delete('/:id',adminAuth,controllersMenu.deleteMenu);

module.exports = routerMenu;