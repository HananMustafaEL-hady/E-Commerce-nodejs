const express = require('express');
const routerMenu = new express.Router();
const adminAuth=require('../middleware/authAdmin');
ontrollersMenu=require('../controllers/products');

//to add new menu by admin
routerMenu.post('/', adminAuth,controllersMenu.postmenuoffers);

//to get all
routerMenu.get('/', controllersMenu.getmenuoffers);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//9 Edit menu 

routerMenu.patch('/description/:id', adminAuth,controllersMenu.patchdescriptionoffers);

routerMenu.patch('/name/:id', adminAuth,controllersMenu.patchNameoffers);

routerMenu.patch('/price/:id' ,adminAuth,controllersMenu.patchPriceoffers);

routerMenu.delete('/:id',adminAuth,controllersMenu.deleteMenuoffers);



module.exports = routerMenu;