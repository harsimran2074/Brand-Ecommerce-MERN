
const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.json({ success: false, msg: "Invalid credentials" })
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
      
        req.user = verified;
        req.userId = verified.id;
        next();
    } catch (error) {
        console.log("error at userAuth" ,error);
        res.json({ success: false, msg: "Invalid credentials" })
    }

}
module.exports = userAuth;