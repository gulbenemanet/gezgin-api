const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const awardSchema = new Schema({
    award_id: {
        type: Number,
        trim: true,
        maxLength: 50,
        unique: true
    },
    award_name: {
        type: String,
        trim: true,
        maxLength: 50
    },
    point: {
        type: Number 
    }
    
}, { collection: 'Award' })

const Award = mongoose.model('Award', awardSchema)


module.exports = Award;