const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 50
    },
    card_id: {
        type: Number,
        maxLength: 25
    }
    
}, { collection: 'Card' })

const Card = mongoose.model('Card', cardSchema)


module.exports = Card;