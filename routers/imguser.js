// const multer = require("multer");
// const Img = require("../models/imguser");
// const User =require("../models/user");
// var jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const path = require("path");
// const crypto = require("crypto");
// const mongoose = require("mongoose");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
// var mongo = require("mongodb");
// const multerStorage = multer.memoryStorage();
// const sharp = require("sharp");
// var mongo = require("mongodb");

// const adminAuth=require('../middleware/authAdmin');
// const userAuth=require('../middleware/authUser');
// const Menu=require('../models/menu');

// // app.use(function (req, res, next) {
// //   res.header("Access-Control-Allow-Origin", "*");
// //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
// //   res.header(
// //     "Access-Control-Allow-Headers",
// //     "Origin, X-Requested-With, Content-Type, Accept"
// //   );
// //   next();
// // });

// const mongoURI =require('../DBurl');
// let conn = mongoose.connection;
// var gfs;

// conn.once("open", () => {
//   //initialize our stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("imageUpload");
// });

// let storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
  
//     return new Promise((resolve, reject) => {
//       console.log(file);

//       const fileInfo = {
//         filename: file.originalname,
//         bucketName: "imageUpload",
//       };
//       resolve(fileInfo);
//     });
//   },
// });
// ///////////////////////////////////////////////////////////////////////////////////////////////

// const upload = multer({ storage });
// routerimg.post("/:id",upload.single("upload"), async (req, res) => {
//   try {

//     const {img_upload} = req.file;
//     console.log(img_upload);
//     // const { authorization } = req.headers;
//     // console.log(authorization);
//     const {id} =req.params;
//      console.log(id);
//     //  const decodedToken = jwt.verify(authorization,"secret_admin");
//     //  console.log(decodedToken);
//     const img = await Img.create({
//     menuid: id,
//       upload: img_upload,
//     });
//      console.log(img);
//    //let menu = await Menu.findOneAndUpdate({ _id:id}, { upload: img.upload });
//   // console.log(menu);
//     res.status(200).send(img);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });


// ///////////////////////////////////////////////////////////////////////////////////////////////


// routerimg.get('/:id',async(req, res) => {
//   try {
//      const { id } = req.params;
//     //  console.log(id);
//     // console.log(id);

//     gfs.collection("imageUpload");

//     console.log(id);
//       if(Img.find({menuid:id})){
      
//           if (! gfs.imageUpload.files ||  gfs.imageUpload.files.length == 0) {
//             return res.status(404).json({
//               err: "No files exist",
//             });
//           }
//           if (gfs.imageUpload.files.contentType === "image/jpeg" ||  gfs.imageUpload.files.contentType === "img/png") {
//             const readStream = gfs.createReadStream(gfs.imageUploadfiles.filename);
//             readStream.pipe(res);

//           } else {
//             res.status(404).json({
//               err: "Not an image",
//             });
//           }        
//       }

//   } catch (err) {
//       res.statusCode = 422;
//       res.send(err);

//   }

// });
// routerimg.get('/show/:filename', (req, res) => {
//   console.log(req.params.filename)
//   gfs.files.find({ filename: req.params.filename }).toArray((err, file) => {
//       console.log(file[0])
//       if (!file[0] || file[0].length === 0) {
//           return res.status(404).send({ err: 'No file exists' })
//       }
//       if (file[0].contentType === 'image/jpeg' || file[0].contentType === 'img/png') {
//           // read output
//           const readstream = gfs.createReadStream(file[0].filename);
//           readstream.pipe(res)
//       } else {
//           res.status(404).send({ err: 'No and image' })
//       }
//   })
// })
// routerimg.delete('/delete/:_id', (req, res) => {
//   let { _id } = req.params;
//   gfs.remove({ _id, root: 'uploads' }, (err, gridStore) => {
//       if (err) {
//           return res.status(404).send({ err })
//       }
//       res.status(200).send({ success: true, message: "Image was deleted successfully" })
//   })
// })



// module.exports = routerimg;




