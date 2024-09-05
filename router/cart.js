const router = require('express').Router();
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');
const cart = require('../controller/cartController')

router.post('/addtocart',jwtAuthMiddleware.verifyjwt,cart.addtocart);
router.delete('/removefromcart',jwtAuthMiddleware.verifyjwt,cart.removefromcart);
module.exports = router