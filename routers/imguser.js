const multer = require("multer");
const Img = require("../models/imguser");
const User =require("../models/user");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
var mongo = require("mongodb");
const multerStorage = multer.memoryStorage();
const sharp = require("sharp");
var mongo = require("mongodb");
const express = require("express");
const app = express();
app.use(express.static("public"));
const adminAuth=require('../middleware/authAdmin');
const userAuth=require('../middleware/authUser');

const routerimg = new express.Router();
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const mongoURI =require('../DBurl');
let conn = mongoose.connection;
var gfs;

conn.once("open", () => {
  //initialize our stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("imageUpload");
});

let storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
  
    return new Promise((resolve, reject) => {
      console.log(file);

      const fileInfo = {
        filename: file.originalname,
        bucketName: "imageUpload",
      };
      resolve(fileInfo);
    });
  },
});
///////////////////////////////////////////////////////////////////////////////////////////////

const upload = multer({ storage });
routerimg.post("/:id",upload.single("upload"), async (req, res) => {
  try {

    const {img_upload} = req.file;
    console.log(img_upload);
    // const { authorization } = req.headers;
    // console.log(authorization);
    const {id} =req.params;
     console.log(id);
    //  const decodedToken = jwt.verify(authorization,"secret_admin");
    //  console.log(decodedToken);
    const img = await Img.create({
    menuid: id,
      upload: img_upload,
    });
    // console.log(img);
   // let user = await User.findOneAndUpdate({ _id:id}, { profileImage: img.upload });
    // console.log(user);

    res.status(200).send(img);
  } catch (err) {
    res.status(500).send(err);
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////
routerimg.get('/:id',async(req, res) => {
  try {
     const { id_params } = req.params;
      // const { authorization } = req.headers;
      // const Data = jwt.verify(authorization,'secret_admin');
    // img=Img.find({userid: Data.id });
      if(Img.find({menuid:id_params})){
      //  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
          //check if files exist
          if (!file || file.length == 0) {
            return res.status(404).json({
              err: "No files exist",
            });
          }
          //check if image
          if (file.contentType === "image/jpeg" || file.contentType === "img/png") {
            //read output to browser
            const readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
            // res.send(img);

          } else {
            res.status(404).json({
              err: "Not an image",
            });
          }
        //});
        
      }

  } catch (err) {
      res.statusCode = 422;
      res.send(err);

  }

});
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
routerimg.delete('/delete/:_id', (req, res) => {
  let { _id } = req.params;
  gfs.remove({ _id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
          return res.status(404).send({ err })
      }
      res.status(200).send({ success: true, message: "Image was deleted successfully" })
  })
})



module.exports = routerimg;




return new Promise((resolve, reject) => {
  crypto.randomBytes(16, (err, buf) => {
    if (err) {
      return reject(err);
    }
    // + path.extname(file.originalname);
    const filename = buf.toString('hex')
    const fileInfo = {
      filename: filename,
      bucketName: 'uploads'
    };
    resolve(fileInfo);
  });
});