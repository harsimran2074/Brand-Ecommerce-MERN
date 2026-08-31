
const express = require('express')
const productRouter = express.Router();
const { addProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/productController');
const upload = require('../middleware/multer')

productRouter.post('/add', upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 },]), addProduct);
productRouter.get('/get', getAllProducts);
productRouter.post('/delete/:id', deleteProduct);
productRouter.post('/update/:id', updateProduct);

module.exports = productRouter;
