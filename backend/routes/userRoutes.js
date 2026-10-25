const express = require('express');

const authRouter = express.Router();
const { registerUser, loginUser, loginAdmin, getAdminUsers, googleLogin } = require('../controllers/userController');
const adminAuth = require('../middleware/adminAuth');

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/admin/login', loginAdmin);
authRouter.post('/google', googleLogin);
// Admin features
authRouter.get('/users', adminAuth, getAdminUsers);
authRouter.get('/admin/users', adminAuth, getAdminUsers);

module.exports = authRouter;