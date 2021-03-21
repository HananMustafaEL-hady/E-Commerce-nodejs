const express = require('express');
const Admin = require('../models/user');
const routeradmin = new express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const adminAuth=require('../middleware/authAdmin');
const admincontrollers=require('../controllers/controllersauth');
///////endpoint only
routeradmin.post('/', async(req, res) => {
    console.log(req.body);
    try {

        firstName=req.body.firstName;
        lastName=req.body.lastName;
        email=req.body.email;
        password=req.body.password;
        address=req.body.address;
        gender=req.body.gender;
        phone=req.body.phone;

        const hash = await bcrypt.hash(password, 7);
        const user = await User.create({ 
            firstName:firstName, 
            lastName:lastName,
            email:email,
            password: hash,
             address:address
             ,phone:phone
             ,gender:gender
             ,role:"admin"});

       res.statusCode = 201;
        res.send(user);
    } catch (err) {
        res.statusCode = 422;
        res.send(err);
    }
});
//get user
routeradmin.get('/',adminAuth,admincontrollers.getuser);

//4 delete admin
routeradmin.delete('/', adminAuth,admincontrollers.deleteuser);
 
//5  edit admin name 
routeradmin.patch('/name/',adminAuth ,admincontrollers.patchname);
    
    //5 edit admin address
routeradmin.patch('/address/',adminAuth ,admincontrollers.patchaddress);
    
    // edit admin phone    
routeradmin.patch('/phone/',adminAuth ,admincontrollers.patchphone);

    // edit admin password
 routeradmin.patch('/password/',adminAuth ,admincontrollers.patchpassword)



 routeradmin.post('/login/', async(req, res) => {
    try {
        const { email, password } = req.body;
        const userlogin = await Admin.findOne({ email: email })
        if (!userlogin) throw " wrong email or passowrd";
        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (!isMatch) throw " wrong email or passowrd";
         if(userlogin.role!="admin") throw " wrong email or passowrd";
    token = jwt.sign({ id: userlogin._id }, 'secret_admin');

     res.json({ "token":token,"role":userlogin.role });
            // res.json(` ${token} ${userlogin.role }`);

    } catch (error) {
        console.log(error);
        res.statusCode = 401;
        res.json(error);

    }
  
});

module.exports = routeradmin;