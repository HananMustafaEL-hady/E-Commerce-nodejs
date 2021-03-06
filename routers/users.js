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
   const{ id}= req.params
    const user =  await User.findOne({_id:id});
     res.send(user);
    }
)



routerUser.patch('/address/', async(req, res) => {

    try {
        const {address }= req.body;
        console.log(address);

        const { authorization } = req.headers;
        console.log(authorization)

        const Data = jwt.verify(authorization, 'secret_sign');
        console.log(Data);
        const user = await User.findOneAndUpdate({ _id: Data.id},{address:address})
      //  res.send(user);
      console.log(user);
      res.status(200).json(user);

    } catch (err) {
        res.status(400).json({ success: false })
    }

})


routerUser.patch('/name/', async(req, res) => {

    try {
        console.log("ddddd");
        // const { id } = req.params;
        const {fname,lname} = req.body;
        console.log(req.body);
console.log(fname ,lname);

     //   const address = req.body.address;

        const { authorization } = req.headers;
        const Data = jwt.verify(authorization, 'secret_sign');
        const user = await User.findOneAndUpdate({_id: Data.id},{ firstName:fname,lastName: lname})
        res.status(200).json(user);
    } catch (err) {
        res.statusCode = 401;
        res.json({ success: false })
    }
})






routerUser.patch('/email/', async(req, res) => {

    try {
        const {email }= req.body;
        console.log(email);

        const { authorization } = req.headers;
        console.log(authorization)

        const Data = jwt.verify(authorization, 'secret_sign');
        console.log(Data);
        const user = await User.findOneAndUpdate({ _id: Data.id},{email:email})
      //  res.send(user);
      console.log(user);
      res.status(200).json(user);

    } catch (err) {
        res.status(400).json({ success: false })
    }

}
)


 module.exports = routerUser;