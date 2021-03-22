const express = require('express');
const User = require('../models/user');
const routerUser = new express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserAuth=require('../middleware/authUser');
const admincontrollers=require('../controllers/controllersauth');

routerUser.post('/', admincontrollers.postuser);


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
 
//5  edit admin name 
routerUser.patch('/name/',UserAuth,admincontrollers.patchname);
    
    //5 edit admin address
routerUser.patch('/address/',UserAuth,admincontrollers.patchaddress);
    
    // edit admin phone    
routerUser.patch('/phone/',UserAuth,admincontrollers.patchphone);

    // edit admin password
routerUser.patch('/password/',UserAuth,admincontrollers.patchpassword);


routerUser.get('/:id',async (req, res) => { 
    id: req.params
    const user =  await User.findOne({_id:id});
     res.send(user);
    }
)



 module.exports = routerUser;