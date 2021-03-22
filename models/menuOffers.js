const mongoose = require('mongoose');

const menuoffersschema = new mongoose.Schema({

   
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

const menuoffers = mongoose.model('menu', menuoffersschema);
module.exports = menuoffers;