const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        default: 'user_guest'
    },
    image:{
        type: String,
        default: 'https://res.cloudinary.com/dknupld0a/image/upload/v1655891890/Other%20Assets/download_u0exhm.png'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
        
}, {timestamps: true})

module.exports = new mongoose.model('User', UserSchema);