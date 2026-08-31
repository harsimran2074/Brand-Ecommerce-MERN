const userModel = require('../models/userModel');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//user login
exports.loginUser = async (req, res) => {

    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email: email });




    try {
        if (!user) {
            return res.json({ success: false, msg: "user not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, msg: "invalid password" })
        }

        if (isMatch) {
            const token = createToken(user._id)
            return res.json({ success: true, msg: "user logged in successfully", token });

        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }
    }
    catch (error) {  //isme koi bhi error aega vo yha catch hoga
        console.log(error)
        res.json({ success: false, msg: "error " })
    }

}

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
    res.json({ msg: "API worked for admin login" });
}