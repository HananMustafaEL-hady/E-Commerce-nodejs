// const config = require('./config/config');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sayed:sa12345@mynode.qhp5b.mongodb.net/DB?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
});
const connection = mongoose.connection;

module.exports = connection;


