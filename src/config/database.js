const mongoose = require('mongoose');
const config = require('../config');


mongoose.establishConnection = function(callback){
    mongoose.connect(config.db.url,{
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology: true
    },(err) => {
    if(!err){
        callback();
        return console.log('Database connection established');
    }
    console.log('Database connection failed => ',err);
    })
}

module.exports = mongoose;