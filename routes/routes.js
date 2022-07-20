const router = require('express').Router();
const userController = require('../controllers/user_controller')
const auth = require('../middlewares/auth');
const apiController = require('../controllers/api_controller')





router.get('/', (req, res) => {res.json("ok")});

router.post('/signIn', userController.signIn);
router.post('/signUp', userController.signUp);
router.get('/logout', auth, userController.logOut);
router.get('/currentUser', auth, userController.getCurrentUser);
router.get('/getCards',auth, apiController.getCards)
router.post('/postCards', auth, apiController.postCards)
router.post('/scannedCards', auth, apiController.scannedCards),
router.post('/solvedTests', auth, apiController.solvedTests)


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