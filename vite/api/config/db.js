const mongoose = require('mongoose');

// process.env.MONGO_URI

module.exports = function connectTodb(){
    try{
        mongoose.connect('mongodb://localhost:27017/polls', ()=>{
            console.log("Connected To DB Successfully")
        })
    }
    catch(err){
        return err
    }
}