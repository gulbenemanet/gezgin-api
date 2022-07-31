const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 25
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 25
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        email: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        //unique: true
    },
    point: {
        type: Number,
        default: 0
    },
    winnedAwards: {
        type: Array,
    },
    scannedCards: {
        type: Array,
    },
    solvedTests: {
        type: Array,
    }
    
}, { collection: 'users' })

const User = mongoose.model('users', userSchema)


module.exports = User;