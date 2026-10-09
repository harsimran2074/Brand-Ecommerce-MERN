const crypto = require("crypto");
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
        res.json({ success: true, allorders })
    }
    catch (error) {
        console.error("[OrderController - All Orders Error]:", error.message);
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
        console.error("[OrderController - Update Status Error]:", error.message);
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
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "order placed successfully" })

    }
    catch (error) {
        console.error("[OrderController - Place Order COD Error]:", error.message);
        res.json({ success: false, message: error.message })
    }
}



exports.userOrders = async (req, res) => {

    try {

        const userId = req.userId

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.error("[OrderController - User Orders Error]:", error.message);
        res.json({ success: false, message: error.message })
    }
}

exports.verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.userId;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Missing payment verification fields" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment signature mismatch" });
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Payment Successful" });
    }
    catch (error) {
        console.error("[OrderController - Verify Razorpay Error]:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}


// Placing orders using Razorpay Method
exports.placeOrderRazorpay = async (req, res) => {
    try {

        const { items, amount, address } = req.body
        const userId = req.userId
        const amountInPaise = Math.round(Number(amount) * 100)

        if (!amountInPaise || amountInPaise < 100) {
            return res.status(400).json({ success: false, message: "Minimum payment amount is 100 paise" })
        }

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
            amount: amountInPaise,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error("[OrderController - Razorpay Order Creation Callback Error]:", error.description || error.message || error);
                const statusCode = error.statusCode === 401 ? 401 : 500
                return res.status(statusCode).json({
                    success: false,
                    message: error.description || error.error?.description || "Razorpay order creation failed"
                })
            }
            res.json({ success: true, order, key: process.env.RAZORPAY_KEY_ID })
        })

    } catch (error) {
        console.error("[OrderController - Razorpay Order Placement Error]:", error.message);
        res.json({ success: false, message: error.message })
    }
}
