const router = require('express').Router();
const authController = require('../controller/authController');
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware')

router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.get('/profile',jwtAuthMiddleware.verifyjwt,authController.profile)

module.exports = router;