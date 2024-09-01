const router = require('express').Router();
const productController = require('../controller/productController');
const upload = require('../middleware/upload')
router.post('/uplordproduct',upload.single('image'),productController.uploadProduct);
router.get('/getproducts',productController.allProducts);
module.exports = router