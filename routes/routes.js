const router = require('express').Router();
const userController = require('../controllers/user_controller')
const auth = require('../middlewares/auth');
const apiController = require('../controllers/api_controller')





router.get('/', (req, res) => {res.json("ok")});

router.post('/signIn', userController.signIn);
router.post('/signUp', userController.signUp);
router.get('/logout', userController.logOut);
router.get('/currentUser', auth, userController.getCurrentUser);
router.get('/getCards', apiController.getCards);
router.post('/postCard', apiController.postCard);
router.post('/scannedCards', apiController.scannedCards);
router.get('/getSolvedTests', apiController.getSolvedTests);
router.get('/getTests', apiController.getTests);
router.post('/postTest', apiController.postTest);
router.post('/solvedTests', apiController.solvedTests);
router.get('/getAwards', apiController.getAwards);
router.post('/postAward', apiController.postAward);
router.post('/winnedAward', apiController.winnedAward);
router.get('/postwinnedAward', auth, apiController.getWinnedAwards);


module.exports = router;



//örnek user 
// {
// 	"name": "gülben",
//     "lastName": "emanet",
//     "email": "gulbenemanet@gmail.com",
//     "password": "123emanet",
//     "phoneNumber": 5366324135,
//     "point": 0,
//     "winnedAwards": [],
//     "scannedCards": [],
//     "solvedTests": []
// }

// {
// 	"email": "gulbenemanet@gmail.com",
// 	"password": "123emanet"
// }