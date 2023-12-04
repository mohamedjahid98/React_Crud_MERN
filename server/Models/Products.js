const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    imageUrl: { type: String },
    name: String,
    category: String,
    description: String,
    price: Number
});



const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
