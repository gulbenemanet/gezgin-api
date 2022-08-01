const Card = require('../models/card_model');
const User = require('../models/user_model');
const Test = require('../models/test_model');
const Award = require('../models/award_model');

const getCards = async (req, res) =>{
    let result = []
    let arr = []
    console.log(req.user);
    try {
        for (let i = 0; i < req.user.scannedCards.length; i++) {
            result[i] = await Card.find({
                card_id: req.user.scannedCards[i]
            }).select({ _id: 0, __v: 0 })
            arr[i] = result[i][0].card_id
        }
        // const allCards = await Card.find({});
        // for (let i = 0; i < result.length; i++) {
        //     for (let j = 0; j < allCards.length; j++) {
        //         if (result[i][0].card_id == allCards[j].card_id) {
        //             allCards.splice(j,1)
        //         }
        //     }
        //}
        //console.log("result: " + result)
        //console.log("data: " + arr)
        res.status(200).json({
            "success": true,
            "code": 200,
            "message": "Kullanıcı tarafından taratılmış kartlar gönderildi.",
            "data": arr
            // {
            //     "scannedCards": result[0],
            //     "nonScannedCards": allCards
            // }
        })
    } catch(err){
        res.json(err);
        console.log(err);
    }
}

const postCard = async (req, res) => {
    try {
        const createCard = await Card.create(req.body);
        if (createCard) {
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
        const user  = await User.find({_id: req.body.user_id})
        const id = user[0]._id
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
        if (createTest) {
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
        const user  = await User.find({_id: req.body.user_id})
        console.log(user);
        let point = user[0].point;
        const id = user[0]._id; 
        const solvedTest = await Test.find({test_id: req.body.test_id})
        point = point + req.body.point;
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

const getSolvedTests = async (req,res) => {
    let result= []
    for (let i = 0; i < req.user.solvedTests.length; i++) {
        result[i] = await Test.find({
            test_id : req.user.solvedTests[i]
        }) 
    }
    res.status(200).json({
        "success": true,
        "code": 200,
        "message": "Çözülen testler gönderildi.",
        "data": result
    })
}

const getTests = async (req, res) => {
    let result = [];
    let  arr = [];
    let k = 0;
    for (let i = 0; i < req.user.scannedCards.length; i++) {
        result[i] = await Test.find({
            card_id : req.user.scannedCards[i]
        })    
        console.log(result[i].length);
        for (let j = 0; j < result[i].length; j++) {
            arr[k] = result[i][j].test_id;
            k++;    
        }
    }

    console.log(arr);
    res.status(200).json({
        "success": true,
        "code": 200,
        "message": "Taratılan kartların çözülecek testleri gönderildi.",
        "data": arr
    })
}

const postAward = async (req, res) => {
    try {
        const createAward = await Award.create(req.body);
        if (createAward) {
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
        const user  = await User.find({_id: req.body.user_id})
        console.log("user: ");
        let point = user[0].point;
        const id = user[0]._id; 
        const chosenAward  = await Award.find({award_id: req.body.award_id})

        if (point < chosenAward[0].point) {
            point = point - chosenAward[0].point;
            const result = await User.updateOne({_id : id},{point : point, $push : {winnedAwards: req.body.award_id}});
            //console.log(result);
            res.status(400).json({
                "success": false,
                "code": 400,
                "message": "Kullanıcının bu ödüle puanı yetmiyor.",
            }) 
        } else {
            point = point - chosenAward[0].point;
            const result = await User.updateOne({_id : id},{point : point, $push : {winnedAwards: req.body.award_id}});
            console.log(result);
            res.status(200).json({
                "success": true,
                "code": 200,
                "message": "Alınan ödül kullanıcı profiline eklendi ve puanı eksiltildi.",
                "data": result
            })            
        }

    }
    catch(err){
        res.json(err);
        console.log(err);
    }
}

const postWinnedAwards = async (req, res) =>{
    const result  = await Award.find({award_id: req.body.award_id});
    console.log(result[0]);
    res.status(200).json({
        "success": true,
        "code": 200,
        "message": "Kullanıcının kazandığı ödüller gönderildi.",
        "data": result[0]
    })
}


module.exports = {
    getCards, //taratılmış ve taratılmamış kartları listeleme
    postCard, //kart ekleme
    postTest, //test ekleme
    scannedCards, //Kullanıcı kart tarattığında profiline eklenmesi
    solvedTests, //Kullanıcı test çözdüğünde teste göre puan eklenmesi ve çözülen testin kullanıcının profiline eklenmesi
    getSolvedTests, //Çözülen testlerin listelenmesi
    getTests, //Taratılan kartların testlerinin listelenmesi
    getAwards, //ödülleri listeleme
    postAward, //ödül ekleme
    winnedAward, //ödül alma, puan düşürülmesi, alınan ödülün kullanıcı profiline eklenmesi
    postWinnedAwards
};
