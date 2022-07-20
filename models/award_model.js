const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const awardSchema = new Schema({
    award_id: {
        type: String,
        trim: true,
        maxLength: 50
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