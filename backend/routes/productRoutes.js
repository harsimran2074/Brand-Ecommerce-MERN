
const express = require('express')
const productRouter = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { addProduct, getAllProducts, deleteProduct, updateProduct, getSingleProduct } = require('../controllers/productController');
const upload = require('../middleware/multer')

productRouter.post('/add', adminAuth, upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 },]), addProduct);
productRouter.get('/get', getAllProducts);
productRouter.post('/delete/:id', adminAuth, deleteProduct);
productRouter.post('/update/:id', adminAuth, updateProduct);
productRouter.get('/getSingle/:id', getSingleProduct);
module.exports = productRouter;
