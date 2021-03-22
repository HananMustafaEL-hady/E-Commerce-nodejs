const User = require('../models/user');
const admin=require('../models/admin');

exports.postuser=(req, res) => {
    console.log(req.body);
    try {

        password=req.body.password;
       
        const hash =  bcrypt.hash(password, 8);
        const user =  User.create({ 
            firstName:req.body.firstName, 
            lastName:req.body.lastName,
            email:req.body.email,
            password: hash,
             address:req.body.address
             ,phone:req.body.phone
             ,gender:req.body.gender
             ,role:"admin"});

       res.statusCode = 201;
        res.send(user);
    } catch (err) {
        res.statusCode = 422;
        res.send(err);
    }
}
exports.getuser=async (req, res) => { 
    const user =  await User.findOne({ _id: req.signedata.id },{password:0});
     res.send(user);
    }
    

    exports.patchname=(req, res) => {
        const usrename = req.body.usrename;
         const user = User.findOneAndUpdate({ _id: req.signedata.id}, { usrename: usrename})
        res.send(`${user} user was edited successfully`);
             }



exports.patchaddress=(req, res) => {
    const usrename = req.body.address;
     const user = User.findOneAndUpdate({ _id: req.signedata.id}, { address: address})
    res.send(`${user} user was edited successfully`);
         }

exports.patchphone=(req, res) => {
    const phone = req.body.phone;
     const user =  User.findOneAndUpdate({ _id: req.signedata.id}, { phone: phone})
     if(user){
        res.send(`${user} user was edited successfully`);

     }
     else{
        res.send("not found");

     }
     }

exports.patchemail=(req, res) => {
    const phone = req.body.phone;
     const user =  User.findOneAndUpdate({ _id: req.signedata.id}, { phone: phone})
     if(user){
        res.send(`${user} user was edited successfully`);

     }
     else{
        res.send("not found");

     }
     }

exports.patchpassword=(req, res) => {
    const password = req.body.password;
    const hash =  bcrypt.hash(password, 8);

     const user =  User.findOneAndUpdate({ _id: req.signedata.id}, { password:hash})
     if(user){
        res.send(`${user} user was edited successfully`);

     }
     else{
        res.send("not found");

     }
     }





     exports.deleteuser=
     (req, res) => {
         User.deleteOne({ _id:  req.signedata.id })
             res.json({ success: true })
           
     }


    











// const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// let token = '';
// for (let i = 0; i < 25; i++) {
//     token += characters[Math.floor(Math.random() * characters.length )];
// }

// user.save((err) => {
//     if (err) {
//       res.status(500).send({ message: err });
//            return;
//         }
//        res.send({
//            message:
//              "User was registered successfully! Please check your email",
//         });

//       nodemailer.sendConfirmationEmail(
//          user.username,
//          user.email,
//          user.confirmationCode
//   );
// });


// exports.verifyUser = (req, res, next) => {
//     User.findOne({
//       confirmationCode: req.params.confirmationCode,
//     })
//       .then((user) => {
//         if (!user) {
//           return res.status(404).send({ message: "User Not found." });
//         }
  
//         user.status = "Active";
//         user.save((err) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//         });
//       })
//       .catch((e) => console.log("error", e));
//   };