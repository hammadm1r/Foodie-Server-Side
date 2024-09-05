const products = require("../models/products");
const { error } = require("../utils/responseWrapper");
const { success } = require("../utils/responseWrapper");

const uploadProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity } = req.body;
    if (!name || !price || !description || !category || !quantity) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const productExist = await products.findOne({ name });
    if (productExist) {
      return res.status(400).json("Product Already Existed");
    }
    const newProduct = new products({
      name,
      price,
      description,
      category,
      quantity,
    });
    if(req.file){
        newProduct.image = req.file.filename;
    }
    const response = newProduct.save();
    return res.json("Hello World");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const allProducts = async(req,res) =>{
    try {
       const productList = await products.find();
       
       const productsWithImageURL = productList.map(product => ({
        ...product._doc,
        image: `${req.protocol}://${req.get('host')}/uploads/products/${product.image}`
      }));
        return res.json(productsWithImageURL);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

module.exports = {uploadProduct,allProducts}