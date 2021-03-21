const express = require('express');
const app = express();
const mongoose = require('mongoose');



const MongoClient = require('mongodb').MongoClient;
const url_node='mongodb+srv://sayed:sa12345@mynode.qhp5b.mongodb.net/DB?retryWrites=true&w=majority';
// const uri = "mongodb+srv://<username>:<password>@mynode.qhp5b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url_node, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




// const url_node = 'mongodb+srv://sayed:sa12345@mynode.qhp5b.mongodb.net/Restaurant?retryWrites=true&w=majority';

// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(url_node, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(collection)
//   // perform actions on the collection object
//   client.close();
// });




// mongoose.connect(url, {useNewUrlParser: true});

mongoose.connect(process.env.MONGO_DB ||MONGO_DB,
 {
   // dbName : 'DB',

     useNewUrlParser: true,
     useCreateIndex:true,
  useUnifiedTopology: true
    
    }).then((result)=>
     {
         //app.listen(3000, () => {
    //     console.log("server listening on port 3000");
    // });
        console.log({result})
        console.log("connected to DB"+result)}).
    catch((err)=>{
        console.log(process.env.PORT, url_node)
        console.log("Cannt connect to atlas")
    })

