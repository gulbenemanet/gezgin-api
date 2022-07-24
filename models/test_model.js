const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    test_id: {
        type: Number,
        unique: true
    },
    card_id: {
        type: Number
    },
    mode: {
        type: String
    },
    ques_ans: [{
        question: {
            type: String
        },
        answers: {
            type: Array
        },
        r_answer: {
            type: String
        }
    }]
}, { collection: 'tests' })

const Test = mongoose.model('tests', testSchema)

module.exports = Test;

//test_id uniq olacak
//1. testler kolay, 2. testler zor olacak
//card_id uniq olamaz, her kartın iki testi olacak