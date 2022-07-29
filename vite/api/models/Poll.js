const mongoose = require('mongoose');


const pollSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        identifier: {
            type: String,
            required: true
        },
        poll: {
            type: Array,
            required: true
        }, 
        title:{
            type: String,
            default: "Random Poll"
        }

}, {timestamps: true});


module.exports = new mongoose.model("Polls", pollSchema);