const user = require('../models/user');
const products = require('../models/products')
const { error } = require("../utils/responseWrapper");
const { success } = require("../utils/responseWrapper");

const addtocart = async(req,res) => {
    try {
        const user_Id = req.user.user_id;
        const product_id = req.body.product_id;
        const quantity = req.body.quantity;
        console.log(user_Id);
        const userProfile = await user.findById(user_Id);
        if(!userProfile){
            return res.status(404).json('User Not Found')
        }
        const product_Id = await products.findById(product_id);
        if(!product_Id){
            return res.status(404).json('Product Not Found')
        }
        const cartItem = userProfile.cartItems.find(item => item.product_Id.toString() === product_id);
        if (cartItem) {
            // Update the quantity if the product is already in the cart
            cartItem.quantity = quantity;
        } else {
            // Add the new product to the cart
            userProfile.cartItems.push({ product_Id: product_id, quantity });
        }
        // Save the updated user profile
        await userProfile.save();

        return res.status(200).json('Product Added To Your Cart');
    } catch (error) {
        return res.status(500).json(error);
    }
}
const removefromcart = async(req,res) => {
    try {
        const user_Id = req.user.user_id;
        const product_id = req.body.product_id;
        const userProfile = await user.findById(user_Id);
        const cartItemIndex = userProfile.cartItems.findIndex(item =>item.product_Id.toString() === product_id)
        if(cartItemIndex===-1){
            return res.status(404).json('Product Not Found')
        }else{
        userProfile.cartItems.splice(cartItemIndex,1);
        await userProfile.save();
        return res.status(200).json('Product Removed From Your Cart');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getCartInfo = async(req,res) => {
    try {
        const user_Id = req.user.user_id;
        
        const userProfile =await user.findById(user_Id).populate('cartItems.product_Id');

        return res.json({
            cart: userProfile.cartItems.map(item => ({
                product: item.product_Id,  // Populated product details
                quantity: item.quantity
            }))
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports ={addtocart,removefromcart,getCartInfo};