const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    date: { type: Number, required: true },
    bestSeller: { type: Boolean },
    sizes: { type: Array, required: true },

})

module.exports = mongoose.model("product", productSchema);