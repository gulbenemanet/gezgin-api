const Card = require('../models/card_model');
const User = require('../models/user_model');
const Test = require('../models/test_model');
const Award = require('../models/award_model');

const getCards = async (req, res) =>{
    //console.log(req.user.scannedCards)
    let result = []
    try {
        for (let i = 0; i < req.user.scannedCards.length; i++) {
            result[i] = await Card.find({
                card_id: req.user.scannedCards[i]
            }).select({ _id: 0, __v: 0 })
        }
        res.status(200).json({
            "success": true,
            "code": 200,
            "message": "Kullanıcı tarafından taratılmış kartlar gönderildi.",
            "data": result
        })
    } catch(err){
        res.json(err);
        console.log(err);
    }
}

const postCard = async (req, res) => {
    try {
        const createCard = await Card.create(req.body);
        if (result) {
            res.status(200).json({
                "success": true,
                "code": 200,
                "message": "Database'e ekleme yapıldı.",
                "data": createCard
            })
        } 
    } catch(err){
        res.json(err);
        console.log(err);
    }
}

const scannedCards = async (req, res)=> {
    try{
        const id = req.user._id
        const result = await User.updateOne({_id : id},{$push : {scannedCards: req.body.card_id}});
        res.status(200).json({
            "success": true,
            "code": 200,
            "message": "Kullanıcı tarafından taratılan kart kullanıcı profiline eklendi.",
            "data": result
        })
        //console.log(result)
    } catch(err){
        res.json(err);
        console.log(err);
    }
}

const postTest = async (req, res) => {
    try {
        const createTest = await Test.create(req.body);
        if (result) {
            res.status(200).json({
                "success": true,
                "code": 200,
                "message": "Database'e ekleme yapıldı.",
                "data": createTest
            })
        } 
    } catch(err){
        res.json(err);
        console.log(err);
    }
}

const solvedTests = async (req, res) => {  
    try{
        let point = req.user.point;
        const id = req.user._id; 
        const solvedTest = await Test.find({test_id: req.body.test_id})
        point = point + solvedTest.point;
        const result = await User.updateOne({_id : id},{point : point, $push : {solvedTests: req.body.test_id}});
        res.status(200).json({
            "success": true,
            "code": 200,
            "message": "Çözülen test ve puanı kullanıcı profiline eklendi.",
            "data": result
        })
    }
    catch(err){
        res.json(err);
        console.log(err);
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

const postAward = async (req, res) => {
    try {
        const createAward = await Award.create(req.body);
        if (result) {
            res.status(200).json({
                "success": true,
                "code": 200,
                "message": "Database'e ekleme yapıldı.",
                "data": createAward
            })
        } 
    } catch(err){
        res.json(err);
        console.log(err);
    }
}

const getAwards = async (req, res) =>{
    try {
        const result = await Award.find().select({ __v: 0 })
        res.status(200).json({
            "success": true,
            "code": 200,
            "message": "Ödüller gönderildi.",
            "data": result
        })
    } catch(err){
        res.json(err);
        console.log(err);
    }
}

const winnedAward = async (req, res) => {
    try{
        let point = req.user.point;
        const id = req.user._id; 
        const chosenAward  = await Test.find({award_id: req.body.award_id})
        point = point + chosenAward.point;
        const result = await User.updateOne({_id : id},{point : point, $push : {winnedAwards: req.body.award_id}});
        res.status(200).json({
            "success": true,
            "code": 200,
            "message": "Çözülen ödül kullanıcı profiline eklendi ve puanı eksiltildi.",
            "data": result
        })
    }
    catch(err){
        res.json(err);
        console.log(err);
    }
}

module.exports = {
    getCards, //taratılmış kartları listeleme
    postCard, //kart ekleme
    postTest, //test ekleme
    scannedCards, //Kullanıcı kart tarattığında profiline eklenmesi
    solvedTests, //Kullanıcı test çözdüğünde teste göre puan eklenmesi ve çözülen testin kullanıcının profiline eklenmesi
    //getTests, //testleri listeleme -taratılmış kartların
    //getAwards, //ödülleri listeleme
    //postAward, //ödül ekleme
    //winnedAward //ödül alma, puan düşürülmesi, alınan ödülün kullanıcı profiline eklenmesi
};