// return new Promise((resolve, reject) => {
//   crypto.randomBytes(16, (err, buf) => {
//     if (err) {
//       return reject(err);
//     }
//     // + path.extname(file.originalname);
//     const filename = buf.toString('hex')
//     const fileInfo = {
//       filename: filename,
//       bucketName: 'uploads'
//     };
//     resolve(fileInfo);
//   });
// });








///////////////////////////////////////////////////////////////////////////////////////////////////////





const express = require("express");
const app = express();
app.use(express.static("public"));
//const express = require('express');
const mongoose = require('mongoose');
// const router =  new express.Router();
// const config = require('../config');
const crypto = require('crypto');
const path = require('path')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const User = require('../models/user')
const Image = require('../models/imguser')
const ImageChunk = require('../models/imageChunkModel')
const Product = require('../models/menu');
 const connection = require('../connection');
 const adminAuth=require('../middleware/authAdmin');
 const authUser = require('../middleware/authUser');
 const routerimg = new express.Router();





const storage = new GridFsStorage({
    url: "mongodb+srv://sayed:sa12345@mynode.qhp5b.mongodb.net/DB?retryWrites=true&w=majority",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
})
const upload = multer({ storage });
let gfs;
connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo)
    gfs.collection('uploads')
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST the profile image
routerimg.post('/user', authUser, upload.single('image'), async (req, res) => {
    try {
        console.log("Uploading ...... ")
        let { filename } = req.file;
        let { _id } = req.signedata;
        let image = await Image.findOne({ filename: req.file.filename });
        let date = new Date(image.uploadDate)
        console.log(image)
        // let userOld = await User.findOne({_id});
        // if(userOld.profileImage.length >= 0){
        //     let imageOld = await Image.find({filename:userOld.profileImage})
        // }
        let user = await User.findOneAndUpdate({ _id }, { profileImage: image.filename }, {
            new: true
        }).exec()
        console.log('TIME NOW: ', date.getHours() - 12, ':', date.getMinutes())
        res.status(200).send({ user, image, message: "Uploaded successfully", success: true })
    } catch (error) {
        res.status(404).send({ error, message: "Unable to upload", success: false })
    }
})

// POST the product image
routerimg.post('/product/:productId', upload.single('image'), async (req, res) => {
    try {
        console.log("Uploading ...... ")
        console.log(req)
        let { filename } = req.file;
        console.log(filename)
        let { productId } = req.params;
        console.log(productId)
        let image = await Image.findOne({ filename: req.file.filename });
        let date = new Date(image.uploadDate)
        console.log(image)
        let product = await Product.findOneAndUpdate({ _id:productId }, { image: image.filename }, {
            new: true
        }).exec()
        console.log(product)
        console.log('TIME NOW: ', date.getHours() - 12, ':', date.getMinutes())
        res.status(200).send({ product, image, message: "Uploaded successfully", success: true })
    } catch (error) {
        res.status(404).send({ error, message: "Unable to upload", success: false })
    }
})

//To get and show any image
routerimg.get('/show/:filename', (req, res) => {
    console.log(req.params.filename)
    gfs.files.find({ filename: req.params.filename }).toArray((err, file) => {
        console.log(file[0])
        if (!file[0] || file[0].length === 0) {
            return res.status(404).send({ err: 'No file exists' })
        }
        if (file[0].contentType === 'image/jpeg' || file[0].contentType === 'img/png') {
            // read output
            const readstream = gfs.createReadStream(file[0].filename);
            readstream.pipe(res)
        } else {
            res.status(404).send({ err: 'No and image' })
        }
    })
})

// routerimg.delete('/delete/:_id', authenticate, (req, res) => {
//     let { _id } = req.params;
//     gfs.remove({ _id, root: 'uploads' }, (err, gridStore) => {
//         if (err) {
//             return res.status(404).send({ err })
//         }
//         res.status(200).send({ success: true, message: "Image was deleted successfully" })
//     })
// })





module.exports = routerimg;