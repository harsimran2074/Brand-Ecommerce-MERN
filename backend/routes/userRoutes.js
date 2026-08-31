const express = require('express');

const authRouter = express.Router();
const { registerUser, loginUser, loginAdmin } = require('../controllers/userController');


authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/admin', loginAdmin);

module.exports = authRouter;