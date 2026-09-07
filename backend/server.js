require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectCloudinary = require("./config/cloudinary");
const authRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

//config
connectCloudinary();

//auth endpoints
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.get('/', (req, res) => {
    res.send("Server is working");
});

// connection
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("database connected");
        app.listen(PORT, () => {
            console.log(`running on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("database not connected", err);
    });



