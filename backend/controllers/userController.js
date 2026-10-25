const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');


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

        if (!user.password) {
            return res.status(400).json({
                success: false,
                msg: "This account was created with Google. Please sign in with Google."
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
};

// Get all registered users and summary counts for admin
exports.getAdminUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, '_id name email').sort({ _id: -1 });
        const paidOrdersCount = await orderModel.countDocuments({ payment: true });

        const formattedUsers = users.map((user) => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user._id?.getTimestamp ? user._id.getTimestamp() : null
        }));

        res.json({
            success: true,
            users: formattedUsers,
            totalUsers: formattedUsers.length,
            paidOrdersCount
        });
    } catch (error) {
        console.error("[UserController - Get Admin Users Error]:", error.message);
        res.status(500).json({ success: false, message: error.message, msg: error.message });
    }
};


//google login and signUp 

const googleClientId = (process.env.GOOGLE_CLIENT_ID || '').trim();

const googleClient = new OAuth2Client(
    googleClientId
);

exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({
                success: false,
                message: 'Google credential is required',
            });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: googleClientId,
        });

        const payload = ticket.getPayload();

        if (!payload?.sub || !payload.email || !payload.email_verified) {
            return res.status(401).json({
                success: false,
                message: 'Google account could not be verified',
            });
        }

        let user = await userModel.findOne({
            googleId: payload.sub,
        });



        if (!user) {
            const existingUser = await userModel.findOne({
                email: payload.email,
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message:
                        'An account with this email already exists. Sign in using your existing method first.',
                });
            }

            user = await userModel.create({
                name: payload.name || payload.email.split('@')[0],
                email: payload.email,
                googleId: payload.sub,
                cartData: {},
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );


        return res.json({
            success: true,
            msg: 'Google sign-in successful',
            message: 'Google sign-in successful',
            token,
        });
    } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || 'Google sign-in failed';
        console.error('Google login error:', errorMsg);

        return res.status(401).json({
            success: false,
            msg: errorMsg,
            message: errorMsg,
        });
    }
};