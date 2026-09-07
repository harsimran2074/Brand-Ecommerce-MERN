const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
exports.allOrders = async (req, res) => {
    try {
        const allorders = await orderModel.find()

        if (!allorders) {
            res.json({ success: false, message: "No orders found" })
        }
        console.log("all orders", allorders)
        res.json({ success: true, allorders })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

exports.updateStatus = async (req, res) => {
    try {

    }
    catch (error) {

    }
}

exports.placeOrder = async (req, res) => {
    try {

        const userId = req.userId;
        const { items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        console.log(orderData);
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "order placed successfully" })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

exports.placeOrderRazorpay = async (req, res) => {
    try {

    }
    catch (error) {

    }
}

exports.userOrders = async (req, res) => {

    try {

        const userId = req.userId

        const orders = await orderModel.find({ userId })
        console.log(orders);
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

exports.verifyRazorpay = async (req, res) => {
    try {

    }
    catch (error) {

    }
}