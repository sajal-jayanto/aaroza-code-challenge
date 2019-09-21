const mongoose = require('mongoose');

const SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const actorSchema = mongoose.Schema({
    name: {
        type : String,
        require : true
    },
    birthday : {
        type : Date,
        require : true
    },
    country : {
        type : String,
        require : true
    },
    movie:{
        type : Schema.Types.ObjectId,
        ref : 'Movie'
    }
});


module.exports.actor = actorSchema;
module.exports = mongoose.model('Actor' , actorSchema);