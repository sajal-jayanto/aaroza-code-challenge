const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;


const movieSchema = mongoose.Schema({
    
    title:{
        type : String,
        require : true
    },
    year:{
        type : Number,
        require : true
    },
    rating:{
        type : SchemaTypes.Double,
        require : true
    },
    actors:[{
        type : Schema.Types.ObjectId,
        ref : 'Actor'
    }]
});

module.exports = mongoose.model('Movie' , movieSchema);