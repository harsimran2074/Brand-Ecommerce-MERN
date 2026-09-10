const express = require('express');
const contactRouter = express.Router();
const { sendContactMessage } = require('../controllers/contactController');

contactRouter.post('/send', sendContactMessage);

module.exports = contactRouter;
