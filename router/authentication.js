const router = require('express').Router();
const authController = require('../controller/authController');
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware')
const upload = require('../middleware/upload')

router.post('/signup',upload.single('image'),authController.signup)
router.post('/login',authController.login)
router.get('/profile',jwtAuthMiddleware.verifyjwt,authController.profile)
router.get('/verify',jwtAuthMiddleware.verifyjwt,authController.verification)

module.exports = router;