const express = require('express')
const { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay } = require('../controllers/orderController.js')
const adminAuth = require('../middleware/adminAuth.js')
const authUser = require('../middleware/userAuth.js')

const orderRouter = express.Router();

// Admin Features
orderRouter.get('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// User Feature 
orderRouter.get('/userOrders', authUser, userOrders)

// verify paymentt
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

module.exports = orderRouter