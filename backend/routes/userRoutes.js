const express = require('express');

const authRouter = express.Router();
const { registerUser, loginUser, loginAdmin } = require('../controllers/userController');


authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/admin/login', loginAdmin);

module.exports = authRouter;