const router = require('express').Router();
const productController = require('../controller/productController');
const upload = require('../middleware/upload')
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware')
router.post('/uplordproduct',jwtAuthMiddleware.verifyjwt,upload.single('image'),productController.uploadProduct);
router.get('/getproducts',productController.allProducts);
module.exports = router