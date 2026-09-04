const userModel = require('../models/userModel');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//user logine
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "Invalid password"
            });
        }

        const token = createToken(user._id);

        return res.status(200).json({
            success: true,
            msg: "User logged in successfully",
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

//user register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email: email })

        if (existingUser) {
            return res.json({ success: false, msg: "user already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "invalid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, msg: "password must be at least 8 characters long" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, msg: "user registered successfully", token });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, msg: "error " })
    }

}


//login admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email + password, process.env.JWT_SECRET);
        res.json({ success: true, msg: "admin logged in successfully", token })
    } else if (email === process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD) {
        res.json({ success: false, msg: "invalid password" })
    } else {
        res.json({ success: false, msg: "invalid credentials" })
    }

}