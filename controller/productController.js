const products = require("../models/products");

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
        const  products = await products.find();
        return res.json(products);

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {uploadProduct,allProducts}