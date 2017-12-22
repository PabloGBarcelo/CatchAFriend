const express = require('express');
const Routes = express.Router();
const chatController = require('../controllers/chat.controller');

Routes.post('/newChat', chatController.newChat);

Routes.post('/addMessage', chatController.addMessage);

Routes.post('/getMessages', chatController.getMessages);

Routes.post('/getChats', chatController.getChats);

Routes.post('/getLastMessage', chatController.getAllChatsOfUserById);

module.exports = Routes;
