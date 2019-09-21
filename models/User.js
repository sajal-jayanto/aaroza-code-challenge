const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    
    username: {
        type : String,
        require : true,
        min : 3,
        max : 255
    },
    password: {
        type : String,
        require : true,
        min : 6,
        max : 1024
    }
});

module.exports = mongoose.model('User' , userSchema);