

const express = require('express');
const { getCart, addCart, updateCart, removeCart } = require('../controllers/cartController');
const userAuth = require('../middleware/userAuth');

const cartRouter = express.Router();

cartRouter.get('/get', userAuth, getCart);
cartRouter.post('/add', userAuth, addCart);
cartRouter.post('/update', userAuth, updateCart);
cartRouter.post('/remove', userAuth, removeCart);

module.exports = cartRouter;

