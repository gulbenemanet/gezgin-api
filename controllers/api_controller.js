const Card = require('../models/card_model') 
const User= require('../models/user_model')

const getCards = async (req,res) =>{
    console.log(req.user.scannedCards)
    let result= []
    for (let i = 0; i < req.user.scannedCards.length; i++) {
        result[i] = await Card.find({
            card_id : req.user.scannedCards[i]
        })
        
    }
    res.json(result)
    
}

const postCards = async (req,res) => {
    try {
    const deneme = await Card.create(req.body)}
    catch(err){
        console.log(err)
    }
}

const scannedCards = async (req,res)=> {
    try{
    const id = req.user._id
    const result= await User.updateOne ({_id : id},{$push : {scannedCards: req.body.card_id}})
    console.log(result)
    }
    catch(err){
        console.log(err)
    }
}

const solvedTests = async (req,res) =>{
    try{
        let point = req.user.point
        const id=req.user._id 
        point = point + req.body.point
        const result = await User.updateOne({_id : id},{point : point, $push : {solvedTests: req.body.test_id}})
    }
    catch(err){
        console.log(err)
    }
}

// const getTests = async (req,res) =>{
//     let result= []
//     for (let i = 0; i < req.user.solvedTests.length; i++) {
//         result[i] = await Card.find({
//             card_id : req.user.solvedTests[i]
//         })
        
//     }
//     res.json(result)
    
// }

module.exports= {getCards , postCards, scannedCards, solvedTests};