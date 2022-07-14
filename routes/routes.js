const router = require('express').Router();
const userController = require('../controllers/user_controller')
const auth = require('../middlewares/auth');


router.get('/', (req, res) => {res.json("ok")});

router.post('/signIn', userController.signIn);
router.post('/signUp', userController.signUp);
router.get('/logout', userController.logOut);
router.get('/currentUser', userController.getCurrentUser);
//router.get('/api/current_user', apiController.getCurrentUser);


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