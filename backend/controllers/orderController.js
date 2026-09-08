const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const razorpay = require("razorpay");

const currency = 'inr'

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

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
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
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
        const { razorpay_order_id } = req.body;
        const userId = req.userId;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// Placing orders using Razorpay Method
exports.placeOrderRazorpay = async (req, res) => {
    try {

        const { items, amount, address } = req.body
        const userId = req.userId
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
            console.log("SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);
            if (error) {
                console.log(error)
                return res.json({
                    success: false,
                    message: error.description || error.error?.description || "Razorpay order creation failed"
                })
            }
            res.json({ success: true, order, key: process.env.RAZORPAY_KEY_ID })
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
