const mongoose = require('mongoose');

const menuschema = new mongoose.Schema({

   
    description: {
        type: String,
        maxlength: 100,
        minlength: 10,
        required:true
    },
    name: {
        type: String,
        maxlength: 30,
        minlength: 2,
        required:true

    },
    price: {
        type: Number,
        maxlength: 10,
        required:true

    },    
img:{
    data: Buffer,
     type: String ,


},
size:{
    enum: ["L", "M", "S"],
}
}
);

const menu = mongoose.model('menu', menuschema);
module.exports = menu;