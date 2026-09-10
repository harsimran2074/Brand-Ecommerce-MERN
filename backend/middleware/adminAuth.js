
const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, msg: "Invalid credentials"  })
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, msg: "Not authorized login" })
        }
        next();
    } catch (error) {
        res.json({ success: false, msg: "Invalid credentials" })
    }

}
module.exports = adminAuth;