const express = require('express');
const User = require('../models/user');
const routerUser = new express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserAuth=require('../middleware/authUser');
const admincontrollers=require('../controllers/controllersauth');



routerUser.post('/', async(req, res) => {
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
             ,role:"user"});

       res.statusCode = 201;
        res.send(user);
    } catch (err) {
        res.statusCode = 422;
        res.send(err);
    }
});
 //2 login user



 routerUser.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const userlogin = await User.findOne({ email: email })
        if (!userlogin) throw " wrong email or passowrd";
        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (!isMatch) throw " wrong email or passowrd";
    token = jwt.sign({ id: userlogin._id }, 'secret_sign');
     res.json({"token":token});

    } catch (error) {
        console.log(error);
        res.statusCode = 401;
        res.json(error);

    }

});

//get user

routerUser.get('/',UserAuth,admincontrollers.getuser);

//4 delete admin
routerUser.delete('/', UserAuth,admincontrollers.deleteuser);
 
// //5  edit admin name 
// routerUser.patch('/name/',UserAuth,admincontrollers.patchname);
    
//     //5 edit admin address
// routerUser.patch('/address/',UserAuth,admincontrollers.patchaddress);
    
//     // edit admin phone    
// routerUser.patch('/phone/',UserAuth,admincontrollers.patchphone);

//     // edit admin password
// routerUser.patch('/password/',UserAuth,admincontrollers.patchpassword);


routerUser.get('/:id',async (req, res) => { 
    id: req.params
    const user =  await User.findOne({_id:id});
     res.send(user);
    }
)



routerUser.patch('/address/', async(req, res) => {

    try {
        // const { id } = req.params;
        const address = req.body.address;
        console.log(address)

     //   const address = req.body.address;

        const { authorization } = req.headers;
        const Data = jwt.verify(authorization, 'secret_sign');
        const user = await User.findOneAndUpdate({
            _id: Data.id,
        }, { address: address}, function(err, user) {
            if (err) return handleError(err);

            res.send(`${user} user was edited successfully`);
        })
        res.send(user);
    } catch (err) {
        res.statusCode = 401;
        res.json({ success: false })
    }
})


 module.exports = routerUser;